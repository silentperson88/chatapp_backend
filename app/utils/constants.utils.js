module.exports = {
  /* common */
  PASSWORD_REGEX: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,
  USER_NOT_REGISTERED: 'User not registered',
  INVALID_PASSWORD:
    'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
  LOGIN_SUCCESS: 'Login successfully',
  EMAIL_ALREADY_EXISTS: 'Email already exists',
  PASSWORD_NOT_MATCHED: 'Password not matched',
  USER_REGISTER_SUCCESS: 'User registered successfully',
  USER_REGISTER_FAILED: 'User registered failed',
  USER_NOT_FOUND: 'User not found',
  USER_UPDATED: 'User updated successfully',
  USER_RETRIVED: 'User retrived successfully',

  /**AI */
  CONTENT_TYPE_ERROR: 'Content type must be application/json',
  CATEGORY_TYPE_ERROR: 'Category type must be string',
  AI_RETRIVED_SUCCESSFULLY: 'AI retrived successfully',
  AI_REGISTER_SUCCESSFULLY: 'AI registered successfully',
  AI_UPDATED_SUCCESSFULLY: 'AI updated successfully',

  /**Group */
  GROUP_CREATED: 'Group created successfully',
  GROUP_UPDATED: 'Group updated successfully',
  GROUP_DELETED: 'Group deleted successfully',
  GROUP_CREATED_FAILED: 'Group created failed',
  GROUP_ALREADY_EXISTS: 'Group already exists',
  GROUP_FETCHED: 'Group fetched successfully',
  GROUP_FETCHED_FAILED: 'Group fetched failed',
  GROUP_NOT_FOUND: 'Group not found',
  GROUP_UPDATED_FAILED: 'Group updated failed',
  GROUP_DELETED_FAILED: 'Group deleted failed',

  /**Member */
  MEMBER_ADDED: 'Member added successfully',
  MEMBER_ADDED_FAILED: 'Member added failed',
  GROUP_NOT_ALLOWED: 'You are not allowed to add member',
  USER_NOT_ADMIN: 'You are not admin',
  MEMBER_ALREADY_EXISTS: 'Member already exists',
  MEMBER_NOT_FOUND: 'Member not found',
  MEMBER_REMOVED: 'Member removed successfully',
  MEMBER_REMOVED_FAILED: 'Member removed failed',
  MEMBER_FETCHED: 'Member fetched successfully',
  MEMBER_FETCHED_FAILED: 'Member fetched failed',

  /**Messages */
  MESSAGE_SENT: 'Message sent successfully',
  MESSAGE_SENT_FAILED: 'Message sent failed',
  MESSAGE_FETCHED: 'Message fetched successfully',
  MESSAGE_FETCHED_FAILED: 'Message fetched failed',
  MESSAGE_NOT_FOUND: 'Message not found',
  MESSAGE_DELETED: 'Message deleted successfully',
  MESSAGE_DELETED_FAILED: 'Message deleted failed',
  MESSAGE_LIKED: 'Message liked successfully',
  MESSAGE_LIKED_FAILED: 'Message liked failed',
};
