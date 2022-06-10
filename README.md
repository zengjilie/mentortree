# Mentor Tree Design Doc

This data visualization consists of 2 modules ->`preprocessor.js` and `tree.js`

## Preprocessor

- **Objective**: 
1. Map `children_num` to `weight` for each researcher.
2. Apply new `gender_color`.

- **File**: `preprocessor.js`

- **Steps**
1. Use a recursive function to traverse all the researchers. When traversing a researcher, we will
	1. assign it a new `gender_color`.
  	2. add his/her `research_area` to a **SET**.
	3. store the `researcher_name` and his/her `children_num` to a **MAP**.

2. Calculate the `weight` of each researcher 

```
sum = sum up all children_num in the MAP
max = maximum children number in the MAP
min = minimum children number in the MAP
range_mean = (max - min) / 2

```

3. Oversampling/Undersampling

If we plot each researcher using their "original" `weights` without doing oversampling/undersampling.
The proportion of the "mentor tree" will be extremely imbalanced and weird. 
To avoid this situation, we need to perform oversampling/undersampling on each researcher's children's number.

```
weight = w
children_num = cn
range_mean = rm
i = random researcher i
```

```
== Original Weight ==

w_i = cn_i / sum

== New Euqation ==

w_i = [cn_i - |cn_i - rm| * 0.1] / sum , (cn_i > rm)

      cn_i / sum , (cn_i = rm)

      [cn_i + |cn_i - rm| * 0.1] / sum , (cn_i < rm) 

``` 

## Tree Implementation

- **Objective**: plot the tree using p5js

- **File**: `tree.js` 

- **Steps**

1. Use the HSB color system to assign each `research_area` a unique hue value.
