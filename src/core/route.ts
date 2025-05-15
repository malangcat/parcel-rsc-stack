import type { ComponentType } from "react";

export interface Route {
  path: string;
  component: ComponentType;
}
