const express = require('express');
const sequelize = require('./pgDatabase');
const cors = require('cors');
const bodyParser = require('body-parser');
//importing routes
const userRoutes = require('./routes/user_routes');
const transactionRoutes = require('./routes/transaction_routes');
const budgetRoutes = require('./routes/budget_routes');
const dueRoutes = require('./routes/due_routes');
const subRoutes = require('./routes/subscription_routes');
const emiRoutes = require('./routes/emi_routes');
const connectDB = require('./config/mgDatabase');


const app = express();
connectDB();

const server = new ApolloServer({ typeDefs, resolvers });

app.use(cors());
app.use(bodyParser.json());


app.use("/",userRoutes);
app.use("/",transactionRoutes);
app.use("/",budgetRoutes);
app.use("/",subRoutes);
app.use("/",emiRoutes);
app.use("/",dueRoutes)


sequelize.sync().then(() => {
  console.log("Database connected successfully");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

