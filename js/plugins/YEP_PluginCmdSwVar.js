//=============================================================================
// Yanfly Engine Plugins - Plugin Commands - Switches & Variables Access
// YEP_PluginCmdSwVar.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_PluginCmdSwVar = true;

var Yanfly = Yanfly || {};
Yanfly.PCSV = Yanfly.PCSV || {};
Yanfly.PCSV.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc v1.00 开关变量控制插件命令
 * plugin commands across the board!
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * 正式介绍
 * ============================================================================
 *
 * 插件命令是RPG Maker MV从以前的迭代中添加的更有
 * 用的东西之一。它们提供了启动定制插件功能的能力，
 * 而没有脚本调用的结构复杂性。然而，插件命令本身并
 * 不太灵活，因为插入到命令字符串中的值往往是固定
 * 的。这个插件允许你使用变量和开关来使插件命令值更
 * 加灵活。
 *
 * ============================================================================
 * 指令
 * ============================================================================
 *
 * 当您创建一个插件命令事件，
 * 希望数据变得更加dynamic and/or flexible,
 * 使用下面的插件命令替换代码来产生新的效果:
 *
 * ---
 *
 * 变量: 
 *
 *  v[x]
 *  - 用变量x的值替换v[x]。
 *
 *  例子:
 *
 *  Quest Add v[8]
 *  - YEP _ QuestJournal的任务添加x插件命令现在将使用
 *  变量8来决定添加哪个任务。
 *
 *  gainJp v[11] v[12]
 *  - YEP _ JobPoints的gainJp actorId jp插件命令将使用变量11来确定actorId，
 *  以将变量12的值作为要添加的Jp。
 *
 * ---
 *
 * 开关:
 *
 *  {s[x] ? OnText : OffText}
 *  - 据开关x替换{ }括号内的所有内容。
 *  如果开关x打开，则它将被替换为 'OnText'.
 *  。如果开关x关闭，则它将被替换为 'OffText'.
 *
 *  例子:
 *
 *  EventTimer {s[1] ? Pause : Resume}
 *  - 如果开关1打开，事件定时器控制的事件定时器插件命
 *  令将暂停，如果开关1关闭，将恢复。.
 *
 *  ForceAdvantage {s[2] ? Preemptive : Surprise}
 *  - YEP_ForceAdvantage的ForceAdvantage插件命令将在
 *  开关2打开时给予玩家先发制人的打击，
 *  或者在开关2关闭时给予敌人突袭的优势。
 *
 * ---
 *
 * 组合:
 *
 *  您可以将变量和开关组合在一起，
 *  使用这两种类型生成更复杂的插件命令
 *
 *  例子:
 *
 *  ShowIconBalloon v[15] on {s[5] ? Player : Event v[16]}
 *  - 如果开关5打开，图标气泡的显示图标气泡x对y插件命
 *  令现在将在播放器上显示一个基于变量15的图标。如果
 *  开关5关闭，那么它将在由变量16确定的事件上显示图标。
 *
 *  Quest v[20] {s[10] ? Show : Hide} Reward v[21]
 *  - YEP _ QuestJournal的任务x Show/Hide 奖励y插件命令将
 *  使受变量20影响的任务根据开关10将其奖励设置更改为
 *  显示或隐藏。更改的奖励标识基于变量21。
 *
 * ---
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
 */
//=============================================================================

//=============================================================================
// MainCode
//=============================================================================

Yanfly.PCSV.Game_Interpreter_command356 = Game_Interpreter.prototype.command356;
Game_Interpreter.prototype.command356 = function() {
  var originalString = this._params[0];
  this.processPluginCommandSwitchVariables();
  var value = Yanfly.PCSV.Game_Interpreter_command356.call(this);
  this._params[0] = originalString;
  return value;
};

Game_Interpreter.prototype.processPluginCommandSwitchVariables = function() {
  // Set text variable
  var text = this._params[0];
  // Switch Replacement
  text = text.replace(/\{S\[(\d+)\][ ]\?[ ](.*)[ ]:[ ](.*)\}/gi, function() {
    var text1 = String(arguments[2]);
    var text2 = String(arguments[3]);
    return $gameSwitches.value(parseInt(arguments[1])) ? text1 : text2;
  }.bind(this));
  // Variable Replacement v[x]
  text = text.replace(/V\[(\d+)\]/gi, function() {
    return $gameVariables.value(parseInt(arguments[1]));
  }.bind(this));
  text = text.replace(/V\[(\d+)\]/gi, function() {
    return $gameVariables.value(parseInt(arguments[1]));
  }.bind(this));
  text = text.replace(/V\[(\d+)\]/gi, function() {
    return $gameVariables.value(parseInt(arguments[1]));
  }.bind(this));
  // Set Parameters to text string
  this._params[0] = text;
};

//=============================================================================
// End of File
//=============================================================================