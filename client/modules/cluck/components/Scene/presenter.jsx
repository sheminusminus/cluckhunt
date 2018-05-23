import * as React from 'react';

import bushModel from '../../../../assets/models/bush_red/model.dae';
import bushMaterial from '../../../../assets/models/bush_red/model/compact-burning-bush.png';
import cluckModel from '../../../../assets/models/chicken/model.dae';
import cluckMaterial from '../../../../assets/models/chicken/model/Vegetation_Blur7.jpg';
import dogModel from '../../../../assets/models/dog/model.dae';

import { Bush, Cluck, Dog } from './objects';

const { THREE } = global.window || { THREE: null };

const size = 600;
const numBushes = 10;
const numClucks = 2;

class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = null;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.bushes = [];
    this.dog = null;
    this.cluck = null;
    this.bindCallbacks();
  }

  bindCallbacks() {
    this.animate = this.animate.bind(this);
    this.canvasRef = this.canvasRef.bind(this);
    this.initScene = this.initScene.bind(this);
  }

  canvasRef(el) {
    this.canvas = el;
    if (THREE) {
      this.initScene();
      this.loadBushes();
      this.loadDog();
      this.loadLighting();
      this.loadCluck();
      this.animate();
    }
  }

  initScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x8e8e8e);
    this.camera = new THREE.PerspectiveCamera(75, 1, 0.5, 800);
    this.camera.position.set(2, 9, 1);
    this.camera.lookAt(new THREE.Vector3(0, 1, 0));
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setPixelRatio(1);
    this.renderer.setSize(size, size);
  }

  loadLighting() {
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, -1);
    this.scene.add(directionalLight);
  }

  loadBushes() {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(bushMaterial);
    const loader = new THREE.ColladaLoader();
    loader.load(bushModel, (collada) => {
      for (let i = 0; i < numBushes; i += 1) {
        const bush = new Bush(this.scene, collada.scene.clone(), texture);
        bush.object.position.set(Math.random(), Math.random(), Math.random());
        this.bushes.push(bush);
      }
      console.log(this.bushes.length);
    });
  }

  loadDog() {
    const loader = new THREE.ColladaLoader();
    loader.load(dogModel, (collada) => {
      this.dog = new Dog(this.scene, collada.scene.clone());
      this.dog.object.position.set(0, 0, 0);
    });
  }

  loadCluck() {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(cluckMaterial);
    const loader = new THREE.ColladaLoader();
    loader.load(cluckModel, (collada) => {
      this.cluck = new Cluck(this.scene, collada.scene.clone(), texture);
      // this.cluck.object.scale.set(1, 1, 1);
      this.cluck.object.position.set(0, -5, 0);
    });
  }

  animate() {
    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return <canvas ref={this.canvasRef} width={size} height={size} />;
  }
}

export default Scene;
