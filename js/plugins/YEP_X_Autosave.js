//=============================================================================
// Yanfly Engine Plugins - Save Core Extension - Autosave
// YEP_X_Autosave.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_Autosave = true;

var Yanfly = Yanfly || {};
Yanfly.Autosave = Yanfly.Autosave || {};
Yanfly.Autosave.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc v1.00 自动保存(需要 YEP_SaveCore.js)
 * RPG Maker game.
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * 正式介绍
 * ============================================================================
 *
 * 这个插件需要YEP_SaveCore。确保该插件位于插件列
 * 表中的YEP _ SaveCore下。
 *
 * 自动保存是当今标准RPG中常见的功能。
 * 游戏会在特定的触发点或改变地图时保存，
 * 这样玩家就不会在忘记手动保存的情况下失去任何进展。
 * 这个插件在你的游戏中增加了自动保存功能，
 * 让你控制什么时候自动保存或者在特定条件下自动保存。
 *
 * ============================================================================
 * 指令
 * ============================================================================
 *
 * 这个插件有三种自动保存的方法。请仔细阅读并决定哪
 * 一个最适合你的游戏。
 *
 * ---
 *
 * Manual:
 * - 默认情况下，这个插件不会自动保存。
 * 作为游戏开发人员，
 * 您需要在您希望自动保存发生的各个点插入插件命令:自动保存。
 * 这一个给你最大的游戏控制权。
 *
 * ---
 *
 * Autosave on Map Load:
 * - 这是一个插件参数。当设置为真时，游戏将在每次加载
 * 地图场景时自动保存。这意味着进入一个新的地图，从
 * 一个菜单出来，或者结束一场战斗。所有这三种情况都
 * 会导致自动保存功能激活。
 *
 * ---
 *
 * Autosave on Main Menu:
 * - 这是一个插件参数。当设置为真时，每次玩家从地图场
 * 景进入主菜单时，游戏都会自动保存。关于主菜单，自
 * 动保存不会以任何其他方式发生，这意味着从项目场景
 * 出来到主菜单不会激活自动保存。
 *
 * ---
 *
 * 如果玩家禁用自动保存，自动保存将不会发生。
 * 如果你不想给玩家禁用自动保存的能力，
 * 你可以设置插件参数."Show Option"为false.
 *
 * 您可以同时使用自动保存的三种方法。您可以手动完成，
 * 加载地图时自动保存，调用主菜单时自动保存，
 * 以获得最大的覆盖范围。
 *
 * *注意:虽然你可以同时使用这三种方法，但是要注意你
 * 的玩家。有时候，保存一个游戏可能会引起一些延迟，
 * 这取决于保存的文件有多大。自动保存也没什么不同。
 * 这是插件无法修复的。
 *
 * *注意:除非玩家在游戏中至少手动保存一次，否则不会
 * 自动保存。之后，“自动保存”会将用于保存的插槽取
 * 出，并继续保存到该插槽或玩家稍后移动到的任何一个保存插槽。
 *
 * ============================================================================
 * 插件命令
 * ============================================================================
 *
 * 自动保存是由游戏开发者使用插件命令手动完成的。
 * 还有其他插件命令可以控制自动保存。
 *
 *   插件命令:
 *
 *      Autosave
 *      - 这将使游戏自动保存在玩家使用的最后保存的文件槽中。
 *      如果玩家已经开始了一个新的游戏并且还没有存进一个槽，
 *      什么也不会发生。如果玩家通过选项菜单禁用自动保存，
 *      或者系统通过插件命令禁用自动保存，
 *      也不会发生任何事情。
 *
 *      EnableAutosave
 *      DisableAutosave
 *      - 这将强制启用或禁用游戏自动保存。
 *      这不会绕过玩家禁用自动保存的选项。
 *      玩家禁用自动保存的决定将优先于游戏开发者的决定。
 *      如果你想把这个选项从播放器中移除，
 *      请在插件参数中更改它。
 *
 * ============================================================================
 * 选项核心设置-添加新选项
 * ============================================================================
 *
 * 如果你用的是YEP_OptionsCore.js，你可以用这个插件添加一个新的选项。
 * 以下是您可以使用的代码/参数设置。
 *
 * ---------
 * 设置:
 * ---------
 * 
 * Name:
 * \i[231]Autosave
 *
 * Help Description:
 * Enables \c[4]Autosaving\c[0] for your game if ON.
 * You can still manually save your game.
 *
 * Symbol:
 * autosave
 *
 * Show/Hide:
 * show = Imported.AutosaveShowOpt;
 *
 * Enable:
 * enabled = true;
 *
 * Ext:
 * ext = 0;
 *
 * ----------
 * 功能:
 * ----------
 * 
 * Make Option Code:
 * this.addCommand(name, symbol, enabled, ext);
 *
 * Draw Option Code:
 * var rect = this.itemRectForText(index);
 * var statusWidth = this.statusWidth();
 * var titleWidth = rect.width - statusWidth;
 * this.resetTextColor();
 * this.changePaintOpacity(this.isCommandEnabled(index));
 * this.drawOptionsName(index);
 * this.drawOptionsOnOff(index);
 *
 * Process OK Code:
 * var index = this.index();
 * var symbol = this.commandSymbol(index);
 * var value = this.getConfigValue(symbol);
 * this.changeValue(symbol, !value);
 *
 * Cursor Right Code:
 * var index = this.index();
 * var symbol = this.commandSymbol(index);
 * var value = this.getConfigValue(symbol);
 * this.changeValue(symbol, true);
 * 
 * Cursor Left Code:
 * var index = this.index();
 * var symbol = this.commandSymbol(index);
 * var value = this.getConfigValue(symbol);
 * this.changeValue(symbol, false);
 *
 * Default Config Code:
 * // Empty. Provided by this plugin.
 *
 * Save Config Code:
 * // Empty. Provided by this plugin.
 *
 * Load Config Code:
 * // Empty. Provided by this plugin.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.00:
 * - Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @param ---Automatic---
 * @default
 *
 * @param OnMapLoad
 * @text Autosave on Map Load
 * @parent ---Automatic---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 加载地图时自动保存。
 * YES - true     NO - false
 * @default false
 *
 * @param OnMainMenu
 * @text Autosave on Main Menu
 * @parent ---Automatic---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 每当调用主菜单时自动保存。
 * YES - true     NO - false
 * @default false
 *
 * @param ---Option Menu---
 * @default
 *
 * @param Show Option
 * @parent ---Option Menu---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 给玩家启用或禁用自动保存的选项？
 * YES - true     NO - false
 * @default true
 *
 * @param Option Name
 * @parent ---Option Menu---
 * @desc 游戏中使用的选项命令文本。
 * @default Autosave
 *
 * @param Default
 * @text Default Setting
 * @parent ---Option Menu---
 * @desc 是否希望默认情况下启用自动保存？
 * YES - true     NO - false
 * @default true
 *
 * @param ---Visual---
 * @default
 *
 * @param ShowAutosave
 * @text Show Autosave Message
 * @parent ---Visual---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 自动保存时显示消息？
 * YES - true     NO - false
 * @default true
 *
 * @param AutosaveMsgSave
 * @text Autosave Message On Save
 * @parent ShowAutosave
 * @desc 用于自动保存消息的文本。
 * 可以使用文本代码。
 * @default \i[83]Autosave Complete!
 *
 * @param AutosaveMsgLoad
 * @text Autosave Message On Load
 * @parent ShowAutosave
 * @desc 用于自动保存消息的文本。
 * 可以使用文本代码。
 * @default \i[83]Autosave Loaded!
 *
 * @param MsgGradient1
 * @text Message Gradient 1
 * @parent ShowAutosave
 * @desc 用于较软渐变颜色的十六进制颜色。
 * rgba(0, 0, 0, 0) Reference: Red, Green, Blue, Alpha
 * @default rgba(0, 0, 0, 0)
 *
 * @param MsgGradient2
 * @text Message Gradient 2
 * @parent ShowAutosave
 * @desc 用于较软渐变颜色的十六进制颜色。
 * rgba(0, 0, 0, 0) Reference: Red, Green, Blue, Alpha
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param MsgGradientCode
 * @text Message Gradient Code
 * @parent ShowAutosave
 * @type note
 * @desc 为那些想要调整渐变绘制方式的人编写的JavaScript代码。
 * （不懂JS还是推荐不要使用这个）.
 * @default "var textWidth = this.textWidthEx(this.message());\nvar half = this.textPadding() + Math.ceil(textWidth / 2);\nvar height = this.lineHeight();\nvar color1 = Yanfly.Param.AutosaveMsgColor1;\nvar color2 = Yanfly.Param.AutosaveMsgColor2;\nthis.contents.gradientFillRect(0, 0, half, height, color1, color2);\nthis.contents.gradientFillRect(half, 0, this.width - half, height, color2, color1);"
 *
 * @param MsgX
 * @text Message X
 * @parent ShowAutosave
 * @desc 消息的x位置。
 * 你可以在这里使用代码。
 * @default Graphics.boxWidth - 180
 *
 * @param MsgY
 * @text Message Y
 * @parent ShowAutosave
 * @desc 消息的y位置。
 * 您可以在这里使用代码。
 * @default Graphics.boxHeight - this.fittingHeight(1) * 2
 *
 * @param MsgDuration
 * @text Message Duration
 * @parent ShowAutosave
 * @type number
 * @desc 以帧为单位的消息持续时间。
 * @default 120
 *
 * @param FadeSpeed
 * @text Message Fade Speed
 * @parent ShowAutosave
 * @desc 窗口的渐变速度。
 * Lower - slower     Higher - faster
 * @default 16
 *
 */
