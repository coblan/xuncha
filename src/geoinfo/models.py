# encoding:utf-8

from __future__ import unicode_literals

# from django.db import models
from django.contrib.gis.db import models
from django.contrib.gis.geos import Point
from helpers.base.jsonfield import JsonField
# Create your models here.

class BlockPolygon(models.Model):
    name=models.CharField('名字',max_length=300)
    desp=models.TextField(verbose_name='描述',blank=True)
    # display=models.PolygonField(verbose_name='显示多边形',null=True,blank=True)
    bounding=models.PolygonField(verbose_name='探测多边形',null=True,blank=True)
    shot = models.CharField('截图',max_length=500,blank=True)
    
    def __unicode__(self):
        return self.name
    
class BlockGroup(models.Model):
    name = models.CharField('分组名称',max_length=300)
    blocks=models.ManyToManyField(BlockPolygon,verbose_name='包含区域',blank=True)
    
    def __init__(self,*args,**kw):
        super(self.__class__,self).__init__(*args,**kw)
        if self.pk and not hasattr(self,'dispatched'):
            Dispatched.objects.create(group=self)
    
    def __unicode__(self):
        return self.name

class Dispatched(models.Model):
    # blocks=models.ManyToManyField(BlockPolygon,verbose_name='包含区域',blank=True)
    group=models.OneToOneField(BlockGroup, on_delete=models.CASCADE)
    blocks=JsonField(verbose_name='已选择区域',default=[])
    last=models.CharField('上次选中',max_length=30,blank=True)
    last_time = models.DateTimeField('上次生成时间',auto_now=True)