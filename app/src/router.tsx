import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    // Old WordPress URLs end in "/"; keep them exactly (canonical tags point to the slash form).
    trailingSlash: "preserve",
    defaultPreloadStaleTime: 0,
  });

  return router;
};
