"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) return next();

  _jsonwebtoken.default.verify(token, _config.default.get("auth.key"), (err, decoded) => {
    req.decoded = decoded;
    next(err);
  });
};

exports.default = _default;