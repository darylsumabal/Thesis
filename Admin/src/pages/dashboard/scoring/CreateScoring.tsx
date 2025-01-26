import CardWrap from "@/components/Card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  useAddCriteria,
  useShowJudges,
} from "@/hooks/tanstack/scoring/scoring";
import { formSchema, FormValues } from "@/schema/scoring";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useLocation, useParams } from "react-router-dom";
import { toast, Toaster } from "sonner";

const CreateScoring = () => {
  const [selectedJudges, setSelectedJudges] = useState<string[]>([]);
  const [addedJudges, setAddedJudges] = useState<string[]>([]);
  const [judgesId, setJudgesId] = useState<number[]>([]);
  const { mutateAsync } = useAddCriteria();
  const params = useParams();
  const location = useLocation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      criteria: [{ evaluationCriterion: "", score: 0 }],
      judges: [],
    },
  });

  const { label, info } =
    (location.state as { label: string; info: string }) || {};

  const items = info.split("/").reverse();

  const capitalize = items
    .map((item: string) =>
      item
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join("-")
    )
    .join(" ");

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "criteria",
  });

  const totalScore = form.watch("criteria").reduce((sum, criterion) => {
    return sum + (Number(criterion.score) || 0);
  }, 0);

  const onSubmit = async (data: FormValues) => {
    // const formData = new FormData();

    console.log(data);
    const judges = judgesId.length === 0;
    if (totalScore === 100) {
      // for (const key in data) {
      //   if (key !== "judges") {
      //     formData.append(key, JSON.stringify(data));
      //   }
      // }

      await mutateAsync({ id: Number(params.id), data: data });
    }
    if (judges) {
      toast.error("Please add a judges");
    } else {
      toast.error("Evaluation score must be total of 100");
    }
  };

  const handleToggleChange = (value: string, id: number) => {
    setSelectedJudges((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );

    setJudgesId((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
    const selectedJudges = form.watch("judges");

    const updatedSelectedJudges = selectedJudges.map((judge: any) =>
      typeof judge === "number" ? { id: judge } : judge
    );

    const updatedJudges = judgesId.some((judge) => judge === id)
      ? judgesId.filter((item) => item !== id)
      : [...updatedSelectedJudges, { id }];

    form.setValue("judges", updatedJudges);
  };

  const handleAddJudges = () => {
    setAddedJudges(selectedJudges);
    setJudgesId(judgesId);
  };

  const { data: useGetJudges } = useShowJudges();

  const dataJudges = useGetJudges?.map((item) => ({
    id: item.id,
    value: item.name,
    label: item.name,
  }));

  return (
    <div className="h-full">
      <Toaster richColors position="top-right" />
      <CardWrap title={label} info={capitalize}>
        <ScrollArea className="w-full flex flex-col gap-4 h-[calc(100vh-15rem)]">
          <Form {...form}>
            <Card className="p-2 border-2 ">
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <div className="mb-2">Add Judges</div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <PlusCircleIcon className="cursor-pointer hover:text-slate-950/50" />
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Select Judges</DialogTitle>
                        <DialogDescription>
                          Choose a judges. Click add judges when you're done.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid  gap-4 py-4">
                        <ToggleGroup type="multiple" variant={"outline"}>
                          <div className="grid grid-cols-3 items-center gap-4">
                            {dataJudges?.map((item) => (
                              <ToggleGroupItem
                                key={item.id}
                                value={item.label}
                                aria-label={item.label}
                                onClick={() =>
                                  handleToggleChange(item.label, item.id)
                                }
                              >
                                {item.label}
                              </ToggleGroupItem>
                            ))}
                          </div>
                        </ToggleGroup>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant={"default"} onClick={handleAddJudges}>
                            Add Judges
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <div className="mt-4">
                    {/* grid grid-cols-5 gap-2 */}
                    <ul className="flex flex-wrap gap-2">
                      {addedJudges.map((item) => (
                        <li
                          className="border-2 border-slate-200 p-2 rounded-sm"
                          key={item}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Evaluation Criterion</TableHead>
                        <TableHead>Score</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {fields.map((field, index) => (
                        <TableRow key={field.id}>
                          <TableCell>
                            <FormField
                              control={form.control}
                              name={`criteria.${index}.evaluationCriterion`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      placeholder="Enter criterion"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell>
                            <FormField
                              control={form.control}
                              name={`criteria.${index}.score`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      type="number"
                                      value={field.value || ""}
                                      placeholder="Enter score"
                                      onChange={(e) =>
                                        field.onChange(Number(e.target.value))
                                      }
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
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

                <div className="flex items-center justify-between space-x-2 py-4">
                  <div className="space-x-2">
                    <Button
                      variant="outline"
                      type="button"
                      size="sm"
                      onClick={() =>
                        append({ evaluationCriterion: "", score: 0 })
                      }
                    >
                      Add Row
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      type="button"
                      onClick={() =>
                        fields.length > 1 && remove(fields.length - 1)
                      }
                    >
                      Delete Row
                    </Button>
                  </div>
                  <div>
                    <Button variant="default" type="submit" size="sm">
                      Create Criteria
                    </Button>
                  </div>
                </div>
              </form>
            </Card>
          </Form>
        </ScrollArea>
      </CardWrap>
    </div>
  );
};

export default CreateScoring;
