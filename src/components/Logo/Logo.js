import React from 'react';

import BurgerImg from '../../assets/images/burger-logo.png';

import classes from './Logo.css';

const logo = (props) => <div className={classes.Logo}><img src={BurgerImg} alt="My Burger" /></div>;

export default logo;
