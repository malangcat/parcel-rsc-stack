"use client";

import { Slot } from "@radix-ui/react-slot";
import type * as React from "react";
import { createContext, useContext, useEffect, useMemo } from "react";
import { ActivityState } from "./activity-store";
import { useActivityStore } from "./useActivityStore";
import { usePresence } from "./usePresence";

export interface ActivityProps {
  children: React.ReactNode;

  id: string;
}

export function Activity({ children, id }: ActivityProps) {
  useActivityMount({
    children,
    id,
  });

  return <ActivityRenderer />;
}

function useActivityMount({ children, id }: ActivityProps) {
  const { push } = useActivityStore();
  useEffect(() => {
    push(id, children);
  }, [children, id, push]);
}

function ActivityPresence({ activity }: { activity: ActivityState }) {
  const { unmount } = useActivityStore();
  const { ref } = usePresence({
    present: activity.present,
    onUnmount: () => {
      unmount(activity.id);
    },
  });

  return <Slot ref={ref}>{activity.node}</Slot>;
}

const ActivityContext = createContext<ActivityState | null>(null);

export function useActivityContext() {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error("useActivityContext must be used within an Activity");
  }
  return context;
}

function ActivityRenderer() {
  const { activities } = useActivityStore();

  return activities.map((activity) => (
    <ActivityContext.Provider key={activity.id} value={activity}>
      <ActivityPresence activity={activity} />
    </ActivityContext.Provider>
  ));
}
