// import Image from "next/image";
import SubHeader from "@/components/SubHeader";
import DatePicker from "@/components/ui/datepicker";
import StatCard from "@/components/StatCard";

import TableData from "@/components/TableData";

export default function Home() {
  return (
    <div>
      <div>
        <SubHeader title="Dashboard" button="+ New Project Budget" />
        <div className="w-full bg-white">
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex">
              <div>
                <DatePicker title="Start Date" />
              </div>
              <div className="ml-3">
                <DatePicker title="End Date" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full bg-white">
          <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-6 py-3 border-b border-gray-200">
            <StatCard title="Total Requests" amount={12} percent={8.1} />
            <StatCard title="Pending Approval" amount={3} percent={8.1} />
            <StatCard title="Approved" amount={12} percent={8.1} />
            <StatCard title="Total Budget" amount={1.2} percent={8.1} />
          </div>
        </div>
        <div className="w-full bg-white">
          <div className="flex items-center justify-between px-6 py-3">
            {/* <FilterBar /> */}
            <TableData />
          </div>
         
        </div>
      </div>
    </div>
  );
}
