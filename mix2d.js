function mix2d_draw(id, f) {
  var red    = [255, 0, 0];
  var green  = [0, 255, 0];
  var blue   = [0, 0, 255];

  var colors = [red, green, blue];
  var canvas = document.getElementById(id);
  var ctx = canvas.getContext("2d");
  var data = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var i, j, p;
  for(i=0;i<canvas.width;i++) {
    for(j=0;j<canvas.height;j++) {
      var col = colors[~~(f(i, j)) % colors.length];
      p = 4*(j*canvas.width+i);
      data.data[p+0] = col[0];
      data.data[p+1] = col[1];
      data.data[p+2] = col[2];
      data.data[p+3] = 255;
    }             
  }
  ctx.putImageData(data, 0, 0);
}
