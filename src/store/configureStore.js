import { createStore, combineReducers } from "redux";
import expenseReducer from "../reducers/expenseReducer";
import filtersReducer from '../reducers/filterReducer';


//Store creation
export default () => {
    const store = createStore(
        combineReducers({
            expenses: expenseReducer,
            filters: filtersReducer
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
  return store;
};



