export interface ActivityState {
  id: string;
  index: number;
  present: boolean;
  node: React.ReactNode;
}

// Store definition
let activities: ActivityState[] = [];
const idSet = new Set<string>();
const listeners = new Set<() => void>();

export const activityStore = {
  push: (id: string, node: React.ReactNode) => {
    if (idSet.has(id)) {
      return;
    }
    idSet.add(id);
    activities = [
      ...activities,
      { id, index: activities.length, present: true, node },
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
  unmount: (id: string) => {
    idSet.delete(id);
    activities = activities.filter((activity) => activity.id !== id);
    listeners.forEach((listener) => listener());
  },
  reset: () => {
    activities = [];
    idSet.clear();
  },
  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot: () => {
    return activities;
  },
};
