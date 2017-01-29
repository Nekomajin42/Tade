/**
 * Set up the workspace
 * - Declare global variables
 * - Create the toolbox
 * - Configure the workspace
 * - Create the canvas objects
 * - Create the menu
 * - Create the turtle
 */

/**
 * Declare global variables
 */
var c, canvas; // drawing canvas and context
var t, tanvas; // overlay canvas and context
var workspace; // Blockly SVG
var interpreter; // JS interpreter
var interval, running; // delayed execution
var paused, stopped; // execution state
var lastBlockToHighlight; // block ID
var scrollx, scrolly; // scrollbar div-s
var mx, my; // screen coordiantes of the mouse
var m; // mouse left button flag

// stuff to do on page load
window.addEventListener("DOMContentLoaded", function()
{
	/**
	 * - Build the toolboxes
	 * - Make the toolbox toolbar work
	 */
	var toolboxes = {};
	
	toolboxes.drawtools = document.createElement("xml");
	toolboxes.drawtools.innerHTML += "<block type='turtle_go'></block>";
	toolboxes.drawtools.innerHTML += "<block type='turtle_turn'></block>";
	toolboxes.drawtools.innerHTML += "<block type='turtle_pen'></block>";
	toolboxes.drawtools.innerHTML += "<block type='turtle_linewidth'></block>";
	toolboxes.drawtools.innerHTML += "<block type='turtle_linecolor'></block>";
	toolboxes.drawtools.innerHTML += "<block type='turtle_fillcolor'></block>";
	toolboxes.drawtools.innerHTML += "<block type='turtle_fill'></block>";
	toolboxes.drawtools.innerHTML += "<block type='turtle_home'></block>";
	
	toolboxes.controltools = document.createElement("xml");
	toolboxes.controltools.innerHTML += "<block type='turtle_loopfor'></block>";
	toolboxes.controltools.innerHTML += "<block type='turtle_loopwhile'></block>";
	toolboxes.controltools.innerHTML += "<block type='turtle_if'></block>";
	toolboxes.controltools.innerHTML += "<block type='turtle_ifelse'></block>";
	
	toolboxes.functiontools = document.createElement("xml");
	toolboxes.functiontools.innerHTML += "<block type='turtle_functiondef'></block>";
	toolboxes.functiontools.innerHTML += "<block type='turtle_functioncall'></block>";
	toolboxes.functiontools.innerHTML += "<block type='turtle_randomcolor'></block>";
	
	toolboxes.variabletools = document.createElement("xml");
	toolboxes.variabletools.innerHTML += "<block type='turtle_vardef'></block>";
	toolboxes.variabletools.innerHTML += "<block type='turtle_randomnumber'></block>";
	
	var toolboxcontrols = document.querySelectorAll("#toolboxes input");
	for (var i=0; i<toolboxcontrols.length; i++)
	{
		toolboxcontrols[i].addEventListener("click", function(e)
		{
			workspace.updateToolbox(toolboxes[e.target.id]);
			for (var i=0; i<toolboxcontrols.length; i++)
			{
				toolboxcontrols[i].classList.remove("open");
			}
			e.target.classList.add("open");
		});
	}
	
	/**
	 * Initialize the workspace
	 * - Set properties
	 * - Insert the START block
	 */
	workspace = Blockly.inject("blockly",
	{
		toolbox: toolboxes.drawtools,
		comments: false,
		sounds: false,
		trashcan: false,
		scrollbars: false,
		collapse: true
	});
	Blockly.JavaScript.STATEMENT_PREFIX = "highlightBlock(%1);\n";
	Blockly.JavaScript.addReservedWords("highlightBlock");
	workspace.addChangeListener(Blockly.Events.disableOrphans);
	
	var xml_text = "<xml><block type='turtle_main' deletable='false' x='100' y='20'></block></xml>";
	var xml = Blockly.Xml.textToDom(xml_text);
	Blockly.Xml.domToWorkspace(xml, workspace);
	
	/**
	 * Initialize the canvases
	 */
	c = document.getElementById("canvas"); // drawing
	canvas = c.getContext("2d");
	c.width = c.clientWidth;
	c.height = c.clientHeight;
	
	t = document.getElementById("turtle"); // overlay
	tanvas = t.getContext("2d");
	t.width = t.clientWidth;
	t.height = t.clientHeight;
	
	/**
	 * Build the scroll markers
	 */
	scrollx = document.getElementById("scroll-x"); // get scrollbars
	scrolly = document.getElementById("scroll-y");
	scrollx.style.width = (1920 - ((1920 - window.innerWidth) * 2)) - 10 + "px"; // set scrollbar dimensions
	scrolly.style.height = (1080 - ((1080 - window.innerHeight) * 2)) - 10 + "px";
	ox = (1920 - window.innerWidth) /2; // set initial scroll offset
	oy = (1080 - window.innerHeight) /2;
	//window.scrollTo((1920 - window.innerWidth) / 2, (1080 - window.innerHeight) / 2); // scroll to the middle of the screen
	window.scrollTo(0, 0);
	
	/**
	 * Create the turtle at the middle of the screen
	 */
	turtle.origin = {};
	turtle.origin.x = Math.round(1920/2);
	turtle.origin.y = Math.round(1080/2);
	turtle.birth();
	turtle.drop();
	
	/**
	 * Start / continue code execution
	 */
	stopped = true;
	document.getElementById("play").addEventListener("click", function()
	{
		paused = false;
		document.getElementById("pause").disabled = false;
		if (stopped)
		{
			draw();
		}
		else
		{
			step();
		}
	});
	
	/**
	 * Pause / step code execution
	 */
	document.getElementById("pause").addEventListener("click", function()
	{
		paused = false;
		step();
		paused = true;
	});
	
	/**
	 * Set the speed/delay of the code execution
	 */
	document.getElementById("delay").addEventListener("change", function(e)
	{
		turtle.wait = e.target.value;
	});
	
	/**
	 * Save the workspace as image (.png)
	 */
	document.getElementById("img").addEventListener("click", function()
	{
		var composite = document.createElement("canvas"); // create a new canvas
		var ctx = composite.getContext("2d");
		composite.width = 1920;
		composite.height = 1080;
		ctx.fillStyle = "White";
		ctx.fillRect(0, 0, 1920, 1080);
		
		var img = document.createElement("img"); // create a new image
		svgAsDataUri(document.querySelector("svg"), {}, function(uri) // load SVG to data URI
		{
			img.src = uri;
		});
		
		ctx.drawImage(c, 0, 0); // draw them to the canvas
		ctx.drawImage(t, 0, 0);
		ctx.drawImage(img, 0, 0);
		
		composite.toBlob(function(blob) // save the whole stuff
		{
			saveAs(blob, "rajz.png");
		});
	});
	
	/**
	 * Save the workspace as XML (.turtle)
	 */
	document.getElementById("save").addEventListener("click", function()
	{
		var xml = Blockly.Xml.workspaceToDom(workspace);
		var xml_text = Blockly.Xml.domToPrettyText(xml);
		var file = new File([xml_text], "kód.turtle", {type: "text/xml;charset=utf-8"});
		saveAs(file);
	});
	
	/**
	 * Open the workspace from XML (.turtle)
	 */
	document.getElementById("open").addEventListener("click", function()
	{
		// confirm remove
		if (window.confirm("Szeretnéd törölni a jelenlegi kódot?") === true)
		{
			Blockly.mainWorkspace.clear();
			canvas.clearRect(0, 0, 1920, 1080);
		}
		
		// create input and load file(s)
		var input = document.createElement("input");
		input.type = "file";
		input.accept = ".turtle";
		input.multiple = true;
		input.click();
		input.addEventListener("change", function(e)
		{
			for (var i=0; i<input.files.length; i++)
			{
				var reader = new FileReader();
				reader.onload = function(e)
				{
					var xml_text = e.target.result; // load new code
					var xml = Blockly.Xml.textToDom(xml_text);
					Blockly.Xml.domToWorkspace(xml, workspace);
				}
				reader.readAsText(input.files[i], "utf-8");
			}
		});
	});
	
	/**
	 * Confirm tab close
	 * TODO: Find a way to show custom message
	 */
	/*window.addEventListener("beforeunload", function(e)
	{
		e.returnValue = "Bye-bye!";
		return "Bye-bye!";
	});*/
	
	/**
	 * Make the workspace draggable by mouse
	 */
	document.querySelector(".blocklyMainBackground").addEventListener("mousedown", function(e)
	{
		m = true;
		mx = e.clientX;
		my = e.clientY;
	});
	document.querySelector(".blocklyMainBackground").addEventListener("mousemove", function(e)
	{
		if (m === true)
		{
			window.scrollBy(-(e.clientX - mx), -(e.clientY - my));
			mx = e.clientX;
			my = e.clientY;
		}
	});
	window.addEventListener("mouseup", function()
	{
		m = false;
	});
	window.addEventListener("scroll", function()
	{
		scrollx.style.left = (window.pageXOffset) + "px";
		scrolly.style.top = (window.pageYOffset) + "px";
	});
	
	/**
	 * Drop the turtle anywhere on the workspace with double click
	 */
	document.querySelector(".blocklyMainBackground").addEventListener("dblclick", function(e)
	{
		if (stopped)
		{
			turtle.origin = {};
			turtle.origin.x = Math.round(e.layerX);
			turtle.origin.y = Math.round(e.layerY);
			turtle.x = turtle.origin.x;
			turtle.y = turtle.origin.y;
			turtle.drop();
		}
	});
});

