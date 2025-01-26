import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReactNode } from "react";

export type Field = {
  label: string;
  inputType:
    | "email"
    | "file"
    | "password"
    | "text"
    | "date"
    | "combobox"
    | "textarea";
};

type CardWrapProps = {
  title: string;
  info: string;
  children: ReactNode;
  fields?: Field[];
};

const CardWrap = ({ title, info, children }: CardWrapProps) => {
  return (
    <Card className="h-full rounded-none bg-[#fafafa]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{info}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default CardWrap;
