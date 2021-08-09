import { createStore } from 'redux';

//Action generators - func that return action obj

// func that returns obj ->
const increment = ({ x = 1 } = {}) => ({
    type: 'INCREMENT',
    x
});

const decrement = ({ decrementBy = 1 } = {}) => ({
    type: 'DECREMENT',
    decrementBy
});

const reset = () => ({
    type: 'RESET'
});

const set = ({set}) => ({
    type: 'SET',
    set
});


//Reducers:
//1. pure functions
//2. dont change action or state

const countReducer = (state = { count : 0 }, action) => {
    switch(action.type) {
        case 'INCREMENT':
        return {
            count: state.count + action.x
        };
        case 'DECREMENT':
        return {
            count: state.count - action.decrementBy
        };
        case 'RESET':
            return {
                count: 0
            };
            case 'SET':
                return {
                    count: action.set
                }
        default:
        return state
    }
};
const store = createStore(countReducer);



store.subscribe(() => {
    console.log(store.getState());
});
//Actions - is an obj that gets sent to the store




store.dispatch(increment({ x: 5 }));

store.dispatch(reset());

store.dispatch(decrement({ decrementBy: 10}));

store.dispatch(decrement({ decrementBy: 5 }));

store.dispatch(decrement());







store.dispatch(set({set: 101}));