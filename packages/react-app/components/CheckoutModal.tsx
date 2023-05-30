// import { useMarketPlace } from "@/context/MarketPlaceContext";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useState } from "react";
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



export default function CheckoutModal() {



  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const { state } = useContext(ShoppingCartContext);
  console.log("state:", state)

  const {cart } = state
  let itemCount = 0


  for(const[key, value] of Object.entries(cart)){
    itemCount = itemCount + cart[key].quantity
  }

  return (
    <>
      <div className="font-sans">
        <AlertDialog>
          <AlertDialogTrigger className="">
            <div className=" inset-0 flex items-center justify-center">
              <button className="relative flex justify-center items-center text-xl text-purple-900 rounded-full  h-12 w-12 border border-purple-900 hover:bg-button hover:text-white">
                <ShoppingCart />
                <div className="absolute  h-6 w-6 top-8 left-6 rounded-full bg-rose-700 flex justify-center items-center text-white text-sm">
                {itemCount}
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
              {/* {cartItems.map((item) => (
                <CartItem key={item.id} {...item} />
              ))} */}

              <div className="ml-auto font-bold text-black text-md mt-4 ">
                Total{" "}
                
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
