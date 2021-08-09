import React from 'react';
import ExpensesListItem from './ExpensesListItem';
import getVisibleExpenses from '../selectors/expenses';
import { connect } from 'react-redux';

export const ExpensesList = (props) => (
    <div>
    {
        props.expenses.length === 0 ? (
            <p>No expenses</p>
        ) : (
            props.expenses.map((expense) => 
            <ExpensesListItem {...expense} key={expense.id} />    
            )
        )
    }
        
    </div>
);

const mapStateToProps = (state)=> {
    return {
        expenses: getVisibleExpenses(state.expenses, state.filters)
    };
}


export default connect(mapStateToProps)(ExpensesList);


