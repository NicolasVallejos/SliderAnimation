import { particlesCursor } from 'https://unpkg.com/threejs-toys@0.0.8/build/threejs-toys.module.cdn.min.js';

const pc = particlesCursor({
    el: document.getElementById('app'),
    gpgpuSize: 512,
    colors: [0xffff00, 0xffff00],
    color: 0x0000ff,
    coordScale: 0.5,
    noiseIntensity: 0.005,
    noiseTimeCoef: 0.0001,
    pointSize: 2,
    pointDecay: 0.0025,
    sleepRadiusX: 250,
    sleepRadiusY: 250,
    sleepTimeCoefX: 0.001,
    sleepTimeCoefY: 0.002
});

// Actualiza las partículas dependiendo el movimiento del mouse
document.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX / window.innerWidth;
    const mouseY = 1 - event.clientY / window.innerHeight;
    
    pc.uniforms.uMousePos.value.set(mouseX, mouseY);
});

const positionRange = document.getElementById('position-range');

// Actualiza la posición de la partícula basada en el valor del rango
positionRange.addEventListener('input', (event) => {
    const newValue = parseFloat(event.target.value) / 127; // Normaliza el valor a 0-1
    pc.uniforms.uPositionValue.value = newValue;
});

// Escucha el evento 'mousemove' para actualizar el valor del rango
document.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX / window.innerWidth;
    const positionValue = Math.floor(mouseX * 127); // Escala el valor a 0-127
    positionRange.value = positionValue;
    pc.uniforms.uMousePos.value.set(mouseX, 0); // Establece la posición de la partícula
});
