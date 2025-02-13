//=============================================================================
// Yanfly Engine Plugins - Touch Input Disabler
// YEP_TouchInputDisabler.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_TouchInputDisabler = true;

var Yanfly = Yanfly || {};
Yanfly.TID = Yanfly.TID || {};
Yanfly.TID.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc v1.00 禁用鼠标和触摸
 * for our games.
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * 正式介绍
 * ============================================================================
 *
 * 有时候，我们只想禁用游戏的鼠标和触摸控制。
 * 这个小插件可以让你控制鼠标和触摸控制的哪些部分你想禁
 * 用。
 *
 * ============================================================================
 * 指令
 * ============================================================================
 *
 * 与鼠标/触摸输入相关的一切都被默认插件参数禁用。
 * 更改设置以适合您的游戏。
 * 如果设置为on/true, 则该设置的鼠标/触摸输入将被启用。
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
 * @param ---Mouse---
 * @default
 *
 * @param Press Check
 * @type boolean
 * @on YES
 * @off NO
 * @desc 允许触摸输入检查按下。
 * @default false
 *
 * @param Trigger Check
 * @type boolean
 * @on YES
 * @off NO
 * @desc 允许触摸输入检查触发。
 * @default false
 *
 * @param Repeat Check
 * @type boolean
 * @on YES
 * @off NO
 * @desc 允许重复触摸输入检查。
 * @default false
 *
 * @param Long Press Check
 * @type boolean
 * @on YES
 * @off NO
 * @desc 允许长按触摸输入检查。
 * @default false
 *
 * @param Cancel Check
 * @type boolean
 * @on YES
 * @off NO
 * @desc 允许触摸输入检查取消。
 * @default false
 *
 * @param Move Check
 * @type boolean
 * @on YES
 * @off NO
 * @desc 允许触摸输入检查移动。
 * @default false
 *
 * @param Release Check
 * @type boolean
 * @on YES
 * @off NO
 * @desc 允许触摸输入检查释放。
 * @default false
 *
 * @param Wheel Check
 * @type boolean
 * @on YES
 * @off NO
 * @desc 允许滚轮的触摸输入检查。
 * @default false
 *
 * @param Map Move Check
 * @type boolean
 * @on YES
 * @off NO
 * @desc 允许地图移动的触摸输入检查。
 * 如果启用，要求按下和触发检查为true.
 * @default false
 *
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_TouchInputDisabler');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.InputDisabler = {
  Press: eval(String(Yanfly.Parameters['Press Check'])),
  Trigger: eval(String(Yanfly.Parameters['Trigger Check'])),
  Repeat: eval(String(Yanfly.Parameters['Repeat Check'])),
  LongPress: eval(String(Yanfly.Parameters['Long Press Check'])),
  Cancel: eval(String(Yanfly.Parameters['Cancel Check'])),
  Move: eval(String(Yanfly.Parameters['Move Check'])),
  Release: eval(String(Yanfly.Parameters['Release Check'])),
  Wheel: eval(String(Yanfly.Parameters['Wheel Check'])),
  MapMove: eval(String(Yanfly.Parameters['Map Move Check'])),
}

//=============================================================================
// TouchInput
//=============================================================================

Yanfly.TID.TouchInput_isPressed = TouchInput.isPressed;
TouchInput.isPressed = function() {
  if (!Yanfly.Param.InputDisabler.Press) return false;
  return Yanfly.TID.TouchInput_isPressed.call(this);
};

Yanfly.TID.TouchInput_isTriggered = TouchInput.isTriggered;
TouchInput.isTriggered = function() {
  if (!Yanfly.Param.InputDisabler.Trigger) return false;
  return Yanfly.TID.TouchInput_isTriggered.call(this);
};

Yanfly.TID.TouchInput_isRepeated = TouchInput.isRepeated;
TouchInput.isRepeated = function() {
  if (!Yanfly.Param.InputDisabler.Repeat) return false;
  return Yanfly.TID.TouchInput_isRepeated.call(this);
};

Yanfly.TID.TouchInput_isLongPressed = TouchInput.isLongPressed;
TouchInput.isLongPressed = function() {
  if (!Yanfly.Param.InputDisabler.LongPress) return false;
  return Yanfly.TID.TouchInput_isLongPressed.call(this);
};

Yanfly.TID.TouchInput_isCancelled = TouchInput.isCancelled;
TouchInput.isCancelled = function() {
  if (!Yanfly.Param.InputDisabler.Cancel) return false;
  return Yanfly.TID.TouchInput_isCancelled.call(this);
};

Yanfly.TID.TouchInput_isMoved = TouchInput.isMoved;
TouchInput.isMoved = function() {
  if (!Yanfly.Param.InputDisabler.Move) return false;
  return Yanfly.TID.TouchInput_isMoved.call(this);
};

Yanfly.TID.TouchInput_isReleased = TouchInput.isReleased;
TouchInput.isReleased = function() {
  if (!Yanfly.Param.InputDisabler.Release) return false;
  return Yanfly.TID.TouchInput_isReleased.call(this);
};

Object.defineProperty(TouchInput, 'wheelX', {
  get: function() {
    if (!Yanfly.Param.InputDisabler.Wheel) return 0;
    return this._wheelX;
  },
  configurable: true
});

Object.defineProperty(TouchInput, 'wheelY', {
  get: function() {
    if (!Yanfly.Param.InputDisabler.Wheel) return 0;
    return this._wheelY;
  },
  configurable: true
});

//=============================================================================
// Scene_Map
//=============================================================================

Yanfly.TID.Scene_Map_processMapTouch =
  Scene_Map.prototype.processMapTouch;
Scene_Map.prototype.processMapTouch = function() {
  if (!Yanfly.Param.InputDisabler.MapMove) return;
  Yanfly.TID.Scene_Map_processMapTouch.call(this);
};

//=============================================================================
// End of File
//=============================================================================