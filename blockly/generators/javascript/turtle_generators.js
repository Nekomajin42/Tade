"use strict";

Blockly.JavaScript["turtle_main"] = function(block)
{
	var body = Blockly.JavaScript.statementToCode(block, "TÖRZS");
	var delay = block.getFieldValue("SEBESSÉG");
	
	turtle.wait = delay;
	return body;
};

Blockly.JavaScript["turtle_go"] = function(block)
{
	var dir = block.getFieldValue("IRÁNY");
	var dist = block.getFieldValue("MENNYIT");
	
	return "go(" + dir + ", " + dist + ");\n";
};

Blockly.JavaScript["turtle_turn"] = function(block)
{
	var dir = block.getFieldValue("IRÁNY");
	var deg = block.getFieldValue("MENNYIT");
	
	return "turn(" + dir + ", " + deg + ");\n";
};

Blockly.JavaScript["turtle_fill"] = function(block)
{
	return "fill();\n";
};

Blockly.JavaScript["turtle_pen"] = function(block)
{
	return "set('down', " + (block.getFieldValue("IRÁNY") === "true") + ");\n";
};

Blockly.JavaScript["turtle_fill_color"] = function(block)
{
	return "set('fillcolor', '" + block.getFieldValue("SZÍN") + "');\n";
};

Blockly.JavaScript["turtle_line_color"] = function(block)
{
	return "set('linecolor', '" + block.getFieldValue("SZÍN") + "');\n";
};

Blockly.JavaScript["turtle_line_width"] = function(block)
{
	return "set('linewidth', " + block.getFieldValue("VASTAGSÁG") + ");\n";
};

Blockly.JavaScript["turtle_home"] = function(block)
{
	return "home();\n";
};

Blockly.JavaScript["turtle_for"] = function(block)
{
	var stop = block.getFieldValue("ISMÉTELD");
	var body = Blockly.JavaScript.statementToCode(block, "TÖRZS");
	var i = "i" + block.id.replace(/\W/g, "").substring(0, 2);
	
	return "for (var " + i + "=0; " + i + "<" + stop + "; " + i + "++) {\n" + body + "}\n";
};

Blockly.JavaScript["turtle_while"] = function(block)
{
	var stop = block.getFieldValue("ISMÉTELD");
	var body = Blockly.JavaScript.statementToCode(block, "TÖRZS");
	var i = "i" + block.id.replace(/\W/g, "").substring(0, 2);
	
	return "while (" + stop + ") {\n" + body + "}\n";
};

Blockly.JavaScript["turtle_if"] = function(block)
{
	var expr = block.getFieldValue("FELTÉTEL");
	var body_if = Blockly.JavaScript.statementToCode(block, "HA");
	
	return "if (" + expr + ") {\n" + body_if + "}\n";
};

Blockly.JavaScript["turtle_if_else"] = function(block)
{
	var expr = block.getFieldValue("FELTÉTEL");
	var body_if = Blockly.JavaScript.statementToCode(block, "HA");
	var body_else = Blockly.JavaScript.statementToCode(block, "KÜLÖNBEN");
	
	return "if (" + expr + ") {\n" + body_if + "}\nelse {\n" + body_else + "}\n";
};

Blockly.JavaScript["turtle_variable_define"] = function(block)
{
	var name = block.getFieldValue("NÉV");
	var value = block.getFieldValue("ÉRTÉK");
	
	return "var " + name + "=" + value + ";\n";
};

Blockly.JavaScript["turtle_random_number"] = function(block)
{
	var name = block.getFieldValue("NÉV");
	var min = block.getFieldValue("TÓL");
	var max = block.getFieldValue("IG");
	
	return "var " + name + " = randomnumber(" + min + ", " + max + ");\n";
};

Blockly.JavaScript["turtle_function_define"] = function(block)
{
	var name = block.getFieldValue("NÉV");
	var args = block.getFieldValue("PARAMÉTEREK");
	args = (args === "paraméterek") ? "" : args;
	var body = Blockly.JavaScript.statementToCode(block, "TÖRZS");
	
	return "function " + name + "(" + args + ") {\n" + body + "}\n";
};

Blockly.JavaScript["turtle_function_call"] = function(block)
{
	var name = block.getFieldValue("NÉV");
	var args = block.getFieldValue("PARAMÉTEREK");
	args = (args === "paraméterek") ? "" : args;
	
	return name + "(" + args + ");\n";
};

Blockly.JavaScript["turtle_random_color"] = function(block)
{
	var which = block.getFieldValue("MELYIK");
	var color = block.getFieldValue("SZÍNEK");
	console.log(typeof color);
	
	return "randomcolor('" + which + "', '" + color + "');\n";
};