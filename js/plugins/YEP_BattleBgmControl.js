//=============================================================================
// Yanfly Engine Plugins - Battle BGM Control
// YEP_BattleBgmControl.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_BattleBgmControl = true;

var Yanfly = Yanfly || {};
Yanfly.BattleBgm = Yanfly.BattleBgm || {};
Yanfly.BattleBgm.version = 1.01;

//=============================================================================
 /*:
 * @plugindesc v1.01 战斗背景音乐控制
 * during battle when certain enemies reach different HP values.
 * @author Yanfly Engine Plugins + Chickie Collaboration
 *
 * @help
 * ============================================================================
 * 正式介绍
 * ============================================================================
 *
 * 这个插件可以让你给特定的敌群事件分配特定的BGM
 * 将从地图过渡到战斗。此外，当一个BOSS
 * 敌人的生命值被降低到一定值，战斗背景也可以改变.
 * 这将有助于增加额外的战斗感觉，并使战斗BGM的
 * 对于更长时间的战斗来说是单调的.
 *
 * This is a collaboration plugin by Chickie and Yanfly to ensure compatibility
 * with the Yanfly Engine Plugins library.
 *
 * ============================================================================
 * Comment Tags
 * ============================================================================
 *
 * 要使一场特定的战斗在装载战斗时发挥特定的战斗技能，请制作一个
 * 在队伍的一个事件页面中。插入以下注释标签
 * to have it trigger a specific BGM to play when the battle starts.
 *
 * 敌群事件注释标签:
 *
 *   <Battle BGM Name: filename>
 *   - 用“文件名”来替换你想在战斗开始播放的BGM的文件名，不带文件后缀。
 *   文件名要注意大小写。
 *   比如你想播放Battle3.m4a，那就在标签里只用“Battle3”来替换文件名，
 *   不要“.m4a”，标签部分就只需要这个。
 *   一旦删除这个标签，就只会扫描事件页的残余部分了。
 *   余下的页均会忽略。
 *
 *   <Battle BGM Volume: x>
 *   - 用0到100之间的数字替换“x”。这决定了音量
 *   战斗开始时正在播放的BGM。这是一个可选标签.
 *   如果不使用，默认音量为90.
 *
 *   <Battle BGM Pitch: x>
 *   - 用0到100之间的数字替换“x”。这决定了音高
 *   战斗开始时正在播放的BGM。这是一个可选标签.
 *   如果不使用，它将默认为音高0.
 *
 *   <Battle BGM Pan: +x>
 *   <Battle BGM Pan: -x>
 *   - 用-100到100之间的数字替换“x”。这决定了声像
 *   战斗开始时正在播放的BGM。这是一个可选标签.
 *   如果不使用，它将默认为0.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * 您可以将这些标签设置插入到敌人的备注中，以使
 * 当敌人的生命值不同时，音乐会播放不同的背景音乐. 
 *
 * Enemy Notetags:
 *
 *   <Battle BGM x%: filename>
 *   <Battle BGM x%: filename, volume>
 *   <Battle BGM x%: filename, volume, pitch>
 *   <Battle BGM x%: filename, volume, pitch, pan>
 *   - 将上面的任何一个标签插入敌人的备注。替换“x”
 *   您希望更改战斗背景音乐的音量百分比。这
 *   音频的“filename”区分大小写. 替换 'volume'（音量） 和/或 'pitch'（音高）
 *   整数值从0到100。用整数值替换声音大小
 *   在-100到100之间。使用上面的任何一个标签。如果省略数据,
 *   它将默认音量为90，音高为100，声像为0.
 *
 *   * 注意:这将指定这个敌人为BOSS级别敌人
 *   战斗开始了。在战斗中，战斗中只能有一个主要敌人
 *   BGM更改。如果有多个，它将选择第一个可用的密钥
 *   敌人，并把它作为战斗.
 *
 *   如果你想让BOSS在多种不同的血量下播放不同的BGM
 *   values, insert multiples of the above notetags. However, make sure the
 *   notetags are in descending HP% order like such:
 *
 *   <Battle BGM 100%: Battle1, 90, 100, 0>
 *   <Battle BGM 70%: Battle2, 90, 110, 0>
 *   <Battle BGM 50%: Battle3, 90, 120, 0>
 *   <Battle BGM 20%: Battle4, 90, 130, 0>
 *   <Battle BGM 5%: Battle5, 90, 140, 0>
 *
 *   这是因为插件会从上到下检查。所以如果你想
 *  BOSS的生命值逐渐下降时播放的BGM，将它们放入
 *   这样的顺序.
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

Yanfly.BattleBgm.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.BattleBgm.DataManager_isDatabaseLoaded.call(this)) return false;

  if (!Yanfly._loaded_YEP_BattleBgmControl) {
    this.processBattleBgmNotetags1($dataTroops);
    this.processBattleBgmNotetags2($dataEnemies);
    Yanfly._loaded_YEP_BattleBgmControl = true;
  }
  
  return true;
};

DataManager.processBattleBgmNotetags1 = function(group) {
  var length = group.length;
  for (var t = 1; t < length; t++) {
    var troop = group[t];
    if (!troop) continue;
    troop.specificBgm = {
      name: undefined,
      volume: 90,
      pitch: 100,
      pan: 0,
      pos: 0
    }
    var pageLength = troop.pages.length;
    for (var p = 0; p < pageLength; ++p) {
      var page = troop.pages[p];
      if (page) this.processBattleBgmTroopData(troop, page);
    }
  }
};

DataManager.processBattleBgmTroopData = function(troop, page) {
  var length = page.list.length;
  var checked = false;
  for (var i = 0; i < length; i++) {
    var pageItem = page.list[i];
    if (pageItem) {
      if (pageItem.code === 108 || pageItem.code === 408) {
        var line = pageItem.parameters[0];
        if (line) {
          if (line.match(/<BATTLE BGM NAME:[ ](.*)>/i)) {
            troop.specificBgm['name'] = String(RegExp.$1);
            checked = true;
          } else if (line.match(/<BATTLE BGM VOLUME:[ ](\d+)>/i)) {
            troop.specificBgm['volume'] = parseInt(RegExp.$1);
          } else if (line.match(/<BATTLE BGM PITCH:[ ](\d+)>/i)) {
            troop.specificBgm['pitch'] = parseInt(RegExp.$1);
          } else if (line.match(/<BATTLE BGM PAN:[ ]([\+\-]\d+)>/i)) {
            troop.specificBgm['pan'] = parseInt(RegExp.$1);
          } else if (line.match(/<BATTLE BGM POSITION:[ ](\d+)>/i)) {
            troop.specificBgm['pos'] = parseInt(RegExp.$1);
          }
        }
      }
    }
    if (checked) {
      break;
    }
  }
};

DataManager.processBattleBgmNotetags2 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.battleBgmKeyEnemy = false;
    obj.battleBgmChanges = {};

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<BATTLE BGM[ ](\d+)([%％]):[ ](.*)>/i)) {
        var percentage = parseFloat(RegExp.$1) * 0.01;
        var data = String(RegExp.$3);
        obj.battleBgmChanges[percentage] = this.convertBattleBgmData(data);
        obj.battleBgmKeyEnemy = true;
      }
    }

    keys = Object.keys(obj.battleBgmChanges);
    keys = keys.sort();
  }
};

DataManager.convertBattleBgmData = function(str) {
  var data = str.split(',');
  for (var i = 0; i < data.length; i++) {
    data[i] = data[i].trim();
    if (i > 0) {
      data[i] = Number(data[i]);
    }
  }
  var obj = {
    name: data[0],
    volume: data[1] || 90,
    pitch: data[2] || 100,
    pan: data[3] || 0,
    pos: data[4] || 0
  }
  return obj;
};

//=============================================================================
// BattleManager
//=============================================================================

Yanfly.BattleBgm.BattleManager_playBattleBgm = BattleManager.playBattleBgm;
BattleManager.playBattleBgm = function() {
  if (AudioManager.getBattleBgmKeyEnemy()) {
    return AudioManager.updateBattleBgmKeyEnemy();
  }
  var troop = $dataTroops[$gameTroop._troopId];
  if (troop.specificBgm.name === undefined) {
    Yanfly.BattleBgm.BattleManager_playBattleBgm.call(this);
  } else {
    this.playBattleSpecificBgm(troop.specificBgm);
  }

};

BattleManager.playBattleSpecificBgm = function(settings) {
  AudioManager.playBgm(settings, settings.pos);
};

//=============================================================================
// AudioManager
//=============================================================================

AudioManager.clearBattleBgmKeyEnemy = function() {
  this._battleBgmKeyEnemy = undefined;
};

AudioManager.setBattleBgmKeyEnemy = function(enemy) {
  this._battleBgmKeyEnemy = enemy;
  this.updateBattleBgmKeyEnemy();
};

AudioManager.getBattleBgmKeyEnemy = function() {
  return this._battleBgmKeyEnemy;
};

AudioManager.updateBattleBgmKeyEnemy = function() {
  var settings = undefined;
  if (this._battleBgmKeyEnemy) {
    for (var key in this._battleBgmKeyEnemy.enemy().battleBgmChanges) {
      if (this._battleBgmKeyEnemy.hpRate() <= parseFloat(key)) {
        settings = this._battleBgmKeyEnemy.enemy().battleBgmChanges[key];
      } else {
        break;
      }
    }
  }
  if (settings !== undefined) {
    this.playBgm(settings, settings.pos);
  }
};

//=============================================================================
// Game_BattlerBase
//=============================================================================

Yanfly.BattleBgm.Game_BattlerBase_setHp = Game_BattlerBase.prototype.setHp;
Game_BattlerBase.prototype.setHp = function(hp) {
  Yanfly.BattleBgm.Game_BattlerBase_setHp.call(this, hp);
  if (this.isEnemy() && this === AudioManager.getBattleBgmKeyEnemy()) {
    AudioManager.updateBattleBgmKeyEnemy();
  }
};

//=============================================================================
// Game_Troop
//=============================================================================

Yanfly.BattleBgm.Game_Troop_setup = Game_Troop.prototype.setup;
Game_Troop.prototype.setup = function(troopId) {
  AudioManager.clearBattleBgmKeyEnemy();
  Yanfly.BattleBgm.Game_Troop_setup.call(this, troopId);
  this.detectAndSetBattleBgmKeyEnemy();
};

Game_Troop.prototype.detectAndSetBattleBgmKeyEnemy = function() {
  var members = this.members();
  for (var i = 0; i < members.length; i++) {
    var member = members[i];
    if (member) {
      if (member.enemy().battleBgmKeyEnemy) {
        AudioManager.setBattleBgmKeyEnemy(member);
        return;
      }
    }
  }
};

//=============================================================================
// End of File
//=============================================================================