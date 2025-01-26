import CardWrap from "@/components/Card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useShowScoreCriteria } from "@/hooks/tanstack/criteria/criteria";
import { SCORING_FIELDS } from "@/lib/constant/scoring";
import { urlSrc } from "@/lib/helper-src";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Toaster } from "sonner";

const Result = () => {
  const { data } = useShowScoreCriteria();
  const location = useLocation();
  const currentPath = location.pathname.substring(11).trim();

  const route = ["result/contest-result"];
  console.log(data);
  return (
    <>
      <Toaster position="top-right" richColors />
      {route.includes(currentPath) ? (
        <CardWrap title="Result" info="View Contest Result">
          <div className="grid grid-cols-2 2xl:grid-cols-5 gap-7 overflow-y-scroll h-[calc(100vh-12rem)]">
            {data?.map((item) => (
              <Card className="p-6 w-96 h-fit border-2" key={item.id}>
                <div className="flex flex-col w-full space-y-4">
                  <div>
                    <img
                      src={`${urlSrc}${item.contest.contest_poster}`}
                      alt={`${urlSrc}${item.contest.contest_poster}`}
                      className="h-96 w-full rounded-md borderborder-slate-950"
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
                    <Link
                      to={`result/${item.contest_id}/${item.group_id}/contest-result`}
                    >
                      <Button>View</Button>
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
    </>
  );
};

export default Result;
