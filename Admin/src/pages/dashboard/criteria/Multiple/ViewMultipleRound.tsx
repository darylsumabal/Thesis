import CardWrap from "@/components/Card";
import ActionForm from "@/components/Form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useGetMultipleRoundCriteria,
  useUpdateMultipleCriteria,
} from "@/hooks/tanstack/criteria/criteria";
import { EDIT_CRITERIA, EDIT_FIELD_CRITERIA } from "@/lib/constant/criteria";
import {
  editCriteriaDefaultValue,
  editCriteriaSchema,
} from "@/schema/criteria";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";
import { columns } from "./columns";
const ViewMultipleRound = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<number>();
  const { group_id } = useParams();

  const { data } = useGetMultipleRoundCriteria(group_id ?? "");

  const { mutateAsync } = useUpdateMultipleCriteria();

  const flattenedData = useMemo(() => {
    return data?.flatMap((item) => item.criteriaMultipleRound) ?? [];
  }, [data]);

  const table = useReactTable({
    data: flattenedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleOpen = (id: number) => {
    setId(id);
    setOpen(!open);
  };

  const form = useForm({
    resolver: zodResolver(editCriteriaSchema),
    defaultValues: editCriteriaDefaultValue,
  });

  const test = async (data: z.infer<typeof editCriteriaSchema>) => {
    try {
      mutateAsync({
        evaluation_criteria: data.evaluation_criteria,
        id: id ?? 0,
      });

      form.reset();
      setOpen(!open);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CardWrap title="Criteria" info="Criteria List">
      <div className="w-full space-y-4">
        {flattenedData.map((i) => (
          <Card className="p-2 border-2" key={i.round}>
            <div>Round {i.round}</div>
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {i.criteria.map((i, idx) => (
                  <TableRow key={i.id}>
                    <TableCell>{i.evaluation_criteria}</TableCell>
                    <TableCell>{i.score}</TableCell>
                    <TableCell>
                      <div key={idx} className="space-y-2">
                        <div className="py-2 border-b last:border-b-0">
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full">
                              <div className="flex flex-col gap-2 w-full">
                                <div>
                                  <h4 className="font-medium leading-none">
                                    Actions
                                  </h4>
                                </div>
                                <Button
                                  className="font-normal"
                                  variant="default"
                                  onClick={() => handleOpen(i.id)}
                                >
                                  Edit
                                </Button>
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        ))}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Multiple Round</DialogTitle>
              <DialogDescription>Edit Criteria</DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div>
                <ActionForm
                  fields={EDIT_CRITERIA}
                  fieldNames={EDIT_FIELD_CRITERIA}
                  buttonText="Save"
                  onSubmit={test}
                  form={form}
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </CardWrap>
  );
};

export default ViewMultipleRound;
