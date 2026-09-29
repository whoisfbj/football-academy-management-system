import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router";

import ProtectedRoute from "../components/routing/ProtectedRoute";
import LoginPage from "../pages/auth/LoginPage";
import PlaceholderPage from "../pages/PlaceholderPage";
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import PlayersPage from "../pages/admin/players/PlayersPage";
import RegisterPlayerPage from "../pages/admin/players/RegisterPlayerPage";
import PlayerProfilePage from "../pages/admin/players/PlayerProfilePage";
import EditPlayerPage from "../pages/admin/players/EditPlayerPage";
import PendingRegistrationsPage from "../pages/admin/players/PendingRegistrationsPage";
import TeamsPage from "../pages/admin/teams/TeamsPage";
import TeamProfilePage from "../pages/admin/teams/TeamProfilePage";
import CoachesPage from "../pages/admin/coaches/CoachesPage";
import TrainingSessionsPage from "../pages/admin/sessions/TrainingSessionsPage";
import AttendancePage from "../pages/admin/attendance/AttendancePage";
import TakeAttendancePage from "../pages/admin/attendance/TakeAttendancePage";
import DevelopmentPage from "../pages/admin/development/DevelopmentPage";
import NewAssessmentPage from "../pages/admin/development/NewAssessmentPage";
import NewDevelopmentPlanPage from "../pages/admin/development/NewDevelopmentPlanPage";
import NewProgressReportPage from "../pages/admin/development/NewProgressReportPage";
import NewScoutingReportPage from "../pages/admin/development/NewScoutingReportPage";
import ProgressReportDetailPage from "../pages/admin/development/ProgressReportDetailPage";
import ScoutingReportDetailPage from "../pages/admin/development/ScoutingReportDetailPage";



function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        {/* ADMINISTRATOR */}
       <Route
  element={
    <ProtectedRoute
      allowedRoles={["administrator"]}
    />
  }
>
  <Route
    path="/admin"
    element={<AdminLayout />}
  >
    <Route
      index
      element={
        <Navigate
          to="/admin/dashboard"
          replace
        />
      }
    />

    <Route
      path="dashboard"
      element={<AdminDashboard />}
    />

    <Route
  path="players"
  element={<PlayersPage />}
/>

<Route
  path="players/new"
  element={<RegisterPlayerPage />}
/> 

<Route
  path="players/pending"
  element={<PendingRegistrationsPage />}
/>

<Route
  path="players/:playerId/edit"
  element={<EditPlayerPage />}
/>

<Route
  path="players/:playerId"
  element={<PlayerProfilePage />}
/>

   <Route
  path="teams"
  element={<TeamsPage />}
/>

<Route
  path="teams/:teamId"
  element={<TeamProfilePage />}
/>

   <Route
  path="coaches"
  element={<CoachesPage />}
/>

   <Route
  path="attendance"
  element={<AttendancePage />}
/>
   <Route
  path="sessions"
  element={<TrainingSessionsPage />}
/>

<Route
  path="sessions/:sessionId/attendance"
  element={<TakeAttendancePage />}
/>

    <Route
  path="development"
  element={<DevelopmentPage />}
/>

<Route
  path="development/assessment/new"
  element={<NewAssessmentPage />}
/>

      <Route
  path="development/idp/new"
  element={<NewDevelopmentPlanPage />}
/>

<Route
  path="development/progress-report/new"
  element={<NewProgressReportPage />}
/>

<Route
  path="development/scouting-report/new"
  element={<NewScoutingReportPage />}
/>

<Route
  path="development/progress-report/:reportId"
  element={<ProgressReportDetailPage />}
/>

<Route
  path="development/scouting-report/:reportId"
  element={<ScoutingReportDetailPage />}
/>

    <Route
      path="finance"
      element={
        <PlaceholderPage title="Finance" />
      }
    />

    <Route
      path="communication"
      element={
        <PlaceholderPage title="Communication" />
      }
    />

    <Route
      path="reports"
      element={
        <PlaceholderPage title="Reports" />
      }
    />

    <Route
      path="announcements"
      element={
        <PlaceholderPage title="Announcements" />
      }
    />

    <Route
      path="settings"
      element={
        <PlaceholderPage title="Academy Settings" />
      }
    />
  </Route>
</Route>
        {/* TECHNICAL DIRECTOR */}
        <Route
          element={
            <ProtectedRoute
              allowedRoles={["technical-director"]}
            />
          }
        >
          <Route
            path="/technical-director"
            element={
              <PlaceholderPage title="Technical Director Dashboard" />
            }
          />
        </Route>

        {/* SPORTS DIRECTOR */}
        <Route
          element={
            <ProtectedRoute
              allowedRoles={["sports-director"]}
            />
          }
        >
          <Route
            path="/sports-director"
            element={
              <PlaceholderPage title="Sports Director Dashboard" />
            }
          />
        </Route>

        {/* COACH */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["coach"]} />
          }
        >
          <Route
            path="/coach"
            element={
              <PlaceholderPage title="Coach Dashboard" />
            }
          />
        </Route>

        {/* PARENT / GUARDIAN */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["parent"]} />
          }
        >
          <Route
            path="/parent"
            element={
              <PlaceholderPage title="Parent / Guardian Portal" />
            }
          />
        </Route>

        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;