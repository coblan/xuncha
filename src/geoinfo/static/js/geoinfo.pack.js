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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _polygon_com = __webpack_require__(1);

var polygon_com = _interopRequireWildcard(_polygon_com);

var _polygon_multi_com = __webpack_require__(2);

var _map_com = __webpack_require__(7);

var _dispatch_panel_com = __webpack_require__(8);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

__webpack_require__(9);

Vue.component('polygon-input', polygon_com.ploygon_editor);
Vue.component('polygon-multi-btn-panel', _polygon_multi_com.polygon_multi_btn_panel);
Vue.component('com-map', _map_com.map_com);
Vue.component('com-dispatch-panel', _dispatch_panel_com.dispatch_panel);

window.PolygonGroupController = _polygon_multi_com.PolygonGroupController;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var ploygon_editor = exports.ploygon_editor = {
    props: ['name', 'row', 'kw'],
    template: '<div>\n            <span v-if="row[name]"><i class="fa fa-map-o fa-2x" aria-hidden="true"></i></span>\n            <button @click="create_new()" title="\u65B0\u5EFA"><i class="fa fa-plus-square-o" aria-hidden="true"></i></button>\n            <button @click="edit()" title="\u7F16\u8F91"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>\n            <button @click="copy()">copy</button>\n            <button @click="paste()">paste</button>\n        </div>',
    methods: {
        create_new: function create_new() {
            //map.clearMap()

            drawer.show();
            drawer.create_polygon(function (polygon) {
                var poly_obj = drawer.insert_polygon(polygon);
                drawer.edit_polygon(poly_obj);
            });
            this.listn_submit();
        },
        edit: function edit() {
            drawer.show();
            if (this.row[this.name]) {
                var polygon = JSON.parse(this.row[this.name]);
                var poly_obj = drawer.insert_polygon(polygon);
                drawer.edit_polygon(poly_obj);
            }
            this.listn_submit();
        },
        listn_submit: function listn_submit() {
            var self = this;
            drawer.onsubmit = function (polygon) {
                var point_arr = ex.map(polygon, function (point) {
                    return [point.lng, point.lat];
                });
                self.row[self.name] = point_arr;
            };
        },
        copy: function copy() {
            localStorage.setItem('clip_polygon', this.row[this.name]);
            alert('复制成功!');
        },
        paste: function paste() {
            var clip_polygon = localStorage.getItem('clip_polygon');
            if (clip_polygon) {
                this.row[this.name] = clip_polygon;
            }
            alert('粘贴成功!');
        }
    }
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PolygonGroupController = exports.PolygonGroupController = function () {
    function PolygonGroupController() {
        _classCallCheck(this, PolygonGroupController);

        this.items = [];
        this.crt_row = {};
    }

    _createClass(PolygonGroupController, [{
        key: 'set_drawer',
        value: function set_drawer(drawer) {
            this.drawer = drawer;
        }
    }, {
        key: 'set_group',
        value: function set_group(group_pk) {
            this.group_pk = group_pk;
        }
    }, {
        key: 'get_items',
        value: function get_items() {
            var self = this;
            var post_data = [{ fun: 'block_group_items', group_pk: this.group_pk }];
            ex.post('/_ajax/geoinfo', JSON.stringify(post_data), function (resp) {
                ex.each(resp.block_group_items, function (row) {
                    //self.insert(item)
                    var poly = drawer.insert_polygon(row.bounding);
                    self.add_poly_2_row(row, poly);
                    self.items.push(row);
                });
                map.setFitView();
            });
        }
    }, {
        key: 'on_map_click',
        value: function on_map_click(callback) {
            this.map_click_callback = callback;
        }
    }, {
        key: 'new_row',
        value: function new_row() {
            var row = {
                name: '未命名',
                desp: '描述',
                bounding: null,
                group: window.row.pk,
                _class: "geoinfo.blockpolygon"
            };
            this.items.push(row);
            this.set_crt_polyon_row(row);
        }
    }, {
        key: 'add_poly_2_row',
        value: function add_poly_2_row(row, poly) {
            var self = this;
            row.poly = poly;

            //polygon_map[row]= poly
            poly.row = row;
            poly.on('click', function (e) {
                //self.set_crt_polyon_row(this.row)
                if (self.click_callback) {
                    self.click_callback(this.row);
                }
            });
        }
    }, {
        key: 'on_click',
        value: function on_click(callback) {
            this.click_callback = callback;
        }
    }, {
        key: 'set_crt_polyon_row',
        value: function set_crt_polyon_row(polygon_row) {

            //if( this.crt_row != polygon_row){
            if (this.crt_row.poly) {
                this.crt_row.poly.setOptions({
                    strokeWeight: 1,
                    strokeColor: "#000000",
                    fillColor: "#f5deb3"
                });
            }
            this.crt_row = polygon_row;
            if (this.crt_row.poly) {
                this.crt_row.poly.setOptions({
                    fillColor: 'red',
                    strokeWeight: 3,
                    strokeColor: "#0000ff"
                });
            }

            //}
        }
    }]);

    return PolygonGroupController;
}();

var polygon_multi_btn_panel = exports.polygon_multi_btn_panel = {
    props: ['crt_row'],
    data: function data() {

        return {
            editing: false
        };
    },
    template: '<div style="float: right;">\n                <button v-show="!editing && !is_empty(crt_row)" @click="start_edit()">\u7F16\u8F91</button>\n                <button v-show="editing" @click="save()">\u4FDD\u5B58</button>\n                <button v-show="editing" @click="fallback()">\u53D6\u6D88</button>\n                <button v-show="!editing" @click="new_row()">\u65B0\u5EFA</button>\n\n                <button v-show="!editing && !is_empty(crt_row)" @click="remove()">\u79FB\u9664</button>\n                <button v-show="!editing && !is_empty(crt_row)" @click="del()">\u5220\u9664</button>\n                <div class="hr"></div>\n                <div>\n                    <div>\n                        <label for="">\u540D\u5B57</label>\n                        <span v-if="!editing" v-text="crt_row.name"></span>\n                        <input v-else type="text" v-model="crt_row.name"/>\n                    </div>\n                    <div>\n                         <label for="">\u63CF\u8FF0</label>\n                         <span v-if="!editing" v-text="crt_row.desp"></span>\n                        <textarea v-else  rows="10" v-model="crt_row.desp"></textarea>\n                    </div>\n                    <button v-show="editing" @click="edit_poly()">\u7F16\u8F91\u591A\u8FB9\u5F62</button>\n                <!--<button v-show="editing" @click="close_poly()">\u5173\u95ED\u7F16\u8F91</button>-->\n                </div>\n     </div>',

    mounted: function mounted() {
        var self = this;
        controller.on_click(function (row) {
            if (!self.editing) {
                controller.set_crt_polyon_row(row);
            }
        });
        controller.on_map_click(function () {
            if (!self.editing) {
                controller.set_crt_polyon_row({});
            }
        });
    },

    methods: {
        is_empty: function is_empty(obj) {
            return Object.keys(obj).length == 0;
        },
        new_row: function new_row() {
            this.$emit('new_row');
            this.editing = true;
        },
        start_edit: function start_edit() {
            this.editing = true;
            this.fallback_cache = {
                name: this.crt_row.name,
                desp: this.crt_row.desp,
                oldpath: ex.map(this.crt_row.bounding, function (pos) {
                    return [pos.lng, pos.lat];
                })
            };
        },
        save: function save() {
            var self = this;
            var row = {};
            ex.assign(row, this.crt_row);
            var path_pos = row.poly.getPath();
            row.bounding = ex.map(path_pos, function (pos) {
                return [pos.lng, pos.lat];
            });
            delete row['poly'];

            var post_data = [{ fun: 'save', row: row }];
            ex.post("/_ajax", JSON.stringify(post_data), function (resp) {
                var resp_row = resp.save;
                self.crt_row.id = resp_row.id;
                self.crt_row.pk = resp_row.pk;

                self.editing = false;
                self.close_poly();
            });
        },
        fallback: function fallback() {
            this.close_poly();
            this.editing = false;

            if (!this.crt_row.pk) {
                // 新建的情况
                if (this.crt_row.poly) {

                    this.crt_row.poly.setMap(null);
                }
                controller.items.pop();
                controller.crt_row = {};
            } else {
                this.crt_row.name = this.fallback_cache.name;
                this.crt_row.desp = this.fallback_cache.desp;

                // 因为高德的Polygon直接操作opiotns设置的array属性，
                // bounding 与 poly_bounding 的数据应该一致，所以有下面两行
                this.crt_row.bounding = this.fallback_cache.oldpath;
                this.crt_row.poly.setPath(this.crt_row.bounding);
            }
        },
        _create_poly: function _create_poly() {
            var self = this;
            drawer.create_polygon(function (polygon) {
                var poly_obj = drawer.insert_polygon(polygon);
                controller.add_poly_2_row(self.crt_row, poly_obj);
                controller.set_crt_polyon_row(self.crt_row);
                drawer.edit_polygon(poly_obj);
            });
        },
        edit_poly: function edit_poly() {
            var self = this;
            if (!this.crt_row.poly) {
                self._create_poly();
            } else {
                var poly_obj = this.crt_row.poly;
                drawer.edit_polygon(poly_obj);
            }
        },
        close_poly: function close_poly() {
            drawer.close_polygon();
        },
        remove: function remove() {
            confirm("真的将该划分区域从该组中移除吗？", function (resp) {
                alert(resp);
            });
        },
        del: function del() {
            confirm("真的删除该划分区域吗？", function (resp) {
                alert(resp);
            });
        }
    }
};

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
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


/***/ }),
/* 6 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
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

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
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

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var map_com = exports.map_com = {
    template: "<div id=\"container\"></div>",
    mounted: function mounted() {
        var self = this;
        var count = 0;
        ex.load_css("http://cache.amap.com/lbs/static/main1119.css");
        ex.load_js("http://webapi.amap.com/maps?v=1.3&key=您申请的key值&plugin=AMap.PolyEditor,AMap.CircleEditor,AMap.MouseTool", function () {
            count += 1;
            if (count == 2) {
                self.init();
            }
        });
        ex.load_js("http://cache.amap.com/lbs/static/addToolbar.js", function () {
            count += 1;
            if (count == 2) {
                self.init();
            }
        });
    },
    data: function data() {
        return {
            ploygons: []
        };
    },
    methods: {
        on_init: function on_init(callback) {
            this.on_init_call = callback;
        },
        on_polygon_click: function on_polygon_click(callback) {
            this.on_polygon_click_callback = callback;
        },
        init: function init() {
            this.editorTool, this.map = new AMap.Map(this.$el, {
                resizeEnable: true,
                center: [116.403322, 39.900255], //地图中心点
                zoom: 13 //地图显示的缩放级别
            });
            if (this.on_init_call) {
                this.on_init_call();
            }
        },
        insert_polygon: function insert_polygon(arr) {
            var self = this;
            var _polygon = new AMap.Polygon({
                map: this.map,
                path: arr,
                strokeOpacity: 1,
                fillOpacity: 0.35,
                strokeWeight: 1,
                strokeColor: "#000000",
                fillColor: "#f5deb3"
            });
            this.ploygons.push(_polygon);
            _polygon.on('click', function () {
                if (self.on_polygon_click_callback) {
                    self.on_polygon_click_callback(_polygon);
                }
            });
            return _polygon;
        },
        detach_polygon: function detach_polygon(poly) {
            poly.setMap(null);
        },
        add_polygon: function add_polygon(poly) {
            poly.setMap(this.map);
        },
        highlight_polygon: function highlight_polygon(poly, color) {
            color = color || 'red';
            poly.setOptions({
                fillColor: color,
                strokeWeight: 3,
                strokeColor: "#0000ff"
            });
        },
        remove_highlight_polygon: function remove_highlight_polygon(poly, color) {
            color = color || '#f5deb3';
            poly.setOptions({
                strokeWeight: 1,
                strokeColor: "#000000",
                fillColor: color
            });
        }

    }
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var dispatch_panel = exports.dispatch_panel = {
    props: ['rows'],
    template: '<div>\n    <button @click="dispatch()">\u751F\u6210</button>\n    <button @click="submit()">\u786E\u5B9A</button>\n    <!--<button @click="highlight_last_selected()">\u4E0A\u6B21\u751F\u6548\u533A\u57DF</button>-->\n    <button @click="fit_view()">Fit View</button>\n    <div class="hr"></div>\n    <div v-for="row in rows"><span v-text="row.name"></span><input type="checkbox" :value="row" v-model="checked"/></div>\n\n    </div>',
    data: function data() {
        var date = new Date();
        var date_str = date.toISOString();
        var seed = date_str.slice(0, 10);
        return {
            checked: [],
            selected_blocks: [],
            seed: seed
        };
    },
    mounted: function mounted() {},
    watch: {
        checked: function checked(new_value, old_value) {
            var self = this;
            ex.each(new_value, function (value) {
                if (!ex.isin(value, old_value)) {
                    self.add_row_polygons(value);
                }
            });
            ex.each(old_value, function (value) {
                if (!ex.isin(value, new_value)) {
                    self.detach_row_polygons(value);
                }
            });
        },
        selected_blocks: function selected_blocks(new_value, old_value) {
            var self = this;

            ex.each(old_value, function (pair) {
                var group = ex.findone(self.rows, { pk: pair.group });
                var block = ex.findone(group.blocks, { pk: pair.block });
                self.map_panel.remove_highlight_polygon(block.poly);
            });

            self.highlight_old_selected();
            self.highlight_last_selected();

            ex.each(new_value, function (pair) {
                var group = ex.findone(self.rows, { pk: pair.group });
                var block = ex.findone(group.blocks, { pk: pair.block });
                self.map_panel.highlight_polygon(block.poly);
            });
        }

    },
    methods: {
        init: function init(map_panel) {
            var self = this;
            self.map_panel = map_panel;
            //self.map_panel.on_polygon_click(function(poly){
            //    self.map_panel.highlight_polygon(poly)
            //})

            self.checked = self.rows;
            Vue.nextTick(function () {
                self.highlight_old_selected();
                self.highlight_last_selected();
                self.fit_view();
            });
        },
        fit_view: function fit_view() {
            this.map_panel.map.setFitView();
        },
        add_row_polygons: function add_row_polygons(row) {
            var self = this;
            ex.each(row.blocks, function (block) {
                if (!block.poly) {
                    var poly = self.map_panel.insert_polygon(block.bounding);
                    block.poly = poly;
                    poly.block = block;
                } else {
                    self.map_panel.add_polygon(block.poly);
                }
            });
        },
        detach_row_polygons: function detach_row_polygons(row) {
            var self = this;
            ex.each(row.blocks, function (block) {
                self.map_panel.detach_polygon(block.poly);
            });
        },
        dispatch: function dispatch() {
            var self = this;
            show_upload();
            var post_data = [{ fun: 'dispatch_block', seed: self.seed }];
            self.seed = self.seed + '0';
            ex.post('/_ajax/geoinfo', JSON.stringify(post_data), function (resp) {
                Vue.set(self, 'selected_blocks', resp.dispatch_block);
                //self.selected_blocks= resp.dispatch_block

                hide_upload(300);
            });
        },
        submit: function submit() {

            var post_data = [{ fun: 'submit_block', blocks: this.selected_blocks }];
            ex.post('/_ajax/geoinfo', JSON.stringify(post_data), function (resp) {
                //alert(resp.submit_block)
                location.reload();
            });
        },
        highlight_old_selected: function highlight_old_selected() {
            var self = this;
            ex.each(this.rows, function (row) {
                ex.each(row.blocks, function (block) {
                    if (ex.isin(block.pk, row.old_selected)) {
                        self.map_panel.remove_highlight_polygon(block.poly, 'yellow');
                    }
                });
            });
        },
        highlight_last_selected: function highlight_last_selected() {
            var self = this;
            ex.each(this.rows, function (row) {
                var last_select_block = ex.findone(row.blocks, { pk: row.last });
                if (last_select_block) {
                    self.map_panel.remove_highlight_polygon(last_select_block.poly, 'green');
                }
            });
        }

    }

};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(10);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(6)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../../coblan/webcode/node_modules/css-loader/index.js!../../../../../../coblan/webcode/node_modules/sass-loader/lib/loader.js!./map_btn_panel.scss", function() {
			var newContent = require("!!../../../../../../coblan/webcode/node_modules/css-loader/index.js!../../../../../../coblan/webcode/node_modules/sass-loader/lib/loader.js!./map_btn_panel.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)();
// imports


// module
exports.push([module.i, ".map-btn-panel {\n  width: 15em;\n  margin: 0.5em;\n  background: #ffffff;\n  padding: 0.5em;\n  border: 1px solid #c8c8c8;\n  border-radius: 0.3em; }\n  .map-btn-panel .hr {\n    border: 1px solid #dcdcdc;\n    height: 1px;\n    margin: 0.5em 0; }\n", ""]);

// exports


/***/ })
/******/ ]);