//=============================================================================
// Yanfly Engine Plugins - Move Route Extension - Extended Move Pack 1
// YEP_X_ExtMovePack1.js
//=============================================================================

if (Imported.YEP_MoveRouteCore) {

var Imported = Imported || {};
Imported.YEP_X_ExtMovePack1 = true;

var Yanfly = Yanfly || {};
Yanfly.EMvP1 = Yanfly.EMvP1 || {};
Yanfly.EMvP1.version = 1.01;

//=============================================================================
 /*:
 * @plugindesc v1.01 移动路径拓展包(需要 YEP_MoveRouteCore.js)
 * options to create specific behaviors in movement patterns.
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * 正式介绍
 * ============================================================================
 *
 * 这个插件需要YEP_MoveRouteCore。确保该插件位于
 * 插件列表中的YEP _ MoveRouteCore下。
 *
 * 这个插件为你的事件添加了额外的简化移动路线，
 * 主要目的是在移动模式中创建特定的行为。
 * 这些模式包括拥抱墙的一侧并沿着墙移动的选项、
 * 向一个方向移动直到停止、
 * 相对不透明度调整和索引移动。
 *
 * ============================================================================
 * 说明-附加的简化移动路线
 * ============================================================================
 *
 * 如果您想使用该插件的命令使事件以某种方式移动，
 * 请执行以下操作:
 * 
 * 1. 打开要移动的事件.
 * 2. 创建移动路线命令或自动自定义路线。
 * 3. 按 "Script..."
 * 4. 键入以下任意所需命令:
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * HUG LEFT WALL
 * HUG RIGHT WALL
 *
 * AVOID HUG LEFT WALL
 * AVOID HUG RIGHT WALL
 *
 * CRASH HUG LEFT WALL
 * CRASH HUG RIGHT WALL
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * 指定的活动将沿着墙向左/向右移动。
 * 如果它的左/右侧没有墙，它会转向那个方向，
 * 并在可能的情况下向那个方向移动。
 *
 * 'Avoid Hug Left Wall'和'Avoid Hug Right Wall'将使事件不会与玩家角
 * 色和玩家的追随者发生冲突。
 *
 * 'Crash Hug Left Wall'和'Crash Hug Right Wall'将允许与玩家和/或跟
 * 随者碰撞。
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * 例子: Hug Left Wall
 *          Hug Right Wall
 *          Avoid Hug Left Wall
 *          Avoid Hug Right Wall
 *          Crash Hug Left Wall
 *          Crash Hug Right Wall
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * INDEX: x
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * 将指定事件的当前字符图形索引设置为x，
 * 无需更改其字符图形。
 * 用介于0和7之间的整数值替换x。
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * 例子: Index: 5
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * INDEX: +x
 * INDEX: -x
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * 将指定事件的当前字符图形索引调整+x或-x，
 * 而不需要更改其字符图形来将其移动几个阶段。
 * 指数不能低于0，也不能超过7。
 * 用介于0和7之间的整数值替换x。
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * 例子: Index: +1
 *          Index: -2
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * MOVE UP UNTIL STOP
 * MOVE LEFT UNTIL STOP
 * MOVE RIGHT UNTIL STOP
 * MOVE DOWN UNTIL STOP
 * MOVE UPPER LEFT UNTIL STOP
 * MOVE UPPER RIGHT UNTIL STOP
 * MOVE LOWER LEFT UNTIL STOP
 * MOVE LOWER RIGHT UNTIL STOP
 *
 * AVOID MOVE UP UNTIL STOP
 * AVOID MOVE LEFT UNTIL STOP
 * AVOID MOVE RIGHT UNTIL STOP
 * AVOID MOVE DOWN UNTIL STOP
 * AVOID MOVE UPPER LEFT UNTIL STOP
 * AVOID MOVE UPPER RIGHT UNTIL STOP
 * AVOID MOVE LOWER LEFT UNTIL STOP
 * AVOID MOVE LOWER RIGHT UNTIL STOP
 *
 * CRASH MOVE UP UNTIL STOP
 * CRASH MOVE LEFT UNTIL STOP
 * CRASH MOVE RIGHT UNTIL STOP
 * CRASH MOVE DOWN UNTIL STOP
 * CRASH MOVE UPPER LEFT UNTIL STOP
 * CRASH MOVE UPPER RIGHT UNTIL STOP
 * CRASH MOVE LOWER LEFT UNTIL STOP
 * CRASH MOVE LOWER RIGHT UNTIL STOP
 *
 * MOVE FORWARD UNTIL STOP
 * AVOID MOVE FORWARD UNTIL STOP
 * CRASH MOVE FORWARD UNTIL STOP
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * 指定的事件将继续朝指定的方向移动，直到它不能再朝
 * 那个方向通过。一旦发生这种情况，它将移动到移动路
 * 径列表中的下一个移动命令。
 *
 * 此命令的'Avoid'版本将使事件不会与玩家角色和玩家的
 * 追随者发生冲突。
 *
 * 这个命令的'Crash'版本将允许与玩家和/或跟随者碰撞。
 * ...
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * 例子: Move Right Until Stop
 *          Avoid Move Left Until Stop
 *          Crash Move Forward Until Stop
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * OPACITY: +x
 * OPACITY: -x
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * 将指定事件的不透明度值调整+x或-x，
 * 而不是像编辑器的不透明度命令那样的设定值。
 * 不透明度值将在当前不透明度值的基础上增加或减少。
 * 用整数值替换x。
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * 例子: Opacity: +50
 *          Opacity: -30
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * OPACITY: +x%
 * OPACITY: -x%
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * 将指定事件的不透明度值调整+x%或-x%，
 * 而不是像编辑器的不透明度命令那样的设定值。
 * 不透明度值将在当前不透明度值的基础上增加或减少。
 * 用整数值替换x。
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * 例子: Opacity: +10%
 *          Opacity: -20%
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * OPACITY: x%
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * 将指定事件的不透明度值设置为x%，
 * 而不是像编辑器的不透明度命令那样的设置值。
 * 不透明度值将自动调整以满足精灵的需求。
 * 用整数值替换x。
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * 例子: Opacity: 50%
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
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
// Game_Character
//=============================================================================

Yanfly.EMvP1.Game_Character_processMoveRouteScriptCall =
  Game_Character.prototype.processMoveRouteScriptCall;
Game_Character.prototype.processMoveRouteScriptCall = function(line) {
  // EXTENDED MOVE PACK 1 ADDITIONS
  if (line === 'EXTENDED MOVE PACK 1') {
    return;
  // HUG LEFT WALL
  } else if (line.match(/(?:HUG LEFT|HUG LEFT WALL)/i)) {
    var collision = this.checkCollisionKeywords(line);
    this.processMoveHugWall('left', collision);
  // HUG RIGHT WALL
  } else if (line.match(/(?:HUG RIGHT|HUG RIGHT WALL)/i)) {
    var collision = this.checkCollisionKeywords(line);
    this.processMoveHugWall('right', collision);
  // INDEX: X
  } else if (line.match(/INDEX:[ ](\d+)/i)) {
    var value = parseInt(RegExp.$1);
    this.processIndexSet(value);
  // INDEX: +/-X
  } else if (line.match(/INDEX:[ ]([\+\-]\d+)/i)) {
    var value = parseInt(RegExp.$1);
    this.processIndexAdjust(value);
  // MOVE UNTIL WALL
  } else if (line.match(/MOVE[ ](.*)[ ](?:UNTIL WALL|UNTIL STOP)/i)) {
    var text = String(RegExp.$1);
    var collision = this.checkCollisionKeywords(line);
    this.processMoveUntilStop(text, collision);
  // OPACITY: /-X%
  } else if (line.match(/OPACITY:[ ](\d+)([%％])/i)) {
    var rate = parseInt(RegExp.$1) * 0.01;
    var value = Math.round(255 * rate);
    this.processOpacitySet(value);
  // OPACITY: +/-X%
  } else if (line.match(/OPACITY:[ ]([\+\-]\d+)([%％])/i)) {
    var rate = parseInt(RegExp.$1) * 0.01;
    var value = Math.round(255 * rate);
    this.processOpacityAdjust(value);
  // OPACITY: +/-X
  } else if (line.match(/OPACITY:[ ]([\+\-]\d+)/i)) {
    var value = parseInt(RegExp.$1);
    this.processOpacityAdjust(value);
  // ELSE
  } else {
    Yanfly.EMvP1.Game_Character_processMoveRouteScriptCall.call(this, line);
  }
};

Game_Character.prototype.processMoveHugWall = function(wall, collision) {
  collision = collision || false;
  var left = {}
  left[1] = 3;
  left[2] = 6;
  left[3] = 9;
  left[4] = 2;
  left[6] = 8;
  left[7] = 1;
  left[8] = 4;
  left[9] = 7;
  var right = {};
  right[1] = 7;
  right[2] = 4;
  right[3] = 1;
  right[4] = 8;
  right[6] = 2;
  right[7] = 9;
  right[8] = 6;
  right[9] = 3;
  if (wall === 'left') {
    var mainDir = left[this.direction()];
    var oppositeDir = right[this.direction()];
  } else if (wall === 'right') {
    var mainDir = right[this.direction()];
    var oppositeDir = left[this.direction()];
  } else {
    return;
  }
  if (collision) $gameTemp._moveAllowPlayerCollision = true;
  if (this.canPass(this.x, this.y, mainDir)) {
    if (wall === 'left') {
      this.turnLeft90();
    } else {
      this.turnRight90();
    }
  } else if (!this.canPass(this.x, this.y, this.direction())) {
    if (this.canPass(this.x, this.y, oppositeDir)) {
      if (wall === 'left') {
        this.turnRight90();
      } else {
        this.turnLeft90();
      }
    } else {
      this.turn180();
    }
  }
  if (this.canPass(this.x, this.y, this.direction())) {
    $gameTemp._moveAllowPlayerCollision = false;
    this.moveForward();
  }
  $gameTemp._moveAllowPlayerCollision = false;
};

Game_Character.prototype.processMoveUntilStop = function(line, collision) {
  var direction = 0;
  if (line.match(/UPPER RIGHT/i)) {
    direction = 9;
  } else if (line.match(/UPPER LEFT/i)) {
    direction = 7;
  } else if (line.match(/LOWER RIGHT/i)) {
    direction = 4;
  } else if (line.match(/LOWER LEFT/i)) {
    direction = 1;
  } else if (line.match(/UP/i)) {
    direction = 8;
  } else if (line.match(/RIGHT/i)) {
    direction = 6;
  } else if (line.match(/LEFT/i)) {
    direction = 4;
  } else if (line.match(/DOWN/i)) {
    direction = 2;
  } else if (line.match(/FORWARD/i)) {
    direction = this.direction();
  } else {
    return;
  }
  if (collision) $gameTemp._moveAllowPlayerCollision = true;
  if (this.canPass(this.x, this.y, direction)) {
    $gameTemp._moveAllowPlayerCollision = false;
    this.moveStraight(direction);
    this._moveRouteIndex -= 1;
  }
  $gameTemp._moveAllowPlayerCollision = false;
};

Game_Character.prototype.processOpacitySet = function(value) {
  this._opacity = Math.round(value);
  this._opacity = this._opacity.clamp(0, 255);
};

Game_Character.prototype.processOpacityAdjust = function(value) {
  this._opacity += Math.round(value);
  this._opacity = this._opacity.clamp(0, 255);
};

Game_Character.prototype.processIndexSet = function(value) {
  if (ImageManager.isBigCharacter(this._characterName)) return;
  var charName = this._characterName;
  value = value.clamp(0, 7);
  this.setImage(charName, value);
};

Game_Character.prototype.processIndexAdjust = function(value) {
  if (ImageManager.isBigCharacter(this._characterName)) return;
  var charName = this._characterName;
  value = this._characterIndex + value;
  value = value.clamp(0, 7);
  this.setImage(charName, value);
};

//=============================================================================
// End of File
//=============================================================================
} else {

var text = '================================================================\n';
text += 'YEP_X_ExtMovePack1 requires YEP_MoveRouteCore to be at the ';
text += 'latest version to run properly.\n\nPlease go to www.yanfly.moe and ';
text += 'update to the latest version for the YEP_MoveRouteCore plugin.\n';
text += '================================================================\n';
console.log(text);
require('nw.gui').Window.get().showDevTools();

} // Imported.YEP_MoveRouteCore