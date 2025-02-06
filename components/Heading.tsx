import React from "react";

interface Prop {
  heading: string;
}

export const Heading = ({ heading }: Prop) => {
  return (
    <p className="font-semibold text-sm md:text-xl lg:text-3xl">{heading}</p>
  );
};
