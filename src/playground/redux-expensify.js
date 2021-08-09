import { createStore, combineReducers } from 'redux';
import { v4 as uuidv4 } from 'uuid';


//ADD_EXPENSE

const addExpense = ({ description = '', note = '', amount = 0, createAt = 0 } = {}) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuidv4(),
        description,
        note,
        amount,
        createAt
    }
});
//REMOVE_EXPENSE

const removeExpense = ({ id } = {}) => ({
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

const setTextFilter = ({text = ''}) => ({
    type: 'SET_TEXT_FILTER',
    text
    
});
//SORT_BY_DATE

const sortByDate = () => ({
    type: 'SORT_BY_DATE',
    sortBy: 'date'
    
});
//SORT_BY_AMOUNT
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT',
    sortBy: 'amount'
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
})
//Expense reducer
const expenseReducerDefaultState = [];

const expenseReducer = (state = expenseReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
          return  [
              ...state,
              action.expense
          ];
        case 'REMOVE_EXPENSE':
              return state.filter((expense) => expense.id !== action.id)
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if(expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    } 
                }  else {
                    return expense;
                }
            });
           
        default:
            return state;
    }
};

const filtersDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};

const filtersReducer = (state = filtersDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
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
            return {
                    ...state,
                    sortBy: action.sortBy
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
        const startDateMatch = typeof startDate !== 'number' || expense.createAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if(sortBy === 'date') {
            return a.createAt < b.createAt ? 1 : -1;
    } else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
    }
    })
};

//Store creation

const store = createStore(
    combineReducers({
        expenses: expenseReducer,
        filters: filtersReducer
    })
);



store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});

const exspenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 1111 }));
const exspenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 900 }));

//store.dispatch(removeExpense({ id: exspenseOne.expense.id }));
//store.dispatch(editExpense(exspenseTwo.expense.id, { amount: 500 }));

//store.dispatch(setTextFilter({ text: 'ff'}));
//store.dispatch(setTextFilter(''));

store.dispatch(sortByAmount()); 
//store.dispatch(sortByDate()); //date

//store.dispatch(setStartDate(0));
//store.dispatch(setStartDate());
//store.dispatch(setEndDate(999));
/*
const demoState = {
  expenses: [{
      id: 'aaa',
      description: 'Januray Rent',
      note: 'This was the final payment for that address',
      amount: 54500,
      createAt: 0
  }],
     filters: {
         text: 'rent',
         sortBy: 'date', ///date or amount
         startDate: undefined,
         endDate: undefined
     }
};

*/
//const user = {
//    name: 'sasa',
//    age: 22,
//};

//console.log({...user, name: 'jen'});