class Bunny {
    constructor(bunnyX, bunnyY) {
        this.modelMatrix = new Matrix4();
        this.bunnyX = bunnyX;
        this.bunnyY = bunnyY;
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

    initParts() {
        const yOffset = 0.5; // Lift the bunny slightly above the floor
        const xOffset = this.bunnyX - 15.5; // Adjust to center within the cell
        const zOffset = this.bunnyY - 15.5; // Adjust to center within the cell

        this.parts.body.color = [1.0, 1.0, 1.0, 1.0];
        this.parts.body.textureNum = 1;
        this.parts.body.matrix.translate(xOffset - 0.4, yOffset - 0.3, zOffset).rotate(10, 1, 0, 0).scale(0.5, 0.5, 0.5);

        this.parts.body2.color = [1.0, 1.0, 1.0, 1.0];
        this.parts.body2.textureNum = 1;
        this.parts.body2.matrix.translate(xOffset - 0.4, yOffset - 0.39, zOffset + 0.48).rotate(10, 1, 0, 0).scale(0.5, 0.5001, 0.5);

        this.parts.rightThigh.textureNum = 1;
        this.parts.rightThigh.color = [1.0, 1.0, 1.0, 1.0];
        this.parts.rightThigh.matrix.translate(xOffset, yOffset - 0.5, zOffset + 0.54);
        this.parts.rightThigh.matrix.rotate(-g_legAngle, 1, 0, 0);
        var thighCoordR = new Matrix4(this.parts.rightThigh.matrix);
        this.parts.rightThigh.matrix.rotate(10, 1, 0, 0);
        this.parts.rightThigh.matrix.scale(0.2, 0.4, 0.5);

        this.parts.backFootRight.textureNum = 1;
        this.parts.backFootRight.color = [1.0, 1.0, 1.0, 1.0];
        this.parts.backFootRight.matrix = new Matrix4(thighCoordR);
        this.parts.backFootRight.matrix.translate(0, -0.18, 0.0);
        this.parts.backFootRight.matrix.rotate(-g_backFootAngle, 1, 0, 0);
        var backCoordR = new Matrix4(this.parts.backFootRight.matrix);
        this.parts.backFootRight.matrix.scale(0.2, 0.1, 0.5);

        this.parts.frontFootRight.textureNum = 1;
        this.parts.frontFootRight.color = [1, 1, 1, 1];
        this.parts.frontFootRight.matrix = new Matrix4(backCoordR);
        this.parts.frontFootRight.matrix.translate(0, 0, -0.29);
        this.parts.frontFootRight.matrix.scale(0.2, 0.1, 0.3);

        this.parts.leftThigh.textureNum = 1;
        this.parts.leftThigh.color = [1.0, 1.0, 1.0, 1.0];
        this.parts.leftThigh.matrix.translate(xOffset - 0.5, yOffset - 0.5, zOffset + 0.54);
        this.parts.leftThigh.matrix.rotate(-g_legAngle, 1, 0, 0);
        var thighCoordL = new Matrix4(this.parts.leftThigh.matrix);
        this.parts.leftThigh.matrix.rotate(10, 1, 0, 0);
        this.parts.leftThigh.matrix.scale(0.2, 0.4, 0.5);

        this.parts.backFootLeft.textureNum = 1;
        this.parts.backFootLeft.color = [1.0, 1.0, 1.0, 1.0];
        this.parts.backFootLeft.matrix = thighCoordL;
        this.parts.backFootLeft.matrix.translate(0, -0.18, 0);
        this.parts.backFootLeft.matrix.rotate(-g_backFootAngle, 1, 0, 0);
        var backCoordL = new Matrix4(this.parts.backFootLeft.matrix);
        this.parts.backFootLeft.matrix.scale(0.2, 0.1, 0.5);

        this.parts.frontFootLeft.textureNum = 1;
        this.parts.frontFootLeft.color = [1, 1, 1, 1];
        this.parts.frontFootLeft.matrix = new Matrix4(backCoordL);
        this.parts.frontFootLeft.matrix.translate(0, 0, -0.29);
        this.parts.frontFootLeft.matrix.scale(0.2, 0.1, 0.3);

        this.parts.head.textureNum = 1;
        this.parts.head.color = [1, 1, 1, 1];
        this.parts.head.matrix.translate(xOffset - 0.375, yOffset, zOffset - 0.3);
        this.parts.head.matrix.scale(0.45, 0.45, 0.45);

        this.parts.leftEar.textureNum = 1;
        this.parts.leftEar.color = [1, 1, 1, 1];
        this.parts.leftEar.matrix.translate(xOffset - 0.4, yOffset + 0.4, zOffset - 0.3);
        this.parts.leftEar.matrix.rotate(8, 0, 0);
        this.parts.leftEar.matrix.scale(0.2, 0.4, 0.08);

        this.parts.rightEar.textureNum = 1;
        this.parts.rightEar.color = [1, 1, 1, 1];
        this.parts.rightEar.matrix.translate(xOffset - 0.1, yOffset + 0.43, zOffset - 0.3);
        this.parts.rightEar.matrix.rotate(-8, 0, 0);
        this.parts.rightEar.matrix.scale(0.2, 0.4, 0.08);

        // Inner ears
        this.parts.innerLeftEar.color = [0.902, 0.627, 0.604, 1];
        this.parts.innerLeftEar.matrix.translate(xOffset - 0.3, yOffset + 0.45, zOffset - 0.3);
        this.parts.innerLeftEar.matrix.rotate(8, 0, 0);
        this.parts.innerLeftEar.matrix.scale(0.1, 0.3, 0.08);

        this.parts.innerRightEar.color = [0.902, 0.627, 0.604, 1];
        this.parts.innerRightEar.matrix.translate(xOffset - 0.1, yOffset + 0.45, zOffset - 0.3);
        this.parts.innerRightEar.matrix.rotate(-8, 0, 0);
        this.parts.innerRightEar.matrix.scale(0.1, 0.3, 0.08);

        // Arms
        this.parts.leftArm.textureNum = 1;
        this.parts.leftArm.color = [1, 1, 1, 1];
        this.parts.leftArm.matrix.translate(xOffset - 0.5, yOffset - 0.68, zOffset);
        this.parts.leftArm.matrix.translate(0, 0.5, 0);
        this.parts.leftArm.matrix.rotate(-g_armAngle, 1, 0, 0);
        this.parts.leftArm.matrix.translate(0, -0.5, 0);
        this.parts.leftArm.matrix.scale(0.2, 0.6, 0.2);

        this.parts.rightArm.textureNum = 1;
        this.parts.rightArm.color = [1, 1, 1, 1];
        this.parts.rightArm.matrix.translate(xOffset, yOffset - 0.68, zOffset);
        this.parts.rightArm.matrix.translate(0, 0.5, 0);
        this.parts.rightArm.matrix.rotate(-g_armAngle, 1, 0, 0);
        this.parts.rightArm.matrix.translate(0, -0.5, 0);
        this.parts.rightArm.matrix.scale(0.2, 0.6, 0.2);

        // Eyes and nose
        this.parts.leftEyeWhite.color = [1, 1, 1, 1];
        this.parts.leftEyeWhite.matrix.translate(xOffset - 0.24, yOffset + 0.25, zOffset - 0.35); // Adjusted z value
        this.parts.leftEyeWhite.matrix.scale(0.05, 0.05, 0.05);

        this.parts.leftEyeDark.color = [0, 0, 0, 1];
        this.parts.leftEyeDark.matrix.translate(xOffset - 0.24, yOffset + 0.25, zOffset - 0.37); // Adjusted z value
        this.parts.leftEyeDark.matrix.scale(0.03, 0.03, 0.03);

        this.parts.rightEyeWhite.color = [1, 1, 1, 1];
        this.parts.rightEyeWhite.matrix.translate(xOffset - 0.16, yOffset + 0.25, zOffset - 0.35); // Adjusted z value
        this.parts.rightEyeWhite.matrix.scale(0.05, 0.05, 0.05);

        this.parts.rightEyeDark.color = [0, 0, 0, 1];
        this.parts.rightEyeDark.matrix.translate(xOffset - 0.16, yOffset + 0.25, zOffset - 0.37); // Adjusted z value
        this.parts.rightEyeDark.matrix.scale(0.03, 0.03, 0.03);

        this.parts.nose.color = [1, 0, 0, 1];
        this.parts.nose.matrix.translate(xOffset - 0.2, yOffset + 0.2, zOffset - 0.32); // Adjusted z value
        this.parts.nose.matrix.scale(0.03, 0.03, 0.03);
    }

    draw(gl, u_ModelMatrix) {
        for (let partName in this.parts) {
            let part = this.parts[partName];
            gl.uniformMatrix4fv(u_ModelMatrix, false, part.matrix.elements);
            part.render();
        }
    }
}
