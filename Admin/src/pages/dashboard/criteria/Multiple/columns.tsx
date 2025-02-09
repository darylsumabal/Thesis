import { a } from "@/services/api/criteria/criteria";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<a>[] = [
  {
    header: "Criteria",
  },
  {
    header: "Score",
  },
  {
    header: "Action",
  },
];
