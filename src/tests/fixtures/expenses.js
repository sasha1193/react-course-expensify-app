import moment from 'moment';


export default [{
    id: '1',
    description: 'Gum',
    note: 'some note',
    amount: 195,
    createAt: 0
}, {
    id: '2',
    description: 'Rent',
    note: 'other note',
    amount: 1200,
    createAt: moment(0).subtract(4, 'days').valueOf()
}, {
    id: '3',
    description: 'Credit Card',
    note: 'third note',
    amount: 12000,
    createAt: moment(0).add(4, 'days').valueOf()
}]