export  var dispatch_panel={
    props:['rows'],
    template:`<div>
    <button @click="dispatch()">生成</button>
    <i class="fa fa-arrow-right"></i>
    <button @click="submit()">确定</button>
    <i class="fa fa-arrow-right"></i>
    <!--<button @click="highlight_last_selected()">上次生效区域</button>-->

    <button @click="open_print()">打印页</button>

    <div class="hr"></div>
    <div>上次生成派遣区域时间：<br/><span v-text="rows[0].last_time"></span></div>
    <hr/>
    <div>
         <label for="_all" >所有</label>
        <input id='_all' type="checkbox" v-model="sel_all"/>
    </div>
    <div v-for="row in rows">
        <label :for="row.pk" v-text="row.name"></label>
        <input :id='row.pk' type="checkbox" :value="row" v-model="checked"/>
    </div>
    <hr/>
    <ul>
        <li>暗色：本轮待选区域。</li>
        <li>红色：当前巡查区域。</li>
        <li>黄色：本轮已巡查过的区域。</li>

    </ul>
    </div>`,
    data:function(){
        //var date = new Date()
        //var date_str = date.toISOString()
        //var seed = date_str.slice(0,10) // 今天，例如2018-02-07
        return {
            checked:[],
            selected_blocks:[],
            seed:'',
            sel_all:true,
        }
    },
    mounted:function(){


    },
    watch:{
        sel_all:function(val){
            if(val){
                this.checked=this.rows
            }else{
                this.checked=[]
            }
        },
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
        open_print:function(){
            window.open("/print");
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
            self.seed = self.seed +'z'
            ex.post('/_ajax/geoinfo',JSON.stringify(post_data),function(resp){
                Vue.set(self,'selected_blocks',resp.dispatch_block)
                //self.selected_blocks= resp.dispatch_block

                //hide_upload()
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
                        block.poly.setOptions({
                            strokeWeight:1,
                            strokeColor: "#000000",
                            fillColor: 'yellow',
                        })
                        //self.map_panel.remove_highlight_polygon(block.poly,'yellow')
                    }
                })
            })
        },
        highlight_last_selected:function(){
            var self=this
            ex.each(this.rows,function(row){
                var last_select_block=ex.findone(row.blocks,{pk:row.last})
                if(last_select_block){
                    last_select_block.poly.setOptions({
                        strokeWeight:1,
                        strokeColor: "#000000",
                        fillColor: 'red',
                    })
                    //self.map_panel.remove_highlight_polygon(last_select_block.poly,'green')
                }
            })
        },

    }

}