import * as React from 'react';

const { THREE } = global.window ? window : { THREE: null };

class Cluck {
  constructor(scene, object, material) {
    this.scene = scene;
    this.object = object;
    this.object.material = material;
    this.scene.add(this.object);
  }

  // animate() {}
}

export default Cluck;
