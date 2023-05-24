// import { useMarketPlace } from "@/context/MarketPlaceContext";
import { useShoppingCart } from "@/context/ShoppingCartContext";
import { Dialog, Transition } from "@headlessui/react";
import { formatEther } from "ethers";
import { Fragment, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { CartItem } from "./CartItem";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { XCircleIcon } from "@heroicons/react/24/outline";

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

export default function CheckoutModal() {
  const { cartItems, cartQuantity } = useShoppingCart();

//   const { computers } = useMarketPlace();

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="font-sans">
        <AlertDialog>
          <AlertDialogTrigger className="">
            <div className=" inset-0 flex items-center justify-center">
              <button className="relative flex justify-center items-center text-xl text-purple-900 rounded-full  h-12 w-12 border border-purple-900 hover:bg-button hover:text-white">
                <ShoppingCart/>
                <div className="absolute  h-6 w-6 top-8 left-6 rounded-full bg-rose-700 flex justify-center items-center text-white text-sm">
                  {cartQuantity}
                </div>
              </button>
            </div>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader className="flex flex-row items-center justify-between pb-2">
              <AlertDialogTitle>Cart</AlertDialogTitle>
              <AlertDialogCancel className="border-none">
                <XCircleIcon className="h-6 w-6" />
              </AlertDialogCancel>
            </AlertDialogHeader>
            <div className="mt-2">
              {cartItems.map((item) => (
                <CartItem key={item.id} {...item} />
              ))}

              <div className="ml-auto font-bold text-black text-md mt-4 ">
                Total{" "}
                {cartItems.reduce((total: number, cartItem: any) => {
                  const item = products.find((i: any) => i.id === cartItem.id);
                  const itemPrice = item ? item.price : "0";
                  return total + parseFloat(itemPrice) * cartItem.quantity;
                }, 0)}
                <span className="pl-2">cUSD</span>
              </div>
            </div>

            <div className="mt-4">
              <button
                type="button"
                className="btn inline-flex justify-end rounded-md border border-transparent bg-rose-100 px-4 py-2 text-sm font-medium text-rose-900 hover:bg-rose-200"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
}
