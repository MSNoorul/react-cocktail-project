import React from 'react'
import { useGlobalContext } from '../context'

const SearchForm = () => {
  const {setSearchTerm} =useGlobalContext();
  return (
    <section className='section search'>
    <form className='search-form' onSubmit={()=> {}}>
      <div className='form-control'>
        <label htmlFor='name'>search your favorite cocktail</label>
        <input
          type='text'
          name='name'
          id='name'
          onChange={(e)=>{setSearchTerm(e.target.value);console.log(e.target.value);}}
        />
      </div>
    </form>
  </section>
  )
}

export default SearchForm
