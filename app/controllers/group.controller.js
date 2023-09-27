/* packages */
const constantUtils = require('../utils/constants.utils');
const { response } = require('../utils/response.utils');
const groupService = require('../services/group.service');
const membershipService = require('../services/memberShip.service');
const messageService = require('../services/message.service');

// Create Group
exports.createGroup = async (req, res) => {
  const reqBody = req.body;
  const { name, description } = reqBody;
  try {
    const isExists = await groupService.getGroupsByName(name);
    if (isExists) {
      return response(res, 400, constantUtils.GROUP_ALREADY_EXISTS);
    }
    const group = {
      name,
      description,
    };
    const newGroup = await groupService.createGroup(group);
    if (newGroup) {
      const member = await membershipService.addUserToGroup(req.userData._id, newGroup._id, true);
      if (member) {
        return response(res, 200, constantUtils.GROUP_CREATED, newGroup);
      }
    }
    return response(res, 400, constantUtils.GROUP_CREATED_FAILED, newGroup);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// get Groups
exports.getAllGroups = async (req, res) => {
  try {
    const groups = await groupService.getAllGroups(req.userData._id);
    if (groups) {
      return response(res, 200, constantUtils.GROUP_FETCHED, groups);
    }
    return response(res, 400, constantUtils.GROUP_FETCHED_FAILED);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// get group by id
exports.getGroupById = async (req, res) => {
  try {
    const group = await groupService.getGroupById(req.params.groupId);
    if (group) {
      return response(res, 200, constantUtils.GROUP_FETCHED, group);
    }
    return response(res, 400, constantUtils.GROUP_FETCHED_FAILED);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Update Group
exports.updateGroup = async (req, res) => {
  const reqBody = req.body;
  const { groupId } = req.params;
  try {
    const isExists = await groupService.getGroupById(groupId);
    if (!isExists || isExists.isDeleted) {
      return response(res, 400, constantUtils.GROUP_NOT_FOUND);
    }
    const group = await groupService.updateGroup(groupId, reqBody);
    if (group) {
      return response(res, 200, constantUtils.GROUP_UPDATED, group);
    }
    return response(res, 400, constantUtils.GROUP_UPDATED_FAILED);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Delete Group
exports.deleteGroup = async (req, res) => {
  try {
    const group = await groupService.updateGroup(req.params.groupId, {
      isDeleted: true,
    });
    if (group) {
      return response(res, 200, constantUtils.GROUP_DELETED, group);
    }
    return response(res, 400, constantUtils.GROUP_DELETED_FAILED);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Add Member
exports.addMember = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { userId } = req.body;
    const isExists = await groupService.getGroupById(groupId);
    if (!isExists || isExists.isDeleted) {
      return response(res, 400, constantUtils.GROUP_NOT_FOUND);
    }

    const isUserAdmin = await membershipService.getMembershipByGroupIdAndUserId(
      groupId,
      req.userData._id
    );

    if (!isUserAdmin || !isUserAdmin.isAdmin) {
      return response(res, 400, constantUtils.USER_NOT_ADMIN);
    }

    const isMemberExists = await membershipService.getMembershipByGroupIdAndUserId(groupId, userId);

    if (isMemberExists) {
      return response(res, 400, constantUtils.MEMBER_ALREADY_EXISTS);
    }

    const member = await membershipService.addUserToGroup(userId, groupId);
    if (member) {
      return response(res, 200, constantUtils.MEMBER_ADDED, member);
    }
    return response(res, 400, constantUtils.MEMBER_ADDED_FAILED);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Remove Member
exports.removeMember = async (req, res) => {
  try {
    const { groupId, userId } = req.params;
    const isExists = await groupService.getGroupById(groupId);
    if (!isExists || isExists.isDeleted) {
      return response(res, 400, constantUtils.GROUP_NOT_FOUND);
    }

    const isUserAdmin = await membershipService.getMembershipByGroupIdAndUserId(
      groupId,
      req.userData._id
    );

    if (!isUserAdmin || !isUserAdmin.isAdmin) {
      return response(res, 400, constantUtils.USER_NOT_ADMIN);
    }

    const isMemberExists = await membershipService.getMembershipByGroupIdAndUserId(groupId, userId);

    if (!isMemberExists) {
      return response(res, 400, constantUtils.MEMBER_NOT_FOUND);
    }

    const member = await membershipService.removeUserFromGroup(userId, groupId);
    if (member) {
      return response(res, 200, constantUtils.MEMBER_REMOVED, member);
    }
    return response(res, 400, constantUtils.MEMBER_REMOVED_FAILED);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Get All Members
exports.getAllGroupsByMemberId = async (req, res) => {
  try {
    const userId = req.userData._id;

    const groups = await membershipService.getAllGroupsofMember(userId);

    if (groups) {
      return response(res, 200, constantUtils.GROUP_FETCHED, groups);
    }
    return response(res, 400, constantUtils.GROUP_FETCHED_FAILED);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Get all groups of member
exports.getAllMemberOfGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const isExists = await groupService.getGroupById(groupId);
    if (!isExists || isExists.isDeleted) {
      return response(res, 400, constantUtils.GROUP_NOT_FOUND);
    }

    const members = await membershipService.getMembershipByGroupId(groupId);
    if (members) {
      return response(res, 200, constantUtils.MEMBER_FETCHED, members);
    }
    return response(res, 400, constantUtils.MEMBER_FETCHED_FAILED);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Send Message
exports.sendMessage = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { message } = req.body;
    const isExists = await groupService.getGroupById(groupId);
    if (!isExists || isExists.isDeleted) {
      return response(res, 400, constantUtils.GROUP_NOT_FOUND);
    }

    const isMemberExists = await membershipService.getMembershipByGroupIdAndUserId(
      groupId,
      req.userData._id
    );

    if (!isMemberExists) {
      return response(res, 400, constantUtils.MEMBER_NOT_FOUND);
    }

    const newMessage = {
      sender: req.userData._id,
      groupId,
      message,
    };

    const messageData = await messageService.sendMessage(newMessage);
    if (messageData) {
      return response(res, 200, constantUtils.MESSAGE_SENT, messageData);
    }
    return response(res, 400, constantUtils.MESSAGE_SENT_FAILED);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Get All Messages by Group Id
exports.getAllMessagesByGroupId = async (req, res) => {
  try {
    const { groupId } = req.params;
    const isExists = await groupService.getGroupById(groupId);
    if (!isExists || isExists.isDeleted) {
      return response(res, 400, constantUtils.GROUP_NOT_FOUND);
    }

    const isMemberExists = await membershipService.getMembershipByGroupIdAndUserId(
      groupId,
      req.userData._id
    );

    if (!isMemberExists) {
      return response(res, 400, constantUtils.MEMBER_NOT_FOUND);
    }

    const messages = await messageService.getAllMessagesByGroupId(groupId, req.userData._id);
    if (messages) {
      return response(res, 200, constantUtils.MESSAGE_FETCHED, {
        chats: messages,
        requestedId: req.userData._id,
      });
    }
    return response(res, 400, constantUtils.MESSAGE_FETCHED_FAILED);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Like Message
exports.likeMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const isExists = await messageService.getMessageById(chatId);
    if (!isExists || isExists.isDeleted) {
      return response(res, 400, constantUtils.MESSAGE_NOT_FOUND);
    }

    const isMemberExists = await membershipService.getMembershipByGroupIdAndUserId(
      isExists.groupId,
      req.userData._id
    );

    if (!isMemberExists) {
      return response(res, 400, constantUtils.MEMBER_NOT_FOUND);
    }

    const message = await messageService.likeMessage(chatId);
    if (message) {
      return response(res, 200, constantUtils.MESSAGE_LIKED, message);
    }
    return response(res, 400, constantUtils.MESSAGE_LIKED_FAILED);
  } catch (error) {
    res.status(500).json({ error });
  }
};
