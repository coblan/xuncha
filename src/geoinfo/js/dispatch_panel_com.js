export  var dispatch_panel={
    props:['rows'],
    template:`<div>
    <button @click="dispatch()">生成</button>
    <button @click="submit()">确定</button>
    <!--<button @click="highlight_last_selected()">上次生效区域</button>-->
    <button @click="fit_view()">Fit View</button>
    <div class="hr"></div>
    <div v-for="row in rows">
        <label :for="row.pk" v-text="row.name"></label>
        <input :id='row.pk' type="checkbox" :value="row" v-model="checked"/>
    </div>

    </div>`,
    data:function(){
        var date = new Date()
        var date_str = date.toISOString()
        var seed = date_str.slice(0,10)
        return {
            checked:[],
            selected_blocks:[],
            seed:seed,
        }
    },
    mounted:function(){


    },
    watch:{
        checked:function(new_value,old_value){
            var self=this
            ex.each(new_value,function(value){
                if(!ex.isin(value,old_value)){
                    self.add_row_polygons(value)
                }
            })
            ex.each(old_value,function(value){
                if(!ex.isin(value,new_value)){
                    self.detach_row_polygons(value)
                }
            })
        },
        selected_blocks:function(new_value,old_value){
                var self=this


                ex.each(old_value,function(pair){
                    var group= ex.findone(self.rows,{pk:pair.group})
                    var block= ex.findone(group.blocks,{pk:pair.block})
                    self.map_panel.remove_highlight_polygon(block.poly)
                })

                self.highlight_old_selected()
                self.highlight_last_selected()

                ex.each(new_value,function(pair){
                    var group= ex.findone(self.rows,{pk:pair.group})
                    var block= ex.findone(group.blocks,{pk:pair.block})
                    self.map_panel.highlight_polygon(block.poly)
                })
        }

    },
    methods:{
        init:function(map_panel){
            var self=this
            self.map_panel=map_panel
            //self.map_panel.on_polygon_click(function(poly){
            //    self.map_panel.highlight_polygon(poly)
            //})

            self.checked=self.rows
            Vue.nextTick(function(){
                self.highlight_old_selected()
                self.highlight_last_selected()
                self.fit_view()
            })


        },
        fit_view:function(){
            this.map_panel.map.setFitView();
        },
        add_row_polygons:function(row){
            var self=this
            ex.each(row.blocks,function(block){
                if(!block.poly){
                    var poly = self.map_panel.insert_polygon(block.bounding)
                    block.poly=poly
                    poly.block=block
                }else{
                    self.map_panel.add_polygon(block.poly)
                }
            })

        },
        detach_row_polygons:function(row){
            var self=this
            ex.each(row.blocks,function(block){
                self.map_panel.detach_polygon(block.poly)
            })
        },
        dispatch:function(){
            var self=this
            show_upload()
            var post_data=[{fun:'dispatch_block',seed:self.seed}]
            self.seed = self.seed +'0'
            ex.post('/_ajax/geoinfo',JSON.stringify(post_data),function(resp){
                Vue.set(self,'selected_blocks',resp.dispatch_block)
                //self.selected_blocks= resp.dispatch_block

                hide_upload(30*1000)
            })
        },
        submit:function(){

            var post_data=[{fun:'submit_block',blocks:this.selected_blocks}]
            ex.post('/_ajax/geoinfo',JSON.stringify(post_data),function(resp){
                //alert(resp.submit_block)
                location.reload()

            })
        },
        highlight_old_selected:function(){
            var self=this
            ex.each(this.rows,function(row){
                ex.each(row.blocks,function(block){
                    if(ex.isin(block.pk,row.old_selected)){
                        self.map_panel.remove_highlight_polygon(block.poly,'yellow')
                    }
                })
            })
        },
        highlight_last_selected:function(){
            var self=this
            ex.each(this.rows,function(row){
                var last_select_block=ex.findone(row.blocks,{pk:row.last})
                if(last_select_block){
                    self.map_panel.remove_highlight_polygon(last_select_block.poly,'green')
                }
            })
        }


    }

}