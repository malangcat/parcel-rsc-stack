import type { JSX } from "react";
import { ActivityProvider } from "./Activity";

export interface PageProps<
  P extends Record<string, string> = Record<string, never>,
  S extends Record<string, string | string[]> = Record<string, never>,
> {
  params: P;
  searchParams: S;
}

export interface LayoutProps<
  P extends Record<string, string> = Record<string, never>,
> {
  params: P;
  children: React.ReactNode;
}

export interface PageRoute<
  P extends Record<string, string> = Record<string, never>,
  S extends Record<string, string> = Record<string, never>,
> {
  type: "page";
  path: string;
  component: (props: PageProps<P, S>) => JSX.Element | Promise<JSX.Element>;
}

export interface LayoutRoute<
  P extends Record<string, string> = Record<string, never>,
> {
  type: "layout";
  component: (props: LayoutProps<P>) => JSX.Element | Promise<JSX.Element>;
  children: (PageRoute | LayoutRoute)[];
}

export function route<
  P extends Record<string, string> = Record<string, never>,
  S extends Record<string, string> = Record<string, never>,
>(
  path: string,
  component: (props: PageProps<P, S>) => JSX.Element | Promise<JSX.Element>,
): PageRoute<P, S> {
  return { type: "page", path, component };
}

export function layout<
  P extends Record<string, string> = Record<string, never>,
>(
  component: (props: LayoutProps<P>) => JSX.Element | Promise<JSX.Element>,
  children: (PageRoute<any, any> | LayoutRoute<any>)[],
): LayoutRoute<P> {
  return { type: "layout", component, children };
}


export function hashRoute(route: PageRoute | LayoutRoute): string {
  if (route.type === "page") {
    return route.path;
  }
  if (route.type === "layout") {
    // for test
    return "/" + encodeURIComponent(route.children.map(x => x.type === "page" ? x.path : "%%").join("__"))
  }
  return "error";
}

interface FlattenedRoute {
  path: string;
  layouts: LayoutRoute[];
  component: (props: PageProps<any, any>) => JSX.Element | Promise<JSX.Element>;
}

function flattenRoutes(
  routes: (PageRoute | LayoutRoute)[],
): FlattenedRoute[] {
  const flattenedResult: FlattenedRoute[] = [];

  function processRouteArray(
    currentRouteArray: (PageRoute | LayoutRoute)[],
    accumulatedLayouts: LayoutRoute[],
  ) {
    for (const routeItem of currentRouteArray) {
      if (routeItem.type === "page") {
        const page = routeItem as PageRoute<any, any>;
        flattenedResult.push({
          path: page.path,
          layouts: [...accumulatedLayouts],
          component: page.component,
        });
      } else {
        const layout = routeItem as LayoutRoute<any>;
        const newAccumulatedLayouts = [...accumulatedLayouts, layout];
        if (layout.children && layout.children.length > 0) {
          processRouteArray(layout.children, newAccumulatedLayouts);
        }
      }
    }
  }

  processRouteArray(routes, []);
  return flattenedResult;
}

function buildRouteComponent(
  flatRoute: FlattenedRoute,
): React.ComponentType<PageProps<any, any>> {
  const { path, layouts, component: Page } = flatRoute;

  function buildComponentRecursive(
    index: number,
    currentProps: PageProps<any, any>,
  ) {
    if (index >= layouts.length) {
      return (
        <ActivityProvider
          key={path}
          state={{
            index: 0,
            path: path,
            present: true,
          }}
        >
          <Page {...currentProps} />
        </ActivityProvider>
      );
    }

    const layoutDefinition = layouts[index];
    const Layout = layoutDefinition.component;
    return (
      <Layout params={currentProps.params}>
        {buildComponentRecursive(index + 1, currentProps)}
      </Layout>
    );
  }

  return (props: PageProps<any, any>) => buildComponentRecursive(0, props);
}

export function buildSsrRoutes(
  routes: (PageRoute | LayoutRoute)[],
) {
  return flattenRoutes(routes).map((x) => ({
    path: x.path,
    Comp: buildRouteComponent(x),
  }));
}

export function buildRscRoutes(
  routes: (PageRoute | LayoutRoute)[],
) {
  const result: {
    path: string;
    Comp: React.ComponentType<any>;
  }[] = []

  function recursive(
    routes: (PageRoute | LayoutRoute)[],
  ) {
    for (const route of routes) {
      if (route.type === "layout") {
        const layout = route as LayoutRoute;
        result.push({
          path: hashRoute(layout),
          Comp: layout.component,
        });
        recursive(layout.children);
      } else {
        const page = route as PageRoute;
        result.push({
          path: hashRoute(page),
          Comp: page.component,
        })
      }
    }
  }

  recursive(routes);

  return result;
}