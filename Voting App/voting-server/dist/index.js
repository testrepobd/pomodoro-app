"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = undefined;

var _store = require("./src/store");

var _store2 = _interopRequireDefault(_store);

var _server = require("./src/server");

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Owner on 1/11/2017.
 */
var store = exports.store = (0, _store2.default)();
(0, _server2.default)(store);

store.dispatch({
  type: "SET_ENTRIES",
  entries: require("./entry.json")
});
store.dispatch({ type: "NEXT" });
//# sourceMappingURL=index.js.map