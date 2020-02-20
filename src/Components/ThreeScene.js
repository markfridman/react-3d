import React, { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import * as dat from 'dat.gui'
import './ThreeScene.css'

function ThreeScene() {
  // const [velx, setVelX] = useState(0.001)
  // const [vely, setVelY] = useState(0.001)
  const [isAnimating, setAnimating] = useState(true)

  const mount = useRef(null)
  const controls = useRef(null)
  // function handleSetVelX(val) {
    // setVelX(val)
  // }

  useEffect(() => {
    let width = mount.current.clientWidth
    let height = mount.current.clientHeight
    let frameId

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0xff00ff })
    const cube = new THREE.Mesh(geometry, material)
    var sphereGeometry2 = new THREE.SphereGeometry(0.25, 32, 32);
    var sphereMaterial2 = new THREE.MeshBasicMaterial({ color: 0xffffff });
    var eye = new THREE.Mesh(sphereGeometry2, sphereMaterial2);
    // var loader = new THREE.TextureLoader()
    // loader.load('public/logo192.png', function (texture) {
    let eye2 = new THREE.Mesh(sphereGeometry2, sphereMaterial2)
    eye.position.x = 1.3
    eye.position.y = -1
    eye.position.z = 5
    eye2.position.x = -1
    eye2.position.y = -1.4
    eye2.position.z = 5
    var sphereGeometry = new THREE.SphereGeometry(5, 32, 32);
    // var sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x5278FF });
    var sphereMaterial = new THREE.MeshPhongMaterial({ ambient: 0x050505, color: 0x5278FF, specular: 0x555555, shininess: 10 });
    material.map = THREE.ImageUtils.loadTexture('public/logo192.png')
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    var light = new THREE.DirectionalLight(0xffffff);
    var light2 = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 1, 1).normalize();
    light2.position.set(0, -1, -1).normalize();
    scene.add(light);
    scene.add(light2);
    scene.add(sphere);
    scene.add(eye);
    scene.add(eye2);
    camera.position.z = 17
    // scene.add(cube)

    // Options to be added to the GUI

    let options = {
      velx: cube.rotation.x,
      vely: cube.rotation.y,
      camera: {
        far: 1000
      },
      stop: function () {
        // setVelX(0)
        // setVelY(0)
      },
      reset: function () {
        // setVelX(0.1);
        // setVelY(0.1);
        camera.position.z = 75;
        camera.position.x = 0;
        camera.position.y = 0;
        cube.scale.x = 1;
        cube.scale.y = 1;
        cube.scale.z = 1;
        cube.material.wireframe = true;
      }
    };

    let gui = new dat.GUI()

    let cam = gui.addFolder('Camera')
    cam.add(camera.position, 'y', 0, 100).listen();
    cam.add(camera.position, 'x', 0, 100).listen();
    cam.add(camera.position, 'z', 0, 100).listen();
    cam.open();

    // var velocity = gui.addFolder('Velocity');
    // velocity.add(options, 'velx', -0.2, 0.2).name('X').listen();
    // velocity.add(options, 'vely', -0.2, 0.2).name('Y').listen();
    // velocity.open()

    // var box = gui.addFolder('Cube');
    // box.add(cube.scale, 'x', 0, 3).name('Width').listen();
    // box.add(cube.scale, 'y', 0, 3).name('Height').listen();
    // box.add(cube.scale, 'z', 0, 3).name('Length').listen();
    // box.add(cube.material, 'wireframe').listen();
    // box.open();

    var ball = gui.addFolder('Sphere');
    ball.add(eye2.position, 'x', -20, 20).name('X').listen();
    ball.add(eye2.position, 'y', -20, 20).name('Y').listen();
    ball.add(eye2.position, 'z', -20, 20).name('Z').listen();
    //  ball.add(sphere.material, 'wireframe').listen();
    ball.open();

    renderer.setClearColor('#000000')
    renderer.setSize(width, height)

    const renderScene = () => {
      renderer.render(scene, camera)
    }

    const handleResize = () => {
      width = mount.current.clientWidth
      height = mount.current.clientHeight
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderScene()
    }

    const animate = () => {
      cube.rotation.x += options.velx;
      cube.rotation.y += options.vely;

      renderScene()
      frameId = window.requestAnimationFrame(animate)
    }

    const start = () => {
      if (!frameId) {
        frameId = requestAnimationFrame(animate)
      }
    }

    const stop = () => {
      cancelAnimationFrame(frameId)
      frameId = null
    }

    mount.current.appendChild(renderer.domElement)
    window.addEventListener('resize', handleResize)
    start()

    controls.current = { start, stop }

    return () => {
      stop()
      window.removeEventListener('resize', handleResize)
      mount.current.removeChild(renderer.domElement)

      scene.remove(cube)
      geometry.dispose()
      material.dispose()
    }
  }, [])

  useEffect(() => {

  })
  useEffect(() => {
    if (isAnimating) {
      controls.current.start()
    } else {
      controls.current.stop()
    }
  }, [isAnimating])
  useEffect(() => {

  }, [])
  return (
    <div className="vis" ref={mount} onClick={() => setAnimating(!isAnimating)} />
  )
}

export default ThreeScene