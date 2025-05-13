"use server-entry";

import "../client";
import { Activity } from "../core/Activity";
import { AppScreen } from "../ui/AppScreen";
import { Document } from "../ui/Document";
import { action } from "./actions";

export async function Home() {
  return (
    <Document title="Home">
      <Activity id="home">
        <AppScreen>
          Hello
          <form action={action}>
            <input name="name" />
            <button type="submit">Submit</button>
          </form>
          <a href="/detail">Detail</a>
        </AppScreen>
      </Activity>
    </Document>
  );
}
