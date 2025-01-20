import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { fetchWithAuth } from "@/lib/get_api";
import { postWithAuth } from "@/lib/post_api";

export const CustomerTableData: Customer[] = [
  {
    perusahaan: "PT Alpha Jaya",
    nama: "Budi Santoso",
    whatsapp: "081234567890",
    provinsi: "Jawa Barat",
    kota: "Bandung",
    kecamatan: "Cicendo",
    kelurahan: "Arjuna",
    kode_pos: "40172",
    alamat_lengkap: "Jalan Arjuna No. 10, Cicendo, Bandung",
    value: "pt-alpha-jaya",
  },
  {
    perusahaan: "CV Maju Bersama",
    nama: "Siti Aminah",
    whatsapp: "081987654321",
    provinsi: "Jawa Timur",
    kota: "Surabaya",
    kecamatan: "Tegalsari",
    kelurahan: "Dukuh Pakis",
    kode_pos: "60262",
    alamat_lengkap: "Jalan Dukuh Pakis No. 5, Tegalsari, Surabaya",
    value: "cv-maju-bersama",
  },
  {
    perusahaan: "UD Harapan Baru",
    nama: "Ahmad Fauzan",
    whatsapp: "082134567890",
    provinsi: "DKI Jakarta",
    kota: "Jakarta Selatan",
    kecamatan: "Kebayoran Baru",
    kelurahan: "Cipete",
    kode_pos: "12170",
    alamat_lengkap: "Jalan Cipete Raya No. 23, Kebayoran Baru, Jakarta Selatan",
    value: "ud-harapan-baru",
  },
  {
    perusahaan: "PT Karya Mandiri",
    nama: "Rina Marlina",
    whatsapp: "085678901234",
    provinsi: "Banten",
    kota: "Tangerang",
    kecamatan: "Cipondoh",
    kelurahan: "Petir",
    kode_pos: "15147",
    alamat_lengkap: "Jalan Raya Petir No. 18, Cipondoh, Tangerang",
    value: "pt-karya-mandiri",
  },
  {
    perusahaan: "CV Sentosa Abadi",
    nama: "Joko Priyono",
    whatsapp: "081223344556",
    provinsi: "Jawa Tengah",
    kota: "Semarang",
    kecamatan: "Candisari",
    kelurahan: "Tegalsari",
    kode_pos: "50257",
    alamat_lengkap: "Jalan Tegalsari No. 15, Candisari, Semarang",
    value: "cv-sentosa-abadi",
  },
  {
    perusahaan: "PT Nusantara Sejahtera",
    nama: "Lina Kristiani",
    whatsapp: "087765432101",
    provinsi: "Sumatera Utara",
    kota: "Medan",
    kecamatan: "Medan Baru",
    kelurahan: "Padang Bulan",
    kode_pos: "20153",
    alamat_lengkap: "Jalan Padang Bulan No. 12, Medan Baru, Medan",
    value: "pt-nusantara-sejahtera",
  },
  {
    perusahaan: "PT Cahaya Indah",
    nama: "Tono Saputra",
    whatsapp: "082112233445",
    provinsi: "Kalimantan Timur",
    kota: "Balikpapan",
    kecamatan: "Balikpapan Selatan",
    kelurahan: "Sepinggan",
    kode_pos: "76115",
    alamat_lengkap: "Jalan Sepinggan No. 8, Balikpapan Selatan, Balikpapan",
    value: "pt-cahaya-indah",
  },
  {
    perusahaan: "CV Prima Utama",
    nama: "Sri Wahyuni",
    whatsapp: "085633221100",
    provinsi: "Sulawesi Selatan",
    kota: "Makassar",
    kecamatan: "Panakkukang",
    kelurahan: "Karampuang",
    kode_pos: "90231",
    alamat_lengkap: "Jalan Karampuang No. 19, Panakkukang, Makassar",
    value: "cv-prima-utama",
  },
  {
    perusahaan: "UD Mega Jaya",
    nama: "Arif Hidayat",
    whatsapp: "081199887766",
    provinsi: "Jawa Barat",
    kota: "Bekasi",
    kecamatan: "Bekasi Barat",
    kelurahan: "Harapan Jaya",
    kode_pos: "17143",
    alamat_lengkap: "Jalan Harapan Jaya No. 9, Bekasi Barat, Bekasi",
    value: "ud-mega-jaya",
  },
  {
    perusahaan: "PT Surya Gemilang",
    nama: "Fitri Andayani",
    whatsapp: "082244556677",
    provinsi: "Bali",
    kota: "Denpasar",
    kecamatan: "Denpasar Selatan",
    kelurahan: "Sanur",
    kode_pos: "80228",
    alamat_lengkap: "Jalan Sanur No. 7, Denpasar Selatan, Denpasar",
    value: "pt-surya-gemilang",
  },
  {
    perusahaan: "PT Anugerah Bersama",
    nama: "Dewi Ratnasari",
    whatsapp: "083312345678",
    provinsi: "Jawa Timur",
    kota: "Malang",
    kecamatan: "Klojen",
    kelurahan: "Kauman",
    kode_pos: "65119",
    alamat_lengkap: "Jalan Kauman No. 16, Klojen, Malang",
    value: "pt-anugerah-bersama",
  },
  {
    perusahaan: "CV Sumber Rejeki",
    nama: "Heri Susanto",
    whatsapp: "081233445566",
    provinsi: "Lampung",
    kota: "Bandar Lampung",
    kecamatan: "Tanjung Karang Barat",
    kelurahan: "Gedong Air",
    kode_pos: "35118",
    alamat_lengkap:
      "Jalan Gedong Air No. 11, Tanjung Karang Barat, Bandar Lampung",
    value: "cv-sumber-rejeki",
  },
  {
    perusahaan: "UD Pertiwi",
    nama: "Yuniarti Wijaya",
    whatsapp: "084477889900",
    provinsi: "Jambi",
    kota: "Jambi",
    kecamatan: "Jambi Timur",
    kelurahan: "Talang Banjar",
    kode_pos: "36128",
    alamat_lengkap: "Jalan Talang Banjar No. 20, Jambi Timur, Jambi",
    value: "ud-pertiwi",
  },
  {
    perusahaan: "PT Global Tekno",
    nama: "Andi Nugroho",
    whatsapp: "081888776655",
    provinsi: "Aceh",
    kota: "Banda Aceh",
    kecamatan: "Meuraxa",
    kelurahan: "Lamjamee",
    kode_pos: "23233",
    alamat_lengkap: "Jalan Lamjamee No. 14, Meuraxa, Banda Aceh",
    value: "pt-global-tekno",
  },
  {
    perusahaan: "CV Indo Makmur",
    nama: "Samsul Arifin",
    whatsapp: "085544332211",
    provinsi: "Kalimantan Barat",
    kota: "Pontianak",
    kecamatan: "Pontianak Kota",
    kelurahan: "Darit",
    kode_pos: "78116",
    alamat_lengkap: "Jalan Darit No. 25, Pontianak Kota, Pontianak",
    value: "cv-indo-makmur",
  },
  {
    perusahaan: "UD Nusantara",
    nama: "Rahmat Hidayat", 
    whatsapp: "081322334455",
    provinsi: "Riau",
    kota: "Pekanbaru",
    kecamatan: "Tampan",
    kelurahan: "Tuah Madani",
    kode_pos: "28293",
    alamat_lengkap: "Jalan Tuah Madani No. 21, Tampan, Pekanbaru",
    value: "ud-nusantara",
  },
  {
    perusahaan: "PT Alam Sejahtera",
    nama: "Mega Sari",
    whatsapp: "081244556677",
    provinsi: "Sumatera Selatan",
    kota: "Palembang",
    kecamatan: "Sukarami",
    kelurahan: "Talang Kelapa",
    kode_pos: "30152",
    alamat_lengkap: "Jalan Talang Kelapa No. 19, Sukarami, Palembang",
    value: "pt-alam-sejahtera",
  },
  {
    perusahaan: "CV Griya Bahagia",
    nama: "Yusuf Firmansyah",
    whatsapp: "081144556678",
    provinsi: "Sulawesi Utara",
    kota: "Manado",
    kecamatan: "Tikala",
    kelurahan: "Paal Dua",
    kode_pos: "95114",
    alamat_lengkap: "Jalan Paal Dua No. 7, Tikala, Manado",
    value: "cv-griya-bahagia",
  },
  {
    perusahaan: "PT Sumber Jaya",
    nama: "Wahyudi Prasetyo",
    whatsapp: "085533227788",
    provinsi: "Nusa Tenggara Barat",
    kota: "Mataram",
    kecamatan: "Cakranegara",
    kelurahan: "Karang Jangkong",
    kode_pos: "83115",
    alamat_lengkap: "Jalan Karang Jangkong No. 18, Cakranegara, Mataram",
    value: "pt-sumber-jaya",
  },
  {
    perusahaan: "UD Berkah Utama",
    nama: "Yuli Astuti",
    whatsapp: "082198765432",
    provinsi: "Jawa Barat",
    kota: "Cirebon",
    kecamatan: "Harjamukti",
    kelurahan: "Kalitanjung",
    kode_pos: "45143",
    alamat_lengkap: "Jalan Kalitanjung No. 12, Harjamukti, Cirebon",
    value: "ud-berkah-utama",
  },
];

