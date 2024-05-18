import express from "express";
import dotenv from "dotenv";
import { buildSchema } from "graphql";
import { graphqlHTTP } from "express-graphql";
import { mockStockPrices } from "./mockData.js";

const app = express();
dotenv.config({ path: ".env.local" });

const PORT = process.env.PORT || 5000;

app.get("/", (res, req) => {
  res.send("Order History Service is UP");
});

// Define schema using GraphQL SDL
const schema = buildSchema(`
 type StockPrice {
   symbol: String!
   price: Float!
   timestamp: String!
 }

 type HistoricalData {
   date: String!
   open: Float!
   high: Float!
   low: Float!
   close: Float!
   volume: Int!
 }

 type CompanyInfo {
   name: String!
   sector: String!
   CEO: String!
   headquarters: String!
   description: String!
 }

 type Holding {
   symbol: String!
   quantity: Int!
   averagePrice: Float!
 }

 type UserPortfolio {
   holdings: [Holding!]!
   cashBalance: Float!
   totalValue: Float!
 }

 type Query {
   stockPrice(symbol: String!): StockPrice
   historicalData(symbol: String!, startDate: String!, endDate: String!): [HistoricalData!]!
   companyInfo(symbol: String!): CompanyInfo
   userPortfolio(userId: String!): UserPortfolio
 }
`);

// Resolver functions
const root = {
 stockPrice: ({ symbol }) => mockStockPrices[symbol],
 historicalData: ({ symbol, startDate, endDate }) => mockHistoricalData[symbol].filter(entry => entry.date >= startDate && entry.date <= endDate),
 companyInfo: ({ symbol }) => mockCompanyInfo[symbol],
 userPortfolio: ({ userId }) => mockUserPortfolios[userId],
};


// Define the GraphQL endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, // Enable GraphiQL for easy testing
  })
);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
