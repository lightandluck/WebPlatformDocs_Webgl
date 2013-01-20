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