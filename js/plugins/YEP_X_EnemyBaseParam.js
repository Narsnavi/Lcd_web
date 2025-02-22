//=============================================================================
// Yanfly Engine Plugins - Enemy Levels Extension - Enemy Base Parameters
// YEP_X_EnemyBaseParam.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_EnemyBaseParam = true;

var Yanfly = Yanfly || {};
Yanfly.EBP = Yanfly.EBP || {};
Yanfly.EBP.version = 1.02;

//=============================================================================
 /*:
 * @plugindesc v1.02 自定义敌方基本参数(需要 YEP_EnemyLevels.js)
 * the base parameter values of enemies.
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * 正式介绍
 * ============================================================================
 *
 * 这个插件需要YEP_EnemyLevels。
 * 确保该插件位于插件列表中的YEP _ EnemyLevels下。
 *
 * 对于那些想要一个更公式化的方法来计算敌人参数的人来说，
 * 这个插件将允许你用一个相似的方法来确定敌人参数。
 * 这可以用来根据玩家的等级属性来决定敌人，
 * 甚至可以微调每个敌人的个人属性。
 * ...
 *
 * ============================================================================
 * 注释标记
 * ============================================================================
 *
 * 你可以用这个标签来根据一个职业来计算敌人的属性。
 *
 * 敌人标签:
 *
 *   <Base Parameters on Class: x>
 *   - 这将使除' exp '和' gold '之外的所有参数都基于x类。
 *   *注意:这将优先于自定义敌人参数。
 *
 *   <Base stat Parameter on Class: x>
 *   - 这将使特定的“stat”参数基于类x。将“stat”替换为
 *   “maxhp”、“maxmp”、“atk”、“def”、“mat”、“mdf”、“agi”或“luk”。
 *   *注意:这将优先于自定义敌人参数。
 *
 * ============================================================================
 * Lunatic Mode - 自定义敌人参数
 * ============================================================================
 *
 * 如果公式简短，您可以使用此notetag覆盖所有基本参数
 * 的整个公式列表:
 *
 * 敌人标签:
 *
 *   <Custom Enemy Parameters>
 *    maxhp = level * 30 + 300;
 *    maxmp = level * 20 + 150;
 *    atk = level * 15 + 15;
 *    def = level * 11 + 16;
 *    mat = level * 12 + 14;
 *    mdf = level * 10 + 13;
 *    agi = level * 14 + 15;
 *    luk = level * 13 + 12;
 *    exp = level * 100;
 *    gold = level * 100;
 *   </Custom Enemy Parameters>
 *   “maxhp”、“maxmp”、“atk”、“def”、“mat”、“mdf”、
 *   “agi”、“luk”、“exp”或“gold”变量各自表示各自的统计数据。
 *   'level'”变量是指敌人当前的等级.只要公式返回一
 *   个有效的数字，就可以用你喜欢的任何方式来生成。
 *   * Note:注意:这里的'exp'和'gold'值返回敌人死亡时给予的
 *   经验值和金币。
 *
 * ============================================================================
 * Lunatic Mode - 详细的自定义参数公式
 * ============================================================================
 *
 * 对于那些希望在计算每个stat的公式时更加详细的人，
 * 可以使用以下notetag设置:
 *
 * 敌人笔记标签:
 *
 *   <Custom Base Param Formula>
 *    if (this.name() === 'Slime') {
 *      value = level * 30 + 300;
 *    } else {
 *      value = level * 25 + 250;
 *    }
 *   </Custom Base Param Formula>
 *   将“Param”替换为“maxhp”、“maxmp”、“atk”、“def”、
 *   “mat”、“mdf”、“agi”、“luk”、“exp”或“gold”。
 *   'value'变量是作为基本敌人参数返回的最终结果。
 *   'level'变量是指敌人当前的等级。
 *   只要公式返回一个有效的数字，就可以用你喜欢的任何方式来生成。
 *   **注意:这里的'exp'和'gold'值返回敌人死亡时给予的
 *   经验值和金币。
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

if (Imported.YEP_EnemyLevels) {

//=============================================================================
// DataManager
//=============================================================================

Yanfly.EBP.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.EBP.DataManager_isDatabaseLoaded.call(this)) return false;

  if (!Yanfly._loaded_YEP_X_EnemyBaseParam) {
    this.processEBPNotetags1($dataEnemies);
    Yanfly._loaded_YEP_X_EnemyBaseParam = true;
  }
  
  return true;
};

DataManager.processEBPNotetags1 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.customBaseParamFormula = ['', '', '', '', '', '', '', '', '', ''];
    obj.classBasedParam = [0, 0, 0, 0, 0, 0, 0, 0];
    var evalMode = 'none';
    var paramId = 0;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<CUSTOM[ ]BASE[ ](.*)[ ]FORMULA>/i)) {
        var param = String(RegExp.$1).toUpperCase().trim();
        if (['MHP', 'MAX HP', 'MAXHP', 'HP'].contains(param)) {
          paramId = 0;
        } else if (['MMP', 'MAX MP', 'MAXMP', 'MP'].contains(param)) {
          paramId = 1;
        } else if (['ATK', 'STR'].contains(param)) {
          paramId = 2;
        } else if (['DEF'].contains(param)) {
          paramId = 3;
        } else if (['MAT', 'INT', 'SPI'].contains(param)) {
          paramId = 4;
        } else if (['MDF', 'RES'].contains(param)) {
          paramId = 5;
        } else if (['AGI', 'SPD'].contains(param)) {
          paramId = 6;
        } else if (['LUK'].contains(param)) {
          paramId = 7;
        } else if (['EXP'].contains(param)) {
          paramId = 8;
        } else if (['GOLD'].contains(param)) {
          paramId = 9;
        } else {
          continue;
        }
        evalMode = 'custom enemy param formula';
      } else if (line.match(/<\/CUSTOM[ ]BASE[ ](.*)[ ]FORMULA>/i)) {
        paramId = 0;
        evalMode = 'none'
        obj.customBaseParamFormula[paramId] = '';
      } else if (evalMode === 'custom enemy param formula') {
        obj.customBaseParamFormula[paramId] += line + '\n';
      } else if (line.match(/<CUSTOM ENEMY PARAMETERS>/i)) {
        evalMode = 'custom enemy parameters';
      } else if (line.match(/<\/CUSTOM ENEMY PARAMETERS>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'custom enemy parameters') {
        if (line.match(/(?:MHP|MAX HP|MAXHP|HP)[ ]=[ ](.*)/i)) {
          var code = 'mhp = ' + String(RegExp.$1).trim();
          paramId = 0;
        } else if (line.match(/(?:MMP|MAX MP|MAXMP|MP)[ ]=[ ](.*)/i)) {
          var code = 'mmp = ' + String(RegExp.$1).trim();
          paramId = 1;
        } else if (line.match(/(?:MSP|MAX SP|MAXSP|SP)[ ]=[ ](.*)/i)) {
          var code = 'mmp = ' + String(RegExp.$1).trim();
          paramId = 1;
        } else if (line.match(/(?:ATK|STR)[ ]=[ ](.*)/i)) {
          var code = 'atk = ' + String(RegExp.$1).trim();
          paramId = 2;
        } else if (line.match(/(?:DEF)[ ]=[ ](.*)/i)) {
          var code = 'def = ' + String(RegExp.$1).trim();
          paramId = 3;
        } else if (line.match(/(?:MAT|INT|SPI)[ ]=[ ](.*)/i)) {
          var code = 'mat = ' + String(RegExp.$1).trim();
          paramId = 4;
        } else if (line.match(/(?:MDF|RES)[ ]=[ ](.*)/i)) {
          var code = 'mdf = ' + String(RegExp.$1).trim();
          paramId = 5;
        } else if (line.match(/(?:AGI|SPD)[ ]=[ ](.*)/i)) {
          var code = 'agi = ' + String(RegExp.$1).trim();
          paramId = 6;
        } else if (line.match(/(?:LUK)[ ]=[ ](.*)/i)) {
          var code = 'luk = ' + String(RegExp.$1).trim();
          paramId = 7;
        } else if (line.match(/(?:EXP)[ ]=[ ](.*)/i)) {
          var code = 'exp = ' + String(RegExp.$1).trim();
          paramId = 8;
        } else if (line.match(/(?:GOLD|GP)[ ]=[ ](.*)/i)) {
          var code = 'gold = ' + String(RegExp.$1).trim();
          paramId = 9;
        } else {
          continue;
        }
        obj.customBaseParamFormula[paramId] += code + '\n';
      } else if (line.match(/<BASE PARAMETERS ON CLASS:[ ](\d+)>/i)) {
        var classId = parseInt(RegExp.$1);
        obj.classBasedParam = [classId, classId, classId, classId,
          classId, classId, classId, classId];
      }
    }
  }
};

//=============================================================================
// Game_Enemy
//=============================================================================

Yanfly.EBP.Game_Enemy_paramBase = Game_Enemy.prototype.paramBase;
Game_Enemy.prototype.paramBase = function(paramId) {
  this._cacheBaseParam = this._cacheBaseParam || {};
  if (this._cacheBaseParam[paramId]) return this._cacheBaseParam[paramId];
  if (this.enemy().classBasedParam[paramId] > 0) {
    var value = this.classBasedParameterValue(paramId);
    this._cacheBaseParam[paramId] = value;
    return this._cacheBaseParam[paramId];
  } else if (this.enemy().customBaseParamFormula[paramId] !== '') {
    var formula = this.enemy().customBaseParamFormula[paramId];
    var value = this.customEnemyBaseParamFormula(formula, paramId);
    this._cacheBaseParam[paramId] = value;
    return this._cacheBaseParam[paramId];
  } else {
    return Yanfly.EBP.Game_Enemy_paramBase.call(this, paramId);
  }
};

Game_Enemy.prototype.classBasedParameterValue = function(paramId) {
  var classId = this.enemy().classBasedParam[paramId];
  var cl = $dataClasses[classId];
  if (Imported.YEP_X_ClassBaseParam && cl.baseParamFormula[paramId] !== '') {
    var formula = cl.baseParamFormula[paramId];
    return this.customEnemyBaseParamFormula(formula, paramId);
  } else {
    if (this.level > 99) {
      var i = this.currentClass().params[paramId][99];
      var j = this.currentClass().params[paramId][98];
      i += (i - j) * (this.level - 99);
      return i;
    } else {
      return cl.params[paramId][this.level];
    }
  }
};

Game_Enemy.prototype.customEnemyBaseParamFormula = function(f, p, l) {
  var formula = f; var paramId = p; var level = l;
  var value = 0; var hp = 0; var mp = 0; level = level || this.level;
  var maxhp = 0; var mhp = 0;
  var maxmp = 0; var mmp = 0; var sp = 0; var maxsp = 0; var msp = 0;
  var atk = 0; var str = 0;
  var def = 0;
  var mat = 0; var int = 0; var spi = 0;
  var mdf = 0; var res = 0;
  var agi = 0; var spd = 0;
  var luk = 0;
  var exp = 0;
  var gold = 0;
  var a = this;
  var b = this;
  var user = this;
  var subject = this;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  var code = formula;
  try {
    eval(code);
  } catch (e) {
    Yanfly.Util.displayError(e, code, 'ENEMY BASE PARAM FORMULA ERROR');
  }
  switch (paramId) {
  case 0:
    value += hp + maxhp + mhp;
    break;
  case 1:
    value += mp + maxmp + mmp + sp + maxsp + msp;
    break;
  case 2:
    value += atk + str;
    break;
  case 3:
    value += def;
    break;
  case 4:
    value += mat + int + spi;
    break;
  case 5:
    value += mdf + res;
    break;
  case 6:
    value += agi + spd;
    break;
  case 7:
    value += luk;
    break;
  case 8:
    value += exp;
    break;
  case 9:
    value += gold;
    break;
  }
  return value;
};

Yanfly.EBP.Game_Enemy_exp = Game_Enemy.prototype.exp;
Game_Enemy.prototype.exp = function() {
  var paramId = 8;
  this._cacheBaseParam = this._cacheBaseParam || {};
  if (this._cacheBaseParam[paramId]) return this._cacheBaseParam[paramId];
  if (this.enemy().customBaseParamFormula[paramId] !== '') {
    var formula = this.enemy().customBaseParamFormula[paramId];
    var value = this.customEnemyBaseParamFormula(formula, paramId);
    this._cacheBaseParam[paramId] = value;
    return this._cacheBaseParam[paramId];
  } else {
    return Yanfly.EBP.Game_Enemy_exp.call(this);
  }
};

Yanfly.EBP.Game_Enemy_gold = Game_Enemy.prototype.gold;
Game_Enemy.prototype.gold = function() {
  var paramId = 9;
  this._cacheBaseParam = this._cacheBaseParam || {};
  if (this._cacheBaseParam[paramId]) return this._cacheBaseParam[paramId];
  if (this.enemy().customBaseParamFormula[paramId] !== '') {
    var formula = this.enemy().customBaseParamFormula[paramId];
    var value = this.customEnemyBaseParamFormula(formula, paramId);
    this._cacheBaseParam[paramId] = value;
    return this._cacheBaseParam[paramId];
  } else {
    return Yanfly.EBP.Game_Enemy_gold.call(this);
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
} else {

var text = '================================================================\n';
text += 'YEP_X_EnemyBaseParam requires YEP_EnemyLevels to be at the ';
text += 'latest version to run properly.\n\nPlease go to www.yanfly.moe and ';
text += 'update to the latest version for the YEP_EnemyLevels plugin.\n';
text += '================================================================\n';
console.log(text);
require('nw.gui').Window.get().showDevTools();

}; // Imported.YEP_EnemyLevels