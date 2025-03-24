"use client";
import {
  QueryClient,
  QueryClientProvider,
  isServer,
} from "@tanstack/react-query";

const MINUTE = 60 * 1000; // 1000/s

// Create a client
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: true,
        staleTime: 5 * MINUTE, // time before it renders
        gcTime: 10 * MINUTE, //does nothing as long as a query is still in use.
        //It only kicks in as soon as the query becomes unused.
        //After the time has passed, data will be "garbage collected" to avoid the cache from growing.
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
