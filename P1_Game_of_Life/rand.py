import random
file = open("input6.in","a")
for p in range(1000):
    y = random.randint(1,19)
    x = random.randint(1,19)
    file.write(str(y)+" "+str(x)+"\n")
file.close()
