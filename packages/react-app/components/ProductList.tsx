// This component is used to display all the products in the marketplace

// Importing the dependencies
import { useState } from 'react';
// Import the Product and Alert components
import Product from '@/components/Product';
import ErrorAlert from '@/components/alerts/ErrorAlert';
import LoadingAlert from '@/components/alerts/LoadingAlert';
import SuccessAlert from '@/components/alerts/SuccessAlert';
import { useMarketPlace } from '@/context/MarketPlaceContext';

// Define the ProductList component
const ProductList = () => {
  const { getProducts, error, success, loading, clear } = useMarketPlace();

  // Return the JSX for the component
  return (
    <div>
      {/* If there is an alert, display it */}
      {error && <ErrorAlert message={error} clear={clear} />}
      {success && <SuccessAlert message={success} />}
      {loading && <LoadingAlert message={loading} />}
      {/* Display the products */}
      <div className='grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
        {/* Loop through the products and return the Product component */}
        {getProducts()}
      </div>
    </div>
  );
};

export default ProductList;
