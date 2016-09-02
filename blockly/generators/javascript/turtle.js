"use strict";

goog.provide('Blockly.JavaScript.turtle');

goog.require('Blockly.JavaScript');

Blockly.JavaScript["turtle_main"] = function(block)
{
	// get parameters
	var body = Blockly.JavaScript.statementToCode(block, "TÖRZS");
	
	//return "function main() {\n" + body + "}\n";
	return body;
};

Blockly.JavaScript["turtle_go"] = function(block)
{
	// get values
	var dir = (block.getFieldValue("IRÁNY") === "előre") ? 1 : -1;
	var dist = block.getFieldValue("MENNYIT");
	
	return "go(" + dir + ", " + dist + ");\n";
};

Blockly.JavaScript["turtle_turn"] = function(block)
{
	// get values
	var dir = (block.getFieldValue("IRÁNY") === "jobbra") ? 1 : -1;
	var deg = block.getFieldValue("MENNYIT");
	
	return "turn(" + dir + ", " + deg + ");\n";
};

Blockly.JavaScript["turtle_fill"] = function(block)
{
	return "fill();\n";
};

Blockly.JavaScript["turtle_pen"] = function(block)
{
	var dir = (block.getFieldValue("IRÁNY") === "fel") ? false : true;
	return "set('down', " + dir + ");\n";
};

Blockly.JavaScript["turtle_fillcolor"] = function(block)
{
	return "set('fillcolor', '" + block.getFieldValue("SZÍN") + "');\n";
};

Blockly.JavaScript["turtle_linecolor"] = function(block)
{
	return "set('linecolor', '" + block.getFieldValue("SZÍN") + "');\n";
};

Blockly.JavaScript["turtle_linewidth"] = function(block)
{
	return "set('linewidth', " + block.getFieldValue("VASTAGSÁG") + ");\n";
};

Blockly.JavaScript["turtle_home"] = function(block)
{
	return "home();\n";
};

Blockly.JavaScript["turtle_loopfor"] = function(block)
{
	// get loop body
	var stop = block.getFieldValue("ISMÉTELD");
	var body = Blockly.JavaScript.statementToCode(block, "TÖRZS");
	var i = "i" + block.id.replace(/\W/g, "").substring(0, 2);
	
	return "for (var " + i + "=0; " + i + "<" + stop + "; " + i + "++) {\n" + body + "}\n";
};

Blockly.JavaScript["turtle_loopwhile"] = function(block)
{
	// get loop body
	var stop = block.getFieldValue("ISMÉTELD");
	var body = Blockly.JavaScript.statementToCode(block, "TÖRZS");
	var i = "i" + block.id.replace(/\W/g, "").substring(0, 2);
	
	return "while (" + stop + ") {\n" + body + "}\n";
};

Blockly.JavaScript["turtle_if"] = function(block)
{
	// get loop body
	var expr = block.getFieldValue("FELTÉTEL");
	var body_if = Blockly.JavaScript.statementToCode(block, "HA");
	
	return "if (" + expr + ") {\n" + body_if + "}\n";
};

Blockly.JavaScript["turtle_ifelse"] = function(block)
{
	// get loop body
	var expr = block.getFieldValue("FELTÉTEL");
	var body_if = Blockly.JavaScript.statementToCode(block, "HA");
	var body_else = Blockly.JavaScript.statementToCode(block, "KÜLÖNBEN");
	
	return "if (" + expr + ") {\n" + body_if + "}\nelse {\n" + body_else + "}\n";
};

Blockly.JavaScript["turtle_vardef"] = function(block)
{
	// get parameters
	var name = block.getFieldValue("NÉV");
	var value = block.getFieldValue("ÉRTÉK");
	
	return "var " + name + "=" + value + ";\n";
};

Blockly.JavaScript["turtle_randomnumber"] = function(block)
{
	// get parameters
	var name = block.getFieldValue("NÉV");
	var min = block.getFieldValue("TÓL");
	var max = block.getFieldValue("IG");
	
	return "var " + name + " = randomnumber(" + min + ", " + max + ");\n";
};

Blockly.JavaScript["turtle_functiondef"] = function(block)
{
	// get parameters
	var name = block.getFieldValue("NÉV");
	var args = block.getFieldValue("PARAMÉTEREK");
	var body = Blockly.JavaScript.statementToCode(block, "TÖRZS");
	
	return "function " + name + "(" + args + ") {\n" + body + "}\n";
};

Blockly.JavaScript["turtle_functioncall"] = function(block)
{
	// get parameters
	var name = block.getFieldValue("NÉV");
	var args = block.getFieldValue("PARAMÉTEREK");
	
	return name + "(" + args + ");\n";
};

Blockly.JavaScript["turtle_randomcolor"] = function(block)
{
	// get parameters
	var which = (block.getFieldValue("MELYIK") === "vonal") ? "linecolor" : "fillcolor";
	
	return "randomcolor('" + which + "');\n";
};