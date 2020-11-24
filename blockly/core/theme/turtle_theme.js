"use strict";

Blockly.Themes.Turtle = {};

Blockly.Themes.Turtle.blockStyles = {
	category_start: {
		colourPrimary: "#008080",
		colourTertiary: "#008080",
		hat: "cap"
	},
	category_draw: {
		colourPrimary: "#4169E1",
		colourTertiary: "#4169E1"
	},
	category_control: {
		colourPrimary: "#FF6347",
		colourTertiary: "#FF6347"
	},
	category_function: {
		colourPrimary: "#FF1493",
		colourTertiary: "#FF1493"
	},
	category_variable: {
		colourPrimary: "#2E8B57",
		colourTertiary: "#2E8B57"
	}
};

Blockly.Themes.Turtle.categoryStyles = {
	category_draw: {
		colour: "#4169E1"
	},
	category_control: {
		colour: "#FF6347"
	},
	category_function: {
		colour: "#FF1493"
	},
	category_variable: {
		colour: "#2E8B57"
	}
};

Blockly.Themes.Turtle.componentStyles = {
	workspaceBackgroundColour: "#ffffff",
	toolboxBackgroundColour: "#008080",
	flyoutBackgroundColour: "#008080",
	flyoutOpacity: "1",
	scrollbarColour: "#800080",
	scrollbarOpacity: "1"
};

Blockly.Themes.Turtle = new Blockly.Theme("turtle", Blockly.Themes.Turtle.blockStyles, 
													Blockly.Themes.Turtle.categoryStyles, 
													Blockly.Themes.Turtle.componentStyles);