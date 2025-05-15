import { callAction, renderRequest } from "@parcel/rsc/node";
import express from "express";

// Page components. These must have "use server-entry" so they are treated as code splitting entry points.
import { routes } from "./routes";
import { ComponentType } from "react";

const app = express();

app.use(express.static("dist"));

for (const route of routes) {
  app.get(route.path, async (req, res) => {
    const params = req.params;
    const Comp = route.component as ComponentType<any>;

    await renderRequest(req, res, <Comp params={params} />, {
      component: Comp,
    });
  });

  app.post(route.path, async (req, res) => {
    let id = req.get("rsc-action-id");
    let { result } = await callAction(req, id);

    const Comp = route.component as ComponentType<any>;
    const params = req.params;
    let root: any = <Comp params={params} />;
    if (id) {
      root = { result, root };
    }
    await renderRequest(req, res, root, { component: Comp });
  });
}

app.listen(3000);
console.log("Server listening on port 3000");
