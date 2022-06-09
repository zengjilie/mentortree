# Mentor Tree Design Doc

This data visualization design consists of 2 major parts: `preprocessor.js` and `tree.js`

## Preprocessor

- **Objective**: 
1. Map "children_num" to "weight" for each researcher. Perparation for later data visualization
2. Add new color palette to "gender_color"

- **File**: `preprocessor.js`

- **Steps**
1. Use the recursive function "getTreeData" to traverse all researchers. We need to create a "set"to store all research areas, and a "map" to store all researchers' names and their corresponding children number. When traversing the current researcher, do the following 3 operations. Firstly, assigning it a new gender_color. Second, add its research area to the "set". Third, add the researcher's name and its children number to the "map".

2. Calculate the weight for each researcher 
```
sum = all children number
max = maximum children number
min = minimum children number
range_mean = (max - min) / 2
```

3. Oversampling/Undersampling

If we plot each researcher using their "original" weights without doing oversampling/undersampling. It will cause a drastic weight difference between researchers who have very high children number and researchers whoes children number are low. The proportion of the "mentor tree" will be extremly imbalanced and weird. To avoid this situation, we need to performe oversampling/undersampling on each researcher's children number.

```
// Acronym

weight = w
children number = cn
range_mean = rm
i = researcher i (just a random researcher)

// Original Weight

w_i = cn_i / sum

// New Euqation

w_i = [cn_i - |cn_i - rm| * 0.1] / sum ,(cn_i > rm) undersampling

      cn_i / sum, (cn_i = rm)

      [cn_i + |cn_i - rm| * 0.1] / sum ,(cn_i < rm) oversampling

I tried serveral approaches to calculate the weight, so far this is the best
``` 
4. Iterate the "map" and replace the children number with the newly calculated weight using the new equation. Traverse all the researchers again and add the "weight" attribute to each of them.


## Tree Implementation

- **Objective**: plot the tree using p5js

- **File**: `tree.js` 

- **Steps**

1. We will use the HSB color system to assign each research area a unique hue value. The hue value will range from 0 to 340. We didn't use hue value 360 because the color around 360 and 0 are similar, it's very easy to confuse the viewer.

2. p5.js is a JavaScript library for creative coding, it's a highly customizable and versatile tool to create any type of data visualization. We will use it to plot the mentor tree.

3. Firstly, we need to move the starting point to the bottom center of the screen. Because the value in y axis gets bigger when it's closer to the bottom, so we need to subtract the branch length every time to mimic the direction of growing up. Second, we need to traverse all the researchers using a recursive function. When we are traversing the current researcher, if the researcher's gender is "unknown" it will stay the same direction as it's parent researcher, if the gender is "female", its end point will rotate R * i degrees towards the right of its parent researcher's direction, i is the number of "female" researchers that has already been traversed with the same parent researcher. If the gender is "male", its end point will rotate R * j degrees towards the left of its parent researcher's direction where j is the number of "male" researchers already traversed with the same parent researcher.

4. When a researcher's end point has been determined, we need to draw a leaf shape, using its start and end point.
```
midpoint = ((start_x + end_x)/2, (start_y + end_y)/2)

``` 

buildTree (recursive function)
      a. first we need to translate our starting point to (width/2, height), which is the mid-bottom point on the screen
      b. default branch is defined by 2 vectors, "begin"(0,0) and "end"(0,-100).
      c. when it's traversing the current branch, it will first plot all its children, by changing the end

      """
      male tilting angle = -PI/(coefficient - degreeA)

      female tilting angle = PI/(coefficient - degreeB)
      """

   4. drawLeaf


