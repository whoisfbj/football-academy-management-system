import type {
  ReactNode,
} from "react";

type ResponsiveTableProps = {
  children: ReactNode;
  className?: string;
};

function ResponsiveTable({
  children,
  className = "",
}: ResponsiveTableProps) {
  return (
    <div
      className={`
        w-full
        max-w-full
        overflow-hidden
        rounded-xl
        border
        border-slate-200
        bg-white
        ${className}
      `}
    >
      <div className="responsive-table-wrapper">
        {children}
      </div>
    </div>
  );
}

export default ResponsiveTable;