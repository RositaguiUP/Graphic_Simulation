# Author: Rosita Aguirre Plascencia
# Subject: Graphic Simulation
# Id: 0225352 

# A simple Python/matplotlib implementation of Conway's Game of Life.

# Run:     python .\conway.py  <file name> <output file name>
# Example: python .\conway.py  .\Test01.in .\Test01.out

import sys, argparse
import numpy as np
import matplotlib.pyplot as plt 
import matplotlib.animation as animation
from datetime import date

first = True

# Returns a list of pattern arrays
def definePatterns():
    patterns = {
        "Block  ":  [np.array([[0,0,0,0],[0,1,1,0],[0,1,1,0],[0,0,0,0]])],
        "Beehive":  [np.array([[0,0,0,0,0,0],[0,0,1,1,0,0],[0,1,0,0,1,0],[0,0,1,1,0,0],[0,0,0,0,0,0]])],
        "Loaf   ":  [np.array([[0,0,0,0,0,0],[0,0,1,1,0,0],[0,1,0,0,1,0],[0,0,1,0,1,0],[0,0,0,1,0,0],[0,0,0,0,0,0]])],
        "Boat   ":  [np.array([[0,0,0,0,0],[0,1,1,0,0],[0,1,0,1,0],[0,0,1,0,0],[0,0,0,0,0]])],
        "Tub    ":  [np.array([[0,0,0,0,0],[0,0,1,0,0],[0,1,0,1,0],[0,0,1,0,0],[0,0,0,0,0]])],
        
        "Blinker":  [np.array([[0,0,0],[0,1,0],[0,1,0],[0,1,0],[0,0,0]]),
                        np.array([[0,0,0,0,0],[0,1,1,1,0],[0,0,0,0,0]])],
        "Toad   ":   [np.array([[0,0,0,0,0,0],[0,0,0,1,0,0],[0,1,0,0,1,0],[0,1,0,0,1,0],[0,0,1,0,0,0],[0,0,0,0,0,0]]),
                        np.array([[0,0,0,0,0,0],[0,0,1,1,1,0],[0,1,1,1,0,0],[0,0,0,0,0,0]])],
        "Beacon ":   [np.array([[0,0,0,0,0,0],[0,1,1,0,0,0],[0,1,1,0,0,0],[0,0,0,1,1,0],[0,0,0,1,1,0],[0,0,0,0,0,0]]),
                        np.array([[0,0,0,0,0,0],[0,1,1,0,0,0],[0,1,0,0,0,0],[0,0,0,0,1,0],[0,0,0,1,1,0],[0,0,0,0,0,0]])],
        
        "Glider ":   [np.array([[0,0,0,0,0],[0,0,1,0,0],[0,0,0,1,0],[0,1,1,1,0],[0,0,0,0,0]]),
                        np.array([[0,0,0,0,0],[0,1,0,1,0],[0,0,1,1,0],[0,0,1,0,0],[0,0,0,0,0]]),
                        np.array([[0,0,0,0,0],[0,0,0,1,0],[0,1,0,1,0],[0,0,1,1,0],[0,0,0,0,0]]),
                        np.array([[0,0,0,0,0],[0,1,0,0,0],[0,0,1,1,0],[0,1,1,0,0],[0,0,0,0,0]])],
        "L-w spc":   [np.array([[0,0,0,0,0,0,0],[0,1,0,0,1,0,0],[0,0,0,0,0,1,0],[0,1,0,0,0,1,0],[0,0,1,1,1,1,0],[0,0,0,0,0,0,0]]),
                        np.array([[0,0,0,0,0,0,0],[0,0,0,1,1,0,0],[0,1,1,0,1,1,0],[0,1,1,1,1,0,0],[0,0,1,1,0,0,0],[0,0,0,0,0,0,0]]),
                        np.array([[0,0,0,0,0,0,0],[0,0,1,1,1,1,0],[0,1,0,0,0,1,0],[0,0,0,0,0,1,0],[0,1,0,0,1,0,0],[0,0,0,0,0,0,0]]),
                        np.array([[0,0,0,0,0,0,0],[0,0,1,1,0,0,0],[0,1,1,1,1,0,0],[0,1,1,0,1,1,0],[0,0,0,1,1,0,0],[0,0,0,0,0,0,0]])],
    }
    return patterns

