import React from "react";
import { Button } from "./ui/button";
import { RefreshCcw } from "lucide-react";

interface Prop {
  onClick: () => void;
  loading: boolean;
}

export const UpdateButton = ({ onClick, loading }: Prop) => {
  return (
    <Button
      className="bg-green-500 hover:bg-green-700 text-white"
      onClick={onClick}
    >
      {loading ? <RefreshCcw className="w-4 h-4 animate-spin" /> : "Update"}
    </Button>
  );
};
