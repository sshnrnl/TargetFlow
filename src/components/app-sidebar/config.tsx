import {
  AudioWaveform,
  BookOpen,
  BookUser,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  LayoutDashboard,
  LucideIcon,
  Map,
  PieChart,
  ScrollText,
  Settings2,
  SquareTerminal,
  SquareUser,
  Target,
} from "lucide-react";

export const ConfigData = {
  user: {
    name: "Admin",
    email: "admin-1@mitraku.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "PT MKS",
      logo: GalleryVerticalEnd,
      plan: "Basic Plan",
    },
  ],
  navMain: [
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Accounts",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  overview: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Sales",
      url: "/sales",
      icon: SquareUser,
    },
    { name: "Customer", url: "/customer", icon: BookUser },
    {
      name: "Sales Order",
      url: "/sales-order",
      icon: ScrollText,
    },

    {
      name: "Sales Target",
      url: "/sales-target",
      icon: Target,
    },
  ],
};

export const ConfigSidebar = (asdf: string) => {
  if (asdf === "admin") return ConfigSidebarData.admin;
  if (asdf === "sales") return ConfigSidebarData.sales;
  return ConfigSidebarData.def;
};

type ConfigSidebarDataType = {
  [key: string]: {
    label: string;
    item: {
      name: string;
      url: string;
      icon: LucideIcon; // Replace this with the actual type if `LucideIcon` is not correct
    }[];
  };
};

const ConfigSidebarData: ConfigSidebarDataType = {
  admin: {
    label: "Admin",
    item: [
      {
        name: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard, // Ensure this is the correct type (LucideIcon)
      },
      {
        name: "Sales",
        url: "/sales",
        icon: SquareUser, // Ensure this is the correct type (LucideIcon)
      },
      { name: "Customer", url: "/customer", icon: BookUser },
      {
        name: "Sales Order",
        url: "/sales-order",
        icon: ScrollText,
      },
      {
        name: "Sales Target",
        url: "/sales-target",
        icon: Target,
      },
    ],
  },
  def: {
    label: "def",
    item: [
      {
        name: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard, // Ensure this is the correct type (LucideIcon)
      },
    ],
  },
  sales: {
    label: "Sales",
    item: [
      {
        name: "Dashboard",
        url: "/sales/",
        icon: LayoutDashboard,
      },
      {
        name: "Buat Sales Order",
        url: "/sales/sales-order",
        icon: ScrollText,
      },
    ],
  },
};
