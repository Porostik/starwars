import { cn } from "@/shared/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

export const BackLink = ({ className }: { className?: string }) => {
  const returnUrl =
    useRouterState({
      select: (s) => s.location.state?.returnUrl,
    }) ?? "/";

  return (
    <Link
      className={cn(
        "flex w-fit items-center gap-x-1 text-lg text-white",
        className
      )}
      to={returnUrl}
    >
      <ChevronLeft /> Back
    </Link>
  );
};
