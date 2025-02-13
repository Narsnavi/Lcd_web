//=============================================================================
// Yanfly Engine Plugins - Weather In Battle
// YEP_WeatherInBattle.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_WeatherInBattle = true;

var Yanfly = Yanfly || {};
Yanfly.WIB = Yanfly.WIB || {};
Yanfly.WIB.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc v1.00 战斗天气
 * controllable through action sequences.
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * 正式介绍
 * ============================================================================
 *
 * 天气默认不出现在RPG Maker MV的战斗中。这导致了
 * 随着天气影响的到来，不要在地图上加入战斗
 * 战斗场景的背景，天空突然没有了这样的景象
 * 天气行为。这个插件增加了制作任何东西的简单效果
 * 地图上播放的天气也会影响播放的天气
 * 战斗。还有新的功能来保存天气设置和调用它们
 * 为以后除了一个新的行动序列为那些使用战斗
 * Engine Core plugin.
 *
 * ============================================================================
 * 插件命令
 * ============================================================================
 *
 * 插件命令:
 * 
 *   SaveWeather
 *   - 保存当前天气设置，即类型、频率和
 *   将保存要更改的持续时间.
 *
 *   RecallWeather
 *   - 回忆上次保存的天气设置。如果最后没有保存任何东西,
 *   那什么都不会发生。使用此插件命令不会删除
 *   上次从内存中保存的天气设置.
 *
 * ============================================================================
 * Yanfly Engine Plugins - Battle Engine Extension - Action Sequence Commands
 * ============================================================================
 *
 * 如果你已经安装了这个插件
 * 在插件管理器的下面，你可以利用这些额外的
 * 伤害相关动作序列.
 *
 *=============================================================================
 * WEATHER: type, (power), (duration)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Replace 'type' with either 'none', 'rain', 'storm', or 'snow'.
 * Replace 'power' with a value between 1 and 9.
 * Replace 'duration' with the number of frames you want the change to be.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: weather: rain, 5, 20
 *                weather: storm, 7, 60
 *                weather: snow, 9, 90
 *                weather: none, 1, 60
 *=============================================================================
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.00:
 * - Finished Plugin!
 *
 */
//=============================================================================

//=============================================================================
// Game_Screen
//=============================================================================

Game_Screen.prototype.saveWeather = function() {
    this._savedWeather = {
        type: this._weatherType || 'none',
        power: this._weatherPowerTarget || 0,
        duration: this._weatherDuration || 0
    }
};

Game_Screen.prototype.recallWeather = function() {
    if (this._savedWeather === undefined) return;
    this.changeWeather(this._savedWeather.type, this._savedWeather.power,
      this._savedWeather.duration);
};

//=============================================================================
// Game_Interpreter
//=============================================================================

// Set Weather Effect
Game_Interpreter.prototype.command236 = function() {
    $gameScreen.changeWeather(this._params[0], this._params[1],
      this._params[2]);
    if (this._params[3]) {
      this.wait(this._params[2]);
    }
    return true;
};

Yanfly.WIB.Game_Interpreter_pluginCommand =
  Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.WIB.Game_Interpreter_pluginCommand.call(this, command, args);
  if (command.match(/SaveWeather/i)) {
    $gameScreen.saveWeather();
  } else if (command.match(/RecallWeather/i)) {
    $gameScreen.recallWeather();
  }
};

//=============================================================================
// Spriteset_Battle
//=============================================================================

Yanfly.WIB.Spriteset_Battle_createLowerLayer =
  Spriteset_Battle.prototype.createLowerLayer;
Spriteset_Battle.prototype.createLowerLayer = function() {
  Yanfly.WIB.Spriteset_Battle_createLowerLayer.call(this);
  this.createWeather();
};

Spriteset_Battle.prototype.createWeather = function() {
  this._weather = new Weather();
  this.addChild(this._weather);
};

Yanfly.WIB.Spriteset_Battle_update = Spriteset_Battle.prototype.update;
Spriteset_Battle.prototype.update = function() {
  Yanfly.WIB.Spriteset_Battle_update.call(this);
  this.updateWeather();
};

Spriteset_Battle.prototype.updateWeather = function() {
  this._weather.type = $gameScreen.weatherType();
  this._weather.power = $gameScreen.weatherPower();
};

//=============================================================================
// YEP_BattleEngineCore Compatibility
//=============================================================================

if (Imported.YEP_BattleEngineCore) {

Yanfly.WIB.BattleManager_procActSeq = BattleManager.processActionSequence;
BattleManager.processActionSequence = function(actionName, actionArgs) {
  if (actionName === 'WEATHER') {
    return this.actionWeather(actionArgs);
  }
  return Yanfly.WIB.BattleManager_procActSeq.call(this, actionName, actionArgs);
};

}; // Imported.YEP_BattleEngineCore

BattleManager.actionWeather = function(actionArgs) {
  var type = actionArgs[0].toLowerCase();
  var power = Number(actionArgs[1]) || 0;
  var duration = (actionArgs[2] === undefined) ? 20 :
    (Number(actionArgs[2]) || 0);
  if (type === 'clear') type = 'none';
  if (type !== 'none') power = power.clamp(1, 9);
  $gameScreen.changeWeather(type, power, duration);
  return false;
};

//=============================================================================
// End of File
//=============================================================================