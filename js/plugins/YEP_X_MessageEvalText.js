//=============================================================================
// Yanfly Engine Plugins - Message Core Extension - Message Eval Text
// YEP_X_MessageEvalText.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_MessageEvalText = true;

var Yanfly = Yanfly || {};
Yanfly.MsgEval = Yanfly.MsgEval || {};
Yanfly.MsgEval.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc v1.00 信息代码文本(需要 YEP_MessageCore.js)
 * code list so that you can run JavaScript code and display it as text.
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * 介绍
 * ============================================================================
 *
 * 这个插件需要YEP_MessageCore。确保该插件位于插
 * 件列表中的YEP _ MessageCore下。
 *
 * 这是一个小插件，它为消息添加了一个\evalText<<code>> 文本代码，
 * 这样人们就可以运行JavaScript代码并将其显示为文本。
 * 这可以用来进行动态计算，而不需要在显示数量
 * 之前使用“更改变量”事件，
 * 也可以用来确定将显示哪种字符串，
 * 而不会产生过多的“条件分支”事件。
 *
 * ============================================================================
 * 文本代码
 * ============================================================================
 *
 * \evalText<<code>>
 * - 用JavaScript代码替换'code'它将在内部运行代码，
 * 然后返回已运行代码的最后一行。
 * 以下是一些你可以用来做这件事的例子:
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 * 例子:
 *
 * ---
 *
 * \evalText<<$gameActors.actor(1).atk + $gameActors.actor(2).atk>>
 * - 显示角色1的ATK和角色2的ATK的总和。
 *
 * ---
 *
 * \evalText<<Math.min(1000, $gameParty.gold())>>
 * - 显示“1000”或该队的金币计数，
 * 取决于当前哪个较小.
 *
 * ---
 *
 * \evalText<<['His','Her','Its'][\v[123]]>>
 * - Depending on the value of Variable 123, this will display 'His' if the
 * Variable 123 value is equal to 0, 'Her' if the value is equal to 1, or 'Its'
 * if the value is equal to 2.
 *
 * ---
 *
 * \evalText<<['Abel','Brandon','Chris'][$gameVariables.value(456)]>>
 * - 根据变量123的值，如果变量123的值等于0，将显示'Abel'如果值等于1，
 * 将显示'Brandon'如果值等于2，将显示'Chris'.
 * ...
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

if (Imported.YEP_MessageCore) {

//=============================================================================
// Window_Base
//=============================================================================

Yanfly.MsgEval.Window_Base_convertEscCharacters =
  Window_Base.prototype.convertEscapeCharacters;
Window_Base.prototype.convertEscapeCharacters = function(text) {
  var text = Yanfly.MsgEval.Window_Base_convertEscCharacters.call(this, text);
  if (Imported.YEP_X_MessageMacros1) text = this.convertMacroText(text);
  text = text.replace(/\\/g, '\x1b');
  text = text.replace(/\x1b\x1b/g, '\\');
  text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
    return $gameVariables.value(parseInt(arguments[1]));
  }.bind(this));
  text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
    return $gameVariables.value(parseInt(arguments[1]));
  }.bind(this));
  text = text.replace(/\x1bEVALTEXT<<(.*?)>>/gi, function() {
    return eval(arguments[1]);
  }.bind(this));
  return text;
};

Window_Base.prototype.battler = function() {
  if ($gameParty.inBattle()) {
    if (BattleManager.actor()) return BattleManager.actor();
    if (BattleManager._subject) return BattleManager._subject;
  }
  if (SceneManager._scene._actor) return SceneManager._scene._actor;
  return $gameParty.members()[0];
};

//=============================================================================
// Error Message
//=============================================================================
} else {

Imported.YEP_X_MessageEvalText = false;
var text = '';
text += 'You are getting this error because you are trying to run ';
text += 'YEP_X_MessageEvalText without the required plugins. Please visit ';
text += 'Yanfly.moe and install the required plugins neede for this plugin ';
text += 'found in this plugin\'s help file before you can use it.';
console.log(text);
require('nw.gui').Window.get().showDevTools();

}
//=============================================================================
// End of File
//=============================================================================