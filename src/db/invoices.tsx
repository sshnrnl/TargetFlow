import { fetchWithAuth } from "@/lib/get_api";

export type Invoices = {
  id: string;
  sales: string;
  perusahaan: string;
  nominal: number;
  nama: string;
  tanggal: Date;
};

export const fetchData = async (): Promise<Invoices[]> => {
  try {
    const rawData = await fetchWithAuth<any[][]>("/api/v1/sales/get_so");

    // Map the raw d  ata to the desired Invoices structure
    const invoices: Invoices[] = rawData.map(
      ([id, perusahaan, nominal, tanggal, , sales, nama]) => ({
        id: id.trim(), // Remove extra whitespace
        sales,
        perusahaan,
        nominal,
        nama,
        tanggal: new Date(tanggal), // Convert string to Date
      })
    );

    console.log("Transformed data:", invoices);
    return invoices;
  } catch (error) {
    console.error("Error fetching or transforming data:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};

export const InvoicesTableData: Invoices[] = [
  {
    id: "INV001",
    sales: "Anto",
    perusahaan: "PT Maju Jaya",
    nominal: 1500000,
    nama: "Kusuma",
    tanggal: new Date("2025-01-01"),
  },
  {
    id: "INV002",
    sales: "Chandra",
    perusahaan: "PT Sukses Selalu",
    nominal: 3000000,
    nama: "Siti",
    tanggal: new Date("2025-01-02"),
  },
  {
    id: "INV003",
    sales: "Anto",
    perusahaan: "CV Sejahtera",
    nominal: 2500000,
    nama: "Kumar",
    tanggal: new Date("2025-01-03"),
  },
  {
    id: "INV004",
    sales: "Anto",
    perusahaan: "PT Makmur Abadi",
    nominal: 5000000,
    nama: "Alfionso",
    tanggal: new Date("2025-01-04"),
  },
  {
    id: "INV005",
    sales: "Willie",
    perusahaan: "PT Berkah Sentosa",
    nominal: 2000000,
    nama: "Patrik",
    tanggal: new Date("2025-01-05"),
  },
  {
    id: "INV006",
    sales: "Willie",
    perusahaan: "PT Harmoni Cipta",
    nominal: 1200000,
    nama: "Leonard",
    tanggal: new Date("2025-01-06"),
  },
  {
    id: "INV007",
    sales: "Willie",
    perusahaan: "PT Sumber Cahaya",
    nominal: 4000000,
    nama: "Vanes",
    tanggal: new Date("2025-01-07"),
  },
  {
    id: "INV008",
    sales: "Kenny",
    perusahaan: "PT Cipta Karya",
    nominal: 3500000,
    nama: "Ahai",
    tanggal: new Date("2025-01-08"),
  },
  {
    id: "INV009",
    sales: "Kenny",
    perusahaan: "PT Prima Utama",
    nominal: 4500000,
    nama: "Allen",
    tanggal: new Date("2025-01-09"),
  },
  {
    id: "INV010",
    sales: "Kenny",
    perusahaan: "PT Karya Mandiri",
    nominal: 2200000,
    nama: "Noa",
    tanggal: new Date("2025-01-10"),
  },
  {
    id: "INV011",
    sales: "Ryan Lewis",
    perusahaan: "CV Tunas Harapan",
    nominal: 3800000,
    nama: "Lewi",
    tanggal: new Date("2025-01-11"),
  },
  {
    id: "INV012",
    sales: "Hannah Walker",
    perusahaan: "PT Inspirasi Bangsa",
    nominal: 2800000,
    nama: "Ades",
    tanggal: new Date("2025-01-12"),
  },
  {
    id: "INV013",
    sales: "Ethan Young",
    perusahaan: "PT Teknologi Hebat",
    nominal: 6000000,
    nama: "Erlangga",
    tanggal: new Date("2025-01-13"),
  },
  {
    id: "INV014",
    sales: "Olivia Harris",
    perusahaan: "PT Solusi Utama",
    nominal: 7000000,
    nama: "Meri",
    tanggal: new Date("2025-01-14"),
  },
  {
    id: "INV015",
    sales: "Alexander Hill",
    perusahaan: "PT MKS",
    nominal: 8000000,
    nama: "Olivia",
    tanggal: new Date("2025-01-15"),
  },
  {
    id: "INV016",
    sales: "Charlotte Scott",
    perusahaan: "PT Pembangunan Jaya",
    nominal: 5500000,
    nama: "Sara",
    tanggal: new Date("2025-01-16"),
  },
  {
    id: "INV017",
    sales: "James Allen",
    perusahaan: "PT Pilar Nusantara",
    nominal: 5000000,
    nama: "Desi",
    tanggal: new Date("2025-01-17"),
  },
  {
    id: "INV018",
    sales: "Amelia Adams",
    perusahaan: "CV Sarana Mulia",
    nominal: 1000000,
    nama: "Jane",
    tanggal: new Date("2025-01-18"),
  },
  {
    id: "INV019",
    sales: "Benjamin White",
    perusahaan: "PT Mandiri Bersama",
    nominal: 1500000,
    nama: "Ken",
    tanggal: new Date("2025-01-19"),
  },
  {
    id: "INV020",
    sales: "Emma Lewis",
    perusahaan: "PT Bangkit Sejahtera",
    nominal: 9000000,
    nama: "Medi",
    tanggal: new Date("2025-01-20"),
  },
];
