var particles = [];

//MAIN FUNCTION
function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    const particleNum = Math.floor(width / 10);
    for (i = 0; i < particleNum; i++) {
        particles.push(new Particle);
    }
}

//INFINITE LOOP
function draw() {
    background(0, 0, 0);
    particles.forEach((p, index) => {
        p.draw();
        p.update();
        p.connectParticles(particles.slice(index));
    })
}

class Particle {
    constructor() {
        //POSITION
        this.pos = createVector(random(width), random(height));
        //SIZE
        this.size = 10;

        this.vel = createVector(random(-2, 2), random(-2, 2));
    }
    //UPDATE
    update() {
        this.pos.add(this.vel);
        this.edges()
    }
    //DRAW
    draw() {
        noStroke();
        fill('rgb(255,255,255,0.5');
        circle(this.pos.x, this.pos.y, this.size);
    }
    //DOUNCE EDGES
    edges() {
        if (this.pos.x < 0 || this.pos.x > width) {
            this.vel.x *= -1;
        }
        if (this.pos.y < 0 || this.pos.y > height) {
            this.vel.y *= -1;
        }
    }

    connectParticles(particles) {
        particles.forEach(particle => {
            const d = dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);

            //THRESHOLD
            if (d < 120) {
                //DRAW LINE
                stroke('rgba(255,255,255,0.5)');
                line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
            }
        });

    }
}

