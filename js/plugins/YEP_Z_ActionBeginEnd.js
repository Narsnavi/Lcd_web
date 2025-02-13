//=============================================================================
// Yanfly Engine Plugins - Lunatic Pack - Action Beginning and End Effects
// YEP_Z_ActionBeginEnd.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_Z_ActionBeginEnd = true;

var Yanfly = Yanfly || {};
Yanfly.LunActBegEnd = Yanfly.LunActBegEnd || {};
Yanfly.LunActBegEnd.version = 1.01;

//=============================================================================
 /*:
 * @plugindesc v1.01 行动效果增强(Lunatic Pack) 
 * beginning or end of an action.
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * 介绍
 * ============================================================================
 *
 * 此插件需要以下插件:
 * - Battle Engine Core
 *
 * 将此插件放在插件管理器中上面列出的插件下面。
 *
 * 有时，我们想在战斗中增加额外的效果。
 * 这些效果的范围可以从增加更多的生命值，
 * 在其他事情发生后给用户应用一个新的状态，
 * 移除减爆，播放一个动画，
 * 甚至吸收这个回合动作直接造成的全部伤害的一小部分。
 * 这个疯狂包提供了一批新的效果，
 * 你可以用它们来增强你的物品和技能。
 *
 * *注*:此插件最好与RPG Maker MV版本1.5.0+一起使用。
 * 您仍然可以使用这个版本号较低的插件，
 * 但是如果没有它，您将很难更改插件参数。
 *
 * ============================================================================
 * 注释标记
 * ============================================================================
 *
 * 将以下注释标签插入技能、物品或状态的注释框中，
 * 使其具有以下效果之一:
 *
 * ---
 *
 * 技能、项目和状态注释标签:
 *
 *   <timing Action: effect>
 *   - 该插件的大部分注释标签将遵循上述格式。 'timing'将替
 *   换为'Begin'或'End' 而“'effect'将替换为下面
 *   “效果”部分中的条目。
 * 
 *   插入多个注释标记条目，为您的技能/物品带来更多效果。
 *   如果有很多效果出现：
 *   那么它们出现的顺序将是:技能/物品优先，
 *   状态效果基于它们的状态优先级从最高到最低的顺序。
 *
 * =-=-=-= 动作时间 =-=-=-=
 *
 *   <Begin Action: effect>
 *   - 如果时间是'begin',那么这个效果将在动作的成本被使
 *   用之后出现。
 *
 *   <End Action: effect>
 *   - 如果计时为'end', 它将在当前动作结束时所有动作序
 *   列完成后发生。
 *
 * =-=-=-= 动作效果 =-=-=-=
 *
 *   --- 动画效果 ---
 *
 *   <timing Action: Animation x>
 *   <timing Action: Animation x, Mirror>
 *   <timing Action: Animation x, Delay y>
 *   <timing Action: Animation x, Mirror, Delay y>
 *   - 这将使动画x在执行动作的角色身上播放。
 *   如果你在效果线中插入'Mirror'，那么动画将被镜像。
 *   如果您插入'Delay y'并用数字值替换'y'
 *   动画将在播放前延迟y帧。
 *   建议者: Yanfly
 *
 *   --- HP 效应 ---
 *
 *   <timing Action: +x HP>
 *   <timing Action: -x HP>
 *   - 用以上格式替换'effect'。将“x”替换为您希望应用于角色
 *   的固定数量的HP。
 *   SUGGESTED BY: Yanfly
 *
 *   <timing Action: +x HP%>
 *   <timing Action: -x HP%>
 *   - 用以上格式替换'effect'。将“x”替换为等于用户最大HP
 *   x%的HP，以应用于角色。
 *   SUGGESTED BY: Yanfly
 *
 *   <End Action: Drain x% Total HP Damage>
 *   - 只能与结束动作配合使用。使用以上格式。
 *   将“x”替换为用户直接造成的所有总生命值伤害的百分比，
 *  此动作恢复为生命值。
 *   SUGGESTED BY: Yanfly
 *
 *   <End Action: Recoil x% Total HP Damage>
 *   - 只能与结束动作配合使用。使用以上格式。
 *   将“x”替换为用户直接造成的全部生命值伤害的百分比，
 *   此动作将自身伤害替换为生命值。
 *   SUGGESTED BY: Yanfly
 *
 *   --- MP效果 ---
 *
 *   <timing Action: +x MP>
 *   <timing Action: -x MP>
 *   - 用以上格式替换'effect'。将“x”替换为您希望应用于角色
 *   的固定数量的MP。
 *   SUGGESTED BY: Yanfly
 *
 *   <timing Action: +x MP%>
 *   <timing Action: -x MP%>
 *   - 用以上格式替换'effect'”。将“x”替换为等于用户MaxMP的
 *   x%的MP，以应用于角色。
 *   SUGGESTED BY: Yanfly
 *
 *   <End Action: Drain x% Total MP Damage>
 *   - 只能与结束动作配合使用。使用以上格式。
 *   将“x”替换为用户直接造成的全部MP伤害的百分比，
 *   此动作将作为MP恢复。
 *   SUGGESTED BY: Yanfly
 *
 *   <End Action: Recoil x% Total MP Damage>
 *   - 只能与结束动作配合使用。使用以上格式。
 *   将“x”替换为所有由用户直接造成的总MP伤害的百分比，
 *   此动作为MP的自我伤害。
 *   SUGGESTED BY: Yanfly
 *
 *   --- TP 效果 ---
 *
 *   <timing Action: +x TP>
 *   <timing Action: -x TP>
 *   -用以上格式替换'effect'。将“x”替换为您希望应用于角色
 *   的固定数量的HP。
 *   SUGGESTED BY: Yanfly
 *
 *   <timing Action: +x TP%>
 *   <timing Action: -x TP%>
 *   - 用以上格式替换'effect'。用等于用户MaxTP的x%的TP
 *   替换“x”以应用于角色。
 *   SUGGESTED BY: Yanfly
 *
 *   --- Buff/Debuff 效果 ---
 *
 *   <timing Action: Add x Buff>
 *   <timing Action: Add x Buff, y Turns>
 *   <timing Action: Add x Debuff>
 *   <timing Action: Add x Debuff, y Turns>
 *   - 用以上格式替换'effect'将“x”替换为以下任何参数:
 *   “MaxHP”、“MaxMP”、“ATK”、“DEF”、“MAT”、
 *   “MDF”、“AGI”或“LUK”，以改变各自的状态。
 *   如果使用带“y”圈的格式，用您希望Buff/Debuff持续的圈数替换“y”。
 *   如果不使用“y”，它将持续5回合。
 *   SUGGESTED BY: Yanfly
 *
 *   <timing Action: Remove x Buff>
 *   <timing Action: Remove x Debuff>
 *   - 用以上格式替换'effect'将“x”替换为以下任何参数:
 *   MaxHP”、“MaxMP”、“ATK”、“DEF”、“MAT”、
 *   “MDF”、“AGI”或“LUK”，
 *   以便在满足条件的情况下从角色处移除相应的Buff/Debuff。
 *   如果不使用“y”，它将持续5回合。
 *   SUGGESTED BY: Yanfly
 *
 *   --- 状态效果 ---
 *
 *   <timing Action: Add State x>
 *   - 用以上格式替换'effect'用您希望添加给用户的状态ID
 *   替换“x”。
 *   SUGGESTED BY: Yanfly
 *
 *   <timing Action: Remove State x>
 *   - 用以上格式替换'effect'用您希望从用户中删除的状态ID
 *   替换“x”。
 *   SUGGESTED BY: Yanfly
 *
 * ============================================================================
 * Lunatic Mode - 效果代码
 * ============================================================================
 *
 * 对于了解JavaScript并拥有RPG Maker MV 1.5.0+的有
 * 经验的用户，您可以添加插件可以使用的新注释标签效果，
 * 或者从插件参数条目:效果代码中更改当前现有注释
 * 标签效果的效果。应该是这样的:
 *
 * ---
 *
 * // ---------
 * // Animation
 * // ---------
 * if (data.match(/ANIMATION[ ](\d+)/i)) {
 *   var animationId = parseInt(RegExp.$1);
 *   var mirror = data.match(/MIRROR/i);
 *   if (data.match(/DELAY[ ](\d+)/i)) {
 *     var delay = parseInt(RegExp.$1);
 *   } else {
 *     var delay = 0;
 *   }
 *   user.startAnimation(animationId, mirror, delay);
 *
 * ...
 *
 * // -------------------------------
 * // Add new effects above this line
 * // -------------------------------
 * } else {
 *   skip = true;
 * }
 *
 * ---
 *
 * Here's what each of the variables used in this code bit refer to:
 *
 *   --------------------   ---------------------------------------------------
 *   Variable:              Refers to:
 *   --------------------   ---------------------------------------------------
 *   item                   The item being used by this action
 *   skill                  The skill being used by this action
 *
 *   isItem                 Returns true if action is an item
 *   isSkill                Returns true if action is a skill
 *
 *   a                      Returns the action user
 *   user                   Returns the action user
 *   subject                Returns the action user
 *
 *   b                      Returns the action's current target
 *   target                 Returns the action's current target
 *
 *   s[x]                   Return switch x (true/false)
 *   v[x]                   Return variable x's current value
 *
 *   user._result           The current results for the user
 *   target._result         The current results for the target
 *   userPreviousResult     The results for the user before any changes
 *   targetPreviousResult   The results for the target before any changes
 *
 *   totalHpDamage          The total amount of HP damage dealt this action
 *   totalMpDamage          The total amount of MP damage dealt this action
 *
 *   skip                   Default: false. If true, popups
 *
 * ---
 *
 * 如果您需要将效果代码恢复到其原始状态，
 * 请从插件管理器列表中删除该插件，然后再次添加它。
 * 代码将恢复为默认值。
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
 * @param Effect Code
 * @type note
 * @desc LUNATIC MODE: 这是用于每个字符标签效果的代码。
 * 请参考此处使用的变量的帮助文件。
 * @default "// ---------\n// Animation\n// ---------\nif (data.match(/ANIMATION[ ](\\d+)/i)) {\n  var animationId = parseInt(RegExp.$1);\n  var mirror = data.match(/MIRROR/i);\n  if (data.match(/DELAY[ ](\\d+)/i)) {\n    var delay = parseInt(RegExp.$1);\n  } else {\n    var delay = 0;\n  }\n  user.startAnimation(animationId, mirror, delay);\n\n// --------------\n// Flat Gain/Loss\n// --------------\n} else if (data.match(/([\\+\\-]\\d+)[ ]HP/i)) {\n  value = parseInt(RegExp.$1);\n  user.gainHp(value);\n\n} else if (data.match(/([\\+\\-]\\d+)[ ]MP/i)) {\n  value = parseInt(RegExp.$1);\n  user.gainMp(value);\n\n} else if (data.match(/([\\+\\-]\\d+)[ ]TP/i)) {\n  value = parseInt(RegExp.$1);\n  user.gainTp(value);\n\n// --------------------\n// Percentile Gain/Loss\n// --------------------\n} else if (data.match(/([\\+\\-]\\d+)([%％])[ ]HP/i)) {\n  rate = parseFloat(RegExp.$1) * 0.01;\n  value = Math.round(user.mhp * rate);\n  user.gainHp(value);\n\n} else if (data.match(/([\\+\\-]\\d+)([%％])[ ]MP/i)) {\n  rate = parseFloat(RegExp.$1) * 0.01;\n  value = Math.round(user.mmp * rate);\n  user.gainMp(value);\n\n} else if (data.match(/([\\+\\-]\\d+)([%％])[ ]TP/i)) {\n  rate = parseFloat(RegExp.$1) * 0.01;\n  value = Math.round(user.maxTp() * rate);\n  user.gainTp(value);\n\n// ------------------------\n// Add/Remove Buffs/Debuffs\n// ------------------------\n} else if (data.match(/ADD[ ](.*)[ ]BUFF/i)) {\n  var str = String(RegExp.$1).toUpperCase();\n  var paramId = DataManager.getParamId(str);\n  if (data.match(/(\\d+)[ ]TURN/i)) {\n    var turns = parseInt(RegExp.$1);\n  } else {\n    var turns = 5;\n  }\n  if (paramId >= 0) {\n    user.addBuff(paramId, turns);\n  } else {\n    skip = true;\n  }\n\n} else if (data.match(/REMOVE[ ](.*)[ ](?:BUFF|DEBUFF)/i)) {\n  var str = String(RegExp.$1).toUpperCase();\n  var paramId = DataManager.getParamId(str);\n  if (paramId >= 0) {\n    user.removeBuff(paramId);\n  } else {\n    skip = true;\n  }\n\n// -----------------\n// Add/Remove States\n// -----------------\n} else if (data.match(/ADD STATE[ ](\\d+)/i)) {\n  var stateId = parseInt(RegExp.$1);\n  user.addState(stateId);\n\n} else if (data.match(/REMOVE STATE[ ](\\d+)/i)) {\n  var stateId = parseInt(RegExp.$1);\n  if (user.isStateAffected(stateId)) {\n    user.removeState(stateId);\n  } else {\n    skip = true;\n  }\n\n// ------------\n// Drain/Recoil\n// ------------\n} else if (data.match(/(\\d+)([%％])[ ]TOTAL HP[ ](?:DMG|DAMAGE)/i)) {\n  if (totalHpDamage !== 0) {\n    rate = parseFloat(RegExp.$1) * 0.01;\n    value = Math.round(totalHpDamage * rate);\n    if (data.match(/DRAIN/i)) {\n      user.gainHp(value);\n    } else if (data.match(/RECOIL/i)) {\n      user.gainHp(-value);\n    } else {\n      skip = true;\n    }\n  }\n\n} else if (data.match(/(\\d+)([%％])[ ]TOTAL MP[ ](?:DMG|DAMAGE)/i)) {\n  if (totalMpDamage !== 0) {\n    rate = parseFloat(RegExp.$1) * 0.01;\n    value = Math.round(totalMpDamage * rate);\n    if (data.match(/DRAIN/i)) {\n      user.gainMp(value);\n    } else if (data.match(/RECOIL/i)) {\n      user.gainMp(-value);\n    } else {\n      skip = true;\n    }\n  }\n\n// -------------------------------\n// Add new effects above this line\n// -------------------------------\n} else {\n  skip = true;\n}"
 *
 */
