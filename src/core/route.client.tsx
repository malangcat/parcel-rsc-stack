import { fetchRSC } from "@parcel/rsc/client";
import * as React from "react";
import { JSX } from "react";
import { ActivityProvider } from "./Activity";
import { ActivityState } from "./activity-store";
import { LayoutProps, PageProps } from "./route";
import { useActivityStore } from "./useActivityStore";

//////// temporal
export interface PageRouteClient {
  type: "page";
  path: string;
  component?: (
    props: PageProps<any, any>,
  ) => JSX.Element | Promise<JSX.Element>;
}

export interface LayoutRouteClient {
  type: "layout";
  children: (PageRouteClient | LayoutRouteClient)[];
  component?: (props: LayoutProps<any>) => JSX.Element | Promise<JSX.Element>;
}

export function routeClient(path: string): PageRouteClient {
  return { type: "page", path };
}

export function layoutClient(
  children: (PageRouteClient | LayoutRouteClient)[],
): LayoutRouteClient {
  return { type: "layout", children };
}

////////

export function buildHistoryComponent(
  routes: (PageRouteClient | LayoutRouteClient)[],
) {
  function buildComponentRecursive(
    route: PageRouteClient | LayoutRouteClient,
    history: ActivityState[],
  ) {
    if (route.type === "layout") {
      const Layout = React.lazy(() => fetchRSC("xxx"));
      const children = route.children
        .map((child) => buildComponentRecursive(child, history))
        .filter((c) => c !== undefined);

      return <Layout params={{}}>{children}</Layout>;
    }
    if (route.type === "page") {
      const state = history.find((h) => h.path === route.path);

      if (!state) return null;

      const Page = React.lazy(() => fetchRSC(route.path));
      return (
        <ActivityProvider state={state}>
          <Page params={{}} searchParams={{}} />
        </ActivityProvider>
      );
    }
  }

  return () => {
    const { activities: history } = useActivityStore();

    return (
      <>{routes.map((route) => buildComponentRecursive(route, history))}</>
    );
  };
}
