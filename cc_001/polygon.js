var Polygon = function(x=0, y=0, radius=100, tesselation=8){
  this.x = x;
  this.y = y;
  this.radius = clamp(radius, 1, 200);
  this.tesselation = clamp(tesselation, 3, 100);;
  this.vertices = []; // Single dimensional array
  this.rotation = 0;

  this.update = function() {
    //  ensure we're working with clean data
    var _tesselation = clamp(this.tesselation, 3, 100);
    var _radius = clamp(this.radius, 10, 1024);

    // Create our start position
    var dx = this.x + Math.cos(this.rotation * HALF_PI) * _radius;
    var dy = this.y + Math.sin(this.rotation * HALF_PI) * _radius;

    // Clear our the old data, create our Polygon.
    this.vertices = [];
    this.vertices.push(dx, dy);
    for (var degrees = 0; degrees <= 360; degrees += (360/_tesselation)) {
      var ang = this.rotation + degrees;
      dx = this.x + Math.cos(ang * HALF_PI) * _radius;
      dy = this.y + Math.sin(ang * HALF_PI) * _radius;
      this.vertices.push(dx, dy);
    }

    // draw a line back to the start position to prevent gaps,
    // if the tesselation is not round, becomes obvious in animation.
    this.vertices.push(this.vertices[0], this.vertices[1]);
  }.bind(this)

}
