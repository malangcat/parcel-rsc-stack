"use client";

import { Activity } from "../../core/Activity";
import { BackButton } from "../../ui/BackButton";
import { Sheet } from "../../ui/Sheet";
import { usePostListContext } from "./context";

export function PostSheet() {
  const { testStr, setTestStr } = usePostListContext();

  return (
    <Activity>
      <Sheet>
        <div>Sheet</div>
        <input
          type="text"
          value={testStr}
          onChange={(e) => setTestStr(e.target.value)}
        />
        <div style={{ height: 200 }} />
        <BackButton>Close</BackButton>
      </Sheet>
    </Activity>
  );
}
