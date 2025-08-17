import { PersonCard, type ProcessPerson } from '@/entities/person';
import { range } from '@/shared/helpers';
import { Skeleton } from '@/shared/ui/skeleton';
import type { PropsWithChildren } from 'react';

interface PeoplesListProps {
  list: ProcessPerson[];
}

const Container = ({ children }: PropsWithChildren) => {
  return (
    <div className="grid rounded-lg grid-cols-[repeat(auto-fit,minmax(min(100%,230px),1fr))] gap-3 pb-20 overflow-auto">
      {children}
    </div>
  );
};

export const PeoplesList = ({ list }: PeoplesListProps) => {
  return (
    <Container>
      {list.map((person) => (
        <PersonCard person={person} key={person.url} />
      ))}
    </Container>
  );
};

const PeoplesListSkeleton = ({ count = 10 }: { count?: number }) => {
  return (
    <Container>
      {range(1, count).map((item) => (
        <Skeleton className="h-[144px]" key={item} />
      ))}
    </Container>
  );
};

PeoplesList.Skeleton = PeoplesListSkeleton;
