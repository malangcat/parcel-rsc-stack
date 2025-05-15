import type { JSX } from "react";

interface PageProps<T extends Record<string, string> = Record<string, never>> {
  params: T;
}

export interface Route<
  T extends Record<string, string> = Record<string, never>,
> {
  path: string;
  component: (props: PageProps<T>) => Promise<JSX.Element>;
}

export function route<T extends Record<string, string> = Record<string, never>>(
  path: string,
  component: (props: PageProps<T>) => Promise<JSX.Element>,
): Route<T> {
  return { path, component };
}
