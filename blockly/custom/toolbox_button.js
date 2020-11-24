class ToolboxButton extends Blockly.ToolboxItem {
	constructor(toolboxItemDef, parentToolbox) {
		super(toolboxItemDef, parentToolbox);
	}
	
	/** @override */
	init() {
		this.button = document.createElement("button");
		this.button.type = "button";
		this.button.className = "toolbox-button";
		this.button.id = this.toolboxItemDef_["id"];
		this.button.innerHTML = "<span class='toolbox-icon'>" + this.toolboxItemDef_["icon"] + "</span> ";
		this.button.innerHTML += this.toolboxItemDef_["text"];
	}
	
	/** @override */
	getDiv() {
		return this.button;
	}
}

Blockly.registry.register(Blockly.registry.Type.TOOLBOX_ITEM, "button", ToolboxButton);