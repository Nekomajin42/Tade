"use strict";

goog.provide("Blockly.Blocks.turtle");

goog.require("Blockly.Blocks");

/**
 * MAIN
 */
Blockly.Blocks["turtle_main"] =
{
	init: function()
	{
		this.deletable = false;
		this.appendStatementInput("TÖRZS")
			.appendField("🐢");
		this.setTooltip("Innen indul a teknős.");
		this.setColour(120);
	}
};

/**
 * DRAW/GO
 */
Blockly.Blocks["turtle_go"] =
{
	init: function()
	{
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendDummyInput()
			.appendField("Menj")
			.appendField(new Blockly.FieldDropdown([
													["előre", "előre"],
													["hátra", "hátra"]
												]), "IRÁNY")
			.appendField("ennyit:")
			.appendField(new Blockly.FieldTextInput("0"), "MENNYIT");
		this.setTooltip("Adott irányba, adott pixelnyit megy a teknős.");
		this.setColour(240);
	}
};

/**
 * TURN
 */
Blockly.Blocks["turtle_turn"] =
{
	init: function()
	{
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendDummyInput()
			.appendField("Fordulj")
			.appendField(new Blockly.FieldDropdown([
													["balra", "balra"],
													["jobbra", "jobbra"]
												]), "IRÁNY")
			.appendField("ennyit:")
			.appendField(new Blockly.FieldTextInput("0"), "MENNYIT");
		this.setTooltip("Adott irányba, adott fokot fordul a teknős.");
		this.setColour(240);
	}
};

/**
 * FILL
 */
Blockly.Blocks["turtle_fill"] =
{
	init: function()
	{
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendDummyInput()
			.appendField("Kitölt");
		this.setTooltip("Kifesti a legutoljára rajzolt alakzatot.");
		this.setColour(240);
	}
};

/**
 * PEN UP/DOWN
 */
Blockly.Blocks["turtle_pen"] =
{
	init: function()
	{
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendDummyInput()
			.appendField("Tollat")
			.appendField(new Blockly.FieldDropdown([
													["fel", "fel"],
													["le", "le"]
												]), "IRÁNY");
		this.setTooltip("A teknős felemeli vagy leteszi a tollát.");
		this.setColour(240);
	}
};

/**
 * FILL COLOR
 */
Blockly.Blocks["turtle_fillcolor"] =
{
	init: function()
	{
		var color = new Blockly.FieldColour("White");
		color.setColours(["Black", "Grey", "LightGrey", "White", "Blue", "LightBlue", "Green", "LightGreen", "Red", "Pink", "Orange", "Yellow"]).setColumns(4);
		
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendDummyInput()
			.appendField("Kitöltő szín:")
			.appendField(color, "SZÍN");
		this.setTooltip("Megváltoztatja a teknős kitöltő színét.");
		this.setColour(240);
	}
};

/**
 * LINE COLOR
 */
Blockly.Blocks["turtle_linecolor"] =
{
	init: function()
	{
		var color = new Blockly.FieldColour("Black");
		color.setColours(["Black", "Grey", "LightGrey", "White", "Blue", "LightBlue", "Green", "LightGreen", "Red", "Pink", "Orange", "Yellow"]).setColumns(4);
		
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendDummyInput()
			.appendField("Vonalszín:")
			.appendField(color, "SZÍN");
		this.setTooltip("Megváltoztatja a teknős vonalszínét.");
		this.setColour(240);
	}
};

/**
 * PEN WIDTH
 */
Blockly.Blocks["turtle_linewidth"] =
{
	init: function()
	{
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendDummyInput()
			.appendField("Vonalvastagság:")
			.appendField(new Blockly.FieldTextInput("1"), "VASTAGSÁG");
		this.setTooltip("Megváltoztatja a teknős vonalvastagságát.");
		this.setColour(240);
	}
};

/**
 * HOME
 */
Blockly.Blocks["turtle_home"] =
{
	init: function()
	{
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendDummyInput()
			.appendField("Haza");
		this.setTooltip("A teknős visszaugrik a kezdőpontba.");
		this.setColour(240);
	}
};

/**
 * FOR LOOP
 */
Blockly.Blocks["turtle_loopfor"] =
{
	init: function()
	{
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendDummyInput()
			.appendField("Ismételd ennyiszer:")
			.appendField(new Blockly.FieldTextInput("1"), "ISMÉTELD");
		this.appendStatementInput("TÖRZS");
		this.setTooltip("Megismétli a blokk belsejében lévő utasításokat.");
		this.setColour(0);
	}
};

