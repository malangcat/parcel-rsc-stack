export interface ActivityState {
  path: string;
  index: number;
  present: boolean;
}

// Store definition
let activities: ActivityState[] = [];
const listeners = new Set<() => void>();

export const activityStore = {
  push: (path: string) => {
    activities = [
      ...activities,
      { path, index: activities.length, present: true },
    ];
    listeners.forEach((listener) => listener());
  },
  pop: () => {
    const last = activities.pop();
    if (!last) {
      return;
    }

    activities = [
      ...activities,
      {
        ...last,
        present: false,
      },
    ];
    listeners.forEach((listener) => listener());
  },
  unmount: (path: string) => {
    activities = activities.filter((activity) => activity.path !== path);
    listeners.forEach((listener) => listener());
  },
  reset: () => {
    activities = [];
  },
  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot: () => {
    return activities;
  },
};
