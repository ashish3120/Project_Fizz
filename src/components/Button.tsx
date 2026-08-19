import { LinkField } from "@prismicio/client";
import { PrismicLink } from "@prismicio/react";
import clsx from "clsx";
import React from "react";

type Props = {
  buttonLink: LinkField;
  buttonText: string | null;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
};

export default function Button({ buttonLink, buttonText, className, onClick }: Props) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) {
      onClick(e);
    } else {
      window.dispatchEvent(new CustomEvent("open-sample-pack"));
    }
  };

  return (
    <PrismicLink
      onClick={handleClick}
      className={clsx(
        "rounded-xl bg-orange-600 px-5 py-4 text-center text-xl font-bold uppercase tracking-wide \
         text-white transition-colors duration-150 hover:bg-orange-700 md:text-2xl cursor-pointer inline-block",
        className,
      )}
      field={buttonLink}
    >
      {buttonText}
    </PrismicLink>
  );
}

