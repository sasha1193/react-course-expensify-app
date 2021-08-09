//Object destructuring

const person = {
    name: 'Sasa',
    age: 28,
    location: {
        city: 'Valjevo',
        temp: 30
    }
};

const { name: firstName, age = '10' } = person;
//console.log(`${firstName} is ${age} old`);

const { city, temp: temperature = 45 } = person.location;
//console.log(`The temperature is ${temperature} in ${city}`)



const book = {
    title: 'Ego is the Enemy',
    author: 'Ryan Holiday',
    publisher: {
        name: 'Penguin'
    }
};

const { name: publisherName = 'Self-Published' } = book.publisher;

//console.log(publisherName);

//Array destructuring

const address = ['1299 S Juniper Street', 'Philadelphia', 'Pennsylvania', '19417'];


const [, town, state = 'New York'] = address;

console.log(`You are in ${town} ${state}`);

const item = ['Coffie (hot)', '$2.00', '$2.40', '$3.10'];

const [coffie, , medium] = item;

console.log(`A medium ${coffie} cost ${medium}`);