type Label = {
  title: string;
  url: string;
};

type NavItem = {
  title: string;
  items: Label[];
};

type NavData = NavItem[];

export const NAV_DATA: NavData = [
  {
    title: "Account",
    items: [
      {
        title: "Manage account",
        url: "account/manage-account",
      },
    ],
  },
  {
    title: "Event",
    items: [
      {
        title: "Add Event",
        url: "event/add-event",
      },
      {
        title: "Upcoming Event",
        url: "event/upcoming-event",
      },
      {
        title: "Previous Event",
        url: "event/previous-event",
      },
    ],
  },
  {
    title: "Contest",
    items: [
      {
        title: "Contest List",
        url: "contest/add-contest",
      },
    ],
  },
  {
    title: "Scoring",
    items: [
      {
        title: "Point-Based",
        url: "scoring/point-based",
      },
      // {
      //   title: "Ranked-Based",
      //   url: "scoring/ranked-based",
      // },
      // {
      //   title: "Percentage-Based",
      //   url: "scoring/percentage-based",
      // },
      {
        title: "Multiple Rounds",
        url: "scoring/multiple-round",
      },
      // {
      //   title: "Judging Panel",
      //   url: "scoring/judging-panel",
      // },
    ],
  },
  // {
  //   title: "Participants and Teams",
  //   items: [
  //     {
  //       title: "Add Participants",
  //       url: "participant/add-participant",
  //     },
  //     {
  //       title: "Add Teams",
  //       url: "participant/add-team",
  //     },
  //   ],
  // },
  {
    // title: "Created Criteria and List of Judges",
    title: "Criteria",
    items: [
      {
        title: "Judging",
        url: "criteria/criteria-judges",
      },
      {
        title: "Criteria & List",
        url: "criteria/criteria-list",
      },
    ],
  },
  {
    title: "Contest Result",
    items: [
      {
        title: "Results",
        url: "result/contest-result",
      },
    ],
  },
];
