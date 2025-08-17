import { InfoCard } from "@/shared/ui/info-card";
import type { ProcessPerson } from "../types";
import { useQuery } from "@tanstack/react-query";
import { getDirectOptions } from "../api/get-direct";
import { WritableValue } from "@/shared/lib/writable-value";
import { Skeleton } from "@/shared/ui/skeleton";
import { PERSON_MAIN_INFO_LABELS } from "../constants";

interface MainInfoProps {
  person: ProcessPerson;
  onChangeValue: (field: string, value: string) => void;
}

interface InfoBlockProps {
  title: string;
  value: string;
  onChange?: (value: string) => void;
  isLoading?: boolean;
}

const InfoBlock = ({ title, value, onChange, isLoading }: InfoBlockProps) => {
  return (
    <div className="w-full flex justify-between items-center text-sm text-white">
      <span>{title}</span>
      {onChange ? (
        <WritableValue
          className="font-medium min-h-5"
          initialValue={value}
          onChange={onChange}
        />
      ) : isLoading ? (
        <Skeleton className="h-5 w-[51px] bg-muted-foreground" />
      ) : (
        <span className="font-medium">{value}</span>
      )}
    </div>
  );
};

export const MainInfo = ({ person, onChangeValue }: MainInfoProps) => {
  const homeworld = useQuery(getDirectOptions(person.homeworld));

  return (
    <InfoCard title="Main info">
      <div className="flex flex-col gap-2 mt-2 justify-start w-full">
        {Object.entries(PERSON_MAIN_INFO_LABELS).map(([field, label]) => (
          <InfoBlock
            title={label}
            value={person[field as keyof typeof PERSON_MAIN_INFO_LABELS]}
            onChange={(value) => onChangeValue(field, value)}
          />
        ))}
        <InfoBlock
          title="Home World"
          value={homeworld.data?.name ?? ""}
          isLoading={homeworld.isLoading}
        />
      </div>
    </InfoCard>
  );
};
