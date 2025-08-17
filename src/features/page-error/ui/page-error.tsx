import { Button } from "@/shared/ui/button";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useEffect } from "react";

interface PageErrorProps {
  routeId: string;
}

export const PageError = ({ routeId }: PageErrorProps) => {
  const { reset: resetQueryErrors } = useQueryErrorResetBoundary();
  const router = useRouter();

  useEffect(() => {
    resetQueryErrors();
  }, [resetQueryErrors]);

  return (
    <div className="w-full h-full flex items-center flex-col gap-y-3 justify-center">
      <span className="text-2xl font-medium text-white text-center">
        Oops, something went wrong. <br />
        Let’s try again?
      </span>

      <Button
        variant="secondary"
        onClick={() => {
          router.invalidate({
            filter: (m) => m.routeId === routeId,
            forcePending: true,
          });
        }}
      >
        Try again
      </Button>
    </div>
  );
};
