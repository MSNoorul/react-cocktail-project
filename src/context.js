import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('a')
  const [cocktails, setCocktails] = useState([])

  const fetchdata = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(url + searchTerm);
      const data = await res.json();
      const { drinks } = data;
      if (drinks) {
        const newdrinks = drinks.map((item) => {

          const { idDrink, strDrink, strDrinkThumb,
            strAlcoholic, strGlass, } = item

          return {
            id: idDrink, name: strDrink, image: strDrinkThumb,
            info: strAlcoholic, glass: strGlass
          }

        })
        setCocktails(newdrinks)
        setLoading(false)
      } else { setCocktails([]) }

    }
    catch (error) { setCocktails(error.message) }
    setLoading(false)
  },[searchTerm])


  useEffect(() => { fetchdata() }, [searchTerm,fetchdata])

  return (<AppContext.Provider 
  value={{ loading, searchTerm, cocktails,setSearchTerm}}>
    {children}
  </AppContext.Provider>)

}

// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
