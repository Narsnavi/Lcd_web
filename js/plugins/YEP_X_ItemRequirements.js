//=============================================================================
// Yanfly Engine Plugins - Item Core Extension - Item Requirements
// YEP_X_ItemRequirements.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_ItemRequirements = true;

var Yanfly = Yanfly || {};
Yanfly.ItemReq = Yanfly.ItemReq || {};
Yanfly.ItemReq.version = 1.02;

//=============================================================================
 /*:
 * @plugindesc v1.02 物品使用限制(需要 YEP_ItemCore.js)
 * items before they can be used.
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * 正式介绍
 * ============================================================================
 *
 * 这个插件需要YEP_ItemCore。确保该插件位于插件列
 * 表中的YEP _ ItemCore下。
 *
 * 在RPG Maker MV中，物品默认只有几个限制，
 * 不管是能不能在战斗中使用，还是不能在战斗之外使用。
 * 。您无法设置任何其他条件来决定某个项目是否可以使用。
 * 这个插件提供了更多基于开关、变量、
 * 使用它们的参与者、类、状态要求等来限制项目使用的方法。
 * ...
 *
 * ============================================================================
 * 注释标记
 * ============================================================================
 *
 * 在使用项目之前，请使用以下注释标记
 * 来强制要求项目。
 *
 * 注释标记物品:
 *
 *   <Enable Requirements>
 *    condition
 *    condition
 *   </Enable Requirements>
 *   - 用所需的条件设置替换'condition'.
 *   您可以在注释标记中插入任意数量的条件。
 *   必须满足所有条件，才能使用该物品。
 *   查看下面可以使用的可能条件列表。
 *
 * ---
 *
 * 条件:
 *
 * ---
 *
 * Eval: code
 * - 将'code'替换为您想要运行检查以启用该项的JavaScript代码。
 * 如果检查返回false，则无论其他条件如何，
 * 该项目都将被禁用。
 *
 * 例子:
 *   Eval: $gameActors.actor(1).name() === 'Harold'
 *   Eval: $gameActors.leader().name() !== 'Ralph'
 *
 * ---
 *
 * Actor: x
 * Actor: x, x, x
 * - 需要参与者标识“x”才能使用该项。
 * 如果该参与者不是使用所述项目的人，则该项目被禁用，
 * 并且无论其他条件如何都不能使用。
 *
 * Not Actor: x
 * Not Actor: x, x, x
 * - 要求使用该项的参与者不是参与者标识“x”。
 * 如果参与者的ID与所列的“x”中的一个匹配，则该项目将被禁用，
 * 无论其他条件如何都无法使用。
 *
 * 例子:
 *   Actor: 1
 *   Actor: 2, 3, 4, 5, 6
 *   Not Actor: 7
 *   Not Actor: 8, 9, 10
 *
 * ---
 *
 * Armor: x
 * Armor: x, x, x
 * - 要求角色特别装备盔甲标识“x”才能使用该物品。
 * 如果使用多个“x”，角色可以配备其中任何一个。
 * 如果行动者没有装备盔甲“x”，那么该物品将被禁用，
 * 无论其他条件如何都不能使用。
 *
 * Not Armor: x
 * Not Armor: x, x, x
 * - 要求角色没有装备盔甲标识“x”来使用该物品。
 * 如果使用了多个“x”，则角色不能配备任何一个。
 * 如果行动者确实装备了护甲“x”，那么该物品将被禁用，
 * 无论其他条件如何都不能使用。
 *
 * 例子:
 *   Armor: 1
 *   Armor: 2, 3, 4, 5, 6
 *   Not Armor: 7
 *   Not Armor: 8, 9, 10
 *
 * ---
 *
 * Class: x
 * Class: x, x, x
 * - 需要类别识别码' x '才能使用物品。
 * 如果参与者的类与物品要求不匹配，则物品被禁用，
 * 并且无论其他条件如何都不能使用。
 *
 * Not Class: x
 * Not Class: x, x, x
 * - 要求使用该项的参与者不是类标识“x”。
 * 如果参与者的类ID与所列的“x”之一相匹配，则该物品被禁用，
 * 无论其他条件如何都不能使用。
 *
 * 例子:
 *   Class: 1
 *   Class: 2, 3, 4, 5, 6
 *   Not Class: 7
 *   Not Class: 8, 9, 10
 *
 * ---
 *
 * Subclass: x
 * Subclass: x, x, x
 * - 需要YEP_X_Subclass.js
 * - 需要子类标识“x”才能使用该物品。
 * 如果参与者的类与物品要求不匹配，则物品被禁用，
 * 并且无论其他条件如何都不能使用。
 *
 * Not Subclass: x
 * Not Subclass: x, x, x
 * - 需要YEP_X_Subclass.js
 * - 要求使用该项的参与者不是子类ID“x”。
 * 如果参与者的子类ID与所列的“x”中的一个匹配，
 * 则该物品被禁用，无论其他条件如何都不能使用。
 *
 * 例子:
 *   Subclass: 1
 *   Subclass: 2, 3, 4, 5, 6
 *   Not Subclass: 7
 *   Not Subclass: 8, 9, 10
 *
 * ---
 *
 * Either Class: x
 * Either Class: x, x, x
 * - 需要YEP_X_Subclass.js
 * - 参与者的主类或子类ID必须与“x”匹配。
 * 如果其中至少有一个匹配，则条件通过。否则，该条件将失败，
 * 并且该物品将被禁用，无论其他条件如何都无法使用。
 *
 * Neither Class: x
 * Neither Class: x, x, x
 * - 需要YEP_X_Subclass.js
 * - 需要YEP_X_Subclass.js
 * - 参与者的主类或子类ID必须与“x”不匹配。
 * 如果它们中至少有一个匹配，则条件失败，
 * 并且该物品被禁用，无论其他条件如何都不能使用。
 *
 * 例子:
 *   Either Class: 1
 *   Either Class: 2, 3, 4, 5, 6
 *   Neither Class: 7
 *   Neither Class: 8, 9, 10
 *
 * ---
 *
 * State: x
 * State: x, x, x
 * - 要求使用该项的参与者受状态“x”的影响。
 * 如果使用了多个“x”，参与者可能会受到其中任何一个的影响。
 * 如果执行元不受状态“x”的影响，
 * 则条件失败，物品被禁用，无论其他条件如何都无法使用。
 *
 * Not State: x
 * Not State: x, x, x
 * - 要求使用该项的参与者不受状态“x”的影响。
 * 如果使用了多个“x”，则参与者不会受到其中任何一个的影响。
 * 如果执行元不受状态“x”的影响，
 * 则条件失败，物品被禁用，无论其他条件如何都无法使用。
 *
 * 例子:
 *   State: 10
 *   State: 11, 12, 13, 14, 15
 *   Not State: 16
 *   Not Stage: 17, 18, 19, 20
 *
 * ---
 *
 * Switch Off: x
 * Switch Off: x, x, x
 * - 要求开关x处于关闭状态，然后才能使用该物品。
 * 如果开关打开，则该物品被禁用，
 * 无论其他情况如何都不能使用。
 *
 * 例子:
 *   Switch Off: 1
 *   Switch Off: 2, 3, 4, 5, 6
 *
 * ---
 *
 * Switch On: x
 * Switch On: x, x, x
 * - 需要开关x打开，才能使用该物品。
 * 如果开关关闭，则该物品被禁用，
 * 无论其他情况如何都不能使用。
 *
 * 例子:
 *   Switch On: 1
 *   Switch On: 2, 3, 4, 5, 6
 *
 * ---
 *
 * Variable x eval
 * - 对变量x进行检查。将“x”替换为整数值，
 * 并将“eval”替换为您希望对其运行的代码检查。
 *
 * 例子:
 *   Variable 1 >= 5
 *   Variable 2 < 6
 *   Variable 3 === 7
 *   Variable 4 !== 8
 *
 * ---
 *
 * Weapon: x
 * Weapon: x, x, x
 * - 要求角色特别配备武器ID“x”以使用该物品。
 * 如果使用多个“x”，角色可以配备其中任何一个。
 * 如果行动者没有装备武器“x”，那么该物品将被禁用，
 * 无论其他条件如何都不能使用。
 *
 * Not Weapon: x
 * Not Weapon: x, x, x
 * - 要求角色没有武器ID 'x '装备来使用该物品。
 * 如果使用了多个“x”，则角色不能配备任何一个。
 * 如果角色确实装备了武器“x”，那么该物品将被禁用，
 * 无论其他条件如何都不能使用。
 *
 * 例子:
 *   Weapon: 1
 *   Weapon: 2, 3, 4, 5, 6
 *   Not Weapon: 7
 *   Not Weapon: 8, 9, 10
 *
 * ---
 *
 * Weapon Type: x
 * Weapon Type: x, x, x
 * - 要求角色装备武器类型“x”。
 * 如果使用多个“x”，角色可以装备任何“x”武器类型。
 * 如果行动者没有匹配的武器类型，那么该物品将被禁用，
 * 无论其他条件如何都不能使用。
 *
 * Not Weapon Type: x
 * Not Weapon Type: x, x, x
 * - 要求角色不装备武器类型“x”。
 * 如果使用多个“x”，角色不能装备任何“x”武器类型。
 * 如果行动者确实有匹配的武器类型，那么该物品将被禁用，
 * 无论其他条件如何都不能使用。
 *
 * 例子:
 *   Weapon Type: 1
 *   Weapon Type: 2, 3, 4, 5, 6
 *   Not Weapon Type: 7
 *   Not Weapon Type: 8, 9, 10
 *
 * ============================================================================
 * Lunatic Mode - 自定义启用要求
 * ============================================================================
 *
 * 对于那些有JavaScript经验的人，您可以使用下面的
 * 注释标签设置来创建自己的自定义需求，
 * 以确定是否可以使用物品::
 *
 * 注释标记物品:
 *
 *   <Custom Enable Requirement>
 *    condition = battler.level >= item.price;
 *   </Custom Enable Requirement>
 *   -'condition'变量将决定该项是否将被启用/禁用。
 *   如果'condition'变量返回真，则该项被启用，
 *   前提是所有其他条件(如果有)也满足。
 *   否则，该物品将被禁用，无法使用。'battler'
 *   变量指的是使用该物品的战斗者。'item'变量将引用
 *   正在检查的物品。
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

if (Imported.YEP_ItemCore) {

//=============================================================================
// DataManager
//=============================================================================

Yanfly.ItemReq.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.ItemReq.DataManager_isDatabaseLoaded.call(this)) return false;

  if (!Yanfly._loaded_YEP_X_ItemRequirements) {
    this.processItemRequirementsNotetags1($dataItems);
    Yanfly._loaded_YEP_X_ItemRequirements = true;
  }
  
  return true;
};

DataManager.processItemRequirementsNotetags1 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.itemRequirements = [];
    var evalMode = 'none';
    obj.customItemRequirements = '';

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<ENABLE (?:REQUIREMENT|REQUIREMENTS)>/i)) {
        evalMode = 'enable requirements';
      } else if (line.match(/<\/ENABLE (?:REQUIREMENT|REQUIREMENTS)>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'enable requirements') {
        obj.itemRequirements.push(line);
      } else if (line.match(/<CUSTOM ENABLE (?:REQUIREMENT|REQUIREMENTS)>/i)) {
        evalMode = 'custom enable requirements';
      } else if (line.match(/<\/CUSTOM ENABLE (?:REQUIREMENT|REQUIREMENTS)>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'custom enable requirements') {
        obj.customItemRequirements += line + '\n';
      }
    }
  }
};

//=============================================================================
// Game_BattlerBase
//=============================================================================

Yanfly.ItemReq.Game_BattlerBase_mIC =
  Game_BattlerBase.prototype.meetsItemConditions;
Game_BattlerBase.prototype.meetsItemConditions = function(item) {
  if (!Yanfly.ItemReq.Game_BattlerBase_mIC.call(this, item)) {
    return false;
  }
  return ItemManager.meetsUsableItemRequirements(item, this);
};

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.isAtypeEquipped = function(atypeId) {
  return this.armors().some(function(armor) {
    return armor.atypeId === atypeId;
  });
};

//=============================================================================
// ItemManager
//=============================================================================

ItemManager.meetsUsableItemRequirements = function(item, battler) {
  if (!item) return false;
  if (!item.itemRequirements) {
    var baseItem = DataManager.getBaseItem(item);
    item.itemRequirements = JsonEx.makeDeepCopy(baseItem.itemRequirements);
  }
  var length = item.itemRequirements.length;
  if ($gameParty.inBattle()) var battler = this.battleSubject() || battler;
  for (var i = 0; i < length; ++i) {
    var line = item.itemRequirements[i];
    if (!line) continue;
    if (!this.checkUsableItemRequirement(line, item, battler)) return false;
  }
  if (item.customItemRequirements && item.customItemRequirements.length >= 1) {
    if (!this.checkCustomUsableItemRequirement(item, battler)) return false;
  }
  return true;
};

ItemManager.battleSubject = function() {
  return BattleManager.actor() || BattleManager._subject;
};

ItemManager.checkUsableItemRequirement = function(line, item, battler) {
  // EVAL
  if (line.match(/EVAL:(.*)/i)) {
    var code = String(RegExp.$1);
    return this.usableItemRequirementEval(code);
  }
  // NOT ACTOR
  if (line.match(/NOT ACTOR:(.*)/i)) {
    var data = String(RegExp.$1);
    return this.usableItemRequirementActor(data, battler, false);
  }
  // ACTOR
  if (line.match(/ACTOR:(.*)/i)) {
    var data = String(RegExp.$1);
    return this.usableItemRequirementActor(data, battler, true);
  }
  // NOT ARMOR TYPE
  if (line.match(/NOT ARMOR TYPE:(.*)/i)) {
    var data = String(RegExp.$1);
    return this.usableItemRequirementAtype(data, battler, false);
  }
  // ARMOR TYPE
  if (line.match(/ARMOR TYPE:(.*)/i)) {
    var data = String(RegExp.$1);
    return this.usableItemRequirementAtype(data, battler, true);
  }
  // NOT ARMOR
  if (line.match(/NOT ARMOR:(.*)/i)) {
    var data = String(RegExp.$1);
    return this.usableItemRequirementArmor(data, battler, false);
  }
  // ARMOR
  if (line.match(/ARMOR:(.*)/i)) {
    var data = String(RegExp.$1);
    return this.usableItemRequirementArmor(data, battler, true);
  }
  if (Imported.YEP_X_Subclass) {
    // NOT SUBCLASS
    if (line.match(/NOT SUBCLASS:(.*)/i)) {
      var data = String(RegExp.$1);
      return this.usableItemRequirementSubclass(data, battler, false);
    }
    // SUBCLASS
    if (line.match(/SUBCLASS:(.*)/i)) {
      var data = String(RegExp.$1);
      return this.usableItemRequirementSubclass(data, battler, true);
    }
    // EITHER CLASS
    if (line.match(/EITHER CLASS:(.*)/i)) {
      var data = String(RegExp.$1);
      return this.usableItemRequirementDuoClass(data, battler, true);
    }
    // NEITHER CLASS
    if (line.match(/NEITHER CLASS:(.*)/i)) {
      var data = String(RegExp.$1);
      return this.usableItemRequirementDuoClass(data, battler, false);
    }
  }
  // NOT CLASS
  if (line.match(/NOT CLASS:(.*)/i)) {
    var data = String(RegExp.$1);
    return this.usableItemRequirementClass(data, battler, false);
  }
  // CLASS
  if (line.match(/CLASS:(.*)/i)) {
    var data = String(RegExp.$1);
    return this.usableItemRequirementClass(data, battler, true);
  }
  // NOT STATE
  if (line.match(/NOT STATE:(.*)/i)) {
    var data = String(RegExp.$1);
    return this.usableItemRequirementState(data, battler, false);
  }
  // STATE
  if (line.match(/STATE:(.*)/i)) {
    var data = String(RegExp.$1);
    return this.usableItemRequirementState(data, battler, true);
  }
  // NOT WEAPON TYPE
  if (line.match(/NOT WEAPON TYPE:(.*)/i)) {
    var data = String(RegExp.$1);
    return this.usableItemRequirementWtype(data, battler, false);
  }
  // WEAPON TYPE
  if (line.match(/WEAPON TYPE:(.*)/i)) {
    var data = String(RegExp.$1);
    return this.usableItemRequirementWtype(data, battler, true);
  }
  // NOT WEAPON
  if (line.match(/NOT WEAPON:(.*)/i)) {
    var data = String(RegExp.$1);
    return this.usableItemRequirementWeapon(data, battler, false);
  }
  // WEAPON
  if (line.match(/WEAPON:(.*)/i)) {
    var data = String(RegExp.$1);
    return this.usableItemRequirementWeapon(data, battler, true);
  }
  // SWITCH OFF
  if (line.match(/SWITCH OFF:(.*)/i)) {
    var data = String(RegExp.$1);
    return this.usableItemRequirementSwitch(data, false);
  }
  // SWITCH ON
  if (line.match(/SWITCH ON:(.*)/i)) {
    var data = String(RegExp.$1);
    return this.usableItemRequirementSwitch(data, true);
  }
  // VARIABLE
  if (line.match(/VARIABLE[ ](\d+)[ ](.*)/i)) {
    var variableId = parseInt(RegExp.$1);
    var code = String(RegExp.$2);
    return this.usableItemRequirementVariable(variableId, code);
  }
  return true;
};

ItemManager.usableItemRequirementEval = function(code) {
  var value = false;
  try {
    eval(code);
  } catch (e) {
    Yanfly.Util.displayError(e, code, 'CUSTOM ITEM USE EVAL CODE ERROR');
  }
  return value;
};

ItemManager.usableItemRequirementActor = function(data, battler, condition) {
  var array = data.split(',');
  var length = array.length;
  for (var i = 0; i < length; ++i) {
    var actorId = parseInt(array[i].trim());
    if (battler.actorId() === actorId) return condition;
  }
  return !condition;
};

ItemManager.usableItemRequirementClass = function(data, battler, condition) {
  var array = data.split(',');
  var length = array.length;
  for (var i = 0; i < length; ++i) {
    var classId = parseInt(array[i].trim());
    if (battler._classId === classId) return condition;
  }
  return !condition;
};

ItemManager.usableItemRequirementDuoClass = function(data, battler, condition) {
  var array = data.split(',');
  var length = array.length;
  for (var i = 0; i < length; ++i) {
    var classId = parseInt(array[i].trim());
    var subclassId = parseInt(array[i].trim());
    if (battler._classId === classId || battler._subclassId === subclassId) {
      return condition;
    }
  }
  return !condition;
};

ItemManager.usableItemRequirementSubclass = function(data, battler, condition) {
  var array = data.split(',');
  var length = array.length;
  for (var i = 0; i < length; ++i) {
    var subclassId = parseInt(array[i].trim());
    if (battler._subclassId === subclassId) return condition;
  }
  return !condition;
};

ItemManager.usableItemRequirementState = function(data, battler, condition) {
  var array = data.split(',');
  var length = array.length;
  for (var i = 0; i < length; ++i) {
    var stateId = parseInt(array[i].trim());
    var state = $dataStates[stateId];
    if (battler.states().contains(state)) return condition;
  }
  return !condition;
};

ItemManager.usableItemRequirementWtype = function(data, battler, condition) {
  var array = data.split(',');
  var length = array.length;
  for (var i = 0; i < length; ++i) {
    var id = parseInt(array[i].trim());
    if (battler.isWtypeEquipped(id)) return condition;
  }
  return !condition;
};

ItemManager.usableItemRequirementWeapon = function(data, battler, condition) {
  var array = data.split(',');
  var length = array.length;
  for (var i = 0; i < length; ++i) {
    var id = parseInt(array[i].trim());
    var equip = $dataWeapons[id];
    if (battler.hasWeapon(equip)) return condition;
  }
  return !condition;
};

ItemManager.usableItemRequirementAtype = function(data, battler, condition) {
  var array = data.split(',');
  var length = array.length;
  for (var i = 0; i < length; ++i) {
    var id = parseInt(array[i].trim());
    if (battler.isAtypeEquipped(id)) return condition;
  }
  return !condition;
};

ItemManager.usableItemRequirementArmor = function(data, battler, condition) {
  var array = data.split(',');
  var length = array.length;
  for (var i = 0; i < length; ++i) {
    var id = parseInt(array[i].trim());
    var equip = $dataArmors[id];
    if (battler.hasArmor(equip)) return condition;
  }
  return !condition;
};

ItemManager.usableItemRequirementSwitch = function(data, condition) {
  var array = data.split(',');
  var length = array.length;
  for (var i = 0; i < length; ++i) {
    var switchId = parseInt(array[i].trim());
    if ($gameSwitches.value(switchId) !== condition) return false;
  }
  return true;
};

ItemManager.usableItemRequirementVariable = function(variableId, code) {
  return eval('$gameVariables.value(variableId) ' + code);
};

ItemManager.checkCustomUsableItemRequirement = function(item, battler) {
  var condition = false;
  var user = battler;
  var a = battler;
  var b = battler;
  var target = battler;
  var subject = battler;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  var code = item.customItemRequirements;
  try {
    eval(code);
  } catch (e) {
    Yanfly.Util.displayError(e, code, 'CUSTOM ITEM USE REQUIREMENT CODE ERROR');
  }
  return condition;
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
text += 'YEP_X_ItemRequirements requires YEP_ItemCore to be at the ';
text += 'latest version to run properly.\n\nPlease go to www.yanfly.moe and ';
text += 'update to the latest version for the YEP_ItemCore plugin.\n';
text += '================================================================\n';
console.log(text);
require('nw.gui').Window.get().showDevTools();

} // // Imported.YEP_ItemCore