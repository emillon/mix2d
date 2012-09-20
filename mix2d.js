function mix2d_draw(id, sources, f) {
  var canvas = document.getElementById(id);
  var ctx = canvas.getContext("2d");
  var data = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var i, j, p;
  for(i=0;i<canvas.width;i++) {
    for(j=0;j<canvas.height;j++) {
      var source = sources[~~(f(i, j)) % sources.length];
      p = 4*(j*canvas.width+i);
      data.data[p+0] = source.data[p+0];
      data.data[p+1] = source.data[p+1];
      data.data[p+2] = source.data[p+2];
      data.data[p+3] = 255;
    }             
  }
  ctx.putImageData(data, 0, 0);
}
