import React from 'react'
import Search from './Search';
import FilterCategory from './FilterCategory';

export default function FilterProduct() {

  return (
    <div className='flex space-x-4 items-center'>
      <Search />
      <FilterCategory />
    </div>
  );
}
