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
	
	tanvas.lineWidth = 3;
	tanvas.strokeStyle = "Black";
	if (!turtle.pen.down)
	{
		tanvas.setLineDash([4, 2]);
	}
	
	tanvas.beginPath();
	tanvas.arc(turtle.x, turtle.y, 10, 0, 2*Math.PI);
	tanvas.stroke();
	
	var x = turtle.x + 10 * Math.cos(turtle.angle);
	var y = turtle.y + 10 * Math.sin(turtle.angle);
	tanvas.lineWidth = 6;
	tanvas.strokeStyle = turtle.pen.linecolor;
	tanvas.setLineDash([0]);
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
	turtle.angle = -90 * Math.PI / 180;
	turtle.drop();
}

// draw/move
var go = function(dir, dist)
{
	// set line color and width
	canvas.strokeStyle = turtle.pen.linecolor;
	canvas.lineWidth = turtle.pen.linewidth;
	canvas.lineCap = "round";
	
	// calculate end coordinates
	var x = turtle.x + dist * dir * Math.cos(turtle.angle);
	var y = turtle.y + dist * dir * Math.sin(turtle.angle);
	
	// draw the path
	canvas.beginPath();
	canvas.moveTo(turtle.x, turtle.y);
	if (turtle.pen.down)
	{
		canvas.lineTo(x, y);
	}
	else
	{
		canvas.moveTo(x, y);
	}
	canvas.stroke();
	
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
	canvas.fillFlood(Math.round(turtle.x), Math.round(turtle.y), 0);
};

// set pen values
var set = function(name, value)
{
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

// generate a random color
var randomcolor = function(which)
{
	// create color
	var rand = Math.floor(Math.random() * 12);
	rand = (which === "linecolor" && rand === 3) ? 2 : rand;
	rand = (which === "fillcolor" && rand === 0) ? 1 : rand;
	var colors = ["Black", "Grey", "LightGrey", "White", "Blue", "LightBlue", "Green", "LightGreen", "Red", "Pink", "Orange", "Yellow"];
	
	set(which, colors[rand]);
};

// generate a random integer
var randomnumber = function(min, max)
{
	min = parseInt(min);
	max = parseInt(max);
	var value = Math.round(Math.random() * (max - min) + min);
	
	return value;
};