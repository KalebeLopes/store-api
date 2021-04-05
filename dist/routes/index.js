"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _products = _interopRequireDefault(require("./products"));

var _users = _interopRequireDefault(require("./users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.use("/products", _products.default);
router.get("/", (req, res) => {
  return res.send("Hello World");
});
router.use("/users", _users.default);
var _default = router;
exports.default = _default;