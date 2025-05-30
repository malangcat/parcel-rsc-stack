"use server-entry"

import "./client.tsx";

import { RootLayout } from "./app/layout";
import { PostDetail } from "./app/PostDetail/page";
import { PostListLayout } from "./app/PostList/layout";
import { PostList } from "./app/PostList/page";
import { PostSheet } from "./app/PostList/sheet";
import {
  buildSsrRoutes,
  buildRscRoutes,
  layout,
  route
} from "./core/route";

export const routes = [
  layout(RootLayout, [
    layout(PostListLayout, [route("/", PostList), route("/sheet", PostSheet)]),
    route("/posts/:postId", PostDetail),
  ]),
];

export const ssrRoutes = buildSsrRoutes(routes);

export const rscRoutes = buildRscRoutes(routes);