//=============================================================================
// Yanfly Engine Plugins - Advanced Switches % Variables
// YEP_AdvSwVar.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_AdvSwVar = true;

var Yanfly = Yanfly || {};
Yanfly.AdvSwVar = Yanfly.AdvSwVar || {};
Yanfly.AdvSwVar.version = 1.02;

//=============================================================================
 /*:
 * @plugindesc v1.02 制作高级开关和变量
 * 能够利用JavaScript增强使用.
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * 正式介绍
 * ============================================================================
 *
 * 对于有JavaScript经验的高级用户，您可以设置
 * 通过某些开关和变量返回游戏数据
 * 开始行动。这可以用于事件页面条件，敌人人工智能
 * 条件、队伍页面条件等等!
 *
 * ============================================================================
 * 指令
 * ============================================================================
 *
 * 要使用这个插件，请命名您想要使用的开关或变量
 * 具有以下格式的代码效果:
 *
 *   Eval: code
 *
 * 这将使开关或变量在
 * 'Eval:' marker. 代码用于开关，它应该返回一个 'true' 或者
 * 'false' boolean. 如果代码用于变量, 它应该返回一个
 * 用于比较的数值.
 *
 * 例如，一个名为“Eval: $gameActors.actor(1)”的开关。' islarnedskill(5)',
 * 那么如果角色1有没有学到技能5，它就会返回。这可能是
 * 用于制作“真实视力”技能和确认
 * 如果角色有这种技能，地图上的东西就看得见.
 *
 * 虽然变量可以很容易地插入它们自己的JavaScript代码，这要归功于
 * 借助“控制变量”事件中的“脚本”选项，您可以保存
 * 您只需将变量命名为“Eval: $gameParty.gold()”就可以迈出额外的一步.
 * 这将自动使它计算金币数量
 * 并用变量引用它.
 *
 * !! 警告 !!
 *
 * 如果您将此用作事件的页面条件，请记住任何
 * 对地图上事件所做的更改不会反映对所做的更改
 * 立即参考这些开关。为此，您必须刷新
 * 地图，这可以使用下面的plugin命令来完成:
 *
 * ============================================================================
 * 插件命令
 * ============================================================================
 *
 * 这些插件命令可以用来立即刷新地图或部队
 * 部队事件，以确保开关/变量数据得到注意和触发
 * 或随时更新.
 *
 * 插件命令:
 *
 *   RefreshMap
 *   - 这将刷新地图的所有事件。这将更新任何页面
 *   高级开关或变量的条件可能已经改变
 *   使用此插件命令之前的值。这个只能在外面用
 *   战斗！
 *
 *   RefreshTroop
 *   - 这将在战斗中刷新当前事件解释器。这将
 *   使用高级更新当前队伍中的任何页面条件
 *   在使用之前可能已经改变值的开关或变量
 *   插件命令.
 *   * 注意:如果你使用的是战斗引擎核心，就不会使用这个
 *   大多数时候是必要的.
 *
 * ============================================================================
 * 例子
 * ============================================================================
 *
 * 这里有一些例子，你可以使用高级开关和变量！
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 开关
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 * Eval: $gameActors.actor(1).isLearnedSkill(5)
 * - 这将检查角色1(在数据库中)是否学习了技能5
 * (在数据库中)。这可以用于一些技能，如“真实视力”
 * 某些事件在地图上的显示方式不同，或者某些事件发生在
 * 战斗(像看穿敌人的伪装).
 *
 * Eval: $gameActors.actor(2).isStateAffected(10)
 * - 这将检查执行事件2是否受到状态10的影响(在
 * 数据库)。如果参与者受其影响，则开关将返回 true.
 * 否则，它将返回false.
 *
 * Eval: $gameActors.actor(3).isEquipped($dataWeapons[100])
 * - 这将检查角色3(在数据库中)是否有武器100
 * (数据库中)配备。如果是这样，开关就会返回 true.
 * 否则，它会返回 false.
 *
 * Eval: $gameActors.actor(4).isEquipped($dataArmors[200])
 * - 这将进行检查，看看角色4(在数据库中)是否有护甲200
 * (在数据库中)装备。如果是这样，开关就会返回 true.
 * 否则，它会返回 false.
 *
 * Eval: $gameActors.actor(5).isDead()
 * - 这将检查角色5目前是否已经死亡。如果死了
 * 就会让角色附加死亡状态。如果角色
 * 是死的，开关将返回 true. Otherwise, 否则，它将返回 false.
 *
 * Eval: $gameActors.actor(6).isAlive()
 * - 这将检查角色6目前是否还活着。如果还活着
 * 就会让角色不会被附加死亡状态。如果
 * 角色还活着，开关会回来 true. 否则，它会返回 false.
 *
 * Eval: $gameVariables.value(2) < 3
 * - 映射事件页面条件只能在变量
 * 仅大于或等于一个值。现在你可以反其道而行之了
 * 并检查变量是否小于某个值。上面使用的例子
 * 将检查变量2的值是否小于3(但不等于)。
 *
 * Eval: $gameSelfSwitches.value([10,20,'A'])
 * - 这将允许一个事件使用另一个事件的自切换案例来
 * 确定它的状况。以上示例检查地图10、事件20是否为“A”
 * 自动开关打开.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 变量
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 * Eval: $gameParty.leader().actorId()
 * - 这将返回该主角的ID。这对于以下情况非常有用
 * 某些事件可能会有不同的反应，取决于你的主角是谁
 * 当时的主角.
 *
 * Eval: $gameParty.gold()
 * - 这将归还（）数量的金币。这个也可以用
 * 在一些活动的页面上，会出现一袋袋的金币
 * 以显示玩家有多富有.
 *
 * Eval: $gameParty.steps()
 * - 这将返回玩家走过的步数。这可能是
 * 根据不同的方式，战利品可能会出现在玩家的总部
 * 玩家走了很多步.
 *
 * Eval: $gameParty.aliveMembers().length
 * - 这将返回当前活着的成员的数量。最好如果
 * 用于战斗中，当试图使不同的事情发生时
 * 目前在战斗中活着的队友数量.
 *
 * Eval: $gameParty.deadMembers().length
 * - 这将返回相反的结果:当前
 * 队伍。当试图让不同的事情发生时，也最适合在战斗中使用
 * 取决于阵亡的队友数量.
 *
 * Eval: $gameParty.highestLevel()
 * - 这将使该队伍目前最高级别的成员回归。在战斗中，这
 * 将指行动中的积极一方。在战斗之外，它属于
 * 补位的队友.
 *
 * Eval: $gameParty.numItems($dataItems[1])
 * Eval: $gameParty.numItems($dataWeapons[2])
 * Eval: $gameParty.numItems($dataArmors[3])
 * - 这将返回项目的实际数量作为条件，而不是
 * 这将返回项目的实际数量作为条件，而不是
 * 不包括那些装备.
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
 * - Bug fixed to prevent compatibility problems with the Debugger.
 *
 * Version 1.00:
 * - Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 */
