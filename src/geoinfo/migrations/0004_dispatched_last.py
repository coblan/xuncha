# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2018-01-11 08:50
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('geoinfo', '0003_auto_20180111_1625'),
    ]

    operations = [
        migrations.AddField(
            model_name='dispatched',
            name='last',
            field=models.CharField(blank=True, max_length=30, verbose_name='\u4e0a\u6b21\u9009\u4e2d'),
        ),
    ]
