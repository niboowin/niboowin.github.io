var HALF_PI = (Math.PI/180);

var clamp = function (v, min, max) {
  v = (v<min)? min:v;
  v = (v>max)? max:v;
  return v;
}

var lerp = function (t, g, damp) {
  return  t - (t - g)*damp;
}
