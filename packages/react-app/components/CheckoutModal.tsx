// import { useMarketPlace } from "@/context/MarketPlaceContext";
import { useContext, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
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
} from '@/components/ui/alert-dialog';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { ShoppingCartContext } from '@/context/ShoppingCartContext';
import { ethers } from 'ethers';
import Image from 'next/image';
import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useMarketPlace } from '@/context/MarketPlaceContext';
import { toast } from 'react-toastify';
import { useContractApprove } from '@/hooks/contracts/useApprove';
import { useContractSend } from '@/hooks/contracts/useContractWrite';
import { convertToEther } from '@/lib/convertToEther';
import { useRouter } from 'next/navigation';

export default function CheckoutModal() {
  const {  clear, setError, setLoading } = useMarketPlace();

  const { state, dispatch } = useContext(ShoppingCartContext);

  const router = useRouter();

  const { cart } = state;
  let itemCount = 0;
  let totalPrice = 0;
  let index = 0

  for (const [key, value] of Object.entries(cart)) {
    itemCount = itemCount + cart[key].quantity;
  }

   for (const [key, value] of Object.entries(cart)) {
     index = cart[key].index;
   }


  for (const [key, value] of Object.entries(cart)) {
    totalPrice = totalPrice + cart[key].price * cart[key].quantity;
  }

  const totalPriceFromWei = ethers.utils.formatEther(totalPrice.toString());

  //Buyproduct logic
  //Use the useAccount hook to store the user's address
  const { address } = useAccount();

  //Use the useContractSend hook to purchase the product with the id passed in, via the marketplace contract
  const { writeAsync: purchase } = useContractSend("buyProduct", [index, itemCount]);

  //Use the useContractApprove hook to approve the spending of the total product's price, for the ERC20 cUSD contract
  const { writeAsync: approve } = useContractApprove(
    totalPrice.toString()
  );
  //Use the useConnectModal hook to trigger the wallet connect modal
  const { openConnectModal } = useConnectModal();
  //Format the product data that we read from the smart contract

  //Define the handlePurchase function which handles the purchase interaction with the smart contract
  const handlePurchase = async () => {
    if (!approve || !purchase) {
      throw "Failed to purchase this product";
    }
    // Approve the spending of the product's price, for the ERC20 cUSD contract
    const approveTx = await approve();
    // Wait for the transaction to be mined, (1) is the number of confirmations we want to wait for
    await approveTx.wait(1);
    setLoading("Purchasing...");
    // Once the transaction is mined, purchase the product via our marketplace contract buyProduct function
    const res = await purchase();
    // Wait for the transaction to be mined
    await res.wait();
  };

  //Define the purchaseProduct function that is called when the user clicks the purchase button
  const purchaseProduct = async () => {
    setLoading("Approving ...");
    clear();

    try {
      // If the user is not connected, trigger the wallet connect modal
      if (!address && openConnectModal) {
        openConnectModal();
        return;
      }
      // If the user is connected, call the handlePurchase function and display a notification
      await toast.promise(handlePurchase(), {
        pending: "Purchasing product...",
        success: "Product purchased successfully",
        error: "Failed to purchase product",
      });
      // If there is an error, display the error message
    } catch (e: any) {
      console.log({ e });
      setError(e?.reason || e?.message || "Something went wrong. Try again.");
      // Once the purchase is complete, clear the loading state
    } 
  };

  return (
    <>
      <div className='font-sans'>
        <AlertDialog>
          <AlertDialogTrigger className=''>
            <div className=' inset-0 flex items-center justify-center'>
              <div className='relative flex justify-center items-center text-xl text-purple-900 rounded-full  h-12 w-12 border border-purple-900 hover:text-white hover:bg-purple-900'>
                <ShoppingCart />
                <div className='absolute  h-6 w-6 top-8 left-6 rounded-full bg-rose-700 flex justify-center items-center text-white text-sm'>
                  {itemCount}
                </div>
              </div>
            </div>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader className='flex flex-row items-center justify-between pb-2'>
              <AlertDialogTitle>Cart</AlertDialogTitle>
              <AlertDialogCancel className='border-none'>
                <XCircleIcon className='h-6 w-6' />
              </AlertDialogCancel>
            </AlertDialogHeader>
            <div className='mt-2'>
              {Object.entries(cart).map(([key, value]) => {
                return (
                  <div
                    key={cart[key].product_title}
                    className='flex flex-col items-start gap-2'
                  >
                    <div className='flex text-black'>
                      <img
                        alt='cart item'
                        src={cart[key].image_url}
                        className='h-16 w-16 object-cover object-center'
                      />
                      <div className='pl-4'>
                        <div className='flex flex-col'>
                          <div className='font-bold'>
                            {cart[key].product_title}
                          </div>
                          <div className='flex items-center'>
                            <p className='pr-2 text-sm'>Quantity:</p>
                            <span className='text-md font-semibold'>
                              {cart[key].quantity}
                            </span>
                          </div>
                        </div>

                        <div className='flex items-center'>
                          <p className='pr-2 text-sm'>Price: </p>
                          <div className='text-md font-semibold'>
                            {/* {cart[key].price} */}
                            {convertToEther(cart[key].price)}
                            <span className='pl-1'>cUSD</span>
                          </div>
                        </div>
                      </div>{' '}
                      <div>
                        <button
                          className='ml-1 border border-gray-900 rounded-full h-4 w-4 flex justify-center items-center font-medium cursor-pointer text-gray-900'
                          onClick={() => {
                            dispatch({
                              type: 'REMOVE_FROM_CART',
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

              <div className='font-bold py-4'>
                Total Price: {totalPriceFromWei}
              </div>
              {itemCount > 0 ? (
                <button
                  className='inline-flex content-center place-items-center rounded-full border text-white bg-button py-2 px-5 text-md font-medium hover:bg-[#8e24cc]'
                  onClick={purchaseProduct}
                >
                  Buy {itemCount} Product{itemCount > 1 && 's'}
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
