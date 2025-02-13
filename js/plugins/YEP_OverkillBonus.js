//=============================================================================
// Yanfly Engine Plugins - Overkill Bonus
// YEP_OverkillBonus.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_OverkillBonus = true;

var Yanfly = Yanfly || {};
Yanfly.OKB = Yanfly.OKB || {};
Yanfly.OKB.version = 1.02;

//=============================================================================
 /*:
 * @plugindesc v1.02 过量的额外奖励(经验值、金币、物品)
 * enemies in battle.
 * @author Yanfly Engine Plugins + Tigress Collaboration
 *
 * @param Overkill Formula
 * @desc 每个敌人使用的默认公式，
 * 以及在致命一击中一次命中需要处理多少DMG。
 * @default 0.5 * enemy.mhp
 *
 * @param Overkill Animation
 * @type animation
 * @desc 如果敌人被过量伤害杀死，这个动画将在敌人身上播放。
 * 如果您不想播放任何动画，请将其保留为0。
 * @default 13
 *
 * @param EXP Bonus Rate
 * @type number
 * @decimals 2
 * @min 0
 * @desc 这是当一个敌人被过量伤害击杀时的经验值加成。
 * 这是一个比率。0是0%。1.00是100%。0.50就是50%。
 * @default 2.00
 *
 * @param EXP Bonus Flat
 * @type number
 * @min 0
 * @desc 这是当一个敌人被过量伤害击杀时给予的奖励经验值。
 * 这是一个固定的值。
 * @default 0
 *
 * @param Gold Bonus Rate
 * @type number
 * @decimals 2
 * @min 0
 * @desc 这是当一个敌人被过量伤害击杀时的金币奖励。
 * 这是一个比率。0是0%。1.00是100%。0.50就是50%。
 * @default 2.00
 *
 * @param Gold Bonus Flat
 * @type number
 * @min 0
 * @desc 这是当一个敌人被杀死时给予的金币奖励。
 * 这是一个固定的值.
 * @default 0
 *
 * @param Drop Bonus Rate
 * @type number
 * @decimals 2
 * @min 0
 * @desc 这是在敌人被过量伤害击杀的掉落加成奖励。
 * 这是一个比率。0是0%。1.00是100%。0.50就是50%。
 * @default 2.00
 *
 * @help
 * ============================================================================
 * 正式介绍
 * ============================================================================
 *
 * 当一个角色用过量伤害击败一个敌人时，就会发生过
 * 度杀伤。所有的敌人都有一个过量伤害要求，如果
 * 一个战斗者造成等于或大于这个数值的致命一击，在敌
 * 人死亡之前会在敌人身上播放一个动画。当一个敌人被
 * 过量伤害击杀时，这个敌人会奖励玩家更多的经验值，更多
 * 的金币，更高的掉落率，如果安装了YEP _ ExtraEnemyDrops，
 * 在被过量伤害击杀的情况下会有更多的额外物品的可能性。
 *
 * This is a collaboration plugin by Tigress and Yanfly to ensure compatibility
 * with the Yanfly Engine Plugins library.
 *
 * 如果你使用的是YEP _ ExtraEnemyDrops，
 * 这个插件放在插件管理器列表中那个插件的下面，
 * 可以访问这个插件中提供的过量伤害条件。
 *
 * ============================================================================
 * 注释标记
 * ============================================================================
 *
 * 将下面的注释标签插入敌人的注释框中，
 * 这样你就可以改变对它们的过量伤害要求。
 *
 * 敌人备注标签
 *
 *   <Overkill Requirement: x>
 *   - 将敌人的过量伤害要求改为x。
 *   这是致命一击需要造成的最小伤害。
 *   如果你能把所有的代码放在一行，你可以在这里使用JS代码。
 *   否则，请在 Lunatic Mode 部分使用下面的注释标签设置。
 *
 *   <Overkill Animation: x>
 *   - 这是敌人被过量伤害击杀时播放的动画。
 *   用数据库中的动画标识替换x。
 *
 *   <Overkill EXP Rate: x%>
 *   <Overkill EXP Flat: x>
 *   - 这是当敌人被过量伤害击杀时获得的额外经验值。
 *   数值替换x。从过量伤害击杀中
 *   获得的经验值将被添加到已经获得的经验值之上。
 *
 *   <Overkill Gold Rate: x%>
 *   <Overkill Gold Flat: x>
 *   - 这是当敌人被过量伤害击杀时获得的金币。
 *   用数值替换x。从过量伤害击杀中
 *   获得的金币将被添加到已经获得的金币之上。
 *
 *   <Overkill Drop Rate: x%>
 *   - 这是当敌人被过量伤害击杀时获得的额外掉落率。
 *   用百分比增长率代替x。
 *
 * ============================================================================
 * 额外敌人掉落兼容性-条件掉落-过度杀伤
 * ============================================================================
 *
 * 与YEP _ ExtraEnemyDrops插件一起使用。
 * 为了兼容性，把这个插件放在插件管理器列表中的YEP _ ExtraEnemyDrops下面。
 * 然后，可以使用以下条件:
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * IS OVERKILLED
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 这个条件只有在敌人被过量伤害击杀的情况下才会通过。
 * 。如果不满足过量伤害击杀要求，投放率将不会有额外的变化。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 例子:   Is Overkilled: +100%
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * 你可以做的一件事就是使用类似于
 * 以下设置:
 *
 * <Conditional Potion Drop>
 *  is overkilled: +100%
 * </Conditional Potion Drop>
 *
 * 这个标签设置将使 'Potion' 物品只有在敌人被过量伤害击杀时
 * 才会掉落。否则，什么都不会出来。
 *
 * ============================================================================
 * Lunatic Mode - 自定义过量伤害击杀设置
 * ============================================================================
 *
 * 这一部分是为那些希望更多地涉猎JavaScript以使某些
 * 矫枉过正的方面更加个性化的人准备的。
 *
 * 敌人备注标签
 *
 *   --------------------------------------------------------------------------
 *
 *   <Overkill Requirement Formula>
 *    requirement = x;
 *   <Overkill Requirement Formula>
 *
 *   - 将敌人的过量伤害击杀要求改为x。
 *   这是致命一击需要造成的最小伤害。
 *   如果你知道怎么编码，你可以在这里使用JS代码。  
 *   'requirement'变量是将用于检查是否实现过量伤害击杀的值。.
 *
 *   --------------------------------------------------------------------------
 *
 *   <Custom Overkill Effect>
 *    // Insert any code you want here
 *   </Custom Overkill Effect>
 *
 *   - 这个代码会在敌人被过量伤害击杀而死亡的时候运行。
 *   这里使用的'enemy' 变量指的是敌人本身。您可以在这里使用
 *   的JS代码可以是您想要的任何东西，
 *   包括打开开关、设置变量、想到的任何东西。
 *
 *   --------------------------------------------------------------------------
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.02:
 * - Bypass the isDevToolsOpen() error when bad code is inserted into a script
 * call or custom Lunatic Mode code segment due to updating to MV 1.6.1.
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

Yanfly.setupParameters = function() {
  var parameters = PluginManager.parameters('YEP_OverkillBonus');
  this.Param = this.Param || {};
  this.Param.OverkillFormula = String(parameters['Overkill Formula']);
  this.Param.OverkillAniId = Number(parameters['Overkill Animation']);
  this.Param.OverkillExpRate = Number(parameters['EXP Bonus Rate']);
  this.Param.OverkillExpFlat = Number(parameters['EXP Bonus Flat']);
  this.Param.OverkillGoldRate = Number(parameters['Gold Bonus Rate']);
  this.Param.OverkillGoldFlat = Number(parameters['Gold Bonus Flat']);
  this.Param.OverkillDropRate = Number(parameters['Drop Bonus Rate']);
};

Yanfly.setupParameters(); // Setup Parameters

//=============================================================================
// DataManager
// ----------------------------------------------------------------------------
// Notetags added by Yanfly
//=============================================================================

Yanfly.OKB.DataManager_isDatabaseLoaded = 
  DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.OKB.DataManager_isDatabaseLoaded.call(this)) 
    return false;

  if (!Yanfly._loaded_YEP_OverkillBonus) {
    this.processOverkillBonusNotetags1($dataEnemies);
    Yanfly._loaded_YEP_OverkillBonus = true;
  }
  
  return true;
};

DataManager.processOverkillBonusNotetags1 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.overkillFormula = 'requirement = ' + Yanfly.Param.OverkillFormula;
    obj.overkillAnimationId = Yanfly.Param.OverkillAniId;
    obj.overkillExpRate = Yanfly.Param.OverkillExpRate;
    obj.overkillExpFlat = Yanfly.Param.OverkillExpFlat;
    obj.overkillGoldRate = Yanfly.Param.OverkillGoldRate;
    obj.overkillGoldFlat = Yanfly.Param.OverkillGoldFlat;
    obj.overkillDropRate = Yanfly.Param.OverkillDropRate;
    obj.overkillEffect = '';
    var evalMode = 'none';

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<OVERKILL REQUIREMENT:[ ](.*)>/i)) {
        obj.overkillFormula = 'requirement = ' + String(RegExp.$1);
      } else if (line.match(/<OVERKILL REQUIREMENT FORMULA>/i)) {
        evalMode = 'overkill formula';
        obj.overkillFormula = '';
      } else if (line.match(/<\/OVERKILL REQUIREMENT FORMULA>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'overkill formula') {
        obj.overkillFormula += line + '\n';
      } else if (line.match(/<OVERKILL ANIMATION:[ ](\d+)>/i)) {
        obj.overkillAnimationId = parseInt(RegExp.$1);
      } else if (line.match(/<OVERKILL EXP RATE:[ ](\d+)([%％])>/i)) {
        obj.overkillExpRate = parseFloat(RegExp.$1) * 0.01;
      } else if (line.match(/<OVERKILL EXP FLAT:[ ](\d+)>/i)) {
        obj.overkillExpFlat = parseInt(RegExp.$1);
      } else if (line.match(/<OVERKILL GOLD RATE:[ ](\d+)([%％])>/i)) {
        obj.overkillGoldRate = parseFloat(RegExp.$1) * 0.01;
      } else if (line.match(/<OVERKILL GOLD FLAT:[ ](\d+)>/i)) {
        obj.overkillGoldFlat = parseInt(RegExp.$1);
      } else if (line.match(/<OVERKILL DROP RATE:[ ](\d+)([%％])>/i)) {
        obj.overkillDropRate = parseFloat(RegExp.$1) * 0.01;
      } else if (line.match(/<CUSTOM OVERKILL EFFECT>/i)) {
        evalMode = 'custom overkill effect';
      } else if (line.match(/<\/CUSTOM OVERKILL EFFECT>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'custom overkill effect') {
        obj.overkillEffect += line + '\n';
      }
    }
  }
};

//=============================================================================
// Game_Action
//=============================================================================

Yanfly.OKB.Game_Action_executeHpDamage = Game_Action.prototype.executeHpDamage;
Game_Action.prototype.executeHpDamage = function(target, value) {
  Yanfly.OKB.Game_Action_executeHpDamage.call(this, target, value);
  if (target.isEnemy() && (target.hp < 1 || target.isDead())) {
    target.checkOverkill();
  }
};

//=============================================================================
// Game_Enemy
//=============================================================================

Yanfly.OKB.Game_Enemy_setup = Game_Enemy.prototype.setup;
Game_Enemy.prototype.setup = function(enemyId, x, y) {
  Yanfly.OKB.Game_Enemy_setup.call(this, enemyId, x, y);
  this.setOverkill(false);
};

Game_Enemy.prototype.checkOverkill = function() {
  var result = this._result;
  if (result) {
    var dmg = this._result.hpDamage;
    var requirement = this.overkillRequirement();
    if (dmg >= requirement) {
      this.setOverkill(true);
    }
  }
};

Game_Enemy.prototype.overkillRequirement = function() {
  if (this._overkillRequirement) {
    return this._overkillRequirement;
  }
  var user = this;
  var a = this;
  var b = this;
  var target = this;
  var enemy = this;
  var subject = this;
  var b = target;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  var requirement = 0;

  var code = this.enemy().overkillFormula;
  try {
    eval(code);
  } catch (e) {
    Yanfly.Util.displayError(e, code, 'OVERKILL FORMULA ERROR');
  }

  this._overkillRequirement = requirement;
  return this._overkillRequirement;
};

Game_Enemy.prototype.setOverkill = function(status) {
  this._overkill = status;
};

Yanfly.OKB.Game_Enemy_performCollapse = Game_Enemy.prototype.performCollapse;
Game_Enemy.prototype.performCollapse = function() {
  if (this.isOverkilled()) {
    this.performOverkillCollapse();
  }
  Yanfly.OKB.Game_Enemy_performCollapse.call(this);
  if (this.isOverkilled()) {
    this.performOverkillEffect();
  }
};

Game_Enemy.prototype.overkillAnimationId = function() {
  return this.enemy().overkillAnimationId;
};

Game_Enemy.prototype.performOverkillCollapse = function() {
  this.startAnimation(this.overkillAnimationId());
};

Game_Enemy.prototype.performOverkillEffect = function() {
  var user = this;
  var a = this;
  var b = this;
  var target = this;
  var enemy = this;
  var subject = this;
  var b = target;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  var code = this.enemy().overkillEffect;
  try {
    eval(code);
  } catch (e) {
    Yanfly.Util.displayError(e, code, 'OVERKILL EFFECT ERROR');
  }
};

Game_Enemy.prototype.isOverkilled = function() {
  return this._overkill;
};

Yanfly.OKB.Game_Enemy_exp = Game_Enemy.prototype.exp;
Game_Enemy.prototype.exp = function() {
  var exp = Yanfly.OKB.Game_Enemy_exp.call(this);
  if (this.isOverkilled()) {
    exp *= this.enemy().overkillExpRate;
    exp += this.enemy().overkillExpFlat;
  }
  return Math.round(exp);
};

Yanfly.OKB.Game_Enemy_gold = Game_Enemy.prototype.gold;
Game_Enemy.prototype.gold = function() {
  var gold = Yanfly.OKB.Game_Enemy_gold.call(this);
  if (this.isOverkilled()) {
    gold *= this.enemy().overkillGoldRate;
    gold += this.enemy().overkillGoldFlat;
  }
  return Math.round(gold);
};

Yanfly.OKB.Game_Enemy_dropItemRate = Game_Enemy.prototype.dropItemRate;
Game_Enemy.prototype.dropItemRate = function() {
  var dropRate = Yanfly.OKB.Game_Enemy_dropItemRate.call(this);
  if (this.isOverkilled()) {
    dropRate *= this.enemy().overkillDropRate;
  }
  return dropRate;
};

//=============================================================================
// Compatibility Stuff
// ----------------------------------------------------------------------------
// YEP_ExtraEnemyDrops
//=============================================================================

if (Imported.YEP_ExtraEnemyDrops) {

Yanfly.OKB.DropManager_meetsLineCondition = DropManager.meetsLineCondition;
DropManager.meetsLineCondition = function(line) {
  // IS OVERKILL
  if (line.match(/IS OVERKILL/i)) {
    return this.conditionIsOverkilled(line);
  }
  return Yanfly.OKB.DropManager_meetsLineCondition.call(this, line);
};

DropManager.conditionIsOverkilled = function(line) {
  return this._enemy.isOverkilled();
};

}; // Imported.YEP_ExtraEnemyDrops

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