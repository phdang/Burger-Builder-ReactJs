import React from 'react'
import classes from './Order.css';
const order = (props) => {

  console.log(props);

  const ingredientsArr = [];

  for (let ig in props.ingredients ) {

    ingredientsArr.push({
      name: ig,
      amount: props.ingredients[ig]
    });

  }

  let ingredients = null;

  if (ingredientsArr.length > 0) {
    ingredients = ingredientsArr.map(ig => <span className={classes.Ingredients} key={ig.name}> {ig.name} ({ig.amount})</span>);
  }

  return (
    <div className={classes.Order}>

        <p>Ingredients: {ingredients}</p>

        <p><strong><em>Price: US${props.price}</em></strong></p>

        <p><em>Purchased at: {props.purchasedAt}</em></p>
    </div>
  )
}

export default order;
