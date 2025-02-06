"use client";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Separator } from "./ui/separator";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  BookImage,
  Bookmark,
  ChartBarStacked,
  Earth,
  UserPen,
} from "lucide-react";
import Link from "next/link";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const data = {
    navMain: [
      {
        title: "Manage Categories",
        url: "#",
        items: [
          {
            title: "Categories",
            url: "/categories",
            isActive: pathname.includes("/categories"),
            icon: ChartBarStacked,
          },
        ],
      },
      {
        title: "Manage Volumes",
        url: "#",
        items: [
          {
            title: "Volumes",
            url: "/volumes",
            isActive: pathname.includes("/volumes"),
            icon: Earth,
          },
        ],
      },
      {
        title: "Manage Chapters",
        url: "#",
        items: [
          {
            title: "Chapters",
            url: "/chapters",
            isActive: pathname.includes("/chapters"),
            icon: Bookmark,
          },
        ],
      },
      {
        title: "Manage Authors",
        url: "#",
        items: [
          {
            title: "Authors",
            url: "/authors",
            isActive: pathname.includes("/authors"),
            icon: UserPen,
          },
        ],
      },
      {
        title: "Manage Mangas",
        url: "#",
        items: [
          {
            title: "Mangas",
            url: "/mangas",
            isActive: pathname.includes("/mangas"),
            icon: BookImage,
          },
        ],
      },
    ],
  };
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link href={"/"}>
          <div className="flex items-center gap-2">
            <Image
              src="/icon.png"
              alt="logo"
              width={1000}
              height={1000}
              className="w-20 h-20"
            />
            <p className="text-red-500 font-semibold text-xl">Otaku World</p>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem
                    key={item.title}
                    className={cn(
                      "rounded-md",
                      item.isActive && "bg-gray-200 "
                    )}
                  >
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        {item.icon && <item.icon className="w-5 h-5" />}
                        {item.title}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
            <Separator className="my-2" />
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
