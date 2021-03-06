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

var _map_com = __webpack_require__(3);

var _dispatch_panel_com = __webpack_require__(4);

var _fullscreen = __webpack_require__(5);

var dispatch = _interopRequireWildcard(_fullscreen);

var _shot = __webpack_require__(6);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

__webpack_require__(7);

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
        key: 'delete_row',
        value: function delete_row(row) {
            row.poly.setMap(null);
            ex.remove(this.items, row);
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
                    fillColor: "#999"
                });
            }
            this.crt_row = polygon_row;
            if (this.crt_row.poly) {
                this.crt_row.poly.setOptions({
                    fillColor: '#FFF',
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
    props: ['crt_row', 'items'],
    data: function data() {

        return {
            editing: false,
            crt_view: 'btn-panel'
        };
    },
    template: '<div style="float: right;">\n                 <ul class="nav nav-tabs" style="margin-bottom:1em; ">\n                  <li role="presentation" :class="{\'active\':crt_view==\'btn-panel\'}" @click="crt_view=\'btn-panel\'">\n                    <a href="#">\u7F16\u8F91\u9762\u677F</a>\n                    </li>\n                  <li role="presentation" :class="{\'active\':crt_view==\'list\'}" @click="crt_view=\'list\'">\n                    <a href="#">\u5206\u533A\u5217\u8868</a>\n                  </li>\n\n                </ul>\n                <div v-show="crt_view==\'list\'">\n                    <ul>\n                        <li v-for="item in items"><a @click="set_crt_row(item)" href="#" v-text="item.name"></a></li>\n                    </ul>\n                </div>\n                <div v-show="crt_view==\'btn-panel\'">\n                    <button v-show="!editing" @click="new_row()">\u65B0\u5EFA</button>\n\n                     <button v-show="!editing && !is_empty(crt_row)" @click="start_edit()">\u7F16\u8F91</button>\n                    <button v-show="editing" @click="save()">\u4FDD\u5B58</button>\n                    <button v-show="editing" @click="fallback()">\u53D6\u6D88</button>\n\n\n                    <!--<button v-show="!editing && !is_empty(crt_row)" @click="remove()">\u79FB\u9664</button>-->\n                    <button v-show="!editing && !is_empty(crt_row)" @click="del(crt_row)">\u5220\u9664</button>\n                    <div class="hr"></div>\n                    <div>\n                        <div class="panel-field">\n                            <label for="">\u540D\u5B57:</label><br/>\n                            <span v-if="!editing" v-text="crt_row.name"></span>\n                            <input v-else type="text" v-model="crt_row.name"/>\n                        </div>\n                        <div class="panel-field">\n                             <label for="">\u63CF\u8FF0:</label><br/>\n                             <span v-if="!editing" v-text="crt_row.desp"></span>\n                            <textarea v-else  rows="10" v-model="crt_row.desp"></textarea>\n                        </div>\n                        <div class="panel-field" v-if="editing">\n                            <label  for="">\u533A\u57DF:</label><br/>\n                            <button v-show="editing" @click="edit_poly()">\u7F16\u8F91\u5206\u533A</button>\n                        </div>\n\n                        <div class="panel-field">\n                            <label for="">\u622A\u56FE:</label><br/>\n                             <img  v-if="!editing" :src="crt_row.shot">\n                              <com-file-uploader v-else v-model="crt_row.shot" :config="{multiple:false}"></com-file-uploader>\n                        </div>\n                    <!--<button v-show="editing" @click="close_poly()">\u5173\u95ED\u7F16\u8F91</button>-->\n                    </div>\n\n                </div>\n\n     </div>',

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
        set_crt_row: function set_crt_row(row) {
            controller.set_crt_polyon_row(row);
        },
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
            if (!row.poly) {
                alert('请创建一个多边形');
                return;
            }

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
        del: function del(row) {
            var r = confirm("真的删除该划分区域吗？");
            if (r) {
                if (row.pk) {
                    var self = this;
                    var post_data = [{ fun: 'del_rows', rows: [{ pk: row.pk, _class: row._class }] }];
                    ex.post('/_ajax', JSON.stringify(post_data), function (resp) {
                        controller.delete_row(row);
                    });
                } else {
                    controller.delete_row(row);
                }
            }
        }
    }
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/*分发页面的地图组件
*
* */

var map_com = exports.map_com = {
    template: "<div id=\"container\"></div>",
    mounted: function mounted() {
        var self = this;

        ex.load_css("http://cache.amap.com/lbs/static/main1119.css");
        ex.load_js("http://webapi.amap.com/maps?v=1.3&key=0909294a753dfe00a0aa124b6ecb93eb&plugin=AMap.PolyEditor,AMap.CircleEditor,AMap.MouseTool", function () {
            ex.load_js("http://cache.amap.com/lbs/static/addToolbar.js", function () {
                setTimeout(function () {
                    self.init();
                }, 10);
            });
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
            //this.map.setMapStyle('amap://styles/light');
        },
        insert_polygon: function insert_polygon(arr) {
            var self = this;
            var _polygon = new AMap.Polygon({
                map: this.map,
                path: arr,
                strokeOpacity: 1,
                fillOpacity: 0.2,
                strokeWeight: 1,
                strokeColor: "#555",
                fillColor: "#777"
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
                //fillColor:color,
                strokeWeight: 3,
                strokeColor: "red"
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var dispatch_panel = exports.dispatch_panel = {
    props: ['rows'],
    template: '<div style="position: relative;">\n    <button @click="dispatch()">\u751F\u6210</button>\n    <i class="fa fa-arrow-right"></i>\n    <button @click="submit()">\u786E\u5B9A</button>\n    <i class="fa fa-arrow-right"></i>\n    <!--<button @click="highlight_last_selected()">\u4E0A\u6B21\u751F\u6548\u533A\u57DF</button>-->\n\n    <button @click="open_print()">\u6253\u5370\u9875</button>\n\n    <div class="hr"></div>\n    <div style="height: 1.5em;position: absolute;bottom: 0.5em;">\n        <div v-text="msg"></div>\n        <!--<div v-if="checked.length>0">\u9009\u4E2D\u533A\u57DF\u751F\u6210\u65F6\u95F4\uFF1A<br/><span v-text="checked[0].last_time"></span></div>-->\n    </div>\n\n    <hr/>\n    <div>\n        <input id=\'_all\' type="checkbox" v-model="sel_all"/>\n        <label for="_all" >\u6240\u6709</label>\n\n    </div>\n    <div v-for="row in rows">\n        <input :id=\'row.pk\' type="checkbox" :value="row" v-model="checked"/>\n        <label :for="row.pk" v-text="row.name"></label>\n        <span v-text="row.last_time"></span>\n    </div>\n    <hr/>\n    <ul>\n        <li>\u6697\u8272\uFF1A\u672C\u8F6E\u5F85\u9009\u533A\u57DF\u3002</li>\n        <li>\u7EA2\u8272\uFF1A\u5F53\u524D\u5DE1\u67E5\u533A\u57DF\u3002</li>\n        <li>\u9EC4\u8272\uFF1A\u672C\u8F6E\u5DF2\u5DE1\u67E5\u8FC7\u7684\u533A\u57DF\u3002</li>\n\n    </ul>\n    </div>',
    data: function data() {
        //var date = new Date()
        //var date_str = date.toISOString()
        //var seed = date_str.slice(0,10) // 今天，例如2018-02-07
        return {
            checked: [],
            selected_blocks: [],
            seed: '',
            sel_all: true,
            msg: ''
        };
    },
    mounted: function mounted() {},
    watch: {
        sel_all: function sel_all(val) {
            if (val) {
                this.checked = this.rows;
            } else {
                this.checked = [];
            }
        },
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
        open_print: function open_print() {
            window.open("/print");
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
            var region_pk_list = ex.map(this.checked, function (region) {
                return region.pk;
            });
            var post_data = [{ fun: 'dispatch_block', seed: self.seed, regions_pks: region_pk_list }];
            self.seed = self.seed + 'z';
            ex.post('/_ajax/geoinfo', JSON.stringify(post_data), function (resp) {
                Vue.set(self, 'selected_blocks', resp.dispatch_block);
                //self.selected_blocks= resp.dispatch_block

                //hide_upload()
                var elps = 10 * 1000;
                hide_upload(elps);
                self.msg = '正在查询各个系统，是否冲突，请稍等...';
                setTimeout(function () {
                    self.msg = "";
                }, elps);
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
                        block.poly.setOptions({
                            strokeWeight: 1,
                            strokeColor: "#000000",
                            fillColor: 'yellow'
                        });
                        //self.map_panel.remove_highlight_polygon(block.poly,'yellow')
                    }
                });
            });
        },
        highlight_last_selected: function highlight_last_selected() {
            var self = this;
            ex.each(this.rows, function (row) {
                var last_select_block = ex.findone(row.blocks, { pk: row.last });
                if (last_select_block) {
                    last_select_block.poly.setOptions({
                        strokeWeight: 1,
                        strokeColor: "#000000",
                        fillColor: 'red'
                    });
                    //self.map_panel.remove_highlight_polygon(last_select_block.poly,'green')
                }
            });
        }

    }

};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fullscreen = fullscreen;
function fullscreen() {
    $('#menu').hide();
    $('.map-btn-panel').hide();
    $('#head').hide();
    $('.breadcrumb').hide();
    $('#footer').hide();
    $('.btn-panel').hide();
    $('.tabs-bar').hide();
}
function exit_fullscreen() {
    $('#menu').show();
    $('.map-btn-panel').show();
    $('#head').show();
    $('.breadcrumb').show();
    $('#footer').show();
    $('.btn-panel').show();
    $('.tabs-bar').show();
}

window.fullscreen = fullscreen;
window.exit_fullscreen = exit_fullscreen;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.shot = shot;
ex.load_js('/static/lib/canvas2image.js');

function shot(ele, callback) {

    //var cntElem = $('#j-sec-end')[0];

    var shareContent = ele; // cntElem;//需要截图的包裹的（原生的）DOM 对象
    var width = shareContent.offsetWidth; //获取dom 宽度
    var height = shareContent.offsetHeight; //获取dom 高度
    var canvas = document.createElement("canvas"); //创建一个canvas节点
    var scale = 2; //定义任意放大倍数 支持小数
    canvas.width = width * scale; //定义canvas 宽度 * 缩放
    canvas.height = height * scale; //定义canvas高度 *缩放
    canvas.getContext("2d").scale(scale, scale); //获取context,设置scale
    var opts = {
        scale: scale, // 添加的scale 参数
        canvas: canvas, //自定义 canvas
        // logging: true, //日志开关，便于查看html2canvas的内部执行流程
        width: width, //dom 原始宽度
        height: height,
        useCORS: true // 【重要】开启跨域配置
    };

    html2canvas(shareContent, opts).then(function (canvas) {

        var context = canvas.getContext('2d');
        // 【重要】关闭抗锯齿
        context.mozImageSmoothingEnabled = false;
        context.webkitImageSmoothingEnabled = false;
        context.msImageSmoothingEnabled = false;
        context.imageSmoothingEnabled = false;

        // 【重要】默认转化的格式为png,也可设置为其他格式
        var img = Canvas2Image.convertToJPEG(canvas, canvas.width, canvas.height);

        //document.body.appendChild(img);
        //
        //$(img).css({
        //    "width": canvas.width / 2 + "px",
        //    "height": canvas.height / 2 + "px",
        //}).addClass('f-full');
        callback(img);
    });
}

window.shot = shot;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(8);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(10)(content, {});
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)();
// imports


// module
exports.push([module.i, ".map-btn-panel {\n  width: 20em;\n  margin: 0.5em;\n  background: #ffffff;\n  padding: 0.5em;\n  border: 1px solid #c8c8c8;\n  border-radius: 0.3em; }\n  .map-btn-panel .hr {\n    border: 1px solid #dcdcdc;\n    height: 1px;\n    margin: 0.5em 0; }\n  .map-btn-panel img {\n    max-width: 15em !important; }\n  .map-btn-panel .sortable {\n    padding: 0; }\n  .map-btn-panel textarea {\n    width: 100%; }\n  .map-btn-panel .panel-field {\n    border-bottom: 1px solid #cacaca;\n    padding: 1em 0; }\n", ""]);

// exports


/***/ }),
/* 9 */
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
/* 10 */
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


/***/ })
/******/ ]);