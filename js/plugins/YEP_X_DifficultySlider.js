//=============================================================================
// Yanfly Engine Plugins - Enemy Levels Extension - Difficulty Slider
// YEP_X_DifficultySlider.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_DifficultySlider = true;

var Yanfly = Yanfly || {};
Yanfly.DSlider = Yanfly.DSlider || {};
Yanfly.DSlider.version = 1.04;

//=============================================================================
 /*:
 * @plugindesc v1.04 游戏难度设置(需要 YEP_EnemyLevels.js)
 * access to an option that allows them to change difficulty.
 * @author Yanfly Engine Plugins
 *
 * @param ---Options---
 * @default
 *
 * @param Command Text
 * @parent ---Options---
 * @desc 命令在选项菜单中的显示方式。
 * @default Difficulty
 *
 * @param Default Show
 * @parent ---Options---
 * @type boolean
 * @desc 默认显示命令？如果关闭，默认为100。
 * ON - true     OFF - false
 * @default true
 *
 * @param ---Settings---
 * @default
 *
 * @param Default Difficulty
 * @parent ---Settings---
 * @desc 这是默认的难度值。
 * @type Number
 * @default 100
 *
 * @param Minimum Difficulty
 * @parent ---Settings---
 * @desc 这是最小难度值。
 * @type Number
 * @default 50
 *
 * @param Maximum Difficulty
 * @parent ---Settings---
 * @desc 这是最大难度值。
 * @type Number
 * @default 200
 *
 * @param Change Increment
 * @parent ---Settings---
 * @desc 这是难度每次增加的变化量
 * @type Number
 * @default 25
 *
 * @param ---Formulas---
 * @default
 *
 * @param Base Level Formula
 * @parent ---Formulas---
 * @desc 用于确定基本等级的公式。
 * level - current level     multiplier - multiplier value
 * @default level * multiplier / 100
 *
 * @param Maximum Level Formula
 * @parent ---Formulas---
 * @desc 用于确定最大等级的公式。
 * level - current level     multiplier - multiplier value
 * @default level * multiplier / 100
 *
 * @param Minimum Level Formula
 * @parent ---Formulas---
 * @desc 用于确定最低等级的公式。
 * level - current level     multiplier - multiplier value
 * @default level * multiplier / 100
 *
 * @help
 * ============================================================================
 * 正式介绍
 * ============================================================================
 *
 * 这个插件需要YEP_EnemyLevels。确保该插件位于插
 * 件列表中的YEP _ EnemyLevels下。
 *
 * 有时，玩家希望能够根据自己的意愿增加或减少游戏的
 * 难度。安装了这个插件后，难度滑块将成为游戏选项菜
 * 单中的一项功能。在那里，玩家可以在一定范围内
 * (由你，开发者设定)改变战斗中出现的敌人的等级。
 * ...
 *
 * 难度设置只会改变敌人的等级，不会改变其他。
 * 因此，举例来说，200%的难度意味着只有200%的水平增加，
 * 但不一定是200%的ATK。敌人的ATK值将基于其原始水
 * 平的200%的ATK。
 *
 * 如果难度设置在游戏中被禁用，
 * 那么等级乘数将恢复到100%。
 * 您可以通过插件命令随意启用和禁用此功能。
 *
 * ============================================================================
 * 注释标记
 * ============================================================================
 *
 * 难度设置插件有一个标签。
 *
 * 敌人注释标签:
 *
 *   <Unaffected by Difficulty Slider>
 *   - 这将使敌人的水平不受难度设置的影响，这意味着敌人
 *   将始终处于其当前计算水平的100%。
 *
 * ============================================================================
 * 插件命令
 * ============================================================================
 *
 * 对于那些希望在游戏中途从选项菜单中显示/隐藏难度滑
 * 块的人，您可以使用以下插件命令来控制它:
 *
 * 插件命令:
 *
 *   ShowDifficultySlider
 *   - 这将显示难度设置，并使其适用于游戏中所有没有未受
 *   影响的笔记标签的敌人。
 *
 *   HideDifficultySlider
 *   - 这将隐藏难度设置，并在游戏中禁用滑块对敌人等级的
 *   影响。
 *
 * ============================================================================
 *附加信息
 * ============================================================================
 *
 * 对于那些希望在脚本调用中使用难度滑块的人，，您可以
 * 通过以下方式找到玩家设置的值:
 *
 *   ConfigManager.difficultySlider
 *
 * 该值将返回一个整数。100%的难度设置会产生100，
 * 200%的难度设置会产生200。
 * 因此，如果您希望进行仅在较高难度下出现的检查，
 * 您可以使用以下方法:
 *
 *   if (ConfigManager.difficultySlider >= 200) {
 *     // Do stuff
 *   }
 *
 * 玩得开心！
 *
 * ============================================================================
 * 选项核心设置-添加新选项
 * ============================================================================
 *
 * I如果你用的是YEP_OptionsCore.js，你可以用这个插件
 * 添加一个新的选项。以下是您可以使用的代码/参数设置。
 *
 * ---------
 * Settings:
 * ---------
 * 
 * Name:
 * \i[87]Enemy Difficulty
 *
 * Help Description:
 * Determines the level strength of enemies.
 *
 * Symbol:
 * difficultySlider
 *
 * Show/Hide:
 * if (Imported.YEP_X_DifficultySlider) {
 *   show = $gameSystem.showDifficultySlider();
 * } else {
 *   show = false;
 * }
 *
 * Enable:
 * enabled = true;
 *
 * Ext:
 * ext = 0;
 *
 * ----------
 * Functions:
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
 * var value = this.getConfigValue(symbol);
 * var rate = value / Yanfly.Param.DSliderMaxDif;
 * var gaugeColor1 = this.textColor(28);
 * var gaugeColor2 = this.textColor(29);
 * this.drawOptionsGauge(index, rate, gaugeColor1, gaugeColor2);
 * this.drawText(this.statusText(index), titleWidth, rect.y, statusWidth, 'center');
 *
 * Process OK Code:
 * var index = this.index();
 * var symbol = this.commandSymbol(index);
 * var value = this.getConfigValue(symbol);
 * value += Yanfly.Param.DSliderChange;
 * if (value > Yanfly.Param.DSliderMaxDif) value = Yanfly.Param.DSliderMinDif;
 * value = value.clamp(Yanfly.Param.DSliderMinDif, Yanfly.Param.DSliderMaxDif);
 * this.changeValue(symbol, value);
 *
 * Cursor Right Code:
 * var index = this.index();
 * var symbol = this.commandSymbol(index);
 * var value = this.getConfigValue(symbol);
 * value += Yanfly.Param.DSliderChange;
 * value = value.clamp(Yanfly.Param.DSliderMinDif, Yanfly.Param.DSliderMaxDif);
 * this.changeValue(symbol, value);
 * 
 * Cursor Left Code:
 * var index = this.index();
 * var symbol = this.commandSymbol(index);
 * var value = this.getConfigValue(symbol);
 * value -= Yanfly.Param.DSliderChange;
 * value = value.clamp(Yanfly.Param.DSliderMinDif,
 * Yanfly.Param.DSliderMaxDif);
 * this.changeValue(symbol, value);
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
 * Version 1.04:
 * - Bypass the isDevToolsOpen() error when bad code is inserted into a script
 * call or custom Lunatic Mode code segment due to updating to MV 1.6.1.
 *
 * Version 1.03:
 * - Compatibility update for YEP_OptionsCore.js.
 *
 * Version 1.02:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.01:
 * - Bug fixed: Error with pressing right on the difficulty slider causing
 * the game to crash unexpectedly.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

if (Imported.YEP_EnemyLevels) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_DifficultySlider');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.DSliderOptionsCmd = String(Yanfly.Parameters['Command Text']);
Yanfly.Param.DSliderShow = eval(String(Yanfly.Parameters['Default Show']));

Yanfly.Param.DSliderDefDif = Number(Yanfly.Parameters['Default Difficulty']);
Yanfly.Param.DSliderMinDif = Number(Yanfly.Parameters['Minimum Difficulty']);
Yanfly.Param.DSliderMaxDif = Number(Yanfly.Parameters['Maximum Difficulty']);
Yanfly.Param.DSliderChange = Number(Yanfly.Parameters['Change Increment']);

Yanfly.Param.DSliderBase = String(Yanfly.Parameters['Base Level Formula']);
Yanfly.Param.DSliderMax = String(Yanfly.Parameters['Maximum Level Formula']);
Yanfly.Param.DSliderMin = String(Yanfly.Parameters['Maximum Level Formula']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.DSlider.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.DSlider.DataManager_isDatabaseLoaded.call(this)) return false;

  if (!Yanfly._loaded_YEP_DifficultySlider) {
    this.processDSliderNotetags1($dataEnemies);
    Yanfly._loaded_YEP_DifficultySlider = true;
  }
  
  return true;
};

DataManager.processDSliderNotetags1 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.difficultySliderAffected = true;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<UNAFFECTED BY DIFFICULTY SLIDER>/i)) {
        obj.difficultySliderAffected = false;
      }
    }
  }
};

//=============================================================================
// ConfigManager
//=============================================================================

ConfigManager.difficultySlider = Yanfly.Param.DSliderDefDif;

Yanfly.DSlider.ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function() {
  var config = Yanfly.DSlider.ConfigManager_makeData.call(this);
  config.difficultySlider = this.difficultySlider;
  return config;
};

Yanfly.DSlider.ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function(config) {
  Yanfly.DSlider.ConfigManager_applyData.call(this, config);
  this.difficultySlider = this.readConfigDifficultySlider(config,
    'difficultySlider');
};

ConfigManager.readConfigDifficultySlider = function(config, name) {
  var value = config[name];
  if (value !== undefined) {
    return Number(value).clamp(Yanfly.Param.DSliderMinDif,
      Yanfly.Param.DSliderMaxDif);
  } else {
    return Yanfly.Param.DSliderDefDif.clamp(Yanfly.Param.DSliderMinDif,
      Yanfly.Param.DSliderMaxDif);
  }
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.DSlider.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
  Yanfly.DSlider.Game_System_initialize.call(this);
  this.initDifficultySliderSettings();
};

Game_System.prototype.initDifficultySliderSettings = function() {
  this._showDifficultySlider = Yanfly.Param.DSliderShow;
};

Game_System.prototype.showDifficultySlider = function() {
  if (this._showDifficultySlider === undefined) {
    this.initDifficultySliderSettings();
  }
  return this._showDifficultySlider;
};

Game_System.prototype.setDifficultySlider = function(value) {
  if (this._showDifficultySlider === undefined) {
    this.initDifficultySliderSettings();
  }
  this._showDifficultySlider = value;
};

//=============================================================================
// Game_Enemy
//=============================================================================

Game_Enemy.prototype.isDifficultySliderAffected = function() {
  return this.enemy().difficultySliderAffected && 
    $gameSystem.showDifficultySlider();
};

Yanfly.DSlider.Game_Enemy_setupMinimumLevel =
  Game_Enemy.prototype.setupMinimumLevel;
Game_Enemy.prototype.setupMinimumLevel = function() {
  var level = Yanfly.DSlider.Game_Enemy_setupMinimumLevel.call(this);
  if (this.isDifficultySliderAffected()) {
    var multiplier = ConfigManager.difficultySlider
    var code = Yanfly.Param.DSliderMin;
    try {
      level = eval(code);
    } catch (e) {
      level = level * multiplier / 100;
      Yanfly.Util.displayError(e, code, 
        'DIFFICULTY SLIDER MINIMUM LEVEL ERROR');
    }
  }
  return parseInt(level);
};

Yanfly.DSlider.Game_Enemy_setupMaximumLevel =
  Game_Enemy.prototype.setupMaximumLevel;
Game_Enemy.prototype.setupMaximumLevel = function() {
  var level = Yanfly.DSlider.Game_Enemy_setupMaximumLevel.call(this);
  if (this.isDifficultySliderAffected()) {
    var multiplier = ConfigManager.difficultySlider
    var code = Yanfly.Param.DSliderMax;
    try {
      level = eval(code);
    } catch (e) {
      level = level * multiplier / 100;
      Yanfly.Util.displayError(e, code, 
        'DIFFICULTY SLIDER MAXIMUM LEVEL ERROR');
    }
  }
  return parseInt(level);
};

Yanfly.DSlider.Game_Enemy_getSetupLevel = Game_Enemy.prototype.getSetupLevel;
Game_Enemy.prototype.getSetupLevel = function() {
  var level = Yanfly.DSlider.Game_Enemy_getSetupLevel.call(this);
  if (this.isDifficultySliderAffected()) {
    var multiplier = ConfigManager.difficultySlider
    var code = Yanfly.Param.DSliderBase;
    try {
      level = eval(code);
    } catch (e) {
      level = level * multiplier / 100;
      Yanfly.Util.displayError(e, code, 
        'DIFFICULTY SLIDER BASE LEVEL ERROR');
    }
  }
  return parseInt(level);
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.DSlider.Game_Interpreter_pluginCommand =
  Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.DSlider.Game_Interpreter_pluginCommand.call(this, command, args);
  if (command === 'ShowDifficultySlider') {
    $gameSystem.setDifficultySlider(true);
  } else if (command === 'HideDifficultySlider') {
    $gameSystem.setDifficultySlider(false);
  }
};

//=============================================================================
// Window_Options
//=============================================================================

Yanfly.DSlider.Window_Options_addGeneralOptions =
  Window_Options.prototype.addGeneralOptions;
Window_Options.prototype.addGeneralOptions = function() {
  Yanfly.DSlider.Window_Options_addGeneralOptions.call(this);
  if (Imported.YEP_OptionsCore) return;
  if ($gameSystem.showDifficultySlider()) this.addDifficultySliderOptions();
};

Window_Options.prototype.addDifficultySliderOptions = function() {
  this.addCommand(Yanfly.Param.DSliderOptionsCmd, 'difficultySlider');
};

Yanfly.DSlider.Window_Options_statusText = Window_Options.prototype.statusText;
Window_Options.prototype.statusText = function(index) {
  var symbol = this.commandSymbol(index);
  var value = this.getConfigValue(symbol);
  if (symbol === 'difficultySlider') {
    return Yanfly.Util.toGroup(value) + '%';
  } else {
    return Yanfly.DSlider.Window_Options_statusText.call(this, index);
  }
};

if (!Imported.YEP_OptionsCore) {

Yanfly.DSlider.Window_Options_processOk = Window_Options.prototype.processOk;
Window_Options.prototype.processOk = function() {
  var index = this.index();
  var symbol = this.commandSymbol(index);
  if (symbol === 'difficultySlider') {
    var value = this.getConfigValue(symbol);
    value += Yanfly.Param.DSliderChange;
    if (value > Yanfly.Param.DSliderMaxDif) value = Yanfly.Param.DSliderMinDif;
    value = value.clamp(Yanfly.Param.DSliderMinDif,
      Yanfly.Param.DSliderMaxDif);
    this.changeValue(symbol, value);
  } else {
    Yanfly.DSlider.Window_Options_processOk.call(this);
  }
};

Yanfly.DSlider.Window_Options_cursorRight = 
  Window_Options.prototype.cursorRight;
Window_Options.prototype.cursorRight = function(wrap) {
  var index = this.index();
  var symbol = this.commandSymbol(index);
  if (symbol === 'difficultySlider') {
    var value = this.getConfigValue(symbol);
    value += Yanfly.Param.DSliderChange;
    value = value.clamp(Yanfly.Param.DSliderMinDif,
      Yanfly.Param.DSliderMaxDif);
    this.changeValue(symbol, value);
  } else {
    Yanfly.DSlider.Window_Options_cursorRight.call(this, wrap);
  }
};

Yanfly.DSlider.Window_Options_cursorLeft = Window_Options.prototype.cursorLeft;
Window_Options.prototype.cursorLeft = function(wrap) {
  var index = this.index();
  var symbol = this.commandSymbol(index);
  if (symbol === 'difficultySlider') {
    var value = this.getConfigValue(symbol);
    value -= Yanfly.Param.DSliderChange;
    value = value.clamp(Yanfly.Param.DSliderMinDif,
      Yanfly.Param.DSliderMaxDif);
    this.changeValue(symbol, value);
  } else {
    Yanfly.DSlider.Window_Options_cursorLeft.call(this, wrap);
  }
};

}; // Imported.YEP_OptionsCore


//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

if (!Yanfly.Util.toGroup) {

Yanfly.Util.toGroup = function(inVal) {
  return inVal;
}

}; // Yanfly.Util.toGroup

Yanfly.Util.displayError = function(e, code, message) {
  console.log(message);
  console.log(code || 'NON-EXISTENT');
  console.error(e);
  if (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= "1.6.0") return;
  if (Utils.isNwjs() && Utils.isOptionValid('test')) {
    if (!require('nw.gui').Window.get().isDevToolsOpen()) {
      require('nw.gui').Window.get().showDevTools();
    }
  }
};

//=============================================================================
// End of File
//=============================================================================
} else {

var text = '================================================================\n';
text += 'YEP_X_DifficultySlider requires YEP_EnemyLevels to be at the ';
text += 'latest version to run properly.\n\nPlease go to www.yanfly.moe and ';
text += 'update to the latest version for the YEP_EnemyLevels plugin.\n';
text += '================================================================\n';
console.log(text);
require('nw.gui').Window.get().showDevTools();

}; // Imported.YEP_EnemyLevels