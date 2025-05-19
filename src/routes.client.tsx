import {
  buildHistoryComponent,
  layoutClient,
  routeClient,
} from "./core/route.client";

export const routes = [
  layoutClient([
    layoutClient([routeClient("/"), routeClient("/sheet")]),
    routeClient("/posts/:postId"),
  ]),
];

export const HistoryRouter = buildHistoryComponent(routes);
