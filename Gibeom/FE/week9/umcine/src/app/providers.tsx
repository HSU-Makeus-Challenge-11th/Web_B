"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { ReactNode } from "react";
import { getQueryClient } from "../lib/query-client";

// QueryClientProvider는 React Context를 쓰므로 Client Component에서만 렌더링할 수 있음
// Server Component인 layout.tsx는 이 컴포넌트로 children을 감싸기만 함
export function Providers({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
