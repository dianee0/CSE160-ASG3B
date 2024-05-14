// HelloPoint1.js (c) 2012 matsuda

// Vertex shader programa
var VSHADER_SOURCE =`
  precision mediump float;
  attribute vec4 a_Position; 
  attribute vec2 a_UV;
  varying vec2 v_UV;
  uniform mat4 u_ModelMatrix;
  uniform mat4 u_ViewMatrix;
  uniform mat4 u_GlobalRotateMatrix;
  uniform mat4 u_ProjectionMatrix;
  void main() {
    // gl_Position = u_GlobalRotateMatrix * u_ModelMatrix * a_Position;
    gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_GlobalRotateMatrix * u_ModelMatrix * a_Position;
    v_UV = a_UV;
  }`

// Fragment shader program
var FSHADER_SOURCE =`
  precision mediump float;
  varying vec2 v_UV;
  uniform vec4 u_FragColor;
  uniform sampler2D u_Sampler0;
  uniform sampler2D u_Sampler1;
  uniform sampler2D u_Sampler2;
  uniform sampler2D u_Sampler3;
  
  uniform int u_whichTexture;
  void main() {

    if(u_whichTexture == -2){
      gl_FragColor = u_FragColor; //use color

    }else if (u_whichTexture == -1){ //use UV debug color
      gl_FragColor = vec4(v_UV,1,1);

    }else if (u_whichTexture == 0){ //use texture0
      gl_FragColor = texture2D(u_Sampler0, v_UV);

    } else if (u_whichTexture == 1) { // Use texture1
      gl_FragColor = texture2D(u_Sampler1, v_UV); // texture1

    } else if (u_whichTexture == 2) { // Use texture2
      gl_FragColor = texture2D(u_Sampler2, v_UV); // texture2

    } else if (u_whichTexture == 3) { // Use texture3
      gl_FragColor = texture2D(u_Sampler3, v_UV); // texture3

    } else { //error put reddish
      gl_FragColor = vec4(1,.2,.2,1);
    }

  }`

// Global Variables
let canvas;
let gl;
let a_Position;
let a_UV;
let u_FragColor;
let u_Size;
let u_ModelMatrix;
let u_ProjectionMatrix;
let u_ViewMatrix;
let u_GlobalRotateMatrix;
let u_whichTexture;
let u_Sampler0;
let u_Sampler1;
let u_Sampler2;
let u_Sampler3;

function setupWebGL(){
  // Retrieve <canvas> element
  canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  gl = canvas.getContext("webgl", { preserveDrawingBuffer: true});
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  
  

  gl.disable(gl.BLEND);
}

function connectVariablesToGLSL(){
  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // // Get the storage location of a_Position
  a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }

  a_UV = gl.getAttribLocation(gl.program, 'a_UV');
  if (a_UV < 0) {
    console.log('Failed to get the storage location of a_UV');
    return;
  }

  // Get the storage location of u_FragColor
  u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if (!u_FragColor) {
    console.log('Failed to get the storage location of u_FragColor');
    return;
  }

  // Get the storage location of u_Size
  u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
  if (!u_ModelMatrix) {
    console.log('Failed to get the storage location of u_ModelMatrix');
    return;
    }

  // Get the storage location of u_GlobalRotateMatrix
  u_GlobalRotateMatrix = gl.getUniformLocation(gl.program, 'u_GlobalRotateMatrix');
  if (!u_GlobalRotateMatrix) {
    console.log('Failed to get the storage location of u_GlobalRotateMatrix');
    return;
    }

  u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
  if (!u_ViewMatrix) {
    console.log('Failed to get the storage location of u_ViewMatrix');
    return;
    }

  u_ProjectionMatrix = gl.getUniformLocation(gl.program, 'u_ProjectionMatrix');
  if (!u_ProjectionMatrix) {
    console.log('Failed to get the storage location of u_ProjectionMatrix');
    return;
  }


  // Get the storage location of the u_Sampler
  u_Sampler0 = gl.getUniformLocation(gl.program, 'u_Sampler0');
  if(!u_Sampler0){
    console.log('Failed to get the storage location of u_Sampler0');
    return ;
  }

  u_Sampler1 = gl.getUniformLocation(gl.program, 'u_Sampler1');
  if(!u_Sampler1){
    console.log('Failed to get the storage location of u_Sampler1');
    return ;
  }

  u_Sampler2 = gl.getUniformLocation(gl.program, 'u_Sampler2');
  if(!u_Sampler2){
    console.log('Failed to get the storage location of u_Sampler2');
    return ;
  }

  u_Sampler3 = gl.getUniformLocation(gl.program, 'u_Sampler3');
  if(!u_Sampler3){
    console.log('Failed to get the storage location of u_Sampler3');
    return ;
  }

  // Retrieve locations for all the uniforms and attributes
  u_whichTexture = gl.getUniformLocation(gl.program, 'u_whichTexture');
  if (!u_whichTexture) {
      console.log('Failed to get the storage location of u_whichTexture');
      return;
  }

    

    //Set the initial value for this matrix to identify
    var identityM = new Matrix4();
    gl.uniformMatrix4fv(u_ModelMatrix, false, identityM.elements);

}

