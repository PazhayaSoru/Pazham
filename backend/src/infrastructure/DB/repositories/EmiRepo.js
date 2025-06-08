const Emi = require('../models/EmiModel');

// Create a new Emi
  const createEmi = async (emiData) => {
    console.log("entered repo emi")
    const latestEmi = await Emi.findOne().sort({ id: -1 });
    const nextEmisId = latestEmi ? latestEmi.id + 1 : 1;

    return await Emi.create({...emiData, id: nextEmisId});
  };

// Update a Emi by ID
const updateEmi = async (Id, updateData) => {
  return await Emi.findOneAndUpdate({ id: Id }, updateData, { new: true });
};

// Delete a Emi by ID
const deleteEmi = async (Id) => {
  return await Emi.findOneAndDelete({ id:Id });
};

// Get all Emis by user ID
const findByUserId = async (userId) => {
  const chumma = Emi.find();
  console.log(chumma);
  return await Emi.find({ user_id: userId });
};



module.exports = {
  createEmi,
  updateEmi,
  deleteEmi,
  findByUserId,
};
