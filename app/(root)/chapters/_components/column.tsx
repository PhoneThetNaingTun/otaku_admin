"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { ChapterCellAction } from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ChapterColumn = {
  id: string;
  chapter: string;
  createdAt: Date;
};

export const chapterColumn: ColumnDef<ChapterColumn>[] = [
  {
    accessorKey: "chapter",
    header: "Chapter",
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
    cell: ({ row }) => <ChapterCellAction data={row.original} />,
  },
];
