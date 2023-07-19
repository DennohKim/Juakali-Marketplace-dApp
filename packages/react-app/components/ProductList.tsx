// This component is used to display all the products in the marketplace

// Importing the dependencies
import { useState } from 'react';
// Import the Product and Alert components
import Product from '@/components/Product';
import ErrorAlert from '@/components/alerts/ErrorAlert';
import LoadingAlert from '@/components/alerts/LoadingAlert';
import SuccessAlert from '@/components/alerts/SuccessAlert';
import { useMarketPlace } from '@/context/MarketPlaceContext';


// Alerts component
const Alerts = ({ error, success, loading, clear }) => {
  return (
    <div>
      {error && <ErrorAlert message={error} clear={clear} />}
      {success && <SuccessAlert message={success} />}
      {loading && <LoadingAlert message={loading} />}
    </div>
  );
};

// ProductList component
const ProductList = () => {
  const { getProducts, error, success, loading, clear } = useMarketPlace();

  return (
    <div>
      {/* Render the Alerts component */}
      <Alerts error={error} success={success} loading={loading} clear={clear} />

      {/* Display the products */}
      <div className='grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
        {getProducts}
      </div>
    </div>
  );
};


export default ProductList;