export type Customer = {
  perusahaan: string;
  nama: string;
  whatsapp: string;
  provinsi: string;
  kota: string;
  kecamatan: string;
  kelurahan: string;
  kode_pos: string;
  alamat_lengkap: string;
  value: string;
};

export type CustomerList = {
  perusahaan: string;
  value: string;
};

export type FetchCustomerDetailsResponse = {
  message: string;
  result: string[]; // Adjusted to match the flat array structure
  status: number; // Represents HTTP status codes like 200, 401, etc.
};

export type CustomerDetails = {
  value: string;
  nama: string;
  perusahaan: string;
  alamat_lengkap: string;
  whatsapp: string;
};

export const fetchCustomer = async (): Promise<CustomerList[]> => {
  try {
    const rawData = (
      await fetchWithAuth<{ result: any[][] }>("/api/v1/sales/customer-list")
    ).result;

    // Transform the raw data into the desired structure
    const customerList: CustomerList[] = rawData.map(([id, perusahaan]) => ({
      perusahaan: perusahaan.trim(), // Trim to ensure clean data
      value: id.trim(), // Remove extra whitespace
    }));

    console.log("Transformed customer list:", customerList);
    return customerList;
  } catch (error) {
    console.error("Error fetching or transforming customer data:", error);
    throw new Error("Failed to fetch customer list. Please try again later.");
  }
};

export const fetchCustomerDetails = async (
  customerId: string
): Promise<CustomerDetails> => {
  try {
    // Make a POST request to fetch customer details
    const response = await postWithAuth<FetchCustomerDetailsResponse>(
      "/api/v1/sales/customer-details",
      {
        customer_id: customerId, // Use the parameter here
      }
    );

    // Check for successful status code (200)
    if (response.status !== 200) {
      throw new Error(
        `API error: ${response.message} (status: ${response.status})`
      );
    }

    // Map the response.result to the desired CustomerDetails structure
    const [id, name, companyName, address, phone] = response.result;

    const customerDetails: CustomerDetails = {
      value: id,
      nama: name,
      perusahaan: companyName,
      alamat_lengkap: address,
      whatsapp: phone,
    };

    console.log("Transformed data:", customerDetails);
    return customerDetails;
  } catch (error) {
    console.error("Error fetching or transforming data:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
