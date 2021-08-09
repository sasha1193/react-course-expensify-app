import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import { removeExpense } from './actions/expenses';
import getVisibleExpenses from './selectors/expenses';
import 'react-dates/lib/css/_datepicker.css';
import './styles/styles.scss';
import 'normalize.css/normalize.css';


const store = configureStore();


store.dispatch(addExpense({ description: 'Water bill', amount: 4500, createAt: 999 }));
store.dispatch(addExpense({ description: 'Gas bill', createAt: 1000 }));
store.dispatch(addExpense({ description: 'Rent', amount: 10000 }));




const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);

   
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);
ReactDOM.render(
    jsx,
    document.getElementById('app')
    );