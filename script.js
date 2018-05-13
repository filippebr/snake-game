var doc;
var canvas;
var ctx;
var WIDTH = 400, HEIGHT = 400;
var gs, tc;
var snake;

snake = {
  x: null,
  y: null,
  vx: null,
  vy: null,
  trail: null,
  tail: null,

  update: function() {
    this.x += this.vx;
    this.y += this.vy;

    if ( keystate['ArrowUp'] ) {
      this.vx = 0; this.vy = -1;
    }

    if ( keystate['ArrowDown'] ) {
      this.vx = 0; this.vy = 1;
    }

    if ( keystate['ArrowRight'] ) {
      this.vx = 1; this.vy = 0;
    }

    if ( keystate['ArrowLeft'] ) {
      this.vx = -1; this.vy = 0;
    }

    if ( this.x > tc - 1 ) {
      this.x = 0;
    }

    if ( this.x < 0 ) {
      this.x = tc - 1;
    }

    if ( this.y > tc - 1 ) {
      this.y = 0;
    }

    if ( this.y < 0 ) {
      this.y = tc - 1;
    }
  },

  draw: function() {
    ctx.fillStyle = '#fff';

    for ( let i = 0; i < this.trail.length; i++ ) {
      ctx.fillRect(this.trail[i].x * gs, this.trail[i].y * gs, gs - 2, gs - 2);

      if ( this.x == this.trail[i].x && this.y == this.trail[i].y ) {
        this.tail = 5;
      }
    }

    this.trail.push({x: this.x, y: this.y});

    while ( this.trail.length > this.tail ) {
      this.trail.shift();
    }
  }
};

apple = {
  x: null,
  y: null,

  update: function() {
    if ( snake.x == this.x && snake.y == this.y ) {
      snake.tail++;
      this.x = Math.floor(Math.random()*gs);
      this.y = Math.floor(Math.random()*gs);
    }
  },

  draw: function() {
    ctx.fillStyle = '#f00';
    ctx.fillRect(this.x * gs, this.y * gs, gs - 2, gs - 2);
  }
};

function main() {
  doc = document;
  canvas = doc.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  doc.body.appendChild(canvas);

  init();

  keystate = {};
  doc.addEventListener('keydown', function(evt) {
    keystate[evt.key] = true;
  }, false);
  doc.addEventListener('keyup', function(evt) {
    delete keystate[evt.key];
  }, false);

  setInterval(game, 1000/15);
}

function init() {
  gs = Math.sqrt(WIDTH);
  tc = Math.sqrt(HEIGHT);
  snake.x = Math.sqrt(WIDTH)/2;
  snake.y = Math.sqrt(HEIGHT)/2;
  snake.trail = []; snake.tail = 5;
  apple.x = Math.floor(Math.random()*gs);
  apple.y = Math.floor(Math.random()*gs);
}

function update() {
  snake.update();
  apple.update();
}

function draw() {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  ctx.save();
  snake.draw();
  apple.draw();
  ctx.restore();
}

function game() {
  update();
  draw();
}

main();
