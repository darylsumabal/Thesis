import { z } from "zod";

export const pointBasedSchema = z.object({
  evaluationCriterion: z
    .string()
    .min(1, { message: "Please enter a criterion" }),
  score: z
    .number()
    .min(1, {
      message: "Score must be between 0 and 100",
    })
    .max(100, { message: "Score must be between 0 and 100" }),
});

const judgesSchema = z.object({
  id: z.number(),
});

export const formSchema = z.object({
  criteria: z.array(pointBasedSchema),
  judges: z.array(judgesSchema),
});

export type FormValues = z.infer<typeof formSchema>;

export const multipleRoundSchema = z.object({
  evaluationCriterion: z
    .string()
    .min(1, { message: "Please enter a criterion" }),
  score: z
    .number()
    .min(1, {
      message: "Score must be between 0 and 100",
    })
    .max(100, { message: "Score must be between 0 and 100" }),
});

export const Schema = z.object({
  judges: z.array(judgesSchema),
  multiple: z.object({
    criteria: z.array(
      z.object({
        round: z.number(),
        criterion: z.array(multipleRoundSchema),
      })
    ),
  }),
});

export type MultipleRound = z.infer<typeof Schema>;

{
  /* {fieldRound.map((_, idx) => (
                <Card className="p-2 border-2" key={idx}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    {fieldRound.length > 1 && idx > 0 && (
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
                                {idx}
                                {index}
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
                                            field.onChange(
                                              Number(e.target.value)
                                            )
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
                              {handleWatchScore(idx)}/100
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
                          onClick={() => handleAddRow(idx)}
                        >
                          {idx + 1}
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
                        {idx === fieldRound.length - 1 && (
                          <Button variant="default" type="submit" size="sm">
                            Create Criteria
                          </Button>
                        )}
                      </div>
                    </div>
                  </form>
                </Card>
              ))} */
}
