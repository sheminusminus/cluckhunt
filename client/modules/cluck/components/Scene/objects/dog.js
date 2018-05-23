import * as React from 'react';

const { THREE } = global.window ? window : { THREE: null };

class Dog {
  constructor(scene, object) {
    this.scene = scene;
    this.object = object;
    this.scene.add(this.object);
  }

  // animate() {}
}

export default Dog;
