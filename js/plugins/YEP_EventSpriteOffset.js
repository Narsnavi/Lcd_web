//=============================================================================
// Yanfly Engine Plugins - Event Sprite Offset
// YEP_EventSpriteOffset.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_EventSpriteOffset = true;

var Yanfly = Yanfly || {};
Yanfly.EvSpOf = Yanfly.EvSpOf || {};
Yanfly.EvSpOf.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc v1.00 事件图像偏移
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * 正式介绍
 * ============================================================================
 *
 * 事件绑定到它们的图快上，而它们的图片被绑定到它们的事件.
 * 当然，这将意味着图片将被绑定到瓷图块,
 * 但是有时候，我们想要调整图片的位置
 * 他们看起来并不总是整齐划一。这个插件给了你
 * 使用notetags注释标签在视觉上偏移子画面的能力.
 *
 * ============================================================================
 * 注释标记
 * ============================================================================
 *
 * 要使用事件注释标记来偏移子画面，请使用以下命令:
 *
 * 事件注释标签:
 *
 *   <Sprite Offset X: +n>
 *   <Sprite Offset X: -n>
 *   - 将'n'替换为您希望偏移图片的水平位置的像素数
 *   正数将图片移动到右侧
 *   负数将图片移动到左侧.
 *
 *   <Sprite Offset Y: +n>
 *   <Sprite Offset Y: -n>
 *   - 将'n'替换为您希望偏移图片垂直位置的像素数
 *   正数会向下移动图片。
 *   负数会向上移动图片。
.
 *
 *   <Sprite Offset: +x, +y>
 *   <Sprite Offset: -x, -y>
 *   - 如果您希望将图片偏移信息放在一行上，请改用上面的注释标记。
 *   将'x'和'y'替换为值以使图片偏移.
 *   正x将向右移动。负x将向左移动。
 *   正y将向下移动。负y将向下移动。
 *   the sprite up.
 *
 * ============================================================================
 * Comment Tags
 * ============================================================================
 *
 * 若要使用注释来偏移子画面，请为每个所需的事件页面添加注释
 * 在使用下面的注释标签时要偏移的图片:
 *
 * Comment Tags:
 *
 *   <Sprite Offset X: +n>
 *   <Sprite Offset X: -n>
 *   - 将'n'替换为您希望偏移图片的水平位置的像素数。
 *   正数将图片移动到右侧。
 *   负数将图片移动到左侧。.
 *   *注意*: 高优先级.
 *
 *   <Sprite Offset Y: +n>
 *   <Sprite Offset Y: -n>
 *   - 将'n'替换为您希望偏移图片垂直位置的像素数。
 *   正数会向下移动图片。
 *   负数会向上移动图片。
 *   *注意*: 高优先级.
 *
 *   <Sprite Offset: +x, +y>
 *   <Sprite Offset: -x, -y>
 *   - 如果您希望将图片偏移信息放在一行上，请改用上面的注释标记。
 *   将'x'和'y'替换为值以使图片偏移。
 *   正x将向右移动。
 *   负x将向左移动。
 *   正y将向下移动。负y将向下移动。
 *   *注意*: 高优先级.
 *
 * ============================================================================
 * Custom Movement Route - Script Calls
 * ============================================================================
 * 
 * 如果您希望在页面加载后更改事件图片的偏移量,
 * 您可以发出自定义移动路线脚本调用来修改它:
 *
 * 脚本调用:
 *
 *   this._spriteOffsetX = n
 *   this._spriteOffsetY = n
 *   - 这将图片偏移X或Y值设置为'n'。
 *   相同的规则适用于评论标签。
 *   正X向右，负X向左。正Y下降，负Y上升.
 *
 *   this._spriteOffsetX += n
 *   this._spriteOffsetY += n
 *   - 将图片的偏移X或Y增加'n'。
 *   相同的规则适用于评论标签。
 *   正X向右，负X向左。正Y下降，负Y上升.
 *
 *   this._spriteOffsetX -= n
 *   this._spriteOffsetY -= n
 *   - 将图片的偏移量X或Y减少“n”。
 *   相同的规则适用于评论标签。
 *   正X向右，负X向左。正Y下降，负Y上升。
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
 */
