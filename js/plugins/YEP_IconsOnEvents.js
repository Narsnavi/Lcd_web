//=============================================================================
// Yanfly Engine Plugins - Icons On Events
// YEP_IconsOnEvents.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_IconsOnEvents = true;

var Yanfly = Yanfly || {};
Yanfly.IconsOnEvents = Yanfly.IconsOnEvents || {};
Yanfly.IconsOnEvents.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc v1.00 事件顶部图标
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * 正式介绍
 * ============================================================================
 *
 * 有没有想过在事件和/或玩家上添加图标？有了这个插
 * 件，你可以很容易地通过一个注释标签，注释标签，移
 * 动脚本，或者脚本调用来完成。图标可以贴在目标的头
 * 上，也可以带着缓冲值移动！在事件上放置图标可以用
 * 于多种用途，例如包含物品的谜题或使用图标在地图上
 * 标记特定对象。可能性无穷无尽！
 *
 * ============================================================================
 * 说明-注释标签和注释标签
 * ============================================================================
 *
 * 将图标附加到事件的最简单方法是使用注释标签和/或注
 * 释标签。使用注释标签将使图标始终附加到事件上，而
 * 使用注释标签将使图标仅在包含注释标签的页面处于活
 * 动状态时才附加到事件上。
 *
 *   <Icon on Event: n>
 *   - 用您希望附加到事件的图标替换“n”.
 *
 *   <Icon on Event Buffer X: +x>
 *   <Icon on Event Buffer X: -x>
 *   - 将“x”替换为X的偏移量。
 *   对于X，负数将其向左移动而正向右移动。
 *
 *   <Icon on Event Buffer Y: +y>
 *   <Icon on Event Buffer Y: -y>
 *   - 'y' 替换为Y的偏移量。
 *   对于Y，负数将其向上移动，正数向下移动。
 *
 *   <Icon on Event Buffer: +x, +y>
 *   <Icon on Event Buffer: -x, -y>
 *   - 将“x”和“y”替换为您要应用的相应偏移值。
 *   对于X，负数将其向左移动而正向右移动。
 *   对于Y，负数将其向上移动而正向下移动它。
 *
 * 请记住，这些注释标签和注释标签仅适用于事件。它们
 * 对玩家角色不起作用。如果你想对玩家角色应用图标，
 * 你必须使用下面的方法之一.
 *
 * ============================================================================
 * 说明-移动路线-脚本
 * ============================================================================
 *
 * 使用移动路线事件来附加图标比使用脚本调用来附加图
 * 标要简单一些。无论移动路线下拉列表中的目标是哪
 * 个，当使用以下脚本命令时，都会有一个图标连接到该目标
 * 使用了以下脚本命令:
 *
 *   this.setIconOnEvent(n)
 *   - 用您希望使用的图标索引替换“n”.
 *
 * 如果要更改图标上的X和Y偏移值，
 * 请使用以下脚本命令:
 *
 *   this.setIconOnEventBufferX(n)
 *   this.setIconOnEventBufferY(n)
 *   - 将'n'替换为您想要改变X或Y的偏移值。
 *   对于X，负数将其向左移动而正向右移动。
 *   对于Y，负数将其向上移动而正向向下移动它。
 *
 * 要清除图标或重置X和Y偏移，
 * 请使用以下脚本命令:
 *
 *   this.clearIconOnEvent()
 *   - 这将清除事件上的图标。
 *
 *   this.resetIconOnEventBuffers()
 *   - 这会将X和Y重置为插件参数设置中的偏移值。
 *   parameter settings.
 *
 * ============================================================================
 * 指令-脚本调用
 * ============================================================================
 *
 * 使用脚本调用有点困难，
 * 但它们比移动路线脚本使用起来更灵活.
 *
 *   ---
 *
 *   var target = $gameMap.event(i);
 *   target.setIconOnEvent(j);
 *   - 这将从地图上抓取事件“I”，并在其上放置图标“j”.
 *
 *   var target = $gamePlayer;
 *   target.setIconOnEvent(j);
 *   - 这将在玩家角色上放置图标“j”.
 *
 *   var target = $gamePlayer.followers().follower(i);
 *   target.setIconOnEvent(j);
 *   - 这将针对跟随者'i'并在该跟随者上放置图标'j'。.
 *
 *   ---
 *
 * 要调整目标的偏移，请尝试以下脚本调用.
 *
 *   ---
 *
 *   var target = $gameMap.event(i);
 *   target.setIconOnEventBufferX(x);
 *   target.setIconOnEventBufferY(y);
 *   - 标成为事件'i'。
 *   'x'和'y'值将决定目标上图标的X和Y偏移。
 *
 *   var target = $gamePlayer;
 *   target.setIconOnEventBufferX(x);
 *   target.setIconOnEventBufferY(y);
 *   - 目标成为玩家。
 *   'x'和'y'值将决定目标上图标的X和Y偏移。
 *
 *   var target = $gamePlayer.followers().follower(i);
 *   target.setIconOnEventBufferX(x);
 *   target.setIconOnEventBufferY(y);
 *   - 目标成为追随者'我'。
 *   'x'和'y'值将决定目标上图标的X和Y偏移。
 *
 *   ---
 *
 * 要清除图标或重置X和Y偏移，
 * 请使用以下脚本调用:
 *
 *   ---
 *
 *   var target = $gameMap.event(i);
 *   target.clearIconOnEvent();
 *   - 目标变成事件“I”。清除目标上的图标.
 *
 *   var target = $gamePlayer;
 *   target.clearIconOnEvent();
 *   - 目标变成了玩家。清除目标上的图标。
 *
 *   var target = $gamePlayer.followers().follower(i);
 *   target.clearIconOnEvent();
 *   - 目标变成了跟随者'i'.清除目标上的图标.
 *
 *   var target = $gameMap.event(i);
 *   target.resetIconOnEventBuffers();
 *   - 目标变成事件 'i'. 重置X和Y缓冲区。.
 *
 *   var target = $gamePlayer;
 *   target.resetIconOnEventBuffers();
 *   - 目标变成了玩家。重置X和Y缓冲区.
 *
 *   var target = $gamePlayer.followers().follower(i);
 *   target.resetIconOnEventBuffers();
 *   - 目标变成了跟随者 'i'. 重置X和Y缓冲区.
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
 * @param X Buffer
 * @desc 更改图标在事件上出现的左右距离。
 * 这些是默认值，以后可以更改.
 * @default 0
 *
 * @param Y Buffer
 * @desc 更改图标在事件上向上或向下显示的距离。
 * 这些是默认值，以后可以更改.
 * @default 12
 *
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_IconsOnEvents');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.IconsOnEventsBufferX = Number(Yanfly.Parameters['X Buffer']);
Yanfly.Param.IconsOnEventsBufferY = Number(Yanfly.Parameters['Y Buffer']);

