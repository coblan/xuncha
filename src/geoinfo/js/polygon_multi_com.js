export class PolygonGroupController{
    constructor(){
        this.items=[]
        this.crt_row={}
    }
    set_drawer(drawer){
        this.drawer=drawer
    }
    set_group(group_pk){
        this.group_pk=group_pk
    }
    get_items(){
        var self=this
        var post_data=[{fun:'block_group_items',group_pk:this.group_pk}]
        ex.post('/_ajax/geoinfo',JSON.stringify(post_data),function(resp){
            ex.each(resp.block_group_items,function(row){
                //self.insert(item)
                var poly = drawer.insert_polygon(row.bounding)
                self.add_poly_2_row(row,poly)
                self.items.push(row)
            })
            map.setFitView();
        })
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
    new_row(){
        var row={
            name:'未命名',
            desp:'描述',
            bounding:null,
        }
        this.items.push(row)
        this.crt_row=row
    }
    add_poly_2_row(row,poly){
        var self=this
        row.poly_bounding = poly
        poly.on('click',function(){
            self.set_crt_polyon_row(row)
        })
    }
    set_crt_polyon_row(polygon_row){

        if( this.crt_row != polygon_row){
            if(this.crt_row.poly_bounding){
                this.crt_row.poly_bounding.setOptions({fillColor:'black'})
            }
            this.crt_row=polygon_row
            this.crt_row.poly_bounding.setOptions({fillColor:'red'})
        }
    }
}




export var polygon_multi_btn_panel={
    props:['crt_row'],
    data:function(){

      return {
          editing:false
      }
    },
    template:`<div style="float: right;">
                <button v-show="!editing" @click="start_edit()">编辑</button>
                <button v-show="editing" @click="editing =false">保存</button>
                <button v-show="editing" @click="fallback()">取消</button>
                <button v-show="!editing" @click="new_row()">新建</button>

                <button v-show="!editing" @click="remove()">移除</button>
                <button v-show="!editing" @click="del()">删除</button>
                <div>
                <div>
                    <label for="">名字</label>
                    <span v-if="!editing" v-text="crt_row.name"></span>
                    <input v-else type="text" v-model="crt_row.name"/>
                </div>
                <div>
                     <label for="">描述</label>
                     <span v-if="!editing" v-text="crt_row.desp"></span>
                    <textarea v-else name="" id="" cols="30" rows="10" v-model="crt_row.desp"></textarea>
                </div>
                <button v-show="editing" @click="edit_poly()">编辑多边形</button>
                <button v-show="editing" @click="close_poly()">关闭编辑</button>
                </div>
     </div>`,


    methods:{
        new_row:function(){
            this.$emit('new_row')
            this.editing=true
        },
        start_edit:function(){
            this.editing=true
            this.fallback_cache = {
                name: this.crt_row.name,
                desp: this.crt_row.desp,
                oldpath : ex.map(this.crt_row.bounding ,function(pos){
                    return [pos.lng,pos.lat]
                })
            }
        },
        fallback:function(){
            //ex.assign(this.crt_row,this.fallback_cache)
            this.crt_row.name=this.fallback_cache.name
            this.crt_row.desp=this.fallback_cache.desp

            // 因为高德的Polygon直接操作opiotns设置的array属性，
            // bounding 与 poly_bounding 的数据应该一致，所以有下面两行
            this.crt_row.bounding=this.fallback_cache.oldpath
            this.crt_row.poly_bounding.setPath(this.crt_row.bounding)


            this.close_poly()
            this.editing=false
        },
        _create_poly:function(){
            var self=this
            drawer.create_polygon(function(polygon){
                var poly_obj =  drawer.insert_polygon(polygon)
                controller.add_poly_2_row(self.crt_row,poly_obj)
                drawer.edit_polygon(poly_obj)
            });
        },
        edit_poly:function(){
            var self=this
            if(!this.crt_row.poly_bounding){
                self._create_poly()
            }else{
                var poly_obj = this.crt_row.poly_bounding
                drawer.edit_polygon(poly_obj)
            }

        },
        close_poly:function(){
            drawer.close_polygon()

        }
    }
}