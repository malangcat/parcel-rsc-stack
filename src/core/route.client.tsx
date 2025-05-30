import { fetchRSC } from "@parcel/rsc/client";
import { JSX } from "react";
import { ActivityProvider } from "./Activity";
import { ActivityState } from "./activity-store";
import { hashRoute, LayoutProps, PageProps } from "./route";
import { useActivityStore } from "./useActivityStore";

//////// temporal
export interface PageRouteClient {
  type: "page";
  id: string;
  path: string;
  component?: (
    props: PageProps<any, any>,
  ) => JSX.Element | Promise<JSX.Element>;
}

export interface LayoutRouteClient {
  type: "layout";
  id: string;
  children: (PageRouteClient | LayoutRouteClient)[];
  component?: (props: LayoutProps<any>) => JSX.Element | Promise<JSX.Element>;
}

export function routeClient(id: string, path: string): PageRouteClient {
  return { type: "page", id, path };
}

export function layoutClient(
  id: string,
  children: (PageRouteClient | LayoutRouteClient)[],
): LayoutRouteClient {
  return { type: "layout", id, children };
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
      if (!route.component) {
        route.component = fetchRSC(hashRoute(route) + ".rsc");
      }
      const Layout = route.component;
      const children = route.children.map((child) =>
        buildComponentRecursive(child, history),
      );

      return <route.component />;
    }
    if (route.type === "page") {
      const state = history.find((h) => h.path === route.path);

      if (!state) return null;

      if (!route.component) {
        route.component = fetchRSC(route.path + ".rsc");
      }

      return (
        <ActivityProvider key={route.path} state={state}>
          {route.component}
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
