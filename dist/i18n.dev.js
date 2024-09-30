"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _i18next = _interopRequireDefault(require("i18next"));

var _i18nextBrowserLanguagedetector = _interopRequireDefault(require("i18next-browser-languagedetector"));

var _reactI18next = require("react-i18next");

var _common = _interopRequireDefault(require("./public/locales/en/common.json"));

var _common2 = _interopRequireDefault(require("./public/locales/vi/common.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_i18next["default"].use(_i18nextBrowserLanguagedetector["default"]).use(_reactI18next.initReactI18next).init({
  resources: {
    en: {
      common: _common["default"]
    },
    vi: {
      common: _common2["default"]
    }
  },
  fallbackLng: 'vi',
  defaultNS: 'common',
  interpolation: {
    escapeValue: false
  }
});

var _default = _i18next["default"];
exports["default"] = _default;
//# sourceMappingURL=i18n.dev.js.map
