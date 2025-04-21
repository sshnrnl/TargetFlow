import { fetchWithAuth } from "@/lib/get_api";

export interface SoldItem {
  item_name: string;
  items_id: string;
  qty_sold: number;
}

export interface TargetDetail {
  items_id: string;
  item_name: string;
  qty: number;
}

export interface TargetFormat {
  target_id: number;
  target_name: string;
  description: string;
  prize: string;
  created_at: string;
  start_date: string;
  end_date: string;
  details: TargetDetail[];
  sold: SoldItem[];
  progress: number;
}

interface RawSoldItem {
  item_name: string;
  items_id: string;
  qty_sold: number;
}

interface RawTargetDetail {
  items_id: string;
  item_name: string;
  qty: string;
}

interface RawTarget {
  target_id: number;
  target_name: string;
  description: string;
  prize: string | null;
  created_at: string;
  start_date: string;
  end_date: string;
  sold: RawSoldItem[];
  details: RawTargetDetail[];
}

interface ApiResponse {
  targets: RawTarget[];
}

export const fetchData = async (): Promise<{ targets: TargetFormat[] }> => {
  try {
    const rawData = await fetchWithAuth<ApiResponse>(
      "/api/v1/sales/get_target"
    );

    if (!rawData || !rawData.targets) {
      throw new Error("Invalid data structure");
    }

    const transformedData = rawData.targets.map((target) => {
      const soldMap = new Map<string, number>(
        target.sold.map((soldItem) => [soldItem.items_id, soldItem.qty_sold])
      );

      const soldNameMap = new Map<string, string>(
        target.sold.map((item) => [item.items_id, item.item_name])
      );

      const detailNameMap = new Map<string, string>(
        target.details.map((detail) => [
          detail.items_id,
          soldNameMap.get(detail.items_id) || "Unknown",
        ])
      );

      let totalQty = 0;
      let totalSold = 0;

      const detailsWithProgress: TargetDetail[] = target.details.map(
        (detail) => {
          const qty = Number(detail.qty) || 0;
          const soldQty = Number(soldMap.get(detail.items_id)) || 0;

          totalQty += qty;
          totalSold += soldQty;

          // Determine the item name from soldNameMap (or fallback to "Unknown")
          const item_name = detail.item_name;

          return {
            items_id: detail.items_id,
            qty,
            item_name, // Ensure item_name is correctly populated
          };
        }
      );

      const soldItems: SoldItem[] = target.sold.map((sold) => ({
        items_id: sold.items_id,
        qty_sold: Number(sold.qty_sold) || 0,
        item_name:
          sold.item_name || detailNameMap.get(sold.items_id) || "Unknown", // Fallback
      }));

      const overallProgress = totalQty > 0 ? totalSold / totalQty : 0;

      return {
        target_id: target.target_id,
        target_name: target.target_name,
        description: target.description,
        prize: target.prize || "None",
        created_at: target.created_at,
        start_date: target.start_date,
        end_date: target.end_date,
        details: detailsWithProgress,
        sold: soldItems,
        progress: overallProgress,
      };
    });

    console.log("Transformed Data:", transformedData);
    return { targets: transformedData };
  } catch (error) {
    console.error("Error fetching or transforming data:", error);
    throw error;
  }
};
