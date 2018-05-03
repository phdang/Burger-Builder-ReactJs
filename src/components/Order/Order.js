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

  const styleIg = {textTransform: 'capitalize', margin: '0 8px', border: '1px solid #ccc', padding: '10px'}

  let ingredients = null;

  if (ingredientsArr.length > 0) {
    ingredients = ingredientsArr.map(ig => <span style={styleIg} key={ig.name}> {ig.name} ({ig.amount})</span>);
  }

  return (
    <div className={classes.Order}>

        <p>Ingredients: {ingredients}</p>

        <p>Price: US${props.price}</p>

        <p><em>Purchased at: {props.purchasedAt}</em></p>
    </div>
  )
}

export default order;
