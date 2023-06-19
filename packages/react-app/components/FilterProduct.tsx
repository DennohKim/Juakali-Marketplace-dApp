import React from 'react'
import Search from './Search';
import FilterByCategory from './FilterByCategory';

// define pprop type for the filtering
export type ProductFilterProps = {
  handleSearch: (query: string) => void;
  onFilter: (category: string) => void;
};

export default function FilterProduct() {

  return (
    <div className='flex space-x-4 items-center'>
      <Search />
      <FilterByCategory />
    </div>
  );
}
