"use strict";

/**
 * MAIN
 */
Blockly.Blocks["turtle_main"] =
{
	init: function()
	{
		this.deletable = false;
		this.appendDummyInput()
			.appendField(new Blockly.FieldDropdown([
													["Gepárd", "-1"],
													["Nyúl", "0"],
													["Csiga", "20"]
												]), "SEBESSÉG")
			.appendField("teknős");
		this.appendStatementInput("TÖRZS");
		this.setTooltip("Helyezd ebbe a blokkba a kódot!");
		this.setStyle("category_start");
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
													["előre", "1"],
													["hátra", "-1"]
												]), "IRÁNY")
			.appendField(new Blockly.FieldTextInput("0"), "MENNYIT")
			.appendField("képpontot");
		this.setTooltip("Adott irányba, adott pixelnyit megy a teknős.");
		this.setStyle("category_draw");
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
													["balra", "-1"],
													["jobbra", "1"]
												]), "IRÁNY")
			.appendField(new Blockly.FieldTextInput("0"), "MENNYIT")
			.appendField("fokot");
		this.setTooltip("Adott irányba, adott fokot fordul a teknős.");
		this.setStyle("category_draw");
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
		this.setStyle("category_draw");
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
													["fel", "false"],
													["le", "true"]
												]), "IRÁNY");
		this.setTooltip("A teknős felemeli vagy leteszi a tollát.");
		this.setStyle("category_draw");
	}
};

/**
 * FILL COLOR
 */
Blockly.Blocks["turtle_fill_color"] =
{
	init: function()
	{
		var color = new Blockly.FieldColour("White");
		color.setColours(["White", "Silver", "Grey", "Black", "Red", "Maroon", "Yellow", "Olive", "Lime", "Green", "Cyan", "Teal", "Blue", "Navy", "Magenta", "Purple"]).setColumns(4);
		
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendDummyInput()
			.appendField("Kitöltőszín:")
			.appendField(color, "SZÍN");
		this.setTooltip("Megváltoztatja a teknős kitöltő színét.");
		this.setStyle("category_draw");
	}
};

/**
 * LINE COLOR
 */
Blockly.Blocks["turtle_line_color"] =
{
	init: function()
	{
		var color = new Blockly.FieldColour("Black");
		color.setColours(["White", "Silver", "Grey", "Black", "Red", "Maroon", "Yellow", "Olive", "Lime", "Green", "Cyan", "Teal", "Blue", "Navy", "Magenta", "Purple"]).setColumns(4);
		
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendDummyInput()
			.appendField("Vonalszín:")
			.appendField(color, "SZÍN");
		this.setTooltip("Megváltoztatja a teknős vonalszínét.");
		this.setStyle("category_draw");
	}
};

/**
 * PEN WIDTH
 */
Blockly.Blocks["turtle_line_width"] =
{
	init: function()
	{
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendDummyInput()
			.appendField("Vonalvastagság:")
			.appendField(new Blockly.FieldTextInput("3"), "VASTAGSÁG")
			.appendField("képpont");
		this.setTooltip("Megváltoztatja a teknős vonalvastagságát.");
		this.setStyle("category_draw");
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
		this.setStyle("category_draw");
	}
};

/**
 * FOR LOOP
 */
Blockly.Blocks["turtle_for"] =
{
	init: function()
	{
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendDummyInput()
			.appendField("Ismételd")
			.appendField(new Blockly.FieldTextInput("hányszor"), "ISMÉTELD");
		this.appendStatementInput("TÖRZS");
		this.setTooltip("Megismétli a blokk belsejében lévő utasításokat.");
		this.setStyle("category_control");
	}
};

/**
 * WHILE LOOP
 */
Blockly.Blocks["turtle_while"] =
{
	init: function()
	{
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendDummyInput()
			.appendField("Ismételd amíg")
			.appendField(new Blockly.FieldTextInput("feltétel"), "ISMÉTELD");
		this.appendStatementInput("TÖRZS");
		this.setTooltip("Megismétli a blokk belsejében lévő utasításokat.");
		this.setStyle("category_control");
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
			.appendField(new Blockly.FieldTextInput("feltétel"), "FELTÉTEL");
		this.appendStatementInput("HA");
		this.setTooltip("Ha a feltétel igaz, akkor elvégzi a blokk belsejében lévő utasításokat.");
		this.setStyle("category_control");
	}
};

/**
 * IF-ELSE STATEMENT
 */
Blockly.Blocks["turtle_if_else"] =
{
	init: function()
	{
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendDummyInput()
			.appendField("Ha")
			.appendField(new Blockly.FieldTextInput("feltétel"), "FELTÉTEL");
		this.appendStatementInput("HA");
		this.appendDummyInput()
			.appendField("Különben")
		this.appendStatementInput("KÜLÖNBEN");
		this.setTooltip("Ha a feltétel igaz, akkor az első csoportban lévő utasításokat végzi el, ha pedig hamis, akkor a második csoportban lévőket.");
		this.setStyle("category_control");
	}
};

/**
 * VARIABLE DEFINITION
 */
Blockly.Blocks["turtle_variable_define"] =
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
		this.setStyle("category_variable");
	}
};

/**
 * RANDOM NUMBER
 */
Blockly.Blocks["turtle_random_number"] =
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
		this.setStyle("category_variable");
	}
};

/**
 * FUNCTION DEFINITON
 */
Blockly.Blocks["turtle_function_define"] =
{
	init: function()
	{
		this.appendDummyInput()
			.appendField("Megtanul")
			.appendField(new Blockly.FieldTextInput("művelet"), "NÉV")
			.appendField(new Blockly.FieldTextInput("paraméterek"), "PARAMÉTEREK");
		this.appendStatementInput("TÖRZS");
		this.setTooltip("Létrehoz egy függvényt a megadott névvel, bemeneti paraméterekkel és a blokk belsejében lévő műveletekkel.");
		this.setStyle("category_function");
	}
};

/**
 * FUNCTION CALL
 */
Blockly.Blocks["turtle_function_call"] =
{
	init: function()
	{
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendDummyInput()
			.appendField("Végrehajt")
			.appendField(new Blockly.FieldTextInput("művelet"), "NÉV")
			.appendField(new Blockly.FieldTextInput("paraméterek"), "PARAMÉTEREK");
		this.setTooltip("Meghív egy függvényt a megadott névvel és bemeneti paraméterekkel.");
		this.setStyle("category_function");
	}
};

/**
 * RANDOM COLOR
 */
Blockly.Blocks["turtle_random_color"] =
{
	init: function()
	{
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendDummyInput()
			.appendField("Véletlen")
			.appendField(new Blockly.FieldDropdown([
													["színes", "colorful"],
													["szürke", "greyscale"]
												]), "SZÍNEK")
			.appendField(new Blockly.FieldDropdown([
													["vonal", "linecolor"],
													["kitöltő", "fillcolor"]
												]), "MELYIK")
			.appendField("szín");
		this.setTooltip("Véletlenszerű színűre állítja a vonal vagy a kötöltés színét.");
		this.setStyle("category_function");
	}
};