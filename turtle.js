var turtle = {};

// create a turtle with default values
turtle.birth = function()
{
	turtle.x = turtle.origin.x; // go to home
	turtle.y = turtle.origin.y;
	turtle.angle = -90 * Math.PI / 180; // face upwards
	
	turtle.wait = turtle.wait || 0
	turtle.sleep = false;
	turtle.looptrap = 1000;
	
	turtle.path = {}; // start coordinates of the current path (force new path)
	turtle.path.x = null;
	turtle.path.y = null;
	
	turtle.pen = {}; // pen properties
	turtle.pen.down = true;
	turtle.pen.fillcolor = "White";
	turtle.pen.linecolor = "Black";
	turtle.pen.linewidth = 1;
};

// draw turtle to the overlay canvas
turtle.drop = function()
{
	tanvas.clearRect(0, 0, t.width, t.height);
	
	tanvas.lineWidth = 2;
	tanvas.strokeStyle = "Black";
	
	tanvas.beginPath();
	tanvas.arc(turtle.x, turtle.y, 10, 0, 2*Math.PI);
	tanvas.stroke();
	
	var x = turtle.x + 10 * Math.cos(turtle.angle);
	var y = turtle.y + 10 * Math.sin(turtle.angle);
	tanvas.lineWidth = 5;
	tanvas.strokeStyle = turtle.pen.linecolor;
	tanvas.fillStyle = turtle.pen.fillcolor;
	tanvas.beginPath();
	tanvas.arc(x, y, 4, 0, 2*Math.PI);
	tanvas.stroke();
	tanvas.fill();
};

var home = function()
{
	turtle.x = turtle.origin.x;
	turtle.y = turtle.origin.y;
	turtle.drop();
}

// draw/move
var go = function(dir, dist)
{
	// set line color and width
	canvas.strokeStyle = turtle.pen.linecolor;
	canvas.lineWidth = turtle.pen.linewidth;
	
	// calculate end coordinates
	var x = turtle.x + dist * dir * Math.cos(turtle.angle);
	var y = turtle.y + dist * dir * Math.sin(turtle.angle);
	
	// draw/move
	if (turtle.pen.down) // draw
	{
		/*canvas.beginPath();
		canvas.moveTo(turtle.x, turtle.y);
		canvas.lineTo(x, y);
		canvas.stroke();
		canvas.closePath();
		console.log("draw", typeof(turtle.pen.down));*/
		
		
		if (turtle.path.x == null && turtle.path.y == null) // start a new path
		{
			turtle.path.x = turtle.x;
			turtle.path.y = turtle.y;
			canvas.beginPath();
			canvas.moveTo(turtle.x, turtle.y);
			console.log("start");
		}
		canvas.lineTo(x, y); // draw line
			console.log("in");
		if (turtle.path.x <= x+1 && turtle.path.x >= x-1 && turtle.path.y <= y+1 && turtle.path.y >= y-1) // close the current path
		{
			turtle.path.x = null;
			turtle.path.y = null;
			canvas.closePath();
			console.log("close");
		}
		canvas.stroke();
	}
	else // jump
	{
		turtle.path.x = null; // force-start new path
		turtle.path.y = null;
		canvas.moveTo(x, y);
	}
	
	// set turtle coordinates
	turtle.x = x;
	turtle.y = y;
	
	// redraw turtle
	turtle.drop();
};

// turn
var turn = function(dir, deg)
{
	// set turtle angle
	turtle.angle += (deg * dir * Math.PI / 180);
	
	// redraw turtle
	turtle.drop();
};

// fill
var fill = function()
{
	canvas.fillStyle = turtle.pen.fillcolor;
	canvas.fill();
};

// set pen values
var set = function(name, value)
{
	// save previous canvas state
	canvas.save();
	
	// fix boolean messed up by the interpreter
	if (name === "down")
	{
		value = (value === "true");
	}
	
	// set value
	turtle.pen[name] = value;
	
	// redraw turtle
	turtle.drop();
};