import CardWrap from "@/components/Card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useGetPointBasedCriteria,
  useScoreJudging,
  useShowParticipants,
} from "@/hooks/tanstack/criteria/criteria";
import { urlSrc } from "@/lib/helper-src";
import { PointBasedCriteria, pointBasedSchema } from "@/schema/criteria";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const CriteriaJudging = () => {
  const [idParticipants, setIdParticipants] = useState<number | null>(null);

  const [disabled, setDisabled] = useState(true);

  const { contest_id, group_id } = useParams();

  const { data: dataCriteria } = useGetPointBasedCriteria(group_id ?? "");

  const { data: dataParticipants } = useShowParticipants(
    Number(contest_id) ?? null
  );

  const [participantScores, setParticipantScores] = useState<{
    [key: number]: PointBasedCriteria;
  }>({});

  const a = 26;

  const { mutateAsync } = useScoreJudging(a);

  const form = useForm<PointBasedCriteria>({
    resolver: zodResolver(pointBasedSchema),
    values: {
      criteria:
        dataCriteria?.[0]?.criteria.map((item) => ({
          judges_id: a ?? null,
          participant_id: Number(idParticipants) ?? null,
          contest_id: Number(contest_id) ?? null,
          group_id: group_id ?? "",
          evaluation_criteria: item.evaluation_criteria,
          score: 0,
        })) || [],
    },
  });

  const onSubmit = async () => {
    const currentScores = form.getValues();

    if (idParticipants) {
      const updatedScores = {
        ...participantScores,
        [idParticipants]: currentScores,
      };
      setParticipantScores(updatedScores);
      console.log(updatedScores);
      const formattedScores = {
        criteria: Object.values(updatedScores).flatMap(
          (participant) => participant.criteria
        ),
      };

      mutateAsync({ criteria: formattedScores });
    }
  };

  useEffect(() => {
    if (idParticipants && participantScores[idParticipants]) {
      form.reset(participantScores[idParticipants]);
    }
    // else {
    //   form.reset({
    //     criteria:
    //       dataCriteria?.[0]?.criteria.map((item) => ({
    //         judges_id: a ?? null,
    //         participant_id: Number(idParticipants) ?? null,
    //         contest_id: Number(contest_id) ?? null,
    //         group_id: group_id ?? "",
    //         evaluationCriterion: item.evaluation_criteria,
    //         score: 0,
    //       })) || [],
    //   });
    // }
  }, [idParticipants, participantScores]);

  //  100       25        100      25
  //(score x weight) + (score x weight)
  const totalScore = form.watch("criteria").reduce((sum, criterion) => {
    const score = Number(criterion.score) || 0;

    const correspondingData = dataCriteria?.find((item) =>
      item.criteria.some(
        (i) => i.evaluation_criteria === criterion.evaluation_criteria
      )
    );

    const weight =
      (correspondingData?.criteria.find(
        (i) => i.evaluation_criteria === criterion.evaluation_criteria
      )?.score || 1) / 100;

    return sum + score * weight;
  }, 0);

  const handleSelectParticipants = (id: number | null) => {
    setDisabled(false);
    const currentScores = form.getValues();

    if (idParticipants) {
      setParticipantScores((prev) => ({
        ...prev,
        [idParticipants]: currentScores,
      }));
      const updatedScores = {
        ...participantScores,
        [idParticipants]: currentScores,
      };
      setParticipantScores(updatedScores);
      console.log(updatedScores);
    }

    const selectedParticipantScores = participantScores[id ?? 0];

    if (selectedParticipantScores && idParticipants === id) {
      selectedParticipantScores.criteria.forEach((criterion, index) => {
        form.setValue(`criteria.${index}.score`, criterion.score);
      });
    }

    setIdParticipants(id);
  };

  return (
    <CardWrap title="Criteria Judging" info="Judge">
      <ScrollArea className=" h-[calc(100vh-12rem)]">
        <div className="space-y-7 h-full">
          <div className="grid grid-cols-3 grid-flow-row 2xl:grid-rows-1 2xl:grid-cols-7 gap-7">
            {dataParticipants?.map((item) => (
              <Card
                key={item.id}
                className={`p-6 w-72 h-fit cursor-pointer transition duration-200 border-2 hover:scale-95 ${
                  item.id === idParticipants ? "bg-slate-400" : ""
                } `}
                onClick={() => handleSelectParticipants(item.id)}
              >
                <div className="flex flex-col w-full space-y-4">
                  <div>
                    <img
                      src={`${urlSrc}${item.poster_url}`}
                      alt={`${urlSrc}${item.poster_url}`}
                      className="h-72 w-full rounded-md border border-slate-950"
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-slate-950">
                        Evaluation Criterion
                      </TableHead>
                      <TableHead className="text-slate-950">Score</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        {dataCriteria?.map((item) => (
                          <div className="space-y-2" key={item.id}>
                            {item.criteria.map((criteria, index) => (
                              <FormField
                                key={criteria.id}
                                control={form.control}
                                name={`criteria.${index}.score`}
                                render={() => (
                                  <FormItem>
                                    <FormControl>
                                      <div className="h-10 px-3 py-2 border-slate-200 border rounded-md text-base text-slate-950 flex items-center">
                                        {criteria.evaluation_criteria}
                                      </div>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            ))}
                          </div>
                        ))}
                      </TableCell>
                      <TableCell>
                        {dataCriteria?.map((item) => (
                          <div className="space-y-2" key={item.id}>
                            {item.criteria.map((score, index) => (
                              <div key={score.id}>
                                <FormField
                                  control={form.control}
                                  name={`criteria.${index}.score`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <div className="flex items-center gap-2">
                                          <div className="w-full">
                                            <Input
                                              {...field}
                                              type="number"
                                              value={field.value || ""}
                                              placeholder="Enter score"
                                              onChange={(e) =>
                                                field.onChange(
                                                  Number(e.target.value)
                                                )
                                              }
                                              min={0}
                                              // required
                                              disabled={disabled}
                                              max={100}
                                            />
                                          </div>
                                          <div className="w-10 font-medium text-base">
                                            X {score.score}
                                          </div>
                                        </div>
                                      </FormControl>
                                      <FormMessage className="" />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            ))}
                          </div>
                        ))}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell>Total</TableCell>
                      <TableCell className="text-right">
                        {totalScore}/100
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </div>
              <div className="flex justify-end space-x-2 py-4">
                <div>
                  <Button variant="default" type="submit" size="sm">
                    Submit Score
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </ScrollArea>
    </CardWrap>
  );
};

export default CriteriaJudging;
