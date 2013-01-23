function createShader(id) {
    var shaderScript, shaderSource, shader;
    shaderScript = document.getElementById(id);
    shaderSource = shaderScript.textContent;
    
    if(!shaderSource) { return null; }
    
    if (shaderScript.type == "x-shader/x-vertex") {
        shader = gl.createShader(gl.VERTEX_SHADER);
    }
    else if (shaderScript.type == "x-shader/x-fragment") {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    }
    else {
        return null;
    }
    
    gl.shaderSource(shader, shaderSource);
    gl.compileShader(shader);
    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.log("Error compiliing shader: " + gl.getShaderInfoLog(shader) + "\n For: " + id);
        return null;
    }
    
    return shader;
}
function createProgram(vertexId, fragmentId) {
    var program = gl.createProgram();
    var vshader = createShader(vertexId);
    var fshader = createShader(fragmentId);
    gl.attachShader(program, vshader);
    gl.attachShader(program, fshader);
    gl.linkProgram(program);
    
    if(!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.log("Error compiliing program: " + gl.getProgramInfoLog(program));
        return null;
    }     
    return program;
}

function createVertexBuffer(gl) {
    
    var vertexBuffer = gl.createBuffer();
    vertexBuffer.itemSize = 2;
    vertexBuffer.numItems = 4;
    
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    
    var vertices = [-1, -1, 1, -1, -1, 1, 1, 1];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    
    return vertexBuffer;
}

function draw() {
    offset[0] += -(actions.panleft ? scale / 25 : 0) + (actions.panright ? scale / 25 : 0);
    offset[1] += -(actions.pandown ? scale/25: 0) + (actions.panup ? scale/25 : 0);
    scale = scale * (actions.zoomin ? 0.975 : 1.0)  / (actions.zoomout ? 0.975 : 1.0);
    
    gl.uniform2f(program.canvasSizeUniform, canvas.width, canvas.height);
    gl.uniform2f(program.offsetUniform, offset[0], offset[1]);
    gl.uniform1f(program.scaleUniform, scale);
    
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertexBuffer.numItems);
}