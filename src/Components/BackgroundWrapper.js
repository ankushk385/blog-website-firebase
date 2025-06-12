// Components/BackgroundWrapper.js
import { useEffect, useRef } from "react";

const BackgroundWrapper = ({ children }) => {
  const effectRef = useRef(null);
  const backgroundRef = useRef(null);

  useEffect(() => {
    const threeScript = document.createElement("script");
    threeScript.src =
      "https://cdn.jsdelivr.net/npm/three@0.124.0/build/three.min.js";
    threeScript.async = true;

    threeScript.onload = () => {
      const vantaScript = document.createElement("script");
      vantaScript.src =
        "https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.birds.min.js";
      vantaScript.async = true;

      vantaScript.onload = () => {
        if (!effectRef.current && window.VANTA?.BIRDS) {
          effectRef.current = window.VANTA.BIRDS({
            el: backgroundRef.current,
            THREE: window.THREE,
            backgroundColor: 0xffffff,
            color1: 0x0077ff,
            color2: 0xff77ff,
            birdSize: 1.0,
            wingSpan: 20.0,
            quantity: 3.0,
            scale: 1.0,
            scaleMobile: 0.8,
            mouseControls: true,
            touchControls: true,
          });
        }
      };

      document.body.appendChild(vantaScript);
    };

    document.body.appendChild(threeScript);

    return () => {
      if (effectRef.current) effectRef.current.destroy();
    };
  }, []);

  return (
    <div ref={backgroundRef} className="background-wrapper">
      {children}
    </div>
  );
};

export default BackgroundWrapper;
