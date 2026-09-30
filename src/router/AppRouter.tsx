import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router";

import ProtectedRoute from "../components/routing/ProtectedRoute";

/* AUTH */
import LoginPage from "../pages/auth/LoginPage";

/* ADMIN LAYOUT */
import AdminLayout from "../layouts/AdminLayout";

/* ADMIN DASHBOARD */
import AdminDashboard from "../pages/admin/AdminDashboard";

/* PLAYERS */
import PlayersPage from "../pages/admin/players/PlayersPage";
import RegisterPlayerPage from "../pages/admin/players/RegisterPlayerPage";
import PendingRegistrationsPage from "../pages/admin/players/PendingRegistrationsPage";
import PlayerProfilePage from "../pages/admin/players/PlayerProfilePage";
import EditPlayerPage from "../pages/admin/players/EditPlayerPage";

/* TEAMS */
import TeamsPage from "../pages/admin/teams/TeamsPage";
import TeamProfilePage from "../pages/admin/teams/TeamProfilePage";

/* COACHES */
import CoachesPage from "../pages/admin/coaches/CoachesPage";

/* TRAINING SESSIONS */
import TrainingSessionsPage from "../pages/admin/sessions/TrainingSessionsPage";

/* ATTENDANCE */
import AttendancePage from "../pages/admin/attendance/AttendancePage";
import TakeAttendancePage from "../pages/admin/attendance/TakeAttendancePage";

/* PLAYER DEVELOPMENT */
import DevelopmentPage from "../pages/admin/development/DevelopmentPage";
import NewAssessmentPage from "../pages/admin/development/NewAssessmentPage";
import NewDevelopmentPlanPage from "../pages/admin/development/NewDevelopmentPlanPage";
import NewProgressReportPage from "../pages/admin/development/NewProgressReportPage";
import NewScoutingReportPage from "../pages/admin/development/NewScoutingReportPage";
import ProgressReportDetailPage from "../pages/admin/development/ProgressReportDetailPage";
import ScoutingReportDetailPage from "../pages/admin/development/ScoutingReportDetailPage";

/* FINANCE */
import FinancePage from "../pages/admin/finance/FinancePage";
import NewInvoicePage from "../pages/admin/finance/NewInvoicePage";
import InvoiceDetailPage from "../pages/admin/finance/InvoiceDetailPage";
import RecordPaymentPage from "../pages/admin/finance/RecordPaymentPage";
import ReceiptPage from "../pages/admin/finance/ReceiptPage";
import FinanceRecordsPage from "../pages/admin/finance/FinanceRecordsPage";

/* COMMUNICATION */
import CommunicationPage from "../pages/admin/communication/CommunicationPage";

/* REPORTS */
import ReportsPage from "../pages/admin/reports/ReportsPage";

/* SETTINGS / ACADEMY ADMINISTRATION */
import AcademySettingsPage from "../pages/admin/settings/AcademySettingsPage";

/* PARENT PORTAL */
import ParentDashboardPage from "../pages/parent/ParentDashboardPage";
import ParentPlayerPage from "../pages/parent/ParentPlayerPage";
import ParentLayout from "../layouts/ParentLayout";
import ParentAttendancePage from "../pages/parent/ParentAttendancePage";
import ParentSchedulePage from "../pages/parent/ParentSchedulePage";
import ParentPaymentsPage from "../pages/parent/ParentPaymentsPage";
import ParentReceiptsPage from "../pages/parent/ParentReceiptsPage";
import ParentAnnouncementsPage from "../pages/parent/ParentAnnouncementsPage";
import ParentReportsPage from "../pages/parent/ParentReportsPage";

/*LANDING PAGE*/
import LandingPage from "../pages/LandingPage";


