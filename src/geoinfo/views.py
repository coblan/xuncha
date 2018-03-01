# encoding:utf-8
from __future__ import unicode_literals
from __future__ import absolute_import
from django.shortcuts import render,HttpResponse
from .models import BlockGroup,BlockPolygon
from .polygon import poly2dict
from django.utils.timezone import datetime
from .dispatch import dispatch
import json
from helpers.director.decorator import warn_free
from helpers.director.db_tools import to_dict
from django.utils.timezone import datetime
from helpers.base.ldatetime import localstr
# Create your views here.

@warn_free
def forecast(request):
    """
    预测分发区域
    """
    jiezheng = request.GET.get('jiezheng','')
    # now = datetime.now()
    # seed = request.GET.get('seed',)
    group = BlockGroup.objects.get(pk=jiezheng)
    out=[]
    if group.dispatched.last:
        poly = BlockPolygon.objects.get(pk=group.dispatched.last)
        out.append({'time': group.dispatched.last_time.strftime('%Y-%m-%d %H:%M:%S'),
                    'polygon': poly2dict(poly.bounding) } )
    seed=''
    for i in range(2):
        block_pk = dispatch(group, seed)
        block = BlockPolygon.objects.get(pk=block_pk)
        out.append({'polygon': poly2dict(block.bounding)})
        seed+='z'
    return out

def print_page(request):
    regions = []
    for region in BlockGroup.objects.all():
        if region.dispatched:
            try:
                lit_region = BlockPolygon.objects.get(pk =  region.dispatched.last)
                dc = to_dict(lit_region,exclude=['bounding'])
                dc['belong'] = region.name
                dc['last_time']= localstr(region.dispatched.last_time)
                regions.append(dc)
            except BlockPolygon.DoesNotExist:
                print('pk = %s not exist.'%region.dispatched.last)
 
    return render(request,'geoinfo/print_page.html',context={'regions':regions})