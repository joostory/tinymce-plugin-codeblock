/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _codemirror = __webpack_require__(11);

var _codemirror2 = _interopRequireDefault(_codemirror);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CodeEditor = function () {
  function CodeEditor(tinymceEditor, textarea) {
    _classCallCheck(this, CodeEditor);

    var theme = tinymceEditor.settings.codeblock && tinymceEditor.settings.codeblock.codeTheme ? tinymceEditor.settings.codeblock.codeTheme : 'default';

    this.tinymceEditor = tinymceEditor;
    this.textarea = textarea;
    if (_codemirror2.default && _codemirror2.default.fromTextArea) {
      this.codeMirror = _codemirror2.default.fromTextArea(textarea, {
        lineNumbers: true,
        autofocus: true,
        theme: theme
      });
    }
  }

  _createClass(CodeEditor, [{
    key: 'refresh',
    value: function refresh() {
      this.selectedNode = null;
      if (this.codeMirror) {
        this.codeMirror.refresh();
        this.codeMirror.setValue(this.getCurrentCode());
        this.codeMirror.focus();
      } else {
        this.textarea.value = this.getCurrentCode();
        this.textarea.focus();
      }
    }
  }, {
    key: 'insertCodeBlock',
    value: function insertCodeBlock() {
      var _this = this;

      var editor = this.tinymceEditor;
      var code = this.getValue();

      editor.undoManager.transact(function () {
        var node = _this.getSelectedCodeBlock();
        code = editor.dom.encode(code);

        if (node) {
          node.innerHTML = code;
          editor.selection.select(node);
        } else {
          editor.insertContent('<pre id="__new">' + code + '</pre>');
          editor.selection.select(editor.$('#__new').removeAttr('id')[0]);
        }
      });
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this.codeMirror ? this.codeMirror.getValue() : this.textarea.value;
    }
  }, {
    key: 'getCurrentCode',
    value: function getCurrentCode() {
      var node = this.getSelectedCodeBlock();
      if (node) {
        return node.textContent;
      }

      return '';
    }
  }, {
    key: 'getSelectedCodeBlock',
    value: function getSelectedCodeBlock() {
      if (!this.selectedNode) {
        var node = this.tinymceEditor.selection.getNode();
        if (node && node.nodeName == 'PRE') {
          this.selectedNode = node;
        }
      }

      return this.selectedNode;
    }
  }]);

  return CodeEditor;
}();

exports.default = CodeEditor;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _codeblock = __webpack_require__(2);

var _codeblock2 = _interopRequireDefault(_codeblock);

var _inlinecode = __webpack_require__(5);

