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

/* SHOP & TICKETING ADMIN */
import AdminShopPage from "../pages/admin/shop/AdminShopPage";
import AdminProductFormPage from "../pages/admin/shop/AdminProductFormPage";
import AdminTicketsPage from "../pages/admin/tickets/AdminTicketsPage";
import AdminTicketEventFormPage from "../pages/admin/tickets/AdminTicketEventFormPage";
import AdminTicketEventDetailPage from "../pages/admin/tickets/AdminTicketEventDetailPage";

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
import ParentTournamentsPage from "../pages/parent/ParentTournamentsPage";
import ParentContactPage from "../pages/parent/ParentContactPage";



/*LANDING PAGE*/
import LandingPage from "../pages/LandingPage";

/* PUBLIC COMMERCE */
import CommerceLayout from "../layouts/CommerceLayout";
import ShopPage from "../pages/commerce/ShopPage";
import ProductDetailPage from "../pages/commerce/ProductDetailPage";
import CartPage from "../pages/commerce/CartPage";
import ShopCheckoutPage from "../pages/commerce/ShopCheckoutPage";
import { ShopOrderDetailPage, ShopOrdersPage } from "../pages/commerce/ShopOrdersPage";
import TicketsPage from "../pages/commerce/TicketsPage";
import TicketEventPage from "../pages/commerce/TicketEventPage";
import TicketCheckoutPage from "../pages/commerce/TicketCheckoutPage";
import { MyTicketsPage, TicketDetailPage } from "../pages/commerce/MyTicketsPage";


/* OTHER ROLE DASHBOARDS */
import CoachLayout from "../layouts/CoachLayout";

import TechnicalDirectorLayout from "../layouts/TechnicalDirectorLayout";

import SportsDirectorLayout from "../layouts/SportsDirectorLayout";

import {
  CoachAnnouncementsPage,
  CoachAttendancePage,
  CoachDashboardPage,
  CoachDevelopmentPage,
  CoachPlayersPage,
  CoachSessionsPage,
  CoachTeamPage,
} from "../pages/coach/CoachPages";

import {
  TechnicalDirectorCoachesPage,
  TechnicalDirectorDashboardPage,
  TechnicalDirectorDevelopmentPage,
  TechnicalDirectorReportsPage,
  TechnicalDirectorSessionsPage,
  TechnicalDirectorTeamsPage,
} from "../pages/technical-director/TechnicalDirectorPages";

