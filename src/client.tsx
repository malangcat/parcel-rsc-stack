"use client-entry";

import { fetchRSC } from "@parcel/rsc/client";
import { startTransition, type ReactNode } from "react";
import { hydrateRoot } from "react-dom/client";
import { activityStore } from "./core/activity-store";
import { HistoryRouter } from "./routes.client";

activityStore.reset();
activityStore.push(location.pathname);


startTransition(() => {
  hydrateRoot(document, <HistoryRouter />);
});

// A very simple router. When we navigate, we'll fetch a new RSC payload from the server,
// and in a React transition, stream in the new page. Once complete, we'll pushState to
// update the URL in the browser.
async function navigate(
  pathname: string,
  mutateHistory: "push" | "replace" | undefined = undefined,
) {
  // let root = await fetchRSC<ReactNode>(pathname);
  if (mutateHistory === "push") {
    activityStore.push(pathname);
    history.pushState(null, "", pathname);
  }
  if (mutateHistory === "replace") {
    history.replaceState(null, "", pathname);
  }
}

// Intercept link clicks to perform RSC navigation.
document.addEventListener("click", (e) => {
  let link = (e.target as Element).closest("a");
  if (
    link &&
    link instanceof HTMLAnchorElement &&
    link.href &&
    (!link.target || link.target === "_self") &&
    link.origin === location.origin &&
    !link.hasAttribute("download") &&
    e.button === 0 && // left clicks only
    !e.metaKey && // open in new tab (mac)
    !e.ctrlKey && // open in new tab (windows)
    !e.altKey && // download
    !e.shiftKey &&
    !e.defaultPrevented
  ) {
    e.preventDefault();
    navigate(link.pathname, "push");
  }
});

document.addEventListener("submit", (e) => {
  let form = e.target as HTMLFormElement;
  if (!form.action.startsWith("javascript:")) {
    e.preventDefault();
    const formData = new FormData(form);
    // @ts-expect-error: https://github.com/microsoft/TypeScript/issues/30584
    const searchParams = new URLSearchParams(formData);
    const baseUrl = new URL(form.action);

    const isReplace = form.dataset.rscReplace === "true";
    navigate(
      `${baseUrl.pathname}?${searchParams.toString()}`,
      isReplace ? "replace" : "push",
    );
  }
});

// When the user clicks the back button, navigate with RSC.
window.addEventListener("popstate", (e) => {
  activityStore.pop();
  navigate(location.pathname);
});