//=============================================================================

//=============================================================================
// Game_CharacterBase
//=============================================================================

Yanfly.EvSpOf.Game_CharacterBase_initMembers =
  Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function() {
  Yanfly.EvSpOf.Game_CharacterBase_initMembers.call(this);
  this.initSpriteOffsets();
};

Game_CharacterBase.prototype.initSpriteOffsets = function() {
  this._spriteOffsetX = 0;
  this._spriteOffsetY = 0;
};

Yanfly.EvSpOf.Game_CharacterBase_screenX = Game_CharacterBase.prototype.screenX;
Game_CharacterBase.prototype.screenX = function() {
  var value = Yanfly.EvSpOf.Game_CharacterBase_screenX.call(this);
  value += this.spriteOffsetX();
  return Math.round(value);
};

Yanfly.EvSpOf.Game_CharacterBase_screenY = Game_CharacterBase.prototype.screenY;
Game_CharacterBase.prototype.screenY = function() {
  var value = Yanfly.EvSpOf.Game_CharacterBase_screenY.call(this);
  value += this.spriteOffsetY();
  return Math.round(value);
};

Game_CharacterBase.prototype.spriteOffsetX = function() {
  if (this._spriteOffsetX === undefined) this.initSpriteOffsets();
  var value = this._spriteOffsetX;
  return value;
};

Game_CharacterBase.prototype.spriteOffsetY = function() {
  if (this._spriteOffsetY === undefined) this.initSpriteOffsets();
  var value = this._spriteOffsetY;
  return value;
};

//=============================================================================
// Game_Event
//=============================================================================

Yanfly.EvSpOf.Game_Event_setupPageSettings =
  Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function() {
  Yanfly.EvSpOf.Game_Event_setupPageSettings.call(this);
  this.setupSpriteOffsets();
};

Game_Event.prototype.setupSpriteOffsets = function() {
  this.initSpriteOffsets();
  this.setupNotetagSpriteOffsets();
  this.setupCommentTagSpriteOffsets();
};

Game_Event.prototype.setupNotetagSpriteOffsets = function() {
  if (this.event().note === '') return;
  var note1 = /<SPRITE OFFSET X:[ ]([\+\-]\d+)>/i;
  var note2 = /<SPRITE OFFSET Y:[ ]([\+\-]\d+)>/i;
  var note3 = /<SPRITE OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i;
  if (this.event().note.match(note1)) {
    this._spriteOffsetX = parseInt(RegExp.$1);
  }
  if (this.event().note.match(note2)) {
    this._spriteOffsetY = parseInt(RegExp.$1);
  }
  if (this.event().note.match(note3)) {
    this._spriteOffsetX = parseInt(RegExp.$1);
    this._spriteOffsetY = parseInt(RegExp.$2);
  }
};

Game_Event.prototype.setupCommentTagSpriteOffsets = function() {
  if (!this.page()) return;
  var note1 = /<SPRITE OFFSET X:[ ]([\+\-]\d+)>/i;
  var note2 = /<SPRITE OFFSET Y:[ ]([\+\-]\d+)>/i;
  var note3 = /<SPRITE OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i;
  var list = this.list();
  var length = list.length;
  for (var i = 0; i < length; ++i) {
    var ev = list[i];
    if ([108, 408].contains(ev.code)) {
      if (ev.parameters[0].match(note1)) {
        this._spriteOffsetX = parseInt(RegExp.$1);
      }
      if (ev.parameters[0].match(note2)) {
        this._spriteOffsetY = parseInt(RegExp.$1);
      }
      if (ev.parameters[0].match(note3)) {
        this._spriteOffsetX = parseInt(RegExp.$1);
        this._spriteOffsetY = parseInt(RegExp.$2);
      }
    }
  }
};

//=============================================================================
// End of File
//=============================================================================