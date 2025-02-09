import CardWrap from "@/components/Card";
import TableAction from "@/components/Table";
import { useGetPointBasedCriteria } from "@/hooks/tanstack/criteria/criteria";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { columns } from "./columns";

const ViewPointBased = () => {
  const { group_id } = useParams();

  const { data } = useGetPointBasedCriteria(group_id ?? "");

  const flattenedData = useMemo(() => {
    return data?.flatMap((item) => item.criteria) ?? [];
  }, [data]);

  return (
    <CardWrap title="Criteria" info="Criteria List">
      <div className="w-full">
        <div className="rounded-md border">
          <TableAction column={columns} data={flattenedData} />
        </div>
      </div>
    </CardWrap>
  );
};

export default ViewPointBased;
