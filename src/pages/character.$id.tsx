import { createFileRoute } from '@tanstack/react-router';
import {
  AdditionalBlock,
  getDirectOptions,
  getPersonOptions,
  MainInfo,
  PendingText,
  useGetMergedPerson,
  useIsShowPendingText,
  useRewriteStore,
  type ProcessPerson
} from '@/entities/person';
import { BackLink } from '@/features/back-link';
import { Skeleton } from '@/shared/ui/skeleton';
import { PageError } from '@/features/page-error';
import { useMemo, useState } from 'react';
import { WritableValue } from '@/shared/lib/writable-value';
import { Button } from '@/shared/ui/button';

const PendingComponent = () => {
  const { isShow: isShowPendingText } = useIsShowPendingText(true, 5000);

  return (
    <div className="flex flex-col px-5 gap-y-3 h-full relative pb-20">
      <div className="w-full flex">
        <BackLink />
        {isShowPendingText && <PendingText className="mx-auto" />}
        <div className="w-[65px]" />
      </div>

      <div className="w-full flex justify-center">
        <Skeleton className="w-[100px] h-8" />
      </div>

      <div className="grid rounded-lg grid-cols-[repeat(auto-fit,minmax(min(100%,330px),1fr))] gap-3 pb-20 overflow-auto">
        {Array(4)
          .fill(0)
          .map((_, idx) => (
            <Skeleton className="min-h-[250px] rounded-lg" key={idx} />
          ))}
      </div>
    </div>
  );
};

function Character() {
  const data = Route.useLoaderData();

  const mergedPerson = useGetMergedPerson(data);

  const onRewrite = useRewriteStore((state) => state.onRewrite);

  const [person, setPerson] = useState(mergedPerson);

  const isChanged = useMemo(() => {
    return JSON.stringify(mergedPerson) !== JSON.stringify(person);
  }, [mergedPerson, person]);

  return (
    <div className="flex flex-col px-5 gap-y-3 h-full relative pb-20">
      <div className="flex w-full justify-between items-center">
        <BackLink />

        {isChanged && (
          <Button className="h-7" variant="secondary" onClick={() => onRewrite(person)}>
            Save
          </Button>
        )}
      </div>

      <div className="flex justify-center">
        <WritableValue
          className="font-medium text-2xl"
          initialValue={person.name}
          onChange={(value) => setPerson((prev) => ({ ...prev, name: value }))}
        />
      </div>

      <div className="grid rounded-lg grid-cols-[repeat(auto-fit,minmax(min(100%,330px),1fr))] gap-3 pb-20 overflow-auto">
        <MainInfo
          person={person}
          onChangeValue={(field, value) =>
            setPerson((prev) => ({
              ...prev,
              [field]: value
            }))
          }
        />
        <AdditionalBlock title="Films" urls={person.films} key="films" />
        <AdditionalBlock title="Species" urls={person.species} key="species" />
        <AdditionalBlock title="Planets" urls={person.planets ?? []} key="planets" />
        <AdditionalBlock title="Starships" urls={person.starships} key="starships" />
        <AdditionalBlock title="Vehicles" urls={person.vehicles} key="vehicles" />
      </div>
    </div>
  );
}

export const Route = createFileRoute('/character/$id')({
  component: Character,
  loader: async ({ context: { queryClient }, params: { id } }) => {
    const rewrites = useRewriteStore.getState().rewrites;

    let person: ProcessPerson;

    if (id in rewrites) {
      person = rewrites[id];
    } else {
      person = await queryClient.ensureQueryData(
        getPersonOptions({
          id: Number(id)
        })
      );
    }

    const refs = [person.homeworld, ...person.films, ...person.starships, ...person.vehicles, ...person.species].filter(
      (item) => !!item
    );

    refs.forEach((url) => void queryClient.prefetchQuery(getDirectOptions(url)));

    return person;
  },
  pendingComponent: PendingComponent,
  errorComponent: () => <PageError routeId={Route.id} />
});
