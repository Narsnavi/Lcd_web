//=============================================================================
// Yanfly Engine Plugins - Buffs & States Extension - Extended Damage Over Time
// YEP_X_ExtDoT.js
//=============================================================================

if (Imported.YEP_BattleEngineCore && Imported.YEP_BuffsStatesCore) {

var Imported = Imported || {};
Imported.YEP_X_ExtDoT = true;

var Yanfly = Yanfly || {};
Yanfly.EDoT = Yanfly.EDoT || {};
Yanfly.EDoT.version = 1.04;

//=============================================================================
 /*:
 * @plugindesc v1.04 持续伤害和治疗(需要 YEP_BattleEngineCore & YEP_BuffsStatesCore)
 * Create custom DoT formulas and effects with ease.
 * @author Yanfly Engine Plugins + Tigress Collaboration
 *
 * @param ---Defaults---
 * @default
 *
 * @param Regen Animation
 * @parent ---Defaults---
 * @type animation
 * @desc 创建重生状态时，这将是默认动画。
 * 0时离开，不播放动画。
 * @default 46
 *
 * @param DoT Animation
 * @type animation
 * @desc 当创建DoT状态时，这将是默认动画。
 * 0时离开，不播放动画。
 * @default 59
 *
 * @param Default Variance
 * @type number
 * @desc 这是扩展DoT公式的默认方差值
 * 留在0，没有差异。
 * @default 20
 *
 * @param Default Element
 * @type number
 * @desc 这是用于扩展DoT公式的默认元素。
 * 0表示没有元素。
 * @default 0
 *
 * @help
 * ============================================================================
 * 正式介绍
 * ============================================================================
 *
 * 此插件需要YEP_BattleEngineCore && YEP_BuffsStatesCore. 
 * 确保该插件位于插件列表中的YEP_BattleEngineCore 和
 * YEP_BuffsStatesCore 下。
 *
 * RPG Maker MV不提供对任何伤害或随时间愈合的状态
 * 效果使用定制公式的能力。这个插件，
 * 通过Yanfly's Buffs & States Core,的帮助，
 * 将允许使用公式来创建自定义的伤害或随时间愈合值，
 * 动画，方差控制和元素比率方面。
 *
 * This is a collaboration plugin by Tigress and Yanfly to ensure compatibility
 * with the Yanfly Engine Plugins library.
 *
 * ============================================================================
 * 注释标记
 * ============================================================================
 *
 * 在你的状态中插入下面的注释标签，以获得它们各自的
 * 随时间推移的伤害效果。
 *
 * 状态注释标签:
 *
 *    ---
 *
 *   <Regen Animation: x>
 *   <DoT Animation: x>
 *   - 如果有任何治疗或伤害是通过下面使用的延长伤害时间
 *   公式造成的，这将使状态动画x随着时间的推移而
 *   再生/伤害。
 *
 *   例子:
 *     <Regen Animation: 41>  // Play animation 41 when regen occurs
 *     <DoT Animation: 59>    // Play animation 59 when DoT occurs
 *
 *   * 注意:只有当动画与下列公式之一一起使用并且公式不产
 *   生0值时，才会出现动画。
 *
 *   ---
 *
 *   <Regen Formula: x>
 *   - 这将使受影响的战斗者每回合恢复x点生命值。您可以
 *   使用公式或数值来代替“x”。
 *
 *   例子:
 *     <Regen Formula: 100>        // Regen 100 HP exactly each turn
 *     <Regen Formula: a.mdf * 2>  // Regen HP equal to the origin's MDF
 *
 *   ---
 *
 *   <DoT Formula: x>
 *   - 这将使受影响的战斗者每回合受到x点生命值的伤害。
 *   您可以使用公式或数值来代替“x”。
 *
 *   例子:
 *     <DoT Formula: 100>        // Damage 100 HP exactly each turn
 *     <DoT Formula: a.mat * 2>  // Damage HP equal to the origin's MAT
 *
 *   ---
 *
 *   <Regen Element: x>
 *   <DoT Element: x>
 *   - 这将使这个状态造成的治疗/伤害成为元素“x”。
 *   这将考虑目标对该元素的元素比率。
 *   如果留空，将没有元素修饰符。
 *
 *   例子:
 *     <Regen Element: 4>   // Healing done will be affected by element 4.
 *     <DoT Element: 5>     // Damage done will be affected by element 5.
 *
 *   ---
 *
 *   <Regen Variance: x%>
 *   <DoT Variance: x%>
 *   - 您希望DoT效果具有的方差量。
 *   用百分比值替换x。如果留空，
 *   默认情况下将使用插件参数中的设置。
 *
 *   例子:
 *     <Regen Variance: 10%>   // Regen will have 10% healing variance
 *     <DoT Variance: 20%>     // DoT will have 20% damage variance
 *
 * ============================================================================
 * Lunatic Mode - 自定义点公式
 * ============================================================================
 *
 * 对于那些有JavaScript经验的人来说，并希望创建更复
 * 杂的公式来定制随时间变化的伤害/治疗状态，您可以使
 * 用下面的注释标签。
 *
 * 状态注释标签:
 *
 *   ---
 *
 *   <Custom DoT Formula>
 *    if (a.isActor()) {
 *      value = a.level * 100;
 *      variance = 20;
 *      element = 1;
 *    } else {
 *      value = a.hp / 50;
 *      variance = 10;
 *      element = 2;
 *    }
 *   </Custom DoT Formula>
 *   - 造成的伤害将等于'value'。这是主要由公式单独造成的
 *   基础伤害。要处理的最终伤害将受到
 *   'variance'和'element'值的影响，这些值也可以在此公式中更改。
 *   如果公式中没有'variance'或'element'它们将采用默认值。
 *   如果你要制造一个治疗效果，
 *   使用下面的标签。
 *
 *   ---
 *
 *   <Custom Regen Formula>
 *    if (a.isActor()) {
 *      value = a.level * 8;
 *      variance = 15;
 *      element = 3;
 *    } else {
 *      value = a.hp / 2;
 *      variance = 5;
 *      element = 4;
 *    }
 *   </Custom Regen Formula>
 *   - 治疗效果将等同于'value'。
 *  这是主要由公式单独处理的基础治疗。
 *   要处理的最终治疗将受到'variance'和'element'值的影响，
 *   这些值也可以在此公式中更改。如果公式中没有'variance'或'element'，
 *   它们将采用默认值。如果你想造成一种
 *   破坏性的影响，就用这个上面的标签。
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.04:
 * - Bypass the isDevToolsOpen() error when bad code is inserted into a script
 * call or custom Lunatic Mode code segment due to updating to MV 1.6.1.
 *
 * Version 1.03:
 * - Updated for RPG Maker MV version 1.6.1.
 *
 * Version 1.02:
 * - Made DoT effects battle only to prevent errors and crashes.
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

Yanfly.Parameters = PluginManager.parameters('YEP_X_ExtDoT');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.EDoTRegenAni = Number(Yanfly.Parameters['Regen Animation']);
Yanfly.Param.EDoTDamageAni = Number(Yanfly.Parameters['DoT Animation']);
Yanfly.Param.EDoTDefVariance = Number(Yanfly.Parameters['Default Variance']);
Yanfly.Param.EDoTDefElement = Number(Yanfly.Parameters['Default Element']);

//=============================================================================
// DataManager
// ----------------------------------------------------------------------------
// Notetags added by Yanfly
//=============================================================================

Yanfly.EDoT.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.EDoT.DataManager_isDatabaseLoaded.call(this)) return false;

  if (!Yanfly._loaded_YEP_X_ExtDoT) {
    this.processEDoTNotetags1($dataStates);
    Yanfly._loaded_YEP_X_ExtDoT = true;
  }
  
  return true;
};

DataManager.processEDoTNotetags1 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.dotAnimation = 0;
    obj.dotElement = Yanfly.Param.EDoTDefElement;
    obj.dotVariance = Yanfly.Param.EDoTDefVariance;
    var evalMode = 'none';
    obj.dotFormula = '';

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:REGEN|DOT) ANIMATION:[ ](\d+)>/i)) {
        obj.dotAnimation = parseInt(RegExp.$1);
      } else if (line.match(/<(?:REGEN|REGENERATE) FORMULA:[ ](.*)>/i)) {
        var formula = String(RegExp.$1);
        obj.dotFormula = 'value = Math.max(0, ' + formula + ');\n';
        obj.dotFormula += 'healing = true;'
        if (obj.dotAnimation === 0) {
          obj.dotAnimation = Yanfly.Param.EDoTRegenAni;
        }
      } else if (line.match(/<(?:DOT|DAMAGE OVER TIME) FORMULA:[ ](.*)>/i)) {
        var formula = String(RegExp.$1);
        obj.dotFormula = 'value = Math.max(0, ' + formula + ');\n';
        obj.dotFormula += 'healing = false;'
        if (obj.dotAnimation === 0) {
          obj.dotAnimation = Yanfly.Param.EDoTDamageAni;
        }
      } else if (line.match(/<(?:REGEN|DOT) VARIANCE:[ ](\d+)([%％])>/i)) {
        obj.dotVariance = parseInt(RegExp.$1);
      } else if (line.match(/<(?:REGEN|DOT) ELEMENT:[ ](\d+)>/i)) {
        obj.dotElement = parseInt(RegExp.$1);
      } else if (line.match(/<(?:CUSTOM REGEN FORMULA)>/i)) {
        evalMode = 'custom dot formula';
      } else if (line.match(/<\/(?:CUSTOM REGEN FORMULA)>/i)) {
        obj.dotFormula += 'healing = true';
        evalMode = 'none';
      } else if (line.match(/<(?:CUSTOM DOT FORMULA)>/i)) {
        evalMode = 'custom dot formula';
      } else if (line.match(/<\/(?:CUSTOM DOT FORMULA)>/i)) {
        obj.dotFormula += 'healing = false';
        evalMode = 'none';
      } else if (evalMode === 'custom dot formula') {
        obj.dotFormula += line + '\n';
      }
    }
  }
};

//=============================================================================
// Game_Battler
// ----------------------------------------------------------------------------
// Compatibility with YEP_BuffsStatesCore
//=============================================================================

Yanfly.EDoT.Game_Battler_regenerateAll = Game_Battler.prototype.regenerateAll;
Game_Battler.prototype.regenerateAll = function() {
  if (this.isAlive() && $gameParty.inBattle()) {
    this.processDamageOverTimeStates();
  }
  Yanfly.EDoT.Game_Battler_regenerateAll.call(this);
};

Game_Battler.prototype.processDamageOverTimeStates = function() {
  if (!$gameParty.inBattle()) return;
  var result = JsonEx.makeDeepCopy(this._result);
  var states = this.states();
  while (states.length > 0) {
    var state = states.shift();
    if (state) {
      this.processDamageOverTimeStateEffect(state);
    }
  }
  this._result = result;
};

Game_Battler.prototype.processDamageOverTimeStateEffect = function(state) {
  var stateId = state.id;
  var state = $dataStates[stateId];
  if (!state) return;
  if (state.dotFormula === '') return;
  var a = this.stateOrigin(stateId);
  var b = this;
  var user = this;
  var target = this;
  var origin = this.stateOrigin(stateId);
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  var healing = false;
  var variance = state.dotVariance;
  var element = state.dotElement;
  var code = state.dotFormula;
  try {
    eval(code);
    if (healing) {
      value = Math.abs(Math.max(0, value));
    } else {
      value = Math.abs(Math.max(0, value)) * -1;
    }
    value = this.applyDamageOverTimeVariance(value, variance);
    value = this.applyDamageOverTimeElement(value, element);
    value = Math.round(value);
    if (value !== 0) {
      this.clearResult();
      this.gainHp(value);
      this.startDamagePopup();
      if (state.dotAnimation > 0) {
        this.startAnimation(state.dotAnimation);
      }
      if (this.isDead()) {
        this.performCollapse();
      }
      this.clearResult();
    }
  } catch (e) {
    Yanfly.Util.displayError(e, code, 'CUSTOM DOT ' + stateId + ' CODE ERROR');
  }
};

Game_Battler.prototype.applyDamageOverTimeVariance = function(damage, vari) {
  if (vari === 0) return damage;
  var variance = vari;
  var amp = Math.floor(Math.max(Math.abs(damage) * variance / 100, 0));
  var v = Math.randomInt(amp + 1) + Math.randomInt(amp + 1) - amp;
  return damage >= 0 ? damage + v : damage - v;
};

Game_Battler.prototype.applyDamageOverTimeElement = function(damage, element) {
  if (element === 0) return damage;
  return damage * this.elementRate(element);
};

//=============================================================================
// Utilities
// ----------------------------------------------------------------------------
// From Yanfly's Utility Library
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
// End of File
//=============================================================================
} else {

var text = '================================================================\n';
text += 'YEP_X_ExtDoT requires YEP_BattleEngineCore and ';
text += 'YEP_BuffsStatesCoreto be at the latest version to run properly. '
text += '\n\nPlease go to www.yanfly.moe and update to the latest version for ';
text += 'the YEP_BattleEngineCore and YEP_BuffsStatesCore plugins.\n';
text += '================================================================\n';
console.log(text);
require('nw.gui').Window.get().showDevTools();

}; // Imported.YEP_BuffsStatesCore