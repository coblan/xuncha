# encoding:utf-8

from __future__ import unicode_literals

# from django.db import models
from django.contrib.gis.db import models
from django.contrib.gis.geos import Point

# Create your models here.

class BlockPolygon(models.Model):
    name=models.CharField('名字',max_length=300)
    desp=models.TextField(verbose_name='描述',blank=True)
    # display=models.PolygonField(verbose_name='显示多边形',null=True,blank=True)
    bounding=models.PolygonField(verbose_name='探测多边形',null=True,blank=True)
    
    def __unicode__(self):
        return self.name
    
class BlockGroup(models.Model):
    name = models.CharField('分组名称',max_length=300)
    blocks=models.ManyToManyField(BlockPolygon,verbose_name='包含区域',blank=True)
