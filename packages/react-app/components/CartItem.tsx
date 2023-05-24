import Image from "next/image";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatEther } from "ethers";
// import { useMarketPlace } from "@/context/MarketPlaceContext";

type CartItemProps = {
  id: number;
  quantity: number;
};

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
    price: "40",
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
    price: "12",
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
    price: "10",
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
    price: "1",
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
    price: "9",
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
    price: "2",
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
    price: "3",
  },
  // More products...
];

export function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCart, cartQuantity } = useShoppingCart();
//   const { computers, handlePurchase } = useMarketPlace();

  console.log(cartQuantity);

  const item = products.find((i) => {
    //console.log("computers", i.index);
    return i.id === id;
  });

  //check if item is undefined or falsy
  if (!item) return null;

  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex space-y-4 text-black">
        <div className="w-full flex justify-between">
          <div>
            <img alt="cart item" src={item.imageSrc} className="w-16 h-16" />
          </div>
          <div className="m-3">
            <div>
              {item.name}
              {quantity > 1 && <span className="text-sm">x{quantity}</span>}
            </div>
            <div className="flex items-center">
              <p className="pr-2">Price: </p>
              <div className="text-md">
                {" "}
                {Number(item.price.toString()) * quantity} cUSD
              </div>
            </div>
          </div>
        </div>

        <div>
          <button
            className="border border-gray-900 rounded-full h-4 w-4 flex justify-center items-center font-medium cursor-pointer text-gray-900"
            onClick={() => removeFromCart(item.id)}
          >
            &times;
          </button>
        </div>
      </div>

      {cartQuantity > 0 ? (
        <button
          className="inline-flex content-center place-items-center rounded-md border border-button bg-button text-white py-2 px-5 text-md font-medium hover:bg-[#8e24cc] buyBtn"
          //   onClick={handlePurchase}
          data-index={item.id}
        >
          Buy {cartQuantity} Product{cartQuantity > 1 && "s"}
        </button>
      ) : (
        <p>
          Your cart is empty. <br /> Add some computers to your cart.
        </p>
      )}
    </div>
  );
}
