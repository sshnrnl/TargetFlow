"use client";

import { useState, ReactNode } from "react";
import { SquareSplitHorizontal } from "lucide-react";
import {
  LayoutDashboard,
  WalletCards,
  User,
  ScrollText,
  Target,
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Main Layout Component
export default function DesktopLayout({ children }: { children: ReactNode }) {
  const [activeLink, setActiveLink] = useState<
    "/" | "/sales" | "/sales-order" | "/sales-target"
  >("/");

  const handleLinkClick = (
    path: "/" | "/sales" | "/sales-order" | "/sales-target"
  ) => {
    setActiveLink(path);
  };

  return (
    <div className="flex w-full">
      <DesktopNav activeLink={activeLink} handleLinkClick={handleLinkClick} />
      <div className="flex-1 flex flex-col">
        <TopDesktopNav activeLink={activeLink} />
        <main className="flex-grow p-6">{children}</main>
      </div>
    </div>
  );
}

// Sidebar Navigation
function DesktopNav({
  activeLink,
  handleLinkClick,
}: {
  activeLink: "/" | "/sales" | "/sales-order" | "/sales-target";
  handleLinkClick: (
    path: "/" | "/sales" | "/sales-order" | "/sales-target"
  ) => void;
}) {
  return (
    <section className="sticky top-0 flex flex-col border-r-2 h-[100vh] min-w-[300px] py-6 px-4 gap-8">
      <div className="flex items-center gap-2">
        <div className="w-min aspect-square px-2 py-2 bg-black rounded-lg">
          <WalletCards color="#ffffff" />
        </div>
        <div className="flex flex-col">
          <p className="leading-none font-bold text-foreground">PT MKS</p>
          <p className="leading-none text-foreground">Premium Plan</p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-foreground">Overview</p>
        <NavLink
          href="/"
          isActive={activeLink === "/"}
          label="Dashboard"
          icon={<LayoutDashboard className="text-foreground" />}
          handleClick={handleLinkClick}
        />
        <NavLink
          href="/sales"
          isActive={activeLink === "/sales"}
          label="Sales"
          icon={<User className="text-foreground" />}
          handleClick={handleLinkClick}
        />
        <NavLink
          href="/sales-order"
          isActive={activeLink === "/sales-order"}
          label="Sales Order"
          icon={<ScrollText className="text-foreground" />}
          handleClick={handleLinkClick}
        />
        <NavLink
          href="/sales-target"
          isActive={activeLink === "/sales-target"}
          label="Sales Target"
          icon={<Target className="text-foreground" />}
          handleClick={handleLinkClick}
        />
      </div>
    </section>
  );
}

// Top Navigation
function TopDesktopNav({
  activeLink,
}: {
  activeLink: "/" | "/sales" | "/sales-order" | "/sales-target";
}) {
  const breadCrumbTitle: {
    [key in "/" | "/sales" | "/sales-order" | "/sales-target"]: string;
  } = {
    "/": "Dashboard",
    "/sales": "Sales",
    "/sales-order": "Sales Order",
    "/sales-target": "Sales Target",
  };
  return (
    <div
      id="navbar"
      className="w-full flex justify-between p-4 items-center border-b"
    >
      <div className="flex items-center gap-2">
        <SquareSplitHorizontal />
        <Breadcrumb className="pl-2 border-l">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Overview</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{breadCrumbTitle[activeLink]}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
}

// Navigation Link Component
function NavLink({
  href,
  isActive,
  label,
  icon,
  handleClick,
}: {
  href: "/" | "/sales" | "/sales-order" | "/sales-target";
  isActive: boolean;
  label: string;
  icon: React.ReactNode;
  handleClick: (
    path: "/" | "/sales" | "/sales-order" | "/sales-target"
  ) => void;
}) {
  return (
    <Link
      href={href}
      className={`flex gap-2 px-2 py-2 rounded-lg ${
        isActive ? "bg-muted" : ""
      }`}
      onClick={() => handleClick(href)}
    >
      {icon}
      <p className="font-medium text-foreground">{label}</p>
    </Link>
  );
}
