import {
  QueryClient,
  defaultShouldDehydrateQuery,
  isServer,
  type Query,
} from "@tanstack/react-query";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000 * 5, // 5 minutes
      },
      dehydrate: {
        // include pending queries in dehydration
        shouldDehydrateQuery: (query: Query) =>
          defaultShouldDehydrateQuery(query) ??
          query.state.status === "pending",
      },
    },
  });
}

let browserQueryClient: QueryClient;

export function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    browserQueryClient ??= makeQueryClient();
    return browserQueryClient;
  }
}
