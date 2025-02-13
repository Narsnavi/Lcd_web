//=============================================================================
// Yanfly Engine Plugins - Event Proximity Activate
// YEP_EventProxActivate.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_EventProxActivate = true;

var Yanfly = Yanfly || {};
Yanfly.EvPrAc = Yanfly.EvPrAc || {};
Yanfly.EvPrAc.version = 1.01;

//=============================================================================
 /*:
 * @plugindesc v1.01 事件触发范围
 * instead of needing to be exactly next to or on top of them.
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * 正式介绍
 * ============================================================================
 *
 * 在RPG Maker MV中，事件只能站在旁边时激活
 * 对他们或在他们之上。没有可以从远处
 * 激活一些事件的方法。这个插件给你多个
 * 通过事件周围的方形区域激活某些事件的方法，
 * 事件周围的区域、半径、以行为中心或以列为中心。这些新的
 * 激活范围可以与事件的触发相结合:通过
 * 确定按钮、玩家接触、事件接触、自动执行和并行执行
 * 激活事件的多种方式。这些都可以通过简单的
 * 将注释标签添加到事件页面.
 *
 * ============================================================================
 * Comment Tags
 * ============================================================================
 *
 * 默认情况下，每个事件页面都没有范围特征。他们必须是
 * 使用注释标签为每个事件页面手动添加。您可以使用以下内容
 * 给每个事件页面一个范围激活范围的注释标签.
 *
 * ---
 *
 * Comment Tags:
 *
 *   <Activation Square: x>
 *   - 以方形区域的形式在事件周围创建激活范围,
 *   事件左侧、右侧、上方和下方的x个图块。这使得
 *   激活范围看起来像一个正方形.
 *
 *   <Activation Radius: x>
 *   - 围绕事件创建一个激活范围，要求玩家
 *   在事件的x块内(x和y位置的差异)。想到
 *   这更像钻石.
 *
 *   <Activation Row: x>
 *   - 从事件开始水平创建激活范围。这
 *   行的水平范围是整个地图，但垂直范围是x个图块
 *   活动的上方和下方。如果x是0，那么玩家必须恰好在
 *   与事件相同的垂直图块上.
 *
 *   <Activation Column: x>
 *   - 创建从事件开始垂直跨越的激活范围。这
 *   行的垂直范围是整个地图，但水平范围是x个图块
 *   事件的左侧和右侧。如果x是0，那么玩家必须完全打开
 *   与事件相同的水平方块上.
 *
 * ---
 *
 * 根据事件页面的不同，事件范围激活的行为也不同，
 * 这取决于事件页的触发器类型。以下是事件页面将如何基于触发器激活的方式:
 *
 *   Action Button
 *   - 只要玩家在事件的触发范围内，按
 *   “确定”按钮将激活该事件.
 *
 *   Player Touch
 *   - 如果玩家在事件的触发范围内移动，事件将
 *   自动激活。如果事件进入范围，则不会发生这种情况
 *   然而，玩家。玩家也可以按下确定按钮来触发
 *   事件.
 *
 *   Event Touch
 *   - 如果玩家在事件的触发范围内移动，反之亦然,
 *   该事件将自动激活。玩家也可以按确定
 *   触发事件的按钮.
 *
 *   Autorun
 *   - 如果玩家在事件的触发范围内移动，反之亦然,
 *   该事件将自动激活。这种自动执行是无法逃避的
 *   除非你有办法关掉它.
 *
 *   Parallel
 *   - 如果玩家在事件的触发范围内移动，反之亦然,
 *   该事件将自动激活。被授予几帧
 *   每次并行执行，都会按帧处理.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.01:
 * - Fixed a bug where parallel events don't loop.
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

Yanfly.EvPrAc.Game_CharacterBase_increaseSteps =
  Game_CharacterBase.prototype.increaseSteps;
Game_CharacterBase.prototype.increaseSteps = function() {
  Yanfly.EvPrAc.Game_CharacterBase_increaseSteps.call(this);
  this.eventProximityIncreaseSteps();
};

Game_CharacterBase.prototype.eventProximityIncreaseSteps = function() {
};

//=============================================================================
// Game_Player
//=============================================================================

Yanfly.EvPrAc.Game_Player_startMapEvent = Game_Player.prototype.startMapEvent;
Game_Player.prototype.startMapEvent = function(x, y, triggers, normal) {
  Yanfly.EvPrAc.Game_Player_startMapEvent.call(this, x, y, triggers, normal);
  if (!$gameMap.isEventRunning() && !$gameMap.isAnyEventStarting()) {
    this.startProximityEvent(triggers, normal);
  }
};

Game_Player.prototype.startProximityEvent = function(triggers, normal) {
  var events = $gameMap.events();
  var length = events.length;
  for (var i = 0; i < length; ++i) {
    var ev = events[i];
    if (!ev) continue;
    if (!ev.isTriggerIn(triggers)) continue;
    if (!ev._activationType || ev._activationType === 'none') continue;
    if (this.meetPlayerProximityConditions(ev)) ev.start();
  }
};

Game_Player.prototype.meetPlayerProximityConditions = function(ev) {
  if (ev._activationType === 'radius') {
    var x1 = this.x;
    var y1 = this.y;
    var x2 = ev.x;
    var y2 = ev.y;
    var radius = $gameMap.distance(x1, y1, x2, y2);
    return ev._activationDist >= radius
  } else if (ev._activationType === 'square') {
    return ev._activationDist >= Math.abs(ev.deltaXFrom(this.x)) &&
           ev._activationDist >= Math.abs(ev.deltaYFrom(this.y));
  } else if (ev._activationType === 'row') {
    return ev._activationDist >= Math.abs(ev.deltaYFrom(this.y));
  } else if (ev._activationType === 'column') {
    return ev._activationDist >= Math.abs(ev.deltaXFrom(this.x));
  } else {
    return false;
  }
};

//=============================================================================
// Game_Event
//=============================================================================

Yanfly.EvPrAc.Game_Event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
  this._initialAutoTriggerBypass = true;
  Yanfly.EvPrAc.Game_Event_setupPage.call(this);
  this._initialAutoTriggerBypass = false;
  this.setupEventProximitySettings();
};

Game_Event.prototype.setupEventProximitySettings = function() {
  this.initEventProximitySettings();
  this.setupEventProximityCommentTags();
};

Game_Event.prototype.initEventProximitySettings = function() {
  this._activationDist = 0;
  this._activationType = 'none';
};

Game_Event.prototype.setupEventProximityCommentTags = function() {
  if (!this.page()) return;
  var note1 = /<ACTIVATION SQUARE: (\d+)>/i;
  var note2 = /<ACTIVATION (?:RADIUS|PROXIMITY): (\d+)>/i;
  var note3 = /<ACTIVATION (?:ROW|X|HORIZONTAL): (\d+)>/i;
  var note4 = /<ACTIVATION (?:COLUMN|Y|VERTICAL): (\d+)>/i;
  var list = this.list();
  var length = list.length;
  for (var i = 0; i < length; ++i) {
    var ev = list[i];
    if ([108, 408].contains(ev.code)) {
      if (ev.parameters[0].match(note1)) {
        this._activationDist = parseInt(RegExp.$1);
        this._activationType = 'square';
      } else if (ev.parameters[0].match(note2)) {
        this._activationDist = parseInt(RegExp.$1);
        this._activationType = 'radius';
      } else if (ev.parameters[0].match(note3)) {
        this._activationDist = parseInt(RegExp.$1);
        this._activationType = 'row';
      } else if (ev.parameters[0].match(note4)) {
        this._activationDist = parseInt(RegExp.$1);
        this._activationType = 'column';
      }
    }
  }
};

Game_Event.prototype.eventProximityIncreaseSteps = function() {
  if (!$gameMap.isEventRunning() && !$gameMap.isAnyEventStarting()) {
    $gamePlayer.startProximityEvent([2], this.isNormalPriority());
  }
};

Yanfly.EvPrAc.Game_Event_checkEventTriggerAuto =
  Game_Event.prototype.checkEventTriggerAuto;
Game_Event.prototype.checkEventTriggerAuto = function() {
  if (this._trigger !== 3) return;
  if (this._initialAutoTriggerBypass) return;
  if (!this.meetEventProximityConditions(false)) return;
  Yanfly.EvPrAc.Game_Event_checkEventTriggerAuto.call(this);
};

Yanfly.EvPrAc.Game_Event_updateParallel = Game_Event.prototype.updateParallel;
Game_Event.prototype.updateParallel = function() {
  if (!this._interpreter) return;
  if (!this.meetEventProximityConditions(true)) return;
  Yanfly.EvPrAc.Game_Event_updateParallel.call(this);
};

Game_Event.prototype.meetEventProximityConditions = function(parallel) {
  if (!parallel && $gameMap.isEventRunning()) return false;
  if (!parallel && $gameMap.isAnyEventStarting()) return false;
  if (!this._activationType || this._activationType === 'none') return true;
  return $gamePlayer.meetPlayerProximityConditions(this);
};

//=============================================================================
// End of File
//=============================================================================