import React from 'react';
import classes from './Input.css';
const input = (props) => {

  let inputElement = null;

  let inputClasses = [classes.InputElement];

  if (props.invalid && props.shouldVadidate) {
    inputClasses.push(classes.Invalid);
  }
  inputClasses = inputClasses.join(' ');

  switch (props.elementType) {

    case ('input'):

      inputElement = <input className={inputClasses} {...props.elementConfig} onChange={props.changed} value={props.value} />;
      break;
    case ('textarea'):
      inputElement = <textarea className={inputClasses} {...props.elementConfig} onChange={props.changed} value={props.value} />
      break;
    case ('select'):
      inputElement =

      <select className={inputClasses} onChange={props.changed} value={props.value} >

        {props.elementConfig.options.map(option => {

          return (
            <option key={option.value} value={option.value}>{option.displayValue}</option>
          );
        })}

      </select>;
      break;
    default:
      inputElement = <input className={inputClasses} onChange={props.changed} {...props.elementConfig} value={props.value} />

  }

  return (

    <div className={classes.Input}>
        <label className={classes.Label}>{props.label}</label>
        {inputElement}
    </div>
  );
}

export default input;
