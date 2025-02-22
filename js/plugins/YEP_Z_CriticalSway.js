//=============================================================================
// Yanfly Engine Plugins - Lunatic Pack - Custom Critical Rates
// YEP_Z_CriticalSway.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_Z_CriticalSway = true;

var Yanfly = Yanfly || {};
Yanfly.LunCriSway = Yanfly.LunCriSway || {};
Yanfly.LunCriSway.version = 1.01;

//=============================================================================
 /*:
 * @plugindesc v1.01 暴击影响设置(Lunatic Pack) 
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * 介绍
 * ============================================================================
 *
 * 此插件需要以下插件:
 * - Battle Engine Core
 * - Damage Core
 * - Critical Control
 *
 * 把这个插件放在插件管理器上面列出的插件下面。
 *
 * 你有没有想过在你的游戏中如何决定关键命中有更多的
 * 变化？这个插件可以让你改变游戏中技能、物品和状态
 * 的临界命中率。受其影响的用户可以根据自己或敌人的
 * 生命值对其行为进行暴击！或者也许把角色命中率和动
 * 作的元素率联系起来的想法？
 * 你也可以根据用户或目标的状态、
 * buffs或debuffs的数量！
 *
 * *注*:此插件最好与RPG Maker MV版本1.5.0+一起使
 * 用。您仍然可以使用这个版本号较低的插件，但是如果
 * 没有它，您将很难更改插件参数。
 *
 * ============================================================================
 * 注释标记
 * ============================================================================
 *
 * 将以下注释标签插入技能或物品的注释框中，
 * 使其具有以下效果之一:
 *
 * ---
 *
 * 技能、物品、状态注释标签:
 *
 *   <Custom Critical Rate: effect>
 *   - 该插件的大部分注释标签将遵循上述格式。
 *   将'effect'替换为下面“效果”部分的下列条目之一。
 *   插入多个条目，给你的技能/物品/状态多重效果。
 *   如果有多种效果可以修改暴击率，
 *   它们将首先按照技能/物品的顺序进行，
 *   然后按照用户状态的优先顺序进行。
 *   除非另有说明，否则同一notetag效果的多个条目可以相互堆叠。
 *
 *   <Custom Critical Rate: effect, nonstackable>
 *   - 使用上面的注释标记格式，并在效果的末尾加上'nonstackable'，
 *   将使它不能与其他相同类型的nonstackable
 *   因此，不管效果是强还是弱，只有相似效果的第一个条目才会通过。
 *   它将首先按照技能/项目的顺序进行，然后按照用户状态的优先顺序进行。
 *   并非所有的效果都是nonstackable。
 *   下面列出的效果将表明它们是否可以nonstackable。
 *   ...
 *
 * =-=-=-= 效果条件 =-=-=-=
 *
 *   --- User Param Rate ---
 *
 *   <Custom Critical Rate: x Pride y%>
 *   <Custom Critical Rate: x Pride y%, nonstackable>
 *   - 将“x”替换为“HP”、“MP”或“TP”。
 *   这将使用攻击者当前的生命值、MP值或TP值作为临界命中率修正值。
 *   将“y”替换为您希望该修饰符发挥作用的百分比值。
 *   攻击者的HP、MP或TP率越高，修改器越高。
 *   SUGGESTED BY: Yanfly
 *
 *   <Custom Critical Rate: x Crisis y%>
 *   <Custom Critical Rate: x Crisis y%, nonstackable>
 *   - Replace 'x' with 'HP', 'MP', or 'TP'. This will use the attacker's
 *   current HP, MP, or TP rate as a critical hit rate modifier. Replace 'y'
 *   with a percentage value on how much you'd want this modifier to matter.
 *   The higher the attacker's HP, MP, or TP rate, the higher the modifier.
 *   SUGGESTED BY: Yanfly
 *
 *   --- Target Param Rate ---
 *
 *   <Custom Critical Rate: x Hero y%>
 *   <Custom Critical Rate: x Hero y%, nonstackable>
 *   - Replace 'x' with 'HP', 'MP', or 'TP'. This will use the defender's
 *   current HP, MP, or TP rate as a critical hit rate modifier. Replace 'y'
 *   with a percentage value on how much you'd want this modifier to matter.
 *   The higher the defender's HP, MP, or TP rate, the higher the modifier.
 *   SUGGESTED BY: Yanfly
 *
 *   <Custom Critical Rate: x Bully y%>
 *   <Custom Critical Rate: x Bully y%, nonstackable>
 *   - Replace 'x' with 'HP', 'MP', or 'TP'. This will use the defender's
 *   current HP, MP, or TP rate as a critical hit rate modifier. Replace 'y'
 *   with a percentage value on how much you'd want this modifier to matter.
 *   The higher the defender's HP, MP, or TP rate, the higher the modifier.
 *   SUGGESTED BY: Yanfly
 *
 *   --- Element Rate ---
 *
 *   <Custom Critical Rate: Element Rate x%>
 *   <Custom Critical Rate: Element Rate x%, nonstackable>
 *   - If the current action has an element attached to it, this effect will
 *   adjust the critical hit rate based off the target's damage rate against
 *   the action's element. Replace 'x' with a percentage value of how much you
 *   want the element rate to influence the critical hit rate.
 *   SUGGESTED BY: Yanfly
 *
 *   --- State Modifiers ---
 *
 *   <Custom Critical Rate: User States +x%>
 *   <Custom Critical Rate: User States -x%>
 *   <Custom Critical Rate: User States +x%, nonstackable>
 *   <Custom Critical Rate: User States -x%, nonstackable>
 *   - Alters the critical rate for the current action based off the number of
 *   states the user has. The amount altered will be determined by the percent
 *   'x' to increase/decrease the current critical hit rate per state.
 *   SUGGESTED BY: Yanfly
 *
 *   <Custom Critical Rate: Target States +x%>
 *   <Custom Critical Rate: Target States -x%>
 *   <Custom Critical Rate: Target States +x%, nonstackable>
 *   <Custom Critical Rate: Target States -x%, nonstackable>
 *   - Alters the critical rate for the current action based off the number of
 *   states the target has. The amount altered will be determined by the
 *   percent 'x' to increase/decrease the current critical hit rate per state.
 *   SUGGESTED BY: Yanfly
 *
 *   --- Buff Modifiers ---
 *
 *   <Custom Critical Rate: User Buffs +x%>
 *   <Custom Critical Rate: User Buffs -x%>
 *   <Custom Critical Rate: User Buffs +x%, nonstackable>
 *   <Custom Critical Rate: User Buffs -x%, nonstackable>
 *   - Alters the critical rate for the current action based off the number of
 *   buff types the user has. The amount altered will be determined by the
 *   percent 'x' to increase/decrease the current critical hit rate per buff
 *   type. This does not include the stacks per buff.
 *   SUGGESTED BY: Yanfly
 *
 *   <Custom Critical Rate: Target States +x%>
 *   <Custom Critical Rate: Target States -x%>
 *   <Custom Critical Rate: Target States +x%, nonstackable>
 *   <Custom Critical Rate: Target States -x%, nonstackable>
 *   - Alters the critical rate for the current action based off the number of
 *   buff types the target has. The amount altered will be determined by the
 *   percent 'x' to increase/decrease the current critical hit rate per buff
 *   type. This does not include the stacks per buff.
 *   SUGGESTED BY: Yanfly
 *
 *   --- Debuff Modifiers ---
 *
 *   <Custom Critical Rate: User Buffs +x%>
 *   <Custom Critical Rate: User Buffs -x%>
 *   <Custom Critical Rate: User Buffs +x%, nonstackable>
 *   <Custom Critical Rate: User Buffs -x%, nonstackable>
 *   - Alters the critical rate for the current action based off the number of
 *   debuff types the user has. The amount altered will be determined by the
 *   percent 'x' to increase/decrease the current critical hit rate per debuff
 *   type. This does not include the stacks per debuff.
 *   SUGGESTED BY: Yanfly
 *
 *   <Custom Critical Rate: Target States +x%>
 *   <Custom Critical Rate: Target States -x%>
 *   <Custom Critical Rate: Target States +x%, nonstackable>
 *   <Custom Critical Rate: Target States -x%, nonstackable>
 *   - Alters the critical rate for the current action based off the number of
 *   debuff types the target has. The amount altered will be determined by the
 *   percent 'x' to increase/decrease the current critical hit rate per debuff
 *   type. This does not include the stacks per debuff.
 *   SUGGESTED BY: Yanfly
 *
 * =-=-=-= Effect EXAMPLES =-=-=-=
 *
 *   <Custom Critical Rate: TP Pride 50%>
 *   - This will raise the user's critical hit rate relative to the user's
 *   current TP rate up to 50% (every 1 TP will add 0.5% critical hit rate).
 *
 *   <Custom Critical Rate: HP Crisis 200%>
 *   <Custom Critical Rate: HP Hero 50%>
 *   - This will raise the user's critical hit rate based off how low the
 *   user's current HP is and how high the target's current HP is. For every
 *   1% HP the user is missing, the critical hit rate will increase by 2% and
 *   for every 1% HP the target has, the critical hit rate will also increase
 *   by 0.5%.
 *
 *   <Custom Critical Rate: Element Rate 100%>
 *   - This will alter the user's critical hit rate against the target if the
 *   current action is elemental. If the target is 200% weak to the element,
 *   then the critical hit rate will also be increased by 200%. If the target
 *   is 50% resistant against the element, then the critical hit rate will also
 *   be adjusted to be 50% lower.
 *
 *   <Custom Critical Rate: Target States +5%>
 *   - This will raise the user's critical hit rate by 5% for every state the
 *   target is affected by.
 *
 *   <Custom Critical Rate: User Buffs +3%>
 *   <Custom Critical Rate: Target Debuffs +6%>
 *   - This will raise the user's critical hit rate by 3% for every buff the
 *   user has and by 6% for every debuff the target has.
 *
 * ============================================================================
 * Lunatic Mode - Effect Code
 * ============================================================================
 *
 * For experienced users that know JavaScript and have RPG Maker MV 1.5.0+, you
 * can add new notetag effects that can be used by the plugin or alter the
 * effects of currently existing notetag effects from the plugin parameters
 * entry: Effect Code. It should look something like this:
 *
 * ---
 *
 * // ---------------
 * // User Param Rate
 * // ---------------
 * if (data.match(/(.*)[ ]PRIDE[ ](\d+)([%％])/i)) {
 *   var param = String(RegExp.$1).toUpperCase();
 *   var modifier = parseFloat(RegExp.$2) * 0.01;
 *   if (param === 'HP') {
 *     var paramRate = user.hpRate();
 *     if (nonstack) {
 *       stackCheck = this._stackHpPride;
 *       this._stackHpPride = true;
 *     }
 *   } else if (param === 'MP') {
 *     var paramRate = user.mpRate();
 *     if (nonstack) {
 *       stackCheck = this._stackMpPride;
 *       this._stackMpPride = true;
 *     }
 *   } else if (param === 'TP') {
 *     var paramRate = user.tpRate();
 *     if (nonstack) {
 *       stackCheck = this._stackTpPride;
 *       this._stackTpPride = true;
 *     }
 *   } else {
 *     skip = true;
 *   }
 *   rate += paramRate * modifier;
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
 *   rate                   The current critical hit rate to be returned
 *
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
 *   nonstack               Returns if effect's nonstacking or not (true/false)
 *   stackCheck             If true, it will autoskip the current effect
 *
 *   skip                   Default: false. If true, returns the previous rate
 *
 * ---
 *
 * If you need to revert the Effect Code back to its original state, delete the
 * plugin from your plugin manager list and then add it again. The code will be
 * back to default.
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
 * @desc LUNATIC MODE: 这是用于每个注释标签效果的代码。
 * 请参考此处使用的变量的帮助文件。
 * @default "// ---------------\n// User Param Rate\n// ---------------\nif (data.match(/(.*)[ ]PRIDE[ ](\\d+)([%％])/i)) {\n  var param = String(RegExp.$1).toUpperCase();\n  var modifier = parseFloat(RegExp.$2) * 0.01;\n  if (param === 'HP') {\n    var paramRate = user.hpRate();\n    if (nonstack) {\n      stackCheck = this._stackHpPride;\n      this._stackHpPride = true;\n    }\n  } else if (param === 'MP') {\n    var paramRate = user.mpRate();\n    if (nonstack) {\n      stackCheck = this._stackMpPride;\n      this._stackMpPride = true;\n    }\n  } else if (param === 'TP') {\n    var paramRate = user.tpRate();\n    if (nonstack) {\n      stackCheck = this._stackTpPride;\n      this._stackTpPride = true;\n    }\n  } else {\n    skip = true;\n  }\n  rate += paramRate * modifier;\n\n} else if (data.match(/(.*)[ ]CRISIS[ ](\\d+)([%％])/i)) {\n  var param = String(RegExp.$1).toUpperCase();\n  var modifier = parseFloat(RegExp.$2) * 0.01;\n  if (param === 'HP') {\n    var paramRate = 1 - user.hpRate();\n    if (nonstack) {\n      stackCheck = this._stackHpCrisis;\n      this._stackHpCrisis = true;\n    }\n  } else if (param === 'MP') {\n    var paramRate = 1 - user.mpRate();\n    if (nonstack) {\n      stackCheck = this._stackMpCrisis;\n      this._stackMpCrisis = true;\n    }\n  } else if (param === 'TP') {\n    var paramRate = 1 - user.tpRate();\n    if (nonstack) {\n      stackCheck = this._stackTpCrisis;\n      this._stackTpCrisis = true;\n    }\n  } else {\n    skip = true;\n  }\n  rate += paramRate * modifier;\n\n// -----------------\n// Target Param Rate\n// -----------------\n} else if (data.match(/(.*)[ ]HERO[ ](\\d+)([%％])/i)) {\n  var param = String(RegExp.$1).toUpperCase();\n  var modifier = parseFloat(RegExp.$2) * 0.01;\n  if (param === 'HP') {\n    var paramRate = target.hpRate();\n    if (nonstack) {\n      stackCheck = this._stackHpHero;\n      this._stackHpHero = true;\n    }\n  } else if (param === 'MP') {\n    var paramRate = target.mpRate();\n    if (nonstack) {\n      stackCheck = this._stackMpHero;\n      this._stackMpHero = true;\n    }\n  } else if (param === 'TP') {\n    var paramRate = target.tpRate();\n    if (nonstack) {\n      stackCheck = this._stackTpHero;\n      this._stackTpHero = true;\n    }\n  } else {\n    skip = true;\n  }\n  rate += paramRate * modifier;\n\n} else if (data.match(/(.*)[ ]BULLY[ ](\\d+)([%％])/i)) {\n  var param = String(RegExp.$1).toUpperCase();\n  var modifier = parseFloat(RegExp.$2) * 0.01;\n  if (param === 'HP') {\n    var paramRate = 1 - target.hpRate();\n    if (nonstack) {\n      stackCheck = this._stackHpBully;\n      this._stackHpBully = true;\n    }\n  } else if (param === 'MP') {\n    var paramRate = 1 - target.mpRate();\n    if (nonstack) {\n      stackCheck = this._stackMpBully;\n      this._stackMpBully = true;\n    }\n  } else if (param === 'TP') {\n    var paramRate = 1 - target.tpRate();\n    if (nonstack) {\n      stackCheck = this._stackTpBully;\n      this._stackTpBully = true;\n    }\n  } else {\n    skip = true;\n  }\n  rate += paramRate * modifier;\n\n// ------------\n// Element Rate\n// ------------\n} else if (data.match(/ELEMENT RATE[ ](\\d+)([%％])/i)) {\n  if (nonstack) {\n    stackCheck = this._stackAddElementRate;\n    this._stackAddElementRate = true;\n  }\n  var modifier = parseFloat(RegExp.$1) * 0.01;\n  var eleRate = this.calcElementRate(target);\n  rate *= eleRate * modifier;\n\n// ---------------\n// State Modifiers\n// ---------------\n} else if (data.match(/USER STATES[ ]([\\+\\-]\\d+)([%％])/i)) {\n  if (nonstack) {\n    stackCheck = this._stackUserStates;\n    this._stackUserStates = true;\n  }\n  var modifier = parseFloat(RegExp.$1) * 0.01;\n  var total = user.states().length;\n  rate += total * modifier;\n\n} else if (data.match(/TARGET STATES[ ]([\\+\\-]\\d+)([%％])/i)) {\n  if (nonstack) {\n    stackCheck = this._stackTargetStates;\n    this._stackTargetStates = true;\n  }\n  var modifier = parseFloat(RegExp.$1) * 0.01;\n  var total = target.states().length;\n  rate += total * modifier;\n\n// --------------\n// Buff Modifiers\n// --------------\n} else if (data.match(/USER BUFFS[ ]([\\+\\-]\\d+)([%％])/i)) {\n  if (nonstack) {\n    stackCheck = this._stackUserBuffs;\n    this._stackUserBuffs = true;\n  }\n  var modifier = parseFloat(RegExp.$1) * 0.01;\n  var total = user.totalBuffs();\n  rate += total * modifier;\n\n} else if (data.match(/USER DEBUFFS[ ]([\\+\\-]\\d+)([%％])/i)) {\n  if (nonstack) {\n    stackCheck = this._stackUserDebuffs;\n    this._stackUserDebuffs = true;\n  }\n  var modifier = parseFloat(RegExp.$1) * 0.01;\n  var total = user.totalDebuffs();\n  rate += total * modifier;\n\n// ----------------\n// Debuff Modifiers\n// ----------------\n} else if (data.match(/TARGET BUFFS[ ]([\\+\\-]\\d+)([%％])/i)) {\n  if (nonstack) {\n    stackCheck = this._stackTargetBuffs;\n    this._stackTargetBuffs = true;\n  }\n  var modifier = parseFloat(RegExp.$1) * 0.01;\n  var total = target.totalBuffs();\n  rate += total * modifier;\n\n} else if (data.match(/TARGET DEBUFFS[ ]([\\+\\-]\\d+)([%％])/i)) {\n  if (nonstack) {\n    stackCheck = this._stackTargetDebuffs;\n    this._stackTargetDebuffs = true;\n  }\n  var modifier = parseFloat(RegExp.$1) * 0.01;\n  var total = target.totalDebuffs();\n  rate += total * modifier;\n\n// -------------------------------\n// Add new effects above this line\n// -------------------------------\n} else {\n  skip = true;\n}"
 *
 */
