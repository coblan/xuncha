# encoding:utf-8

from __future__ import unicode_literals

from helpers.director.engine import BaseEngine,page,fa,page_dc
from helpers.maintenance.update_static_timestamp import js_stamp

class PcMenu(BaseEngine):
    url_name='zhaoxiang'
    menu=[
        {'label':'指派巡查区域','url':page('geoinfo.dispatch'),'icon':fa('fa-map-o')},
        # {'label':'GIS区域','url':page('geoinfo.blockpolygon'),'icon':fa('fa-map-o')},
        {'label':'区域组','url':page('geoinfo.blockgroup'),'icon':fa('fa-map-o')}
    ]
    
    def custome_ctx(self, ctx):
        ctx['js_stamp']=js_stamp
        ctx['table_fun_config'] ={
            'detail_link': '详情', #'<i class="fa fa-info-circle" aria-hidden="true" title="查看详情"></i>'#,
        }
        return ctx  
    

PcMenu.add_pages(page_dc)