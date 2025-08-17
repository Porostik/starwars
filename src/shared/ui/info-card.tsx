import type { PropsWithChildren } from "react";

export const InfoCard = ({
  children,
  title,
}: PropsWithChildren<{ title: string }>) => {
  return (
    <div className="bg-card rounded-lg flex flex-col items-center p-3 gap-y-2 min-h-[286px]">
      <div className="text-lg text-white font-medium border-b-[2px] border-muted-foreground w-full text-center">
        {title}
      </div>
      {children}
    </div>
  );
};
