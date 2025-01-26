import { UseMutateAsyncFunction } from "@tanstack/react-query";
import { format } from "date-fns";
import { useRef, useState } from "react";
import { UseFormReturn } from "react-hook-form";

type SubmitParams = {
  data: { [x: string]: any };
  mutationFn: UseMutateAsyncFunction<any, unknown, any>;
  form: UseFormReturn<any>;
  id?: string;
};

const useHandleOnSubmit = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleOnSubmit = async ({
    data,
    mutationFn,
    form,
    id,
  }: SubmitParams) => {
    console.log(data);

    const formData = new FormData();

    const formatDate = format(new Date, "yyyy-MM-dd");
    console.log(formatDate)
    for (const key in data) {
      if (key !== data.date) {
        formData.append(key, data[key as keyof typeof data]);
      }
    }
    formData.append("date",formatDate)

    await mutationFn({ data: formData, id: id });

    form.reset();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setIsSubmit(true);
  };
  return { handleOnSubmit, isSubmit, fileInputRef };
};

export default useHandleOnSubmit;
