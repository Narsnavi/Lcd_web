//=============================================================================
// Yanfly Engine Plugins - Event Timer Control
// YEP_EventTimerControl.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_EventTimerControl = true;

var Yanfly = Yanfly || {};
Yanfly.Timer = Yanfly.Timer || {};
Yanfly.Timer.version = 1.01;

//=============================================================================
 /*:
 * @plugindesc v1.01 事件计时器
 * for your game.
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * 正式介绍
 * ============================================================================
 *
 * 事件计时器通常用于倒计时。然而，有时候你
 * 希望对它有更多的控制，例如能够暂停
 * 重启计时器，增加或减少秒数、分钟数，甚至
 * 计时器上的小时。不想要倒计时器？为什么不算呢
 * 而是向上？经验丰富的疯狂模式程序员将能够添加
 * 他们自己的插件命令！
 *
 * 特点:
 * - 能够自定义计时器显示效果
 * - 计时器现在能够显示小时数
 * - 定时器的暂停/恢复功能
 * - 从计时器开始增加/减少秒数
 * - 计数，不仅倒计时
 *
 * ============================================================================
 * 插件命令
 * ============================================================================
 *
 * 使用以下插件命令来利用
 * 这个插件控制事件计时器.
 *
 * 插件命令:
 *
 *   --- PAUSE/RESUME ---
 *
 *   EventTimer Pause
 *   - 暂停事件计时器.
 *
 *   EventTimer Resume
 *   - 如果已暂停，则恢复事件计时器.
 *
 *   --- COUNT DOWN/UP ---
 *
 *   EventTimer Countdown
 *   - 改变事件计时器的方向以减少和倒计时
 *   接近0秒.
 *
 *   EventTimer Count Up
 *   - 改变事件计时器的方向，增加并向上计数
 *   不停止止，直到手动停止
 *
 *   EventTimer Count Toggle
 *   - 每当事件计时器激活时，
 *   将事件计时器的当前方向切换为增加或减少.
 *
 *   --- INCREASE/DECREASE ---
 *
 *   EventTimer Increase x Frames
 *   EventTimer Decrease x Frames
 *   - 用数字值替换“x”，
 *   以确定事件计时器增加或减少多少帧.
 *
 *   EventTimer Increase x Seconds
 *   EventTimer Decrease x Seconds
 *   - 用数字值替换“x”，
 *   以确定事件计时器增加或减少多少秒。
 *
 *   EventTimer Increase x Minutes
 *   EventTimer Decrease x Minutes
 *   - 用数字值替换“x”，
 *   以确定事件计时器增加或减少多少分钟。
 *
 *   EventTimer Increase x Hours
 *   EventTimer Decrease x Hours
 *   - 用数字值替换“x”，
 *   以确定事件计时器增加或减少多少小时.
 *
 *   你也可以将它们组合在一起:
 *
 *   EventTimer Increase x Hours, y Seconds
 *   EventTimer Increase x Hours, y Minutes
 *   EventTimer Increase x Minutes, y Seconds
 *   EventTimer Increase x Hours, y Minutes, z Seconds
 *
 * ============================================================================
 * Lunatic Mode - Effect Code
 * ============================================================================
 *
 * 对于懂JavaScript，有RPG Maker MV 1.5.0+的有经验用户，你
 * 可以为这个插件添加新的插件命令或者改变当前的代码
 * 插件参数条目中的现有插件命令:效果代码。
 * 应该是这样的:
 *
 * ---
 *
 * // ------------
 * // Pause/Resume
 * // ------------
 * if (data.match(/PAUSE/i)) {
 *   $gameTimer.pause();
 * 
 * } else if (data.match(/RESUME/i)) {
 *   $gameTimer.resume();
 *
 * ...
 *
 * // --------------------------------
 * // Add new commands above this data
 * // --------------------------------
 * } else {
 *   // Do nothing
 * }
 *
 * ---
 *
 * 'data'变量是指'EventTimer'关键字之后的插件命令的其余部分。
 * 例如:
 *
 *   EventTimer Increase 2 Hours, 30 Minutes, 15 Seconds
 *
 * The 'data' would be '增加2小时，30分钟，15秒, 15 Seconds' and thus, the
 * string 'data' is used when checking lines in the 'Effect Code' parameter.
 *
 * ---
 *
 * 如果需要将效果代码恢复到其原始状态，请删除
 * 插件管理器列表中的插件，然后再次添加。代码将是
 * 回到默认值.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.01:
 * - Bypass the isDevToolsOpen() error when bad code is inserted into a script
 * call or custom Lunatic Mode code segment due to updating to MV 1.6.1.
 *
 * Version 1.00:
 * - Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @param ---Mechanical---
 *
 * @param SpritesetSplit
 * @text Separate from Spriteset
 * @parent ---Mechanical---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 将游戏计时器与动态图分开.
 * YES - true     NO - false     默认值: true
 * @default true
 *
 * @param TextAlign
 * @text Timer Text Alignment
 * @parent ---Mechanical---
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc 你希望文本如何对齐？
 * Default: center
 * @default right
 *
 * @param ---Lunatic Mode---
 *
 * @param Effect Code
 * @parent ---Lunatic Mode---
 * @type note
 * @desc LUNATIC MODE: 这是用于每个插件命令的代码
 * plugin commands.
 * @default "// ------------\n// Pause/Resume\n// ------------\nif (data.match(/PAUSE/i)) {\n  $gameTimer.pause();\n\n} else if (data.match(/RESUME/i)) {\n  $gameTimer.resume();\n\n// -------------\n// Count Down/Up\n// -------------\n} else if (data.match(/(?:COUNTDOWN|COUNT DOWN)/i)) {\n  $gameTimer.changeDirection(-1);\n\n} else if (data.match(/(?:COUNTUP|COUNT UP)/i)) {\n  $gameTimer.changeDirection(1);\n\n} else if (data.match(/(?:COUNTOGGLE|COUNT TOGGLE)/i)) {\n  $gameTimer.changeDirection(-1 * $gameTimer._direction);\n\n// -----------------\n// Increase/Decrease\n// -----------------\n} else if (data.match(/(?:INCREASE|DECREASE)/i)) {\n  if (data.match(/DECREASE/i)) {\n    var direction = -1;\n  } else {\n    var direction = 1;\n  }\n  var frames = 0;\n  if (data.match(/(\\d+)[ ]FRAME/i)) {\n    frames += parseInt(RegExp.$1);\n  }\n  if (data.match(/(\\d+)[ ]SEC/i)) {\n    frames += parseInt(RegExp.$1) * 60;\n  }\n  if (data.match(/(\\d+)[ ]MIN/i)) {\n    frames += parseInt(RegExp.$1) * 60 * 60;\n  }\n  if (data.match(/(\\d+)[ ](?:HR|HOUR)/i)) {\n    frames += parseInt(RegExp.$1) * 60 * 60 * 60;\n  }\n  if (data.match(/(\\d+)[ ]DAY/i)) {\n    frames += parseInt(RegExp.$1) * 60 * 60 * 60 * 24;\n  }\n  if (data.match(/(\\d+)[ ]WEEK/i)) {\n    frames += parseInt(RegExp.$1) * 60 * 60 * 60 * 24 * 7;\n  }\n  if (data.match(/(\\d+)[ ]MONTH/i)) {\n    frames += parseInt(RegExp.$1) * 60 * 60 * 60 * 24 * 30;\n  }\n  if (data.match(/(\\d+)[ ](?:YR|YEAR)/i)) {\n    frames += parseInt(RegExp.$1) * 60 * 60 * 60 * 24 * 365;\n  }\n  if (data.match(/(\\d+)[ ]DECADE/i)) {\n    frames += parseInt(RegExp.$1) * 60 * 60 * 60 * 24 * 365 * 10;\n  }\n  if (data.match(/(\\d+)[ ]CENTUR/i)) {\n    frames += parseInt(RegExp.$1) * 60 * 60 * 60 * 24 * 365 * 100;\n  }\n  if (data.match(/(\\d+)[ ]MILLEN/i)) {\n    frames += parseInt(RegExp.$1) * 60 * 60 * 60 * 24 * 365 * 1000;\n  }\n  frames *= direction;\n  $gameTimer.gainFrames(frames);\n\n// --------------------------------\n// Add new commands above this data\n// --------------------------------\n} else {\n  // Do nothing\n}"
 *
 * @param Expire Code
 * @parent ---Lunatic Mode---
 * @type note
 * @desc LUNATIC MODE: 倒计时定时器到期时可以运行的唯一代码
 * countdown timer expires.
 * @default "BattleManager.abort();"
 *
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_EventTimerControl');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.TimerSeparate = String(Yanfly.Parameters['SpritesetSplit']);
Yanfly.Param.TimerSeparate = eval(Yanfly.Param.TimerSeparate);
Yanfly.Param.TimerAlign = String(Yanfly.Parameters['TextAlign']);

Yanfly.Param.TimerCode = JSON.parse(Yanfly.Parameters['Effect Code']);
Yanfly.Param.TimerExpire = JSON.parse(Yanfly.Parameters['Expire Code']);

//=============================================================================
// Separate from Spriteset
//=============================================================================

if (Yanfly.Param.TimerSeparate) {

Spriteset_Base.prototype.createTimer = function() {
  this._timerSprite = new Sprite_Timer();
};

Yanfly.Timer.Scene_Map_createDisplayObjects =
  Scene_Map.prototype.createDisplayObjects;
Scene_Map.prototype.createDisplayObjects = function() {
  Yanfly.Timer.Scene_Map_createDisplayObjects.call(this);
  this.addChild(this._spriteset._timerSprite);
};

Yanfly.Timer.Scene_Battle_createDisplayObjects =
  Scene_Battle.prototype.createDisplayObjects;
Scene_Battle.prototype.createDisplayObjects = function() {
  Yanfly.Timer.Scene_Battle_createDisplayObjects.call(this);
  this.addChild(this._spriteset._timerSprite);
};

}; // Yanfly.Param.TimerSeparate

//=============================================================================
// Game_Timer
//=============================================================================

Yanfly.Timer.Game_Timer_initialize = Game_Timer.prototype.initialize;
Game_Timer.prototype.initialize = function() {
  Yanfly.Timer.Game_Timer_initialize.call(this);
  this._paused = false;
  this._direction = -1;
};

Game_Timer.prototype.update = function(sceneActive) {
  if (!sceneActive) return;
  if (!this._working) return;
  if (this._paused) return;
  if (this._frames <= 0) return;
  this._frames += this._direction;
  if (this._frames <= 0) this.onExpire();
};

Yanfly.Timer.Game_Timer_start = Game_Timer.prototype.start;
Game_Timer.prototype.start = function(count) {
  Yanfly.Timer.Game_Timer_start.call(this, count);
  this._paused = false;
};

Yanfly.Timer.Game_Timer_stop = Game_Timer.prototype.stop;
Game_Timer.prototype.stop = function() {
  Yanfly.Timer.Game_Timer_stop.call(this);
  this._paused = false;
};

Game_Timer.prototype.pause = function() {
  if (this._frames <= 0) return;
  this._paused = true;
  this._working = true;
};

Game_Timer.prototype.resume = function() {
  if (this._frames <= 0) return;
  this._paused = false;
  this._working = true;
};

Game_Timer.prototype.gainFrames = function(value) {
  this._frames = this._frames || 0;
  this._frames += value;
  this._working = true;
};

Game_Timer.prototype.changeDirection = function(value) {
  this._direction = value;
  this._working = true;
  if (value > 0) {
    this._frames = Math.max(this._frames, 1);
  }
};

Game_Timer.prototype.onExpire = function() {
  var code = Yanfly.Param.TimerExpire;
  try {
    eval(code)
  } catch (e) {
    Yanfly.Util.displayError(e, code, 'EVENT TIMER CONTROL EXPIRE CODE ERROR');
  }
};

//=============================================================================
// Sprite_Timer
//=============================================================================

Sprite_Timer.prototype.createBitmap = function() {
  this.bitmap = new Bitmap(144, 48);
  this.bitmap.fontSize = 32;
};

Sprite_Timer.prototype.timerText = function() {
  var hour = Math.floor(this._seconds / 60 / 60);
  var min = Math.floor(this._seconds / 60) % 60;
  var sec = this._seconds % 60;
  var text = min.padZero(2) + ':' + sec.padZero(2);
  if (hour > 0) text = Yanfly.Util.toGroup(hour) + ':' + text;
  return text;
};

Sprite_Timer.prototype.redraw = function() {
  var text = this.timerText();
  var width = this.bitmap.width;
  var height = this.bitmap.height;
  this.bitmap.clear();
  this.bitmap.drawText(text, 0, 0, width, height, Yanfly.Param.TimerAlign);
};

if (Yanfly.Param.TimerAlign === 'right') {

Sprite_Timer.prototype.updatePosition = function() {
  this.x = Graphics.width - this.bitmap.width - 12;
  this.y = 0;
};

}; // Yanfly.Param.TimerAlign === 'right'

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.Timer.Game_Interpreter_pluginCommand =
  Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.Timer.Game_Interpreter_pluginCommand.call(this, command, args);
  if (command.match(/EVENTTIMER/i)) {
    var data = this.argsToString(args);
    var code = Yanfly.Param.TimerCode;
    try {
      eval(code)
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'EVENT TIMER CONTROL EFFECT CODE ERROR');
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
// Default Effect Code
//=============================================================================

if (false) {

// ------------
// Pause/Resume
// ------------
if (data.match(/PAUSE/i)) {
  $gameTimer.pause();

} else if (data.match(/RESUME/i)) {
  $gameTimer.resume();

// -------------
// Count Down/Up
// -------------
} else if (data.match(/(?:COUNTDOWN|COUNT DOWN)/i)) {
  $gameTimer.changeDirection(-1);

} else if (data.match(/(?:COUNTUP|COUNT UP)/i)) {
  $gameTimer.changeDirection(1);

} else if (data.match(/(?:COUNTOGGLE|COUNT TOGGLE)/i)) {
  $gameTimer.changeDirection(-1 * $gameTimer._direction);

// -----------------
// Increase/Decrease
// -----------------
} else if (data.match(/(?:INCREASE|DECREASE)/i)) {
  if (data.match(/DECREASE/i)) {
    var direction = -1;
  } else {
    var direction = 1;
  }
  var frames = 0;
  if (data.match(/(\d+)[ ]FRAME/i)) {
    frames += parseInt(RegExp.$1);
  }
  if (data.match(/(\d+)[ ]SEC/i)) {
    frames += parseInt(RegExp.$1) * 60;
  }
  if (data.match(/(\d+)[ ]MIN/i)) {
    frames += parseInt(RegExp.$1) * 60 * 60;
  }
  if (data.match(/(\d+)[ ](?:HR|HOUR)/i)) {
    frames += parseInt(RegExp.$1) * 60 * 60 * 60;
  }
  if (data.match(/(\d+)[ ]DAY/i)) {
    frames += parseInt(RegExp.$1) * 60 * 60 * 60 * 24;
  }
  if (data.match(/(\d+)[ ]WEEK/i)) {
    frames += parseInt(RegExp.$1) * 60 * 60 * 60 * 24 * 7;
  }
  if (data.match(/(\d+)[ ]MONTH/i)) {
    frames += parseInt(RegExp.$1) * 60 * 60 * 60 * 24 * 30;
  }
  if (data.match(/(\d+)[ ](?:YR|YEAR)/i)) {
    frames += parseInt(RegExp.$1) * 60 * 60 * 60 * 24 * 365;
  }
  if (data.match(/(\d+)[ ]DECADE/i)) {
    frames += parseInt(RegExp.$1) * 60 * 60 * 60 * 24 * 365 * 10;
  }
  if (data.match(/(\d+)[ ]CENTUR/i)) {
    frames += parseInt(RegExp.$1) * 60 * 60 * 60 * 24 * 365 * 100;
  }
  if (data.match(/(\d+)[ ]MILLEN/i)) {
    frames += parseInt(RegExp.$1) * 60 * 60 * 60 * 24 * 365 * 1000;
  }
  frames *= direction;
  $gameTimer.gainFrames(frames);

// --------------------------------
// Add new commands above this data
// --------------------------------
} else {
  // Do nothing
}

}; // Default Effect Code

//=============================================================================
// End of File
//=============================================================================