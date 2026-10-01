import {
  Bell,
  CalendarDays,
  ClipboardCheck,
  LayoutDashboard,
  Target,
  Users,
  UsersRound,
} from "lucide-react";

import StaffPortalLayout from "../components/roles/StaffPortalLayout";

function CoachLayout() {
  return (
    <StaffPortalLayout
      title="Coach"
      subtitle="Coach Portal"
      items={[
        {
          label: "Dashboard",
          path: "/coach/dashboard",
          icon: (
            <LayoutDashboard
              size={19}
            />
          ),
        },
        {
          label: "My Teams",
          path: "/coach/teams",
          icon: (
            <UsersRound
              size={19}
            />
          ),
        },
        {
          label: "Players",
          path: "/coach/players",
          icon: (
            <Users size={19} />
          ),
        },
        {
          label:
            "Training Sessions",
          path: "/coach/sessions",
          icon: (
            <CalendarDays
              size={19}
            />
          ),
        },
        {
          label: "Attendance",
          path: "/coach/attendance",
          icon: (
            <ClipboardCheck
              size={19}
            />
          ),
        },
        {
          label:
            "Player Development",
          path: "/coach/development",
          icon: (
            <Target size={19} />
          ),
        },
        {
          label: "Announcements",
          path: "/coach/announcements",
          icon: (
            <Bell size={19} />
          ),
        },
      ]}
    />
  );
}

export default CoachLayout;