// Constants
const POINT = 0;
const TRIANGLE = 1;
const CIRCLE = 2;

// global variable for UI elements
let g_selectedColor=[1.0,1.0,1.0,1.0]
let g_selectedSize=5;
let g_selectedType="POINT";

let g_globalAngle = 0;
let g_armAngle = 0;
let g_legAngle = 0;
let g_backFootAngle = 0;
let g_feetAngle = 0;

// let g_Animation = false;
let camera;
let myBunny;


function addActionsForHTMLUI(){
    document.getElementById("resetCameraButton").onclick = resetCameraAngles;
}

function initTextures(gl, n) {
  var image0 = new Image();  // Image for first texture
  var image1 = new Image();  // Image for second texture
  var image2 = new Image(); // grass texture
  var image3 = new Image(); // mossy cobble texture

  image0.onload = function() { sendTextureToGLSL(image0, 0); };  // Bind image0 to texture unit 0
  image0.src = 'sunrise.jpg';  // Set source for the first texture

  image1.onload = function() { sendTextureToGLSL(image1, 1); };  // Bind image1 to texture unit 1
  image1.src = 'whitewool.png';  // Set source for the second texture

  image2.onload = function() { sendTextureToGLSL(image2, 2); };  // Bind image1 to texture unit 2
  image2.src = 'grass.jpg';  // Set source for the second texture

  image3.onload = function() { sendTextureToGLSL(image3, 3); };  // Bind image1 to texture unit 3
  image3.src = 'mossycobble.png';  // Set source for the third texture

  return true;
}

function sendTextureToGLSL(image, textureUnit) {
  var texture = gl.createTexture(); 
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
  gl.activeTexture(gl.TEXTURE0 + textureUnit);  // Activate the appropriate texture unit
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

  // Generate mipmaps
    gl.generateMipmap(gl.TEXTURE_2D);
  
  if (textureUnit == 0) {
    u_Sampler0 = gl.getUniformLocation(gl.program, 'u_Sampler0');
    gl.uniform1i(u_Sampler0, 0);  // Set the texture unit to 0
  } else if (textureUnit == 1) {
    u_Sampler1 = gl.getUniformLocation(gl.program, 'u_Sampler1');
    gl.uniform1i(u_Sampler1, 1);  // Set the texture unit to 1
  } else if (textureUnit == 2) {
    u_Sampler2 = gl.getUniformLocation(gl.program, 'u_Sampler2');
    gl.uniform1i(u_Sampler2, 2);  // Set the texture unit to 2
  } else if (textureUnit == 3) {
    u_Sampler3 = gl.getUniformLocation(gl.program, 'u_Sampler3');
    gl.uniform1i(u_Sampler3, 3);  // Set the texture unit to 2
  }

  console.log('Texture loaded for unit ' + textureUnit);
}

let mouseDown = false;   // Track if the mouse is pressed
let lastMouseX = null;   // Last position of the cursor
let lastMouseY = null;   // Last position of the cursor

