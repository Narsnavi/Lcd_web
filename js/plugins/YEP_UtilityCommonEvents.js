//=============================================================================
// Yanfly Engine Plugins - Utility Common Events
// YEP_UtilityCommonEvents.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_UtilityCommonEvents = true;

var Yanfly = Yanfly || {};
Yanfly.UCE = Yanfly.UCE || {};
Yanfly.UCE.version = 1.01;

//=============================================================================
 /*:
 * @plugindesc v1.01 实用公共事件
 * such as on loading, after battles, etc.
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @default
 *
 * @param Load Game Event
 * @parent ---General---
 * @type common_event
 * @desc 每次玩家载入游戏时运行这个普通事件。
 * 如果不想运行常见事件，则设置为0。
 * @default 0
 *
 * @param Battle Won Event
 * @parent ---General---
 * @type common_event
 * @desc 每当玩家赢得一场战斗时运行这个普通事件。
 * 如果不想运行常见事件，则设置为0。
 * @default 0
 *
 * @param Escape Battle Event
 * @parent ---General---
 * @type common_event
 * @desc 每当玩家赢得一场战斗时运行这个普通事件。
 * 如果不想运行常见事件，则设置为0。
 * @default 0
 *
 * @param Close Menu Event
 * @parent ---General---
 * @type common_event
 * @desc 每次玩家关闭主菜单时运行这个普通事件。
 * 如果不想运行常见事件，则设置为0
 * @default 0

 * @param ---Vehicles---
 * @default
 *
 * @param Boat Enter Event
 * @parent ---Vehicles---
 * @type common_event
 * @desc 每次玩家上船时，运行这个普通事件。
 * 如果不想运行常见事件，则设置为0。
 * @default 0
 *
 * @param Boat Exit Event
 * @parent ---Vehicles---
 * @type common_event
 * @desc 每次玩家下船时运行这个普通事件。
 * 如果您不想运行常见事件，请设置为0。
 * @default 0
 *
 * @param Ship Enter Event
 * @parent ---Vehicles---
 * @type common_event
 * @desc 每当玩家进入一艘船时运行这个普通事件。
 * 如果您不想运行常见事件，请设置为0。
 * @default 0
 *
 * @param Ship Exit Event
 * @parent ---Vehicles---
 * @type common_event
 * @desc 每次玩家下船时运行这个普通事件。
 * 如果您不想运行常见事件，请设置为0。
 * @default 0
 *
 * @param Airship Enter Event
 * @parent ---Vehicles---
 * @type common_event
 * @desc 每次玩家进入飞船都运行这个普通事件。
 * 如果您不想运行常见事件，请设置为0。
 * @default 0
 *
 * @param Airship Exit Event
 * @parent ---Vehicles---
 * @type common_event
 * @desc 每次玩家退出飞船时运行这个普通事件。
 * 如果您不想运行常见事件，请设置为0。
 * @default 0
 *
 * @help
 * ============================================================================
 * 正式介绍
 * ============================================================================
 *
 * 有时，我们希望对我们的RPG Maker项目的某些方面发
 * 生的事情有更多的控制。本可以通过常见事件轻松完成
 * 的事情变得更加困难，因为没有合适的触发器来激活这
 * 些常见事件。这个插件可以在加载游戏、
 * 赢得战斗、逃离战斗等过程中触发某些事件。
 * ...
 *
 * ============================================================================
 * 指令
 * ============================================================================
 *
 * 更改您希望绑定到公共事件的每个触发器的插件参数，
 * 以反映该公共事件的ID。
 * 下面是触发器以及一些如何使用它们的示例:
 *
 * - Load Game -
 * 每当游戏加载时都会发生。
 * 这可以用于故事重述、调整游戏计时器或检查更新。
 *
 * - Battle Won -
 * 每当战斗胜利，玩家返回地图时，将会继续。
 * 可用于战斗后更新某些变量或统计数据等。
 *
 * - Escape Battle -
 * 像以前一样，但是当玩家逃离战斗时就会发生。
 * 这可以用于一些事情，
 * 比如玩家必须执行秘密任务或其他什么，
 * 逃跑可以把他们带回到某个地方。
 *
 * - Close Menu -
 * 当玩家退出主菜单并返回地图场景时发生。
 * 可用于重新校准设备、进行检查、定制事件等。
 *
 * - Vehicle Enter -
 * - Vehicle Exit -
 * 这些事件将在玩家进入/离开特定载具时发生。
 * 可用于在特定车辆中启用/禁用某些抬头显示器，
 * 以提供更身临其境的感觉。
 *
 * ============================================================================
 * Changelog
 * ============================================================================
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

Yanfly.Parameters = PluginManager.parameters('YEP_UtilityCommonEvents');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.UtilCommonEvents = {
  load: Number(Yanfly.Parameters['Load Game Event']) || 0,
  battleWon: Number(Yanfly.Parameters['Battle Won Event']) || 0,
  battleEscape: Number(Yanfly.Parameters['Battle Escape Event']) || 0,
  closeMenu: Number(Yanfly.Parameters['Close Menu Event']) || 0,

  boatEnter: Number(Yanfly.Parameters['Boat Enter Event']) || 0,
  boatExit: Number(Yanfly.Parameters['Boat Exit Event']) || 0,
  shipEnter: Number(Yanfly.Parameters['Ship Enter Event']) || 0,
  shipExit: Number(Yanfly.Parameters['Ship Exit Event']) || 0,
  airshipEnter: Number(Yanfly.Parameters['Airship Enter Event']) || 0,
  airshipExit: Number(Yanfly.Parameters['Airship Exit Event']) || 0,
};

//=============================================================================
// DataManager
//=============================================================================

Yanfly.UCE.DataManager_loadGame = DataManager.loadGame;
DataManager.loadGame = function(savefileId) {
  var flag = Yanfly.UCE.DataManager_loadGame.call(this, savefileId);
  if (flag && Yanfly.Param.UtilCommonEvents['load'] > 0) {
    $gameTemp.reserveCommonEvent(Yanfly.Param.UtilCommonEvents['load']);
  }
  return flag;
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.UCE.Game_System_onBattleWin = Game_System.prototype.onBattleWin;
Game_System.prototype.onBattleWin = function() {
  Yanfly.UCE.Game_System_onBattleWin.call(this);
  if (Yanfly.Param.UtilCommonEvents['battleWon'] > 0) {
    $gameTemp.reserveCommonEvent(Yanfly.Param.UtilCommonEvents['battleWon']);
  }
};

Yanfly.UCE.Game_System_onBattleEscape = Game_System.prototype.onBattleEscape;
Game_System.prototype.onBattleEscape = function() {
  Yanfly.UCE.Game_System_onBattleEscape.call(this);
  if (Yanfly.Param.UtilCommonEvents['battleEscape'] > 0) {
    $gameTemp.reserveCommonEvent(Yanfly.Param.UtilCommonEvents['battleEscape']);
  }
};

//=============================================================================
// Game_Player
//=============================================================================

Yanfly.UCE.Game_Player_getOnVehicle = Game_Player.prototype.getOnVehicle;
Game_Player.prototype.getOnVehicle = function() {
  var success = Yanfly.UCE.Game_Player_getOnVehicle.call(this);
  if (success) {
    var events = Yanfly.Param.UtilCommonEvents;
    if (this._vehicleType === 'airship' && events.airshipEnter > 0) {
      $gameTemp.reserveCommonEvent(events.airshipEnter);
    } else if (this._vehicleType === 'ship' && events.shipEnter > 0) {
      $gameTemp.reserveCommonEvent(events.shipEnter);
    } else if (this._vehicleType === 'boat' && events.boatEnter > 0) {
      $gameTemp.reserveCommonEvent(events.boatEnter);
    }
  }
  return success;
};

Yanfly.UCE.Game_Player_getOffVehicle = Game_Player.prototype.getOffVehicle;
Game_Player.prototype.getOffVehicle = function() {
  var success = Yanfly.UCE.Game_Player_getOffVehicle.call(this);
  if (success) {
    var events = Yanfly.Param.UtilCommonEvents;
    if (this._vehicleType === 'airship' && events.airshipExit > 0) {
      $gameTemp.reserveCommonEvent(events.airshipExit);
    } else if (this._vehicleType === 'ship' && events.shipExit > 0) {
      $gameTemp.reserveCommonEvent(events.shipExit);
    } else if (this._vehicleType === 'boat' && events.boatExit > 0) {
      $gameTemp.reserveCommonEvent(events.boatExit);
    }
  }
  return success;
};

//=============================================================================
// Scene_Menu
//=============================================================================

Yanfly.UCE.Scene_Menu_createCommandWindow =
  Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
  Yanfly.UCE.Scene_Menu_createCommandWindow.call(this);
  this._commandWindow.setHandler('cancel', this.closeMainMenu.bind(this));
};

Scene_Menu.prototype.closeMainMenu = function() {
  this.popScene();
  if (Yanfly.Param.UtilCommonEvents['closeMenu'] > 0) {
    $gameTemp.reserveCommonEvent(Yanfly.Param.UtilCommonEvents['closeMenu']);
  }
};

//=============================================================================
// End of File
//=============================================================================