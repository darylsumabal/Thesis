import { MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { UseMutateAsyncFunction } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

type PopoverProps = {
  tanstack: UseMutateAsyncFunction<
    AxiosResponse<any, any>,
    Error,
    { id: string },
    unknown
  >;
  id: string;
};

const ActionPopover = ({ tanstack, id }: PopoverProps) => {
  const handleDelete = (id: string) => {
    return tanstack({ id });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex justify-end w-full">
          <Button variant="ghost" className="h-4 p-0">
            <MoreHorizontal />
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-full p-2" align="end">
        <div className="flex flex-col gap-2 w-full">
          <div>
            <h4 className="font-medium text-xs leading-none">Actions</h4>
          </div>

          <Button
            className="font-normal"
            onClick={() => handleDelete(id)}
            variant="destructive"
          >
            Delete
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ActionPopover;
