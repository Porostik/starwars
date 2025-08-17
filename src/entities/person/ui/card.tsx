import { Link, useRouter } from '@tanstack/react-router';
import type { ProcessPerson } from '../types';
import { useQueryClient } from '@tanstack/react-query';
import { getPersonOptions } from '../api/get-person';
import { useGetMergedPerson } from '../model/rewrite-store';

interface PersonCardProps {
  person: ProcessPerson;
}

interface InfoBlockProps {
  title: string;
  value: string;
}

const InfoBlock = ({ title, value }: InfoBlockProps) => {
  return (
    <div className="flex flex-col">
      <span className="text-xs text-muted-foreground">{title}</span>
      <span className="text-sm">{value}</span>
    </div>
  );
};

export const PersonCard = ({ person }: PersonCardProps) => {
  const queryClient = useQueryClient();

  const router = useRouter();
  const loc = router.state.location;
  const returnUrl = `${loc.pathname}?${new URLSearchParams(loc.search as Record<string, string>).toString()}`;

  const mergedPerson = useGetMergedPerson(person);

  const prefetch = () => queryClient.prefetchQuery(getPersonOptions({ id: person.id }));

  return (
    <Link
      className="group bg-card rounded-md p-5 flex flex-col gap-y-2 text-white"
      to="/character/$id"
      params={{ id: String(person.id) }}
      state={{ returnUrl }}
      onPointerDown={() => void prefetch()}
    >
      <span className="text-white font-medium">{mergedPerson.name}</span>

      <div className="flex gap-2 flex-wrap">
        <InfoBlock title="Gender:" value={mergedPerson.gender} />
        <InfoBlock title="Height:" value={mergedPerson.height} />
        <InfoBlock title="Mass:" value={mergedPerson.mass} />
      </div>

      <span className="text-xs text-muted-foreground">Click for more information</span>

      <div className="flex gap-x-1 w-full h-1">
        <span className="bg-foreground rounded-2xl min-w-8" />
        <span className="rounded-2xl w-px group-hover:w-full duration-500 group-hover:visible invisible green-sword" />
      </div>
    </Link>
  );
};
