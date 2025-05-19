import { callAction, renderRequest } from "@parcel/rsc/node";
import express from "express";

// Page components. These must have "use server-entry" so they are treated as code splitting entry points.
import { ComponentType } from "react";
import { flattenRoutes } from "./core/route";
import { HistoryRenderer, routes } from "./routes";

const app = express();

app.use(express.static("dist"));

const flattenedRoutes = flattenRoutes(routes);

for (const route of flattenedRoutes) {
  const Comp = route.component as ComponentType<any>;

  app.get(route.path, async (req, res) => {
    const params = req.params;
    const searchParams = req.query;

    await renderRequest(
      req,
      res,
      <HistoryRenderer
        history={[{ index: 0, path: route.path, present: true }]}
      />,
      {
        component: Comp,
      },
    );
  });

  app.post(route.path, async (req, res) => {
    let id = req.get("rsc-action-id");
    let { result } = await callAction(req, id);

    const params = req.params;
    const searchParams = req.query;
    let root: any = (
      <HistoryRenderer
        history={[{ index: 0, path: route.path, present: true }]}
      />
    );

    if (id) {
      root = { result, root };
    }
    await renderRequest(req, res, root, { component: Comp });
  });
}

app.listen(3000);
console.log("Server listening on port 3000");
