import {
  BarChart3,
  Bell,
  CreditCard,
  LayoutDashboard,
  Shield,
  Trophy,
  Workflow,
} from "lucide-react";

import StaffPortalLayout from "../components/roles/StaffPortalLayout";

function SportsDirectorLayout() {
  return (
    <StaffPortalLayout
      title="Sports Director"
      subtitle="Sports Director Portal"
      items={[
        {
          label: "Dashboard",
          path:
            "/sports-director/dashboard",
          icon: (
            <LayoutDashboard
              size={19}
            />
          ),
        },
        {
          label: "Programs",
          path:
            "/sports-director/programs",
          icon: (
            <Workflow
              size={19}
            />
          ),
        },
        {
          label: "Academy Teams",
          path:
            "/sports-director/teams",
          icon: (
            <Shield size={19} />
          ),
        },
        {
          label: "Tournaments",
          path:
            "/sports-director/tournaments",
          icon: (
            <Trophy size={19} />
          ),
        },
        {
          label:
            "Finance Overview",
          path:
            "/sports-director/finance",
          icon: (
            <CreditCard
              size={19}
            />
          ),
        },
        {
          label: "Announcements",
          path:
            "/sports-director/announcements",
          icon: (
            <Bell size={19} />
          ),
        },
        {
          label: "Reports",
          path:
            "/sports-director/reports",
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

export default SportsDirectorLayout;