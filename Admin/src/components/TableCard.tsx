import { MultipleRound } from "@/schema/scoring";
import { ReactNode } from "react";
import {
  FieldArrayWithId,
  useFieldArray,
  UseFormReturn,
} from "react-hook-form";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

type TestProps = {
  id: string;
  onSubmit: (data: MultipleRound) => Promise<void>;
  fieldRound: FieldArrayWithId<{
    judges: { id: number }[];
    multiple: MultipleRound;
  }>[];
  roundScoring: boolean;
  removeRound: (fieldRounds: number) => void;
  idx: number;
  form: UseFormReturn<MultipleRound>;
  watchScore: (idx: number) => ReactNode;
};

const TableCard = ({
  id,
  onSubmit,
  fieldRound,
  removeRound,
  idx,
  form,
  watchScore,
  roundScoring,
}: TestProps) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `multiple.criteria.${idx}.criterion`,
  });

  const handleAddRow = () => {
    append({
      evaluationCriterion: "",
      score: 0,
    });
  };

  return (
    <>
      <Card className="p-2 border-2" key={id}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {roundScoring && fieldRound.length > 1 && idx > 0 && (
            <Button
              className="text-xs"
              size={"sm"}
              type="button"
              onClick={() => removeRound(fieldRound.length - 1)}
            >
              Remove Round
            </Button>
          )}

          <div>Round {idx + 1}</div>
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
                        name={`multiple.criteria.${idx}.criterion.${index}.evaluationCriterion`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...field}
                                value={field.value ?? ""}
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
                        name={`multiple.criteria.${idx}.criterion.${index}.score`}
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
                    {watchScore(idx)}/100
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
                onClick={() => handleAddRow()}
              >
                Add Row
              </Button>
              <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={() => fields.length > 1 && remove(fields.length - 1)}
              >
                Delete Row
              </Button>
            </div>
            <div>
              {idx === fieldRound.length - 1 && (
                <Button variant="default" type="submit" size="sm">
                  Create Criteria
                </Button>
              )}
            </div>
          </div>
        </form>
      </Card>
    </>
  );
};

export default TableCard;
