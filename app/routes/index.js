const baseRoute = '/api';

module.exports = app => {
  app.use(`${baseRoute}/user`, require('./user.route'));
  app.use(`${baseRoute}/group`, require('./group.route'));
  app.use(`${baseRoute}/member`, require('./member.route'));
};
