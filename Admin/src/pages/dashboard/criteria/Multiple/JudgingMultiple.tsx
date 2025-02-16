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
  useAddMultipleJudgingScore,
  useGetMultipleRoundCriteria,
  useShowParticipants,
} from "@/hooks/tanstack/criteria/criteria";
import { urlSrc } from "@/lib/helper-src";
import { MultipleBasedCriteria, multipleBasedSchema } from "@/schema/criteria";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const JudgingMultiple = () => {
  const [idParticipants, setIdParticipants] = useState<number | null>(null);
  const [disabled, setDisabled] = useState(true);
  const { contest_id, group_id } = useParams();
  const { data: dataCriteria } = useGetMultipleRoundCriteria(group_id ?? "");
  const { data: dataParticipants } = useShowParticipants(
    Number(contest_id) ?? null
  );

  const [participantScores, setParticipantScores] = useState<{
    [key: number]: MultipleBasedCriteria;
  }>({});

  //judges id will use in judge dashboard fetch the ID
  const a = 16;

  const { mutateAsync } = useAddMultipleJudgingScore(a);

  const form = useForm<MultipleBasedCriteria>({
    resolver: zodResolver(multipleBasedSchema),
    values: {
      criteria:
        dataCriteria?.[0]?.criteriaMultipleRound.flatMap((item) =>
          item.criteria.map((i) => ({
            judges_id: a ?? null,
            participant_id: Number(idParticipants) ?? null,
            contest_id: Number(contest_id) ?? null,
            group_id: group_id ?? "",
            evaluation_criteria: i.evaluation_criteria,
            round: i.round,
            score: 0,
          }))
        ) || [],
    },
  });

  const getCriteriaIndex = (
    roundIndex: number,
    criteriaIndex: number
  ): number => {
    let index = 0;
    for (let i = 0; i < roundIndex; i++) {
      index +=
        dataCriteria?.[0]?.criteriaMultipleRound[i]?.criteria.length || 0;
    }
    const a = index + criteriaIndex;
    return a;
  };

  const onSubmit = async () => {
    const currentScores = form.getValues();
    if (idParticipants) {
      const updatedScores = {
        ...participantScores,
        [idParticipants]: currentScores,
      };

      setParticipantScores(updatedScores);

      const formattedScores = {
        criteria: Object.values(updatedScores).flatMap(
          (participant) => participant.criteria
        ),
      };

      try {
        mutateAsync({ criteria: formattedScores });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (idParticipants && participantScores[idParticipants]) {
      form.reset(participantScores[idParticipants]);
    }
  }, [idParticipants, participantScores]);

  const totalScore = (index: number) => {
    const criteriaForRound =
      dataCriteria?.[0]?.criteriaMultipleRound[index]?.criteria || [];

    const totalScore = criteriaForRound.reduce((sum, _, criteriaIndex) => {
      const fieldIndex = getCriteriaIndex(index, criteriaIndex);
      const score = Number(form.watch(`criteria.${fieldIndex}.score`)) || 0;

      const correspondingData = dataCriteria?.[0]?.criteriaMultipleRound[
        index
      ]?.criteria.find(
        (i) =>
          i.evaluation_criteria ===
          form.watch(`criteria.${fieldIndex}.evaluation_criteria`)
      );

      const weight = (correspondingData?.score || 1) / 100;

      return sum + score * weight;
    }, 0);

    return totalScore;
  };

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
              <div className="rounded-md border space-y-4">
                {dataCriteria?.map((i) =>
                  i.criteriaMultipleRound.map((i, ind) => (
                    <Card key={ind}>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-slate-950">
                              <div>Round {i.round}</div>
                            </TableHead>
                            <TableHead className="text-slate-950">
                              Score
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {i.criteria.map((criteria, idx) => {
                            const fieldIndex = getCriteriaIndex(ind, idx);
                            return (
                              <TableRow key={idx}>
                                <TableCell>
                                  <FormField
                                    key={criteria.round}
                                    control={form.control}
                                    name={`criteria.${fieldIndex}.evaluation_criteria`}
                                    render={() => (
                                      <FormItem>
                                        <FormControl>
                                          <div className="h-10 px-3 py-2 border-slate-200 border rounded-md text-base text-slate-950 flex items-center">
                                            {criteria.evaluation_criteria}
                                          </div>
                                        </FormControl>
                                        {/* <FormMessage /> */}
                                      </FormItem>
                                    )}
                                  />
                                </TableCell>

                                <TableCell>
                                  <FormField
                                    control={form.control}
                                    name={`criteria.${fieldIndex}.score`}
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
                                                max="100"
                                              />
                                            </div>
                                            <div className="w-10 font-medium text-base">
                                              / 100
                                            </div>
                                          </div>
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                        <TableFooter>
                          <TableRow>
                            <TableCell>Total</TableCell>
                            <TableCell className="text-right">
                              {totalScore(ind)}/100
                            </TableCell>
                          </TableRow>
                        </TableFooter>
                      </Table>
                    </Card>
                  ))
                )}
              </div>
              <div className="flex justify-end space-x-2 py-4">
                <div>
                  {!disabled && (
                    <Button variant="default" type="submit" size="sm">
                      Submit Score
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </Form>
        </div>
      </ScrollArea>
      <div></div>
    </CardWrap>
  );
};

export default JudgingMultiple;
