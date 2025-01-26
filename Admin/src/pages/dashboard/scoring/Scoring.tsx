import CardWrap from "@/components/Card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGetScoring } from "@/hooks/tanstack/scoring/scoring";
import { SCORING_FIELDS } from "@/lib/constant/scoring";
import { urlSrc } from "@/lib/helper-src";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const Scoring = () => {
  const location = useLocation();
  const [text, setText] = useState({
    title: "",
    info: "",
  });
  
  const route = [
    "scoring/point-based",
    "scoring/ranked-based",
    "scoring/percentage-based",
    "scoring/multiple-round",
  ];
  const currentPath = location.pathname.substring(11).trim();

  const [data, setData] = useState<string>("");

  const { data: getScoring } = useGetScoring(data);

  useEffect(() => {
    if (route.includes(currentPath)) {
      const title = currentPath.split("/").reverse();

      const capitalizeTitle = title[0]
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      setData(capitalizeTitle);
      const info = currentPath
        .split("/")
        .reverse()
        .map((item: string) =>
          item
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join("-")
        )
        .join(" ");

      setText((prevProps) => ({
        ...prevProps,
        title: capitalizeTitle,
        info: info,
      }));
    }
  }, [currentPath]);

  return (
    <div className="h-full">
      {route.includes(currentPath) ? (
        <CardWrap title={text.title} info={text.info}>
          <div className="grid grid-cols-2  2xl:grid-cols-5 gap-7 h-[calc(100vh-15rem)] overflow-y-scroll ">
            {getScoring?.map((item, index) => (
              <Card className="p-6 w-96 h-fit border-2" key={index}>
                <div className="flex flex-col w-full space-y-4">
                  <div>
                    <img
                      src={`${urlSrc}${item.contest_poster}`}
                      alt={`${urlSrc}${item.contest_poster}`}
                      className="h-96 w-full rounded-md border border-slate-950"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex flex-col gap-2 ">
                      {SCORING_FIELDS.map(({ label, value }) => (
                        <div className="flex gap-2" key={label}>
                          <h3 className="font-medium">{label}:</h3>
                          <p>{value(item)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Link
                      to={`contest/${item.id}/create-criteria`}
                      state={{
                        label: item.contest_name,
                        info: currentPath,
                        id: item.id,
                      }}
                    >
                      <Button>Create criteria</Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardWrap>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default Scoring;
