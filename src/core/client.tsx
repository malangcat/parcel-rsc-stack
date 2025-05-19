// import { ReactNode, useInsertionEffect } from "react";
// import { createFromReadableStream } from "react-server-dom-parcel/client";
// import { rscStream } from "rsc-html-stream/client";

// // Stream in initial RSC payload embedded in the HTML.
// let initialRSCPayload: Promise<ReactNode>;
// function RSCRoot({ value, cb }: { value?: ReactNode; cb?: () => void }) {
//   initialRSCPayload ??= createFromReadableStream<ReactNode>(rscStream);
//   useInsertionEffect(() => {
//     cb?.();
//   });
//   return value === undefined ? initialRSCPayload : value;
// }