//=============================================================================
// Game_CharacterBase
//=============================================================================

Yanfly.IconsOnEvents.Game_CharacterBase_initMembers =
  Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function() {
  Yanfly.IconsOnEvents.Game_CharacterBase_initMembers.call(this);
  this.initIconOnEvent();
};

Game_CharacterBase.prototype.initIconOnEvent = function() {
  this._iconOnEvent = 0;
  this._iconOnEventBufferX = Yanfly.Param.IconsOnEventsBufferX;
  this._iconOnEventBufferY = Yanfly.Param.IconsOnEventsBufferY;
};

Game_CharacterBase.prototype.iconOnEvent = function() {
  if (this._iconOnEvent === undefined) this.initIconOnEvent();
  return this._iconOnEvent;
};

Game_CharacterBase.prototype.setIconOnEvent = function(iconIndex) {
  if (this._iconOnEvent === undefined) this.initIconOnEvent();
  this._iconOnEvent = iconIndex;
};

Game_CharacterBase.prototype.iconOnEventBufferX = function() {
  if (this._iconOnEventBufferX === undefined) this.initIconOnEvent();
  return this._iconOnEventBufferX;
};

Game_CharacterBase.prototype.setIconOnEventBufferX = function(value) {
  if (this._iconOnEventBufferX === undefined) this.initIconOnEvent();
  this._iconOnEventBufferX = value;
};

Game_CharacterBase.prototype.iconOnEventBufferY = function() {
  if (this._iconOnEventBufferY === undefined) this.initIconOnEvent();
  return this._iconOnEventBufferY;
};

Game_CharacterBase.prototype.setIconOnEventBufferY = function(value) {
  if (this._iconOnEventBufferY === undefined) this.initIconOnEvent();
  this._iconOnEventBufferY = value;
};

Game_CharacterBase.prototype.clearIconOnEvent = function() {
  this.setIconOnEvent(0);
};

Game_CharacterBase.prototype.resetIconOnEventBuffers = function() {
  this._iconOnEventBufferX = Yanfly.Param.IconsOnEventsBufferX;
  this._iconOnEventBufferY = Yanfly.Param.IconsOnEventsBufferY;
};

//=============================================================================
// Game_Event
//=============================================================================

Yanfly.IconsOnEvents.Game_Event_setupPageSettings =
  Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function() {
  this.clearIconOnEvent();
  this.resetIconOnEventBuffers();
  Yanfly.IconsOnEvents.Game_Event_setupPageSettings.call(this);
  this.setupIconOnEventNotetags();
  this.setupIconOnEventCommentTags();
};

