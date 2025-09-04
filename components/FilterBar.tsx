"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Calendar, Search } from "lucide-react";

export default function FilterBar() {
  return (
    <div className="flex flex-row items-center gap-2 justify-between w-full">
      <div>
        {/* Search */}
        <div className="relative">
          <Input
            type="text"
            placeholder="Search..."
            className="pl-8 w-[200px]"
          />
          <span className="absolute left-2 top-2.5 text-gray-400">
            <Search size={16} />
          </span>
        </div>
      </div>
      <div className="flex items-center ">
        {/* Start date */}
        <Button variant="outline" className="flex items-center gap-2 mr-2">
          <Calendar className="w-4 h-4" />
          Start date
        </Button>
        <span className="text-gray-500 mr-2">To</span>
        {/* End date */}
        <Button variant="outline" className="flex items-center gap-2 mr-2">
          <Calendar className="w-4 h-4" />
          End date
        </Button>

        {/* Follow up date */}
        <Button variant="outline" className="flex items-center gap-2 mr-2">
          <Calendar className="w-4 h-4" />
          Follow up date
        </Button>

        <div className="mr-2">
          {/* Team dropdown */}
          <Select>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Team" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dev">Development</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mr-2">
          {/* Status dropdown */}
          <Select>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Export button */}
        <Button variant="outline" className="ml-auto">
          {/* <span className="mr-2">📤</span> */}
          Export
        </Button>
      </div>
    </div>
  );
}