//=============================================================================

Yanfly.PluginRequirements = function() {
  return Imported.YEP_BattleEngineCore;
};

if (Yanfly.PluginRequirements()) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_Z_ActionBeginEnd');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.LunActBegEndEffect = JSON.parse(Yanfly.Parameters['Effect Code']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.LunActBegEnd.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.LunActBegEnd.DataManager_isDatabaseLoaded.call(this)) return false;

  if (!Yanfly._loaded_YEP_Z_ActionBeginEnd) {
    this.processLunActBegEndNotetags1($dataSkills);
    this.processLunActBegEndNotetags1($dataItems);
    this.processLunActBegEndNotetags1($dataStates);
    Yanfly._loaded_YEP_Z_ActionBeginEnd = true;
  }
  
  return true;
};

DataManager.processLunActBegEndNotetags1 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.lunaticActionBegin = [];
    obj.lunaticActionEnd = [];

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(.*)[ ](?:ACTION|ACTIONS):[ ](.*)>/i)) {
        var data1 = String(RegExp.$1);
        var data2 = String(RegExp.$2);
        if (data1.match(/BEGIN/i)) {
          obj.lunaticActionBegin.push(data2);
        } else if (data1.match(/END/i)) {
          obj.lunaticActionEnd.push(data2);
        }
      }
    }
  }
};

