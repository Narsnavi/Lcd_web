//=============================================================================
// Yanfly Engine Plugins - Event Spawner
// YEP_EventSpawner.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_EventSpawner = true;

var Yanfly = Yanfly || {};
Yanfly.EventSpawn = Yanfly.EventSpawn || {};
Yanfly.EventSpawn.version = 1.02;

//=============================================================================
 /*:
 * @plugindesc v1.02 事件衍生
 * points marked by regions.
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * 警告:这个插件最好与RPG Maker MV 1.5.0或更高版本一起使用！
 * because the MV 1.5.0 editor allows for this plugin to be made in an orderly
 * and efficient manner. Please make sure your RPG Maker MV software is up to
 * date before using this plugin to make the most out of it.
 *
 * 在RPG Maker MV中，可以隐藏和显示事件
 * 让自己看起来像是从无到有。然而,
 * 没有的功能可以从无到有地产生一个事件。这
 * 插件将为用户提供实际生成事件的能力
 * 从另一张地图预制并准备好.
 *
 * 衍生事件将包含来自其原始源、来自
 * 事件的页面条件到事件命令到图形设置。和
 * 如果将来原始源被更新，产生的事件将
 * 也更新。衍生事件也可以保留并保留在地图上
 * 如果玩家保存地图或重新加载保存.
 *
 * 更多信息将在本指南的“说明”部分进行解释
 * 插件的帮助文件.
 *
 * ============================================================================
 * 指令
 * ============================================================================
 *
 * 使用插件参数“模板地图”来选择你的游戏将使用的地图
 * 从预加载地图。这些地图将包含您想要的其他事件
 * 要生成的事件。任何类型的事件都可以用作种子模板
 * 触发事件以将事件自动执行为并行执行事件.
 *
 * 如果您正在使用RPG Maker MV 1.5.0+并且希望使用模板名称,
 * 通过“模板名称”插件参数添加它们。来自
 * 模板名称参数可以更改，游戏中的所有事件都使用
 * 具有相应模板名称的脚本调用将相应更新.
 *
 * --------------------
 * 生成限制
 * --------------------
 *
 * 然而，在事件发生之前，必须应用一些规则
 * 在想要的地方生成。它们如下:
 *
 *   1. 生成位置不能被另一个事件占用，即使
 *      事件具有不同的优先级。这是为了防止事件重叠
 *      并给 MV 引擎带来问题.
 *
 *   2. 生成地点不能有交通工具。这是为了防止
 *      触发时优先级与事件冲突.
 *
 *   3. 地图上必须有生成地点。它不能有坐标
 *      不能在地图边界之外.
 *
 * 只要遵循这些规则，事件将会适当地产生
 * 遵循下面部分中列出的脚本调用所使用的格式.
 *
 * ============================================================================
 * 脚本调用
 * ============================================================================
 *
 * 要将事件生成到地图中，请使用以下脚本调用:
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 产生事件-脚本调用
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *   这将使用来自 'mapId' 'eventId'的信息生成新事件
 *   作为它的基础。新事件的ID将从1001开始(或者无论您有什么
 *   将插件参数 'ID Starting Range' 设置为)和更高.
 *
 *   - - -
 *
 *   Yanfly.SpawnEventAt(mapId, eventId, x, y, preserved)
 *   - 这会将所需的事件产生到特定的坐标中.
 *     - 将'mapId'替换为地图ID.
 *     - 将'eventId'替换为事件的ID.
 *     - 将'x'替换为地图上的X位置以衍生事件.
 *     - 将'y'替换为地图上的Y位置以衍生事件.
 *     - X和Y位置不得在该位置存在事件.
 *     - 将'保留'替换为'true'或'false'以保留衍生.
 *
 *   * Example: Yanfly.SpawnEventAt(1, 5, 30, 40, true)
 *   - 地图1的事件5将在X，Y坐标:30，40处生成.
 *   - 此事件将被保留.
 *
 *   * Example: Yanfly.SpawnEventAt(2, 10, 50, 60, false)
 *   - 地图2的事件10将在X，Y坐标产生:50，60.
 *   - 此事件不会被保留.
 *
 *   - - -
 *
 *   Yanfly.SpawnEventTemplateAt(template, x, y, preserved)
 *   - 这将通过坐标处的模板名称产生所需的事件.
 *     - 用“模板”插件参数中的名称替换为“模板名称”.
 *       必须是“字符串”形式(用引号将名称括起来).
 *     - 将地图上的“X”替换为“X”位置，以生成事件.
 *     - 将地图上的“X”替换为“X”位置，以生成事件.
 *     - X和Y位置不得有事件出现在该位置.
 *     - 用 'true' 或 'false' 替换 'preserved' 以保留.
 *
 *   * Example: Yanfly.SpawnEventTemplateAt('StrawberryPlant', 30, 40, true)
 *   - 插件参数中的“StrawberryPlant”模板将为
 *     在X，Y坐标下生成:30，40.
 *   - 此事件将被保留.
 *
 *   * Example: Yanfly.SpawnEventTemplateAt('MineralVein', 50, 60, false)
 *   - 插件参数中的 'MineralVein' 模板将为
 *     在X，Y坐标上生成:50，60.
 *   - 此事件不会被保留.
 *
 *   - - -
 *
 *   Yanfly.SpawnEventInRegion(mapId, eventId, region, preserved)
 *   - 这将在一个区域内的随机位置产生需要的事件.
 *     - 将 'mapId' 替换为要变形的事件的地图ID.
 *     - 用事件的ID替换 'eventId' 以改变目的事件.
 *     - 将 'region' 替换为要生成事件的区域的ID.
 *       如果要使用多个区域，请将它们放在一个数组中.
 *     - 用 'true' 或 'false' 替换 'preserved' 以保留.
 *
 *   * Example: Yanfly.SpawnEventInRegion(1, 5, 20, true)
 *   - 地图1的事件5将在区域20的随机点生成.
 *   - 此事件将被保留.
 *
 *   * Example: Yanfly.SpawnEventInRegion(2, 10, [20, 25], true)
 *   - 地图2的事件10将在区域20或25的随机点生成.
 *   - 此事件不会被保留.
 *
 *   - - -
 *
 *   Yanfly.SpawnEventTemplateInRegion(template, region, preserved)
 *   - 这将在一个区域内的随机位置产生需要的事件.
 *     - 将 'template' 替换为 'Template Names' 插件参数中的名称.
 *       必须是“字符串”形式(用引号将名称括起来).
 *     - 将 'region' 替换为要生成事件的区域的ID.
 *       如果要使用多个区域，请将它们放在一个数组中.
 *     - 用 'true' 或 'false' 替换 'preserved' 以保留生成.
 *
 *   * Example: Yanfly.SpawnEventTemplateInRegion('StrawberryPlant', 20, true)
 *   - 插件参数中的“StrawberryPlant”模板将为
 *     在区域20中的随机点生成.
 *   - 此事件将被保留.
 *
 *   * Example: Yanfly.SpawnEventTemplateInRegion('MineralVein', [20, 25], true)
 *   - 插件参数中的 'MineralVein' 模板将为
 *     在区域20或25的随机点生成.
 *   - 此事件不会被保留.
 *
 *   - - -
 *
 * * 注意:如果衍生事件被保留，当
 * 地图从保存的文件中重新加载，或者从不同的地图中重新访问。如果一个
 * 事件被设置为不被保留，离开地图后
 * 它将自动自行消失.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 获取衍生事件数据-脚本调用
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *   $gameMap.event(eventId)
 *   - 这将抓取事件作为对象.
 *     - 将 'eventId' 替换为要抓取的事件的ID.
 *     - ID超过1000(或者你在插件参数中设置的任何值)
 *       衍生事件.
 *
 *   - - -
 *
 *   $gameMap.FirstSpawnedEvent()
 *   - 这将抓取第一个可用的衍生事件作为对象.
 *   - 如果第一个事件已被取消，列表中的下一个事件将是
 *     作为对象返回。如果没有剩余的衍生事件，此脚本
 *     调用将返回一个未定义的值.
 *
 *   - - -
 *
 *   $gameMap.FirstSpawnedEventID()
 *   - 这将获取第一个可用的衍生事件的ID.
 *   - 如果第一个事件已被取消，列表中的下一个事件将是
 *     作为数字返回。如果没有剩余的衍生事件，此脚本
 *     调用将返回值0。
 *
 *   - - -
 *
 *   $gameMap.LastSpawnedEvent()
 *   - 这将获取最后一个可用的衍生事件作为对象.
 *   - 如果最后一个事件已被取消，则列表中的前一个事件
 *     将作为对象返回。如果没有衍生事件剩下，这
 *     脚本调用将返回一个未定义的值.
 *
 *   - - -
 *
 *   $gameMap.LastSpawnedEventID()
 *   - 这将获取最后一个可用的衍生事件的ID.
 *   - 如果最后一个事件已被取消，则
 *     列表将以数字形式返回。如果没有衍生事件剩下,
 *     该脚本调用将返回值0.
 *
 *   - - -
 *
 *   $gameSystem.getMapSpawnedEventTotal()
 *   - 返回该地图上曾经产生的事件总数(这个数字
 *     返回该地图上曾经产生的事件总数(这个数字.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Despawn Event - Script Calls
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *   Yanfly.DespawnEventID(eventId)
 *   - 如果您有衍生事件，则取消目标衍生事件ID.
 *     - 用衍生事件的ID替换 'eventId' .
 *
 *   * Example: Yanfly.DespawnEventID(1001)
 *   - 这将取消当前地图上的事件1001.
 *   - 最新产生的事件不再保留.
 *
 *   * Example: Yanfly.DespawnEventID($gameMap.LastSpawnedEventID())
 *   - 这将根据当前地图上的ID取消最后产生的事件.
 *   - 事件1001不再保留.
 *
 *   - - -
 *
 *   Yanfly.DespawnEvent(event)
 *   - 取消目标衍生事件对象.
 *     - 用衍生的事件对象替换 'event' .
 *
 *   * Example: Yanfly.DespawnEvent($gameMap.FirstSpawnedEvent())
 *   - 这将取消当前地图上的第一个衍生事件.
 *   - 第一个衍生事件不再保留.
 *
 *   - - -
 *
 *   Yanfly.ClearSpawnedEvents()
 *   - 清除当前所有的所有衍生事件.
 *
 *   - - -
 *
 *   Yanfly.ClearSpawnedEvents(mapId)
 *   - 清除特点地图的所有衍生事件.
 *     - 将'mapId'替换为您希望清除衍生事件的地图ID.
 *
 *   * Example: Yanfly.ClearSpawnedEvents(10)
 *   - 清除地图10上的所有衍生事件.
 *
 * * 注意:当衍生事件被取消时，任何保留的数据也将被取消
 * 除了已删除的衍生事件外，还将删除任何保留的数据.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.01:
 * - Bugfixed for irregular spawn ID's.
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
 * @desc 用名字制作的模板列表，这样你就可以使用名字了
 * 代替带有脚本调用的map ID和event ID组合.
 * @default []
 *
 * @param IdStartRange
 * @text ID Starting Range
 * @parent ---General---
 * @type number[]
 * @min 1000
 * @desc 衍生事件的标识的起始范围.
 * 不要输入1000以下的数字。推荐:1000
 * @default 1000
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
 * 脚本调用: 
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
 * @desc 使用此模板时要生成的事件的ID.
 * @default 1
 * 
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_EventSpawner');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.EventSpawnerData = eval(Yanfly.Parameters['TemplateMaps']);
Yanfly.Param.EventSpawnerList = JSON.parse(Yanfly.Parameters['TemplateNames']);
Yanfly.Param.EventSpawnerID = Number(Yanfly.Parameters['IdStartRange']);

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
  Yanfly.EventSpawn.Template = {};
  var length = Yanfly.Param.EventSpawnerList.length;
  for (var i = 0; i < length; ++i) {
    var data = JSON.parse(Yanfly.Param.EventSpawnerList[i]);
    var name = data.Name.toUpperCase();
    Yanfly.loadMapData(parseInt(data.MapID));
    Yanfly.EventSpawn.Template[name] = {
      mapId: data.MapID,
      eventId: data.EventID
    }
  }
  // Preload Map Data List
  var data = Yanfly.Param.EventSpawnerData;
  var length = data.length;
  for (var i = 0; i < length; ++i) {
    var mapId = parseInt(data[i]);
    Yanfly.loadMapData(mapId)
  }
};
Yanfly.SetupParameters();

//=============================================================================
// Yanfly Spawn Event - Script Calls
//=============================================================================

Yanfly.SpawnEventFailChecks = function(mapId, eventId, x, y) {
  if (!Yanfly.PreloadedMaps[mapId]) {
    if ($gameTemp.isPlaytest()) {
      console.log('Map ID ' + mapId + ' has not been preloaded. ' +
        'It cannot be used for the Spawn Spawn function.');
    }
    return true;
  }
  if (!Yanfly.PreloadedMaps[mapId].events[eventId]) {
    if ($gameTemp.isPlaytest()) {
      console.log('Map ID ' + mapId + ', Event ID ' + eventId + ' does not ' +
        'exist. It cannot be used for the Spawn Event function.');
    }
    return true;
  }
  if ($gameMap.eventsXy(x, y).length > 0) {
    if ($gameTemp.isPlaytest()) {
      console.log('Cannot spawn event at ' + x + ', ' + y + '.' + 
        'There is already an event there.');
    }
    return true;
  }
  if ($gameMap.boat().posNt(x, y) || $gameMap.ship().posNt(x, y)) {
    if ($gameTemp.isPlaytest()) {
      console.log('Cannot spawn event at ' + x + ', ' + y + '.' + 
        'There is a vehicle there.');
    }
    return true;
  }
  if (x < 0 || x >= $gameMap.width() || y < 0 || y >= $gameMap.height()) {
    if ($gameTemp.isPlaytest()) {
      console.log('Cannot spawn event at ' + x + ', ' + y + '.' + 
        "This is outside of the map's boundaries.");
    }
    return true;
  }
  return false;
};

Yanfly.SpawnEvent = function(mapId, eventId, x, y, preserved) {
  if ($gameParty.inBattle()) return;
  if (Yanfly.SpawnEventFailChecks(mapId, eventId, x, y)) return;
  preserved = preserved || false;
  $gameMap.spawnEvent(mapId, eventId, x, y, preserved);
};

Yanfly.SpawnEventAt = function(mapId, eventId, x, y, preserved) {
  Yanfly.SpawnEvent(mapId, eventId, x, y, preserved);
};

Yanfly.SpawnEventInRegion = function(mapId, eventId, regions, preserved) {
  if (regions.constructor !== Array) regions = [regions];
  var data = $gameMap.validSpawnPoints(regions);
  if (data.length <= 0) return;
  random = data[Math.floor(Math.random() * data.length)];
  Yanfly.SpawnEvent(mapId, eventId, random[0], random[1], preserved);
};

Yanfly.SpawnEventTemplate = function(template, x, y, preserved) {
  var str = template.toUpperCase();
  if (Yanfly.EventSpawn.Template[str]) {
    var mapId = Yanfly.EventSpawn.Template[str].mapId;
    var eventId = Yanfly.EventSpawn.Template[str].eventId;
    Yanfly.SpawnEvent(mapId, eventId, x, y, preserved);
  } else {
    console.log('Template ' + template + ' does not exist to spawn from!');
  }
};

Yanfly.SpawnEventTemplateAt = function(template, x, y, preserved) {
  Yanfly.SpawnEventTemplate(template, x, y, preserved);
};

Yanfly.SpawnEventTemplateInRegion = function(template, regions, preserved) {
  var str = template.toUpperCase();
  if (Yanfly.EventSpawn.Template[str]) {
    var mapId = Yanfly.EventSpawn.Template[str].mapId;
    var eventId = Yanfly.EventSpawn.Template[str].eventId;
    Yanfly.SpawnEventInRegion(mapId, eventId, regions, preserved);
  } else {
    console.log('Template ' + template + ' does not exist to spawn from!');
  }
};

Yanfly.DespawnEvent = function(ev) {
  if (!ev) return;
  var eventId = ev.eventId();
  if (!ev.this._spawned) {
    if ($gameTemp.isPlaytest()) {
      console.log('Event ' + eventId + ' is not a valid spawned event.');
      return;
    }
  }
  Yanfly.DespawnEventID(eventId);
};

Yanfly.DespawnEventID = function(eventId) {
  if (eventId < Yanfly.Param.EventSpawnerID) {
    if ($gameTemp.isPlaytest()) {
      console.log('Event ID ' + eventId + ' is not a valid spawned event ID.');
      return;
    }
  }
  $gameMap.despawnEventId(eventId);
};

Yanfly.ClearSpawnedEvents = function(mapId) {
  mapId = mapId || $gameMap.mapId();
  var data = $gameSystem.getMapSpawnedEventData(mapId);
  var length = data.length;
  for (var i = 1; i < length; ++i) {
    var eventData = data[i];
    if (!eventData) continue;
    var eventId = eventData.eventId();
    if (mapId === $gameMap.mapId()) {
      Yanfly.DespawnEventID(eventId);
    } else {
      data[eventId - Yanfly.Param.EventSpawnerID] = null;
    }
  }
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.EventSpawn.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
  Yanfly.EventSpawn.Game_System_initialize.call(this);
  this.initEventSpawner()
};

Game_System.prototype.initEventSpawner = function() {
  this._MapSpawnedEventData = [];
};

Game_System.prototype.getMapSpawnedEventData = function(mapId) {
  if (this._MapSpawnedEventData === undefined) this.initEventSpawner();
  this._MapSpawnedEventData[mapId] = this._MapSpawnedEventData[mapId] || [null];
  return this._MapSpawnedEventData[mapId];
};

Game_System.prototype.getMapSpawnedEventTotal = function(mapId) {
  return this.getMapSpawnedEventData(mapId).length - 1;
};

Game_System.prototype.removeTemporaryMapSpawnedEvents = function(mapId) {
  var data = this.getMapSpawnedEventData(mapId);
  var length = data.length;
  for (var i = 1; i < length; ++i) {
    var eventData = data[i];
    if (!eventData) continue;
    if (eventData._spawnPreserved) continue;
    data[i] = null;
  }
};

//=============================================================================
// Game_Map
//=============================================================================

Yanfly.EventSpawn.Game_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
  this.setupSpawnedEvents(mapId);
  Yanfly.EventSpawn.Game_Map_setup.call(this, mapId);
  this.restoreSpawnedEvents();
};

Game_Map.prototype.setupSpawnedEvents = function(mapId) {
  if (mapId !== this.mapId() && $gamePlayer) {
    $gameSystem.removeTemporaryMapSpawnedEvents(this.mapId())
  }
  this._spawnedEvents = $gameSystem.getMapSpawnedEventData(mapId);
};

Game_Map.prototype.restoreSpawnedEvents = function() {
  var length = this._spawnedEvents.length;
  for (var i = 0; i < length; ++i) {
    var spawnedEvent = this._spawnedEvents[i];
    if (!spawnedEvent) continue;
    this._events[i + Yanfly.Param.EventSpawnerID] = spawnedEvent;
    spawnedEvent._pageIndex = -2;
    this._needsRefresh = true;
  }
};

Game_Map.prototype.spawnEvent = function(mapId, eventId, x, y, preserved) {
  var spawnId = this._spawnedEvents.length + Yanfly.Param.EventSpawnerID;
  $gameTemp._SpawnData = {
    baseMapId: this.mapId(),
    spawnId: spawnId,
    mapId: mapId,
    eventId: eventId, 
    x: x, 
    y: y,
    preserved: preserved
  };
  var spawnedEvent = new Game_Event(mapId, eventId);
  this._events[spawnId] = spawnedEvent;
  this._spawnedEvents[spawnId - Yanfly.Param.EventSpawnerID] = spawnedEvent;
  $gameTemp._SpawnData = undefined;
};

Game_Map.prototype.despawnEventId = function(eventId) {
  if (eventId < Yanfly.Param.EventSpawnerID) return;
  if (!this._spawnedEvents) return;
  var ev = this.event(eventId);
  ev.locate(-1, -1);
  this.eraseEvent(eventId);
  this._spawnedEvents[eventId - Yanfly.Param.EventSpawnerID] = null;
};

Game_Map.prototype.validSpawnPoints = function(regions) {
  var data = [];
  var width = this.width();
  var height = this.height();
  for (var x = 0; x < width; ++x) {
    for (var y = 0; y < height; ++y) {
      if (!regions.contains(this.regionId(x, y))) continue;
      if (this.eventsXy(x, y).length > 0) continue;
      if ($gamePlayer.x == x && $gamePlayer.y == y) continue;
      if (this.boat().posNt(x, y)) continue;
      if (this.ship().posNt(x, y)) continue;
      data.push([x, y]);
    }
  }
  return data;
};

Game_Map.prototype.FirstSpawnedEvent = function() {
  var length = this._spawnedEvents.length;
  for (var i = 0; i < length; ++i) {
    var eventData = this._spawnedEvents[i];
    if (eventData) return eventData;
  }
  return undefined;
};

Game_Map.prototype.FirstSpawnedEventID = function() {
  var eventData = this.FirstSpawnedEvent();
  if (eventData) {
    return eventData.eventId();
  } else {
    return 0;
  }
};

Game_Map.prototype.LastSpawnedEvent = function() {
  var length = this._spawnedEvents.length;
  for (var i = length; i >= 0; --i) {
    var eventData = this._spawnedEvents[i];
    if (eventData) return eventData;
  }
  return undefined;
};

Game_Map.prototype.LastSpawnedEventID = function() {
  var eventData = this.LastSpawnedEvent();
  if (eventData) {
    return eventData.eventId();
  } else {
    return 0;
  }
};

//=============================================================================
// Game_Event
//=============================================================================

Yanfly.EventSpawn.Game_Event_initialize = Game_Event.prototype.initialize;
Game_Event.prototype.initialize = function(mapId, eventId) {
  this._spawned = !!$gameTemp._SpawnData;
  this.initPreSpawnEventData();
  Yanfly.EventSpawn.Game_Event_initialize.call(this, mapId, eventId);
  this.initPostSpawnEventData();
};

Game_Event.prototype.initPreSpawnEventData = function() {
  if ($gameTemp._SpawnData === undefined) return;
  var data = $gameTemp._SpawnData;
  this._spawnData = data;
  this._spawned = true;
  this._pageIndex = -2;
  
  this._mapId = data.baseMapId;
  this._eventId = data.spawnId;

  this._spawnId = data.spawnId;
  this._spawnMapId = data.mapId;
  this._spawnEventId = data.eventId;
  this._spawnPreserved = data.preserved;
};

Game_Event.prototype.initPostSpawnEventData = function() {
  if ($gameTemp._SpawnData === undefined) return;
  var data = $gameTemp._SpawnData;

  this._mapId = data.baseMapId;
  this._eventId = data.spawnId;

  this.locate(data.x, data.y);
  this.refresh();
  SceneManager._scene._spriteset.createSpawnedEvent(this);
};

Yanfly.EventSpawn.Game_Event_eventId = Game_Event.prototype.eventId;
Game_Event.prototype.eventId = function() {
  if (this._spawned) {
    return this._spawnId;
  } else {
    return Yanfly.EventSpawn.Game_Event_eventId.call(this);
  }
};

Yanfly.EventSpawn.event = Game_Event.prototype.event;
Game_Event.prototype.event = function() {
  if (this._spawned) {
    return Yanfly.PreloadedMaps[this._spawnMapId].events[this._spawnEventId];
  } else {
    return Yanfly.EventSpawn.event.call(this);
  }
};

//=============================================================================
// Spriteset_Map
//=============================================================================

Spriteset_Map.prototype.createSpawnedEvent = function(target) {
  this._characterSprites = this._characterSprites || [];
  var length = this._characterSprites.length;
  this._characterSprites[length] = new Sprite_Character(target);
  this._characterSprites[length].update();
  this._tilemap.addChild(this._characterSprites[length]);
};

//=============================================================================
// End of File
//=============================================================================