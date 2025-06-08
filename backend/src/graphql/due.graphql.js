const { gql } = require('apollo-server-express');
const Due = require('../infrastructure/DB/models/DueModel');

const typeDefs = gql`
  type Due {
    dues_id: Int!
    amount: Float!
    due_date: String! # ISO date string returned to frontend
    category: String!
    closed: Boolean!
    user_id: Int!
  }

  type Query {
    getDuesByUser(user_id: Int!): [Due]
  }

  type Mutation {
    createDue(
      dues_id: Int!
      amount: Float!
      due_date: String! # ISO date string input
      category: String!
      closed: Boolean
      user_id: Int!
    ): Due

    deleteDue(dues_id: Int!): Boolean

    updateDue(
      dues_id: Int!
      amount: Float
      due_date: String
      category: String
      closed: Boolean
    ): Due
  }
`;


const resolvers = {
  Query: {
    getDuesByUser: async (_, { user_id }) => {
      try {
        const dues = await Due.find({ user_id });
        return dues.map(due => ({
          ...due.toObject(),
          // Convert stored seconds to ISO string
          due_date: new Date(due.due_date * 1000).toISOString(),
        }));
      } catch (error) {
        console.error('Error fetching dues:', error);
        throw new Error('Error fetching dues');
      }
    },
  },

  Mutation: {
    createDue: async (_, args) => {
      try {
        const { due_date, ...rest } = args;
        // Convert input ISO string to seconds
        const dueDateInSeconds = Math.floor(new Date(due_date).getTime() / 1000);

        const due = new Due({
          ...rest,
          due_date: dueDateInSeconds,
        });

        await due.save();

        return {
          ...due.toObject(),
          due_date: new Date(dueDateInSeconds * 1000).toISOString(),
        };
      } catch (error) {
        console.error('Error creating due:', error);
        throw new Error('Error creating due');
      }
    },

    updateDue: async (_, { dues_id, due_date, ...updates }) => {
      try {
        const finalUpdates = { ...updates };
        if (due_date) {
          // Convert input ISO string to seconds
          finalUpdates.due_date = Math.floor(new Date(due_date).getTime() / 1000);
        }

        const updatedDue = await Due.findOneAndUpdate(
          { dues_id },
          finalUpdates,
          { new: true }
        );

        return {
          ...updatedDue.toObject(),
          due_date: new Date(updatedDue.due_date * 1000).toISOString(),
        };
      } catch (error) {
        console.error('Error updating due:', error);
        throw new Error('Error updating due');
      }
    },
    // deleteDue remains the same
    deleteDue: async (_, { dues_id }) => {
      try {
        const deleted = await Due.deleteOne({ dues_id });
        return deleted.deletedCount > 0;
      } catch (error) {
        console.error('Error deleting due:', error);
        throw new Error('Error deleting due');
      }
    }
  },
};


module.exports = { typeDefs, resolvers };