DataManager.getParamId = function(str) {
  switch (str.toUpperCase()) {
  case 'HP':
  case 'MAXHP':
  case 'MAX HP':
    return 0;
    break;
  case 'MP':
  case 'MAXMP':
  case 'MAX MP':
  case 'SP':
  case 'MAXSP':
  case 'MAX SP':
    return 1;
    break;
  case 'ATK':
  case 'STR':
    return 2;
    break;
  case 'DEF':
    return 3;
    break;
  case 'MAT':
  case 'INT':
  case 'SPI':
    return 4;
    break;
  case 'MDF':
  case 'RES':
    return 5;
    break;
  case 'AGI':
  case 'SPD':
    return 6;
    break;
  case 'LUK':
    return 7;
    break;
  default:
    return -1;
    break;
  }
};

//=============================================================================
// Game_Temp
//=============================================================================

Game_Temp.prototype.clearLunaticActionValues = function() {
  this._totalHpDamage = 0;
  this._totalMpDamage = 0;
};

//=============================================================================
// Game_Battler
//=============================================================================

Yanfly.LunActBegEnd.Game_Battler_useItem = Game_Battler.prototype.useItem;
Game_Battler.prototype.useItem = function(item) {
  Yanfly.LunActBegEnd.Game_Battler_useItem.call(this, item);
  $gameTemp.clearLunaticActionValues();
  this.processLunaticBeginEndAction('begin');
};

