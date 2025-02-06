"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MangaCellAction } from "./cell-action";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type MangaColumn = {
  id: string;
  manga_name?: string;
  category?: string[];
  author?: string;
  createdAt: Date;
};

export const mangaColumn: ColumnDef<MangaColumn>[] = [
  {
    accessorKey: "manga_name",
    header: "Manga Name",
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-2">
        {row.original.category?.map((category) => (
          <Button variant="secondary" key={category}>
            {category}
          </Button>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "author",
    header: "Author",
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
    cell: ({ row }) => <MangaCellAction data={row.original} />,
  },
];
