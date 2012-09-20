/* Copyright (c) 2012, Etienne Millon
 *
 * "THE BEER-WARE LICENSE" (Revision 42):
 * <me@emillon.org> wrote this file. As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy me a beer in return.
 */

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

function makeContext(w, h) {
  var canvas = document.createElement('canvas');
  canvas.height = h;
  canvas.width  = w;
  return canvas.getContext("2d");
}

function fromColor(color) {
  var h = 512;
  var w = 512;
  var ctx = makeContext(w, h);
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, w, h);
  var data = ctx.getImageData(0, 0, w, h);
  return data;
}

function fromImage(src, k) {
  var h = 512;
  var w = 512;
  var img = new Image();
  img.onload = function () {
    var ctx = makeContext(w, h);
    ctx.drawImage (img, 0, 0);
    var data = ctx.getImageData(0, 0, w, h);
    console.log(data);
    k(data);
  };
  img.src = src;
}

function fromImages(srcs, k) {
  var s = srcs;
  var r = [];
  function shiftNext () {
    if (srcs.length == 0) {
      k(r)
    } else {
      src = srcs.shift();
      fromImage(src, function (d) {
        r.push(d);
        shiftNext();
      });
    }
  }
  shiftNext();
}
