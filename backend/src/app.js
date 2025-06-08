// backend/src/app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { ApolloServer } = require('apollo-server-express');
const connectDB = require('./infrastructure/DB/mgDatabase'); // Import MongoDB connection
const { typeDefs, resolvers } = require('./graphql/due.graphql.js'); // GraphQL schema and resolvers

// Importing routes
const userRoutes = require('./interfaces/routes/UserRoutes');
const transactionRoutes = require('./interfaces/routes/transactionRoutes');
const budgetRoutes = require('./interfaces/routes/budgetRoutes');
const dueRoutes = require('./interfaces/routes/dueRoutes');
const subRoutes = require('./interfaces/routes/subscriptionRoutes');
const emiRoutes = require('./interfaces/routes/emiRoutes');

// Initialize express app
const app = express();

// Connect to MongoDB (for dues)
connectDB(); // Establish MongoDB connection

app.use(cors());
app.use(bodyParser.json());

// Use routes for different resources
app.use("/", userRoutes);
app.use("/", transactionRoutes);
app.use("/", budgetRoutes);
app.use("/", subRoutes);
app.use("/", emiRoutes);

// Apollo Server for GraphQL
async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app }); // Default path is `/graphql`

  // Start listening
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🚀 GraphQL ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();

// MongoDB connection status
connectDB().then(() => {
  console.log("📦 MongoDB connected");
}).catch((error) => {
  console.error("📦 Error connecting to MongoDB:", error);
});
