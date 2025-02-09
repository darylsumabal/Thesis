import CardWrap from "@/components/Card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useShowScoreCriteria } from "@/hooks/tanstack/criteria/criteria";
import { SCORING_FIELDS } from "@/lib/constant/scoring";
import { urlSrc } from "@/lib/helper-src";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Toaster } from "sonner";

const Criteria = () => {
  const { data } = useShowScoreCriteria();
  const location = useLocation();
  const currentPath = location.pathname.substring(11).trim();
  const [title, setTitle] = useState<string>("");
  const route = ["criteria/criteria-judges", "criteria/criteria-list"];

  useEffect(() => {
    if (currentPath === "criteria/criteria-judges") {
      setTitle("Judging");
    } else {
      setTitle("Criteria");
    }
  }, [currentPath]);

  return (
    <>
      <Toaster position="top-right" richColors />
      {route.includes(currentPath) ? (
        <CardWrap title={title} info="Manage Criteria">
          <div className="grid grid-cols-2 2xl:grid-cols-5 gap-7 overflow-y-scroll h-[calc(100vh-12rem)]">
            {data?.map((item) => (
              <Card className="p-6 w-96 h-fit border-2" key={item.id}>
                <div className="flex flex-col w-full space-y-4">
                  <div>
                    <img
                      src={`${urlSrc}${item.contest.contest_poster}`}
                      alt={`${urlSrc}${item.contest.contest_poster}`}
                      className="h-96 w-full rounded-md border border-slate-950"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex flex-col gap-2 ">
                      {SCORING_FIELDS.map(({ label, value }) => (
                        <div className="flex gap-2" key={label}>
                          <h3 className="font-medium">{label}:</h3>
                          <p>{value(item.contest)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    {SCORING_FIELDS.map(({ label, value }) => (
                      <div key={label}>
                        {value(item.contest) === "Multiple Round" && (
                          <Link
                            to={`contest/${item.contest_id}/${
                              item.group_id
                            }/${title.toLocaleLowerCase()}-multiple-round`}
                          >
                            <Button>View</Button>
                          </Link>
                        )}
                        {value(item.contest) === "Point Based" && (
                          <Link
                            to={`contest/${item.contest_id}/${
                              item.group_id
                            }/${title.toLocaleLowerCase()}-point-based`}
                          >
                            <Button>View</Button>
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardWrap>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default Criteria;
