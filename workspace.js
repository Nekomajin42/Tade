/**
 * Set up the workspace
 * - Declare global letiables
 * - Create the toolbox
 * - Configure the workspace
 * - Create the canvas objects
 * - Create the menu
 * - Create the turtle
 */

/**
 * Declare global letiables
 */
let c, canvas; // drawing canvas and context
let t, tanvas; // overlay canvas and context
let toolbox; // Blockly XML toolbox
let workspace; // Blockly SVG layer
let interpreter; // JS interpreter
let delay; // delayed execution
let running; // execution state
let lastBlockToHighlight; // block ID

// stuff to do on page load
window.addEventListener("DOMContentLoaded", function() {
	/**
	 * Initialize the canvases
	 */
	c = document.getElementById("canvas-layer"); // drawing
	canvas = c.getContext("2d");
	c.width = c.clientWidth;
	c.height = c.clientHeight;
	
	t = document.getElementById("turtle-layer"); // overlay
	tanvas = t.getContext("2d");
	t.width = t.clientWidth;
	t.height = t.clientHeight;
	
	/**
	 * Create the turtle at the middle of the screen
	 */
	turtle.origin = {};
	turtle.origin.x = Math.round(document.body.clientWidth/3*2);
	turtle.origin.y = Math.round(document.body.clientHeight/2);
	turtle.birth();
	turtle.drop();
	
	/**
	 * Initialize the workspace
	 * - Set properties
	 * - Insert the START block
	 */
	toolbox = document.querySelector("#toolbox");
	workspace = Blockly.inject("blockly-layer", {
		toolbox: document.querySelector("#toolbox"),
		theme: Blockly.Themes.Turtle,
		media: "blockly/media/",
		renderer: "thrasos",
		comments: false,
		disable: false,
		collapse: false,
		sounds: false,
		trashcan: true,
		scrollbars: false,
		zoom:
		{
			controls: true,
			startScale: 1.0,
			wheel: false
		}
	});
	Blockly.JavaScript.STATEMENT_PREFIX = "highlightBlock(%1);\n";
	Blockly.JavaScript.INFINITE_LOOP_TRAP = 'if(--window.LoopTrap == 0) throw "Infinite loop.";\n';
	Blockly.JavaScript.addReservedWords("code");
	Blockly.JavaScript.addReservedWords("highlightBlock");
	workspace.addChangeListener(Blockly.Events.disableOrphans);
	window.LoopTrap = 1000000;
	
	let xml_text = "<xml><block type='turtle_main' deletable='false' x='250' y='50'></block></xml>";
	let xml = Blockly.Xml.textToDom(xml_text);
	Blockly.Xml.domToWorkspace(xml, workspace);
	
	/**
	 * Start code execution
	 */
	document.querySelector("#toolbox-start").addEventListener("click", function() {
		window.clearInterval(delay);
		draw();
	});
	
	/**
	 * Stop code execution
	 */
	document.querySelector("#toolbox-stop").addEventListener("click", function() {
		turtle.sleep = true;
		window.clearInterval(delay);
	});
	
	/**
	 * Save the workspace as image (.png)
	 */
	document.querySelector("#toolbox-photo").addEventListener("click", function() {
		let composite = document.createElement("canvas");
		let ctx = composite.getContext("2d");
		composite.width = document.body.clientWidth;
		composite.height = document.body.clientHeight;
		ctx.fillStyle = "White";
		ctx.fillRect(0, 0, document.body.clientWidth, document.body.clientHeight);
		
		let img = document.createElement("img");
		img.src = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(document.querySelector("#blockly-layer svg").outerHTML)));
		img.onload = function() {
			ctx.drawImage(img, 0, 0);
			ctx.drawImage(c, 0, 0);
			ctx.drawImage(t, 0, 0);
			
			composite.toBlob(function(blob)
			{
				saveAs(blob, "rajz.png");
			});
		}
	});
	
	/**
	 * Save the workspace as XML (.turtle)
	 */
	document.querySelector("#toolbox-save").addEventListener("click", function() {
		let xml = Blockly.Xml.workspaceToDom(workspace);
		let xml_text = Blockly.Xml.domToPrettyText(xml);
		let file = new File([xml_text], "kód.turtle", {type: "text/xml;charset=utf-8"});
		saveAs(file);
	});
	
	/**
	 * Open the workspace from XML (.turtle)
	 */
	document.querySelector("#toolbox-open").addEventListener("click", function() {
		if (window.confirm("Ha új fájlt nyitsz meg, a jelenlegi kód törlődni fog.\nSzeretnéd törölni a jelenlegi kódot?") === true) {
			Blockly.mainWorkspace.clear();
			canvas.clearRect(0, 0, document.body.clientWidth, document.body.clientHeight);
			let input = document.createElement("input");
			input.type = "file";
			input.accept = ".turtle";
			input.multiple = false;
			input.click();
			input.addEventListener("change", function(e) {
				for (let i=0; i<input.files.length; i++) {
					let reader = new FileReader();
					reader.onload = function(e) {
						let xml_text = e.target.result; // load new code
						let xml = Blockly.Xml.textToDom(xml_text);
						Blockly.Xml.domToWorkspace(xml, workspace);
					}
					reader.readAsText(input.files[i], "utf-8");
				}
			});
		}
	});
	
	/**
	 * Drop the turtle anywhere on the workspace with double click
	 */
	document.querySelector("#blockly-layer").addEventListener("dblclick", function(e) {
		if (turtle.sleep) {
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
 * Redraw turtle on window resize
 */
window.addEventListener("resize", function() {
	
});

/**
 * Get the generated code from the parser
 * Draw the stuff
 */
function draw() {
	canvas.clearRect(0, 0, document.body.clientWidth, document.body.clientHeight); // clear the canvas
	turtle.birth(); // recreate the turtle
	turtle.drop(); // drop it to the playground
	
	// generate code
	turtle.sleep = false;
	let code = Blockly.JavaScript.workspaceToCode(workspace);
	console.log(code);
	interpreter = new Interpreter(code, initApi);
	try {
		if (turtle.wait == -1) {
			interpreter.run();
			workspace.highlightBlock(null);
			turtle.sleep = true;
		}
		else {
			delay = window.setInterval(next, turtle.wait);
		}
	}
	catch (e) {
		if (e instanceof RangeError) {
			alert("HIBA: Ilyen sok műveletet nem tudok végrehajtani!");
		}
	}
}

/**
 * Execute the code step by step
 */
function next() {
	if (!interpreter.step()) {
		workspace.highlightBlock(null);
		turtle.sleep = true;
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
function initApi(interpreter, scope) {
	let wrapper;
	
	// highlight
	wrapper = function(id) {
		id = id ? id.toString() : '';
		return interpreter.createPrimitive(workspace.highlightBlock(id));
	};
	interpreter.setProperty(scope, 'highlightBlock', interpreter.createNativeFunction(wrapper));
	
	// go
	wrapper = function(dir, dist) {
		dir = dir ? dir.toString() : "";
		dist = dist ? dist.toString() : "";
		return interpreter.createPrimitive(go(dir, dist));
	};
	interpreter.setProperty(scope, "go", interpreter.createNativeFunction(wrapper));
	
	// turn
	wrapper = function(dir, angle) {
		dir = dir ? dir.toString() : "";
		angle = angle ? angle.toString() : "";
		return interpreter.createPrimitive(turn(dir, angle));
	};
	interpreter.setProperty(scope, "turn", interpreter.createNativeFunction(wrapper));
	
	// set
	wrapper = function(name, value) {
		name = name ? name.toString() : "";
		value = value ? value.toString() : "";
		return interpreter.createPrimitive(set(name, value));
	};
	interpreter.setProperty(scope, "set", interpreter.createNativeFunction(wrapper));
	
	// fill
	wrapper = function() 	{
		return interpreter.createPrimitive(fill());
	};
	interpreter.setProperty(scope, "fill", interpreter.createNativeFunction(wrapper));
	
	// home
	wrapper = function() {
		return interpreter.createPrimitive(home());
	};
	interpreter.setProperty(scope, "home", interpreter.createNativeFunction(wrapper));
	
	// random color
	wrapper = function(which, color) {
		which = which ? which.toString() : "";
		color = color ? color.toString() : "";
		return interpreter.createPrimitive(randomcolor(which, color));
	};
	interpreter.setProperty(scope, "randomcolor", interpreter.createNativeFunction(wrapper));
	
	// random number
	wrapper = function(min, max) {
		min = min ? min.toString() : "1";
		max = max ? max.toString() : "10";
		return interpreter.createPrimitive(randomnumber(min, max));
	};
	interpreter.setProperty(scope, "randomnumber", interpreter.createNativeFunction(wrapper));
}