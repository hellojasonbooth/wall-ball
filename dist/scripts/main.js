let position
let speed
let radius
let counter = 0
const output = document.querySelector('div.score-wrap div.score')


function setup() {
  createCanvas(windowWidth, windowHeight)
  background('#f3f3f3')
  position = createVector(200, 200)
  speed = createVector(4, 4)
	radius = 80
	output.innerHTML = counter++
}

function draw(x, y) {
  this.x = x
  this.y = y
  background('#f3f3f385')
  fill('#000')
  circle(position.x, position.y, radius * 2)
  noStroke()
  position.add(speed)
	
    if (position.y > windowHeight - radius || position.y < radius){
      speed.y = speed.y * -1
    }

    if (position.x > windowWidth - radius || position.x < radius){
        speed.x = speed.x * -1
    }

    const distToCursor = dist(mouseX, mouseY, position.x, position.y)
      if (distToCursor < radius) {
        cursor('crosshair')
      } else {
        cursor('auto')
      }
  
    this.clicked = function(){
      const d = dist(mouseX, mouseY, position.x, position.y)
      let angle = random(TWO_PI)

//    output.style.transform = 'rotate3d(1, 0, 1, 360deg)'

      if (d < radius) {
        output.innerHTML = counter++  
        speed.mult(1.2)
        speed.rotate(angle)
        radius = radius -5
				// animate the score 
        scoreAnimate()
				//output.classList.toggle('hit')
       	// output.style.transform = 'rotate3d(1, 0, 1, 360deg)'
      }

			// add some supportive alerts
			const alertTag = document.querySelectorAll('div.alerts h3')
			let finishTime = 1400

			alertTag.forEach((tag, index) => {
        if (output.innerHTML == 3 && index == 0 || 
            output.innerHTML == 6 && index == 1 || 
            output.innerHTML == 10 && index == 2 || 
            output.innerHTML == 12 && index == 3) {
          tag.classList.add('active')
          setTimeout(function() {
              tag.classList.add('finished')
          }, finishTime);
        }
      })
      
      function scoreAnimate() {
        output.classList.toggle('hit')
      }
      
    }

	positionX = constrain(position.x, radius, windowWidth - radius)
	positionY = constrain(position.y, radius, windowHeight - radius)

}

function mousePressed(){
  clicked()
}

function touchStarted(){
  clicked()
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}


