"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _users = _interopRequireDefault(require("../../src/controller/users"));

var _user = _interopRequireDefault(require("../../src/models/user"));

var _auth = _interopRequireDefault(require("../services/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

const usersController = new _users.default(_user.default, _auth.default);
router.get("/", (req, res) => {
  usersController.get(req, res);
});
router.get("/:id", (req, res) => {
  usersController.getById(req, res);
});
router.post("/", (req, res) => {
  usersController.createUser(req, res);
});
router.put("/:id", (req, res) => {
  usersController.updateUser(req, res);
});
router.delete("/", (req, res) => {
  usersController.deleteAll(req, res);
});
router.delete("/:id", (req, res) => {
  usersController.deleteById(req, res);
});
router.post("/authenticate", (req, res) => {
  usersController.authenticateUser(req, res);
});
var _default = router;
exports.default = _default;