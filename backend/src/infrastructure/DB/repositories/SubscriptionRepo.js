const Subscription = require('../models/SubscriptionModel');

// Create a new Sub
  const createSub = async (subData) => {

    const latestSub = await Subscription.findOne().sort({ id: -1 });
    const nextSubId = latestSub ? latestSub.id + 1 : 1;

    return await Subscription.create({...subData, id: nextSubId});
  };

// Update a Sub by ID
const updateSub = async (SubsId, updateData) => {
  return await Subscription.findOneAndUpdate({ id: SubsId }, updateData, { new: true });
};

// Delete a Sub by ID
const deleteSub = async (SubsId) => {
  return await Subscription.findOneAndDelete({ id: SubsId });
};

// Get all Subs by user ID
const findByUserId = async (userId) => {
  const chumma = Subscription.find();
  console.log(chumma);
  return await Subscription.find({ user_id: userId });
};



module.exports = {
  createSub,
  updateSub,
  deleteSub,
  findByUserId,
};
