"use client";

import * as React from "react";

export interface BackButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const BackButton = React.forwardRef<HTMLButtonElement, BackButtonProps>(
  (props, ref) => {
    const { onClick, ...rest } = props;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (event.defaultPrevented) {
        return;
      }
      history.back();
    };

    return <button ref={ref} onClick={handleClick} {...rest} />;
  },
);
BackButton.displayName = "BackButton";
