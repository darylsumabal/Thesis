import ActionForm from "@/components/Form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useUpdateCriteria } from "@/hooks/tanstack/criteria/criteria";
import { EditCriteria, editFieldCriteria } from "@/lib/constant/criteria";
import {
  editCriteriaDefaultValue,
  editCriteriaSchema,
} from "@/schema/criteria";
import { criteria } from "@/services/api/criteria/criteria";
import { zodResolver } from "@hookform/resolvers/zod";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const columns: ColumnDef<criteria>[] = [
  {
    accessorFn: (item) => item.evaluation_criteria,
    accessorKey: "evaluation_criteria",
    header: "Criteria",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("evaluation_criteria")}</div>
    ),
  },
  {
    accessorFn: (item) => item.score,
    accessorKey: "score",
    header: "Score",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("score")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const [isDialogOpen, setIsDialogOpen] = useState(false);

      const accountId = row.original.id;

      const { mutateAsync } = useUpdateCriteria();

      const form = useForm({
        resolver: zodResolver(editCriteriaSchema),
        defaultValues: editCriteriaDefaultValue,
      });

      const handleEditClick = () => {
        setIsDialogOpen(true);
      };

      const handleOnSubmit = async (data: { [x: string]: any }) => {
        const formData = new FormData();
        try {
          setIsDialogOpen(false);
          formData.append("evaluation_criteria", data.evaluation_criteria);

          mutateAsync({
            evaluation_criteria: data.evaluation_criteria,
            id: accountId,
          });
        } catch (error) {
          console.log(error);
        }
      };

      return (
        <>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full">
              <div className="flex flex-col gap-2 w-full">
                <div>
                  <h4 className="font-medium leading-none">Actions</h4>
                </div>
                <Button
                  className="font-normal"
                  variant="default"
                  onClick={handleEditClick}
                >
                  Edit
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>edit</DialogTitle>
                <DialogDescription>edit</DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div>
                  <ActionForm
                    fields={EditCriteria}
                    fieldNames={editFieldCriteria}
                    buttonText="Save"
                    onSubmit={handleOnSubmit}
                    form={form}
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </>
      );

      // return (
      //   <>
      //     <Popover>
      //       <PopoverTrigger asChild>
      //         <Button variant="ghost" className="h-8 w-8 p-0">
      //           <MoreHorizontal />
      //         </Button>
      //       </PopoverTrigger>
      //       <PopoverContent className="w-full ">
      //         <div className="flex flex-col gap-2 w-full">
      //           <div>
      //             <h4 className="font-medium leading-none">Actions</h4>
      //           </div>
      //           <Button
      //             className="font-normal"
      //             variant="default"
      //             onClick={handleEditClick}
      //           >
      //             Edit
      //           </Button>
      //         </div>
      //       </PopoverContent>
      //     </Popover>
      //     {isDialogOpen && (
      //       // <ActionDialog
      //       //   buttonSaveTitle="Save"
      //       //   buttonTitle="Edit"
      //       //   dialogTitle="Edit criteria"
      //       //   dialogDescription="Criteria Info"
      //       //   dialogInputLabel={EditCriteria}
      //       //   schema={editCriteriaSchema}
      //       //   defaultValues={editCriteriaDefaultValue}
      //       //   fieldNames={editFieldCriteria}
      //       //   mutate={mutateAsync}
      //       //   open={isDialogOpen}
      //       //   handleClose={handleClose}
      //       //   showButton={false}
      //       //   id={accountID}
      //       // />

      //       <Dialog onOpenChange={handleResetCloseDialog} open={isOpen}>
      //         <DialogTrigger asChild />

      //         <DialogContent className="sm:max-w-[425px]">
      //           <DialogHeader>
      //             <DialogTitle>edit</DialogTitle>
      //             <DialogDescription>edit</DialogDescription>
      //           </DialogHeader>

      //           <div className="grid gap-4 py-4">
      //             <div>
      //               <ActionForm
      //                 fields={EditCriteria}
      //                 fieldNames={editFieldCriteria}
      //                 buttonText="Save"
      //                 onSubmit={handleOnSubmit}
      //                 form={form}
      //               />
      //             </div>
      //           </div>
      //         </DialogContent>
      //       </Dialog>
      //     )}

      //     {/* <Form {...form}>
      //       <form onSubmit={form.handleSubmit(handleOnSubmit)}>
      //         <FormField
      //           control={form.control}
      //           name={editFieldCriteria["Edit Criteria"]}
      //           render={({ field }) => (
      //             <FormItem>
      //               <FormLabel className="font-medium ">EDIT</FormLabel>
      //               <Input
      //                 type="text"
      //                 {...field}
      //                 value={typeof field.value === "string" ? field.value : ""}
      //                 autoComplete="off"
      //               />
      //             </FormItem>
      //           )}
      //         />
      //         <Button type="submit">Save</Button>
      //       </form>
      //     </Form> */}
      //   </>
      // );
    },
  },
];
