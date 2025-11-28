
const hotspotConfigs = [
  {
    src: 'assets/chocolate.glb',
    slot: 'garnish',
    position: '-0.015m 0.06m -0.01m',
    normal: '0m 1m 0m',
    tooltip: 'Chocolate and Kirsch teddy bear.',
  },
  {
    src: 'assets/wedding-cake.glb',
    slot: 'top-tier',
    position: '0m 0.08m 0m',
    normal: '0m 1m 0m',
    tooltip: 'Hand-piped sugar ornaments.',
  },
  {
    src: 'assets/flower-25.glb',
    slot: 'citrus',
    position: '0m 0.24m -0.02m',
    normal: '0m 1m 0m',
    tooltip: 'Lemon/strawberry flavoured flowers.',
  },
  {
    src: 'assets/blackforest.glb',
    slot: 'crunch',
    position: '0m 0.05m 0m',
    normal: '0m 1m 0m',
    tooltip: 'Edible chocolate teddy bear.',
  },
];

const frameCount = 20;
const framePath = (index) =>
  `assets/Comp 1/Comp 1_${index.toString().padStart(5, '0')}.png`;

// Hotspots on top of cake models
const createHotspots = () => {
  hotspotConfigs.forEach(({ src, slot, position, normal, tooltip }, index) => {
    const viewer = document.querySelector(`model-viewer[src="${src}"]`);
    if (!viewer) return;

    const hotspot = document.createElement('button');
    hotspot.slot = `hotspot-${slot || `info-${index + 1}`}`;
    hotspot.classList.add('cake-hotspot');
    hotspot.setAttribute('data-position', position);
    hotspot.setAttribute('data-normal', normal);
    hotspot.setAttribute('data-tooltip', tooltip);
    hotspot.setAttribute('aria-label', tooltip);
    hotspot.title = tooltip;

    viewer.appendChild(hotspot);
  });
};

// Swap hero sequence frames based on scroll progress
const initScrollSequence = () => {
  const animatedImage = document.getElementById('animatedImage');
  if (!animatedImage) return;

  const heroSection = document.getElementById('hero') || animatedImage;

  const updateFrame = () => {
    const rect = heroSection.getBoundingClientRect();
    const totalScroll = rect.height + window.innerHeight;
    const progress = Math.min(
      Math.max((window.innerHeight - rect.top) / totalScroll, 0),
      1,
    );
    const targetFrame = Math.min(
      frameCount - 1,
      Math.floor(progress * (frameCount - 1)),
    );

    if (animatedImage.dataset.frame === String(targetFrame)) return;
    animatedImage.src = framePath(targetFrame);
    animatedImage.dataset.frame = String(targetFrame);
  };

  window.addEventListener('scroll', updateFrame, { passive: true });
  window.addEventListener('resize', updateFrame);
  updateFrame();
};

const initPage = () => {
  createHotspots();
  initScrollSequence();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPage);
} else {
  initPage();
}
