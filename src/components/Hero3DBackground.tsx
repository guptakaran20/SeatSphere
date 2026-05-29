"use client";

import { motion, useScroll, useTransform } from "framer-motion";

type Hero3DBackgroundProps = {
  sceneUrl?: string;
};

const DEFAULT_SCENE_URL = "https://my.spline.design/gameintroinachurch-MxkOvKN0q2FNNMwHLg8DJEJn/";

export function Hero3DBackground({ sceneUrl = DEFAULT_SCENE_URL }: Hero3DBackgroundProps) {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 0.8, 0.65]);

  return (
    <motion.div style={{ scale, opacity }} className="fixed inset-0 -z-10 h-screen w-full overflow-hidden">
      <iframe
        title="SeatSphere 3D Background"
        src={sceneUrl}
        loading="eager"
        className="h-full w-full"
      />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/45 via-white/58 to-white/92" />
    </motion.div>
  );
}
