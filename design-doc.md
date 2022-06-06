# Mentor Tree Design Doc

This data visualization design consists of 2 major parts: `preprocessor.js` and `tree.js`

## Preprocessor

- **Objective**: 
    1. Map "children_num" to "weight", for the later data visualization
    2. Add new color palette to "gender_color"

- **File**: `preprocessor.js`

- **Steps**:
    1. Use the recursive function "getTreeData" to traverse all the researchers. When traversing the current researcher, do the following 3 moves, assigning it a new gender_color,     
     

        a. traverse all person and assign new colors to their gender [man, woman, unknown]
        b. find all unique research areas, store them inside a set
        c. store researcher's name and their coresponding mentee number inside a map

    2. calculate some important values

        a. sum = suming up all the mentee number inside the map
        b. max = the maximum number inside the map
        c. min = the minimum number inside the map
        d. range_mean = (max - min) / 2

    3.  oversampling/undersampling (for loop)

        reason for doing this is that when plotting the trees using the original weights, some mentor have too many mentees, but other may have very few, make the tree look bad :)
        show some math equation below:

        """
        weight = w
        children_num = cn
        range_mean = rm

        Original equation:
        w_i = cn_i / sum

        New equation:
        [I tried serveral ways to calculate the weight while preserve the most information about the children_num distribution, this equation yields the best result]

        w_i = [cn_i - |cn_i - rm| * 0.1] / sum ,(cn_i > rm)

              cn_i / sum, (cn_i = rm)

              [cn_i + |cn_i - rm| * 0.1] / sum ,(cn_i < rm)

        """

    3. iterate the map and calculate the weight of each person using the equation above,
        replace children_num with weight inside the map


    4. addWeight(recursive function)
        a. traverse all the researchers and add the calculated weight to each of them

======================

2. Tree Implementation

   Objective: plot the tree using p5js

   File: tree.js, index.html

   Method:

   1. assignColor
      a. hsb color system uses the value 0 from 360 to represent different colors, the color starts with red and ends with red, which might confuse users, so I took the value from 0 to 340 to avoid
      the cirlce. then I equally divided the value(340) by the number of research areas, and assigned a unique hue value to each of the research area. Finally, I store the research area name and
      their coresponding hue value inside a colorMap
   2. drawLegend
      a. We can't plot all the legends in one single column, because that's going to exceed the height of the screen, so I choose to plot them in 3 columns
      b. The basic idea is to iterate over the colorMap, which is consisted of research name and get the research area and its corrseponding color and plot them
   3. buildTree (recursive function)
      a. first we need to translate our starting point to (width/2, height), which is the mid-bottom point on the screen
      b. default branch is defined by 2 vectors, "begin"(0,0) and "end"(0,-100).
      c. when it's traversing the current branch, it will first plot all its children, by changing the end

      """
      male tilting angle = -PI/(coefficient - degreeA)

      female tilting angle = PI/(coefficient - degreeB)
      """

   4. drawLeaf