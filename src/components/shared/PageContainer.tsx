import type {
  ReactNode,
} from "react";

type PageContainerProps = {
  children: ReactNode;
  className?: string;
};

function PageContainer({
  children,
  className = "",
}: PageContainerProps) {
  return (
    <div
      className={`
        w-full
        min-w-0
        px-4
        py-5
        sm:px-6
        sm:py-6
        lg:px-8
        lg:py-8
        ${className}
      `}
    >
      <div className="mx-auto w-full max-w-7xl min-w-0">
        {children}
      </div>
    </div>
  );
}

export default PageContainer;