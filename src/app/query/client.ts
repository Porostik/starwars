import { getMinutes } from "@/shared/helpers";
import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    // onError: (error) => handleApiError(error),
  }),
  mutationCache: new MutationCache({
    // onError: (error) => handleApiError(error),
  }),
  defaultOptions: {
    queries: {
      staleTime: getMinutes(10),
      retry: 3,
    },
  },
});
