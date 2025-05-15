import { callAction, renderRequest } from "@parcel/rsc/node";
import express from "express";

// Page components. These must have "use server-entry" so they are treated as code splitting entry points.
import { routes } from "./routes";

const app = express();

app.use(express.static("dist"));

for (const route of routes) {
  app.get(route.path, async (req, res) => {
    await renderRequest(req, res, <route.component />, {
      component: route.component,
    });
  });

  app.post(route.path, async (req, res) => {
    let id = req.get("rsc-action-id");
    let { result } = await callAction(req, id);
    let root: any = <route.component />;
    if (id) {
      root = { result, root };
    }
    await renderRequest(req, res, root, { component: route.component });
  });
}

app.listen(3000);
console.log("Server listening on port 3000");
