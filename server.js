const { GraphQLServer } = require('graphql-yoga');
const fetchMock = require('fetch-mock');

const typeDefs = `
  type Vehicle {
    id: ID!
    make: String!
    model: String!
    year: Int!
    color: String!
  }
  type Query {
    vehicles: [Vehicle]!
  }
`;

const cars = [
  {
    "id": "f594109e-e406-4964-ba3d-40cb67ba2f3a",
    "make": "Daewoo",
    "model": "Lanos",
    "year": 2002,
    "color": "Lime Green"
  },
  {
    "id": "c38b5339-49a0-403e-bf0f-29f1a0194037",
    "make": "Daewoo",
    "model": "Nubira",
    "year": 2001,
    "color": "Neon Orange"
  }
];

const trucks = [
  {
    "id": "de8640b8-8202-4ac6-9990-4f67972f6a6f",
    "make": "Chevrolet",
    "model": "SSR",
    "year": 2003,
    "color": "Yellow"
  },
  {
    "id": "00b9ac5f-9355-4559-badd-001f75881ed9",
    "make": "Subaru",
    "model": "Baja",
    "year": 2006,
    "color": "Red"
  }
];

fetchMock.get('https://example.com/cars', cars);
fetchMock.get('https://example.com/trucks', trucks);

const resolvers = {
  Query: {
    async vehicles() {
      const cars = await fetch('https://example.com/cars')
        .then(res => res.json())
        .then(json => json);

      const trucks = await fetch('https://example.com/trucks')
        .then(res => res.json())
        .then(json => json);

      return cars.concat(trucks);
    }
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log('Server is running on localhost:4000'));