# Returns a list with the total times per pattern found
def detectPatterns(grid, patternsTypes):
    dtctPtrns = {}
    for p in patternsTypes:
        tot = 0
        for pattern in patternsTypes.get(p):
            h, w = pattern.shape
            for i in range(grid.shape[0] - h + 1):
                for j in range(grid.shape[1] - w + 1):
                    if np.all(grid[i:i+h, j:j+w] == pattern):
                        tot += 1
        dtctPtrns[p] = tot
    return dtctPtrns

# Updates each frame
def update(frameNum, img, grid, width, height, patterns, outptFile):
    global first
    if first:
        first = False
        return
    else:
        # Implement the rules of Conway's Game of Life
        newGrid = rules(grid.copy(), grid.copy(), width, height)

        # update data
        img.set_data(newGrid)
        grid[:] = newGrid[:]

        # check for each pattern in the grid
        printIteration(outptFile, detectPatterns(grid, patterns), frameNum)
        return img,

# Returns a gris with the appliyed rules for each cell
def rules(newgrid, grid, width, height):
    for i in range(width):
        for j in range(height):
            sum = 0
            for a in range(-1,2):
                for b in range(-1,2):
                    if not (a == 0 and b == 0):
                        ip = a + i
                        jp = b + j
                        if ip >= 0 and ip < width and jp >= 0 and jp < height:
                            sum += grid[ip][jp]
            if grid[i][j] == 1:
                if not(sum == 2 or sum == 3):
                    newgrid[i][j] = 0
            elif sum == 3:
                newgrid[i][j] = 1
    return newgrid

# Initial text for the output
def printOutput(outptFile, size):
    with open(outptFile, "w+") as nf:
        simDate = f"Simulation at {date.today()}"
        simSize = f"\nUniverse size {size[0]}x{size[1]}"
        nf.write(simDate)
        nf.write(simSize)

# Print each iteration on the output file
def printIteration(outptFile, dtctPtrns, iterN):
    with open(outptFile, "a") as nf:
        iter = f"\n\nIteration: {iterN + 1}"
        line = "\n------------------------------"
        div  = "\n|----------+-------+---------|"
        header = "\n|          | Count | Percent |"
        nf.write(f"{iter}{line}{header}{div}")
        tot = 0
        for p in dtctPtrns:
            tot += dtctPtrns.get(p)
        percentages = [dtctPtrns.get(p) * 100 / tot if tot > 0 else 0 for p in dtctPtrns]
        [nf.write(f"\n| {p}  | {dtctPtrns.get(p)}     | {int(percentages[i])}       |") for i,p in enumerate(dtctPtrns)]
        
        totL = f"\n| Total    | {tot}     |         |"
        nf.write(f"{div}{totL}{line}")

# main() function
def main():
    # Command line args are in sys.argv[1], sys.argv[2] ..
    # sys.argv[0] is the script name itself and can be ignored
    # parse arguments
    parser = argparse.ArgumentParser(description="Runs Conway's Game of Life system.py.")
    # Gets input and output file's names
    inptFile  = sys.argv[1]
    outptFile = sys.argv[2] if len(sys.argv) == 3 else "output.out"

    # File to read
    with open(inptFile, "r") as f:

        # To analyze each character of each line on the file
        for i,l in enumerate(f):
            if i == 0:
                # set grid size
                size  = (int(l.split()[0]), int(l.split()[1]))
                
                # declare grid
                grid  = np.array([[0 for j in range(size[0])] for i in range(size[1])])
                cells = [0] * grid.size
            elif i == 1:
                if len(l.split()) <= 2 and int(l) >= 200:
                    gnrtns = int(l)
                else:
                    gnrtns = 200
            else:
                coords = [int(e) for e in l.split()]
                grid[coords[0]][coords[1]] = 1
                cells[coords[0] + coords[1] * size[1]] = 1
        
    # set animation update interval
    updateInterval = 20

    # set patterns
    patterns = definePatterns()

    # History for the output
    printOutput(outptFile, size)

    # set up animation
    fig, ax = plt.subplots()
    img = ax.imshow(grid, interpolation='nearest')
    ani = animation.FuncAnimation(fig, update, fargs=(img, grid, size[0], size[1], patterns, outptFile),
                                  frames = gnrtns,
                                  interval=updateInterval,
                                  save_count=50,
                                  repeat=False)

    plt.show()

# call main
if __name__ == '__main__':
    main()