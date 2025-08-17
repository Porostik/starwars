import { useQueries } from "@tanstack/react-query";
import { getDirectOptions } from "../api/get-direct";
import type { DirectResponse } from "../types";
import { Badge } from "@/shared/ui/badge";
import { InfoCard } from "@/shared/ui/info-card";

interface AdditionalBlockProps {
  title: string;
  urls: string[];
}

export const AdditionalBlock = ({ title, urls }: AdditionalBlockProps) => {
  const data = useQueries({
    queries: urls.map((url) => ({
      ...getDirectOptions(url),
      select: (data: DirectResponse) => ({ title: data.name ?? data.title }),
    })),
  });

  const isHaveLoadedItem = data.find((item) => !!item.data?.title);

  if (!urls.length) return null;

  return (
    <InfoCard title={title}>
      {isHaveLoadedItem ? (
        <div className="flex flex-wrap gap-2 mt-2 justify-start w-full">
          {data.map((item, idx) =>
            item.data?.title ? (
              <Badge className="text-sm" key={idx}>
                {item.data?.title}
              </Badge>
            ) : null
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-full animate-pulse">
          <span className="text-white font-medium text-sm">
            Just a moment...
          </span>
        </div>
      )}
    </InfoCard>
  );
};
