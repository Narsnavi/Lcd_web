//=============================================================================
// Yanfly Engine Plugins - Event Copier
// YEP_EventCopier.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_EventCopier = true;

var Yanfly = Yanfly || {};
Yanfly.EventCopier = Yanfly.EventCopier || {};
Yanfly.EventCopier.version = 1.01;

//=============================================================================
 /*:
 * @plugindesc v1.01 事件复制器
 * possible data stored from a different map!
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * 正式介绍
 * ============================================================================
 *
 * 警告:这个插件最好与RPG Maker MV 1.5.0或更高版本一起使用！这是
 * 因为MV 1.5.0编辑器允许这个插件有条不紊的进行
 * 和高效的方式。请确保您的RPG制造商MV软件达到
 * 在使用这个插件之前确定日期，以充分利用它.
 *
 * 您是否曾制作过要复制和粘贴的事件模板？
 * 这是一种有效的方式来重现在游戏中重复事件。
 * 你是不是有过这样的经历，
 * 当你决定突然想要改变那个事件但你已经复制并粘贴了很多次，
 * 所以你必须去寻找每一个事件并替换它.
 * 多痛苦啊，对吧?
 *
 * Event Copier将简化该过程。
 * 你创建了一个模板事件，
 * 任何使用这个插件的notetag的事件都将复制游戏中最新版本的事件。
 * 这将包括角色的图形，开关，变量，条件，页面，事件命令，甚至是新的Notetag。
 * 由于显而易见的原因，
 * 唯一不会被复制的东西是ID，
 * X位置和Y位置。
 *
 * 这样，您可以简化事件过程，
 * 而无需在批量生成事件之前完成事件.
 *
 * 更多信息将在帮助的“说明”部分进行解释
 * 插件的帮助文件。
 *
 * ============================================================================
 * 指令
 * ============================================================================
 * 
 * 首先，留出一张专用地图(或多张地图)，每次都会预装
 * 游戏开始了。每个预加载的地图都应该包含您需要的各种事件
 * 希望完全复制。这些可以从模板到触发事件
 * 自动运行事件到并行事件。一旦您制作了想要的地图
 * 预加载，打开插件管理器和这个插件。插入这个里面
 * 插件的“模板地图”参数是您希望使用的地图的ID。
 *
 * 如果您正在使用RPG Maker MV 1.5.0+并且希望使用模板名称，
 * 通过“模板名称”插件参数添加它们。来自
 * 模板名称参数可以更改，游戏中的所有事件都使用
 * 带有相应模板名称的注释标签将相应更新。
 *
 * ============================================================================
 * 注释标记
 * ============================================================================
 *
 * 要决定复制事件，请按照下列步骤操作
 * 说明，并将所需的注释插入事件的备注中.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 事件注释标签:
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *   <Copy Event: Map x, Event y>
 *   - 将“x”替换为要从中复制事件的地图的ID.
 *   - 将“y”替换为要从地图中复制的事件的ID.
 *
 *   - - -
 *
 *   <Copy Event: mapId, eventId>
 *   - 将'mapId'替换为您要复制事件的地图的ID.
 *   - 将'eventId'替换为您要从该地图复制的事件的ID.
 *
 *   - - -
 *
 *   <Copy Event: template>
 *   - 用“模板名称”插件参数中的名称替换“模板”.
 *   这将需要你有1.5.0+版本的RPG Maker MV。所有的
 *   存储模板中的地图ID和事件ID数据将用于此目的
 *   此notetag还将具有仅对此模板名称唯一的自定义
 *   Lunatic代码的能力。
 *
 *   - - -
 *
 * 复制事件时，所有数据都将从地图，
 * 到使用的图形，到页面，它们的条件，以及所有的
 * 事件命令。唯一不会被复制的是
 * 原始事件的ID、x位置和y位置.
 *
 * ============================================================================
 * Lunatic Mode - Pre and Post Copy Codes
 * ============================================================================
 *
 * Lunatic Mode 需要RPG Maker MV的1.5.0+版本.
 *
 * 对于那些有JavaScript经验的人来说，您可以添加自己的定制代码
 * 加载复制的事件时运行。这可以在插件的
 * 参数 'PreCopy Code' 和 'PostCopy Code'.
 *
 * 如果您使用模板名称，您可以添加 'PreCopy Code' 和
 * 该模板特有的'PostCopy Code'代码.
 *
 * 对于 Lunatic Mode, 有一些独特的变量可以改变.
 * They are the following:
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * PreCopy Codes
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  Variables      Description
 * 
 *      mapId      ID of the map to be loaded.
 *    eventId      ID of the event to be loaded.
 *     target      The event before it's copied over.
 *     player      The player character.
 *
 * 对'mapId' 或 'eventId' 进行更改将会更改
 * 为目标加载。但是，如果'mapId' 被更改, 您必须确保
 * 要更改的地图已经预加载，否则事件
 * 将无法正确复制.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * PostCopy Codes
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  Variables      Description
 * 
 *     target      The loaded event after copied over.
 *     player      The player character.
 *
 * 虽然 'mapId' 和 'eventId' 变量可用, 但它们不能
 * 改变并产生影响。但是，您可以将它们用作条件
 * 检查以确定如何处理目标事件或玩家.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.01:
 * - Bypass the isDevToolsOpen() error when bad code is inserted into a script
 * call or custom Lunatic Mode code segment due to updating to MV 1.6.1.
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
 * 而不是带有注释标记的地图ID和事件ID组合.
 * @default []
 *
 * @param ---Lunatic Mode---
 * @default
 *
 * @param PreCopyCode
 * @text PreCopy Code
 * @parent ---Lunatic Mode---
 * @type note
 * @desc 在复制事件之前使用的代码.
 * 这对于所有复制的事件都是全局的.
 * @default "// Variables      Description\n//\n//     mapId      ID of the map to be loaded.\n//   eventId      ID of the event to be loaded.\n//    target      The event before it's copied over.\n//    player      The player character."
 *
 * @param PostCopyCode
 * @text PostCopy Code
 * @parent ---Lunatic Mode---
 * @type note
 * @desc在复制事件后使用的代码.
 * 这对于所有复制的事件都是全局的.
 * @default "// Variables      Description\n//\n//    target      The loaded event after copied over.\n//    player      The player character."
 *
 */
