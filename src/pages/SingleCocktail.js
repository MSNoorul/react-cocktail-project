import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const SingleCocktail = () => {
  const {id} = useParams();
  const [loading,setloading]=useState(true);
  const [data,setdata]=useState([]);

  useEffect(()=>{
    fetch(url+id)
    .then((res)=>res.json())
    .then((data)=>{
      const {
        strDrink: name,
        strDrinkThumb: image,
        strAlcoholic: info,
        strCategory: category,
        strGlass: glass,
        strInstructions: instructions,
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
      } = data.drinks[0]
      const ingredients = [
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
      ]
      const newCocktail = {
        name,
        image,
        info,
        category,
        glass,
        instructions,
        ingredients,
      }
      setdata(newCocktail)
      setloading(false)
      
    })
 },[id])

  if(loading){
    return <Loading/>
  }
  else{
    const {name,image,info,category,
      glass,instructions,ingredients} = data;
    return (
      <section className='section cocktail-section'>
          <Link to='/' className='btn btn-primary'>
            back home
          </Link>
          <h2 className='section-title'>{name}</h2>
          <div className='drink'>
            <img src={image} alt={name}></img>
            <div className='drink-info'>
              <p>
                <span className='drink-data'>name :</span> {name}
              </p>
              <p>
                <span className='drink-data'>category :</span> {category}
              </p>
              <p>
                <span className='drink-data'>info :</span> {info}
              </p>
              <p>
                <span className='drink-data'>glass :</span> {glass}
              </p>
              <p>
                <span className='drink-data'>instructons :</span> {instructions}
              </p>
              <p>
                <span className='drink-data'>ingredients :</span>
                {ingredients.map((item, index) => {
                  return item ? <span key={index}> {item}</span> :null
                })}
              </p>
            </div>
          </div>
        </section>
      
    )

  }
  
}

export default SingleCocktail
