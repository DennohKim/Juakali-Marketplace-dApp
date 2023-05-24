import FilterByCategory from "@/components/FilterByCategory";
import ProductCard from "@/components/ProductCard";
import Search from "@/components/Search";

export type ProductType = {
  id: number;
  name: string;
  category: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  price: string;
};

const products: ProductType[] = [
  {
    id: 1,
    name: "SINGLE COMMERCIAL ELECTRIC DEEP FRYER (17L CAPACITY)",
    category: "Kitchen Equipment",
    href: "#",
    imageSrc:
      "https://juakaliproducts.co.ke/wp-content/uploads/2021/02/Single-Electric-Deep-Fryer.jpg",
    imageAlt:
      "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
    price: "40 cUSD",
  },
  {
    id: 2,
    name: "STAINLESS STEEL KITCHEN WORK TABLE FOR SALE",
    category: "Kitchen Equipment",
    href: "#",
    imageSrc:
      "https://juakaliproducts.co.ke/wp-content/uploads/2018/05/WhatsApp-Image-2018-04-29-at-22.21.55.jpeg",
    imageAlt:
      "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
    price: "12 cUSD",
  },
  {
    id: 3,
    name: "GAS COOKER/COOKING RANGE FOR SALE",
    category: "Kitchen Equipment",
    href: "#",
    imageSrc:
      "https://juakaliproducts.co.ke/wp-content/uploads/2018/05/4-burner-cooking-range-sale-kenya.jpg",
    imageAlt:
      "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
    price: "10 cUSD",
  },
  {
    id: 4,
    name: "ELECTRIC DOUGH MIXER FOR SALE IN KENYA",
    category: "Kitchen Equipment",
    href: "#",
    imageSrc:
      "https://juakaliproducts.co.ke/wp-content/uploads/2018/08/dough-mixer-sale-kenya.jpg",
    imageAlt:
      "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
    price: "1 cUSD",
  },
  {
    id: 5,
    name: "CHARCOAL OVEN FOR SALE",
    category: "Kitchen Equipment",
    href: "#",
    imageSrc:
      "https://juakaliproducts.co.ke/wp-content/uploads/2018/05/edit-6.png",
    imageAlt:
      "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
    price: "9 cUSD",
  },
  {
    id: 6,
    name: "SERVING TROLLEYS/FOOD TROLLEYS FOR SALE",
    category: "Kitchen Equipment",
    href: "#",
    imageSrc:
      "https://juakaliproducts.co.ke/wp-content/uploads/2018/05/WhatsApp-Image-2018-04-29-at-22.21.56-1.jpeg",
    imageAlt:
      "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
    price: "2 cUSD",
  },
  {
    id: 7,
    name: "ELECTRIC FOOD WARMER DISPLAY FOR SALE",
    category: "Kitchen Equipment",
    href: "#",
    imageSrc:
      "https://juakaliproducts.co.ke/wp-content/uploads/2018/06/Electric-food-display.png",
    imageAlt:
      "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
    price: "3 cUSD",
  },
  // More products...
];

export default function Home() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-4 px-2 sm:py-6 sm:px-6 lg:max-w-7xl lg:px-2">
        <div className="flex justify-between items-start mb-10">
          <h2 className="text-xl font-bold text-gray-900">Juakali Products</h2>
          <div className="flex space-x-4 items-center">
            <Search />
            <FilterByCategory />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