Game_Event.prototype.setupIconOnEventNotetags = function() {
  if (this.event().note === '') return;
  var note1 = /<Icon On Event: (\d+)>/i;
  var note2 = /<Icon On Event Buffer X: ([\+\-]\d+)>/i;
  var note3 = /<Icon On Event Buffer Y: ([\+\-]\d+)>/i;
  var note4 = /<Icon On Event Buffer: ([\+\-]\d+),[ ]([\+\-]\d+)>/i;
  if (this.event().note.match(note1)) {
    this.setIconOnEvent(parseInt(RegExp.$1));
  } else if (this.event().note.match(note2)) {
    this.setIconOnEventBufferX(parseInt(RegExp.$1));
  } else if (this.event().note.match(note3)) {
    this.setIconOnEventBufferY(parseInt(RegExp.$1));
  } else if (this.event().note.match(note4)) {
    this.setIconOnEventBufferX(parseInt(RegExp.$1));
    this.setIconOnEventBufferY(parseInt(RegExp.$2));
  }
};

Game_Event.prototype.setupIconOnEventCommentTags = function() {
  if (!this.page()) return;
  var note1 = /<Icon On Event: (\d+)>/i;
  var note2 = /<Icon On Event Buffer X: ([\+\-]\d+)>/i;
  var note3 = /<Icon On Event Buffer Y: ([\+\-]\d+)>/i;
  var note4 = /<Icon On Event Buffer: ([\+\-]\d+),[ ]([\+\-]\d+)>/i;
  var list = this.list();
  var length = list.length;
  for (var i = 0; i < length; ++i) {
    var ev = list[i];
    if ([108, 408].contains(ev.code)) {
      if (ev.parameters[0].match(note1)) {
        this.setIconOnEvent(parseInt(RegExp.$1));
      } else if (ev.parameters[0].match(note2)) {
        this.setIconOnEventBufferX(parseInt(RegExp.$1));
      } else if (ev.parameters[0].match(note3)) {
        this.setIconOnEventBufferY(parseInt(RegExp.$1));
      } else if (ev.parameters[0].match(note4)) {
        this.setIconOnEventBufferX(parseInt(RegExp.$1));
        this.setIconOnEventBufferY(parseInt(RegExp.$2));
      }
    }
  }
};

//=============================================================================
// Sprite_Character
//=============================================================================

Yanfly.IconsOnEvents.Sprite_Character_initMembers =
  Sprite_Character.prototype.initMembers;
Sprite_Character.prototype.initMembers = function() {
  Yanfly.IconsOnEvents.Sprite_Character_initMembers.call(this);
  this.createIconOnEventSprite();
};

Sprite_Character.prototype.createIconOnEventSprite = function() {
  this._iconOnEventSprite = new Sprite();
  this._iconOnEventSprite.bitmap = ImageManager.loadSystem('IconSet');
  this._iconOnEventSprite.setFrame(0, 0, 0, 0);
  this._iconOnEventSprite.anchor.x = 0.5;
  this._iconOnEventSprite.anchor.y = 1;
  this._iconOnEventId = 0;
  this.addChild(this._iconOnEventSprite);
};

Yanfly.IconsOnEvents.Sprite_Character_updateOther =
  Sprite_Character.prototype.updateOther;
Sprite_Character.prototype.updateOther = function() {
  Yanfly.IconsOnEvents.Sprite_Character_updateOther.call(this);
  this.updateIconOnEvent();
};

Sprite_Character.prototype.updateIconOnEvent = function() {
  if (this._character && this._character.iconOnEvent()) {
    this._iconOnEventId = this._character.iconOnEvent();
  } else {
    this._iconOnEventId = 0;
  }
  var pw = Sprite_StateIcon._iconWidth;
  var ph = Sprite_StateIcon._iconHeight;
  var sx = this._iconOnEventId % 16 * pw;
  var sy = Math.floor(this._iconOnEventId / 16) * ph;
  this._iconOnEventSprite.setFrame(sx, sy, pw, ph);
  if (this._iconOnEventId > 0) {
    var bufferX = this._character.iconOnEventBufferX();
    var bufferY = this._character.iconOnEventBufferY();
    this._iconOnEventSprite.x = bufferX;
    this._iconOnEventSprite.y = -1 * this.height + bufferY;
  }
};

Yanfly.IconsOnEvents.Sprite_Character_updateIconOnEvent =
  Sprite_Character.prototype.updateIconOnEvent;
Sprite_Character.prototype.updateIconOnEvent = function() {
  Yanfly.IconsOnEvents.Sprite_Character_updateIconOnEvent.call(this);
  this.removeChild(this._iconOnEventSprite);
  this.addChild(this._iconOnEventSprite);
};

//=============================================================================
// End of File
//=============================================================================