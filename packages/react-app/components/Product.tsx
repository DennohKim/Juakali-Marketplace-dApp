// Importing the dependencies
import { useCallback, useContext, useEffect, useState } from 'react';

import { ethers } from 'ethers';
import { ShoppingCartContext, iProduct } from '@/context/ShoppingCartContext';
import { useContractCall } from '@/hooks/contracts/useContractRead';

// Define the Product component which takes in the id of the product and some functions to display notifications
const Product = ({ id, setError, setLoading, clear, searchQuery, selectedItemCategory }: any) => {
  const { dispatch } = useContext(ShoppingCartContext);

  // Use the useContractCall hook to read the data of the product with the id passed in, from the marketplace contract
  const { data: rawProduct }: any = useContractCall('readProduct', [id], true);

 
  const [product, setProduct] = useState<iProduct | null>(null);

  // Format the product data that we read from the smart contract
  const getFormatProduct = useCallback(() => {
    if (!rawProduct) return null;
    setProduct({
      owner: rawProduct[0],
      product_title: rawProduct[1],
      image_url: rawProduct[2],
      category: rawProduct[3],
      location: rawProduct[4],
      price: Number(rawProduct[5]),
      sold: rawProduct[6].toString(),
      index: id,
    });
  }, [rawProduct, id]);

  console.log(rawProduct);

  // Call the getFormatProduct function when the rawProduct state changes
  useEffect(() => {
    getFormatProduct();
  }, [getFormatProduct]);

  // If the product cannot be loaded, return null
  if (!product) return null;

  // hanle search, display if name includes search query
 if (
   (searchQuery !== '' &&
     !product.product_title
       .toLowerCase()
       .includes(searchQuery.toLowerCase().trim())) ||
   (selectedItemCategory && product.category !== selectedItemCategory)
 ) {
   return null;
 }


  // Format the price of the product from wei to cUSD otherwise the price will be way too high
  const productPriceFromWei = ethers.utils.formatEther(
    product.price.toString()
  );

  // Return the JSX for the product component
  return (
    <div>
      <div className='relative'>
        <div className='relative h-72 w-full overflow-hidden rounded-lg'>
          <img
            src={product.image_url}
            alt='product image'
            className='h-full w-full object-cover object-center'
          />
        </div>
        <div className='relative mt-4'>
          <h3 className='text-sm font-medium text-gray-900'>
            {product.product_title}
          </h3>
          <p className='mt-1 text-sm text-gray-500'>{product.category}</p>
        </div>
        <div className='absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4'>
          <div
            aria-hidden='true'
            className='absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-60'
          />
          <div className='absolute inset-x-0 px-4 flex items-center justify-between'>
            <p className='text-lg font-semibold text-white'>
              {product.sold} Sold
            </p>
            <p className='text-lg font-semibold text-white'>
              {productPriceFromWei} cUSD
            </p>
          </div>
        </div>
      </div>
      <div className='mt-2'>
        <button
          className='w-full rounded-md py-2 px-4 text-white bg-violet-900'
          onClick={() => {
            dispatch({ type: 'ADD_TO_CART', payload: product });
          }}
        >
          {' '}
          + Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
