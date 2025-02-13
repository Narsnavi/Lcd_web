//=============================================================================
// Yanfly Engine Plugins - Map Status Window
// YEP_MapStatusWindow.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_MapStatusWindow = true;

var Yanfly = Yanfly || {};
Yanfly.MapStatus = Yanfly.MapStatus || {};
Yanfly.MapStatus.version = 1.01;

//=============================================================================
 /*:
 * @plugindesc v1.01 地图上显示金币
 * your party's status while on the map screen!
 * @author Yanfly Engine Plugins
 *
 * @param Window X
 * @desc 窗口的X位置。
 * This is a formula.
 * @default Math.floor((Graphics.boxWidth - statusWindow.width) / 2);
 *
 * @param Window Y
 * @desc 窗口的Y位置。
 * This is a formula.
 * @default Graphics.boxHeight - statusWindow.height
 *
 * @help
 * ============================================================================
 * 正式介绍
 * ============================================================================
 *
 * 这个插件让你(作为开发者)通过插件命令打开主地图屏
 * o幕上的队伍状态菜单，就像通常在战斗系统中看到的那
 * 样。它将显示正常战斗状态菜单中的所有内容，
 * 并且可以移动。
 *
 * ============================================================================
 * 注释和状态窗口行为
 * ============================================================================
 *
 * 该插件还可以与按钮公共事件或图片公共事件相结合，
 * 使玩家可以访问一个命令，
 * 该命令可以按需打开状态窗口，
 * 而不必进入主菜单来查看该方当前的表现。
 *
 * 每当一个角色接收到HP、MP、TP、状态或缓冲变
 * 化时，状态菜单会在地图屏幕上自动刷新。
 * 这是为了确保菜单上显示的数据保持更新。
 *
 * 然而，当状态窗口打开时，玩家可以四处移动并与其他事件交互。
 * 但是，在事件打开显示文本消息的情况下，状态窗口将自动关闭。
 * 这是为了防止窗户之间的严重重叠。
 * 每当玩家退出当前地图或进入不同场景的菜单时，
 * 状态菜单窗口也会关闭。
 * in a different scene.
 *
 * ============================================================================
 * 插件命令
 * ============================================================================
 *
 * 有一些插件命令与地图状态窗口相关联，
 * 您可以在这里使用！
 *
 * 插件命令:
 *
 *  OpenMapStatusWindow
 *  - 这将在地图场景中打开地图状态窗口。
 *  它将在打开前自动刷新。
 *
 *  CloseMapStatusWindow
 *  - 这将在地图场景中关闭地图状态窗口。
 *
 *  ToggleMapStatusWindow
 *  - 这将在地图场景中在打开和关闭状态之间切换地图状态窗口。
 *  当它打开时，窗口将被刷新。
 *
 *  RefreshMapStatusWindow
 *  - 您可以使用此命令强制窗口刷新。
 *
 *  SetMapStatusWindowX n
 *  - 这将把地图状态窗口的X位置设置为n。
 *  您可以使用n的公式。该位置将保持不变。
 *
 *  SetMapStatusWindowY n
 *  - 这将把地图状态窗口的Y位置设置为n。
 *  可以为n使用一个公式。该位置将保持不变。
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.01:
 * - Updated for RPG Maker MV version 1.5.0.
 */
//=============================================================================

// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_MapStatusWindow');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.MapStatusWinX = String(Yanfly.Parameters['Window X']);
Yanfly.Param.MapStatusWinY = String(Yanfly.Parameters['Window Y']);

//=============================================================================
// Game_System
//=============================================================================

Yanfly.MapStatus.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
  Yanfly.MapStatus.Game_System_initialize.call(this);
  this.initMapStatusWindowSettings();
};

Game_System.prototype.initMapStatusWindowSettings = function() {
  this._mapStatusWindowX = Yanfly.Param.MapStatusWinX;
  this._mapStatusWindowY = Yanfly.Param.MapStatusWinY;
};

Game_System.prototype.getMapStatusWindowX = function() {
  if (this._mapStatusWindowX === undefined) this.initMapStatusWindowSettings();
  return this._mapStatusWindowX;
};

