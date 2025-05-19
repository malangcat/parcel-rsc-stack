"use client";

import { Slot } from "@radix-ui/react-slot";
import type * as React from "react";
import { createContext, useContext, useEffect, useRef } from "react";
import { ActivityState } from "./activity-store";
import { useActivityStore } from "./useActivityStore";
import { usePresence } from "./usePresence";

export const ActivityContext = createContext<ActivityState | null>(null);

export const RscActivityProvider = (props: {
  state?: ActivityState;
  path: string;
  children?: React.ReactNode;
}) => {
  const { activities } = useActivityStore();
  const clientMatchedActivity = activities.find((a) => a.path === props.path);

  const state = props.state ?? clientMatchedActivity;
  const childRef = useRef(props.children);

  useEffect(() => {
    childRef.current = props.children;
  }, [props.children]);

  if (!state) return null;

  return (
    <ActivityContext.Provider value={state}>
      {props.children ?? childRef.current}
    </ActivityContext.Provider>
  );
};

export function useActivityContext() {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error("useActivityContext must be used within an Activity");
  }
  return context;
}

export interface ActivityProps {
  children: React.ReactNode;
}

export function Activity({ children }: ActivityProps) {
  const state = useActivityContext();
  const { unmount } = useActivityStore();
  const { ref } = usePresence({
    present: state?.present ?? false,
    onUnmount: () => {
      unmount(state?.path ?? "");
    },
  });

  if (!state) {
    return null;
  }

  return <Slot ref={ref}>{children}</Slot>;
}
