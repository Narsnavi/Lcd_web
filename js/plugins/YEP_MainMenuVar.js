//=============================================================================
// Yanfly Engine Plugins - Main Menu Variable Window
// YEP_MainMenuVar.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_MainMenuVar = true;

var Yanfly = Yanfly || {};
Yanfly.MMVar = Yanfly.MMVar || {};
Yanfly.MMVar.version = 1.02;

//=============================================================================
 /*:
 * @plugindesc v1.02 变量显示菜单.
 * You can use it to display up to 10 different variables!
 * @author Yanfly Engine Plugins + Tigress Collaboration
 *
 * @param ---Settings---
 * @default
 *
 * @param Window X
 * @parent ---Settings---
 * @desc 这是你窗户的x位置！使用 'auto' 自动计算。
 * automate the calculations. This is an eval piece of code.
 * @default auto
 *
 * @param Window Y
 * @parent ---Settings---
 * @desc 这是你窗户的y位置！使用 'auto' 自动计算
 * automate the calculations. This is an eval piece of code.
 * @default auto
 *
 * @param Window Width
 * @parent ---Settings---
 * @desc 这是你窗口的宽度！使用 'auto' 自动计算
 * the calculations. This is an eval piece of code.
 * @default auto
 *
 * @param Window Height
 * @parent ---Settings---
 * @desc 这是你窗口的高度！使用 'auto' 自动计算
 * the calculations. This is an eval piece of code.
 * @default auto
 *
 * @param Font Size
 * @parent ---Settings---
 * @desc 这是文字的字体大小！使用 'auto' 自动计算
 * the calculations. This is an eval piece of code.
 * @default 28
 *
 * @param Standard Padding
 * @parent ---Settings---
 * @type number
 * @min 1
 * @decimals 0
 * @desc 这是窗口填充值！
 * @default 18
 *
 * @param Text Padding
 * @parent ---Settings---
 * @type number
 * @min 1
 * @decimals 0
 * @desc 这是文本填充值！
 * @default 6
 *
 * @param Back Opacity
 * @parent ---Settings---
 * @type number
 * @min 0
 * @max 255
 * @decimals 0
 * @desc 这是窗口的背面景不透明！
 * @default 192
 *
 * @param Window Opacity
 * @parent ---Settings---
 * @type number
 * @min 0
 * @max 255
 * @decimals 0
 * @desc 这是窗口的实际不透明度！
 * @default 255
 *
 * @param ---Variables---
 * @default
 *
 * @param Displayed Variable 1
 * @parent ---Variables---
 * @type number
 * @min 0
 * @decimals 0
 * @desc 显示在第一个变量行中的变量。
 * 保留为0表示不显示变量.
 * @default 0
 *
 * @param Show Switch Variable 1
 * @parent ---Variables---
 * @type number
 * @min 0
 * @decimals 0
 * @desc 该开关需要打开才能显示变量。
 * 将此值保留为0，以使变量不需要开关。
 * @default 0
 *
 * @param Displayed Variable 2
 * @parent ---Variables---
 * @type number
 * @min 0
 * @decimals 0
 * @desc 显示在第二个变量行中的变量。
 * 将其保留为0以不显示变量。
 * @default 0
 *
 * @param Show Switch Variable 2
 * @parent ---Variables---
 * @type number
 * @min 0
 * @decimals 0
 * @desc 该开关需要打开才能显示变量。
 * 将此值保留为0，以使变量不需要开关。
 * @default 0
 *
 * @param Displayed Variable 3
 * @parent ---Variables---
 * @type number
 * @min 0
 * @decimals 0
 * @desc The variable displayed in the 3rd variable row.
 * Leave this as 0 to not display a variable.
 * @default 0
 *
 * @param Show Switch Variable 3
 * @parent ---Variables---
 * @type number
 * @min 0
 * @decimals 0
 * @desc This switch needs to be on to show the variable.
 * Leave this as 0 to make the variable not require a switch.
 * @default 0
 *
 * @param Displayed Variable 4
 * @parent ---Variables---
 * @type number
 * @min 0
 * @decimals 0
 * @desc The variable displayed in the 4th variable row.
 * Leave this as 0 to not display a variable.
 * @default 0
 *
 * @param Show Switch Variable 4
 * @parent ---Variables---
 * @type number
 * @min 0
 * @decimals 0
 * @desc This switch needs to be on to show the variable.
 * Leave this as 0 to make the variable not require a switch.
 * @default 0
 *
 * @param Displayed Variable 5
 * @parent ---Variables---
 * @type number
 * @min 0
 * @decimals 0
 * @desc The variable displayed in the 5th variable row.
 * Leave this as 0 to not display a variable.
 * @default 0
 *
 * @param Show Switch Variable 5
 * @parent ---Variables---
 * @type number
 * @min 0
 * @decimals 0
 * @desc This switch needs to be on to show the variable.
 * Leave this as 0 to make the variable not require a switch.
 * @default 0
 *
 * @param Displayed Variable 6
 * @parent ---Variables---
 * @type number
 * @min 0
 * @decimals 0
 * @desc The variable displayed in the 6th variable row.
 * Leave this as 0 to not display a variable.
 * @default 0
 *
 * @param Show Switch Variable 6
 * @parent ---Variables---
 * @type number
 * @min 0
 * @decimals 0
 * @desc This switch needs to be on to show the variable.
 * Leave this as 0 to make the variable not require a switch.
 * @default 0
 *
 * @param Displayed Variable 7
 * @parent ---Variables---
 * @type number
 * @min 0
 * @decimals 0
 * @desc The variable displayed in the 7th variable row.
 * Leave this as 0 to not display a variable.
 * @default 0
 *
 * @param Show Switch Variable 7
 * @parent ---Variables---
 * @type number
 * @min 0
 * @decimals 0
 * @desc This switch needs to be on to show the variable.
 * Leave this as 0 to make the variable not require a switch.
 * @default 0
 *
 * @param Displayed Variable 8
 * @parent ---Variables---
 * @type number
 * @min 0
 * @decimals 0
 * @desc The variable displayed in the 8th variable row.
 * Leave this as 0 to not display a variable.
 * @default 0
 *
 * @param Show Switch Variable 8
 * @parent ---Variables---
 * @type number
 * @min 0
 * @decimals 0
 * @desc This switch needs to be on to show the variable.
 * Leave this as 0 to make the variable not require a switch.
 * @default 0
 *
 * @param Displayed Variable 9
 * @parent ---Variables---
 * @type number
 * @min 0
 * @decimals 0
 * @desc The variable displayed in the 9th variable row.
 * Leave this as 0 to not display a variable.
 * @default 0
 *
 * @param Show Switch Variable 9
 * @parent ---Variables---
 * @type number
 * @min 0
 * @decimals 0
 * @desc This switch needs to be on to show the variable.
 * Leave this as 0 to make the variable not require a switch.
 * @default 0
 *
 * @param Displayed Variable 10
 * @parent ---Variables---
 * @type number
 * @min 0
 * @decimals 0
 * @desc The variable displayed in the 10th variable row.
 * Leave this as 0 to not display a variable.
 * @default 0
 *
 * @param Show Switch Variable 10
 * @parent ---Variables---
 * @type number
 * @min 0
 * @decimals 0
 * @desc This switch needs to be on to show the variable.
 * Leave this as 0 to make the variable not require a switch.
 * @default 0
 *
 * @help
 * ============================================================================
 * 正式介绍
 * ============================================================================
 *
 * 在RPG Maker MV中，主菜单只显示该方的金币作为游
 * 戏中唯一的货币。然而，一些游戏更喜欢在主菜单中显
 * 示不仅仅是金币，其中，可能以变量的形式出现。
 * 你可以使用这个插件！
 *
 * 这个插件可以让你在游戏的主菜单中放置多达10个你选
 * 择的变量。它将显示变量名及其值。如果您希望将某些
 * 变量隐藏到某个点，您可以将一个开关连接到它，
 * 只有当开关打开而不是关闭时，
 * 变量才会显示出来。
 *
 * 主菜单变量窗口也是可定制的。你可以在插件参数中调
 * 整x，y，宽度，高度，字体设置等等！这样，你可以让
 * 它适合你的游戏的主菜单，无论你想要什么！
 *
 * This is a collaboration plugin by Tigress and Yanfly to ensure compatibility
 * with the Yanfly Engine Plugins library.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.02:
 * - Compatibility update made with YEP_X_MoreCurrencies. If a variable has
 * << and >> in its name, it will remove it the text in between like with the
 * YEP_X_MoreCurrencies plugin.
 *
 * Version 1.01:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_MainMenuVar');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.MMVarWinX = String(Yanfly.Parameters['Window X']);
Yanfly.Param.MMVarWinY = String(Yanfly.Parameters['Window Y']);
Yanfly.Param.MMVarWinWidth = String(Yanfly.Parameters['Window Width']);
Yanfly.Param.MMVarWinHeight = String(Yanfly.Parameters['Window Height']);
Yanfly.Param.MMVarFontSize = Number(Yanfly.Parameters['Font Size']);
Yanfly.Param.MMVarStandardPad = Number(Yanfly.Parameters['Standard Padding']);
Yanfly.Param.MMVarTextPad = Number(Yanfly.Parameters['Text Padding']);
Yanfly.Param.MMVarBackOpacity = Number(Yanfly.Parameters['Back Opacity']);
Yanfly.Param.MMVarWinOpacity = Number(Yanfly.Parameters['Window Opacity']);

Yanfly.SetupParameters = function() {
  Yanfly.Param.MMVarId = {};
  Yanfly.Param.MMVarSwitch = {};
  for (var i = 1; i <= 10; i++) {
    var key1 = 'Displayed Variable ' + i;
    var key2 = 'Show Switch Variable ' + i;
    Yanfly.Param.MMVarId[i] = Number(Yanfly.Parameters[key1]) || 0;
    Yanfly.Param.MMVarSwitch[i] = Number(Yanfly.Parameters[key2]) || 0;
  }
};
Yanfly.SetupParameters();

//=============================================================================
// Window_MainMenuVariable
//=============================================================================

function Window_MainMenuVariable() {
    this.initialize.apply(this, arguments);
}

Window_MainMenuVariable.prototype = Object.create(Window_Base.prototype);
Window_MainMenuVariable.prototype.constructor = Window_MainMenuVariable;

Window_MainMenuVariable.prototype.initialize = function(x, y, w, h) {
  Window_Base.prototype.initialize.call(this, x, y, w, h);
  this.opacity = Yanfly.Param.MMVarWinOpacity;
  this.refresh();
};

Window_MainMenuVariable.prototype.standardFontSize = function() {
  return Yanfly.Param.MMVarFontSize || 28;
};

Window_MainMenuVariable.prototype.standardPadding = function() {
  return Yanfly.Param.MMVarStandardPad || 18;
};

Window_MainMenuVariable.prototype.textPadding = function() {
  return Yanfly.Param.MMVarTextPad || 6;
};

Window_MainMenuVariable.prototype.standardBackOpacity = function() {
  return Yanfly.Param.MMVarBackOpacity;
};

Window_MainMenuVariable.prototype.refresh = function() {
  this.contents.clear();
  var x = this.textPadding();
  var y = 0;
  for (var i = 1; i <= this.maxVariables(); i++) {
    if (this.showVariableData(i)) {
      this.resetFontSettings();
      y = this.drawVariableData(i, x, y);
    }
  }
};

Window_MainMenuVariable.prototype.maxVariables = function() {
  return 10;
};

Window_MainMenuVariable.prototype.showVariableData = function(i) {
  if (Yanfly.Param.MMVarSwitch[i] <= 0) {
    return true;
  } else {
    return $gameSwitches.value(Yanfly.Param.MMVarSwitch[i]);
  }
};

Window_MainMenuVariable.prototype.drawVariableData = function(i, x, y) {
  if (Yanfly.Param.MMVarId[i] <= 0) {
    return y;
  }
  var varId = Yanfly.Param.MMVarId[i];
  var name = $dataSystem.variables[varId];
  if (Imported.YEP_X_MoreCurrencies) {
    name = name.replace(/<<(.*?)>>/gi, '');
  }
  this.drawTextEx(name, x, y);
  var value = Yanfly.Util.toGroup($gameVariables.value(varId));
  var width = this.contents.width - this.textPadding() * 2;
  this.drawText(value, x, y, width, 'right');
  return y + this.lineHeight();
};

//=============================================================================
// Scene_Menu
//=============================================================================

Yanfly.MMVar.Scene_Menu_create = Scene_Menu.prototype.create;
Scene_Menu.prototype.create = function() {
  Yanfly.MMVar.Scene_Menu_create.call(this);
  this.createVariableWindow();
};

Scene_Menu.prototype.createVariableWindow = function() {
  var x = this.getVariableWindowX();
  var y = this.getVariableWindowY();
  var w = this.getVariableWindowWidth();
  var h = this.getVariableWindowHeight();
  this._variableWindow = new Window_MainMenuVariable(x, y, w, h);
  this.addWindow(this._variableWindow);
};

Scene_Menu.prototype.getVariableWindowX = function() {
  if (Yanfly.Param.MMVarWinX.toUpperCase() === 'AUTO') {
    return this._commandWindow.x;
  } else {
    return eval(Yanfly.Param.MMVarWinX);
  }
};

Scene_Menu.prototype.getVariableWindowY = function() {
  if (Yanfly.Param.MMVarWinY.toUpperCase() === 'AUTO') {
    return this._commandWindow.y + this._commandWindow.height;
  } else {
    return eval(Yanfly.Param.MMVarWinY);
  }
};

Scene_Menu.prototype.getVariableWindowWidth = function() {
  if (Yanfly.Param.MMVarWinWidth.toUpperCase() === 'AUTO') {
    return this._commandWindow.width;
  } else {
    return eval(Yanfly.Param.MMVarWinWidth);
  }
};

Scene_Menu.prototype.getVariableWindowHeight = function() {
  if (Yanfly.Param.MMVarWinHeight.toUpperCase() === 'AUTO') {
    return Graphics.boxHeight - this._commandWindow.height -
      this._goldWindow.height;
  } else {
    return eval(Yanfly.Param.MMVarWinHeight);
  }
};

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {}

if (!Yanfly.Util.toGroup) {

Yanfly.Util.toGroup = function(inVal) {
  return inVal;
}

}; // Yanfly.Util.toGroup

//=============================================================================
// End of File
//=============================================================================