Game_System.prototype.getMapStatusWindowY = function() {
  if (this._mapStatusWindowY === undefined) this.initMapStatusWindowSettings();
  return this._mapStatusWindowY;
};

Game_System.prototype.setMapStatusWindowX = function(str) {
  if (this._mapStatusWindowX === undefined) this.initMapStatusWindowSettings();
  this._mapStatusWindowX = str;
};

Game_System.prototype.setMapStatusWindowY = function(str) {
  if (this._mapStatusWindowY === undefined) this.initMapStatusWindowSettings();
  this._mapStatusWindowY = str;
};

//=============================================================================
// Game_BattlerBase
//=============================================================================

Game_BattlerBase.prototype.isUpdateMapStatus = function() {
  if (!this.isActor()) return false;
  if (SceneManager._scene instanceof Scene_Map) {
    var scene = SceneManager._scene;
    return scene._statusWindow && scene._statusWindow.isOpen();
  }
  return false;
};

Yanfly.MapStatus.Game_BattlerBase_setHp = Game_BattlerBase.prototype.setHp;
Game_BattlerBase.prototype.setHp = function(hp) {
  Yanfly.MapStatus.Game_BattlerBase_setHp.call(this, hp);
  if (this.isUpdateMapStatus()) SceneManager._scene.refreshMapStatusWindow();
};

Yanfly.MapStatus.Game_BattlerBase_setMp = Game_BattlerBase.prototype.setMp;
Game_BattlerBase.prototype.setMp = function(mp) {
  Yanfly.MapStatus.Game_BattlerBase_setMp.call(this, mp);
  if (this.isUpdateMapStatus()) SceneManager._scene.refreshMapStatusWindow();
};

Yanfly.MapStatus.Game_BattlerBase_setTp = Game_BattlerBase.prototype.setTp;
Game_BattlerBase.prototype.setTp = function(tp) {
  Yanfly.MapStatus.Game_BattlerBase_setTp.call(this, tp);
  if (this.isUpdateMapStatus()) SceneManager._scene.refreshMapStatusWindow();
};

//=============================================================================
// Game_Battler
//=============================================================================

Yanfly.MapStatus.Game_Battler_addState = Game_Battler.prototype.addState;
Game_Battler.prototype.addState = function(stateId) {
  Yanfly.MapStatus.Game_Battler_addState.call(this, stateId);
  if (this.isUpdateMapStatus()) SceneManager._scene.refreshMapStatusWindow();
};

Yanfly.MapStatus.Game_Battler_removeState = Game_Battler.prototype.removeState;
Game_Battler.prototype.removeState = function(stateId) {
  Yanfly.MapStatus.Game_Battler_removeState.call(this, stateId);
  if (this.isUpdateMapStatus()) SceneManager._scene.refreshMapStatusWindow();
};

Yanfly.MapStatus.Game_Battler_addBuff = Game_Battler.prototype.addBuff;
Game_Battler.prototype.addBuff = function(paramId, turns) {
  Yanfly.MapStatus.Game_Battler_addBuff.call(this, paramId, turns);
  if (this.isUpdateMapStatus()) SceneManager._scene.refreshMapStatusWindow();
};

Yanfly.MapStatus.Game_Battler_addDebuff = Game_Battler.prototype.addDebuff;
Game_Battler.prototype.addDebuff = function(paramId, turns) {
  Yanfly.MapStatus.Game_Battler_addDebuff.call(this, paramId, turns);
  if (this.isUpdateMapStatus()) SceneManager._scene.refreshMapStatusWindow();
};

