import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseMutateAsyncFunction } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z, ZodSchema } from "zod";
import { Field } from "./Card";
import ActionForm from "./Form";
import { ComboboxData } from "./Combobox";

export type DefaultValues = {
  [key: string]: string | File | null;
};

type DialogProps<TSchema extends ZodSchema> = {
  buttonTitle: string;
  dialogTitle: string;
  dialogDescription: string;
  dialogInputLabel: Field[];
  buttonSaveTitle: string;
  schema: z.ZodObject<any, any> | z.ZodEffects<z.ZodObject<any, any>>;
  defaultValues: DefaultValues;
  fieldNames: DefaultValues;
  mutate?: UseMutateAsyncFunction<
    any,
    Error,
    z.infer<TSchema>,
    // z.infer<TSchema> & { id: string | null },
    unknown
  >;
  comboboxField?: ComboboxData[];
  open?: boolean;
  handleClose?: () => void;
  showButton: boolean;
  id?: string;
};

const ActionDialog = <TSchema extends ZodSchema>(
  props: DialogProps<TSchema>
) => {
  const {
    buttonTitle,
    buttonSaveTitle,
    dialogDescription,
    dialogInputLabel,
    dialogTitle,
    schema,
    defaultValues,
    fieldNames,
    comboboxField,
    mutate,
    open,
    handleClose,
    showButton,
    id,
  } = props;

  const [isSubmit, setIsSubmit] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open);
    }
  }, [open]);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  const handleOnSubmit = async (data: z.infer<typeof schema>) => {
    const formData = new FormData();

    try {
      for (const key in data) {
        formData.append(key, data[key]);
      }
      await mutate?.({ id: id || null, form: formData });
      setIsOpen(false);
      setIsSubmit(false);
      form.reset();
      if (handleClose) handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleResetCloseDialog = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      form.reset();
      if (handleClose) handleClose();
    }
  };

  return (
    <Dialog onOpenChange={handleResetCloseDialog} open={isOpen}>
      {showButton ? (
        <DialogTrigger asChild>
          <Button variant="default" onClick={() => setIsOpen(true)}>
            {buttonTitle}
          </Button>
        </DialogTrigger>
      ) : (
        <DialogTrigger asChild />
      )}

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div>
            <ActionForm
              fields={dialogInputLabel}
              fieldNames={fieldNames}
              comboboxField={comboboxField}
              buttonText={buttonSaveTitle}
              onSubmit={handleOnSubmit}
              submitCombobox={isSubmit}
              form={form}
              fileInputRef={fileInputRef}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ActionDialog;
