### 001  

---  

First challenge!
Let's start with a rather simple one.
You will find two files in the repo: `index.html` and `main.js`. Make copies of these files under your own directory (e.g., `mariusz/`). You will be working in your own copies. Remember! do not push to the remote until we have shared our approaches.

Using only line segments, write in Canvas a little interactive toy that draws circles. There should be a way to set the circles "resolution", or precision. For example, a precision of "3" would draw a triangle, a precision of "8" would draw an hexagon, while a precision of "100" would make a polygon with 100 sides.

---
#### Notes

One way to plot a circle:
``` javascript
x = center.x + Math.cos(angle) * radius;
y = center.y + Math.sin(angle) * radius;
```

For the not mathematically inclined:
- a circle spans `Math.PI*2` radians.  
- Convert to degrees: `radians * (180/Math.PI)`. 
- Convert to radians: `degrees * (Math.PI/180)`. 