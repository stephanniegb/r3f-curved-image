"use client";
import { Suspense, useState } from "react";
import Projects from "./components/Projects";
import Scene from "./components/Scene";
import Loading from "./loading";

export default function Home() {
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  return (
    <Suspense fallback={<Loading />}>
      <main>
        <div className="h-[50vh]"></div>
        <Scene activeMenu={activeMenu} />
        <Projects setActiveMenu={setActiveMenu} />
        <div className="h-[50vh]"></div>
      </main>
    </Suspense>
  );
}
