const Due = require('../models/DueModel');

// Create a new due
  const createDue = async (dueData) => {

    const latestDue = await Due.findOne().sort({ dues_id: -1 });
    const nextDuesId = latestDue ? latestDue.dues_id + 1 : 1;

    return await Due.create({...dueData, dues_id: nextDuesId});
  };

// Update a due by ID
const updateDue = async (duesId, updateData) => {
  return await Due.findOneAndUpdate({ dues_id: duesId }, updateData, { new: true });
};

// Delete a due by ID
const deleteDue = async (duesId) => {
  return await Due.findOneAndDelete({ dues_id: duesId });
};

// Get all dues by user ID
const findByUserId = async (userId) => {
  const chumma = Due.find();
  console.log(chumma);
  return await Due.find({ user_id: userId });
};



module.exports = {
  createDue,
  updateDue,
  deleteDue,
  findByUserId,
};