//=============================================================================

if (Imported.YEP_SaveCore) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_Autosave');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.AutosaveOnMapLoad = eval(String(Yanfly.Parameters['OnMapLoad']));
Yanfly.Param.AutosaveOnMainMenu = eval(String(Yanfly.Parameters['OnMainMenu']));

Yanfly.Param.AutosaveShowOpt = eval(String(Yanfly.Parameters['Show Option']));
Yanfly.Param.AutosaveOptionCmd = String(Yanfly.Parameters['Option Name']);
Yanfly.Param.AutosaveDefault = eval(String(Yanfly.Parameters['Default']));

Yanfly.Param.AutosaveShowMsg = eval(String(Yanfly.Parameters['ShowAutosave']));
Yanfly.Param.AutosaveMsgSave = String(Yanfly.Parameters['AutosaveMsgSave']);
Yanfly.Param.AutosaveMsgLoad = String(Yanfly.Parameters['AutosaveMsgLoad']);
Yanfly.Param.AutosaveMsgColor1 = String(Yanfly.Parameters['MsgGradient1']);
Yanfly.Param.AutosaveMsgColor2 = String(Yanfly.Parameters['MsgGradient2']);
Yanfly.Param.AutosaveMsgCode = JSON.parse(Yanfly.Parameters['MsgGradientCode']);
Yanfly.Param.AutosaveMsgX = String(Yanfly.Parameters['MsgX']);
Yanfly.Param.AutosaveMsgY = String(Yanfly.Parameters['MsgY']);
Yanfly.Param.AutosaveMsgDur = Number(Yanfly.Parameters['MsgDuration']) || 120;
Yanfly.Param.AutosaveMsgFade = Number(Yanfly.Parameters['FadeSpeed']) || 16;

