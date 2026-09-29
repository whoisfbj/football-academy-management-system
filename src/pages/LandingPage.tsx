import { useState } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router";
import {
  Activity,
  ArrowRight,
  CalendarDays,
  ChartBar,
  CheckCircle2,
  ClipboardCheck,
  CreditCard,
  GraduationCap,
  Menu,
  MessageSquare,
  ShieldCheck,
  Trophy,
  UserRound,
  Users,
  X,
} from "lucide-react";

function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      title: "Player Management",
      description:
        "Register players, manage profiles, age categories, academy teams, medical information and player status.",
      icon: UserRound,
    },
    {
      title: "Player Development",
      description:
        "Track technical, tactical, physical and performance assessments together with individual development plans.",
      icon: Activity,
    },
    {
      title: "Training & Attendance",
      description:
        "Create training sessions, assign teams and monitor player attendance across academy activities.",
      icon: ClipboardCheck,
    },
    {
      title: "Academy Teams",
      description:
        "Organise players by teams, age categories, coaches, programs, training centres and academy branches.",
      icon: Users,
    },
    {
      title: "Finance Management",
      description:
        "Manage academy fees, invoices, payments, sponsorships, discounts, expenses and payment records.",
      icon: CreditCard,
    },
    {
      title: "Reports & Analytics",
      description:
        "View player statistics, development reports, attendance records and academy performance information.",
      icon: ChartBar,
    },
  ];

  const roles = [
    {
      title: "Administrator",
      description:
        "Manage the entire academy, registrations, finance, staff, players and system configuration.",
      icon: ShieldCheck,
    },
    {
      title: "Technical Director",
      description:
        "Oversee player development, technical assessments, coaches and football development programs.",
      icon: Trophy,
    },
    {
      title: "Sports Director",
      description:
        "Monitor academy teams, sporting activities, schedules and overall football operations.",
      icon: GraduationCap,
    },
    {
      title: "Coach",
      description:
        "Manage assigned teams, training sessions, attendance and player performance assessments.",
      icon: ClipboardCheck,
    },
    {
      title: "Parent / Guardian",
      description:
        "Follow player progress, attendance, schedules, announcements, reports and academy payments.",
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-600 text-white">
              <Trophy size={22} />
            </div>

            <div>
              <p className="font-bold leading-none text-slate-950">
                Elite Academy
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Management System
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            <a
              href="#features"
              className="text-sm font-medium text-slate-600 transition hover:text-green-600"
            >
              Features
            </a>

            <a
              href="#roles"
              className="text-sm font-medium text-slate-600 transition hover:text-green-600"
            >
              User Roles
            </a>

            <a
              href="#development"
              className="text-sm font-medium text-slate-600 transition hover:text-green-600"
            >
              Player Development
            </a>

            <a
              href="#about"
              className="text-sm font-medium text-slate-600 transition hover:text-green-600"
            >
              About
            </a>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              to="/login"
              className="rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Sign In
            </Link>

            <Link
              to="/login"
              className="flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              Get Started
              <ArrowRight size={16} />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 lg:hidden"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-slate-200 bg-white px-5 py-5 lg:hidden">
            <div className="flex flex-col gap-4">
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="font-medium text-slate-600"
              >
                Features
              </a>

              <a
                href="#roles"
                onClick={() => setMobileMenuOpen(false)}
                className="font-medium text-slate-600"
              >
                User Roles
              </a>

              <a
                href="#development"
                onClick={() => setMobileMenuOpen(false)}
                className="font-medium text-slate-600"
              >
                Player Development
              </a>

              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="font-medium text-slate-600"
              >
                About
              </a>

              <Link
                to="/login"
                className="mt-2 rounded-lg bg-green-600 px-5 py-3 text-center font-semibold text-white"
              >
                Sign In
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-green-500/10 blur-3xl" />
        <div className="absolute -bottom-40 left-10 h-96 w-96 rounded-full bg-green-400/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-14 px-5 py-20 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-28">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm font-semibold text-green-400">
              <Trophy size={16} />
              Football Academy Management
            </div>

            <h1 className="mt-7 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Manage your academy.
              <span className="text-green-500"> Develop better players.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
              A complete football academy management platform designed to
              simplify player registration, training, attendance, development,
              finance, communication and academy administration.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/login"
                className="flex items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3.5 font-semibold text-white transition hover:bg-green-700"
              >
                Access Academy Portal
                <ArrowRight size={18} />
              </Link>

              <a
                href="#features"
                className="rounded-lg border border-slate-700 px-6 py-3.5 text-center font-semibold text-white transition hover:bg-slate-900"
              >
                Explore Features
              </a>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-400">
              <HeroCheck text="Player Development" />
              <HeroCheck text="Attendance Tracking" />
              <HeroCheck text="Finance Management" />
            </div>
          </div>

          {/* DASHBOARD PREVIEW */}
          <div className="relative">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-3 shadow-2xl backdrop-blur">
              <div className="overflow-hidden rounded-2xl bg-slate-100">
                <div className="flex items-center justify-between border-b border-slate-200 bg-white p-4">
                  <div>
                    <p className="text-xs font-medium text-slate-400">
                      Elite Academy
                    </p>
                    <p className="font-bold text-slate-900">
                      Academy Dashboard
                    </p>
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-green-700">
                    <UserRound size={18} />
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <div className="grid grid-cols-2 gap-3">
                    <PreviewStat
                      label="Players"
                      value="248"
                      icon={<Users size={18} />}
                    />

                    <PreviewStat
                      label="Academy Teams"
                      value="12"
                      icon={<Trophy size={18} />}
                    />

                    <PreviewStat
                      label="Attendance"
                      value="91%"
                      icon={<ClipboardCheck size={18} />}
                    />

                    <PreviewStat
                      label="Sessions"
                      value="18"
                      icon={<CalendarDays size={18} />}
                    />
                  </div>

                  <div className="mt-4 rounded-xl bg-white p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-slate-900">
                          Player Development
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          Latest performance overview
                        </p>
                      </div>

                      <Activity size={20} className="text-green-600" />
                    </div>

                    <div className="mt-5 space-y-4">
                      <ProgressItem
                        label="Technical Assessment"
                        value={84}
                      />
                      <ProgressItem
                        label="Tactical Assessment"
                        value={76}
                      />
                      <ProgressItem
                        label="Physical Assessment"
                        value={88}
                      />
                      <ProgressItem
                        label="Performance Assessment"
                        value={81}
                      />
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl bg-green-600 p-5 text-white">
                      <CalendarDays size={22} />

                      <p className="mt-5 text-xs text-green-100">
                        Next Session
                      </p>

                      <p className="mt-1 font-bold">U15 Technical Training</p>

                      <p className="mt-2 text-xs text-green-100">
                        Tuesday • 4:00 PM
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-900 p-5 text-white">
                      <ChartBar size={22} />

                      <p className="mt-5 text-xs text-slate-400">
                        Development Reports
                      </p>

                      <p className="mt-1 text-3xl font-bold">36</p>

                      <p className="mt-2 text-xs text-green-400">
                        Updated this month
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 py-10 text-center lg:grid-cols-4 lg:px-8">
          <Stat value="360°" label="Player Management" />
          <Stat value="5" label="User Roles" />
          <Stat value="4" label="Assessment Areas" />
          <Stat value="1" label="Unified Academy Platform" />
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="bg-slate-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="Academy Management"
            title="Everything your academy needs in one system"
            description="Manage football development and academy administration without relying on disconnected spreadsheets and manual records."
          />

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:border-green-200 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600 transition group-hover:bg-green-600 group-hover:text-white">
                    <Icon size={23} />
                  </div>

                  <h3 className="mt-6 text-lg font-bold text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DEVELOPMENT */}
      <section id="development" className="bg-white py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-green-600">
              Player Development
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Go beyond registration and actually track player growth.
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-500">
              Build a complete development history for each academy player and
              give coaches and technical staff the information they need to
              make better football decisions.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <DevelopmentItem text="Technical Assessment" />
              <DevelopmentItem text="Tactical Assessment" />
              <DevelopmentItem text="Physical Assessment" />
              <DevelopmentItem text="Performance Assessment" />
              <DevelopmentItem text="Individual Development Plan" />
              <DevelopmentItem text="Progress Reports" />
              <DevelopmentItem text="Player Evaluation" />
              <DevelopmentItem text="Scouting Reports" />
            </div>
          </div>

          <div className="rounded-3xl bg-slate-950 p-7 text-white sm:p-9">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-600">
                <UserRound size={26} />
              </div>

              <div>
                <p className="text-lg font-bold">Complete Player Profile</p>
                <p className="text-sm text-slate-400">
                  Football and academy information
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                "Personal Information",
                "Guardian Information",
                "Academy Team",
                "Age Category",
                "Playing Position",
                "Medical Information",
                "Attendance History",
                "Payment History",
                "Development Plans",
                "Assessment History",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 p-4"
                >
                  <CheckCircle2 size={18} className="text-green-500" />
                  <span className="text-sm text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ROLES */}
      <section id="roles" className="bg-slate-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="Role Based Access"
            title="Designed for everyone involved in the academy"
            description="Each user receives access to the tools and information relevant to their responsibility within the football academy."
          />

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {roles.map((role) => {
              const Icon = role.icon;

              return (
                <div
                  key={role.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-white">
                    <Icon size={21} />
                  </div>

                  <h3 className="mt-5 font-bold text-slate-900">
                    {role.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {role.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* OPERATIONS */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="rounded-3xl border border-slate-200 p-8 lg:p-12">
            <div className="grid gap-10 lg:grid-cols-3">
              <Operation
                icon={<CalendarDays size={23} />}
                title="Training Operations"
                description="Manage training schedules, teams, coaches, centres and player attendance."
              />

              <Operation
                icon={<MessageSquare size={23} />}
                title="Communication"
                description="Share announcements, notices, reminders and academy information with users."
              />

              <Operation
                icon={<CreditCard size={23} />}
                title="Financial Records"
                description="Maintain invoices, payments, receipts, sponsorships, discounts and academy expenses."
              />
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="bg-slate-950 py-20 text-white">
        <div className="mx-auto max-w-7xl px-5 text-center lg:px-8">
          <p className="text-sm font-bold uppercase tracking-widest text-green-500">
            One Academy. One Platform.
          </p>

          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-bold sm:text-4xl">
            Build a better organised football development environment.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-400">
            Give administrators, directors, coaches and parents a shared
            platform for managing the academy and following every player's
            development journey.
          </p>

          <Link
            to="/login"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3.5 font-semibold text-white transition hover:bg-green-700"
          >
            Enter Academy Portal
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 bg-slate-950 text-slate-400">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-600 text-white">
              <Trophy size={18} />
            </div>

            <div>
              <p className="font-semibold text-white">Elite Academy</p>
              <p className="text-xs">Football Academy Management System</p>
            </div>
          </div>

          <p className="text-sm">
            © 2026 Elite Academy. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function HeroCheck({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2">
      <CheckCircle2 size={16} className="text-green-500" />
      {text}
    </div>
  );
}

function PreviewStat({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: ReactNode;
}) {
  return (
    <div className="rounded-xl bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="text-green-600">{icon}</div>
        <span className="text-xl font-bold text-slate-900">{value}</span>
      </div>

      <p className="mt-3 text-xs text-slate-500">{label}</p>
    </div>
  );
}

function ProgressItem({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-xs">
        <span className="font-medium text-slate-600">{label}</span>
        <span className="font-bold text-slate-900">{value}%</span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-green-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function Stat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div>
      <p className="text-3xl font-bold text-slate-950">{value}</p>
      <p className="mt-2 text-sm text-slate-500">{label}</p>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-bold uppercase tracking-widest text-green-600">
        {eyebrow}
      </p>

      <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
        {title}
      </h2>

      <p className="mt-5 leading-8 text-slate-500">{description}</p>
    </div>
  );
}

function DevelopmentItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600">
        <CheckCircle2 size={15} />
      </div>

      <span className="text-sm font-medium text-slate-700">{text}</span>
    </div>
  );
}

function Operation({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div>
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600">
        {icon}
      </div>

      <h3 className="mt-5 text-lg font-bold text-slate-900">{title}</h3>

      <p className="mt-3 text-sm leading-7 text-slate-500">{description}</p>
    </div>
  );
}

export default LandingPage;