import {
  SportsDirectorAnnouncementsPage,
  SportsDirectorDashboardPage,
  SportsDirectorFinancePage,
  SportsDirectorProgramsPage,
  SportsDirectorReportsPage,
  SportsDirectorTeamsPage,
  SportsDirectorTournamentsPage,
} from "../pages/sports-director/SportsDirectorPages";
function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ========================= */}
        {/* ROOT */}
        {/* ========================= */}

       <Route path="/" element={<LandingPage />} />

        {/* ========================= */}
        {/* PUBLIC SHOP & TICKETS */}
        {/* ========================= */}

        <Route element={<CommerceLayout />}>
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/:productId" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<ShopCheckoutPage />} />
          <Route path="/orders" element={<ShopOrdersPage />} />
          <Route path="/orders/:orderId" element={<ShopOrderDetailPage />} />
          <Route path="/tickets" element={<TicketsPage />} />
          <Route path="/tickets/:eventId" element={<TicketEventPage />} />
          <Route path="/tickets/:eventId/checkout" element={<TicketCheckoutPage />} />
          <Route path="/my-tickets" element={<MyTicketsPage />} />
          <Route path="/my-tickets/:ticketOrderId" element={<TicketDetailPage />} />
        </Route>

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
            {/* SHOP */}
            {/* ========================= */}

            <Route path="shop" element={<AdminShopPage />} />
            <Route path="shop/products/new" element={<AdminProductFormPage />} />
            <Route path="shop/products/:productId/edit" element={<AdminProductFormPage />} />

            {/* ========================= */}
            {/* TICKETS */}
            {/* ========================= */}

            <Route path="tickets" element={<AdminTicketsPage />} />
            <Route path="tickets/events/new" element={<AdminTicketEventFormPage />} />
            <Route path="tickets/events/:eventId/edit" element={<AdminTicketEventFormPage />} />
            <Route path="tickets/events/:eventId" element={<AdminTicketEventDetailPage />} />

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
      <TechnicalDirectorLayout />
    }
  >
    <Route
      index
      element={
        <Navigate
          to="/technical-director/dashboard"
          replace
        />
      }
    />

    <Route
      path="dashboard"
      element={
        <TechnicalDirectorDashboardPage />
      }
    />

    <Route
      path="teams"
      element={
        <TechnicalDirectorTeamsPage />
      }
    />

    <Route
      path="coaches"
      element={
        <TechnicalDirectorCoachesPage />
      }
    />

    <Route
      path="sessions"
      element={
        <TechnicalDirectorSessionsPage />
      }
    />

    <Route
      path="development"
      element={
        <TechnicalDirectorDevelopmentPage />
      }
    />

    <Route
      path="reports"
      element={
        <TechnicalDirectorReportsPage />
      }
    />
  </Route>
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
      <SportsDirectorLayout />
    }
  >
    <Route
      index
      element={
        <Navigate
          to="/sports-director/dashboard"
          replace
        />
      }
    />

    <Route
      path="dashboard"
      element={
        <SportsDirectorDashboardPage />
      }
    />

    <Route
      path="programs"
      element={
        <SportsDirectorProgramsPage />
      }
    />

    <Route
      path="teams"
      element={
        <SportsDirectorTeamsPage />
      }
    />

    <Route
      path="tournaments"
      element={
        <SportsDirectorTournamentsPage />
      }
    />

    <Route
      path="finance"
      element={
        <SportsDirectorFinancePage />
      }
    />

    <Route
      path="announcements"
      element={
        <SportsDirectorAnnouncementsPage />
      }
    />

    <Route
      path="reports"
      element={
        <SportsDirectorReportsPage />
      }
    />
  </Route>
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
      <CoachLayout />
    }
  >
    <Route
      index
      element={
        <Navigate
          to="/coach/dashboard"
          replace
        />
      }
    />

    <Route
      path="dashboard"
      element={
        <CoachDashboardPage />
      }
    />

    <Route
      path="teams"
      element={
        <CoachTeamPage />
      }
    />

    <Route
      path="players"
      element={
        <CoachPlayersPage />
      }
    />

    <Route
      path="sessions"
      element={
        <CoachSessionsPage />
      }
    />

    <Route
      path="attendance"
      element={
        <CoachAttendancePage />
      }
    />

    <Route
      path="development"
      element={
        <CoachDevelopmentPage />
      }
    />

    <Route
      path="announcements"
      element={
        <CoachAnnouncementsPage />
      }
    />
  </Route>
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
    element={<ParentLayout />}
  >
    {/* PARENT DEFAULT */}

    <Route
      index
      element={
        <Navigate
          to="/parent/dashboard"
          replace
        />
      }
    />

    {/* DASHBOARD */}

    <Route
      path="dashboard"
      element={
        <ParentDashboardPage />
      }
    />

    {/* MY PLAYER */}

    <Route
      path="player"
      element={
        <ParentPlayerPage />
      }
    />

    {/* ATTENDANCE */}

    <Route
      path="attendance"
      element={
        <ParentAttendancePage />
      }
    />

    {/* TRAINING SCHEDULE */}

    <Route
      path="schedule"
      element={
        <ParentSchedulePage />
      }
    />

    {/* PAYMENTS */}

    <Route
      path="payments"
      element={
        <ParentPaymentsPage />
      }
    />

    {/* RECEIPTS */}

    <Route
      path="receipts"
      element={
        <ParentReceiptsPage />
      }
    />

    {/* ANNOUNCEMENTS */}

    <Route
      path="announcements"
      element={
        <ParentAnnouncementsPage />
      }
    />

    {/* PLAYER REPORTS */}

    <Route
      path="reports"
      element={
        <ParentReportsPage />
      }
    />

    {/* TOURNAMENTS */}

    <Route
      path="tournaments"
      element={
        <ParentTournamentsPage />
      }
    />

    {/* CONTACT ACADEMY */}

    <Route
      path="contact"
      element={
        <ParentContactPage />
      }
    />
  </Route>
</Route>

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