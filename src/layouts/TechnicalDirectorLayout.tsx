import {
  BarChart3,
  CalendarDays,
  LayoutDashboard,
  Shield,
  Target,
  UsersRound,
} from "lucide-react";

import StaffPortalLayout from "../components/roles/StaffPortalLayout";

function TechnicalDirectorLayout() {
  return (
    <StaffPortalLayout
      title="Technical Director"
      subtitle="Technical Director Portal"
      items={[
        {
          label: "Dashboard",
          path:
            "/technical-director/dashboard",
          icon: (
            <LayoutDashboard
              size={19}
            />
          ),
        },
        {
          label: "Academy Teams",
          path:
            "/technical-director/teams",
          icon: (
            <Shield size={19} />
          ),
        },
        {
          label: "Coaches",
          path:
            "/technical-director/coaches",
          icon: (
            <UsersRound
              size={19}
            />
          ),
        },
        {
          label:
            "Training Sessions",
          path:
            "/technical-director/sessions",
          icon: (
            <CalendarDays
              size={19}
            />
          ),
        },
        {
          label:
            "Player Development",
          path:
            "/technical-director/development",
          icon: (
            <Target size={19} />
          ),
        },
        {
          label: "Reports",
          path:
            "/technical-director/reports",
          icon: (
            <BarChart3
              size={19}
            />
          ),
        },
      ]}
    />
  );
}

export default TechnicalDirectorLayout;