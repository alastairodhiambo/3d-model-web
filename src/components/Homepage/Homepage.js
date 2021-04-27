import React, { Component } from "react";
import * as THREE from "three";
import "./Homepage.scss";

export default class Homepage extends Component {
  componentDidMount() {
    /********* My Code **********/
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x151515);
    /**
     * Sizes
     */
    let width = window.innerWidth - 40;
    if (window.innerWidth > 1400) {
      width = 1380;
    }
    const sizes = {
      width: width,
      height: 800,
    };

    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.mount.appendChild(renderer.domElement);

    /**
     * Galaxy
     */
    const parameters = {};
    parameters.count = 10000;
    parameters.size = 0.01;
    parameters.radius = 2;
    parameters.branches = 3;
    parameters.spin = 1;
    parameters.randomness = 0.2;
    parameters.randomnessPower = 3;
    parameters.insideColor = "#c4fcf0";
    parameters.outsideColor = "#ce9feb";

    let geometry = null;
    let material = null;
    let points = null;

    const generateGalaxy = () => {
      if (geometry != null || material != null || points != null) {
        geometry.dispose();
        material.dispose();
        scene.remove(points);
      }

      geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(parameters.count * 3);
      const colors = new Float32Array(parameters.count * 3);

      const colorInside = new THREE.Color(parameters.insideColor);
      const colorOutside = new THREE.Color(parameters.outsideColor);

      for (let i = 0; i < parameters.count; i++) {
        const i3 = i * 3;

        // Position
        const radius = Math.random() * parameters.radius;
        const spinAngle = radius * parameters.spin;
        const branchAngle =
          ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

        const randomX =
          Math.pow(Math.random(), parameters.randomnessPower) *
          (Math.random() < 0.5 ? 1 : -1);
        const randomY =
          Math.pow(Math.random(), parameters.randomnessPower) *
          (Math.random() < 0.5 ? 1 : -1);
        const randomZ =
          Math.pow(Math.random(), parameters.randomnessPower) *
          (Math.random() < 0.5 ? 1 : -1);

        positions[i3 + 0] =
          Math.cos(branchAngle + spinAngle) * radius + randomX;
        positions[i3 + 1] = randomY;
        positions[i3 + 2] =
          Math.sin(branchAngle + spinAngle) * radius + randomZ;

        // Color
        const mixedColor = colorInside.clone();
        mixedColor.lerp(colorOutside, radius / parameters.radius);
        colors[i3] = mixedColor.r;
        colors[i3 + 1] = mixedColor.g;
        colors[i3 + 2] = mixedColor.b;
      }

      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      /**
       * Material
       */
      material = new THREE.PointsMaterial({
        size: parameters.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
      });

      /**
       * Points
       */
      points = new THREE.Points(geometry, material);
      scene.add(points);
    };

    generateGalaxy();

    /**
     * Camera
     */
    // Base camera
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      100
    );
    camera.position.x = 0;
    camera.position.y = 0.5;
    camera.position.z = 3;
    scene.add(camera);

    // // Controls
    // const controls = new OrbitControls(camera, canvas);
    // controls.enableDamping = true;

    /**
     * Animate
     */
    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      points.rotation.y = elapsedTime * 0.1;

      // Render
      renderer.render(scene, camera);

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();
  }
  render() {
    return <div ref={(ref) => (this.mount = ref)} />;
  }
}
// const rootElement = document.getElementById("root");
// // ReactDOM.render(<App />, rootElement);
// export default App;
