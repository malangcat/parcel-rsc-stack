"use client";

import "./AppScreen.css";
import type * as React from "react";
import { useActivityContext } from "../core/Activity";
import { forwardRef } from "react";

export interface AppScreenProps extends React.HTMLAttributes<HTMLDivElement> {}

const enterStyle = {
  animationName: "stack-enter",
  "--stack-enter-translate-x": "100%",
  animationTimingFunction: "cubic-bezier(0.22, 0.1, 0.3, 0.85)",
  animationDuration: "300ms",
} as React.CSSProperties;

const exitStyle = {
  animationName: "stack-exit",
  "--stack-exit-translate-x": "100%",
  animationTimingFunction: "cubic-bezier(0.22, 0.1, 0.3, 0.85)",
  animationDuration: "300ms",
};

export const AppScreen = forwardRef<
  HTMLDivElement,
  { children: React.ReactNode }
>((props, ref) => {
  const activity = useActivityContext();

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        zIndex: activity.index,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "white",
        ...(activity.present
          ? activity.index > 0
            ? enterStyle
            : undefined
          : exitStyle),
      }}
    >
      {props.children}
    </div>
  );
});

AppScreen.displayName = "AppScreen";
