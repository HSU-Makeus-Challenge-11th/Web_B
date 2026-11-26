"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect, useState, type ReactNode } from "react";
import { useAuthStore } from "@/stores/auth-store";
import { useBookmarkStore } from "@/stores/bookmark-store";

const ONE_MINUTE = 60 * 1000;

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { staleTime: ONE_MINUTE } },
      }),
  );

  useEffect(() => {
    void useAuthStore.persist.rehydrate();
    void useBookmarkStore.persist.rehydrate();

    return useAuthStore.subscribe((state, previousState) => {
      if (state.accessToken === previousState.accessToken) return;

      const filters = {
        predicate: (query: { queryKey: readonly unknown[] }) =>
          ["members", "favorites", "ratings"].includes(
            String(query.queryKey[0]),
          ),
      };
      void queryClient.cancelQueries(filters);
      queryClient.removeQueries(filters);
    });
  }, [queryClient]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
