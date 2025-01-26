import ActionDialog from "@/components/Dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent } from "@/components/ui/popover";
import {
  useDestroyAccount,
  useEditAccount,
} from "@/hooks/tanstack/account/account";
import { editAccount, fieldEditAccount } from "@/lib/constant/account";
import { editAccountDefualtValue, editAccountSchema } from "@/schema/account";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { Account } from "../../../services/api/account/account";

export const columns: ColumnDef<Account>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "accountType",
    header: () => <div className="text-right">Amount Type</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">
          {row.getValue("accountType")}
        </div>
      );
    },
  },
  {
    id: "id",
    enableHiding: false,
    cell: ({ row }) => {
      const { mutateAsync } = useDestroyAccount();

      const [accountID, setAccountId] = useState<string>("");

      const accountId = row.original.id;

      const { mutateAsync: mutateEditAccount } = useEditAccount();

      const isRowSelected = row.getIsSelected();

      const handleDelete = async () => {
        await mutateAsync({ id: accountId });
      };

      const [isDialogOpen, setIsDialogOpen] = useState(false);

      const handleEditClick = () => {
        setAccountId(accountId);
        setIsDialogOpen(true);
      };

      const handleClose = () => {
        setIsDialogOpen(false);
      };

      return (
        <>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full ">
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
                <Button
                  className="font-normal"
                  onClick={handleDelete}
                  variant="destructive"
                  disabled={!isRowSelected}
                >
                  Delete
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          {isDialogOpen && (
            <ActionDialog
              buttonSaveTitle="Save"
              buttonTitle="Edit"
              dialogTitle="Edit an account"
              dialogDescription="Account Info"
              dialogInputLabel={editAccount}
              schema={editAccountSchema}
              defaultValues={editAccountDefualtValue}
              fieldNames={fieldEditAccount}
              mutate={mutateEditAccount}
              open={isDialogOpen}
              handleClose={handleClose}
              showButton={false}
              id={accountID}
            />
          )}
        </>
      );
    },
  },
];