var _inlinecode2 = _interopRequireDefault(_inlinecode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var plugin = function plugin(editor, pluginUrl) {
  (0, _codeblock2.default)(editor, pluginUrl);
  (0, _inlinecode2.default)(editor, pluginUrl);
};

exports.default = plugin;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CodeEditor = __webpack_require__(0);

var _CodeEditor2 = _interopRequireDefault(_CodeEditor);

var _CodeEditorDialog = __webpack_require__(3);

var _CodeEditorDialog2 = _interopRequireDefault(_CodeEditorDialog);

var _highlightjs = __webpack_require__(12);

var _highlightjs2 = _interopRequireDefault(_highlightjs);

__webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isCodeBlock = function isCodeBlock(node) {
  return node && node.nodeName == 'PRE';
};

exports.default = function (editor, pluginUrl) {

  var $ = editor.$;

  var dialog = new _CodeEditorDialog2.default(editor);

  var handleButtonClick = function handleButtonClick() {
    var node = editor.selection.getNode();
    if (editor.selection.isCollapsed() || isCodeBlock(node)) {
      dialog.open();
    } else {
      editor.formatter.toggle('code');
    }
  };

  editor.addCommand('codeblock', handleButtonClick);
  editor.addButton('codeblock', {
    cmd: 'codeblock',
    icon: 'codesample',
    tooltip: 'Insert Code Block',
    stateSelector: 'pre'
  });

  editor.on('PreProcess', function (e) {
    $('pre[contenteditable=false]', e.node).each(function (idx, elm) {
      if (!isCodeBlock(elm)) {
        return;
      }
      var $elm = $(elm),
          code = elm.textContent;

      $elm.removeAttr('contentEditable');

      $elm.empty().removeAttr('class').append($('<code></code>').each(function (idx, elm) {
        elm.textContent = code;
      }));
    });
  });

  editor.on('SetContent', function () {
    var unprocessedCodeSamples = $('pre').filter(function (idx, elm) {
      return isCodeBlock(elm);
    }).filter(function (idx, elm) {
      return elm.contentEditable !== "false";
    });

    if (unprocessedCodeSamples.length) {
      editor.undoManager.transact(function () {
        unprocessedCodeSamples.each(function (idx, elm) {
          $(elm).find('br').each(function (idx, elm) {
            elm.parentNode.replaceChild(editor.getDoc().createTextNode('\n'), elm);
          });

          elm.contentEditable = false;
          elm.innerHTML = editor.dom.encode(elm.textContent);
          if (_highlightjs2.default && _highlightjs2.default.highlightBlock) {
            _highlightjs2.default.highlightBlock(elm);
          }
        });
      });
    }
  });

  editor.on('init', function () {
    if (editor.settings.codeblock && editor.settings.codeblock.highlightStyle) {
      var linkElm = editor.dom.create('link', {
        rel: 'stylesheet',
        href: editor.settings.codeblock.highlightStyle
      });

      editor.getDoc().getElementsByTagName('head')[0].appendChild(linkElm);
    }
  });
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CodeEditor = __webpack_require__(0);

var _CodeEditor2 = _interopRequireDefault(_CodeEditor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CodeEditorDialog = function () {
  function CodeEditorDialog(editor) {
    _classCallCheck(this, CodeEditorDialog);

    this.editor = editor;
    this.active = false;
  }

  _createClass(CodeEditorDialog, [{
    key: 'open',
    value: function open() {
      if (this.active) {
        return;
      }

      if (!this.container) {
        this.createContainer();
      }

      this.container.style.display = 'block';
      this.codeEditor.refresh();
      this.active = true;
    }
  }, {
    key: 'close',
    value: function close() {
      if (!this.active) {
        return;
      }

      this.container.style.display = 'none';
      this.active = false;
    }
  }, {
    key: 'createContainer',
    value: function createContainer() {
      var _this = this;

      var _editor = this.editor,
          $ = _editor.$,
          dom = _editor.dom;

      var container = dom.create('div', { class: 'mce-codeblock-dialog-container' });

      var shadow = dom.create('div', { class: 'mce-codeblock-shadow' });
      container.append(shadow);

      var dialog = dom.create('div', { class: 'mce-codeblock-dialog' });
      container.append(dialog);
      this.dialog = dialog;

      var header = dom.create('div', { class: 'mce-codeblock-header' }, '<span class="mce-codeblock-title">CodeBlock</span>');

      var content = dom.create('div', { class: 'mce-codeblock-content' });
      var textarea = dom.create('textarea', { class: 'textarea' });
      content.append(textarea);

      var footer = dom.create('div', { class: 'mce-codeblock-footer' });
      var btnSubmit = dom.create('button', { class: 'mce-codeblock-btn mce-codeblock-btn-submit' }, '확인');
      var btnCancel = dom.create('button', { class: 'mce-codeblock-btn mce-codeblock-btn-cancel' }, '취소');
      footer.append(btnSubmit);
      footer.append(btnCancel);

      dialog.append(header);
      dialog.append(content);
      dialog.append(footer);

      document.body.append(container);
      this.container = container;
      this.codeEditor = new _CodeEditor2.default(this.editor, textarea);

      $(btnSubmit).on('click', function () {
        if (!_this.active) {
          return;
        }
        _this.codeEditor.insertCodeBlock();
        _this.close();
      });

      $(btnCancel).on('click', function () {
        _this.close();
      });

      $(shadow).on('click', function () {
        _this.close();
      });

      $(window).on("keyup", function (e) {
        if (!_this.active) {
          return;
        }
        if (e.keyCode == 27 && confirm('Close CodeBlock?')) {
          _this.close();
        }
      });
    }
  }]);

  return CodeEditorDialog;
}();

exports.default = CodeEditorDialog;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _plugin = __webpack_require__(1);

var _plugin2 = _interopRequireDefault(_plugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

tinymce.PluginManager.add('codeblock', _plugin2.default);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (editor, pluginUrl) {

  var handleButtonClick = function handleButtonClick() {
    editor.formatter.toggle('code');
  };

  editor.addCommand('inlinecode', handleButtonClick);
  editor.addButton('inlinecode', {
    cmd: 'inlinecode',
    icon: 'code',
    tooltip: 'Code',
    stateSelector: 'code'
  });
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(undefined);
// imports


// module
exports.push([module.i, ".mce-codeblock-dialog-container { position:fixed; top:0; left:0; bottom:0; right:0; display:none; z-index:65000 }\n.mce-codeblock-dialog-container .mce-codeblock-shadow { position:fixed; top:0; left:0; bottom:0; right:0; background:rgba(48, 48, 48, 0.7) }\n.mce-codeblock-dialog-container .mce-codeblock-dialog { position:absolute; top:50px; bottom:50px; left:50px; right:50px; background:#fff }\n.mce-codeblock-dialog-container .mce-codeblock-header { position:absolute; top:0; left:0; right:0; height:39px; text-align:center; background-color:#f7f7f7; line-height:38px; border-bottom:1px solid #ddd }\n.mce-codeblock-dialog-container .mce-codeblock-header .mce-codeblock-title { font-size:16px; font-weight:bold; }\n.mce-codeblock-dialog-container .mce-codeblock-content { position:absolute; top:40px; bottom:40px; left:0; right:0; }\n.mce-codeblock-dialog-container .mce-codeblock-content .textarea { width:100%; height:100%; resize:none; border:0; padding:0 }\n.mce-codeblock-dialog-container .mce-codeblock-footer { position:absolute; bottom:0; left:0; right:0; height:39px; text-align:center; background-color:#f7f7f7; line-height:38px; border-top:1px solid #ddd }\n.mce-codeblock-dialog-container .mce-codeblock-footer .mce-codeblock-btn { height:30px; padding:0 20px; border: 1px solid #fff; font-size:13px; font-weight:bold; cursor:pointer; line-height:28px }\n.mce-codeblock-dialog-container .mce-codeblock-footer .mce-codeblock-btn-submit { color:#fff; background-color:#2d8ac7; border-color:#2d8ac7; margin-right:5px }\n.mce-codeblock-dialog-container .mce-codeblock-footer .mce-codeblock-btn-submit:hover { background-color:#257cb6; border-color:#257cb6 }\n.mce-codeblock-dialog-container .mce-codeblock-footer .mce-codeblock-btn-cancel { color:#333; background-color:#fff; border-color:#e3e3e3 }\n.mce-codeblock-dialog-container .mce-codeblock-footer .mce-codeblock-btn-cancel:hover { background-color:#e3e3e3 }\n\n.mce-codeblock-dialog-container .CodeMirror { height:100%; width:100%; font-size:13px }\n", ""]);

// exports


/***/ }),
/* 7 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(6);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(9)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./codeblock.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./codeblock.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(10);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 10 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = (typeof CodeMirror !== "undefined")? CodeMirror:{};

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = (typeof hljs !== "undefined")? hljs:{};

/***/ })
/******/ ]);