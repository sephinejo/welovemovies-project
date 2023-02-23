const theatersService = require('./theaters.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

async function list(req, res, next) {
  res.json({ data: await theatersService.list() });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
