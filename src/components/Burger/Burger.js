import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import {withRouter} from 'react-router-dom';
const burger = (props) => {

  //transform to an array to use map func
  let transformedIngredient = Object.keys(props.ingredients).map( igKey => {

    return [...Array(props.ingredients[igKey])].map((_, i) => {

      return <BurgerIngredient
        key={igKey + i}
        type={igKey}
       />;
   });
   //turn a nested array into one array; with reduce()
  } ).reduce((arr,el) => arr.concat(el) , []);


if (transformedIngredient.length === 0) {

  transformedIngredient = <p>Please start adding the ingredients</p>
}
  return (

    <div className={classes.Burger}>

      <BurgerIngredient type="bread-top" />

      {transformedIngredient}

      <BurgerIngredient type="bread-bottom" />

    </div>

  );

}

export default withRouter(burger);
