# encoding:utf-8

def poly2dict(polygon_obj):
    """
    将models.PolygonField对象转换为高德地图能够接受的坐标列表
    
    @polygon_obj: models.PolygonField对象
    
    """
    if polygon_obj:
        polygon_arr = list(polygon_obj.coords[0])
        polygon_arr.pop()
        return polygon_arr
    else:
        return []