function handleMouseDown(event) {
    mouseDown = true;
    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
}

function handleMouseUp(event) {
    mouseDown = false;
}

function handleMouseMove(event) {
  if (!mouseDown) {
      return;
  }
  const newX = event.clientX;
  const newY = event.clientY;

  const deltaX = newX - lastMouseX;
  const deltaY = newY - lastMouseY;

  const rotationSpeed = 0.5;  // Adjust this value to increase or decrease sensitivity

  // To reverse the direction of horizontal rotation, multiply deltaX by -1
  camera.panLeft(-deltaX * rotationSpeed);

  // Implement vertical rotation by adding rotation around the X-axis
  // Note: You may want to limit the vertical angle to prevent flipping the view upside-down
  camera.panUp(-deltaY * rotationSpeed);

  lastMouseX = newX;
  lastMouseY = newY;

  // Update the view matrix in the shader
  gl.uniformMatrix4fv(u_ViewMatrix, false, camera.viewMat.elements);
  renderAllShapes(); // You might want to only render when the camera updates to improve performance
}

function setupMouseHandlers() {
    canvas.addEventListener('mousedown', handleMouseDown, false);
    canvas.addEventListener('mouseup', handleMouseUp, false);
    canvas.addEventListener('mousemove', handleMouseMove, false);
}

function main() {
  setupWebGL(); // set up the WebGL context
  connectVariablesToGLSL(); // Connect all shader variables
  addActionsForHTMLUI(); // Setup UI interactions
  setupMouseHandlers();

  camera = new Camera(canvas.width / canvas.height, 0.1, 1000); // Initialize camera
  // Draw bunny
  myBunny = new Bunny();
  // Randomly place the bunny in the maze
  let [bunnyX, bunnyY] = getRandomOpenPosition(maze);
  console.log(bunnyX, bunnyY);
  // Pass the coordinates to the Bunny instance
  myBunny = new Bunny(bunnyX, bunnyY);

  // console.log('Camera initialized:', camera);

  initTextures(gl, 0); // Initialize textures

  document.onkeydown = keyDown; // Set up keyboard interaction

  requestAnimationFrame(tick); // Start the rendering loop

}

var g_startTime = performance.now()/1000.0;
var g_seconds = performance.now()/1000.0 - g_startTime;

function tick() {
    // print some debug info so we know we are running
    g_seconds = performance.now()/1000.0-g_startTime;
    // console.log(g_seconds);

    // draw everything
    renderAllShapes();

    // tell browser to update again when it has time
    requestAnimationFrame(tick);
}


var g_shapesList = [];


function convertCoordinatesEventToGL(ev){
    var x = ev.clientX; // x coordinate of a mouse pointer
    var y = ev.clientY; // y coordinate of a mouse pointer
    var rect = ev.target.getBoundingClientRect();

    x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
    y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

    return ([x,y]);
}

function resetCameraAngles() {
  // Reset angles
  g_globalAngle = 0;

  // Reset camera position and orientation
  camera.eye = new Vector3([20, 3, 3]);
  camera.at = new Vector3([-50, 1, 0]);
  camera.up = new Vector3([0, 1, 0]);
  
  // Update the view matrix with the new camera settings
  camera.updateviewMat();

  // Re-render the scene
  renderAllShapes();
}

function keyDown(ev) {

  switch (ev.keyCode) {
      case 87: // W
          camera.moveForward(0.3);
          break;
      case 83: // S
          camera.moveBackward(0.3);
          break;
      case 65: // A
          camera.moveLeft(0.3);
          break;
      case 68: // D
          camera.moveRight(0.3);
          break;
      case 81: // Q
          camera.panLeft(10); // Rotate left, angle in degrees
          break;
      case 69: // E
          camera.panRight(10); // Rotate right, angle in degrees
          break;
      default:
          return; // Skip rendering if no key is pressed
  }
  gl.uniformMatrix4fv(u_ViewMatrix, false, camera.viewMat.elements);
  renderAllShapes(); // Update the scene
}
var g_map = [];

