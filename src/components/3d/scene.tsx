import * as THREE from 'three'
import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Bvh, PerformanceMonitor } from '@react-three/drei'
import { EffectComposer, N8AO } from '@react-three/postprocessing'
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
} from '@react-three/rapier'

// @ts-expect-error
THREE.ColorManagement.legacyMode = false
const baubleMaterial = new THREE.MeshLambertMaterial({
  color: '#DBFF00',
  emissive: '#DBFF00',
  emissiveIntensity: 0.475,
})
const sphereGeometry = new THREE.SphereGeometry(1, 28, 28)
const baubles = (count: number) =>
  [...Array(count)].map(() => ({
    scale: [0.75, 0.85, 1, 1.25, 1.5][Math.floor(Math.random() * 5)],
  }))

function Bauble({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
}: {
  vec: THREE.Vector3
  scale: number
  r: (n: number) => number
}) {
  const api = useRef(null)
  useFrame((state, delta) => {
    delta = Math.min(0.1, delta)
    // @ts-expect-error
    api.current.applyImpulse(
      vec
        // @ts-expect-error
        .copy(api.current.translation())
        .normalize()
        .multiply({
          x: (-50 * delta * scale) / 2,
          y: (-150 * delta * scale) / 2,
          z: (-50 * delta * scale) / 2,
        }),
    )
  })
  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={baubleMaterial}
      />
    </RigidBody>
  )
}

function Pointer({ vec = new THREE.Vector3() }) {
  const ref = useRef()
  useFrame(({ mouse, viewport }) => {
    vec.lerp(
      {
        x: (mouse.x * viewport.width) / 3.333,
        y: (mouse.y * viewport.height) / 3.333,
        z: 0,
      },
      0.275,
    )
    // @ts-expect-error
    ref.current?.setNextKinematicTranslation(vec)
  })
  return (
    <RigidBody
      position={[100, 100, 100]}
      type={'kinematicPosition'}
      colliders={false}
      // @ts-expect-error
      ref={ref}
    >
      <BallCollider args={[4]} />
    </RigidBody>
  )
}

const Scene = ({ id }: { id?: string }) => {
  const [documentBody, setDocumentBody] = useState<
    HTMLElement | MutableRefObject<HTMLElement> | undefined
  >(undefined)
  useEffect(() => {
    document !== undefined && setDocumentBody(document.body)
  }, [])
  const [baublesCount, setBaublesCount] = useState(30)

  useEffect(() => {
    window.innerWidth <= 1680 && setBaublesCount(16)
    window.innerWidth <= 768 && setBaublesCount(10)
  }, [])

  return (
    <React.Fragment>
      {/* <p>fps: {fps}</p>
      <p>width: {windowSize.width}</p> */}
      <Canvas
        shadows
        id={id}
        dpr={1}
        gl={{ alpha: true, stencil: false, depth: true, antialias: false }}
        camera={{ position: [0, 0, 20], fov: 30, near: 1, far: 100 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.25)}
        frameloop={'demand'}
        style={{
          width: '100vw',
          height: '80vh',
          position: 'absolute',
          left: 0,
          top: 0,
          zIndex: 20,
        }}
        eventSource={documentBody}
        eventPrefix={'client'}
      >
        {/* <PerformanceMonitor
          factor={1}
          flipflops={3}
          onChange={({ fps }) => {
            setFps(fps)
          }}
        /> */}
        <Bvh firstHitOnly>
          <ambientLight intensity={1} />
          <spotLight
            position={[20, 20, 25]}
            penumbra={1}
            angle={0.2}
            color={'#DBFF00'}
            intensity={500}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <directionalLight position={[0, 5, -4]} intensity={4} />

          <Physics gravity={[0, 0, 0]}>
            <Pointer />
            {baubles(baublesCount).map((props, i) => (
              // @ts-expect-error: ...props not infered correctly
              <Bauble key={i} {...props} />
            ))}
          </Physics>
          <EffectComposer disableNormalPass>
            <N8AO color={'white'} aoRadius={2} intensity={1} />
          </EffectComposer>
        </Bvh>
      </Canvas>
    </React.Fragment>
  )
}

export default Scene
