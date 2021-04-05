"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _config = _interopRequireDefault(require("config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const mondodbUrl = _config.default.get("database.mongoUrl");

const connect = () => _mongoose.default.connect(mondodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var _default = {
  connect,
  connection: _mongoose.default.connection
};
exports.default = _default;