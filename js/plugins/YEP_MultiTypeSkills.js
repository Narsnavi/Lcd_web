//=============================================================================
// Yanfly Engine Plugins - Multi-Type Skills
// YEP_MultiTypeSkills.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_MultiTypeSkills = true;

var Yanfly = Yanfly || {};
Yanfly.MTS = Yanfly.MTS || {};
Yanfly.MTS.version = 1.01;

//=============================================================================
 /*:
 * @plugindesc v1.01 允许技能有多种类型
 * appear in different skill type schools instead of just one.
 * @author Yanfly Engine Plugins + Tigress Collaboration
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * 在RPG Maker MV中，每个技能只能分配一个技能类
 * 型。这意味着在滚动技能列表时，每个技能只能出现在
 * 一个技能类型库中。然而，在传统的角色扮演游戏中，
 * 我们有时会看到存在于多种技能类型中的技能。
 * "Cure"法术可能同时出现在"White Magic" 和 "Red Magic" 中。
 * 这个插件允许给技能多种技能类型。
 *
 * This is a collaboration plugin by Tigress and Yanfly to ensure compatibility
 * with the Yanfly Engine Plugins library.
 *
 * ============================================================================
 * 注释标记
 * ============================================================================
 *
 * 将这些备注标签插入
 * 您希望拥有多种技能类型的技能备注框中。
 *
 * 技能注释标签:
 *
 *   <Skill Type: x>
 *   <Skill Types: x, x, x>
 *   <Skill Types: x to y>
 *   - 为修改后的技能提供多种技能类型的x(或y)。
 *   这将自动包括编辑器放置的技能类型。
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.01:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

//=============================================================================
// DataManager
// ----------------------------------------------------------------------------
// Notetags added by Yanfly
//=============================================================================

Yanfly.MTS.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.MTS.DataManager_isDatabaseLoaded.call(this)) return false;

  if (!Yanfly._loaded_YEP_MultiTypeSkills) {
    this.processMTSNotetags1($dataSkills);
    Yanfly._loaded_YEP_MultiTypeSkills = true;
  }
  
  return true;
};

DataManager.processMTSNotetags1 = function(group) {
  var note1 = /<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note2 = /<SKILL[ ](?:TYPE|TYPES):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.skillTypes = [obj.stypeId];

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note1)) {
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        obj.skillTypes = obj.skillTypes.concat(array);
      } else if (line.match(note2)) {
        var range = Yanfly.Util.getRange(parseInt(RegExp.$1),
          parseInt(RegExp.$2));
        obj.skillTypes = obj.skillTypes.concat(range);
      }
    }
  }
};

//=============================================================================
// Game_BattlerBase
//=============================================================================

Yanfly.MTS.Game_BattlerBase_msC =
  Game_BattlerBase.prototype.meetsSkillConditions;
Game_BattlerBase.prototype.meetsSkillConditions = function(skill) {
  var value = Yanfly.MTS.Game_BattlerBase_msC.call(this, skill);
  if (!value) return false;
  if (skill && skill.skillTypes) {
    var length = skill.skillTypes;
    for (var n = 0; n < length; n++) {
      if (this.isSkillTypeSealed(skill.skillTypes[n])) {
        return false;
      }
    }
  }
  return true;
};

//=============================================================================
// Window_SkillList
//=============================================================================

Window_SkillList.prototype.matchSkillType = function(item) {
  if (item) {
    if (item.stypeId === this._stypeId) {
      return true;
    } else if (item.skillTypes && item.skillTypes.contains(this._stypeId)) {
      return true;
    }
  }
  return false;
};

if (Imported.YEP_SkillCore) {

Window_SkillList.prototype.includes = function(item) {
  if (this._actor) {
    if (!this._actor.noHiddenSkillConditionsMet(item)) return false;
  }
  return this.matchSkillType(item);
};

} else { // No YEP Skill Core

Window_SkillList.prototype.includes = function(item) {
  return item && this.matchSkillType(item);
};

} // Imported.YEP_SkillCore

//=============================================================================
// Utilities
// ----------------------------------------------------------------------------
// Provided by Yanfly
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

Yanfly.Util.getRange = function(n, m) {
  var result = [];
  for (var i = n; i <= m; ++i) result.push(i);
  return result;
};

//=============================================================================
// End of File
//=============================================================================