//=============================================================================

//=============================================================================
// Game_Switches
//=============================================================================

Yanfly.AdvSwVar.Game_Switches_value = Game_Switches.prototype.value;
Game_Switches.prototype.value = function(switchId) {
  if (this.isAdvancedSwitch(switchId)) {
    return this.runAdvancedSwitchCode(switchId);
  } else {
    return Yanfly.AdvSwVar.Game_Switches_value.call(this, switchId);
  }
};

Game_Switches.prototype.isAdvancedSwitch = function(switchId) {
  if (SceneManager._scene._debugActive) return false;
  if (SceneManager._scene instanceof Scene_Debug) return;
  var name = $dataSystem.switches[switchId];
  if (name.match(/EVAL:[ ](.*)/i)) return true;
  return false;
};

Game_Switches.prototype.runAdvancedSwitchCode = function(switchId) {
  var value = false;
  var name = $dataSystem.switches[switchId];
  if (name.match(/EVAL:[ ](.*)/i)) {
    var code = 'value = ' + String(RegExp.$1);
  } else {
    return this.defaultAdvancedSwitchResult(switchId);
  }
  try {
    eval(code);
  } catch (e) {
    Yanfly.Util.displayError(e, code, 'ADVANCED SWITCH ' + switchId + 
    ' EVAL ERROR');
  }
  return value;
};

Game_Switches.prototype.defaultAdvancedSwitchResult = function(switchId) {
  return false;
};

//=============================================================================
// Game_Variables
//=============================================================================

Yanfly.AdvSwVar.Game_Variables_value = Game_Variables.prototype.value;
Game_Variables.prototype.value = function(variableId) {
  if (this.isAdvancedVariable(variableId)) {
    return this.runAdvancedVariableCode(variableId);
  } else {
    return Yanfly.AdvSwVar.Game_Variables_value.call(this, variableId);
  }
};

Game_Variables.prototype.isAdvancedVariable = function(variableId) {
  if (SceneManager._scene._debugActive) return false;
  if (SceneManager._scene instanceof Scene_Debug) return;
  var name = $dataSystem.variables[variableId];
  if (name.match(/EVAL:[ ](.*)/i)) return true;
  return false;
};

Game_Variables.prototype.runAdvancedVariableCode = function(variableId) {
  var value = 0;
  var name = $dataSystem.variables[variableId];
  if (name.match(/EVAL:[ ](.*)/i)) {
    var code = 'value = ' + String(RegExp.$1);
  } else {
    return this.defaultAdvancedVariableResult(variableId);
  }
  try {
    eval(code);
  } catch (e) {
    Yanfly.Util.displayError(e, code, 'ADVANCED VARIABLE' + variableId +
    ' EVAL ERROR');
  }
  return value;
};

Game_Switches.prototype.defaultAdvancedVariableResult = function(variableId) {
  return 0;
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.AdvSwVar.Game_Interpreter_pluginCommand =
  Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.AdvSwVar.Game_Interpreter_pluginCommand.call(this, command, args);
  if (command === 'RefreshMap') {
    if (!$gameParty.inBattle()) {
      $gameMap.requestRefresh($gameMap.mapId());
    }
  }
  if (command === 'RefreshTroop') {
    if ($gameParty.inBattle()) {
      $gameTroop.setupBattleEvent();
    }
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