"use server-entry";

import "../client";
import { Activity } from "../core/Activity";
import { AppScreen } from "../ui/AppScreen";
import { BackButton } from "../ui/BackButton";
import { Document } from "../ui/Document";
import { name } from "./actions";

export async function Detail() {
  return (
    <Document title="Detail">
      <Activity id="detail">
        <AppScreen>
          <div>Detail</div>
          Submitted Name: {name}
          <BackButton>Back</BackButton>
        </AppScreen>
      </Activity>
    </Document>
  );
}