//=============================================================================

Yanfly.PluginRequirements = function() {
  return Imported.YEP_BattleEngineCore &&
         Imported.YEP_DamageCore &&
         Imported.YEP_X_CriticalControl;
};

if (Yanfly.PluginRequirements()) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_Z_CriticalSway');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.LunCriSwayEffect = JSON.parse(Yanfly.Parameters['Effect Code']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.LunCriSway.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.LunCriSway.DataManager_isDatabaseLoaded.call(this)) return false;

  if (!Yanfly._loaded_YEP_Z_CriticalSway) {
    this.processLunCriSwayNotetags1($dataSkills);
    this.processLunCriSwayNotetags1($dataItems);
    this.processLunCriSwayNotetags1($dataStates);
    Yanfly._loaded_YEP_Z_CriticalSway = true;
  }
  
  return true;
};

DataManager.processLunCriSwayNotetags1 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.customCriticalRates = [];

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<CUSTOM[ ](?:CRITICAL|CRIT)[ ]RATE:[ ](.*)>/i)) {
        var data = String(RegExp.$1);
        obj.customCriticalRates.push(data);
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
// Game_BattlerBase
//=============================================================================

Game_BattlerBase.prototype.totalBuffs = function() {
  var value = 0;
  for (var i = 0; i < 8; ++i) {
    if (this.isBuffAffected(i)) value += 1;
  }
  return value;
};

Game_BattlerBase.prototype.totalDebuffs = function() {
  var value = 0;
  for (var i = 0; i < 8; ++i) {
    if (this.isDebuffAffected(i)) value += 1;
  }
  return value;
};

//=============================================================================
// Game_Action
//=============================================================================

Yanfly.LunCriSway.Game_Action_itemCri = Game_Action.prototype.itemCri;
Game_Action.prototype.itemCri = function(target) {
  if (!this.item().damage.critical) return 0;
  var rate = Yanfly.LunCriSway.Game_Action_itemCri.call(this, target);
  rate = this.applyCustomCriticalRates(target, rate);
  return rate;
};

Game_Action.prototype.applyCustomCriticalRates = function(target, rate) {
  var effects = [];
  effects = effects.concat(this.item().customCriticalRates);
  var states = this.subject().states();
  var length = states.length;
  for (var i = 0; i < length; ++i) {
    var state = states[i];
    if (state && state.customCriticalRates) {
      effects = effects.concat(state.customCriticalRates);
    }
  }
  var length = effects.length;
  for (var i = 0; i < length; ++i) {
    var data = effects[i];
    rate = this.customCritRateEval(target, rate, data);
  }
  return rate;
};

Game_Action.prototype.customCritRateEval = function(target, rate, data) {
  var prevRate = rate;
  var item = this.item();
  var skill = this.item();
  var isSkill = DataManager.isSkill(skill);
  var isItem = DataManager.isSkill(item);
  var user = this.subject();
  var a = user;
  var subject = user;
  var b = target;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  var userPreviousResult = JsonEx.makeDeepCopy(user._result);
  var targetPreviousResult = JsonEx.makeDeepCopy(target._result);

  var nonstack = data.match(/(?:NONSTACK|NON-STACK|NO STACK)/i)
  var stackCheck = false;

  var skip = false;

  var code = Yanfly.Param.LunCriSwayEffect;
  try {
    eval(code)
  } catch (e) {
    Yanfly.Util.displayError(e, code, 'LUNATIC CUSTOM CRITICAL RATES ERROR');
  }

  if (user.isDead()) user.performCollapse();
  if (target.isDead()) target.performCollapse();
  user._result = userPreviousResult;
  target._result = targetPreviousResult;

  if (nonstack && stackCheck) skip = true;

  if (skip) {
    return prevRate
  } else {
    return rate;
  }
};

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

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

// ---------------
// User Param Rate
// ---------------
if (data.match(/(.*)[ ]PRIDE[ ](\d+)([%％])/i)) {
  var param = String(RegExp.$1).toUpperCase();
  var modifier = parseFloat(RegExp.$2) * 0.01;
  if (param === 'HP') {
    var paramRate = user.hpRate();
    if (nonstack) {
      stackCheck = this._stackHpPride;
      this._stackHpPride = true;
    }
  } else if (param === 'MP') {
    var paramRate = user.mpRate();
    if (nonstack) {
      stackCheck = this._stackMpPride;
      this._stackMpPride = true;
    }
  } else if (param === 'TP') {
    var paramRate = user.tpRate();
    if (nonstack) {
      stackCheck = this._stackTpPride;
      this._stackTpPride = true;
    }
  } else {
    skip = true;
  }
  rate += paramRate * modifier;

} else if (data.match(/(.*)[ ]CRISIS[ ](\d+)([%％])/i)) {
  var param = String(RegExp.$1).toUpperCase();
  var modifier = parseFloat(RegExp.$2) * 0.01;
  if (param === 'HP') {
    var paramRate = 1 - user.hpRate();
    if (nonstack) {
      stackCheck = this._stackHpCrisis;
      this._stackHpCrisis = true;
    }
  } else if (param === 'MP') {
    var paramRate = 1 - user.mpRate();
    if (nonstack) {
      stackCheck = this._stackMpCrisis;
      this._stackMpCrisis = true;
    }
  } else if (param === 'TP') {
    var paramRate = 1 - user.tpRate();
    if (nonstack) {
      stackCheck = this._stackTpCrisis;
      this._stackTpCrisis = true;
    }
  } else {
    skip = true;
  }
  rate += paramRate * modifier;

// -----------------
// Target Param Rate
// -----------------
} else if (data.match(/(.*)[ ]HERO[ ](\d+)([%％])/i)) {
  var param = String(RegExp.$1).toUpperCase();
  var modifier = parseFloat(RegExp.$2) * 0.01;
  if (param === 'HP') {
    var paramRate = target.hpRate();
    if (nonstack) {
      stackCheck = this._stackHpHero;
      this._stackHpHero = true;
    }
  } else if (param === 'MP') {
    var paramRate = target.mpRate();
    if (nonstack) {
      stackCheck = this._stackMpHero;
      this._stackMpHero = true;
    }
  } else if (param === 'TP') {
    var paramRate = target.tpRate();
    if (nonstack) {
      stackCheck = this._stackTpHero;
      this._stackTpHero = true;
    }
  } else {
    skip = true;
  }
  rate += paramRate * modifier;

} else if (data.match(/(.*)[ ]BULLY[ ](\d+)([%％])/i)) {
  var param = String(RegExp.$1).toUpperCase();
  var modifier = parseFloat(RegExp.$2) * 0.01;
  if (param === 'HP') {
    var paramRate = 1 - target.hpRate();
    if (nonstack) {
      stackCheck = this._stackHpBully;
      this._stackHpBully = true;
    }
  } else if (param === 'MP') {
    var paramRate = 1 - target.mpRate();
    if (nonstack) {
      stackCheck = this._stackMpBully;
      this._stackMpBully = true;
    }
  } else if (param === 'TP') {
    var paramRate = 1 - target.tpRate();
    if (nonstack) {
      stackCheck = this._stackTpBully;
      this._stackTpBully = true;
    }
  } else {
    skip = true;
  }
  rate += paramRate * modifier;

// ------------
// Element Rate
// ------------
} else if (data.match(/ELEMENT RATE[ ](\d+)([%％])/i)) {
  if (nonstack) {
    stackCheck = this._stackAddElementRate;
    this._stackAddElementRate = true;
  }
  var modifier = parseFloat(RegExp.$1) * 0.01;
  var eleRate = this.calcElementRate(target);
  rate *= eleRate * modifier;

// ---------------
// State Modifiers
// ---------------
} else if (data.match(/USER STATES[ ]([\+\-]\d+)([%％])/i)) {
  if (nonstack) {
    stackCheck = this._stackUserStates;
    this._stackUserStates = true;
  }
  var modifier = parseFloat(RegExp.$1) * 0.01;
  var total = user.states().length;
  rate += total * modifier;

} else if (data.match(/TARGET STATES[ ]([\+\-]\d+)([%％])/i)) {
  if (nonstack) {
    stackCheck = this._stackTargetStates;
    this._stackTargetStates = true;
  }
  var modifier = parseFloat(RegExp.$1) * 0.01;
  var total = target.states().length;
  rate += total * modifier;

// --------------
// Buff Modifiers
// --------------
} else if (data.match(/USER BUFFS[ ]([\+\-]\d+)([%％])/i)) {
  if (nonstack) {
    stackCheck = this._stackUserBuffs;
    this._stackUserBuffs = true;
  }
  var modifier = parseFloat(RegExp.$1) * 0.01;
  var total = user.totalBuffs();
  rate += total * modifier;

} else if (data.match(/USER DEBUFFS[ ]([\+\-]\d+)([%％])/i)) {
  if (nonstack) {
    stackCheck = this._stackUserDebuffs;
    this._stackUserDebuffs = true;
  }
  var modifier = parseFloat(RegExp.$1) * 0.01;
  var total = user.totalDebuffs();
  rate += total * modifier;

// ----------------
// Debuff Modifiers
// ----------------
} else if (data.match(/TARGET BUFFS[ ]([\+\-]\d+)([%％])/i)) {
  if (nonstack) {
    stackCheck = this._stackTargetBuffs;
    this._stackTargetBuffs = true;
  }
  var modifier = parseFloat(RegExp.$1) * 0.01;
  var total = target.totalBuffs();
  rate += total * modifier;

} else if (data.match(/TARGET DEBUFFS[ ]([\+\-]\d+)([%％])/i)) {
  if (nonstack) {
    stackCheck = this._stackTargetDebuffs;
    this._stackTargetDebuffs = true;
  }
  var modifier = parseFloat(RegExp.$1) * 0.01;
  var total = target.totalDebuffs();
  rate += total * modifier;

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
text += 'YEP_Z_CriticalSway without the required plugins. Please visit ';
text += 'Yanfly.moe and install the required plugins neede for this plugin ';
text += 'found in this plugin\'s help file before you can use it.';
console.log(text);
require('nw.gui').Window.get().showDevTools();

}; // Yanfly.PluginRequirements