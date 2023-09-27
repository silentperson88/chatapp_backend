/* models */
const groupModel = require('../models/group.model');
const memberShipModel = require('../models/membershib.model');

// Create Group
exports.createGroup = async group => await groupModel.create(group);

// get All active Groups
exports.getAllActiveGroups = async () => {
  return groupModel.find({
    isDeleted: false,
  });
};

// get Groups
exports.getAllGroups = async userId => {
  const groups = await memberShipModel.find({ userId: userId }).populate('groupId');
  return groupModel.find({
    _id: { $in: groups.map(group => group.groupId) },
    isDeleted: false,
  });
};

// get group by id
exports.getGroupById = async groupId =>
  groupModel.findOne({
    _id: groupId,
    isDeleted: false,
  });

// get group by name
exports.getGroupsByName = async name => {
  return groupModel.findOne({
    name: name,
    isDeleted: false,
  });
};

// Update Group
exports.updateGroup = async (groupId, group) =>
  await groupModel.findOneAndUpdate({ _id: groupId }, { $set: group });
