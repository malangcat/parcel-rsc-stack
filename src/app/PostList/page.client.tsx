"use client";

import { usePostListContext } from "./context";

export function PostListClient() {
  const { testStr } = usePostListContext();

  return <div>{testStr}</div>;
}
