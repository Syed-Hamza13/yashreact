import { useEffect, useRef } from 'react';

const ImageStream = ({ images, cards = 9, speed = 18 }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const id = `ish-${Math.random().toString(36).slice(2, 6)}`;
    const rightAnim = `ish-r-${id}`;
    const leftAnim = `ish-l-${id}`;
    const cardClass = `ish-c-${id}`;

    const PATH_DEFAULTS = {
      perspective: 30,
      cardWidth: 18,
      cardHeight: 25,
      cardRadius: 0.4,
      birthHeight: 2.6,
      exitHeight: 46,
      railBirth: -11,
      railExit: 44,
      fan: 3.3,
      turnBirth: 6,
      turnExit: 28,
      stops: 24,
    };

    const keyframes = (dir, name, p) => {
      const steps = [];
      for (let s = 0; s <= p.stops; s++) {
        const u = s / p.stops;
        const scale = (p.birthHeight / p.cardHeight) * Math.pow(p.exitHeight / p.birthHeight, u);
        const z = p.perspective * (1 - 1 / scale);
        const rail = p.railExit - (p.railExit - p.railBirth) * Math.pow(1 - u, p.fan);
        const turn = p.turnBirth + (p.turnExit - p.turnBirth) * u;
        steps.push(
          `${(u * 100).toFixed(2)}%{transform:translate3d(${(dir * rail).toFixed(2)}cqw,0,${z.toFixed(2)}cqw) rotateY(${(-dir * turn).toFixed(2)}deg)}`
        );
      }
      return `@keyframes ${name}{${steps.join('')}}`;
    };

    const styleEl = document.createElement('style');
    styleEl.textContent =
      keyframes(1, rightAnim, PATH_DEFAULTS) +
      keyframes(-1, leftAnim, PATH_DEFAULTS);
    container.appendChild(styleEl);

    const perspectiveLayer = document.createElement('div');
    perspectiveLayer.className = 'absolute inset-0 pointer-events-none';
    perspectiveLayer.style.perspective = `${PATH_DEFAULTS.perspective}cqw`;
    perspectiveLayer.style.perspectiveOrigin = '50% 55%';

    const stage = document.createElement('div');
    stage.className = 'absolute inset-0';
    stage.style.transformStyle = 'preserve-3d';
    perspectiveLayer.appendChild(stage);

    [rightAnim, leftAnim].forEach((name) => {
      for (let i = 0; i < cards; i++) {
        const img = images[i % images.length];
        const cardEl = document.createElement('div');
        cardEl.className = `absolute ${cardClass}`;
        
        const style = cardEl.style;
        style.left = '50%';
        style.top = '55%';
        style.width = `${PATH_DEFAULTS.cardWidth}cqw`;
        style.height = `${PATH_DEFAULTS.cardHeight}cqw`;
        style.marginLeft = `-${PATH_DEFAULTS.cardWidth / 2}cqw`;
        style.marginTop = `-${PATH_DEFAULTS.cardHeight / 2}cqw`;
        style.borderRadius = `${PATH_DEFAULTS.cardRadius}cqw`;
        style.overflow = 'hidden';
        style.animation = `${name} ${speed}s linear infinite`;
        style.animationDelay = `-${(i * speed) / cards}s`;

        const imgEl = document.createElement('img');
        imgEl.src = img.src;
        imgEl.alt = img.alt || '';
        imgEl.className = 'w-full h-full object-cover';
        imgEl.loading = 'lazy';
        cardEl.appendChild(imgEl);

        stage.appendChild(cardEl);
      }
    });

    container.insertBefore(perspectiveLayer, container.firstChild);

    return () => {
      if (styleEl.parentNode) styleEl.parentNode.removeChild(styleEl);
    };
  }, [images, cards, speed]);

  return <div ref={containerRef} className="relative w-full h-full" />;
};

export default ImageStream;