//=============================================================================
// ConfigManager
//=============================================================================

ConfigManager.autosave = Yanfly.Param.AutosaveDefault;

Yanfly.Autosave.ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function() {
  var config = Yanfly.Autosave.ConfigManager_makeData.call(this);
  config.autosave = this.autosave;
  return config;
};

Yanfly.Autosave.ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function(config) {
  Yanfly.Autosave.ConfigManager_applyData.call(this, config);
  this.autosave = config['autosave'] || Yanfly.Param.AutosaveDefault;
};

//=============================================================================
// DataManager
//=============================================================================

Yanfly.Autosave.DataManager_setupNewGame = DataManager.setupNewGame;
DataManager.setupNewGame = function() {
  Yanfly.Autosave.DataManager_setupNewGame.call(this);
  StorageManager.setCurrentAutosaveSlot(this._lastAccessedId);
  $gameTemp._autosaveNewGame = true;
  $gameTemp._autosaveLoading = false;
};

Yanfly.Autosave.DataManager_saveGame = DataManager.saveGameWithoutRescue;
DataManager.saveGameWithoutRescue = function(savefileId) {
  var value = Yanfly.Autosave.DataManager_saveGame.call(this, savefileId);
  $gameTemp._autosaveNewGame = false;
  $gameTemp._autosaveLoading = false;
  StorageManager.setCurrentAutosaveSlot(savefileId);
  return value;
};