/**
 * Execute the code step by step
 */
function step()
{
	if (!paused)
	{
		running = true;
		while (running)
		{
			workspace.highlightBlock(lastBlockToHighlight);
			if (!interpreter.step())
			{
				clearInterval(interval);
				stopped = true;
				document.getElementById("pause").disabled = true;
				return;
			}
		}
	}
}

/**
 * Get the generated code from the parser
 * Draw the stuff
 */
function draw()
{
	canvas.clearRect(0, 0, 1920, 1080); // clear the canvas
	turtle.birth(); // recreate turtle
	turtle.drop(); // drop it to the playground
	
	// generate code
	window.LoopTrap = 1000;
	Blockly.JavaScript.INFINITE_LOOP_TRAP = 'if(--window.LoopTrap == 0) throw "Infinite loop.";\n';
	var code = Blockly.JavaScript.workspaceToCode(workspace);
	console.log(code);
	interpreter = new Interpreter(code, initApi);
	lastBlockToHighlight = null;
	
	// execute it
	running = false;
	paused = false;
	stopped = false;
	document.getElementById("pause").disabled = false;
	workspace.traceOn(true);
	workspace.highlightBlock(null);
	interval = setInterval(step, turtle.wait);
}

/**
 * Catch endless loops and terminate them
 * TODO: make this work
 */
