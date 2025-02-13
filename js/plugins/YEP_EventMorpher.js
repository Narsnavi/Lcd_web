//=============================================================================
// Yanfly Engine Plugins - Event Morpher
// YEP_EventMorpher.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_EventMorpher = true;

var Yanfly = Yanfly || {};
Yanfly.EventMorph = Yanfly.EventMorph || {};
Yanfly.EventMorph.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc v1.00 允许事件完全变形为另一个, 
 * 复制覆盖所有页面、条件和事件命令.
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * 正式介绍
 * ============================================================================
 *
 * 警告:这个插件最好与RPG Maker MV 1.5.0或更高版本一起使用！这是
 * 因为MV 1.5.0编辑器允许这个插件有条不紊的进行
 * and efficient manner. Please make sure your RPG Maker MV software is up to
 * date before using this plugin to make the most out of it.
 *
 * 那些熟悉RPG Maker的人会知道你可以改变事件的方式
 * 操作不同的页面。然而，如果你想要一个事件
 * 完全变成另一个，也就是变形，通过将一个事件变形为另一个事件
 * 变形的事件将完全替换它的所有属性
 * 页面、条件、事件命令等。随着事件的发展.
 *
 * 这可以让玩家通过你的
 * 游戏。从植物到矿脉，再到新NPC雇来的
 * 通过改变一个事件，你给它一个新的目的
 * 持续功能.
 *
 * 此外，这个插件允许你保留任何你想要的变形，所以
 * 下一次玩家载入你的游戏时，用变形的
 * 事件，或者只是从战斗中回来，变形的变化仍然存在.
 *
 * 更多信息将在本指南的“说明”部分进行解释
 * 插件的帮助文件.
 *
 * ============================================================================
 * 指令
 * ============================================================================
 *
 * 使用插件参数 'Template Maps' 来选择你的游戏将使用的地图
 * 从预加载地图。这些地图将包含您想要的其他事件
 * 要变形的事件。任何类型的事件都可以用作变形模板,
 * 从触发事件到自动运行事件再到并行事件.
 *
 * 如果您正在使用RPG Maker MV 1.5.0+并且希望使用模板名称,
 * 通过 'Template Names' 插件参数添加它们。来自
 * 模板名称参数可以更改，游戏中的所有事件都使用
 * 具有相应模板名称的脚本调用将相应更新.
 *
 * ============================================================================
 * 脚本调用
 * ============================================================================
 *
 * 要使事件变形并变成其他东西，请使用以下命令
 * 脚本调用代码:
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Morph Event - Script Calls
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *   Yanfly.MorphEvent(targetId, mapId, eventId, preserved)
 *   - 这将导致目标事件变形为指定事件.
 *     - 用您希望变形的目标事件的标识替换 'targetId' .
 *     - 将 'mapId' 替换为要变形的事件的地图的ID.
 *     - 用事件的ID替换 'eventId'以将目标变形.
 *     - 用 'true' 或 'false' 替换 'preserved' 以保留变形.*
 *
 *   * Example: Yanfly.MorphEvent(15, 1, 5, true);
 *   - 当前地图上的事件15将变为地图1，事件5的事件.
 *   - 此事件将被保留.
 *
 *   * Example: Yanfly.MorphEvent(20, 2, 10, false);
 *   - 当前地图上的事件20将变为地图2，事件10的事件.
 *   - 此事件不会被保留.
 *
 *   - - -
 *
 *   Yanfly.MorphEventTemplate(targetId, template, preserved)
 *   - 这将导致目标事件基于模板名称变形.
 *     - 用您希望变形的目标事件的标识替换'targetId' .
 *     - 用 'Template Names' 插件参数中的名称替换 'template'.
 *       这必须是 'string' 形式(用引号将名称括起来).
 *     - 用 'true' 或 'false' 替换 'preserved' 以保留变形.*
 *
 *   * Example: Yanfly.MorphEvent(15, 'StrawberryPlant', true);
 *   - 当前地图上的事件15将变为由'StrawberryPlant'
 *      插件参数中的模板.
 *   - 此事件将被保留.
 *
 *   * Example: Yanfly.MorphEvent(20, 'MineralVein', false);
 *   - 当前地图上的事件20将变为由'MineralVein'
 *      插件参数中的模板.
 *   - 此事件不会被保留.
 *
 *   - - -
 *
 * * 注意:如果变形被保留，下次它将保持变形
 * 玩家重新进入地图.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 变形移除-脚本调用
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *   Yanfly.RemoveMorph(targetId)
 *   - 这将从目标中移除任何变形(和保留)的效果
 *   在当前地图上.
 *     - 用目标事件的标识替换 'targetId' 以删除变形.
 *
 *   * Example: Yanfly.RemoveMorph(15)
 *   - 当前地图的事件15将移除其变形效果.
 *   - 此事件的所有保留变形效果将被移除.
 *
 *   - - -
 *
 *   Yanfly.RemovePreserveMorph(targetMapId, targetEventId)
 *   - 这将从目标事件中移除任何保留的变形效果
 *   位于不同的地图上.
 *     - 用目标事件所在的映射的ID替换'targetMapId'.
 *     - 用目标事件的标识替换 'targetEventId' .
 *
 *   * Example: Yanfly.RemovePreserveMorph(10, 20)
 *   - 地图10的事件20的变形效果将被移除.
 *   - 此事件的所有保留变形效果将被移除.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.00:
 * - Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @param ---General---
 * @default
 *
 * @param TemplateMaps
 * @text Template Maps
 * @parent ---General---
 * @type number[]
 * @min 1
 * @max 999
 * @desc 将预加载到的地图的所有ID的列表
 * 作为这个插件的模板图.
 * @default ["1"]
 *
 * @param TemplateNames
 * @text Template Names
 * @parent ---General---
 * @type struct<Template>[]
 * @desc 按名称制作的模板列表，以便您可以使用名称
 * 而不是使用脚本调用的mapID和eventID组合.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Template Parameter Structure
 * ---------------------------------------------------------------------------
 */
