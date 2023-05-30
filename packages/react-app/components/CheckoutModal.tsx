// import { useMarketPlace } from "@/context/MarketPlaceContext";
import { useContext, useState } from "react";
import { ShoppingCart } from "lucide-react";
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
import { ShoppingCartContext } from "@/context/ShoppingCartContext";
import { ethers } from "ethers";
import Image from "next/image";
import { convertToEther } from "@/lib/convertToEther";

export default function CheckoutModal() {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const { state, dispatch } = useContext(ShoppingCartContext);
  console.log("state:", state);

  const { cart } = state;
  let itemCount = 0;
  let totalPrice = 0;

  for (const [key, value] of Object.entries(cart)) {
    itemCount = itemCount + cart[key].quantity;
  }

  for (const [key, value] of Object.entries(cart)) {
    totalPrice = totalPrice + cart[key].price * cart[key].quantity;
  }

  console.log(typeof totalPrice);

  const totalPriceFromWei = ethers.utils.formatEther(totalPrice.toString());


  return (
    <>
      <div className="font-sans">
        <AlertDialog>
          <AlertDialogTrigger className="">
            <div className=" inset-0 flex items-center justify-center">
              <div className="relative flex justify-center items-center text-xl text-purple-900 rounded-full  h-12 w-12 border border-purple-900 hover:bg-button hover:text-white">
                <ShoppingCart />
                <div className="absolute  h-6 w-6 top-8 left-6 rounded-full bg-rose-700 flex justify-center items-center text-white text-sm">
                  {itemCount}
                </div>
              </div>
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
              {Object.entries(cart).map(([key, value]) => {
                return (
                  <div
                    key={cart[key].product_title}
                    className="flex flex-col items-start gap-2"
                  >
                    <div className="flex text-black">
                      <img
                        alt="cart item"
                        src={cart[key].image_url}
                        className="h-16 w-16 object-cover object-center"
                      />
                      <div className="pl-4">
                        <div className="flex flex-col">
                          <div className="font-bold">
                            {cart[key].product_title}
                          </div>
                          <div className="py-1 text-sm">
                            Quantity: {cart[key].quantity}
                          </div>
                        </div>

                        <div className="flex items-center">
                          <p className="pr-2">Price: </p>
                          <div className="text-md font-semibold">
                            {/* {cart[key].price} */}
                            {convertToEther((cart[key].price))}
                            <span className="pl-1">cUSD</span>
                          </div>
                        </div>
                      </div>{" "}
                      <div>
                        <button
                          className="ml-1 border border-gray-900 rounded-full h-4 w-4 flex justify-center items-center font-medium cursor-pointer text-gray-900"
                          onClick={() => {
                            dispatch({
                              type: "REMOVE_FROM_CART",
                              payload: cart[key],
                            });
                          }}
                        >
                          &times;
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="font-bold py-4">
                Total Price: {totalPriceFromWei}
              </div>
              {itemCount > 0 ? (
                <button
                  className="inline-flex content-center place-items-center rounded-full border text-white bg-button py-2 px-5 text-md font-medium hover:bg-[#8e24cc]"
                  // onClick={handlePurchase}
                  // data-index={item.index}
                >
                  Buy {itemCount} Product{itemCount > 1 && "s"}
                </button>
              ) : (
                <p>
                  Your cart is empty. <br /> Add some products to your cart.
                </p>
              )}
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
}