function terminate() // terminate infinite(ish) loops
{
	console.log(turtle.looptrap);
	if (turtle.looptrap === 0)
	{
		throw "Infinite loop!";
		alert("Végtelen ciklus!");
	}
	else
	{
		turtle.looptrap--;
	}
}

/**
 * Push custom functions to the interpreter:
 * - highlight
 * - go
 * - turn
 * - set
 * - fill
 * - home
 * - random color
 * - random number
 */
function initApi(interpreter, scope)
{
	// highlight
	var wrapper = function(id)
	{
		id = id ? id.toString() : '';
		running = false;
        workspace.highlightBlock(lastBlockToHighlight);
        lastBlockToHighlight = id;
		return interpreter.createPrimitive(workspace.highlightBlock(id));
	};
	interpreter.setProperty(scope, 'highlightBlock', interpreter.createNativeFunction(wrapper));
	
	// go
	var wrapper = function(dir, dist)
	{
		dir = dir ? dir.toString() : "";
		dist = dist ? dist.toString() : "";
		return interpreter.createPrimitive(go(dir, dist));
	};
	interpreter.setProperty(scope, "go", interpreter.createNativeFunction(wrapper));
	
	// turn
	var wrapper = function(dir, angle)
	{
		dir = dir ? dir.toString() : "";
		angle = angle ? angle.toString() : "";
		return interpreter.createPrimitive(turn(dir, angle));
	};
	interpreter.setProperty(scope, "turn", interpreter.createNativeFunction(wrapper));
	
	// set
	var wrapper = function(name, value)
	{
		name = name ? name.toString() : "";
		value = value ? value.toString() : "";
		return interpreter.createPrimitive(set(name, value));
	};
	interpreter.setProperty(scope, "set", interpreter.createNativeFunction(wrapper));
	
	// fill
	var wrapper = function()
	{
		return interpreter.createPrimitive(fill());
	};
	interpreter.setProperty(scope, "fill", interpreter.createNativeFunction(wrapper));
	
	// home
	var wrapper = function()
	{
		return interpreter.createPrimitive(home());
	};
	interpreter.setProperty(scope, "home", interpreter.createNativeFunction(wrapper));
	
	// random color
	var wrapper = function(which)
	{
		which = which ? which.toString() : "";
		return interpreter.createPrimitive(randomcolor(which));
	};
	interpreter.setProperty(scope, "randomcolor", interpreter.createNativeFunction(wrapper));
	
	// random number
	var wrapper = function(min, max)
	{
		min = min ? min.toString() : "1";
		max = max ? max.toString() : "10";
		return interpreter.createPrimitive(randomnumber(min, max));
	};
	interpreter.setProperty(scope, "randomnumber", interpreter.createNativeFunction(wrapper));
}