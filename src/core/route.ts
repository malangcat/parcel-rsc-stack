import type { JSX } from "react";

interface PageProps<
  P extends Record<string, string> = Record<string, never>,
  S extends Record<string, string | string[]> = Record<string, never>,
> {
  params: P;
  searchParams: S;
}

export interface Route<
  P extends Record<string, string> = Record<string, never>,
  S extends Record<string, string> = Record<string, never>,
> {
  path: string;
  component: (props: PageProps<P, S>) => Promise<JSX.Element>;
}

export function route<
  P extends Record<string, string> = Record<string, never>,
  S extends Record<string, string> = Record<string, never>,
>(
  path: string,
  component: (props: PageProps<P, S>) => Promise<JSX.Element>,
): Route<P, S> {
  return { path, component };
}
