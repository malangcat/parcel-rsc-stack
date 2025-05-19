import { callAction, renderRequest } from "@parcel/rsc/node";
import express from "express";

// Page components. These must have "use server-entry" so they are treated as code splitting entry points.
import { ComponentType } from "react";
import { buildRouteComponent, flattenRoutes } from "./core/route";
import { routes } from "./routes";
import { renderRSC } from "@parcel/rsc/node";

const app = express();

app.use(express.static("dist"));

const flattenedRoutes = flattenRoutes(routes);

for (const route of flattenedRoutes) {
  const Comp = buildRouteComponent(route);

  app.get(route.path, async (req, res) => {
    const params = req.params;
    const searchParams = req.query;

    await renderRequest(
      req,
      res,
      <Comp params={params} searchParams={searchParams} />,
      {
        component: Comp as ComponentType,
      },
    );
  });

  app.get(route.path + ".rsc", async (req, res) => {
    const params = req.params;
    const searchParams = req.query;

    let stream = renderRSC(
      <route.component params={params} searchParams={searchParams} />,
    );
    res.set("Content-Type", "text/x-component");
    stream.pipe(res);
  });

  app.post(route.path, async (req, res) => {
    let id = req.get("rsc-action-id");
    let { result } = await callAction(req, id);

    const params = req.params;
    const searchParams = req.query;
    let root: any = <Comp params={params} searchParams={searchParams} />;

    if (id) {
      root = { result, root };
    }
    await renderRequest(req, res, root, { component: Comp as ComponentType });
  });
}

app.listen(3000);
console.log("Server listening on port 3000");
