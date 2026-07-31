import type { ReactNode } from "react";
import clsx from "clsx";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={clsx(
        "mx-auto w-full max-w-[1400px] px-6 lg:px-8 xl:px-10",
        className,
      )}
    >
      {children}
    </div>
  );
}
