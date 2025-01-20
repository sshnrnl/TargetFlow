import { fetchWithAuth } from "@/lib/get_api";

export const items = [
  {
    name: "Notebook",
    price: 15000,
    stock: 100,
    description: "A simple 80-page notebook for daily use.",
    label: "Notebook",
    value: "notebook",
    imgs: "https://st.depositphotos.com/1875497/3781/i/450/depositphotos_37810929-stock-photo-books-on-white.jpg",
  },
  {
    name: "Ballpoint Pen",
    price: 10000,
    stock: 50,
    description: "A smooth-writing ballpoint pen.",
    label: "Ballpoint Pen",
    value: "ballpoint-pen",
    imgs: "https://faber-castell.co.id/cfind/source/images/product/fw/product-900x900/148152-2d1.jpg",
  },
  {
    name: "Pencil",
    price: 5000,
    stock: 200,
    description: "A classic wooden pencil.",
    label: "Pencil",
    value: "pencil",
    imgs: "https://www.marinmontagut.com/cdn/shop/products/Stylo_Yellow_ead02a6d-ac3f-47d9-bd15-d4637522b8e0.jpg?v=1706694053&width=1946",
  },
  {
    name: "Eraser",
    price: 3000,
    stock: 75,
    description: "A durable rubber eraser.",
    label: "Eraser",
    value: "eraser",
    imgs: "https://faber-castell.co.id/cfind/source/thumb/images/product/gwm/700x700-gwm/contain_w700_h700_187171.jpg.png",
  },
  {
    name: "Ruler",
    price: 7000,
    stock: 150,
    description: "A 30 cm transparent ruler.",
    label: "Ruler",
    value: "ruler",
    imgs: "https://df3k2q0k3bu2n.cloudfront.net/static/images/RULEPL8IN-2a_sq.jpg",
  },
  {
    name: "Marker",
    price: 25000,
    stock: 30,
    description: "A black permanent marker.",
    label: "Marker",
    value: "marker",
    imgs: "https://st2.depositphotos.com/1003272/5280/i/450/depositphotos_52809811-stock-photo-black-box.jpg",
  },
  {
    name: "Highlighter",
    price: 12000,
    stock: 300,
    description: "A yellow fluorescent highlighter.",
    label: "Highlighter",
    value: "highlighter",
    imgs: "https://st2.depositphotos.com/1003272/5280/i/450/depositphotos_52809811-stock-photo-black-box.jpg",
  },
  {
    name: "Glue Stick",
    price: 20000,
    stock: 20,
    description: "A 15g glue stick.",
    label: "Glue Stick",
    value: "glue-stick",
    imgs: "https://st2.depositphotos.com/1003272/5280/i/450/depositphotos_52809811-stock-photo-black-box.jpg",
  },
  {
    name: "Scissors",
    price: 18000,
    stock: 60,
    description: "A pair of medium-sized scissors.",
    label: "Scissors",
    value: "scissors",
    imgs: "https://st2.depositphotos.com/1003272/5280/i/450/depositphotos_52809811-stock-photo-black-box.jpg",
  },
  {
    name: "Stapler",
    price: 25000,
    stock: 120,
    description: "A small stapler with 500 staples.",
    label: "Stapler",
    value: "stapler",
    imgs: "https://st2.depositphotos.com/1003272/5280/i/450/depositphotos_52809811-stock-photo-black-box.jpg",
  },
  {
    name: "Paper Clips (50 pcs)",
    price: 10000,
    stock: 90,
    description: "A pack of 50 colorful paper clips.",
    label: "Paper Clips (50 pcs)",
    value: "paper-clips",
    imgs: "https://st2.depositphotos.com/1003272/5280/i/450/depositphotos_52809811-stock-photo-black-box.jpg",
  },
  {
    name: "Correction Tape",
    price: 15000,
    stock: 250,
    description: "A compact correction tape.",
    label: "Correction Tape",
    value: "correction-tape",
    imgs: "https://st2.depositphotos.com/1003272/5280/i/450/depositphotos_52809811-stock-photo-black-box.jpg",
  },
  {
    name: "Binder",
    price: 30000,
    stock: 40,
    description: "A durable A4 binder.",
    label: "Binder",
    value: "binder",
    imgs: "https://st2.depositphotos.com/1003272/5280/i/450/depositphotos_52809811-stock-photo-black-box.jpg",
  },
  {
    name: "Sticky Notes",
    price: 20000,
    stock: 80,
    description: "A 100-sheet pad of sticky notes.",
    label: "Sticky Notes",
    value: "sticky-notes",
    imgs: "https://st2.depositphotos.com/1003272/5280/i/450/depositphotos_52809811-stock-photo-black-box.jpg",
  },
  {
    name: "Sketchbook",
    price: 40000,
    stock: 350,
    description: "A 50-page A4 sketchbook.",
    label: "Sketchbook",
    value: "sketchbook",
    imgs: "https://st2.depositphotos.com/1003272/5280/i/450/depositphotos_52809811-stock-photo-black-box.jpg",
  },
  {
    name: "Drawing Pencil Set",
    price: 75000,
    stock: 25,
    description: "A set of 12 drawing pencils.",
    label: "Drawing Pencil Set",
    value: "drawing-pencil-set",
    imgs: "https://st2.depositphotos.com/1003272/5280/i/450/depositphotos_52809811-stock-photo-black-box.jpg",
  },
  {
    name: "Paint Brushes",
    price: 60000,
    stock: 55,
    description: "A set of 5 paint brushes.",
    label: "Paint Brushes",
    value: "paint-brushes",
    imgs: "https://st2.depositphotos.com/1003272/5280/i/450/depositphotos_52809811-stock-photo-black-box.jpg",
  },
  {
    name: "Watercolor Paints",
    price: 85000,
    stock: 130,
    description: "A set of 12 watercolor paints.",
    label: "Watercolor Paints",
    value: "watercolor-paints",
    imgs: "https://st2.depositphotos.com/1003272/5280/i/450/depositphotos_52809811-stock-photo-black-box.jpg",
  },
  {
    name: "Canvas Board",
    price: 90000,
    stock: 45,
    description: "A 30x40 cm canvas board.",
    label: "Canvas Board",
    value: "canvas-board",
    imgs: "https://st2.depositphotos.com/1003272/5280/i/450/depositphotos_52809811-stock-photo-black-box.jpg",
  },
  {
    name: "Oil Pastels",
    price: 70000,
    stock: 220,
    description: "A set of 24 oil pastels.",
    label: "Oil Pastels",
    value: "oil-pastels",
    imgs: "https://st2.depositphotos.com/1003272/5280/i/450/depositphotos_52809811-stock-photo-black-box.jpg",
  },
];

export type Items = {
  name: string;
  price: number;
  stock: number;
  description: string;
  label: string;
  value: string;
  imgs: string;
};

export type FetchItemsType = {
  value: string;
  name: string;
  price: number;
  description: string;
};

export const fetchItems = async (): Promise<FetchItemsType[]> => {
  try {
    const rawData = (
      await fetchWithAuth<{ result: any[][] }>("/api/v1/sales/items-list")
    ).result;

    // Transform the raw data into the desired structure
    const itemsList: FetchItemsType[] = rawData.map(
      ([value, name, price, description]) => ({
        value, // Trim to ensure clean data
        name,
        price,
        description: "SATUAN : " + description,
        imgs: "https://st2.depositphotos.com/1003272/5280/i/450/depositphotos_52809811-stock-photo-black-box.jpg", // Remove extra whitespace
      })
    );

    console.log("Transformed item list:", itemsList);
    return itemsList;
  } catch (error) {
    console.error("Error fetching or transforming customer data:", error);
    throw new Error("Failed to fetch customer list. Please try again later.");
  }
};
