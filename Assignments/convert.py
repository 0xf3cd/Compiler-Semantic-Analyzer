import xlwt

f = open('./Production.txt', 'r')
lines = f.readlines()
prod = []
for eachLine in lines:
    if eachLine == '\n':
        continue
    prod.append(eachLine)

# 创建 xls 文件对象
wb = xlwt.Workbook()
# 新增一个表单
sh = wb.add_sheet('A Test Sheet')

count = 0
for p in prod:
    left_right = p.split(' -> ', 1)
    sh.write(count, 0, left_right[0])
    right = left_right[1].split(' $', 1)
    if(right[0] == '蔚'):
        right[0] = 'ε'
    sh.write(count, 1, right[0])
    print(left_right[0], right[0])
    count += 1

wb.save('Semantic.xls')