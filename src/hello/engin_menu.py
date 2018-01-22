# encoding:utf-8

from __future__ import unicode_literals

from helpers.director.engine import BaseEngine,page,fa,page_dc

class PcMenu(BaseEngine):
    url_name='zhaoxiang'
    menu=[
        {'label':'指派巡查区域','url':page('geoinfo.dispatch'),'icon':fa('fa-map-o')},
        # {'label':'GIS区域','url':page('geoinfo.blockpolygon'),'icon':fa('fa-map-o')},
        {'label':'区域组','url':page('geoinfo.blockgroup'),'icon':fa('fa-map-o')}
    ]

PcMenu.add_pages(page_dc)