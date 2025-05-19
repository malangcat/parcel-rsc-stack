"use client";

import type * as React from "react";
import { forwardRef } from "react";
import { useActivityContext } from "../core/Activity";
import "./animation.css";

export interface SheetProps extends React.HTMLAttributes<HTMLDivElement> {}

const enterStyle = {
  animationName: "stack-enter",
  "--stack-enter-translate-y": "100%",
  animationTimingFunction: "cubic-bezier(0.22, 0.1, 0.3, 0.85)",
  animationDuration: "300ms",
} as React.CSSProperties;

const exitStyle = {
  animationName: "stack-exit",
  "--stack-exit-translate-y": "100%",
  animationTimingFunction: "cubic-bezier(0.22, 0.1, 0.3, 0.85)",
  animationDuration: "300ms",
};

// Presence에 duration을 전달하는 더 나은 방법이 있을것..
const noopEnterStyle = {
  animationName: "stack-enter",
  animationDuration: "300ms",
} as React.CSSProperties;

const noopExitStyle = {
  animationName: "stack-exit",
  animationTimingFunction: "cubic-bezier(0.22, 0.1, 0.3, 0.85)",
  animationDuration: "300ms",
} as React.CSSProperties;

export const Sheet = forwardRef<HTMLDivElement, { children: React.ReactNode }>(
  (props, ref) => {
    const activity = useActivityContext();

    return (
      <div
        data-asdf={activity.present ? "true" : "false"}
        ref={ref}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          ...(activity.present
            ? activity.index > 0
              ? noopEnterStyle
              : undefined
            : noopExitStyle),
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        />
        <div
          style={{
            position: "absolute",
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
      </div>
    );
  },
);

Sheet.displayName = "Sheet";
