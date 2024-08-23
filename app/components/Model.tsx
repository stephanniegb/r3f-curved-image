import { animate, useMotionValue, useTransform } from "framer-motion";
import useMouse from "./useMouse";
import { motion as m } from "framer-motion-3d";
import useDimension from "./useDimension";
import { MeshProps, useFrame, useThree } from "@react-three/fiber";
import { fragment, vertex } from "./shader";
import { useAspect, useTexture } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { projects } from "./data";
const Model = ({ activeMenu }: { activeMenu: number | null }) => {
  const dimension = useDimension();
  const mouse = useMouse();
  const { viewport } = useThree();
  const alpha = useMotionValue(0);

  const textures = projects.map((project) => useTexture(project.src));

  /* this helps the texture maintain its aspect ratio, so plane is 1,1 and scaled */
  const scale = useAspect(
    textures[0].image.width,
    textures[0].image.height,
    0.225
  );

  const uniforms = useRef({
    uTexture: { value: textures[0] },
    uOffset: { value: { x: 0, y: 0 } },
    uAlpha: { value: 1 },
  });

  useEffect(() => {
    if (mesh.current?.material) {
      if (activeMenu !== null) {
        animate(alpha, 1, {
          duration: 0.2,
          onUpdate: (progress) => {
            //@ts-ignore
            mesh.current.material.uniforms.uAlpha.value = progress;
          },
        });
        //@ts-ignore
        mesh.current.material.uniforms.uTexture.value = textures[activeMenu];
      } else {
        animate(alpha, 0, {
          duration: 0.2,
          onUpdate: (progress) => {
            //@ts-ignore

            mesh.current.material.uniforms.uAlpha.value = progress;
          },
        });
      }
    }
  }, [activeMenu]);

  const smoothMouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const mesh = useRef<MeshProps | null>(null);

  const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;
  useFrame(() => {
    const { x, y } = mouse;
    const smoothX = smoothMouse.x.get();
    const smoothY = smoothMouse.y.get();
    smoothMouse.x.set(lerp(smoothX, x.get(), 0.1));
    smoothMouse.y.set(lerp(smoothY, y.get(), 0.1));
    if (mesh.current?.material) {
      //@ts-ignore
      mesh.current.material.uniforms.uOffset.value = {
        x: x.get() - smoothX,
        y: -1 * (y.get() - smoothY),
      };
    }
  });

  const x = useTransform(
    smoothMouse.x,
    [0, dimension.width],
    [(-1 * viewport.width) / 2, viewport.width / 2]
  );
  const y = useTransform(
    smoothMouse.y,
    [0, dimension.height],
    [viewport.height / 2, (-1 * viewport.height) / 2]
  );

  return (
    <m.mesh ref={mesh} scale={scale} position-x={x} position-y={y}>
      <planeGeometry args={[1, 1, 15, 15]} />
      <shaderMaterial
        uniforms={uniforms.current}
        vertexShader={vertex}
        fragmentShader={fragment}
        transparent
      />
    </m.mesh>
  );
};

export default Model;