// Generate the maze
function generateMaze(width, height) {
    let maze = Array.from({ length: height }, () => Array(width).fill(1));
    let stack = [];
    let directions = [
        [0, 1], [1, 0], [0, -1], [-1, 0]
    ];

    function isInBounds(x, y) {
        return x >= 0 && y >= 0 && x < width && y < height;
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function carveMaze(x, y) {
        maze[y][x] = 0;
        stack.push([x, y]);

        while (stack.length > 0) {
            let [cx, cy] = stack[stack.length - 1];
            let shuffledDirections = shuffle(directions);

            let carved = false;
            for (let [dx, dy] of shuffledDirections) {
                let nx = cx + dx * 2;
                let ny = cy + dy * 2;
                if (isInBounds(nx, ny) && maze[ny][nx] === 1) {
                    maze[cy + dy][cx + dx] = 0;
                    maze[ny][nx] = 0;
                    stack.push([nx, ny]);
                    carved = true;
                    break;
                }
            }

            if (!carved) {
                stack.pop();
            }
        }
    }

    carveMaze(1, 1);
    return maze;
}

// Generate the maze and set g_map
let maze = generateMaze(32, 32);
g_map = [];

for (let z = 0; z < 9; z++) { // Remove ceiling by setting z < 9
    let layer = [];
    for (let x = 0; x < 32; x++) {
        let row = [];
        for (let y = 0; y < 32; y++) {
            if (z === 0) {
                row.push(1); // Floor only
            } else {
                row.push(maze[x][y]); // Maze walls and paths
            }
        }
        layer.push(row);
    }
    g_map.push(layer);
}

// Draw the map function
function drawMap() {
  for (let z = 0; z < g_map.length; z++) {
      for (let x = 0; x < 32; x++) {
          for (let y = 0; y < 32; y++) {
              var body = new Cube();
              if (g_map[z][x][y] == 1) {
                  body.color = [1.0, 1.0, 1.0, 1.0];
                  body.textureNum = 3;
                  body.matrix.translate(x - 16, z - 0.75, y - 16);
                  body.renderfast();
              }
          }
      }
  }
}

// Function to find a random open position in the maze
function getRandomOpenPosition(maze) {
    let openPositions = [];
    for (let x = 1; x < maze.length - 1; x++) {
        for (let y = 1; y < maze[x].length - 1; y++) {
            if (maze[x][y] === 0) {
                openPositions.push([x, y]);
            }
        }
    }
    return openPositions[Math.floor(Math.random() * openPositions.length)];
}


function renderAllShapes() {
  var startTime = performance.now();
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  camera.projMat.setPerspective(camera.fov, canvas.width / canvas.height, .1, 1000);
  gl.uniformMatrix4fv(u_ProjectionMatrix, false, camera.projMat.elements);
  gl.uniformMatrix4fv(u_ViewMatrix, false, camera.viewMat.elements);
  gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, new Matrix4().rotate(g_globalAngle, 0, 1, 0).elements);

  drawMap(); // Draw the cave map

  myBunny.draw(gl, u_ModelMatrix); // Ensure bunny is drawn after the map

  // Skybox
  var skybox = new Cube();
  skybox.color = [1, 0, 0, 1];
  skybox.textureNum = 0; // texture unit 0 has the sky texture
  skybox.matrix.scale(50, 50, 50);
  skybox.matrix.translate(-0.5, -0.5, -0.5); // Center the cube
  skybox.render();

  // Floor
  var floor = new Cube();
  floor.color = [0.0, 50.0, 0.0, 1.0];
  floor.textureNum = 2;
  floor.matrix.translate(0, -0.75, 0.0);
  floor.matrix.scale(100, 0, 100);
  floor.matrix.translate(-0.5, 0, -0.5);
  floor.render();

  var duration = performance.now() - startTime;
  sendTextToHTML(" ms: " + Math.floor(duration) + " fps: " + Math.floor(10000 / duration) / 10, "numdot");
}

function sendTextToHTML(text, htmlID){
  var htmlElm = document.getElementById(htmlID);
  if (!htmlElm) {
  console.log("Failed to get " + htmlID + " from HTML");
  return;
  }
  htmlElm.innerHTML = text;
}