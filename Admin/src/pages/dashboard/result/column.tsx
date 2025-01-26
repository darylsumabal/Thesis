import { urlSrc } from "@/lib/helper-src";
import { Score } from "@/services/api/result/result";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Score>[] = [
  {
    header: "Places",
    cell: ({ row }) => (
      <div className="text-4xl font-medium">{row.index + 1}</div>
    ),
  },
  {
    accessorFn: (row) => row.participant.poster_url,
    id: "poster_url",
    header: "Image",
    cell: ({ row }) => (
      <img
        className="h-24 w-24"
        src={`${urlSrc}${row.getValue("poster_url")}`}
        alt={`${row.getValue("poster_url")}`}
      />
    ),
  },
  {
    accessorFn: (row) => row.overall_scores?.score || "N/A",
    id: "overall_score",
    header: "Score",
    cell: ({ row }) => (
      <div className="text-4xl font-medium">
        {row.getValue("overall_score")}
      </div>
    ),
  },
];
