import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { routeTree } from "./routeTree.gen";
import { useAuthStore } from "./stores/auth-store";
import "./index.css";

const router = createRouter({ routeTree });
const ONE_MINUTE = 60 * 1000;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: ONE_MINUTE,
    },
  },
});

useAuthStore.subscribe((state, previousState) => {
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

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
);
