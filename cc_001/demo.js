
var DemoApp = function(app) {
  this.app = app;
  this.canvas = document.createElement('canvas');
  this.context = this.canvas.getContext('2d');
  this.canvas.width = app.canvas.width;
  this.canvas.height = app.canvas.height;
  this.items = [];
  this.targetTesselation = 0;
  this.demoMode = false;

  this.screenCenterX = app.canvas.width >> 1;
  this.screenCenterY = app.canvas.height >> 1;

  // Update the polygon's with some random values
  this.update = function(timestamp) {
    var ang = 360/this.items.length;
    var dx = app.mouseX ;// + Math.cos(ang * HALF_PI) * 50;
    var dy = app.mouseY;// + Math.sin(ang * HALF_PI) * 50;
    var i = 0;
    var desiredRadius = 150 +  20 * Math.sin(timestamp / 800);
    var degrees = 0;
    var size = clamp(4*this.items.length, 1, 200);
    var rot = 145 * Math.sin(timestamp / 4000);

    if (this.demoMode){
      rot = 90 * Math.sin(timestamp / 1000);
      desiredRadius = 150 +  100 * Math.sin(timestamp / 800);
      var sizeX = 20 + 200* Math.sin(timestamp / 1600);
      var sizeY = 20 + 150* Math.sin(timestamp / 800);
      dx = this.screenCenterX + Math.cos((rot + degrees) * HALF_PI) * sizeX;// (size*Math.sin(timestamp/3200));
      dy = this.screenCenterY + Math.sin((rot + degrees) * HALF_PI) * sizeY;//(size*Math.cos(timestamp/1800));
    }


    if(!app.isMousePressed && this.items.length>0 && !this.demoMode){
      dx = app.mouseX;
      dy = app.mouseY;
      for (i=0; i <this.items.length; i++) {
        degrees += (360/this.items.length);
        dx = this.screenCenterX + Math.cos((rot + degrees) * HALF_PI) * size;// (size*Math.sin(timestamp/3200));
        dy = this.screenCenterY + Math.sin((rot + degrees) * HALF_PI) * size;//(size*Math.cos(timestamp/1800));
        this.items[i].rotation = degrees;
        // this.items[i].tesselation = lerp(3, this.items[i].tesselation, 0.99);
        this.items[i].tesselation = lerp(this.targetTesselation, this.items[i].tesselation, 0.97);
        this.items[i].radius = lerp(225 * (1/this.items.length), this.items[i].radius, 0.9);
        this.items[i].x = lerp(dx, this.items[i].x, 0.9);
        this.items[i].y = lerp(dy, this.items[i].y, 0.9);
        this.items[i].update();
      }

    }else{
      // Update our master/target node
      if (this.items.length>0){
        this.targetTesselation = clamp(this.targetTesselation, 3, 100);
        this.items[i].radius = lerp(desiredRadius, this.items[i].radius, .8);
        this.items[i].rotation = rot;
        this.items[i].tesselation = lerp(this.targetTesselation, this.items[i].tesselation, 0.8);
        this.items[i].x = lerp(dx, this.items[0].x, .75);
        this.items[i].y = lerp(dy, this.items[0].y, .75);;
        this.items[i].update();
      }

      // Make all other polygon's lerp to the target
      for (i=1; i < this.items.length; i++) {
        var last = this.items[i-1];
        this.items[i].radius = lerp(last.radius, this.items[i].radius, 0.6);
        this.items[i].rotation = lerp(last.rotation, this.items[i].rotation, 0.7);
        this.items[i].tesselation = lerp(last.tesselation, this.items[i].tesselation, 0.7);
        this.items[i].x = lerp(last.x, this.items[i].x, 0.5);
        this.items[i].y = lerp(last.y, this.items[i].y, 0.5);
        this.items[i].update();
      }
    }


  }.bind(this);


  // Convience function
  this.drawPolygon = function(ctx, shape){
    var v = shape.vertices;
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255,90,33, 1)';
    ctx.moveTo(v[0], v[1]);
    for( var i=2; i< v.length; i+=2){
      ctx.lineTo(v[i], v[i+1]);
    }
    ctx.stroke();
    ctx.closePath();
  }.bind(this);


  this.draw = function() {
    this.context.clearRect(0, 0, app.canvas.width, app.canvas.height);
    for (var i = 0; i < this.items.length; i++) {
      this.drawPolygon(this.context, this.items[i]);
    }

    // Add some visual effects
    app.context.fillStyle = "rgba(0,0,0, .35)";
    app.context.fillRect(0, 0, app.canvas.width, app.canvas.height);
    app.context.filter = 'blur(30px)';
    app.context.drawImage(this.canvas, 0,0);
    app.context.filter = 'blur(0px)';
    app.context.drawImage(this.canvas, 0,0);
  }.bind(this);

  this.start = function(n=1) {
    this.items = [];
    for(var i=0; i< n; i++){
      this.items.push(new Polygon(this.screenCenterX, this.screenCenterY, 10, 3));
    }
  }.bind(this);

  this.toggleDemo = function() {
    this.demoMode = !this.demoMode;
  }.bind(this);

  this.updateTesselation = function(input) {
      this.targetTesselation = input.value;
  }.bind(this);

  this.updateCount = function(input){
      this.start(input.value);
  }.bind(this);

}
