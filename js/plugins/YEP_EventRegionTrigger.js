//=============================================================================
// Yanfly Engine Plugins - Event Region Trigger
// YEP_EventRegionTrigger.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_EventRegionTrigger = true;

var Yanfly = Yanfly || {};
Yanfly.EvReTr = Yanfly.EvReTr || {};
Yanfly.EvReTr.version = 1.02;

//=============================================================================
 /*:
 * @plugindesc v1.02 事件区域触发器
 * instead of needing to exactly next to or on top of them.
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * 正式介绍
 * ============================================================================
 *
 * 在RPG Maker MV中，事件只能在你要么站在旁边时触发
 * 对他们或在它们上面时触发。这个插件允许你绑定他们的激活
 * 不同的事件到不同的区域，使玩家站在指定区域时触发
 * 在通过“行动”与他们交谈之前，先在指定的区域
 * 确定、玩家接触、事件接触、自动执行和/或平行执行给予它们
 * 触发事件的多种方式。所有这些都可以通过简单的
 * 向事件页面添加注释标签.
 *
 * 这不同于区域事件，区域事件会导致公共事件自动执行
 * 一旦玩家踏上其中一个区域。此插件绑定
 * 实际将事件映射到区域.
 *
 * ============================================================================
 * Comment Tags
 * ============================================================================
 *
 * 默认情况下，事件页面没有区域触发器。必须添加它们
 * 使用注释标签手动按事件页面。您可以使用以下内容
 * 给每个事件页面一个区域触发器的注释标签.
 *
 * ---
 *
 * Comment Tags:
 *
 *   <Region Trigger: x>
 *   <Region Triggers: x, x, x>
 *   - 将“x”替换为您希望让活动进行的地区的ID
 *   如果玩家站在具有该区域ID的区块，则触发
 *   事件页面的激活触发要求.
 *
 * ---
 *
  * 事件区域触发器的行为因事件页面而异
 * 触发器类型。以下是事件页面将如何基于触发器激活:
 *
 *   Action Button
 *   - 只要玩家在匹配的区域ID内，按
 *   “确定”按钮将激活该事件.
 *
 *   Player Touch
 *   - 如果玩家在匹配的区域标识内移动，事件将
 *   自动激活。玩家也可以按下确定按钮来触发
 *   事件.
 *
 *   Event Touch
 *   - 如果玩家在匹配的区域ID内移动，事件将
 *   自动激活。玩家也可以按下确定按钮来触发
 *   事件.
 *
 *   Autorun
 *   - 如果玩家在匹配的区域ID内移动，事件将
 *   自动激活。除非你有，否则无法逃避这个自动执行
 *   关掉它的方法.
 *
 *   Parallel
 *   - 如果玩家在匹配的区域标识内移动，事件将
 *   自动激活。被给予几帧移动
 *   每次并行执行都需要等待几帧.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.02:
 * - Fixed a bug where parallels don't loop.
 *
 * Version 1.01:
 * - Fixed a bug where Autorun and Parallel triggers won't run unless they had
 * a region associated with them.
 *
 * Version 1.00:
 * - Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 */
//=============================================================================

//=============================================================================
// Game_CharacterBase
//=============================================================================

Yanfly.EvReTr.Game_CharacterBase_increaseSteps =
  Game_CharacterBase.prototype.increaseSteps;
Game_CharacterBase.prototype.increaseSteps = function() {
  Yanfly.EvReTr.Game_CharacterBase_increaseSteps.call(this);
  this.eventProximityIncreaseSteps();
};

Game_CharacterBase.prototype.eventProximityIncreaseSteps = function() {
};

//=============================================================================
// Game_Player
//=============================================================================

Yanfly.EvReTr.Game_Player_startMapEvent = Game_Player.prototype.startMapEvent;
Game_Player.prototype.startMapEvent = function(x, y, triggers, normal) {
  Yanfly.EvReTr.Game_Player_startMapEvent.call(this, x, y, triggers, normal);
  if (!$gameMap.isEventRunning() && !$gameMap.isAnyEventStarting()) {
    this.startEventRegionTrigger(triggers, normal);
  }
};

Game_Player.prototype.startEventRegionTrigger = function(triggers, normal) {
  var events = $gameMap.events();
  var length = events.length;
  for (var i = 0; i < length; ++i) {
    var ev = events[i];
    if (!ev) continue;
    if (!ev.isTriggerIn(triggers)) continue;
    if (!ev._regionTriggerList) continue;
    if (ev._regionTriggerList.length <= 0) continue;
    if (this.meetPlayerRegionTriggerConditions(ev)) ev.start();
  }
};

Game_Player.prototype.meetPlayerRegionTriggerConditions = function(ev) {
  var regionId = this.regionId();
  return ev._regionTriggerList && ev._regionTriggerList.contains(regionId);
};

//=============================================================================
// Game_Event
//=============================================================================

Yanfly.EvReTr.Game_Event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
  this._initialAutoRegionTriggerBypass = true;
  Yanfly.EvReTr.Game_Event_setupPage.call(this);
  this._initialAutoRegionTriggerBypass = false;
  this.setupEventRegionTriggerSettings();
};

Game_Event.prototype.setupEventRegionTriggerSettings = function() {
  this.initEventRegionTriggerSettings();
  this.setupEventRegionTriggerCommentTags();
};

Game_Event.prototype.initEventRegionTriggerSettings = function() {
  this._regionTriggerList = [];
};

Game_Event.prototype.setupEventRegionTriggerCommentTags = function() {
  if (!this.page()) return;
  var note1 = /<REGION (?:TRIGGER|TRIGGERS):[ ](\d+)>/i;
  var note2 = /<REGION (?:TRIGGER|TRIGGERS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var list = this.list();
  var length = list.length;
  for (var i = 0; i < length; ++i) {
    var ev = list[i];
    if ([108, 408].contains(ev.code)) {
      if (ev.parameters[0].match(note1)) {
        this._regionTriggerList.push(parseInt(RegExp.$1));
      } else if (ev.parameters[0].match(note2)) {
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        this._regionTriggerList = this._regionTriggerList.concat(array);
      }
    }
  }
};

Game_Event.prototype.eventProximityIncreaseSteps = function() {
  if (!$gameMap.isEventRunning() && !$gameMap.isAnyEventStarting()) {
    $gamePlayer.startEventRegionTrigger([2], this.isNormalPriority());
  }
};

Yanfly.EvReTr.Game_Event_checkEventTriggerAuto =
  Game_Event.prototype.checkEventTriggerAuto;
Game_Event.prototype.checkEventTriggerAuto = function() {
  if (this._trigger !== 3) return;
  if (this._initialAutoRegionTriggerBypass) return;
  if (!this.meetEventRegionTriggerConditions(false)) return;
  Yanfly.EvReTr.Game_Event_checkEventTriggerAuto.call(this);
};

Yanfly.EvReTr.Game_Event_updateParallel = Game_Event.prototype.updateParallel;
Game_Event.prototype.updateParallel = function() {
  if (!this._interpreter) return;
  if (!this.meetEventRegionTriggerConditions(true)) return;
  Yanfly.EvReTr.Game_Event_updateParallel.call(this);
};

Game_Event.prototype.meetEventRegionTriggerConditions = function(parallel) {
  if (!parallel && $gameMap.isEventRunning()) return false;
  if (!parallel && $gameMap.isAnyEventStarting()) return false;
  if (!this._regionTriggerList) return true;
  if (this._regionTriggerList.length <= 0) return true;
  return $gamePlayer.meetPlayerRegionTriggerConditions(this);
};

//=============================================================================
// End of File
//=============================================================================