import { Detail } from "./activities/Detail";
import { Home } from "./activities/Home";
import { Route } from "./core/route";

export const routes: Route[] = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/detail",
    component: Detail,
  },
];
