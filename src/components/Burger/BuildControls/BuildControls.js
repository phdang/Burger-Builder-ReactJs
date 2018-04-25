
import React from 'react';

import classes from './BuildControls.css';

import BuildControl from './BuildControl/BuildControl';

const controls = [

  {label: 'Salad', type: 'salad'},

  {label: 'Bacon', type: 'bacon'},

  {label: 'Cheese', type: 'cheese'},

  {label: 'Meat', type: 'meat'},

];




const buildControls = (props) => {

  const buildControl = controls.map( ctr => {

    return (
      <BuildControl
        key={ctr.label} label={ctr.label}
        added={() => props.ingredientAdded(ctr.type) }
        removed={ () => props.ingredientRemoved(ctr.type)}
        disabled= {props.disabled[ctr.type]}

        />
    );
  }
  );

  return (
    <div className={classes.BuildControls}>

      <p><strong>Current Price: $ {props.totalPrice}</strong></p>

      {buildControl}

      <button className={classes.OrderButton} disabled={!props.purchaseable}>ORDER NOW</button>

    </div>
  );
};

export default buildControls;
