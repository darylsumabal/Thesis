import { ComboboxData } from "@/components/Combobox";
import { OverAllScore, Participant } from "@/services/api/result/result";

type ResultFields<T, R = string | number> = {
  label: string;
  value: (item: T) => R;
};

export const RESULT_FIELDS: ResultFields<Participant>[] = [
  {
    label: "First Name",
    value: (item) => item.first_name,
  },
  {
    label: "Last Name",
    value: (item) => item.last_name,
  },
  {
    label: "Gender",
    value: (item) => item.gender,
  },
];

export const OVERALL_SCORE_FIELDS: ResultFields<OverAllScore>[] = [
  {
    label: "Total Score",
    value: (item) => item?.score,
  },
];

export const COMBOBOX_RESULT_TYPE: ComboboxData[] = [
  {
    label: "CARD",
    value: "CARD",
  },
  {
    label: "TABLE",
    value: "TABLE",
  },
];

{
  /* <p className="font-medium">
                      Total:{" "}
                      {(
                        Object.values(item.total_scores).reduce(
                          (sum, score) => sum + Number(score),
                          0
                        ) / Object.keys(item.total_scores).length
                      ).toFixed(2)}
                    </p> */
}

// if (id && participantScores[id]) {
//   form.reset(participantScores[id]);
// } else if (id) {
//   form.reset();
// }

// <FormField
// control={form.control}
// name={`criteria.${index}.score`}
// render={({ field }) => (
//   <FormItem>
//     <FormControl>
//       <div className="h-10 px-3 py-2 border-slate-200 border rounded-md text-base text-slate-950 flex items-center">
//         {criteria.evaluation_criteria}
//       </div>
//     </FormControl>
//     <FormMessage className="" />
//   </FormItem>
// )}
// />

// <div key={criteria.id} className="">
//   {/* <div className="h-10 px-3 py-2 border-slate-200 border rounded-md text-base text-slate-950 flex items-center">
//     {criteria.evaluation_criteria}
//   </div> */}
// </div>