Yanfly.LunActBegEnd.Game_Battler_performActionEnd =
  Game_Battler.prototype.performActionEnd;
Game_Battler.prototype.performActionEnd = function() {
  this.processLunaticBeginEndAction('end');
  $gameTemp.clearLunaticActionValues();
  Yanfly.LunActBegEnd.Game_Battler_performActionEnd.call(this);
};

Game_Battler.prototype.processLunaticBeginEndAction = function(type) {
  if (!$gameParty.inBattle()) return;
  var action = BattleManager._action;
  if (!action) return;
  var item = action.item();
  if (!item) return;
  var effects = this.getLunaticBeginEndActionEffects(type, item);
  action.processLunaticBeginEndActions(effects);
};

Game_Battler.prototype.getLunaticBeginEndActionEffects = function(type, item) {
  var effects = [];
  var states = this.states();
  var length = states.length;
  if (type === 'begin') {
    effects = effects.concat(item.lunaticActionBegin);
    for (var i = 0; i < length; ++i) {
      var state = states[i];
      if (state && state.lunaticActionBegin) {
        effects = effects.concat(state.lunaticActionBegin);
      }
    }
  } else if (type === 'end') {
    effects = effects.concat(item.lunaticActionEnd);
    for (var i = 0; i < length; ++i) {
      var state = states[i];
      if (state && state.lunaticActionEnd) {
        effects = effects.concat(state.lunaticActionEnd);
      }
    }
  }
  return effects;
};

