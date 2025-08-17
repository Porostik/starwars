import { api, type GetPeoplesParams } from "@/shared/api";
import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { processPeoples } from "../helpers/process";

const getPeopleListQueryKey = (params: GetPeoplesParams) => ["people", params];

export const getPeopleOptions = (params: GetPeoplesParams) =>
  queryOptions({
    queryKey: getPeopleListQueryKey(params),
    queryFn: async () => {
      const { data } = await api.people.list(params);
      return {
        ...data,
        results: processPeoples(data.results),
      };
    },
    placeholderData: keepPreviousData,
  });
