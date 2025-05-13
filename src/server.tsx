import express from "express";
import { renderRequest, callAction } from "@parcel/rsc/node";

// Page components. These must have "use server-entry" so they are treated as code splitting entry points.
import { Home } from "./activities/Home";
import { Detail } from "./activities/Detail";

const app = express();

app.use(express.static("dist"));

app.get("/", async (req, res) => {
  await renderRequest(req, res, <Home />, { component: Home });
});

app.post("/", async (req, res) => {
  let id = req.get("rsc-action-id");
  let { result } = await callAction(req, id);
  let root: any = <Home />;
  if (id) {
    root = { result, root };
  }
  await renderRequest(req, res, root, { component: Home });
});

app.get("/detail", async (req, res) => {
  await renderRequest(req, res, <Detail />, { component: Detail });
});

app.listen(3000);
console.log("Server listening on port 3000");