//=============================================================================
// Game_Action
//=============================================================================

Yanfly.LunActBegEnd.Game_Action_executeHpDamage =
  Game_Action.prototype.executeHpDamage;
Game_Action.prototype.executeHpDamage = function(target, value) {
  $gameTemp._totalHpDamage += value;
  Yanfly.LunActBegEnd.Game_Action_executeHpDamage.call(this, target, value);
};

Yanfly.LunActBegEnd.Game_Action_executeMpDamage =
  Game_Action.prototype.executeMpDamage;
Game_Action.prototype.executeMpDamage = function(target, value) {
  $gameTemp._totalMpDamage += value;
  Yanfly.LunActBegEnd.Game_Action_executeMpDamage.call(this, target, value);
};

Yanfly.LunActBegEnd.apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
  Yanfly.LunActBegEnd.apply.call(this, target);
  if (target) $gameTemp._lastActionTarget = target;
};

Game_Action.prototype.processLunaticBeginEndActions = function(effects) {
  var length = effects.length;
  for (var i = 0; i < length; ++i) {
    var data = effects[i];
    this.processLunaticBeginEndActionEval(data);
  }
  $gameTemp._lastActionTarget = undefined;
};

Game_Action.prototype.processLunaticBeginEndActionEval = function(data) {
  var item = this.item();
  var skill = this.item();
  var isSkill = DataManager.isSkill(skill);
  var isItem = DataManager.isSkill(item);
  var user = this.subject();
  var a = user;
  var subject = user;
  var target = $gameTemp._lastActionTarget || user;
  var b = target;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;

  var totalHpDamage = $gameTemp._totalHpDamage;
  var totalMpDamage = $gameTemp._totalMpDamage;

  var userPreviousResult = JsonEx.makeDeepCopy(user._result);
  var targetPreviousResult = JsonEx.makeDeepCopy(target._result);
  var skip = false;
  var value = 0;
  var rate = 1;

  a.clearResult();
  b.clearResult();

  var code = Yanfly.Param.LunActBegEndEffect;
  try {
    eval(code)
  } catch (e) {
    Yanfly.Util.displayError(e, code, 'LUNATIC ACTION BEGIN END ERROR');
  }

  if (skip) {
    if (user.isDead()) user.performCollapse();
    if (target.isDead()) target.performCollapse();
    user._result = userPreviousResult;
    target._result = targetPreviousResult;
    return;
  } else {
    if (user.result() && user.result().hpDamage !== 0) {
      user.startDamagePopup();
    } else if (user.result() && user.result().mpDamage !== 0) {
      user.startDamagePopup();
    }
  }

  if (user.isDead()) user.performCollapse();
  if (target.isDead()) target.performCollapse();
  user._result = userPreviousResult;
  target._result = targetPreviousResult;
};

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

