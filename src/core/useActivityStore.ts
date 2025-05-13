"use client";

import { useSyncExternalStore } from "react";
import { activityStore } from "./activity-store";

export function useActivityStore() {
  const activities = useSyncExternalStore(
    activityStore.subscribe,
    activityStore.getSnapshot,
    activityStore.getSnapshot, // server snapshot
  );

  return {
    activities,
    push: activityStore.push,
    pop: activityStore.pop,
    unmount: activityStore.unmount,
  };
}
