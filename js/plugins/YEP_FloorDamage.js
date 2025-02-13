//=============================================================================
// Yanfly Engine Plugins - Floor Damage
// YEP_FloorDamage.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_FloorDamage = true;

var Yanfly = Yanfly || {};
Yanfly.FloorDmg = Yanfly.FloorDmg || {};
Yanfly.FloorDmg.version = 1.02;

//=============================================================================
 /*:
 * @plugindesc v1.02 地形伤害.
 * You can also change the color of the flash when damaged, too.
 * @author Yanfly Engine Plugins
 *
 * @param Default Damage
 * @type number
 * @min 1
 * @desc 这是图块伤害造成的默认伤害.
 * @default 10
 *
 * @param Flash Color
 * @desc 默认情况下，这是用于所有图块伤害的显示颜色.
 * 按红、绿、蓝、不透明度插入它们，值从0-255
 * @default 255, 0, 0, 128
 *
 * @help
 * ============================================================================
 * 正式介绍
 * ============================================================================
 *
 * 对于那些想让不同的图块造成不同伤害的人来说，
 * 这个插件可以让你完成这样的事情。
 * 这样，一些图块可以比其他图块造成更多伤害，
 * 而不是对每个角色造成10点静态伤害。
 * 除此之外，你也可以改变伤害显示的颜色！
 *
 * ============================================================================
 * 注释标记
 * ============================================================================
 *
 * 请在你的图块备注栏插入下面的命令:
 *
 * Tileset Notetag:
 *
 *   <Floor Damage x: y>
 *   - 'x' 是用来标记图块的地形标记. 默认情况下，地形标
 *   签设置为0。 他们会涨到7。 'y' 是派对中每个参与者受到
 *   的伤害. 例如， <Floor Damage 2: 50>将导致所有标有地形
 *   标签2的伤害牌造成50点伤害。
 *   * 注意:您仍然需要在数据库编辑器中将图块本身
 *   设置为伤害图块.
 *
 *   <Floor Flash x: r, g, b, o>
 *   - 'x' 是用来标记图块的地形标记. 
 *   r,g,b,o为颜色值透明度。
 *   这个可以设置伤害显示的颜色，
 *   当玩家受到此图块的伤害时的组合.
 *   * 注意: 你需要将图块设置为
 *   伤害害图块才可以生效.
 *
 * ============================================================================
 * Lunatic Mode - 自定义伤害图块
 * ============================================================================
 *
 * 对于那些有JavaScript经验的人来说，你可以让某些地形标签生效
 * 对你的角色造成伤害.
 *
 * Tileset Notetag:
 *
 *   <Custom Floor Damage x>
 *    value = actor.level;
 *   </Custom Floor Damage x>
 *   - 'x' 是用来标记图块的地形标记. 默认情况下，地形
 *   标签设置为0。他们会涨到7。y代表
 *   对队伍中每个角色的伤害. 'value' 是最终的伤害
 *   这将添加到 <Floor Damage x: y> 值中. 'actor' 指的是
 *   目前被伤害的角色.
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

Yanfly.Parameters = PluginManager.parameters('YEP_FloorDamage');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.FloorDmgDefault = Number(Yanfly.Parameters['Default Damage']);
Yanfly.SetupParameters = function() {
  var array = String(Yanfly.Parameters['Flash Color']).split(',');
  for (var i = 0; i < array.length; ++i) {
    array[i] = parseInt(array[i].trim());
  }
  Yanfly.Param.FloorDmgFlash = array;
};
Yanfly.SetupParameters();

//=============================================================================
// DataManager
//=============================================================================

Yanfly.FloorDmg.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.FloorDmg.DataManager_isDatabaseLoaded.call(this)) return false;

  if (!Yanfly._loaded_YEP_FloorDamage) {
    this.processFloorDmgNotetags1($dataTilesets);
    Yanfly._loaded_YEP_FloorDamage = true;
  }
  
  return true;
};

DataManager.processFloorDmgNotetags1 = function(group) {
  var note1a = /<(?:CUSTOM FLOOR DAMAGE|custom floor dmg)[ ](\d+)>/i;
  var note1b = /<\/(?:CUSTOM FLOOR DAMAGE|custom floor dmg)[ ](\d+)>/i;
  var note2 = /<FLOOR FLASH[ ](\d+):[ ](.*)>/i
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.floorDmg = [
      Yanfly.Param.FloorDmgDefault, Yanfly.Param.FloorDmgDefault,
      Yanfly.Param.FloorDmgDefault, Yanfly.Param.FloorDmgDefault,
      Yanfly.Param.FloorDmgDefault, Yanfly.Param.FloorDmgDefault,
      Yanfly.Param.FloorDmgDefault, Yanfly.Param.FloorDmgDefault
    ];
    obj.floorDmgFlash = [
      Yanfly.Param.FloorDmgFlash, Yanfly.Param.FloorDmgFlash,
      Yanfly.Param.FloorDmgFlash, Yanfly.Param.FloorDmgFlash,
      Yanfly.Param.FloorDmgFlash, Yanfly.Param.FloorDmgFlash,
      Yanfly.Param.FloorDmgFlash, Yanfly.Param.FloorDmgFlash
    ]
    var evalMode = 'none';
    var terrainId = 0;
    obj.floorDmgEval = ['', '', '', '', '', '', '', ''];

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:FLOOR DAMAGE|floor dmg)[ ](\d+):[ ](\d+)>/i)) {
        var tag = parseInt(RegExp.$1).clamp(0, 7);
        var dmg = parseInt(RegExp.$2);
        obj.floorDmg[tag] = dmg;
      } else if (line.match(note1a)) {
        evalMode = 'custom floor damage';
        var terrainId = parseInt(RegExp.$1).clamp(0, 7);
      } else if (line.match(note1b)) {
        evalMode = 'none';
      } else if (evalMode === 'custom floor damage') {
        obj.floorDmgEval[terrainId] += line + '\n';
      } else if (line.match(note2)) {
        var tag = parseInt(RegExp.$1).clamp(0, 7);
        var array = String(RegExp.$2).split(',');
        for (var a = 0; a < array.length; ++a) {
          array[a] = parseInt(array[a].trim());
        }
        if (array.length === 4) obj.floorDmgFlash[tag] = array;
      }
    }
  }
};

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.basicFloorDamage = function() {
  var value = $gameMap.evaluateFloorDamage(this);
  return Math.ceil(value);
};

Game_Actor.prototype.performMapDamage = function() {
  if ($gameParty.inBattle()) return;
  var terrainTag = $gamePlayer.terrainTag();
  var tileset = $gameMap.tileset();
  var data = tileset.floorDmgFlash[terrainTag] || [255, 0, 0, 128];
  $gameScreen.startFlash(data, 8);
};

//=============================================================================
// Game_Map
//=============================================================================

Game_Map.prototype.evaluateFloorDamage = function(actor) {
  var terrainTag = $gamePlayer.terrainTag();
  var tileset = this.tileset();
  var value = tileset.floorDmg[terrainTag] || 10;
  var a = actor;
  var b = actor;
  var user = actor;
  var subject = actor;
  var target = actor;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  var code = tileset.floorDmgEval[terrainTag] || 0;
  try {
    eval(code);
  } catch (e) {
    Yanfly.Util.displayError(e, code, 'CUSTOM FLOOR DAMAGE ERROR');
  }
  return value;
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