/*~struct~Template:
 *
 * @param Name
 * @desc 模板的名称。该模板用于
 * 脚本调用: Yanfly.MorphEventTemplate
 * @default Untitled
 *
 * @param MapID
 * @text Map ID
 * @min 1
 * @max 999
 * @desc 使用此模板时要加载的地图的ID.
 * 注意:将自动将此ID添加到预载地图列表中.
 * @default 1
 *
 * @param EventID
 * @text Event ID
 * @min 1
 * @max 999
 * @desc 使用此模板时要变形的事件的ID.
 * @default 1
 * 
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_EventMorpher');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.EventMorpherData = eval(Yanfly.Parameters['TemplateMaps']);
Yanfly.Param.EventMorpherList = JSON.parse(Yanfly.Parameters['TemplateNames']);

Yanfly.PreloadedMaps = Yanfly.PreloadedMaps || [];

Yanfly.loadMapData = function(mapId) {
  mapId = mapId.clamp(1, 999);
  if (Yanfly.PreloadedMaps[mapId]) return;
  var src = 'Map%1.json'.format(mapId.padZero(3));
  var xhr = new XMLHttpRequest();
  var url = 'data/' + src;
  xhr.open('GET', url);
  xhr.overrideMimeType('application/json');
  xhr.onload = function() {
    if (xhr.status < 400) {
      Yanfly.PreloadedMaps[mapId] = JSON.parse(xhr.responseText);
    }
  };
  xhr.onerror = this._mapLoader || function() {
    DataManager._errorUrl = DataManager._errorUrl || url;
  };
  Yanfly.PreloadedMaps[mapId] = null;
  xhr.send();
};

Yanfly.SetupParameters = function() {
  // Process Template Names
  Yanfly.EventMorph.Template = {};
  var length = Yanfly.Param.EventMorpherList.length;
  for (var i = 0; i < length; ++i) {
    var data = JSON.parse(Yanfly.Param.EventMorpherList[i]);
    var name = data.Name.toUpperCase();
    Yanfly.loadMapData(parseInt(data.MapID));
    Yanfly.EventMorph.Template[name] = {
      mapId: data.MapID,
      eventId: data.EventID
    }
  }
  // Preload Map Data List
  var data = Yanfly.Param.EventMorpherData;
  var length = data.length;
  for (var i = 0; i < length; ++i) {
    var mapId = parseInt(data[i]);
    Yanfly.loadMapData(mapId)
  }
};
Yanfly.SetupParameters();

//=============================================================================
// Yanfly Morph Event - Script Calls
//=============================================================================

Yanfly.MorphEventFailChecks = function(targetId, mapId, eventId) {
  var target = $gameMap.event(targetId);
  if (!target) {
    if ($gameTemp.isPlaytest()) {
      console.log('Target Event ID ' + targetId + ' does not exist. ' +
        'It cannot be used for the Yanfly.MorphEvent function.');
    }
    return true;
  }
  if (!Yanfly.PreloadedMaps[mapId]) {
    if ($gameTemp.isPlaytest()) {
      console.log('Map ID ' + mapId + ' has not been preloaded. ' +
        'It cannot be used for the Morph Event function.');
    }
    return true;
  }
  if (!Yanfly.PreloadedMaps[mapId].events[eventId]) {
    if ($gameTemp.isPlaytest()) {
      console.log('Map ID ' + mapId + ', Event ID ' + eventId + ' does not ' +
        'exist. It cannot be used for the Morph Event function.');
    }
    return true;
  }
  return false;
};

Yanfly.MorphEvent = function(targetId, mapId, eventId, preserved) {
  if ($gameParty.inBattle()) return;
  if (Yanfly.MorphEventFailChecks(targetId, mapId, eventId)) return;
  preserved = preserved || false;
  var target = $gameMap.event(targetId);
  if (!target) return;
  target.morphInto(mapId, eventId);
  if (preserved) $gameSystem.logPreservedEventMorph(target);
};

Yanfly.MorphEventTemplate = function(targetId, template, preserved) {
  var str = template.toUpperCase();
  if (Yanfly.EventMorph.Template[str]) {
    var mapId = Yanfly.EventMorph.Template[str].mapId;
    var eventId = Yanfly.EventMorph.Template[str].eventId;
    Yanfly.MorphEvent(targetId, mapId, eventId, preserved);
  } else {
    console.log('Template ' + template + ' does not exist to morph into!');
  }
};

Yanfly.RemoteMorphEvent = function(targetMapId, targetEventId, mapId, eventId) {
  if ($gameParty.inBattle() && $gameTemp.isPlaytest()) return;
  if ($gameMap.mapId() === targetMapId) {
    Yanfly.MorphEvent(targetEventId, mapId, eventId, true);
  } else {
    $gameSystem.logPreservedEventMorphRaw(targetMapId, targetEventId,
      mapId, eventId);
  }
};

Yanfly.RemoteMorphEventTemplate = function(targetMapId, targetEventId, name) {
  var str = name.toUpperCase();
  if (Yanfly.EventMorph.Template[str]) {
    var mapId = Yanfly.EventMorph.Template[str].mapId;
    var eventId = Yanfly.EventMorph.Template[str].eventId;
    Yanfly.RemoteMorphEvent(targetMapId, targetEventId, mapId, eventId);
  } else {
    console.log('Template ' + name + ' does not exist to morph into!');
  }
};

Yanfly.RemoveMorph = function(targetId) {
  var target = $gameMap.event(targetId);
  if (!target) return;
  target.removeMorph();
};

Yanfly.RemovePreserveMorph = function(targetMapId, targetId) {
  if ($gameParty.inBattle() && $gameTemp.isPlaytest()) return;
  if (targetMapId === $gameMap.mapId()) return Yanfly.RemoveMorph(targetId);
  $gameSystem.removePreservedEventMorph(targetMapId, targetId);
};

Yanfly.RemoteRemoveMorph = function(targetMapId, targetId) {
  Yanfly.RemovePreserveMorph(targetMapId, targetId);
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.EventMorph.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
  Yanfly.EventMorph.Game_System_initialize.call(this);
  this.initEventMorpher();
};

Game_System.prototype.initEventMorpher = function() {
  this._preservedEventMorphs = {};
};

Game_System.prototype.getPreservedEventMorphs = function() {
  if (this._preservedEventMorphs === undefined) this.initEventMorpher();
  return this._preservedEventMorphs;
};

Game_System.prototype.logPreservedEventMorphRaw = function(a, b, c, d) {
  var targetMapId = a;
  var targetEventId = b;
  var mapId = c;
  var eventId = d;

  var key = [targetMapId, targetEventId];
  var preserved = this.getPreservedEventMorphs();

  preserved[key] = {
    mapId: mapId,
    eventId: eventId
  }
};

Game_System.prototype.logPreservedEventMorph = function(target) {
  var targetMapId = $gameMap.mapId();
  var targetEventId = target.eventId();
  var mapId = target._morphMapId;
  var eventId = target._morphEventId;
  this.logPreservedEventMorphRaw(targetMapId, targetEventId, mapId, eventId);
};

Game_System.prototype.getPreservedEventMorph = function(mapId, eventId) {
  var preserved = this.getPreservedEventMorphs();
  var key = [mapId, eventId];
  return preserved[key];
};

Game_System.prototype.removePreservedEventMorph = function(mapId, eventId) {
  var preserved = this.getPreservedEventMorphs();
  var key = [mapId, eventId];
  preserved[key] = undefined;
};

//=============================================================================
// Game_Event
//=============================================================================

Yanfly.EventMorph.Game_Event_initialize = Game_Event.prototype.initialize;
Game_Event.prototype.initialize = function(mapId, eventId) {
  this.initEventMorpher(mapId, eventId);
  Yanfly.EventMorph.Game_Event_initialize.call(this, mapId, eventId);
};

Game_Event.prototype.initEventMorpher = function(mapId, eventId) {
  this._morphed = false;
  this._morphMapId = mapId;
  this._morphEventId = eventId;
  var preserved = $gameSystem.getPreservedEventMorph(mapId, eventId);
  if (preserved) {
    var preservedId = this.eventId();
    var preservedX = $dataMap.events[eventId].x;
    var preservedY = $dataMap.events[eventId].y;
    this.morphInto(preserved.mapId, preserved.eventId);
    this._eventId = preservedId;
    var data = this.event();
    data.x = preservedX;
    data.y = preservedY;
  }
};

Yanfly.EventMorph.event = Game_Event.prototype.event;
Game_Event.prototype.event = function() {
  if (this._morphed) {
    return Yanfly.PreloadedMaps[this._morphMapId].events[this._morphEventId];
  } else {
    return Yanfly.EventMorph.event.call(this);
  }
};

Game_Event.prototype.morphInto = function(mapId, eventId) {
  this._morphed = true;
  this._morphMapId = mapId;
  this._morphEventId = eventId;
  this._pageIndex = -2;
  this.findProperPageIndex();
  this.setupPage();
  this.refresh();
  //this.forceGraphicalUpdate();
};

Game_Event.prototype.removeMorph = function() {
  $gameSystem.removePreservedEventMorph($gameMap.mapId(), this.eventId());
  this._morphed = false;
  this._pageIndex = -2;
  this.findProperPageIndex();
  this.setupPage();
  this.refresh();
  //this.forceGraphicalUpdate();
};

Game_Event.prototype.isEventMorphed = function() {
  if (this._morphed === undefined) {
    this.initEventMorpher(this._mapId, this._eventId);
  }
  return this._morphed;
};

Game_Event.prototype.getEventMorphedData = function() {
  if (this._morphed === undefined) {
    this.initEventMorpher(this._mapId, this._eventId);
  }
  return {
    mapId: this._morphMapId,
    eventId: this._morphEventId
  }
};

Game_Event.prototype.forceGraphicalUpdate = function() {
  var spriteset = SceneManager._scene._spriteset;
  if (!spriteset) return;
  var sprites = spriteset._characterSprites;
  var length = sprites.length;
  for (var i = 0; i < length; ++i) {
    var sprite = sprites[i];
    if (!sprite) continue;
    if (sprite._character !== this) continue;
    sprite.update();
  }
  spriteset.update();
};

//=============================================================================
// Game_Map
//=============================================================================

Yanfly.EventMorph.Game_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
  this.checkReloadForMorphedEvents(mapId);
  Yanfly.EventMorph.Game_Map_setup.call(this, mapId);
  this.processMorphedEvents();
};

Game_Map.prototype.checkReloadForMorphedEvents = function(mapId) {
  this._recordedMorphedEvents = false;
  if ($gamePlayer && $gamePlayer._needsMapReload) {
    if (mapId === this.mapId() && $gamePlayer) {
      this.recordMorphedEvents();
    }
  }
};

Game_Map.prototype.recordMorphedEvents = function() {
  this._recordedMorphedEvents = true;
  this._recordedMorphedEventData = {};
  var events = this.events();
  var length = events.length;
  for (var i = 0; i < length; ++i) {
    var ev = events[i];
    if (!ev) continue;
    if (!ev.isEventMorphed()) continue;
    this._recordedMorphedEventData[ev.eventId()] = ev.getEventMorphedData();
  }
};

Game_Map.prototype.processMorphedEvents = function() {
  if (!this._recordedMorphedEvents) return;
  for (var targetId in this._recordedMorphedEventData) {
    var data = this._recordedMorphedEventData[targetId];
    Yanfly.MorphEvent(targetId, data.mapId, data.eventId);
  }
  this._recordedMorphedEvents = false;
};

//=============================================================================
// End of File
//=============================================================================