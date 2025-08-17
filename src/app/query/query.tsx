import { QueryClientProvider } from "@tanstack/react-query";
import { type PropsWithChildren } from "react";
import { queryClient } from "./client";

export const QueryProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
