//=============================================================================
// Yanfly Engine Plugins - Hit Accuracy
// YEP_HitAccuracy.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_HitAccuracy = true;

var Yanfly = Yanfly || {};
Yanfly.HA = Yanfly.HA || {};
Yanfly.HA.version = 1.04;

//=============================================================================
 /*:
 * @plugindesc v1.04 命中率
 * RPG Maker MV by giving control to its formula.
 * @author Yanfly Engine Plugins
 *
 * @param ---Formula---
 * @default
 *
 * @param Accuracy Formula
 * @parent ---Formula---
 * @desc 用于确定技能命中率的公式.
 * Variables: skillHitRate, userHitRate, targetEvadeRate
 * @default skillHitRate * (userHitRate - targetEvadeRate)
 *
 * @param Evade Formula
 * @parent ---Formula---
 * @desc 用于确定技能是否被闪避的公式.
 * Variables: skillHitRate, userHitRate, targetEvadeRate
 * @default 0
 *
 * @param ---User Hit Rate---
 * @default
 *
 * @param User Physical Hit
 * @parent ---User Hit Rate---
 * @desc 用于确定玩家物理攻击命中率的公式
 * for physical actions.
 * @default user.hit
 *
 * @param User Magical Hit
 * @parent ---User Hit Rate---
 * @desc 用于确定用玩家技能命中率的公式
 * for magical actions.
 * @default 1.00
 *
 * @param User Certain Hit
 * @parent ---User Hit Rate---
 * @desc 用于玩家某些命中攻击的命中率的公式
 * for certain hit actions.
 * @default 1.00
 *
 * @param ---Target Evade Rate---
 * @default
 *
 * @param Target Physical Evade
 * @parent ---Target Evade Rate---
 * @desc 用于确定目标对物理攻击的闪避率的公式
 * for physical actions.
 * @default target.eva
 *
 * @param Target Magical Evade
 * @parent ---Target Evade Rate---
 * @desc 用于确定目标对技能的闪避避率的公式
 * for magical actions.
 * @default target.mev
 *
 * @param Target Certain Evade
 * @parent ---Target Evade Rate---
 * @desc 用于确定特定命中攻击的目标闪避率的公式
 * for certain hit actions.
 * @default 0.00
 *
 * @help
 * ============================================================================
 * 正式介绍
 * ============================================================================
 *
 * 默认情况下，RPG Maker MV的动作精度公式是不直观的
 * 重要的是，先确定技能的准确性，
 * 然后再确定目标的闪避，不管第一次检查的准确性如何。
 * 这意味着即使攻击者有1000%的命中率，
 * 该技能仍然可以被敌人的5% 闪避率闪避。
 * 因此，这个插件将提供对一个动作的准确性公式和规避公式的控制。
 * 根据这个插件的默认设置，
 * 现在可以计算出攻击者的命中和敌人的经济增加值的相对值
 * 简便的精确度公式.
 *
 * ============================================================================
 * 指令
 * ============================================================================
 *
 * 这个插件可以是即插即用的。
 * 但是，如果你想根据你的喜好修改精度公式，
 * 调整插件参数，改变每个单独的方面.
 *
 * skillHitRate - This is the inherent success rate of the skill/item.
 *
 * userHitRate - 这是玩家的命中率。如果是物理攻击，
 * 默认使用HIT。如果这是一个技能，默认情况下，
 * 它会有100%的修改，这意味着它不会改变成功率.
 *
 * targetEvadeRate - 这是目标的闪避率。
 * 如果是物理攻击，默认使用EVA stat。
 * 如果这是一个特定的攻击，默认情况下会使用MEV属性.
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
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.02:
 * - Lunatic Mode fail safes added.
 *
 * Version 1.01:
 * - Made a correction to the calculation of the skillhitrate so that it's a
 * proper float value instead.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_HitAccuracy');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.HAHitFormula = String(Yanfly.Parameters['Accuracy Formula']);
Yanfly.Param.HAEvaFormula = String(Yanfly.Parameters['Evade Formula']);

Yanfly.Param.HAUserPhysical = String(Yanfly.Parameters['User Physical Hit']);
Yanfly.Param.HAUserMagical = String(Yanfly.Parameters['User Magical Hit']);
Yanfly.Param.HAUserCertain = String(Yanfly.Parameters['User Certain Hit']);

Yanfly.Param.HATarPhysical = String(Yanfly.Parameters['Target Physical Evade']);
Yanfly.Param.HATarMagical = String(Yanfly.Parameters['Target Magical Evade']);
Yanfly.Param.HATarCertain = String(Yanfly.Parameters['Target Certain Evade']);

//=============================================================================
// Game_Action
//=============================================================================

Game_Action.prototype.itemHit = function(target) {
    var item = this.item();
    var skill = this.item();
    var a = this.subject();
    var user = this.subject();
    var subject = this.subject();
    var b = target;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var skillHitRate = this.item().successRate * 0.01;
    var userHitRate = this.userHitRate(target);
    var targetEvadeRate = this.targetEvadeRate(target);
    var code = Yanfly.Param.HAHitFormula;
    try {
      return eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'CUSTOM HIT FORMULA ERROR');
      return false;
    }
};

Game_Action.prototype.itemEva = function(target) {
    var item = this.item();
    var skill = this.item();
    var a = this.subject();
    var user = this.subject();
    var subject = this.subject();
    var b = target;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var skillHitRate = this.item().successRate * 0.01;
    var userHitRate = this.userHitRate(target);
    var targetEvadeRate = this.targetEvadeRate(target);
    var code = Yanfly.Param.HAEvaFormula;
    try {
      return eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'CUSTOM EVA FORMULA ERROR');
      return false;
    }
};

Game_Action.prototype.userHitRate = function(target) {
    var item = this.item();
    var skill = this.item();
    var a = this.subject();
    var user = this.subject();
    var subject = this.subject();
    var b = target;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    if (this.isPhysical()) {
      var code = Yanfly.Param.HAUserPhysical;
    } else if (this.isMagical()) {
      var code = Yanfly.Param.HAUserMagical;
    } else {
      var code = Yanfly.Param.HAUserCertain;
    }
    try {
      return eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'CUSTOM HIT RATE FORMULA ERROR');
      return 0;
    }
};

Game_Action.prototype.targetEvadeRate = function(target) {
    var item = this.item();
    var skill = this.item();
    var a = this.subject();
    var user = this.subject();
    var subject = this.subject();
    var b = target;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    if (this.isPhysical()) {
      var code = Yanfly.Param.HATarPhysical;
    } else if (this.isMagical()) {
      var code = Yanfly.Param.HATarMagical;
    } else {
      var code = Yanfly.Param.HATarCertain;
    }
    try {
      return eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'CUSTOM EVA RATE FORMULA ERROR');
      return 0;
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
// End of File
//=============================================================================
