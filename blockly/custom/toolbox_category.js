class ToolboxCategory extends Blockly.ToolboxCategory {
	constructor(categoryDef, toolbox, opt_parent) {
		super(categoryDef, toolbox, opt_parent);
	}
	
	/** @override */
	addColourBorder_(colour){
		this.rowDiv_.style.backgroundColor = "#009090";
		this.rowDiv_.innerHTML = "<span class='toolbox-icon'>" + this.toolboxItemDef_["icon"] + "</span> ";
		this.rowDiv_.innerHTML += this.toolboxItemDef_["name"];
	}
	
	/** @override */
	setSelected(isSelected){
		if (isSelected) {
			this.rowDiv_.style.backgroundColor = this.colour_;
			//this.rowDiv_.style.color = "#000000";
		}
		else {
			this.rowDiv_.style.backgroundColor = "#009090";
			//this.rowDiv_.style.color = "#ffffff";
		}
		
		Blockly.utils.aria.setState(/** @type {!Element} */ (this.htmlDiv_),
		Blockly.utils.aria.State.SELECTED, isSelected);
	}
}

Blockly.registry.register(Blockly.registry.Type.TOOLBOX_ITEM, Blockly.ToolboxCategory.registrationName, ToolboxCategory, true);