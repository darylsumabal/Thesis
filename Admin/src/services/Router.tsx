import { createBrowserRouter, Navigate } from "react-router-dom";
import GuestLayout from "../layout/GuestLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import DefaultLayout from "@/layout/DefaultLayout";
import Dashboard from "@/pages/dashboard/Dashboard";
import Contest from "@/pages/dashboard/contest/Contest";
import Account from "@/pages/dashboard/account/Account";
import Participant from "@/pages/dashboard/participant/Participant";
import Scoring from "@/pages/dashboard/scoring/Scoring";
import Criteria from "@/pages/dashboard/criteria/Criteria";
import Event from "@/pages/dashboard/event/Event";
import CreateScoring from "@/pages/dashboard/scoring/CreateScoring";
import CriteriaJudging from "@/pages/dashboard/criteria/CriteriaJudging";
import Result from "@/pages/dashboard/result/Result";
import ScoreResult from "@/pages/dashboard/result/ScoreResult";
import ViewPointBased from "@/pages/dashboard/criteria/Score/ViewPointBased";
import MultipleScoring from "@/pages/dashboard/scoring/MultipleScoring";
import ViewMultipleRound from "@/pages/dashboard/criteria/Multiple/ViewMultipleRound";
import JudgingMultiple from "@/pages/dashboard/criteria/Multiple/JudgingMultiple";
import ScoreResultMultiple from "@/pages/dashboard/result/ScoreResultMultiple";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <DefaultLayout />,
      children: [
        {
          path: "/",
          element: <Navigate to={"/dashboard"} />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
          children: [
            {
              path: "event/add-event",
              element: <Event />,
            },
            {
              path: "event/upcoming-event",
              element: <Event />,
            },
            {
              path: "event/previous-event",
              element: <Event />,
            },
            {
              path: "contest/add-contest",
              element: <Contest />,
            },
            {
              path: "account/manage-account",
              element: <Account />,
            },
            {
              path: "participant/add-participant",
              element: <Participant />,
            },
            {
              path: "participant/add-team",
              element: <Participant />,
            },
            {
              path: "scoring/point-based",
              element: <Scoring />,
              children: [
                {
                  path: "contest/:id/create-criteria",
                  element: <CreateScoring />,
                },
              ],
            },
            {
              path: "scoring/ranked-based",
              element: <Scoring />,
              children: [
                {
                  path: "create-criteria",
                  element: <CreateScoring />,
                },
              ],
            },
            {
              path: "scoring/percentage-based",
              element: <Scoring />,
              children: [
                {
                  path: "create-criteria",
                  element: <CreateScoring />,
                },
              ],
            },
            {
              path: "scoring/multiple-round",
              element: <Scoring />,
              children: [
                {
                  path: "contest/:id/create-criteria",
                  element: <MultipleScoring />,
                },
              ],
            },
            {
              path: "scoring/judging-panel",
              element: <Scoring />,
            },
            {
              path: "criteria/criteria-judges",
              element: <Criteria />,
              children: [
                {
                  path: "contest/:contest_id/:group_id/judging-point-based",
                  element: <CriteriaJudging />,
                },
                {
                  path: "contest/:contest_id/:group_id/judging-multiple-round",
                  element: <JudgingMultiple />,
                },
              ],
            },
            {
              path: "criteria/criteria-list",
              element: <Criteria />,
              children: [
                {
                  path: "contest/:contest_id/:group_id/criteria-multiple-round",
                  element: <ViewMultipleRound />,
                },
                {
                  path: "contest/:contest_id/:group_id/criteria-point-based",
                  element: <ViewPointBased />,
                },
              ],
            },
            {
              path: "result/contest-result",
              element: <Result />,
              children: [
                {
                  path: "point/:contest_id/:group_id/contest-result",
                  element: <ScoreResult />,
                },
                {
                  path: "multiple/:contest_id/:group_id/contest-result",
                  // element: <ScoreResultMultiple />,
                  element: <ScoreResult />,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      path: "/",
      element: <GuestLayout />,
      children: [
        {
          path: "/",
          element: <Navigate to={"/login"} />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

//   console.log(form.getValues("name"));
//   console.log(form.getValues("description"));
//   console.log(form.getValues("date"));
//   console.log(form.getValues("organizer"));
//   console.log(form.getValues("venue"));
//   console.log(form.getValues("poster"));

//   const onSubmit = async (data: z.infer<typeof schema>) => {
//     console.log(data);

//     const formData = new FormData();

//     const formatDate = format(new Date(data.date), "yyyy-MM-dd");

//     try {
//       for (const key in data) {
//         if (key !== data.date) {
//           formData.append(key, data[key]);
//         }
//       }
//       formData.append("date", formatDate);
//       await tanstack(formData);

//       form.reset();

//       if (fileInputRef.current) {
//         fileInputRef.current.value = "";
//       }

//       setIsSubmit(true);
//     } catch (error) {
//       console.log(error);
//     }
//   };
