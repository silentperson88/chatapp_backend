/* models */
const groupModel = require('../models/group.model');
const memberShipModel = require('../models/membershib.model');

// Add User to Group
exports.addUserToGroup = async (userId, groupId, isAdmin = false) => {
  const membership = await memberShipModel.findOne({
    userId: userId,
    groupId: groupId,
  });
  if (membership) return;
  return memberShipModel.create({
    userId: userId,
    groupId: groupId,
    isAdmin: isAdmin,
  });
};

// get Groups
exports.getAllGroupsofMember = async userId => {
  const groups = await memberShipModel.find({ userId: userId }).populate('groupId');
  return groupModel.find({
    _id: { $in: groups.map(group => group.groupId) },
  });
};

// get membership by group id and user id
exports.getMembershipByGroupIdAndUserId = async (groupId, userId) =>
  memberShipModel.findOne({
    userId: userId,
    groupId: groupId,
    isDeleted: false,
  });

// get membership by group id
exports.getMembershipByGroupId = async groupId => {
  return memberShipModel
    .find({
      groupId: groupId,
      isDeleted: false,
    })
    .populate({
      path: 'userId',
      select: 'firstName lastName _id role',
    });
};

// remove user from group
exports.removeUserFromGroup = async (userId, groupId) => {
  return memberShipModel.findOneAndDelete({
    userId: userId,
    groupId: groupId,
  });
};
