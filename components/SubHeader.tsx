import React from "react";
import { Diamond, Bell, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type SubHeader = {
  title: string;
  button: string;
};
export default function Header({ title, button }: SubHeader) {
  return (
    <div className="w-full bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left Section - Logo and Navigation */}
        <div className="flex items-center space-x-8">
          <div className="text-2xl font-semibold">{title}</div>
        </div>

        {/* Right Section - User Info */}
        <div className="flex items-center space-x-4">
          <div className="flex flex-wrap items-center gap-2 md:flex-row">
            <Button>
              <Link href="/new-project">{button}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
