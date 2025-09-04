"use client"
import React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown, Eye, Download, Edit, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const data: Project[] = [
  {
    projectNo: "ASADV-6805-0002",
    name: "Year-End Promotion for Q4 Product",
    owner: "John Smith",
    ownerEmail: "john.smith@opendurian.com",
    team: "Sales Team",
    followUpDate: "11/15/2023",
    usedBudget: 0,
    totalBudget: 200000,
    status: "Pending Review",
    submittedDate: "10/20/2023",
    approvalDate: null,
  },
  {
    projectNo: "ASADV-6805-0002",
    name: "Year-End Promotion for Q4 Product",
    owner: "John Smith",
    ownerEmail: "john.smith@opendurian.com",
    team: "Sales Team",
    followUpDate: "11/15/2023",
    usedBudget: 0,
    totalBudget: 200000,
    status: "Pending Review",
    submittedDate: "10/20/2023",
    approvalDate: null,
  },
  {
    projectNo: "ASADV-6805-0003",
    name: "New Product Launch in partnership with ABC Co.",
    owner: "Sarah Johnson",
    ownerEmail: "sarah.johnson@opendurian.com",
    team: "Product Team",
    followUpDate: "08/10/2023",
    usedBudget: 0,
    totalBudget: 200000,
    status: "Draft",
    submittedDate: null,
    approvalDate: null,
  },
  {
    projectNo: "ASADV-6805-0004",
    name: "Holiday Special for Christmas 2023",
    owner: "Mike Brown",
    ownerEmail: "mike.brown@opendurian.com",
    team: "Marketing Team",
    followUpDate: "12/25/2023",
    usedBudget: 0,
    totalBudget: 175000,
    status: "Rejected",
    submittedDate: "11/05/2023",
    approvalDate: "11/07/2023",
  },
  {
    projectNo: "ASADV-6805-0005",
    name: "Spring Collection Launch",
    owner: "Emily White",
    ownerEmail: "emily.white@opendurian.com",
    team: "Marketing Team",
    followUpDate: "03/01/2024",
    usedBudget: 0,
    totalBudget: 120000,
    status: "Pending Approval",
    submittedDate: "01/15/2024",
    approvalDate: null,
  },
  {
    projectNo: "ASADV-6805-0006",
    name: "Summer Fest Marketing",
    owner: "David Lee",
    ownerEmail: "david.lee@opendurian.com",
    team: "Marketing Team",
    followUpDate: "07/20/2024",
    usedBudget: 0,
    totalBudget: 95000,
    status: "Returned for Revision",
    submittedDate: "06/10/2024",
    approvalDate: null,
  },
];

