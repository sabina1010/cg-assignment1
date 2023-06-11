onload = () => {
  let canvas = document.getElementById("webgl-canvas");

  let gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) {
    alert("Couldn't setup WebGL");
    return;
  }

  let program = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(program);

  let vertices = [
    vec2(-0.5, -0.5),
    vec2(-0.5, 0.5),
    vec2(0.5, 0.5),
    vec2(0.5, -0.5),
  ];

  let vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

  let vPosition = gl.getAttribLocation(program, "vPosition");
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // using gl.TRIANGLE_STRIP
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertices.length);

  // using gl.TRIANGLE_FAN
  gl.drawArrays(gl.TRIANGLE_FAN, 0, vertices.length);
};
