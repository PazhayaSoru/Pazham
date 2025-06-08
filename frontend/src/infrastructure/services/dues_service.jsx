import axios from 'axios';

const GRAPHQL_URL = 'http://localhost:3000/graphql';

// Fetch dues for a specific user
export const fetchDues = async (userID) => {
  const query = `
    query($user_id: Int!) {
      getDuesByUser(user_id: $user_id) {
        dues_id
        amount
        due_date
        category
        closed
        user_id
      }
    }
  `;

  try {
    const response = await axios.post(GRAPHQL_URL, {
      query,
      variables: { user_id: parseInt(userID) },
    });
    return response.data.data.getDuesByUser;
  } catch (error) {
    console.error("Error fetching dues:", error.response?.data || error.message);
    throw error;
  }
};

// Create a new due
export const createDue = async (formData, userID) => {
  const mutation = `
    mutation(
      $dues_id: Int!,
      $amount: Float!,
      $due_date: String!,
      $category: String!,
      $closed: Boolean,
      $user_id: Int!
    ) {
      createDue(
        dues_id: $dues_id,
        amount: $amount,
        due_date: $due_date,
        category: $category,
        closed: $closed,
        user_id: $user_id
      ) {
        dues_id
        amount
        due_date
        category
        closed
        user_id
      }
    }
  `;

  try {
    // Convert date input to UTC ISO string (YYYY-MM-DDThh:mm:ss.sssZ)
    const dueDateISO = `${formData.due_date}T00:00:00.000Z`;

    const response = await axios.post(GRAPHQL_URL, {
      query: mutation,
      variables: {
        dues_id: parseInt(formData.dues_id),
        amount: parseFloat(formData.amount),
        due_date: dueDateISO,
        category: formData.category || "",
        closed: formData.closed === "Yes",
        user_id: parseInt(userID),
      },
    });
    return response.data.data.createDue;
  } catch (error) {
    console.error("Error creating due:", error.response?.data || error.message);
    throw error;
  }
};

// Delete a due
export const deleteDue = async (dues_id) => {
  const mutation = `
    mutation($dues_id: Int!) {
      deleteDue(dues_id: $dues_id)
    }
  `;

  try {
    await axios.post(GRAPHQL_URL, {
      query: mutation,
      variables: { dues_id: parseInt(dues_id) },
    });
  } catch (error) {
    console.error("Error deleting due:", error.response?.data || error.message);
    throw error;
  }
};

// Update a due
export const updateDue = async (dues_id, updatedData) => {
  const mutation = `
    mutation(
      $dues_id: Int!,
      $amount: Float,
      $due_date: String,
      $category: String,
      $closed: Boolean
    ) {
      updateDue(
        dues_id: $dues_id,
        amount: $amount,
        due_date: $due_date,
        category: $category,
        closed: $closed
      ) {
        dues_id
        amount
        due_date
        category
        closed
        user_id
      }
    }
  `;

  try {
    // Convert date input to UTC ISO string if provided
    const dueDateISO = updatedData.due_date 
      ? `${updatedData.due_date}T00:00:00.000Z`
      : undefined;

    const response = await axios.post(GRAPHQL_URL, {
      query: mutation,
      variables: {
        dues_id: parseInt(dues_id),
        amount: updatedData.amount ? parseFloat(updatedData.amount) : undefined,
        due_date: dueDateISO,
        category: updatedData.category || "",
        closed: updatedData.closed === "Yes",
      },
    });
    return response.data.data.updateDue;
  } catch (error) {
    console.error("Error updating due:", error.response?.data || error.message);
    throw error;
  }
};