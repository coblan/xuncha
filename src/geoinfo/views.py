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
