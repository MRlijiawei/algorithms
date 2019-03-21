#############################
# 1.判断变量的类型isinstance #
#############################
def typeof(variate):
    type=None
    if isinstance(variate,int):
        type = "int"
    elif isinstance(variate,str):
        type = "str"
    elif isinstance(variate,float):
        type = "float"
    elif isinstance(variate,list):
        type = "list"
    elif isinstance(variate,tuple):
        type = "tuple"
    elif isinstance(variate,dict):
        type = "dict"
    elif isinstance(variate,set):
        type = "set"
    return type
# 返回变量类型
def getType(variate):
    arr = {"int":"整数","float":"浮点","str":"字符串","list":"列表","tuple":"元组","dict":"字典","set":"集合"}
    vartype = typeof(variate)
    if not (vartype in arr):
        return "未知类型"
    return arr[vartype]
    
#判断变量是否为整数
money=120
print("{0}是{1}".format(money,getType(money)))
#判断变量是否为字符串
money="120"
print("{0}是{1}".format(money,getType(money)))
money=12.3
print("{0}是{1}".format(money,getType(money)))
#判断变量是否为列表
students=['studentA']
print("{0}是{1}".format(students,getType(students)))
#判断变量是否为元组
students=('studentA','studentB')
print("{0}是{1}".format(students,getType(students)))
#判断变量是否为字典
dictory={"key1":"value1","key2":"value2"}
print("{0}是{1}".format(dictory,getType(dictory)))
#判断变量是否为集合
apple={"apple1","apple2"}
print("{0}是{1}".format(apple,getType(apple)))

#######################
# 2.判断变量的类型type #
#######################
def typeof(variate):
    type1 = ""
    if type(variate) == type(1):
        type1 = "int"
    elif type(variate) == type("str"):
        type1 = "str"
    elif type(variate) == type(12.3):
        type1 = "float"
    elif type(variate) == type([1]):
        type1 = "list"
    elif type(variate) == type(()):
        type1 = "tuple"
    elif type(variate) == type({"key1":"123"}):
        type1 = "dict"
    elif type(variate) == type({"key1"}):
        type1 = "set"
    return type1
# 返回变量类型
def getType(variate):
    arr = {"int":"整数","float":"浮点","str":"字符串","list":"列表","tuple":"元组","dict":"字典","set":"集合"}
    vartype = typeof(variate)
    if not (vartype in arr):
        return "未知类型"
    return arr[vartype]
    
#判断变量是否为整数
money=120
print("{0}是{1}".format(money,getType(money)))
#判断变量是否为字符串
money="120"
print("{0}是{1}".format(money,getType(money)))
money=12.3
print("{0}是{1}".format(money,getType(money)))
#判断变量是否为列表
students=['studentA']
print("{0}是{1}".format(students,getType(students)))
#判断变量是否为元组
students=('studentA','studentB')
print("{0}是{1}".format(students,getType(students)))
#判断变量是否为字典
dictory={"key1":"value1","key2":"value2"}
print("{0}是{1}".format(dictory,getType(dictory)))
#判断变量是否为集合
apple={"apple1","apple2"}
print("{0}是{1}".format(apple,getType(apple)))