/* OTHER ROLE DASHBOARDS */
import {
  CoachDashboard,
  SportsDirectorDashboard,
  TechnicalDirectorDashboard,
} from "../pages/roles/RoleDashboards";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ========================= */}
        {/* ROOT */}
        {/* ========================= */}

       <Route path="/" element={<LandingPage />} />

        {/* ========================= */}
        {/* AUTHENTICATION */}
        {/* ========================= */}

        <Route
          path="/login"
          element={<LoginPage />}
        />

        {/* ========================= */}
        {/* ADMINISTRATOR */}
        {/* ========================= */}

        <Route
          element={
            <ProtectedRoute
              allowedRoles={[
                "administrator",
              ]}
            />
          }
        >
          <Route
            path="/admin"
            element={<AdminLayout />}
          >
            {/* ADMIN DEFAULT */}
            <Route
              index
              element={
                <Navigate
                  to="/admin/dashboard"
                  replace
                />
              }
            />

            {/* DASHBOARD */}
            <Route
              path="dashboard"
              element={
                <AdminDashboard />
              }
            />

            {/* ========================= */}
            {/* PLAYERS */}
            {/* ========================= */}

            <Route
              path="players"
              element={
                <PlayersPage />
              }
            />

            <Route
              path="players/new"
              element={
                <RegisterPlayerPage />
              }
            />

            <Route
              path="players/pending"
              element={
                <PendingRegistrationsPage />
              }
            />

            <Route
              path="players/:playerId/edit"
              element={
                <EditPlayerPage />
              }
            />

            <Route
              path="players/:playerId"
              element={
                <PlayerProfilePage />
              }
            />

            {/* ========================= */}
            {/* ACADEMY TEAMS */}
            {/* ========================= */}

            <Route
              path="teams"
              element={
                <TeamsPage />
              }
            />

            <Route
              path="teams/:teamId"
              element={
                <TeamProfilePage />
              }
            />

            {/* ========================= */}
            {/* COACHES */}
            {/* ========================= */}

            <Route
              path="coaches"
              element={
                <CoachesPage />
              }
            />

            {/* ========================= */}
            {/* ATTENDANCE */}
            {/* ========================= */}

            <Route
              path="attendance"
              element={
                <AttendancePage />
              }
            />

            {/* ========================= */}
            {/* TRAINING SESSIONS */}
            {/* ========================= */}

            <Route
              path="sessions"
              element={
                <TrainingSessionsPage />
              }
            />

            <Route
              path="sessions/:sessionId/attendance"
              element={
                <TakeAttendancePage />
              }
            />

            {/* ========================= */}
            {/* PLAYER DEVELOPMENT */}
            {/* ========================= */}

            <Route
              path="development"
              element={
                <DevelopmentPage />
              }
            />

            <Route
              path="development/assessment/new"
              element={
                <NewAssessmentPage />
              }
            />

            <Route
              path="development/idp/new"
              element={
                <NewDevelopmentPlanPage />
              }
            />

            <Route
              path="development/progress-report/new"
              element={
                <NewProgressReportPage />
              }
            />

            <Route
              path="development/scouting-report/new"
              element={
                <NewScoutingReportPage />
              }
            />

            <Route
              path="development/progress-report/:reportId"
              element={
                <ProgressReportDetailPage />
              }
            />

            <Route
              path="development/scouting-report/:reportId"
              element={
                <ScoutingReportDetailPage />
              }
            />

            {/* ========================= */}
            {/* FINANCE */}
            {/* ========================= */}

            <Route
              path="finance"
              element={
                <FinancePage />
              }
            />

            <Route
              path="finance/invoice/new"
              element={
                <NewInvoicePage />
              }
            />

            <Route
              path="finance/invoice/:invoiceId"
              element={
                <InvoiceDetailPage />
              }
            />

            <Route
              path="finance/payment/new"
              element={
                <RecordPaymentPage />
              }
            />

            <Route
              path="finance/receipt/:paymentId"
              element={
                <ReceiptPage />
              }
            />

            <Route
              path="finance/records"
              element={
                <FinanceRecordsPage />
              }
            />

            {/* ========================= */}
            {/* COMMUNICATION */}
            {/* ========================= */}

            <Route
              path="communication"
              element={
                <CommunicationPage />
              }
            />

            {/* Announcements use the
                same communication module */}
            <Route
              path="announcements"
              element={
                <CommunicationPage />
              }
            />

            {/* ========================= */}
            {/* REPORTS */}
            {/* ========================= */}

            <Route
              path="reports"
              element={
                <ReportsPage />
              }
            />

            {/* ========================= */}
            {/* ACADEMY SETTINGS */}
            {/* ========================= */}

            <Route
              path="settings"
              element={
                <AcademySettingsPage />
              }
            />
          </Route>
        </Route>

        {/* ========================= */}
        {/* TECHNICAL DIRECTOR */}
        {/* ========================= */}

        <Route
          element={
            <ProtectedRoute
              allowedRoles={[
                "technical-director",
              ]}
            />
          }
        >
          <Route
            path="/technical-director"
            element={
              <TechnicalDirectorDashboard />
            }
          />
        </Route>

        {/* ========================= */}
        {/* SPORTS DIRECTOR */}
        {/* ========================= */}

        <Route
          element={
            <ProtectedRoute
              allowedRoles={[
                "sports-director",
              ]}
            />
          }
        >
          <Route
            path="/sports-director"
            element={
              <SportsDirectorDashboard />
            }
          />
        </Route>

        {/* ========================= */}
        {/* COACH */}
        {/* ========================= */}

        <Route
          element={
            <ProtectedRoute
              allowedRoles={[
                "coach",
              ]}
            />
          }
        >
          <Route
            path="/coach"
            element={
              <CoachDashboard />
            }
          />
        </Route>

        {/* ========================= */}
        {/* PARENT / GUARDIAN */}
        {/* ========================= */}

        <Route
          element={
            <ProtectedRoute
              allowedRoles={[
                "parent",
              ]}
            />
          }
        >
          <Route
            path="/parent"
            element={
              <ParentDashboardPage />
            }
          />
        </Route>

        <Route
  path="/parent"
  element={<ParentLayout />}
>
  <Route
    index
    element={
      <Navigate
        to="/parent/dashboard"
        replace
      />
    }
  />

  <Route
    path="dashboard"
    element={<ParentDashboardPage />}
  />

  <Route
    path="player"
    element={<ParentPlayerPage />}
  />
</Route>

<Route
  path="attendance"
  element={<ParentAttendancePage />}
/>

<Route
  path="schedule"
  element={<ParentSchedulePage />}
/>

<Route
  path="payments"
  element={<ParentPaymentsPage />}
/>

<Route
  path="receipts"
  element={<ParentReceiptsPage />}
/>
<Route
  path="announcements"
  element={<ParentAnnouncementsPage />}
/>

<Route
  path="reports"
  element={<ParentReportsPage />}
/>



        {/* ========================= */}
        {/* UNKNOWN ROUTES */}
        {/* ========================= */}

        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;