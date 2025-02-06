"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getAdminData } from "@/store/Slices/AuthSlice";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { LogOut } from "@/components/LogOut";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  if (!isLoaded) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Image
          src="/gif/loadingRimuru.gif"
          alt="loading"
          width={1000}
          height={1000}
          className="w-40 h-40"
        />
      </div>
    );
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex  justify-between h-16 shrink-0 items-center gap-2 border-b px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>

                {segments.map((segment, index) => {
                  const path = `/${segments.slice(0, index + 1).join("/")}`;

                  return (
                    <div key={index} className="flex items-center gap-1">
                      {index > -1 && (
                        <BreadcrumbSeparator className="hidden md:block" />
                      )}

                      <BreadcrumbItem key={index}>
                        <BreadcrumbLink href={path}>
                          {/* Capitalize each segment for display */}
                          {segment.charAt(0).toUpperCase() + segment.slice(1)}
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                    </div>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="justify-self-end ">
            <LogOut />
          </div>
        </header>
        <main className="p-5">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MainLayout;
