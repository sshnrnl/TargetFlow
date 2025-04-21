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
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function TargetProgress() {
  const [targetData, setTargetData] = useState<TargetFormat[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedTargetId, setExpandedTargetId] = useState<number | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchData();
        setTargetData(data.targets);
      } catch (err) {
        setError("Failed to load data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const toggleAccordion = (targetId: number) => {
    setExpandedTargetId((prev) => (prev === targetId ? null : targetId));
  };

  useEffect(() => {
    const allContents = document.querySelectorAll(".accordion-content");
    allContents.forEach((el) => {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.3, ease: "power2.out" });
    });

    if (expandedTargetId !== null) {
      const el = document.getElementById(
        `accordion-content-${expandedTargetId}`
      );
      if (el) {
        gsap.set(el, { height: "auto", opacity: 1 });
        const height = el.scrollHeight;
        gsap.fromTo(
          el,
          { height: 0, opacity: 0 },
          { height, opacity: 1, duration: 0.3, ease: "power2.out" }
        );
      }
    }
  }, [expandedTargetId]);

  return (
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
              targetData.map((target) => {
                const isExpanded = expandedTargetId === target.target_id;
                return (
                  <div key={target.target_id}>
                    <button
                      onClick={() => toggleAccordion(target.target_id)}
                      className="border-2 w-full relative border-neutral-200 text-zinc-900 p-4 rounded-2xl flex items-stretch flex-col"
                    >
                      <div className="flex gap-2 flex-1 w-full">
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
                      </div>

                      <div className="mt-2 w-full flex items-center gap-2">
                        <div className="flex-1 h-1 bg-neutral-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all duration-500"
                            style={{
                              width: `${
                                Math.min(Math.max(target.progress, 0), 1) * 100
                              }%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-xs text-neutral-500 whitespace-nowrap">
                          {(target.progress * 100).toFixed(0)}%
                        </span>
                      </div>

                      <div
                        id={`accordion-content-${target.target_id}`}
                        className="accordion-content overflow-hidden px-4"
                        style={{ height: 0, opacity: 0 }}
                      >
                        <div className="mt-2 space-y-2 text-sm text-left">
                          <p className="text-neutral-500 font-semibold">
                            Detail Barang
                          </p>
                          {target.details.map((item) => {
                            const soldItem = target.sold.find(
                              (s) => s.items_id === item.items_id
                            );
                            return (
                              <div
                                key={item.items_id}
                                className="flex justify-between text-sm text-zinc-800"
                              >
                                <span>Nama: {item.item_name}</span>
                                <span>
                                  {soldItem
                                    ? `${soldItem.qty_sold} / ${item.qty}`
                                    : `0 / ${item.qty}`}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </button>
                  </div>
                );
              })
            ) : (
              <div>No targets found.</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
