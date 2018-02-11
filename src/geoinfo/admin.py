# encoding:utf-8

from __future__ import unicode_literals
from django.contrib import admin
from helpers.director.db_tools import to_dict
from helpers.director.shortcut import ModelTable,TablePage,page_dc,FormPage,ModelFields,model_dc,RowSort,RowFilter,RowSearch,permit_list,has_permit,TabGroup
# Register your models here.
from .models import BlockPolygon,BlockGroup
from django.contrib.gis.geos import Polygon
import json
from .polygon import dict2poly,poly2dict
from helpers.director.container import evalue_container
class BlockPolygonTablePage(TablePage):
    class BlockPolygonTable(ModelTable):
        model=BlockPolygon
        exclude=[]
        
        def dict_row(self, inst):
           
            dc={
                # 'display':bool (inst.display),
                'bounding':bool ( inst.bounding)
            }
            return dc
        
    
    tableCls = BlockPolygonTable

class BlockPolygonFormPage(FormPage):
    class BlockPolygonForm(ModelFields):
        class Meta:
            model=BlockPolygon
            exclude=[]
        
        def __init__(self, dc={}, pk=None, crt_user=None, nolimit=False,*args,**kw):
            # if 'display' in dc.keys():
                # dc['display'] = self._adapt_polygon_dict(dc['display'])
            
            if 'group' in dc.keys():
                self._group= BlockGroup.objects.get(pk=dc['group'])
            if 'bounding' in dc.keys():
                dc['bounding'] = dict2poly(dc['bounding']) #  self._adapt_polygon_dict(dc['bounding'])
            super(self.__class__,self).__init__(dc,pk,crt_user,nolimit,*args,**kw)
        
        # def _adapt_polygon_dict(self,polygon_str):
            # if polygon_str:
                # polygon_arr = json.loads(polygon_str)
                # if polygon_arr[-1] != polygon_arr[0]:
                    # polygon_arr.append(polygon_arr[0])
                # return Polygon(polygon_arr)
            # else:
                # return None
                    
            # display= dc.get('display',None)
            # if display:
                # display= json.loads(display)
                # if display[-1] !=display[0]:
                    # display.append(display[0])
                # dc['display']= Polygon(display)            
            # return dc
        
        def get_row(self):
            # display = self._adapt_polygon_obj(self.instance.display)
            bounding = poly2dict(self.instance.bounding) #  self._adapt_polygon_obj(self.instance.bounding)
            dc={
                # 'display':display,
                'bounding':bounding
            }
            return to_dict(self.instance,filt_attr=dc)
        
        # def _adapt_polygon_obj(self,polygon_obj):
            # if polygon_obj:
                # polygon_arr = list(polygon_obj.coords[0])
                # polygon_arr.pop()
                # return json.dumps(polygon_arr)
            # else:
                # return ''
        
        def dict_head(self, head):
            if head['name'] in ['display','bounding']:
                head['type']='polygon-input'
        
        def save_form(self):
            inst = super(self.__class__,self).save_form()
            if hasattr(self,'_group'):
                self._group.blocks.add(inst)
            return inst
            
        
            
    fieldsCls = BlockPolygonForm
    template='geoinfo/blockpolygon_form.html'

class BlockGroupTablePage(TablePage):
    class BlockGroupTable(ModelTable):
        model=BlockGroup
        exclude=[]
        
        def dict_row(self, inst):
            return {
                'blocks':';'.join( [unicode(b) for b in inst.blocks.all()])
            }
    
    tableCls=BlockGroupTable
    template='geoinfo/blockgroup.html'

class BlockGroupFormPage(TabGroup):
    
    class BlockGroupFormPage_normal(FormPage):
        template='geoinfo/blockgroup_form_norm.html'
        class BlockGroupForm(ModelFields):
            class Meta:
                model=BlockGroup
                exclude=['blocks']        
        fieldsCls=BlockGroupForm
    
    class BlockGroupFormPage_map(FormPage):
        class BlockGroupForm(ModelFields):
            class Meta:
                model=BlockGroup
                exclude=[]        
        fieldsCls = BlockGroupForm
        template = 'geoinfo/blockgroup_map_form.html'
    
    tabs=[{'name':'blockgroup_normal','label':'分组信息','page_cls':BlockGroupFormPage_normal},
          {'name':'blockgroup_map','label':'地图编辑','page_cls':BlockGroupFormPage_map}
          ]
    
    def __init__(self, request):
        self.pk = request.GET.get('pk')
        super(self.__class__,self).__init__(request)
        
    
    def get_tabs(self):
        if not self.pk:
            return evalue_container( [self.tabs[0],])
        else:
            return super(self.__class__,self).get_tabs()
    
class BlockGroupDispatchPage(TablePage):
    class BlockGroupTable(ModelTable):
        model=BlockGroup
        exclude=[]
        
        def dict_row(self, inst):
            block_list=[]
            for block in inst.blocks.all():
                bounding = poly2dict(block.bounding)
                block_list.append(to_dict(block,filt_attr={'bounding':bounding}))
            old_selected= inst.dispatched.blocks #[x.pk for x in inst.dispatched.blocks.all()]
            dc={
                'blocks':block_list,
                'old_selected':old_selected,
                'last':inst.dispatched.last,
                'last_time':inst.dispatched.last_time.strftime('%Y-%m-%d %H:%M:%S')
            }
            return dc
                
            # return {
                # 'blocks':[to_dict(x,form=True) for x in inst.blocks.all()]
            # }
        
    
    tableCls=BlockGroupTable
    template='geoinfo/blockgroup_dispatch.html'    

model_dc[BlockPolygon]={'fields':BlockPolygonFormPage.BlockPolygonForm}
model_dc[BlockGroup]={'fields':BlockGroupFormPage.BlockGroupFormPage_normal.BlockGroupForm}

page_dc.update({
    'geoinfo.blockpolygon':BlockPolygonTablePage,
    'geoinfo.blockpolygon.edit':BlockPolygonFormPage,
    
    'geoinfo.blockgroup':BlockGroupTablePage,
    'geoinfo.blockgroup.edit':BlockGroupFormPage,
    
    'geoinfo.dispatch':BlockGroupDispatchPage,
})