/* ----------------------------------------------------------------------------
 * Template Parameter Structure
 * ---------------------------------------------------------------------------
 */
/*~struct~Template:
 *
 * @param Name
 * @desc 模板的名称。使用的notetag将是
 * <Copy Event: name>     用该值替换'name'
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
 * @desc 使用此模板时要复制的事件的ID.
 * @default 1
 *
 * @param PreCopyCode
 * @text PreCopy Code
 * @type note
 * @desc 在复制事件之前使用的代码.
 * 这仅适用于此模板.
 * @default "// Variables      Description\n//\n//     mapId      ID of the map to be loaded.\n//   eventId      ID of the event to be loaded.\n//    target      The event before it's copied over.\n//    player      The player character."
 *
 * @param PostCopyCode
 * @text PostCopy Code
 * @type note
 * @desc 复制事件后使用的代码.
 * 这仅适用于此模板.
 * @default "// Variables      Description\n//\n//    target      The loaded event after copied over.\n//    player      The player character."
 * 
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_EventCopier');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.EventCopierData = eval(Yanfly.Parameters['TemplateMaps']);
Yanfly.Param.EventCopierList = JSON.parse(Yanfly.Parameters['TemplateNames']);

Yanfly.Param.EventCopierPreCopy = JSON.parse(Yanfly.Parameters['PreCopyCode']);
Yanfly.Param.EventCopierPostCopy = JSON.parse(Yanfly.Parameters['PreCopyCode']);

Yanfly.PreloadedMaps = Yanfly.PreloadedMaps || [];

Yanfly.ClearComments = function(str) {
  return str.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '$1').trim();
};

Yanfly.Param.EventCopierPreCopy =
  Yanfly.ClearComments(Yanfly.Param.EventCopierPreCopy);
Yanfly.Param.EventCopierPostCopy =
  Yanfly.ClearComments(Yanfly.Param.EventCopierPostCopy);

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
  Yanfly.EventCopier.Template = {};
  var length = Yanfly.Param.EventCopierList.length;
  for (var i = 0; i < length; ++i) {
    var data = JSON.parse(Yanfly.Param.EventCopierList[i]);
    var name = data.Name.toUpperCase();
    Yanfly.loadMapData(parseInt(data.MapID));
    Yanfly.EventCopier.Template[name] = {
      mapId: data.MapID,
      eventId: data.EventID,
      PreCopyCode: Yanfly.ClearComments(JSON.parse(data.PreCopyCode)),
      PostCopyCode: Yanfly.ClearComments(JSON.parse(data.PostCopyCode))
    }
  }
  // Preload Map Data List
  var data = Yanfly.Param.EventCopierData;
  var length = data.length;
  for (var i = 0; i < length; ++i) {
    var mapId = parseInt(data[i]);
    Yanfly.loadMapData(mapId)
  }
};
Yanfly.SetupParameters();

//=============================================================================
// Game_Event
//=============================================================================

Yanfly.EventCopier.Game_Event_initialize = Game_Event.prototype.initialize;
Game_Event.prototype.initialize = function(mapId, eventId) {
  Yanfly.EventCopier.Game_Event_initialize.call(this, mapId, eventId);
  this.setupCopyEvent();
};

Game_Event.prototype.setupCopyEvent = function() {
  var ev = this.event();
  if (ev.note.length <= 0) return;
  // Check Notetags
  var template = undefined;
  if (ev.note.match(/<(?:COPY EVENT):[ ]MAP[ ](\d+),[ ]EVENT[ ](\d+)>/i)) {
    var mapId = parseInt(RegExp.$1);
    var eventId = parseInt(RegExp.$2);
  } else if (ev.note.match(/<(?:COPY EVENT):[ ](\d+),[ ](\d+)>/i)) {
    var mapId = parseInt(RegExp.$1);
    var eventId = parseInt(RegExp.$2);
  } else if (ev.note.match(/<(?:COPY EVENT):[ ](.*)>/i)) {
    var name = String(RegExp.$1).toUpperCase();
    if (Yanfly.EventCopier.Template[name]) {
      var template = Yanfly.EventCopier.Template[name];
    } else {
      return;
    }
    var mapId = parseInt(template.mapId);
    var eventId = parseInt(template.eventId);
  } else {
    return;
  }
  mapId = mapId.clamp(1, 999);
  // Pre Copy Code
  var target = this;
  var player = $gamePlayer;
  var code = Yanfly.Param.EventCopierPreCopy;
  if (code.length > 0) {
    try {
      eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'EVENT COPIER PRECOPY EVAL ERROR');
    }
  }
  if (template) {
    var code = template.PreCopyCode;
    if (code.length > 0) {
      try {
        eval(code);
      } catch (e) {
        Yanfly.Util.displayError(e, code, 'EVENT COPIER PRECOPY EVAL ERROR');
      }
    }
  }
  // Check Template
  mapId = mapId.clamp(1, 999);
  if (Yanfly.PreloadedMaps[mapId]) {
    var map = Yanfly.PreloadedMaps[mapId];
    if (!map.events[eventId]) {
      if ($gameTemp.isPlaytest()) {
        console.log('Map ' + mapId + ', Event ' + eventId + ' does not ' +
        'exist so a copy cannot be made of it.');
      }
      return;
    }
    // SUCCESS, Set Up the Copy Information
    this._copiedEvent = true;
    this._copiedMapId = mapId;
    this._copiedEventId = eventId;
    this._pageIndex = -2;
    this.findProperPageIndex();
    this.setupPage();
    this.refresh();
  // If no map, reveal error message if debug mode is detected.
  } else if ($gameTemp.isPlaytest() && mapId !== 0) {
    console.log('Map ' + mapId + ' is not listed in the YEP_EventCopier ' +
    'plugin parameters to use "Copy Event" notetag.');
    return;
  }
  // Post Copy Code
  var target = this;
  var player = $gamePlayer;
  var code = Yanfly.Param.EventCopierPostCopy;
  if (code.length > 0) {
    try {
      eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'EVENT COPIER POSTCOPY EVAL ERROR');
    }
  }
  if (template) {
    var code = template.PostCopyCode;
    if (code.length > 0) {
      try {
        eval(code);
      } catch (e) {
        Yanfly.Util.displayError(e, code, 'EVENT COPIER POSTCOPY EVAL ERROR');
      }
    }
  }
};

Yanfly.EventCopier.event = Game_Event.prototype.event;
Game_Event.prototype.event = function() {
  if (this._copiedEvent) {
    return Yanfly.PreloadedMaps[this._copiedMapId].events[this._copiedEventId];
  } else {
    return Yanfly.EventCopier.event.call(this);
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