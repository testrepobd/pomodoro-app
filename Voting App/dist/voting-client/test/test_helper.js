"use strict";

var _jsdom = require("jsdom");

var _jsdom2 = _interopRequireDefault(_jsdom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var doc = _jsdom2.default.jsdom("<!doctype html><html><body></body></html>"); /**
                                                                               * Created by Owner on 1/13/2017.
                                                                               */

var win = doc.defaultView;

global.document = doc;
global.window = win;
//# sourceMappingURL=test_helper.js.map