"use client";

import { RecentSoldItemsTable } from "./barang-terjual-table";
import {
  fetchData,
  SoldItem,
  TargetDetail,
  TargetFormat,
} from "@/db/target-progress";
import { Ellipsis, Target } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dashboardText from "./text-dashboard-sales";
import { useEffect, useState } from "react";

export function TargetProgress() {
  const [targetData, setTargetData] = useState<TargetFormat[] | null>(null); // Update type to TargetFormat[]
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchData();
        setTargetData(data.targets); // Use the correct property for target array
      } catch (err) {
        setError("Failed to load data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    // <div>
    //   {targetData && targetData.length > 0 ? (
    //     targetData.map((target) => (
    //       <Card key={target.target_id}>
    //         <CardHeader>
    //           <CardTitle className="text-2xl leading-none">
    //             {dashboardText["target-progress"].title}
    //           </CardTitle>

    //           <CardDescription>
    //             {dashboardText["target-progress"].description}
    //           </CardDescription>
    //         </CardHeader>
    //         <CardContent>
    //           {/* You can render target data here */}
    //           <button className="border-2 border-neutral-200 text-zinc-900 p-4 rounded-2xl justify-between flex gap-2">
    //             <div className="flex gap-2">
    //               <div className="p-3 border border-neutral-100 bg-neutral-100 rounded-xl">
    //                 <Target />
    //               </div>
    //               <div className="flex flex-col items-start justify-between py-1">
    //                 <p className="text-sm font-semibold leading-normal whitespace-nowrap overflow-hidden text-ellipsis max-w-[12rem]">
    //                   {target.target_name} {/* Render target name */}
    //                 </p>
    //                 <p className="text-sm font-medium leading-none text-neutral-500">
    //                   {target.prize} {/* Render prize */}
    //                 </p>
    //               </div>
    //             </div>
    //             <Ellipsis className="text-neutral-500" />
    //           </button>
    //         </CardContent>
    //       </Card>
    //     ))
    //   ) : (
    //     <div>No targets found.</div>
    //   )}
    // </div>
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl leading-none">
            {dashboardText["target-progress"].title}
          </CardTitle>

          <CardDescription>
            {dashboardText["target-progress"].description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {targetData && targetData.length > 0 ? (
              targetData.map((target) => (
                <button
                  key={target.target_id}
                  className="border-2 w-full relative border-neutral-200 text-zinc-900 p-4 rounded-2xl flex gap-2 items-stretch"
                >
                  <div className="w-2 bg-primary rounded-xl"></div>

                  <div className="flex gap-2 flex-1">
                    <div className="p-3 border border-neutral-100 bg-neutral-100 rounded-xl">
                      <Target />
                    </div>
                    <div className="flex flex-col items-start justify-between py-1">
                      <p className="text-sm font-semibold leading-normal whitespace-nowrap overflow-hidden text-ellipsis max-w-[12rem]">
                        {target.target_name}
                      </p>
                      <p className="text-sm font-medium leading-none text-neutral-500">
                        {target.start_date} - {target.end_date}
                      </p>
                    </div>
                  </div>

                  <Ellipsis className="text-neutral-500 self-center" />
                </button>
              ))
            ) : (
              <div>No targets found.</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
