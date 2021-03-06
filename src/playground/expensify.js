import { createStore, combineReducers } from "redux";
import { v4 as uuidv4 } from 'uuid';

//ADD_EXPENSE
const addExpense = ({ description = '', note = '', amount = 0, createdAt = 0 } = {}) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuidv4(),
        description,
        note,
        amount,
        createdAt
    }
})

//REMOVE_EXPENSE

const removeExpense = ({ id }) => ({
    type: 'REMOVE_EXPENSE',
    id
});


//EDIT_EXPENSE

const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});


//SET_TEXT_FILTER

const setText = (text) => ({
    type: 'SET_TEXT',
    text
})


//SORT_BY_DATE

const sortByDate = ({sortBy}) => ({
    type: 'SORT_BY_DATE',
    sortBy
});
//SORT_BY_AMOUNT
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});

//SET_START_DATE

const setStartDate = (start) => ({
    type: 'SET_START_DATE',
    start
});
//SET_END_DATE

const setEndDate = (end) => ({
    type: 'SET_END_DATE',
    end
});

//Expenses Reducer
const exspensesReducerDefaultState = [];

const exspensesReducer = (state = exspensesReducerDefaultState, action) => {
    switch(action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ];
        case 'REMOVE_EXPENSE':
            return state.filter((expense) => expense.id !== action.id);
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if(expense.id === action.id) {
                  return {
                      ...expense,
                      ...action.updates
                  }
                } 
            })
        default: 
        return state;
    }
};


const filtersReducerDefaultState = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch(action.type) {
        case 'SET_TEXT':
            return {
                ...state,
                text: action.text
            }
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: action.sortBy
            }
        case 'SORT_BY_AMOUNT':
            return{
                ...state,
                sortBy: 'amount'
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.start
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.end
            }
        default:
            return state;
    }
};


//Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if(sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        } else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
    });
}


//Store creation
const store = createStore(combineReducers({
    expenses: exspensesReducer,
    filters: filtersReducer
}));


store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
    console.log(visibleExpenses);
})
 
const expenseOne = store.dispatch(addExpense({ description: 'rent', amount: 3000, createdAt: 1000000 }))
const expenseTwo = store.dispatch(addExpense({ description: 'coffee', amount: 10000, createdAt: 10000 }))


//store.dispatch(removeExpense({ id: expenseOne.expense.id }));
//store.dispatch(editExpense(expenseTwo.expense.id, {description: 'Latte', amount: 4000}))


//store.dispatch(setText({ text: 'fee' }));
//store.dispatch(sortByDate({ sortBy: 'date' }));
//store.dispatch(sortByAmount());


//store.dispatch(setStartDate(0));
//store.dispatch(setStartDate());
//store.dispatch(setEndDate(999));