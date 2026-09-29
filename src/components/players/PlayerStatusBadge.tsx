import type { PlayerStatus } from "../../shared/types/player";

interface PlayerStatusBadgeProps {
  status: PlayerStatus;
}

function PlayerStatusBadge({
  status,
}: PlayerStatusBadgeProps) {
  const styles: Record<PlayerStatus, string> = {
    Active:
      "bg-green-50 text-green-700",
    Inactive:
      "bg-slate-100 text-slate-600",
    Registered:
      "bg-blue-50 text-blue-700",
    "Pending Registration":
      "bg-amber-50 text-amber-700",
    Suspended:
      "bg-red-50 text-red-700",
    Injured:
      "bg-orange-50 text-orange-700",
    "On Trial":
      "bg-purple-50 text-purple-700",
    Graduated:
      "bg-cyan-50 text-cyan-700",
    Transferred:
      "bg-indigo-50 text-indigo-700",
    Released:
      "bg-rose-50 text-rose-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}

export default PlayerStatusBadge;