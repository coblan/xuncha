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

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

Vue.component('polygon-input', polygon_com.ploygon_editor);
Vue.component('polygon-multi-btn-panel', _polygon_multi_com.polygon_multi_btn_panel);

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
                self.row[self.name] = JSON.stringify(point_arr);
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
        //insert(polygon_row){
        //    var self=this
        //    var poly_bounding = drawer.insert_polygon(polygon_row.bounding)
        //    polygon_row.poly_bounding = poly_bounding
        //
        //    poly_bounding.on('click',function(e){
        //        self.set_crt_polyon_row(polygon_row)
        //    })
        //
        //    this.items.push(polygon_row)
        //}

    }, {
        key: 'new_row',
        value: function new_row() {
            var row = {
                name: '未命名',
                desp: '描述',
                bounding: null
            };
            this.items.push(row);
            this.crt_row = row;
        }
    }, {
        key: 'add_poly_2_row',
        value: function add_poly_2_row(row, poly) {
            var self = this;
            row.poly_bounding = poly;
            poly.on('click', function () {
                self.set_crt_polyon_row(row);
            });
        }
    }, {
        key: 'set_crt_polyon_row',
        value: function set_crt_polyon_row(polygon_row) {

            if (this.crt_row != polygon_row) {
                if (this.crt_row.poly_bounding) {
                    this.crt_row.poly_bounding.setOptions({ fillColor: 'black' });
                }
                this.crt_row = polygon_row;
                this.crt_row.poly_bounding.setOptions({ fillColor: 'red' });
            }
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
    template: '<div style="float: right;">\n                <button v-show="!editing" @click="start_edit()">\u7F16\u8F91</button>\n                <button v-show="editing" @click="editing =false">\u4FDD\u5B58</button>\n                <button v-show="editing" @click="fallback()">\u53D6\u6D88</button>\n                <button v-show="!editing" @click="new_row()">\u65B0\u5EFA</button>\n\n                <button v-show="!editing" @click="remove()">\u79FB\u9664</button>\n                <button v-show="!editing" @click="del()">\u5220\u9664</button>\n                <div>\n                <div>\n                    <label for="">\u540D\u5B57</label>\n                    <span v-if="!editing" v-text="crt_row.name"></span>\n                    <input v-else type="text" v-model="crt_row.name"/>\n                </div>\n                <div>\n                     <label for="">\u63CF\u8FF0</label>\n                     <span v-if="!editing" v-text="crt_row.desp"></span>\n                    <textarea v-else name="" id="" cols="30" rows="10" v-model="crt_row.desp"></textarea>\n                </div>\n                <button v-show="editing" @click="edit_poly()">\u7F16\u8F91\u591A\u8FB9\u5F62</button>\n                <button v-show="editing" @click="close_poly()">\u5173\u95ED\u7F16\u8F91</button>\n                </div>\n     </div>',

    methods: {
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
        fallback: function fallback() {
            //ex.assign(this.crt_row,this.fallback_cache)
            this.crt_row.name = this.fallback_cache.name;
            this.crt_row.desp = this.fallback_cache.desp;

            // 因为高德的Polygon直接操作opiotns设置的array属性，
            // bounding 与 poly_bounding 的数据应该一致，所以有下面两行
            this.crt_row.bounding = this.fallback_cache.oldpath;
            this.crt_row.poly_bounding.setPath(this.crt_row.bounding);

            this.close_poly();
            this.editing = false;
        },
        _create_poly: function _create_poly() {
            var self = this;
            drawer.create_polygon(function (polygon) {
                var poly_obj = drawer.insert_polygon(polygon);
                controller.add_poly_2_row(self.crt_row, poly_obj);
                drawer.edit_polygon(poly_obj);
            });
        },
        edit_poly: function edit_poly() {
            var self = this;
            if (!this.crt_row.poly_bounding) {
                self._create_poly();
            } else {
                var poly_obj = this.crt_row.poly_bounding;
                drawer.edit_polygon(poly_obj);
            }
        },
        close_poly: function close_poly() {
            drawer.close_polygon();
        }
    }
};

/***/ })
/******/ ]);