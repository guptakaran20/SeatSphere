"use client";

type Hero3DProps = {
  sceneUrl?: string;
};

const defaultSceneUrl = "https://my.spline.design/gameintroinachurch-MxkOvKN0q2FNNMwHLg8DJEJn/";

export function Hero3D({ sceneUrl = defaultSceneUrl }: Hero3DProps) {
  return (
    <div className="relative h-90 w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg sm:h-107.5">
      <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-br from-white/20 via-transparent to-teal-100/30" />
      <iframe
        title="SeatSphere 3D Preview"
        src={sceneUrl}
        loading="lazy"
        className="h-full w-full"
      />
    </div>
  );
}

export default Hero3D;