Yanfly.Util.displayError = function(e, code, message) {
  console.log(message);
  console.log(code || 'NON-EXISTENT');
  console.error(e);
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

// ---------
// Animation
// ---------
if (data.match(/ANIMATION[ ](\d+)/i)) {
  var animationId = parseInt(RegExp.$1);
  var mirror = data.match(/MIRROR/i);
  if (data.match(/DELAY[ ](\d+)/i)) {
    var delay = parseInt(RegExp.$1);
  } else {
    var delay = 0;
  }
  user.startAnimation(animationId, mirror, delay);

// --------------
// Flat Gain/Loss
// --------------
} else if (data.match(/([\+\-]\d+)[ ]HP/i)) {
  value = parseInt(RegExp.$1);
  user.gainHp(value);

} else if (data.match(/([\+\-]\d+)[ ]MP/i)) {
  value = parseInt(RegExp.$1);
  user.gainMp(value);

} else if (data.match(/([\+\-]\d+)[ ]TP/i)) {
  value = parseInt(RegExp.$1);
  user.gainTp(value);

// --------------------
// Percentile Gain/Loss
// --------------------
} else if (data.match(/([\+\-]\d+)([%％])[ ]HP/i)) {
  rate = parseFloat(RegExp.$1) * 0.01;
  value = Math.round(user.mhp * rate);
  user.gainHp(value);

} else if (data.match(/([\+\-]\d+)([%％])[ ]MP/i)) {
  rate = parseFloat(RegExp.$1) * 0.01;
  value = Math.round(user.mmp * rate);
  user.gainMp(value);

} else if (data.match(/([\+\-]\d+)([%％])[ ]TP/i)) {
  rate = parseFloat(RegExp.$1) * 0.01;
  value = Math.round(user.maxTp() * rate);
  user.gainTp(value);

// ------------------------
// Add/Remove Buffs/Debuffs
// ------------------------
} else if (data.match(/ADD[ ](.*)[ ]BUFF/i)) {
  var str = String(RegExp.$1).toUpperCase();
  var paramId = DataManager.getParamId(str);
  if (data.match(/(\d+)[ ]TURN/i)) {
    var turns = parseInt(RegExp.$1);
  } else {
    var turns = 5;
  }
  if (paramId >= 0) {
    user.addBuff(paramId, turns);
  } else {
    skip = true;
  }

} else if (data.match(/REMOVE[ ](.*)[ ](?:BUFF|DEBUFF)/i)) {
  var str = String(RegExp.$1).toUpperCase();
  var paramId = DataManager.getParamId(str);
  if (paramId >= 0) {
    user.removeBuff(paramId);
  } else {
    skip = true;
  }

// -----------------
// Add/Remove States
// -----------------
} else if (data.match(/ADD STATE[ ](\d+)/i)) {
  var stateId = parseInt(RegExp.$1);
  user.addState(stateId);

} else if (data.match(/REMOVE STATE[ ](\d+)/i)) {
  var stateId = parseInt(RegExp.$1);
  if (user.isStateAffected(stateId)) {
    user.removeState(stateId);
  } else {
    skip = true;
  }

// ------------
// Drain/Recoil
// ------------
} else if (data.match(/(\d+)([%％])[ ]TOTAL HP[ ](?:DMG|DAMAGE)/i)) {
  if (totalHpDamage !== 0) {
    rate = parseFloat(RegExp.$1) * 0.01;
    value = Math.round(totalHpDamage * rate);
    if (data.match(/DRAIN/i)) {
      user.gainHp(value);
    } else if (data.match(/RECOIL/i)) {
      user.gainHp(-value);
    } else {
      skip = true;
    }
  }

} else if (data.match(/(\d+)([%％])[ ]TOTAL MP[ ](?:DMG|DAMAGE)/i)) {
  if (totalMpDamage !== 0) {
    rate = parseFloat(RegExp.$1) * 0.01;
    value = Math.round(totalMpDamage * rate);
    if (data.match(/DRAIN/i)) {
      user.gainMp(value);
    } else if (data.match(/RECOIL/i)) {
      user.gainMp(-value);
    } else {
      skip = true;
    }
  }

// -------------------------------
// Add new effects above this line
// -------------------------------
} else {
  skip = true;
}

}; // Default Effect Code

//=============================================================================
// End of File
//=============================================================================
} else {

var text = '';
text += 'You are getting this error because you are trying to run ';
text += 'YEP_Z_ActionBeginEnd without the required plugins. Please visit ';
text += 'Yanfly.moe and install the required plugins neede for this plugin ';
text += 'found in this plugin\'s help file before you can use it.';
console.log(text);
require('nw.gui').Window.get().showDevTools();

}; // Yanfly.PluginRequirements