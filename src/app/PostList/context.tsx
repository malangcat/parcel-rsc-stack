"use client";

import { createContext, useContext, useMemo, useState } from "react";

export const PostListContext = createContext<{
  testStr: string;
  setTestStr: (testStr: string) => void;
} | null>(null);

export function PostListProvider({ children }: { children: React.ReactNode }) {
  const [testStr, setTestStr] = useState("");

  return (
    <PostListContext.Provider
      value={useMemo(() => ({ testStr, setTestStr }), [testStr, setTestStr])}
    >
      {children}
    </PostListContext.Provider>
  );
}

export function usePostListContext() {
  const context = useContext(PostListContext);

  if (!context) {
    throw new Error(
      "usePostListContext must be used within a PostListProvider",
    );
  }

  return context;
}
