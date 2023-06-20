import FilterProduct from '@/components/FilterProduct';
import ProductList from '@/components/ProductList';


export default function Home() {
  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-2xl py-4 px-2 sm:py-6 sm:px-6 lg:max-w-7xl lg:px-2'>
        <div className='flex flex-col sm:flex-row space-y-4  justify-between items-start sm:items-center mb-10'>
          <h2 className='text-xl font-bold text-gray-900'>Juakali Products</h2>
         <FilterProduct/>
        </div>

        <ProductList />
      </div>
    </div>
  );
}
