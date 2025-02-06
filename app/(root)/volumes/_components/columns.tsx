"use client";

import { ColumnDef } from "@tanstack/react-table";
import { SeasonCellAction } from "./cell-action";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type SeasonColumns = {
  id: string;
  season: string;
  createdAt: Date;
};

export const seasonColumns: ColumnDef<SeasonColumns>[] = [
  {
    accessorKey: "season",
    header: "Season",
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div>{new Date(row.original.createdAt).toLocaleDateString("en-CA")}</div>
    ),
  },
  {
    header: "Action",
    cell: ({ row }) => <SeasonCellAction data={row.original} />,
  },
];
