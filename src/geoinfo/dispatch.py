# encoding:utf-8

from .models import BlockGroup,Dispatched
import random

def dispatch(group,seed):
    if not hasattr(group,'dispatched'):
        Dispatched.objects.create(group=group)
    can_select=_get_can_select(group)
    return _random_select_block(can_select,seed)

def _get_can_select(group):
    all_block = set([x.pk for x in group.blocks.all()])
    old_selected = set(group.dispatched.blocks)
    can_select=all_block - old_selected
    
    if not can_select:
        group.dispatched.blocks=[]
        group.dispatched.save()
        can_select=all_block
    return list(can_select)
        
def _random_select_block(can_select,seed):   
    random.seed(seed)
    return random.choice(can_select)

