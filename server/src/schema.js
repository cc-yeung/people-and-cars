let peopleArray = [
    {
      id: '1',
      firstName: 'Bill',
      lastName: 'Gates'
    },
    {
      id: '2',
      firstName: 'Steve',
      lastName: 'Jobs'
    },
    {
      id: '3',
      firstName: 'Linux',
      lastName: 'Torvalds'
    }
]
  
let carsArray = [
    {
      id: '1',
      year: '2019',
      make: 'Toyota',
      model: 'Corolla',
      price: '40000',
      personId: '1'
    },
    {
      id: '2',
      year: '2018',
      make: 'Lexus',
      model: 'LX 600',
      price: '13000',
      personId: '1'
    },
    {
      id: '3',
      year: '2017',
      make: 'Honda',
      model: 'Civic',
      price: '20000',
      personId: '1'
    },
    {
      id: '4',
      year: '2019',
      make: 'Acura ',
      model: 'MDX',
      price: '60000',
      personId: '2'
    },
    {
      id: '5',
      year: '2018',
      make: 'Ford',
      model: 'Focus',
      price: '35000',
      personId: '2'
    },
    {
      id: '6',
      year: '2017',
      make: 'Honda',
      model: 'Pilot',
      price: '45000',
      personId: '2'
    },
    {
      id: '7',
      year: '2019',
      make: 'Volkswagen',
      model: 'Golf',
      price: '40000',
      personId: '3'
    },
    {
      id: '8',
      year: '2018',
      make: 'Kia',
      model: 'Sorento',
      price: '45000',
      personId: '3'
    },
    {
      id: '9',
      year: '2017',
      make: 'Volvo',
      model: 'XC40',
      price: '55000',
      personId: '3'
    }
]

const typeDefs = `
    type Person {
      id: String!
      firstName: String
      lastName: String,
      cars:[Car]
    }

    type Car {
      id: String!
      year: Int!
      make: String!
      model: String!
      price: Float!
      personId: String!
    }

    type Query {
      persons: [Person],
      cars: [Car],
      person(id:String!):Person
    }

    type Mutation {
      addPerson(id: String!, firstName: String!, lastName: String!): Person
      addCar(id: String!, year: Int!, make: String!, model: String!, price: Float!, personId: String!): Car
      updatePerson(id: String!, firstName: String!, lastName: String!): Person
      removePerson(id: String!):Person
      removeCar(id: String!): Car
      updateCar(id: String!, make: String!, model: String!, year: Int!, price: Float!, personId: String!): Car
    }
`

const resolvers = {
  Query: {
    persons: () => peopleArray,
    cars: () => carsArray,
    person: (root, args) => {
      const person = peopleArray.find((person) => person.id === args.id)
      if (!person) {
        throw new Error(`No person found with id: ${args.id}`)
      }
      return person
    },
  },

  Person: {
    cars: (parent) => {
      return carsArray.filter((car) => car.personId === parent.id)
    },
  },

  Mutation: {
    addPerson: (root, args) => {
      const newPerson = {
        id: args.id,
        firstName: args.firstName,
        lastName: args.lastName,
      }

      peopleArray.push(newPerson)

      return newPerson
    },

    updatePerson: (root, args) => {
      const person = peopleArray.find((person) => person.id === args.id)

      if (!person) {
        throw new Error(`Couldn't find person with id ${args.id}`)
      }

      person.firstName = args.firstName
      person.lastName = args.lastName

      return person
    },

    removePerson: (root, args) => {
      const removedPerson = peopleArray.find((person) => person.id === args.id)

      if (!removedPerson) {
        throw new Error(`Couldn't find person with id ${args.id}`)
      }

      peopleArray = peopleArray.filter(
        (person) => person.id !== removedPerson.id
      )

      return removedPerson
    },

    addCar: (root, args) => {
      const newCar = {
        id: args.id,
        year: args.year,
        make: args.make,
        model: args.model,
        price: args.price,
        personId: args.personId,
      }
      carsArray.push(newCar)
      return newCar
    },

    updateCar: (root, args) => {
      const carIndex = carsArray.findIndex((car) => car.id === args.id)

      if (carIndex === -1) {
        throw new Error(`Couldn't find car with id ${args.id}`)
      }

      const updatedCar = {
        ...carsArray[carIndex],
        ...args,
      }

      carsArray[carIndex] = updatedCar

      return updatedCar
    },


    removeCar: (root, args) => {
      const removedCar = carsArray.find((car) => car.id === args.id)

      if (!removedCar) {
        throw new Error(`Couldn't find car with id ${args.id}`)
      }

      carsArray = carsArray.filter((car) => car.id !== removedCar.id)

      return removedCar
    }
  }
}

export { typeDefs, resolvers }
