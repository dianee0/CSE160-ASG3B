class Bunny {
    constructor() {
        this.modelMatrix = new Matrix4();
        this.parts = {
            body: new Cube(),
            body2: new Cube(),
            rightThigh: new Cube(),
            backFootRight: new Cube(),
            frontFootRight: new Cube(),
            leftThigh: new Cube(),
            backFootLeft: new Cube(),
            frontFootLeft: new Cube(),
            head: new Cube(),
            leftEar: new Cube(),
            rightEar: new Cube(),
            innerLeftEar: new Cube(),
            innerRightEar: new Cube(),
            leftEyeWhite: new Cube(),
            leftEyeDark: new Cube(),
            rightEyeWhite: new Cube(),
            rightEyeDark: new Cube(),
            nose: new Cube(),
            leftArm: new Cube(),
            rightArm: new Cube()
        };
        this.initParts();
    }
  
    setPosition(x, y, z) {
        this.modelMatrix.setTranslate(x, y, z);
    }
  
    initParts() {
        // Initialize all the parts with specific transformations and properties
        // Example for one part:
        this.parts.body.color = [1.0, 1.0, 1.0, 1.0];
        this.parts.body.textureNum = 1;
        this.parts.body.matrix.translate(-0.4, -0.3, 0.0).rotate(10, 1, 0, 0).scale(0.5, 0.5, 0.5);
  
        this.parts.body2.color = [1.0,1.0,1.0,1.0];
        this.parts.body2.textureNum = 1;
        this.parts.body2.matrix.translate(-.4,-.39,0.48).rotate(10,1,0,0).scale(0.5,0.5001,0.5);
  
        this.parts.rightThigh.textureNum = 1;
        this.parts.rightThigh.color = [1.0,1.0,1.0,1.0];
        this.parts.rightThigh.matrix.translate(0, -0.5, 0.54);
        this.parts.rightThigh.matrix.rotate(-g_legAngle, 1, 0, 0);
        var thighCoordR = new Matrix4(this.parts.rightThigh.matrix);
        this.parts.rightThigh.matrix.rotate(10, 1, 0, 0);
        this.parts.rightThigh.matrix.scale(0.2, 0.4, 0.5);
  
        this.parts.backFootRight.textureNum = 1;
        this.parts.backFootRight.color = [1.0,1.0,1.0,1.0];
        this.parts.backFootRight.matrix = new Matrix4(thighCoordR);
        this.parts.backFootRight.matrix.translate(0, -0.18, 0.0);
        this.parts.backFootRight.matrix.rotate(-g_backFootAngle, 1, 0, 0);
        var backCoordR = new Matrix4(this.parts.backFootRight.matrix);
        this.parts.backFootRight.matrix.scale(0.2, 0.1, 0.5);
  
        this.parts.frontFootRight.textureNum = 1;
        this.parts.frontFootRight.color = [1,1,1,1];
        this.parts.frontFootRight.matrix = new Matrix4(backCoordR);
  
        this.parts.frontFootRight.matrix.translate(0, 0, -.29); // Sets the position ignoring any previous transformations
        this.parts.frontFootRight.matrix.scale(0.2, 0.1, 0.3);
  
        this.parts.leftThigh.textureNum = 1;
        this.parts.leftThigh.color = [1.0,1.0,1.0,1.0];
        this.parts.leftThigh.matrix.translate(-.5,-0.5,0.54);
        this.parts.leftThigh.matrix.rotate(-g_legAngle,1,0,0);
        var thighCoordL = new Matrix4(this.parts.leftThigh.matrix);
        this.parts.leftThigh.matrix.rotate(10,1,0,0);
        this.parts.leftThigh.matrix.scale(0.2,0.4,0.5);
  
        this.parts.backFootLeft.textureNum = 1;
        this.parts.backFootLeft.color = [1.0,1.0,1.0,1.0];
        this.parts.backFootLeft.matrix = thighCoordL;
        this.parts.backFootLeft.matrix.translate(0,-0.18,0);
        this.parts.backFootLeft.matrix.rotate(-g_backFootAngle, 1, 0, 0);
        var backCoordL = new Matrix4(this.parts.backFootLeft.matrix);
        this.parts.backFootLeft.matrix.scale(0.2,0.1,0.5);
  
        this.parts.frontFootLeft.textureNum = 1;
        this.parts.frontFootLeft.color = [1,1,1,1];
        this.parts.frontFootLeft.matrix = new Matrix4(backCoordL);
        this.parts.frontFootLeft.matrix.translate(0,0,-.29);
        this.parts.frontFootLeft.matrix.scale(0.2,0.1,0.3);
  
        this.parts.head.textureNum = 1;
        this.parts.head.color = [1,1,1,1];
        this.parts.head.matrix.translate(-.375,0,-0.3);
        this.parts.head.matrix.scale(0.45,0.45,0.45);
  
        this.parts.leftEar.textureNum = 1;
        this.parts.leftEar.color = [1,1,1,1];
        this.parts.leftEar.matrix.translate(-.4,.4,-0.3);
        this.parts.leftEar.matrix.rotate(8,0,0);
        this.parts.leftEar.matrix.scale(0.2,0.4,0.08);
  
        this.parts.rightEar.textureNum = 1;
        this.parts.rightEar.color = [1,1,1,1];
        this.parts.rightEar.matrix.translate(-0.1,.43,-0.3);
        this.parts.rightEar.matrix.rotate(-8,0,0);
        this.parts.rightEar.matrix.scale(0.2,0.4,0.08);
  
        this.parts.innerLeftEar.textureNum = 1;
        this.parts.innerLeftEar.color = [0.902, 0.627, 0.604, 1];
        this.parts.innerLeftEar.matrix.translate(-.3,.43,-0.3001);
        this.parts.innerLeftEar.matrix.rotate(8,0,0);
        this.parts.innerLeftEar.matrix.scale(0.1,0.3,0.08);
  
        this.parts.innerRightEar.textureNum = 1;
        this.parts.innerRightEar.color = [0.902, 0.627, 0.604, 1];
        this.parts.innerRightEar.matrix.translate(-0.1,.44,-0.3001);
        this.parts.innerRightEar.matrix.rotate(-8,0,0);
        this.parts.innerRightEar.matrix.scale(0.1,0.3,0.08);
  
        this.parts.leftArm.textureNum = 1;
        this.parts.leftArm.color = [1,1,1,1];
        this.parts.leftArm.matrix.translate(-.5,-0.68,0);
        this.parts.leftArm.matrix.translate(0, 0.5, 0);
        this.parts.leftArm.matrix.rotate(-g_armAngle,1,0,0);
        // Translate back
        this.parts.leftArm.matrix.translate(0, -0.5, 0);
        this.parts.leftArm.matrix.scale(0.2,0.6,0.2);
  
        this.parts.rightArm.textureNum = 1;
        this.parts.rightArm.color = [1,1,1,1];
        this.parts.rightArm.matrix.translate(0,-0.68,0);
        // Additional translation to align the rotation axis at the shoulder
        this.parts.rightArm.matrix.translate(0, 0.5, 0);
        this.parts.rightArm.matrix.rotate(-g_armAngle,1,0,0);
        // Translate back
        this.parts.rightArm.matrix.translate(0, -0.5, 0);
        this.parts.rightArm.matrix.scale(0.2,0.6,0.2);
  
        this.parts.nose.color = [237/255, 109/255, 109/255, 1];
        this.parts.nose.matrix.translate(-0.1875,0.2,-0.33);
        this.parts.nose.matrix.scale(0.05,0.05,0.05);
  
        this.parts.leftEyeDark.color = [0.18, 0.18, 0.18, 1];
        this.parts.leftEyeDark.matrix.translate(-0.2375,0.25,-0.31);
        this.parts.leftEyeDark.matrix.scale(0.05,0.05,0.02);
  
        this.parts.leftEyeWhite.color = [0.71, 0.71, 0.71, 1];
        this.parts.leftEyeWhite.matrix.translate(-0.2375,0.3,-0.31);
        this.parts.leftEyeWhite.matrix.scale(0.05,0.05,0.02);
  
        this.parts.rightEyeDark.color = [0.18, 0.18, 0.18, 1];
        this.parts.rightEyeDark.matrix.translate(-0.1375,0.25,-0.31);
        this.parts.rightEyeDark.matrix.scale(0.05,0.05,0.02);
  
        this.parts.rightEyeWhite.color = [0.71, 0.71, 0.71, 1];
        this.parts.rightEyeWhite.matrix.translate(-0.1375,0.3,-0.31).scale(0.05,0.05,0.02);
        
    }
  
    draw(gl, u_ModelMatrix) {
        // Draw each part
        for (let partName in this.parts) {
            let part = this.parts[partName];
            let finalMatrix = new Matrix4(this.modelMatrix).multiply(part.matrix);
            gl.uniformMatrix4fv(u_ModelMatrix, false, finalMatrix.elements);
            part.render();
        }
    }
  
  }