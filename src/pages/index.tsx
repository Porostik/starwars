import { SearchInput } from '@/features/search';
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { getPeopleOptions, PendingText, useIsShowPendingText } from '@/entities/person';
import { PeoplesList } from '@/widgets/peoples-list';
import { PeoplesPagination } from '@/features/pagination';
import { PageError } from '@/features/page-error';
import { useQuery } from '@tanstack/react-query';

const PendingComponent = () => {
  const { isShow: isShowPendingText } = useIsShowPendingText(true, 5000);

  return (
    <div className="flex flex-col px-5 gap-y-3 h-full relative pb-20">
      {isShowPendingText ? <PendingText /> : <div className="h-5" />}
      <SearchInput.Skeleton />
      <PeoplesList.Skeleton count={10} />
    </div>
  );
};

function Index() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const { data, isPending, isFetching } = useQuery(
    getPeopleOptions({
      page: search.page,
      search: search.query
    })
  );

  const { isShow: isShowPendingText } = useIsShowPendingText(isPending, 5000);

  const onSetQuery = (value: string) => {
    void navigate({
      search: {
        query: value,
        page: 1
      }
    });
  };

  const onSetPage = (page: number) => {
    void navigate({
      search: {
        ...search,
        page
      }
    });
  };

  if (!data && isPending) return <PendingComponent />;

  return (
    <div className="flex flex-col px-5 gap-y-3 h-full relative pb-20">
      {isShowPendingText ? <PendingText /> : <div className="h-5" />}
      <SearchInput onSearch={onSetQuery} initialValue={search.query ?? ''} />

      {!isFetching ? <PeoplesList list={data?.results ?? []} /> : <PeoplesList.Skeleton />}
      {data?.results.length && (
        <div className="fixed bottom-0 left-0 w-full">
          <PeoplesPagination total={data?.count} onSetPage={onSetPage} currentPage={Number(search.page)} />
        </div>
      )}
    </div>
  );
}

const searchSchema = z.object({
  page: z.coerce.number().default(1),
  query: z.string().trim().optional()
});

export const Route = createFileRoute('/')({
  component: Index,
  validateSearch: searchSchema,
  loaderDeps: ({ search: { page, query } }) => ({
    page,
    query
  }),
  loader: ({ deps: { page, query }, context: { queryClient } }) => {
    void queryClient.ensureQueryData(
      getPeopleOptions({
        page: page,
        search: query
      })
    );
  },
  errorComponent: () => <PageError routeId={Route.id} />
  // pendingComponent: PendingComponent,
});