Yanfly.Autosave.DataManager_loadGame = DataManager.loadGameWithoutRescue;
DataManager.loadGameWithoutRescue = function(savefileId) {
  var value = Yanfly.Autosave.DataManager_loadGame.call(this, savefileId);
  $gameTemp._autosaveNewGame = false;
  $gameTemp._autosaveLoading = true;
  StorageManager.setCurrentAutosaveSlot(savefileId);
  return value;
};

//=============================================================================
// StorageManager
//=============================================================================

StorageManager.getCurrentAutosaveSlot = function() {
  return this._currentAutosaveSlot;
};

StorageManager.setCurrentAutosaveSlot = function(savefileId) {
  this._currentAutosaveSlot = savefileId;
};

StorageManager.performAutosave = function() {
  if ($gameMap.mapId() <= 0) return;
  if ($gameTemp._autosaveNewGame) return;
  if (!$gameSystem.canAutosave()) return;
  SceneManager._scene.performAutosave();
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.Autosave.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
  Yanfly.Autosave.Game_System_initialize.call(this);
  this.initAutosave();
};

Game_System.prototype.initAutosave = function() {
  this._allowAutosave = true;
};

Game_System.prototype.canAutosave = function() {
  if (this._allowAutosave === undefined) this.initAutosave();
  return this._allowAutosave;
};

Game_System.prototype.setAutosave = function(value) {
  if (this._allowAutosave === undefined) this.initAutosave();
  this._allowAutosave = value;
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.Autosave.Game_Interpreter_pluginCommand =
  Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.Autosave.Game_Interpreter_pluginCommand.call(this, command, args);
  if (command.match(/EnableAutosave/i)) {
    $gameSystem.setAutosave(true);
  } else if (command.match(/DisableAutosave/i)) {
    $gameSystem.setAutosave(false);
  } else if (command.match(/Autosave/i)) {
    StorageManager.performAutosave();
  }
};

//=============================================================================
// Window_Options
//=============================================================================

Yanfly.Autosave.Window_Options_addGeneralOptions =
  Window_Options.prototype.addGeneralOptions;
Window_Options.prototype.addGeneralOptions = function() {
  Yanfly.Autosave.Window_Options_addGeneralOptions.call(this);
  if (!Imported.YEP_OptionsCore && Yanfly.Param.AutosaveShowOpt) {
    this.addCommand(Yanfly.Param.AutosaveOptionCmd, 'autosave');
  }
};

//=============================================================================
// Window_Autosave
//=============================================================================

function Window_Autosave() {
  this.initialize.apply(this, arguments);
}

Window_Autosave.prototype = Object.create(Window_Base.prototype);
Window_Autosave.prototype.constructor = Window_Autosave;

Window_Autosave.prototype.initialize = function() {
  var width = this.windowWidth();
  var height = this.windowHeight();
  var x = eval(Yanfly.Param.AutosaveMsgX);
  var y = eval(Yanfly.Param.AutosaveMsgY);
  Window_Base.prototype.initialize.call(this, x, y, width, height);
  this.opacity = 0;
  this.contentsOpacity = 0;
  this._showCount = 0;
  this.refresh();
  if ($gameTemp._autosaveLoading) {
    this.reveal();
    $gameTemp._autosaveLoading = false;
  }
};

