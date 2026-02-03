"use client";

import { Environment } from "@react-three/drei";
import { useRef } from "react";
import { Group } from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

import FloatingCan from "@/components/FloatingCan";
import { useMediaQuery } from "@/hooks/useMediaQuery";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Scene() {
  const isDesktop = useMediaQuery("(min-width: 768px)", true);

  console.log(isDesktop);
  const canRef = useRef<Group>(null);

  const bgColors = ["#FFA6B5", "#E9CFF6", "#CBEF9A"];

  useGSAP(() => {
    if (!canRef.current) return;
    const can = canRef.current;

    const sections = gsap.utils.toArray(".alternating-section");
    const mm = gsap.matchMedia();

    // matchMedia sẽ tự động dọn dẹp (cleanup) mọi thứ khi màn hình thay đổi
    mm.add(
      {
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)",
      },
      (context) => {
        const { isDesktop } = context.conditions || { isDesktop: false };
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".alternating-text-view",
            endTrigger: ".alternating-text-container",
            pin: true,
            pinSpacing: false, // BẮT BUỘC để tránh phình layout
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        if (isDesktop) {
          can.position.x = 1;
        } else {
          can.position.x = 0;
        }

        sections.forEach((_, index) => {
          if (index === 0) return;
          const isOdd = index % 2 !== 0;

          scrollTl
            .to(can.position, {
              x: isDesktop ? (isOdd ? -1 : 1) : 0, // Giá trị tĩnh vì matchMedia sẽ chạy lại khi đổi màn hình
              ease: "circ.inOut",
              delay: 0.5,
            })
            .to(
              can.rotation,
              {
                y: isOdd ? 0.4 : -0.4,
                ease: "back.inOut",
                delay: 0.5,
              },
              "<",
            )
            .to(".alternating-text-container", {
              backgroundColor: gsap.utils.wrap(bgColors, index),
            });
        });
      },
    );

    return () => mm.revert(); // Dọn dẹp sạch sẽ toàn bộ pin, spacer, style...
  }, []); // Để mảng rỗng vì matchMedia tự lắng nghe resize rồi
  return (
    // position-x={isDesktop ? 1 : 0}
    <group ref={canRef} rotation-y={-0.3}>
      <FloatingCan flavor="strawberryLemonade" scale={isDesktop ? 1 : 0.7} />
      <Environment files={"/hdr/lobby.hdr"} environmentIntensity={1} />
    </group>
  );
}
