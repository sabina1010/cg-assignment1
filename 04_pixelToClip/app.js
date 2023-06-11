onload = () => {
  let canvas = document.getElementById("webgl-canvas");

  let gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) {
    alert("Couldn't setup WebGL");
    return;
  }

  let program = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(program);

  let pixelVertices = [0, 100, 50, 0, 100, 100];

  let vertices = pixelToClip2D(pixelVertices.slice(0));

  // creating a buffer for the vertex data
  let vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

  let vPosition = gl.getAttribLocation(program, "vPosition");
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);

  // generating a random color
  let randomColor = vec4(Math.random(), Math.random(), Math.random(), 1.0);
  let uColor = gl.getUniformLocation(program, "uColor");
  gl.uniform4fv(uColor, flatten(randomColor));

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 2);

  function pixelToClip2D(vertices) {
    let clipVertices = [];

    for (let i = 0; i < vertices.length; i += 2) {
      let x = vertices[i] / (gl.canvas.width / 2) - 1;
      let y = 1 - vertices[i + 1] / (gl.canvas.height / 2);
      clipVertices.push(x, y);
    }

    return clipVertices;
  }
};
