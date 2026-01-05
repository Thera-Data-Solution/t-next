import { LucideIcon } from "lucide-react";

export type MenuItem = {
  name: string;
  icon: LucideIcon;
  action: () => void;
};

export type MenuSectionProps = {
  title: string;
  items: MenuItem[];
};