/**
 * WHILE LOOP
 */
Blockly.Blocks["turtle_loopwhile"] =
{
	init: function()
	{
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendDummyInput()
			.appendField("Ismételd amíg")
			.appendField(new Blockly.FieldTextInput("1"), "ISMÉTELD");
		this.appendStatementInput("TÖRZS");
		this.setTooltip("Megismétli a blokk belsejében lévő utasításokat.");
		this.setColour(0);
	}
};

/**
 * IF STATEMENT
 */
Blockly.Blocks["turtle_if"] =
{
	init: function()
	{
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendDummyInput()
			.appendField("Ha")
			.appendField(new Blockly.FieldTextInput("1"), "FELTÉTEL");
		this.appendStatementInput("HA");
		this.setTooltip("Ha a feltétel igaz, akkor elvégzi a blokk belsejében lévő utasításokat.");
		this.setColour(0);
	}
};

/**
 * IF-ELSE STATEMENT
 */
Blockly.Blocks["turtle_ifelse"] =
{
	init: function()
	{
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendDummyInput()
			.appendField("Ha")
			.appendField(new Blockly.FieldTextInput("1"), "FELTÉTEL");
		this.appendStatementInput("HA");
		this.appendDummyInput()
			.appendField("különben")
		this.appendStatementInput("KĂśLĂ–NBEN");
		this.setTooltip("Ha a feltétel igaz, akkor az első csoportban lévő utasításokat végzi el, ha pedig hamis, akkor a második csoportban lévőket.");
		this.setColour(0);
	}
};

/**
 * VARIABLE DEFINITION
 */
Blockly.Blocks["turtle_vardef"] =
{
	init: function()
	{
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendDummyInput()
			.appendField("Változó")
			.appendField(new Blockly.FieldTextInput("x"), "NÉV")
			.appendField("=")
			.appendField(new Blockly.FieldTextInput("1"), "ÉRTÉK");
		this.setTooltip("Létrehoz vagy megváltoztat egy változót a megadott névvel és értékkel.");
		this.setColour(180);
	}
};

/**
 * RANDOM NUMBER
 */
Blockly.Blocks["turtle_randomnumber"] =
{
	init: function()
	{
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendDummyInput()
			.appendField("Véletlen")
			.appendField(new Blockly.FieldTextInput("x"), "NÉV")
			.appendField("=")
			.appendField(new Blockly.FieldTextInput("1"), "TÓL")
			.appendField(":")
			.appendField(new Blockly.FieldTextInput("10"), "IG");
		this.setTooltip("Véletlenszerűen generál egy egész számot a megadott értékek között.");
		this.setColour(180);
	}
};

/**
 * FUNCTION DEFINITON
 */
Blockly.Blocks["turtle_functiondef"] =
{
	init: function()
	{
		this.appendDummyInput()
			.appendField("Megtanul")
			.appendField(new Blockly.FieldTextInput("művelet"), "NÉV")
			.appendField("paraméterek:")
			.appendField(new Blockly.FieldTextInput(""), "PARAMÉTEREK");
		this.appendStatementInput("TÖRZS");
		this.setTooltip("Létrehoz egy függvényt a megadott névvel, bemeneti paraméterekkel és a blokk belsejében lévő műveletekkel.");
		this.setColour(120);
	}
};

/**
 * FUNCTION CALL
 */
Blockly.Blocks["turtle_functioncall"] =
{
	init: function()
	{
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendDummyInput()
			.appendField("Végrehajt")
			.appendField(new Blockly.FieldTextInput("művelet"), "NÉV")
			.appendField("paraméterek:")
			.appendField(new Blockly.FieldTextInput(""), "PARAMÉTEREK");
		this.setTooltip("Meghív egy függvényt a megadott névvel és bemeneti paraméterekkel.");
		this.setColour(120);
	}
};

/**
 * RANDOM COLOR
 */
Blockly.Blocks["turtle_randomcolor"] =
{
	init: function()
	{
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendDummyInput()
			.appendField("Véletlen")
			.appendField(new Blockly.FieldDropdown([
													["vonal", "vonal"],
													["kitöltő", "kitöltő"]
												]), "MELYIK")
			.appendField("szín");
		this.setTooltip("Véletlenszerű színűre állítja a vonal vagy a kötöltés színét.");
		this.setColour(120);
	}
};