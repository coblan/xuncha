import * as polygon_com from './polygon_com.js'
import {polygon_multi_btn_panel,PolygonGroupController} from  './polygon_multi_com.js'
Vue.component('polygon-input',polygon_com.ploygon_editor)
Vue.component('polygon-multi-btn-panel',polygon_multi_btn_panel)

window.PolygonGroupController=PolygonGroupController