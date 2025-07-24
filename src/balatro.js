const canvas = document.getElementById('balatro-bg');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function randomColor(opacity = 0.3) {
    const r = Math.floor(150 + Math.random() * 100);
    const g = Math.floor(100 + Math.random() * 155);
    const b = Math.floor(150 + Math.random() * 100);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

const waves = [];

for (let i = 0; i < 5; i++) {
    waves.push({
        amp: 30 + Math.random() * 50,
        freq: 0.002 + Math.random() * 0.002,
        speed: 0.5 + Math.random() * 1,
        phase: Math.random() * Math.PI * 2,
        color: randomColor()
    });
}

function draw(time) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'lighter'; // add glow effect

    waves.forEach(wave => {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);

        for (let x = 0; x <= canvas.width; x++) {
            const y = canvas.height / 2 +
                Math.sin(x * wave.freq + time * wave.speed * 0.001 + wave.phase) * wave.amp;
            ctx.lineTo(x, y);
        }

        ctx.strokeStyle = wave.color;
        ctx.lineWidth = 2;
        ctx.stroke();
    });

    requestAnimationFrame(draw);
}

draw(0);