Yanfly.MapStatus.Game_Battler_removeBuff = Game_Battler.prototype.removeBuff;
Game_Battler.prototype.removeBuff = function(paramId) {
  Yanfly.MapStatus.Game_Battler_removeBuff.call(this, paramId);
  if (this.isUpdateMapStatus()) SceneManager._scene.refreshMapStatusWindow();
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.MapStatus.Game_Interpreter_pluginCommand =
  Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.MapStatus.Game_Interpreter_pluginCommand.call(this, command, args);
  if (command === 'OpenMapStatusWindow') {
    if (SceneManager._scene instanceof Scene_Map) {
      SceneManager._scene.openMapStatusWindow();
    }
  } else if (command === 'CloseMapStatusWindow') {
    if (SceneManager._scene instanceof Scene_Map) {
      SceneManager._scene.closeMapStatusWindow();
    }
  } else if (command === 'ToggleMapStatusWindow') {
    if (SceneManager._scene instanceof Scene_Map) {
      SceneManager._scene.toggleMapStatusWindow();
    }
  } else if (command === 'RefreshMapStatusWindow') {
    if (SceneManager._scene instanceof Scene_Map) {
      SceneManager._scene.refreshMapStatusWindow();
    }
  } else if (command === 'SetMapStatusWindowX') {
    if (SceneManager._scene instanceof Scene_Map) {
      var code = this.argsToString(args);
      $gameSystem.setMapStatusWindowX(code);
      SceneManager._scene._statusWindow.x = eval(code);
    }
  } else if (command === 'SetMapStatusWindowY') {
    if (SceneManager._scene instanceof Scene_Map) {
      var code = this.argsToString(args);
      $gameSystem.setMapStatusWindowY(code);
      SceneManager._scene._statusWindow.y = eval(code);
    }
  }
};

Game_Interpreter.prototype.argsToString = function(args) {
  var str = '';
  var length = args.length;
  for (var i = 0; i < length; ++i) {
    str += args[i] + ' ';
  }
  return str.trim();
};

//=============================================================================
// Scene_Map
//=============================================================================

Yanfly.MapStatus.Scene_Map_createAllWindows = 
  Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
  Yanfly.MapStatus.Scene_Map_createAllWindows.call(this);
  this.createMapStatusWindow();
};

Scene_Map.prototype.createMapStatusWindow = function() {
  this._statusWindow = new Window_BattleStatus();
  var statusWindow = this._statusWindow;
  this._needStatusWindowRefresh = false;
  this._statusWindow.x = eval($gameSystem.getMapStatusWindowX());
  this._statusWindow.y = eval($gameSystem.getMapStatusWindowY());
  this.addWindow(this._statusWindow);
};

Scene_Map.prototype.openMapStatusWindow = function() {
  if (!this._statusWindow) this.createMapStatusWindow();
  this._statusWindow.refresh();
  this._statusWindow.open();
};

Scene_Map.prototype.closeMapStatusWindow = function() {
  if (!this._statusWindow) this.createMapStatusWindow();
  this._statusWindow.close();
};

Scene_Map.prototype.toggleMapStatusWindow = function() {
  if (!this._statusWindow) this.createMapStatusWindow();
  if (this._statusWindow.isOpen()) {
    this.closeMapStatusWindow();
  } else {
    this.openMapStatusWindow();
  }
};

Scene_Map.prototype.refreshMapStatusWindow = function() {
  if (!this._statusWindow) this.createMapStatusWindow();
  this._needStatusWindowRefresh = true;
};

Yanfly.MapStatus.Scene_Map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
  Yanfly.MapStatus.Scene_Map_update.call(this);
  if (this._needStatusWindowRefresh && this._statusWindow) {
    this._statusWindow.refresh();
  }
};

Yanfly.MapStatus.Scene_Map_terminate = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function() {
  this._statusWindow.visible = false;
  Yanfly.MapStatus.Scene_Map_terminate.call(this);
};

//=============================================================================
// Window_Message
//=============================================================================

Yanfly.MapStatus.Window_Message_startMessage =
  Window_Message.prototype.startMessage;
Window_Message.prototype.startMessage = function() {
  Yanfly.MapStatus.Window_Message_startMessage.call(this);
  if (SceneManager._scene instanceof Scene_Map) {
    SceneManager._scene.closeMapStatusWindow();
  }
};

Yanfly.MapStatus.Window_Message_terminateMessage =
    Window_Message.prototype.terminateMessage;
Window_Message.prototype.terminateMessage = function() {
  Yanfly.MapStatus.Window_Message_terminateMessage.call(this);
  if (SceneManager._scene instanceof Scene_Map) {
    SceneManager._scene.closeMapStatusWindow();
  }
};

//=============================================================================
// End of File
//=============================================================================