"use strict";

Blockly.Themes.Turtle = {};

Blockly.Themes.Turtle.blockStyles = {
	category_start: {
		colourPrimary: "#008080",
		colourSecondary: "#00a0a0",
		colourTertiary: "#006060",
		hat: "cap"
	},
	category_draw: {
		colourPrimary: "#3F3FBF",
		colourSecondary: "#6565CC",
		colourTertiary: "#323298"
	},
	category_control: {
		colourPrimary: "#BF3F3F",
		colourSecondary: "#CB6565",
		colourTertiary: "#983333"
	},
	category_function: {
		colourPrimary: "#3FBF3F",
		colourSecondary: "#65CC66",
		colourTertiary: "#329933"
	},
	category_variable: {
		colourPrimary: "#40BEBF",
		colourSecondary: "#66CACB",
		colourTertiary: "#339798"
	}
};

Blockly.Themes.Turtle.categoryStyles = {
	category_draw: {
		colour: "#3F3FBF"
	},
	category_control: {
		colour: "#BF3F3F"
	},
	category_function: {
		colour: "#3FBF3F"
	},
	category_variable: {
		colour: "#40BEBF"
	}
};

Blockly.Themes.Turtle.componentStyles = {
	workspaceBackgroundColour: "#ffffff",
	toolboxBackgroundColour: "#008080",
	flyoutBackgroundColour: "#008080",
	flyoutOpacity: "1",
	scrollbarColour: "#40e0d0",
	scrollbarOpacity: "1"
};

Blockly.Themes.Turtle = new Blockly.Theme("turtle", Blockly.Themes.Turtle.blockStyles, 
													Blockly.Themes.Turtle.categoryStyles, 
													Blockly.Themes.Turtle.componentStyles);