"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { AuthorCellAction } from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type AuthroColumn = {
  id: string;
  author_name: string;
  createdAt: Date;
};

export const authroColumn: ColumnDef<AuthroColumn>[] = [
  {
    accessorKey: "author_name",
    header: "Author Name",
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
    cell: ({ row }) => <AuthorCellAction data={row.original} />,
  },
];