Window_Autosave.prototype.standardPadding = function() {
  return 0;
};

Window_Autosave.prototype.windowWidth = function() {
  return Graphics.boxWidth;
};

Window_Autosave.prototype.windowHeight = function() {
  return this.fittingHeight(1);
};

Window_Autosave.prototype.update = function() {
  Window_Base.prototype.update.call(this);
  if (this._showCount > 0) {
    this.updateFadeIn();
    this._showCount--;
  } else {
    this.updateFadeOut();
  }
};

Window_Autosave.prototype.updateFadeIn = function() {
  this.contentsOpacity += Yanfly.Param.AutosaveMsgFade;
};

Window_Autosave.prototype.updateFadeOut = function() {
  this.contentsOpacity -= Yanfly.Param.AutosaveMsgFade;
};

Window_Autosave.prototype.reveal = function() {
  if (!Yanfly.Param.AutosaveShowMsg) return;
  if (this._showCount > 0) return;
  this._showCount = Yanfly.Param.AutosaveMsgDur;
  this.refresh();
};

Window_Autosave.prototype.message = function() {
  if ($gameTemp._autosaveLoading) {
    return Yanfly.Param.AutosaveMsgLoad;
  } else {
    return Yanfly.Param.AutosaveMsgSave;
  }
};

Window_Autosave.prototype.refresh = function() {
  this.contents.clear();
  this.drawGradient();
  this.drawTextEx(this.message(), this.textPadding(), 0);
};

Window_Autosave.prototype.drawGradient = function() {
  eval(Yanfly.Param.AutosaveMsgCode);
};

Window_Autosave.prototype.textWidthEx = function(text) {
  return this.drawTextEx(text, 0, this.contents.height);
};

//=============================================================================
// Scene_Base
//=============================================================================

Scene_Base.prototype.performAutosave = function() {
};

//=============================================================================
// Scene_Map
//=============================================================================

Yanfly.Autosave.Scene_Map_createAllWindows =
  Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
  Yanfly.Autosave.Scene_Map_createAllWindows.call(this);
  this.createAutosaveMessageWindow();
};

Scene_Map.prototype.createAutosaveMessageWindow = function() {
  this._autosaveMsgWindow = new Window_Autosave();
  this.addChild(this._autosaveMsgWindow);
};

Yanfly.Autosave.Scene_Map_onMapLoaded = Scene_Map.prototype.onMapLoaded;
Scene_Map.prototype.onMapLoaded = function() {
  Yanfly.Autosave.Scene_Map_onMapLoaded.call(this);
  if (Yanfly.Param.AutosaveOnMapLoad) StorageManager.performAutosave();
};

Yanfly.Autosave.Scene_Map_callMenu = Scene_Map.prototype.callMenu;
Scene_Map.prototype.callMenu = function() {
  Yanfly.Autosave.Scene_Map_callMenu.call(this);
  if (Yanfly.Param.AutosaveOnMainMenu) StorageManager.performAutosave();
};

Scene_Map.prototype.performAutosave = function() {
  if ($gameMap.mapId() <= 0) return;
  if ($gameTemp._autosaveNewGame) return;
  if (!$gameSystem.canAutosave()) return;
  $gameSystem.onBeforeSave();
  DataManager.saveGameWithoutRescue(StorageManager.getCurrentAutosaveSlot());
  if (this._autosaveMsgWindow) this._autosaveMsgWindow.reveal();
};

//=============================================================================
// Save Core Check
//=============================================================================
} else {

Imported.YEP_X_Autosave = false;
var text = '';
text += 'You are getting this error because you are trying to run ';
text += 'YEP_X_Autosave without the required plugins. Please visit ';
text += 'Yanfly.moe and install the required plugins neede for this plugin ';
text += 'found in this plugin\'s help file before you can use it.';
console.log(text);
require('nw.gui').Window.get().showDevTools();

}
//=============================================================================
// End of File
//=============================================================================