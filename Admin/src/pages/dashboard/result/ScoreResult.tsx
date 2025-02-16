import CardWrap from "@/components/Card";
import ActionCombobox from "@/components/Combobox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useShowMultipleResult,
  useShowResult,
} from "@/hooks/tanstack/result/result";
import { IMAGES } from "@/lib/constant/images";
import {
  COMBOBOX_FILTER_CHART_TYPE,
  COMBOBOX_RESULT_TYPE,
  OVERALL_SCORE_FIELDS,
  RESULT_FIELDS,
} from "@/lib/constant/result";
import { urlSrc } from "@/lib/helper-src";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import { columns } from "./column";

const chartData = [
  { month: "Participant Name", desktop: 91 },
  { month: "Participant Name", desktop: 95 },
  { month: "Participant Name", desktop: 88 },
  { month: "Participant Name", desktop: 89 },
  { month: "Participant Name", desktop: 94 },
  { month: "Participant Name", desktop: 91 },
];

const chartSortedData = chartData.sort((a, b) => a.desktop - b.desktop);

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const ScoreResult = () => {
  const { contest_id, group_id } = useParams();

  const { data } = useShowResult(Number(contest_id), group_id ?? "");

  const { data: multipleData } = useShowMultipleResult(
    Number(contest_id),
    group_id ?? ""
  );

  const currentPath = location.pathname.substring(11).trim();

  const route = "result/contest-result/point";

  const isIncluded = currentPath.includes(route);

  let test = data;
  const dataCondition = isIncluded ? (test = data) : (test = multipleData);

  const sortedData = data?.sort((a, b) => {
    const aScore = a.overall_scores ? parseFloat(a.overall_scores.score) : 0;
    const bScore = b.overall_scores ? parseFloat(b.overall_scores.score) : 0;
    return bScore - aScore;
  });

  const [selectedValue, setSelectedValue] = useState("CARD");

  const setBackgroundColor = (index: number) => {
    switch (index) {
      case 1:
        return "bg-yellow-500";
      case 2:
        return "bg-gray-300";
      case 3:
        return "bg-orange-400";
      default:
        return "";
    }
  };

  const setMedal = (index: number) => {
    switch (index) {
      case 1:
        return IMAGES.goldMedal;
      case 2:
        return IMAGES.silverMedal;
      case 3:
        return IMAGES.bronzeMedal;
      default:
        return IMAGES.medal;
    }
  };

  const table = useReactTable({
    data: dataCondition ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // overflow-y-scroll h-[calc(100vh-12rem)]
  return (
    <CardWrap title="Contest Result" info="Results">
      <div className="w-32 mb-2">
        <ActionCombobox
          onSelect={(value) => setSelectedValue(value)}
          values="CARD"
          data={COMBOBOX_RESULT_TYPE}
        />
      </div>
      <ScrollArea className="h-[calc(100vh-12rem)]">
        {selectedValue === "CARD" && (
          <div className="grid grid-cols-2 2xl:grid-cols-5 gap-7">
            {sortedData?.map((item, index) => (
              <Card
                className={`p-6 w-96 h-fit relative border-2 ${setBackgroundColor(
                  index + 1
                )}`}
                key={index}
              >
                <div className="absolute top-2">
                  <img src={setMedal(index + 1)} alt="" className="h-14" />
                </div>
                <div className="flex flex-col w-full space-y-4">
                  <div>
                    <img
                      src={`${urlSrc}${item.participant.poster_url}`}
                      alt={`${urlSrc}${item.participant.poster_url}`}
                      className="h-96 w-full rounded-md border border-slate-950"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2 ">
                      {RESULT_FIELDS.map(({ label, value }) => (
                        <div className="flex gap-2" key={label}>
                          <h3 className="font-medium">{label}:</h3>
                          <p>{value(item.participant)}</p>
                        </div>
                      ))}
                    </div>

                    {/* <div className="flex flex-col gap-2 ">
                      {Object.entries(item.total_scores).map(
                        ([criteria, score]) => (
                          <div className="flex gap-2" key={criteria}>
                            <h3 className="font-medium capitalize">
                              {criteria}:
                            </h3>
                            <p>{score}</p>
                          </div>
                        )
                      )}
                    </div> */}
                    <div className="flex flex-col gap-2 ">
                      {OVERALL_SCORE_FIELDS.map(({ label, value }) => (
                        <div className="flex gap-2" key={label}>
                          <h3 className="font-medium">{label}:</h3>
                          <p>{value(item.overall_scores)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
        {selectedValue === "TABLE" && (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead className="text-slate-950" key={header.id}>
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
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row, index) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className={`${setBackgroundColor(
                        index + 1
                      )} hover:${setBackgroundColor(index + 1)}`}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
        {selectedValue === "CHART" && (
          <Card className="p-6 w-3/4 border-2">
            <div className="w-32 mb-2">
              {
                // the function onSubmit props become optional remove it when it is finalize
              }
              <ActionCombobox values="CARD" data={COMBOBOX_FILTER_CHART_TYPE} />
            </div>
            <CardHeader>
              <CardTitle>Bar Chart - Label</CardTitle>
              <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <BarChart
                  accessibilityLayer
                  data={chartSortedData}
                  margin={{
                    top: 20,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar dataKey="desktop" fill="black" radius={8}>
                    <LabelList
                      position="top"
                      offset={12}
                      className="fill-foreground"
                      fontSize={12}
                    />
                  </Bar>
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        )}
      </ScrollArea>
    </CardWrap>
  );
};

export default ScoreResult;
