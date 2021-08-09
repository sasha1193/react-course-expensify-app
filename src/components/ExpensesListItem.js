import React from 'react';
import moment from 'moment';
import { NavLink } from 'react-router-dom';


const ExpensesListItem = ({ id, description, amount, createAt }) => (
    <div>
        <NavLink to={`/edit/${id}`}><h3>{description}</h3></NavLink>
        <p>{amount} - {moment(createAt).format('MMM Do YYYY')}</p>
    </div>
);



export default ExpensesListItem;