"use client";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useEffect } from "react";

export function SalesDashboardDriver() {
  useEffect(() => {
    driverObj.drive();
  });
  const driverObj = driver({
    showProgress: true,
    allowClose: false,
    steps: [
      {
        element: "#a",
        popover: {
          title: "Selamat Datang di Dashboard Anda",
          description:
            "Anda adalah seorang sales. Di sini, Anda dapat melihat seluruh aktivitas dan performa penjualan Anda.",
          side: "left",
          align: "start",
        },
      },
      {
        element: "#omzet-sales",
        popover: {
          title: "Omzet Bulanan",
          description:
            "Berikut adalah omzet Anda untuk bulan ini. Pantau pencapaian penjualan Anda dengan mudah.",
          side: "bottom",
          align: "start",
        },
      },
      {
        element: "#invoice-sales",
        popover: {
          title: "Banyaknya Invoice",
          description:
            "Lihat jumlah invoice yang telah Anda buat untuk bulan ini dan kelola dengan lebih efisien.",
          side: "bottom",
          align: "start",
        },
      },
      {
        element: "#performa-sales",
        popover: {
          title: "Jumlah Pelanggan",
          description:
            "Berikut adalah total pelanggan Anda pada bulan ini. Perhatikan pertumbuhan pelanggan Anda.",
          side: "left",
          align: "start",
        },
      },

      {
        element: "#recent-invoice",
        popover: {
          title: "Order Terbaru",
          description:
            "Temukan order terbaru Anda untuk bulan ini dan pastikan semuanya terkelola dengan baik.",
          side: "right",
          align: "start",
        },
      },
      {
        element: "#recent-sold",
        popover: {
          title: "Barang Terjual",
          description:
            "Lihat barang-barang yang sudah Anda jual dan analisis tren penjualan Anda.",
        },
      },
      {
        element: "#buat-so",
        popover: {
          title: "Buat Invoice Baru",
          description:
            "Mulai buat invoice baru dengan mudah di sini untuk memudahkan proses transaksi Anda.",
        },
      },
    ],
  });

  return <></>;
}
