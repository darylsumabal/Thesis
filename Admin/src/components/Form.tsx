import { cn } from "@/lib/utils";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Field } from "./Card";
import ActionCombobox from "./Combobox";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Popover, PopoverContent } from "./ui/popover";
import { Textarea } from "./ui/textarea";

type comboboxField = {
  value: string;
  label: string;
};

type FormProps<TSchema extends z.ZodType> = {
  fields: Field[];
  fieldNames: Record<keyof z.infer<TSchema>, any>;
  comboboxField?: comboboxField[];
  buttonText: string;
  onSubmit: (data: z.infer<TSchema>) => Promise<void>;
  submitCombobox?: boolean;
  form: UseFormReturn<any>;
  fileInputRef?: React.RefObject<HTMLInputElement>;
};

const ActionForm = <TSchema extends z.ZodType>({
  fields,
  fieldNames,
  comboboxField,
  buttonText,
  form,
  fileInputRef,
  onSubmit,
  submitCombobox,
}: FormProps<TSchema>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <div className="grid w-full items-center gap-4">
          {fields.map((input, index) => (
            <FormField
              key={index}
              control={form.control}
              name={fieldNames[input.label]}
              render={({ field }) => (
                <div className="flex flex-col space-y-1.5">
                  {input.inputType === "date" && (
                    <FormItem className="w-full flex flex-col">
                      <FormLabel>{input.label}</FormLabel>
                      <Popover open={isOpen} onOpenChange={setIsOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {typeof field.value === "string" &&
                              field.value ? (
                                format(new Date(field.value), "MMMM d, yyyy")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="center">
                          <Calendar
                            mode="single"
                            selected={
                              typeof field.value === "string" && field.value
                                ? new Date(field.value)
                                : undefined
                            }
                            onSelect={(date) => {
                              if (date) {
                                field.onChange(
                                  format(new Date(date), "MMMM d, yyyy")
                                );
                              }
                              setIsOpen(false);
                            }}
                            disabled={(date) => date < new Date("1900-01-01")}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}

                  {input.inputType === "combobox" && (
                    <FormItem>
                      <FormLabel className="font-medium">
                        {input.label}
                      </FormLabel>
                      <Controller
                        name={field.name}
                        control={form.control}
                        render={({ field }) => (
                          <ActionCombobox
                            data={comboboxField ?? []}
                            values={
                              typeof field.value === "string" ? field.value : ""
                            }
                            onSelect={(selectedValue) =>
                              field.onChange(selectedValue)
                            }
                            submit={submitCombobox}
                          />
                        )}
                      />
                    </FormItem>
                  )}

                  {input.inputType === "file" && (
                    <FormItem>
                      <FormLabel htmlFor={input.label} className="font-medium ">
                        {input.label}
                      </FormLabel>
                      <Input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0] ?? null;
                          field.onChange(file);
                        }}
                        id={input.label}
                        autoComplete="off"
                        value={undefined}
                      />
                    </FormItem>
                  )}

                  {input.inputType === "textarea" && (
                    <FormItem>
                      <FormLabel className="font-medium" htmlFor={input.label}>
                        {input.label}
                      </FormLabel>
                      <Textarea
                        {...field}
                        id={input.label}
                        value={
                          typeof field.value === "string" ? field.value : ""
                        }
                      />
                    </FormItem>
                  )}

                  {input.inputType !== "file" &&
                    input.inputType !== "combobox" &&
                    input.inputType !== "date" &&
                    input.inputType !== "textarea" && (
                      <FormItem>
                        <FormLabel
                          htmlFor={input.label}
                          className="font-medium "
                        >
                          {input.label}
                        </FormLabel>
                        <Input
                          type={input.inputType}
                          {...field}
                          id={input.label}
                          value={
                            typeof field.value === "string" ? field.value : ""
                          }
                          autoComplete="off"
                        />
                      </FormItem>
                    )}
                  <FormMessage />
                </div>
              )}
            />
          ))}
        </div>
        <div className="mt-10 ">
          <Button type="submit" className="w-full">
            {buttonText}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ActionForm;
