import { callAction, renderRequest } from "@parcel/rsc/node";
import express from "express";

// Page components. These must have "use server-entry" so they are treated as code splitting entry points.
import { renderRSC } from "@parcel/rsc/node";
import { ComponentType } from "react";
import { rscRoutes, ssrRoutes } from "./routes";

const app = express();

app.use(express.static("dist"));

for (const route of ssrRoutes) {
  app.get(route.path, async (req, res) => {
    const params = req.params;
    const searchParams = req.query;

    await renderRequest(
      req,
      res,
      <route.Comp params={params} searchParams={searchParams} />,
      {
        component: route.Comp as ComponentType,
      },
    );
  });


  app.post(route.path, async (req, res) => {
    let id = req.get("rsc-action-id");
    let { result } = await callAction(req, id);

    const params = req.params;
    const searchParams = req.query;
    let root: any = <route.Comp params={params} searchParams={searchParams} />;

    if (id) {
      root = { result, root };
    }
    await renderRequest(req, res, root, { component: route.Comp as ComponentType });
  });
}

for (const route of rscRoutes) {
  app.get(route.path + ".rsc", async (req, res) => {
    const params = req.params;
    const searchParams = req.query;

    let stream = renderRSC(
      <route.Comp params={params} searchParams={searchParams} />,
    );
    res.set("Content-Type", "text/x-component");
    stream.pipe(res);
  });
}

app.listen(3000);
console.log("Server listening on port 3000");
