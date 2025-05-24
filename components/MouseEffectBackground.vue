<template>
  <canvas ref="canvas" class="w-full h-full"></canvas>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const canvas = ref(null);

onMounted(() => {
  const c = canvas.value;
  const ctx = c.getContext('2d');
  let width = window.innerWidth;
  let height = window.innerHeight;
  c.width = width;
  c.height = height;

  let particles = [];
  const num = 120;

  let mouse = { x: width / 2, y: height / 2, active: false };

  for (let i = 0; i < num; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 4 + 2,
      dx: (Math.random() - 0.5) * 2,
      dy: (Math.random() - 0.5) * 2,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    for (let p of particles) {
      if (mouse.active) {
        const distX = mouse.x - p.x;
        const distY = mouse.y - p.y;
        const dist = Math.sqrt(distX * distX + distY * distY);
        if (dist < 200) {
          p.dx += distX * 0.002;
          p.dy += distY * 0.002;
        }
      }
      p.dx *= 0.96;
      p.dy *= 0.96;
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > width) p.dx *= -1;
      if (p.y < 0 || p.y > height) p.dy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = '#00bfff';
      ctx.globalAlpha = 0.7;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
    requestAnimationFrame(draw);
  }

  draw();

  c.addEventListener('mousemove', (e) => {
    const rect = c.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
  });
  c.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    c.width = width;
    c.height = height;
    mouse.x = width / 2;
    mouse.y = height / 2;
  });
});
</script>

<style scoped>
canvas {
  position: absolute;
  inset: 0;
  width: 100vw;
  height: 100vh;
  display: block;
  pointer-events: auto;
  z-index: 0;
}
</style> 