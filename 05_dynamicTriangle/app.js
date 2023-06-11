onload = () => {
  let canvas = document.getElementById("webgl-canvas");

  let gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) {
    alert("Couldn't setup WebGL");
    return;
  }

  let program = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(program);

  let vertexBuffer = gl.createBuffer();
  let vertices = [];
  let clickCount = 0;

  canvas.addEventListener("click", function (event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    vertices.push(x, y);
    clickCount++;

    if (clickCount % 3 === 0) {
      let clipVertices = pixelToClip2D(vertices);

      // creating a buffer for the vertex data
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, flatten(clipVertices), gl.STATIC_DRAW);

      let vPosition = gl.getAttribLocation(program, "vPosition");
      gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(vPosition);

      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);

      // generating a random color
      let randomColor = vec4(Math.random(), Math.random(), Math.random(), 1.0);
      let uColor = gl.getUniformLocation(program, "uColor");
      gl.uniform4fv(uColor, flatten(randomColor));

      gl.drawArrays(gl.TRIANGLES, 0, clipVertices.length / 2);
    }
  });

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