export type Project = {
  projectNo: string;
  name: string;
  owner: string;
  ownerEmail: string;
  team: string;
  followUpDate: string;
  usedBudget: number;
  totalBudget: number;
  status: string;
  submittedDate: string | null;
  approvalDate: string | null;
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Pending Review":
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
          {status}
        </Badge>
      );
    case "Draft":
      return (
        <Badge variant="outline" className="border-gray-300 text-gray-600">
          {status}
        </Badge>
      );
    case "Rejected":
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
          {status}
        </Badge>
      );
    case "Pending Approval":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
          {status}
        </Badge>
      );
    case "Returned for Revision":
      return (
        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
          {status}
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "projectNo",
    header: "Project No.",
    cell: ({ row }) => (
      <div className="font-medium text-sm">{row.getValue("projectNo")}</div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="max-w-[200px]">
        <div className="font-medium text-blue-600 cursor-pointer hover:underline text-sm">
          {row.getValue("name")}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "owner",
    header: "Owner",
    cell: ({ row }) => {
      const project = row.original;
      return (
        <div className="max-w-[180px]">
          <div className="font-medium text-sm">{project.owner}</div>
          <div className="text-xs text-gray-500 truncate">{project.ownerEmail}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "team",
    header: "Team",
    cell: ({ row }) => (
      <div className="text-sm">{row.getValue("team")}</div>
    ),
  },
  {
    accessorKey: "followUpDate",
    header: "Follow-up Date",
    cell: ({ row }) => (
      <div className="text-sm">{row.getValue("followUpDate")}</div>
    ),
  },
  {
    id: "budget",
    header: "Used / Total Budget",
    cell: ({ row }) => {
      const project = row.original;
      
      return (
        <div className="min-w-[120px]">
          <div className="font-medium text-sm">
            ฿{project.usedBudget.toLocaleString()} / ฿{project.totalBudget.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500">0% used</div>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="min-w-[120px]">
        {getStatusBadge(row.getValue("status"))}
      </div>
    ),
  },
  {
    accessorKey: "submittedDate",
    header: "Submitted Date",
    cell: ({ row }) => {
      const date = row.getValue("submittedDate") as string | null;
      return <div className="text-sm">{date || "-"}</div>;
    },
  },
  {
    accessorKey: "approvalDate",
    header: "Approval Date",
    cell: ({ row }) => {
      const date = row.getValue("approvalDate") as string | null;
      return <div className="text-sm">{date || "-"}</div>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const project = row.original;
      const status = project.status;

      return (
        <div className="flex items-center space-x-1 min-w-[100px]">
          {/* View Icon - Always visible */}
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Eye className="h-4 w-4 text-gray-600" />
          </Button>
          
          {/* Download Icon - Hide for Draft */}
          {/* {status !== "Draft" && (
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Download className="h-4 w-4 text-orange-600" />
            </Button>
          )} */}
          
          {/* Edit Icon - Show for Draft and Returned for Revision */}
          {(status === "Draft" || status === "Returned for Revision") && (
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Edit className="h-4 w-4 text-gray-600" />
            </Button>
          )}
          
          {/* Loading Spinner - Show for Pending statuses */}
          {/* {(status === "Pending Review" || status === "Pending Approval") && (
            <div className="w-4 h-4 border-2 border-orange-400 border-t-transparent rounded-full animate-spin mx-2"></div>
          )} */}
          
          {/* Red Download Icon - Always visible */}
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Download className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      );
    },
  },
];

// Simple FilterBar placeholder component
const FilterBar = () => {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="text-sm text-gray-600">Filter options</div>
    </div>
  );
};

export default function ProjectDataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full space-y-4">
      <FilterBar />
      
      {/* Table Container */}
      <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
        {/* Table Header */}
        <div className="bg-gray-50 border-b border-gray-200">
          {table.getHeaderGroups().map((headerGroup) => (
            <div key={headerGroup.id} className="flex">
              {headerGroup.headers.map((header, index) => {
                const isLastColumn = index === headerGroup.headers.length - 1;
                return (
                  <div 
                    key={header.id} 
                    className={`px-4 py-3 text-left font-semibold text-gray-700 text-sm bg-gray-50 ${
                      header.id === 'projectNo' ? 'w-40' :
                      header.id === 'name' ? 'w-60' :
                      header.id === 'owner' ? 'w-52' :
                      header.id === 'team' ? 'w-36' :
                      header.id === 'followUpDate' ? 'w-32' :
                      header.id === 'budget' ? 'w-44' :
                      header.id === 'status' ? 'w-40' :
                      header.id === 'submittedDate' ? 'w-32' :
                      header.id === 'approvalDate' ? 'w-32' :
                      header.id === 'actions' ? 'w-32' :
                      'flex-1'
                    } ${!isLastColumn ? 'border-r border-gray-200' : ''}`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        
        {/* Table Body */}
        <div className="divide-y divide-gray-200">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, rowIndex) => (
              <div
                key={row.id}
                className={`flex hover:bg-gray-50 ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}
              >
                {row.getVisibleCells().map((cell, index) => {
                  const isLastColumn = index === row.getVisibleCells().length - 1;
                  return (
                    <div 
                      key={cell.id} 
                      className={`px-4 py-4 ${
                        cell.column.id === 'projectNo' ? 'w-40' :
                        cell.column.id === 'name' ? 'w-60' :
                        cell.column.id === 'owner' ? 'w-52' :
                        cell.column.id === 'team' ? 'w-36' :
                        cell.column.id === 'followUpDate' ? 'w-32' :
                        cell.column.id === 'budget' ? 'w-44' :
                        cell.column.id === 'status' ? 'w-40' :
                        cell.column.id === 'submittedDate' ? 'w-32' :
                        cell.column.id === 'approvalDate' ? 'w-32' :
                        cell.column.id === 'actions' ? 'w-32' :
                        'flex-1'
                      } ${!isLastColumn ? 'border-r border-gray-100' : ''}`}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </div>
                  );
                })}
              </div>
            ))
          ) : (
            <div className="flex">
              <div className="px-4 py-12 text-center w-full text-gray-500">
                No results found.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="flex-1 text-sm text-gray-500">
          Showing {table.getFilteredRowModel().rows.length} result(s)
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}