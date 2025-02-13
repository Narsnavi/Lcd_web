//=============================================================================
// Yanfly Engine Plugins - Footstep Sounds
// YEP_FootstepSounds.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_FootstepSounds = true;

var Yanfly = Yanfly || {};
Yanfly.Footsteps = Yanfly.Footsteps || {};
Yanfly.Footsteps.version = 1.01;

//=============================================================================
 /*:
 * @plugindesc v1.01 脚步声
 * events walk over specific tiles.
 * @author Yanfly Engine Plugins + Chickie Collaboration
 *
 * @param ---Default---
 * @default
 *
 * @param Default Sound
 * @parent ---Default---
 * @type file
 * @dir audio/se/
 * @require 1
 * @desc 用于所有图块的默认SE声音.
 * @default Move1
 *
 * @param Default Volume
 * @parent ---Default---
 * @desc 默认情况下脚步的音量.
 * 插入数值.
 * @default 10
 *
 * @param Default Pitch
 * @parent ---Default---
 * @desc 默认情况下脚步的音高.
 * 插入数值.
 * @default 150
 *
 * @param ---Player Settings---
 * @default
 *
 * @param Player Enable
 * @parent ---Player Settings---
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc 是否播放脚步声
 * Disable - false     Enable - true
 * @default true
 *
 * @param Player Volume
 * @parent ---Player Settings---
 * @desc 脚步的音量的大小
 * Use a float value. 1.00 = 100%    0.50 = 50%
 * @default 1.00
 *
 * @param Player Pitch
 * @parent ---Player Settings---
 * @desc 脚步的音高的大小
 * Use a float value. 1.00 = 100%    0.50 = 50%
 * @default 1.00
 *
 * @param ---Event Settings---
 * @default
 *
 * @param Event Enable
 * @parent ---Event Settings---
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc 是否为事件播放脚步声
 * Disable - false     Enable - true
 * @default true
 *
 * @param Event Volume
 * @parent ---Event Settings---
 * @desc 在什么音量下播放脚步声
 * Use a float value. 1.00 = 100%    0.50 = 50%
 * @default 1.00
 *
 * @param Distance Volume
 * @parent ---Event Settings---
 * @desc 根据每个图块的差异来更改音量
 * 从事件到玩家. Use a float value.
 * @default -0.10
 *
 * @param Event Pitch
 * @parent ---Event Settings---
 * @desc 在移动中中脚步的音高的大小
 * Use a float value. 1.00 = 100%    0.50 = 50%
 * @default 1.00
 *
 * @param Distance Pitch
 * @parent ---Event Settings---
 * @desc 改变每个图块的间距
 * 从事件到玩家. Use a float value.
 * @default -0.00
 *
 * @param Distance Pan
 * @parent ---Event Settings---
 * @desc 根据每个图块的差异来改变平移
 * from event to player. Use an int value.
 * @default 10
 *
 * @help
 * ============================================================================
 * 正式介绍
 * ============================================================================
 *
 * 这个插件给你的玩家和/或事件提供脚步声
 * 这些由玩家和/或事件做出的脚步可以有不同
 * 基于区域、图块等发出的声音。如果脚步声
 * 为行走启用后，他们可以根据距离调整音量和音高
 * 让玩家进一步沉浸其中.
 *
 * This is a collaboration plugin by Chickie and Yanfly to ensure compatibility
 * with the Yanfly Engine Plugins library.
 *
 * ============================================================================
 * 指令
 * ============================================================================
 *
 * 这个插件需要一些设置。调整插件参数，
 * 设置一组默认的脚步声，当没有设置其他内容时播放。
 * 当没有特定于区域的音效或特定于地形标签的音效时，
 * 将播放这些音效.
 *
 * 当然你也可以进入数据库，
 * 基于地形标志ID设置一种脚步声，
 * 图块可以播放特定的声音
 * 具体方法请仔细阅读后续的备注设置讲解。
 * 这种方法会比默认脚步声的优先级高
 * 如果玩家或事件踩在脚步声绑定到地形标签的图块上，
 * 则会播放脚步声音.
 *
 * 优先级更高的是基于区域的脚步声。如果
 * 玩家或事件踩在具有基于区域的脚步声的图块上，
 * 则不管地形标签设置如何，都将播放该声音
 * 为特定的图块制作。请在下面的注释标签部分查找
 * 关于如何让一个特定的区域ID播放一个脚步声的注释标签设置。
 *
 * 总而言之，从最低到最高优先级顺序:
 *
 *   LOWEST  - 默认脚步声
 *             地形标志ID设置
 *   HIGHEST - 区域ID设置
 *
 * 如果你想给整个地图一个特定的脚步声，
 * 可以设置区域ID为0的声音.
 *
 * ============================================================================
 * 注释标记
 * ============================================================================
 *
 * 插入以下注释标签，将脚步声添加到地图中.
 *
 * 事件注释标签:
 *
 *   <No Footsteps>
 *   - 设置某个事件无脚步声
 *   footsteps when moving.
 *
 * Tileset Notetags:
 *
 *   <Terrain Tag x Footstep Sound: filename>
 *   <Terrain Tag x Footstep Sound: filename, volume>
 *   <Terrain Tag x Footstep Sound: filename, volume, pitch>
 *   - 将“x”替换为地形标签ID(从1到7)。. 如果使用0，它将
 *   被忽视.  插入文件名时，文件名必须区分大小写
 *   不得包含扩展名。 'volume' 和“ 'pitch'
 *   如果使用变量，它们必须是介于0和100之间的整数值.
 *
 *   Examples:
 *
 *   <Terrain Tag 1 Footstep Sound: Move1>
 *   <Terrain Tag 2 Footstep Sound: Move2, 80>
 *   <Terrain Tag 3 Footstep Sound: Move3, 75, 150>
 *
 *   在以上示例中，由地形标签1、2或3标记的图块将
 *   当被玩家或一个
 *   可以触发足迹的事件.
 *
 * Map Notetags:
 *
 *   <Region x Footstep Sound: filename>
 *   <Region x Footstep Sound: filename, volume>
 *   <Region x Footstep Sound: filename, volume, pitch>
 *   - 将“x”替换为区域标签标识(从1到255).如果使用0，它
 *   将成为默认的脚步声。插入文件名时
 *   文件名必须区分大小写，并且不得包含扩展名。这
 *   如果使用'volume' 和 'pitch' 变量，它们必须是介于0和100
 *   之间的整数值.
 *
 *   例子:
 *
 *   <Region 10 Footstep Sound: Move1>
 *   <Region 20 Footstep Sound: Move2, 80>
 *   <Region 30 Footstep Sound: Move3, 75, 150>
 *
 *   在上面的例子中，由区域10、20或30标记的图块
 *   将在被玩家踩上时或在可能触发脚步声的事件中播放它们各自
 *   的声音效果.
 *
 * ============================================================================
 * 插件命令
 * ============================================================================
 *
 * 如果你想在游戏中随时启用/禁用脚步声音，
 * 你可以使用一些插件命令来实现。
 *
 * 插件命令:
 *
 *   EnableFootsteps
 *   - 打开脚步声.
 *
 *   DisableFootsteps
 *   - 关闭脚步声.
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_FootstepSounds');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.Footsteps = {
  defaultSound:   String(Yanfly.Parameters['Default Sound']),
  defaultVolume:  Number(Yanfly.Parameters['Default Volume']),
  defaultPitch:   Number(Yanfly.Parameters['Default Pitch']),

  PlayerEnable:   eval(String(Yanfly.Parameters['Player Enable'])),
  PlayerVolume:   parseFloat(Yanfly.Parameters['Player Volume']),
  PlayerPitch:    parseFloat(Yanfly.Parameters['Player Pitch']),

  EventEnable:    eval(String(Yanfly.Parameters['Event Enable'])),
  EventVolume:    parseFloat(Yanfly.Parameters['Event Volume']),
  DistanceVolume: parseFloat(Yanfly.Parameters['Distance Volume']),
  EventPitch:     parseFloat(Yanfly.Parameters['Event Pitch']),
  DistancePitch:  parseFloat(Yanfly.Parameters['Distance Pitch']),
  DistancePan:    parseInt(Yanfly.Parameters['Distance Pan'])
};

//=============================================================================
// DataManager
//=============================================================================

Yanfly.Footsteps.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.Footsteps.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!Yanfly._loaded_YEP_FootstepSounds) {
    this.processFootstepNotetags($dataTilesets);
    Yanfly._loaded_YEP_FootstepSounds = true;
  }
  return true;
};

DataManager.processFootstepNotetags = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.terrainTagFootstepSounds = {
      0: [
        Yanfly.Param.Footsteps.defaultSound, 
        Yanfly.Param.Footsteps.defaultVolume, 
        Yanfly.Param.Footsteps.defaultPitch
      ]
    };

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<TERRAIN[ ]TAG[ ](\d+)[ ]FOOTSTEP SOUND:[ ](.*)>/i)) {
        var tagId = parseInt(RegExp.$1).clamp(1, 7);
        var footstepData = String(RegExp.$2).split(',');
        footstepData[0] = footstepData[0].trim();
        footstepData[1] = footstepData[1] ||
          Yanfly.Param.Footsteps.defaultVolume;
        footstepData[1] = parseInt(footstepData[1]);
        footstepData[2] = footstepData[2] ||
          Yanfly.Param.Footsteps.defaultPitch;
        footstepData[2] = parseInt(footstepData[2]);
        obj.terrainTagFootstepSounds[tagId] = footstepData;
      }
    }
  }
};

DataManager.processMapFootstepNotetags = function() {
  if (!$dataMap) return;

  $dataMap.regionFootstepSounds = {
    0: [
      Yanfly.Param.Footsteps.defaultSound, 
      Yanfly.Param.Footsteps.defaultVolume, 
      Yanfly.Param.Footsteps.defaultPitch
    ]
  };

  if (!$dataMap.note) return;
  var notedata = $dataMap.note.split(/[\r\n]+/);
  for (var i = 0; i < notedata.length; i++) {
    var line = notedata[i];
    if (line.match(/<REGION[ ](\d+)[ ]FOOTSTEP SOUND:[ ](.*)>/i)) {
      var regionId = parseInt(RegExp.$1).clamp(0, 255);
      var footstepData = String(RegExp.$2).split(',');
      footstepData[0] = footstepData[0].trim();
      footstepData[1] = footstepData[1] || Yanfly.Param.Footsteps.defaultVolume;
      footstepData[1] = parseInt(footstepData[1]);
      footstepData[2] = footstepData[2] || Yanfly.Param.Footsteps.defaultPitch;
      footstepData[2] = parseInt(footstepData[2]);
      $dataMap.regionFootstepSounds[regionId] = footstepData;
    }
  }
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.Footsteps.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
  Yanfly.Footsteps.Game_System_initialize.call(this);
  this.initFootstepSettings();
};

Game_System.prototype.initFootstepSettings = function() {
  this._footstepsEnabled = true;
};

Game_System.prototype.canHearFootsteps = function() {
  if (this._footstepsEnabled === undefined) this.initFootstepSettings();
  return this._footstepsEnabled;
};

Game_System.prototype.setHearFootsteps = function(value) {
  if (this._footstepsEnabled === undefined) this.initFootstepSettings();
  this._footstepsEnabled = value;
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.Footsteps.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.Footsteps.Game_Interpreter_pluginCommand.call(this, command, args);
  if (command === 'EnableFootsteps') {
    $gameSystem.setHearFootsteps(true);
  } else if (command === 'DisableFootsteps') {
    $gameSystem.setHearFootsteps(false);
  }
};

Game_Interpreter.prototype.argsToString = function(args) {
  var str = '';
  var length = args.length;
  for (var i = 0; i < length; ++i) {
    str += args[i] + ' ';
  }
  return str.trim();
};

//=============================================================================
// Game_Map
//=============================================================================

Yanfly.FootstepsGame_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
  if ($dataMap) DataManager.processMapFootstepNotetags();
  Yanfly.FootstepsGame_Map_setup.call(this, mapId);
};

//=============================================================================
// Game_CharacterBase
//=============================================================================

Yanfly.Footsteps.Game_CharacterBase_increaseSteps =
  Game_CharacterBase.prototype.increaseSteps;
Game_CharacterBase.prototype.increaseSteps = function() {
  Yanfly.Footsteps.Game_CharacterBase_increaseSteps.call(this);
  if (this !== $gamePlayer) {
    this.processFootstepSound();
  }
};

Game_CharacterBase.prototype.canPlayFootsteps = function() {
  if (!$gameSystem.canHearFootsteps()) return false;
  if (this._canPlayFootsteps !== undefined) return this._canPlayFootsteps;
  this._canPlayFootsteps = Yanfly.Param.Footsteps.EventEnable;
  return this._canPlayFootsteps;
};

Game_CharacterBase.prototype.processFootstepSound = function() {
  if (this.canPlayFootsteps() && $gameSystem.canHearFootsteps()) {
    var player = $gamePlayer;
    var distance = $gameMap.distance(this.x, this.y, player.x, player.y);
    var volume = Yanfly.Param.Footsteps.EventVolume || 0;
    volume += distance * Yanfly.Param.Footsteps.DistanceVolume;
    var pitch = Yanfly.Param.Footsteps.EventPitch || 0;
    pitch += distance * Yanfly.Param.Footsteps.DistancePitch;
    var pan = 0;
    pan -= $gameMap.deltaX(this.x, player.x);
    this.playFootstepSound(volume, pitch, pan);
  };
};

Game_CharacterBase.prototype.playFootstepSound = function(volume, pitch, pan) {
  if (volume <= 0) return;
  if (pitch <= 0) return;
  if (!$dataMap) return;
  if (!$dataMap.regionFootstepSounds) DataManager.processMapFootstepNotetags();
  var x = this.x;
  if (this.x === 6) {
    x += 1;
  } else if (this.x === 4) {
    x -= 1;
  }
  var y = this.y;
  if (this.y === 2) {
    y += 1;
  } else if (this.y === 8) {
    y -= 1;
  }
  var regionId = $gameMap.regionId(x, y)
  var terrainTag = $gameMap.terrainTag(x, y);
  if (regionId > 0) {
    var footstepData = $dataMap.regionFootstepSounds[regionId];
  }
  if (!footstepData && terrainTag > 0) {
    var footstepData = $gameMap.tileset().terrainTagFootstepSounds[terrainTag];
  }
  if (!footstepData) footstepData = $dataMap.regionFootstepSounds[0];
  var se = {
    name:   footstepData[0],
    volume: footstepData[1] * volume,
    pitch:  footstepData[2] * pitch,
    pan:    pan.clamp(-100, 100)
  };
  AudioManager.playSe(se);
};

//=============================================================================
// Game_Player
//=============================================================================

Yanfly.Footsteps.Game_Player_increaseSteps =
  Game_Player.prototype.increaseSteps;
Game_Player.prototype.increaseSteps = function() {
  Yanfly.Footsteps.Game_Player_increaseSteps.call(this);
  this.processFootstepSound();
};

Game_Player.prototype.canPlayFootsteps = function() {
  if (!$gameSystem.canHearFootsteps()) return false;
  if (!this.isNormal()) return false;
  return Yanfly.Param.Footsteps.PlayerEnable;
};

Game_Player.prototype.processFootstepSound = function() {
  if (this.canPlayFootsteps()) {
    var volume = Yanfly.Param.Footsteps.PlayerVolume || 0;
    var pitch = Yanfly.Param.Footsteps.PlayerPitch || 0;
    var pan = 0;
    this.playFootstepSound(volume, pitch, pan);
  };
};

//=============================================================================
// Game_Event
//=============================================================================

Game_Event.prototype.canPlayFootsteps = function() {
  if (!$gameSystem.canHearFootsteps()) return false;
  if (this._canPlayFootsteps !== undefined) return this._canPlayFootsteps;
  this._canPlayFootsteps = Yanfly.Param.Footsteps.EventEnable;
  var note = this.event().note;
  if (note.match(/<NO FOOTSTEPS>/i)) this._canPlayFootsteps = false;
  return this._canPlayFootsteps;
};

//=============================================================================
// Game_Follower
//=============================================================================

Game_Follower.prototype.canPlayFootsteps = function() {
  if (!this.isVisible()) return false;
  return Game_Character.prototype.canPlayFootsteps.call(this);
};

//=============================================================================
// End of File
//=============================================================================