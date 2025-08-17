import { api, type GetPersonParams } from "@/shared/api";
import { queryOptions } from "@tanstack/react-query";
import { processPerson } from "../helpers/process";

const getPersonQueryKey = (params: GetPersonParams) => ["person", params];

export const getPersonOptions = (params: GetPersonParams) =>
  queryOptions({
    queryKey: getPersonQueryKey(params),
    queryFn: async () => {
      const { data } = await api.people.current(params);
      return processPerson(data);
    },
  });
