//=============================================================================
// Yanfly Engine Plugins - Message Core Extension - Backlog
// YEP_X_MessageBacklog.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_MessageBacklog = true;

var Yanfly = Yanfly || {};
Yanfly.MsgBacklog = Yanfly.MsgBacklog || {};
Yanfly.MsgBacklog.version = 1.01;

//=============================================================================
 /*:
 * @plugindesc v1.01 信息记录(需要 YEP_MessageCore.js)
 * function to your game's message system!
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * 正式介绍
 * ============================================================================
 *
 * 此插件需要以下插件:
 * - YEP_MessageCore
 *
 * *注意:如果你有任何扩展的消息包插件，
 * 把这个插件放在插件列表的条目下。
 *
 * IRPG有消息积压并不罕见，这是一个游戏中的工具，
 * 玩家可以回顾他/她以前遇到的任何和所有对话。
 * 如果玩家无意中跳过了一些对话，
 * 并且/或者想要在重要时刻做出决定之前重新查看是什么类型的消息，
 * 这个工具会很有帮助。
 *
 * 这个插件为你的游戏消息系统创建了一个消息积压系统。
 * 在留言过程中按下“Shift”(或任何其他您想要的按钮)，
 * 玩家可以打开一个待办事项窗口来查看最近20条遇到的留言
 * (存储的留言数量可以在参数内修改)。
 * 这些保存的消息还可以包括他们从选择列表中选择的任何选项、
 * 他们可能输入的任何数字或他们从特殊事件中选择的项目。
 * ...
 * 
 * 现在，你的玩家可以继续前进了，他们很清楚，
 * 如果他们错过了任何消息，他们没有什么可担心的。
 *
 * ============================================================================
 * 禁用的文本代码
 * ============================================================================
 *
 * 由于某些文本代码的性质，其中一些代码对于消息日志
 * 是禁用的。大多数默认的RPG Maker MV文本代码都可
 * 以工作，但是一些通过消息核心或扩展包添加的自定义
 * 代码由于各种原因被禁用。以下是禁用的消息代码列表:
 *
 *    RPG Maker MV Default:
 *    \{          Changes to font sizes cause errors in the backlog.
 *    \}          Changes to font sizes cause errors in the backlog.
 *
 *    Message Core:
 *    \AF[x]      Face graphics aren't displayed in the backlog.
 *    \PF[x]      Face graphics aren't displayed in the backlog.
 *    \FS[X]      Changes to font sizes cause errors in the backlog.
 *
 *    \PY[X]      While this works, it is known to cause some problems.
 *
 *    Extended Message Pack 1:
 *    \LSON       Letter sounds are disabled for the backlog.
 *    \LSOFF      Letter sounds are disabled for the backlog.
 *    \LSR        Letter sounds are disabled for the backlog.
 *    \FACEINDEX  Face graphics aren't displayed in the backlog.
 *    \MSGPOSX    Backlog does not change message window size.
 *    \MSGPOSY    Backlog does not change message window size.
 *    \MSGEVENT   Backlog does not change message window size.
 *    \MSGACTOR   Backlog does not change message window size.
 *    \MSGPARTY   Backlog does not change message window size.
 *    \MSGENEMY   Backlog does not change message window size.
 *    \AUTOEVENT  Backlog does not change message window size.
 *    \AUTOACTOR  Backlog does not change message window size.
 *    \AUTOPARTY  Backlog does not change message window size.
 *    \AUTOENEMY  Backlog does not change message window size.
 *    \MSGROWS    Backlog does not change message window size.
 *    \MSGWIDTH   Backlog does not change message window size.
 *    \AUTO       Backlog does not change message window size.
 *    \MSGRESET   Backlog does not change message window size.
 *
 *    Extended Message Pack 2:
 *    - 数量、角色和敌人文本代码将在添加前转换。
 *    这是为了使数据本地化，而不是当前的。
 *
 * ============================================================================
 * 插件命令
 * ============================================================================
 *
 * 以下插件命令可用于改变关于消息积压的各种设置。
 * ...
 *
 * 插件命令:
 *
 *   EnableMessageBacklog
 *   DisableMessageBacklog
 *   - 这将允许/禁止播放看过的信息。
 *
 *   EnableMessageLogging
 *   DisableMessageLogging
 *   - 如果启用，新邮件将被记录到等待列表中。
 *   如果禁用，它们将不会被记录。
 *
 *   OpenMessageBacklog
 *   - 如果在地图场景中完成，这将强制打开消息积压。
 *   (强烈建议与按钮常见事件一起使用)
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.01:
 * - Message Backlog now removes more text codes regarding Letter Sounds.
 *
 * Version 1.00:
 * - Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @param ---Backlog Key---
 * @default
 *
 * @param LogKeyButton
 * @text Backlog Key Button
 * @parent ---Backlog Key---
 * @type combo
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc 当在消息期间按下时，
 * 这将打开“待办事项”窗口。
 * @default shift
 *
 * @param EnableLogKey
 * @text Enable Backlog Key
 * @parent ---Backlog Key---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 是否默认为您的信息启用待办事项按钮？
 * NO - false     YES - true
 * @default true
 *
 * @param ---Settings---
 * @default
 *
 * @param DefaultLogging
 * @text Default Logging
 * @parent ---Settings---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 默认记录所有消息？
 * NO - false     YES - true
 * @default true
 *
 * @param LogSpecialInput
 * @text Log Special Inputs
 * @parent ---Settings---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 记录玩家的特殊输入？
 * NO - false     YES - true
 * @default true
 *
 * @param SpecialInputFmt
 * @text Special Input Format
 * @parent LogSpecialInput
 * @desc 用于显示待定项中特殊输入文本的格式。
 * %1 - The text used in the selected choice.
 * @default »%1
 *
 * @param MaximumEntries
 * @text Maximum Entries
 * @parent ---Settings---
 * @type number
 * @min 1
 * @desc 这是记录条目的最大数量。
 * 如果添加了超过最大值的条目，最早的条目将被删除。
 * @default 20
 *
 * @param ScrollBarEnabled
 * @text Scroll Bar Enabled
 * @parent ---Settings---
 * @type boolean
 * @on SHOW
 * @off HIDE
 * @desc 为消息日志显示滚动条？
 * HIDE - false     SHOW - true
 * @default true
 *
 * @param ScrollBarColor
 * @text Scroll Bar Color
 * @parent ScrollBarEnabled
 * @type number
 * @min 0
 * @max 31
 * @desc 这是用于滚动条的文本颜色。
 * @default 0
 *
 * @param ScrollBarSpriteCode
 * @text Sprite Code
 * @parent ScrollBarEnabled
 * @type note
 * @desc 这是用于滚动条精灵的代码。
 * 如果您希望为您的游戏定制，请编辑此内容。
 * @default "// Establish basic measurements\nvar padding = backlogWindow.standardPadding();\nvar width = padding / 2;\nvar height = Graphics.boxHeight;\n\n// Calculate number of visible rows\nvar visibleRows = backlogWindow.height - padding * 2;\nvisibleRows = Math.floor(visibleRows / backlogWindow.lineHeight());\nif (visibleRows < backlogWindow.maxItems()) {\n  height *= visibleRows / Math.max(1, backlogWindow.maxItems());\n}\n\n// Calculate the size of a basic scrolling increment\nvar max = Math.floor(Math.max(1, backlogWindow.maxItems()) / backlogWindow.maxCols()) - 1;\nthis._increment = Graphics.boxHeight / Math.max(1, max);\n\n// Generate the bitmap\nthis.bitmap = new Bitmap(width, height);\nthis.bitmap.fillAll(backlogWindow.textColor(scrollBarColor));"
 *
 * @param ScrollSpeed
 * @text Scroll Speed
 * @parent ---Settings---
 * @type number
 * @min 0
 * @desc 这是用于查看记录信息的滚动速度。
 * 数字越低越快。数字越高越慢。
 * @default 4
 *
 * @param ScrollWrap
 * @text Scroll Wrap
 * @parent ---Settings---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 如果玩家位于日志条目的底部，
 * 向下击会将玩家卷回顶部。启用这个？
 * @default true
 *
 * @param ---Visual---
 * @default
 *
 * @param BackgroundType
 * @text Background Type
 * @parent ---Visual---
 * @type select
 * @option Window
 * @value 0
 * @option Dimmed
 * @value 1
 * @option Picture
 * @value 2
 * @option Transparent
 * @value 3
 * @desc 您希望消息记录窗口使用哪种背景类型？
 * ...
 * @default 1
 *
 * @param BackOpacity
 * @text Back Opacity
 * @parent ---Visual---
 * @type number
 * @min 0
 * @max 255
 * @desc 如果您使用的是窗口背景类型，
 * 调整该数值以设置窗口的背面不透明度。
 * @default 192
 *
 * @param DimColor1
 * @text Dim Color 1
 * @parent ---Visual---
 * @desc 如果您使用的是暗背景类型，
 * 在此调整第一种颜色。默认: rgba(0, 0, 0, 0.6)
 * @default rgba(0, 0, 0, 0.8)
 *
 * @param DimColor2
 * @text Dim Color 2
 * @parent ---Visual---
 * @desc 如果您使用的是暗背景类型，
 * 在此调整第一种颜色。默认值: rgba(0, 0, 0, 0)
 * @default rgba(0, 0, 0, 0.8)
 *
 * @param Picture
 * @parent ---Visual---
 * @type file
 * @dir img/pictures/
 * @require 1
 * @desc 如果您使用图片背景类型，
 * 选择用作背景的图片。
 * @default 
 *
 * @param PictureOpacity
 * @text Picture Opacity
 * @parent ---Visual---
 * @type number
 * @min 0
 * @max 255
 * @desc 如果您使用图片背景类型，
 * 调整该数值以设置图片的不透明度。
 * @default 255
 *
 * @param PictureStretch
 * @text Picture Stretch
 * @parent ---Visual---
 * @type boolean
 * @on Stretch
 * @off Don't Stretch
 * @desc 如果用作背景的图片比屏幕小，
 * 拉伸以适合屏幕？
 * @default true
 *
 */
//=============================================================================

if (Imported.YEP_MessageCore) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_MessageBacklog');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.MsgBacklogKeyButton = String(Yanfly.Parameters['LogKeyButton']);
Yanfly.Param.MsgBacklogEnableKey = String(Yanfly.Parameters['EnableLogKey']);
Yanfly.Param.MsgBacklogEnableKey = eval(Yanfly.Param.MsgBacklogEnableKey);

Yanfly.Param.MsgBacklogDefaultLog = String(Yanfly.Parameters['DefaultLogging']);
Yanfly.Param.MsgBacklogDefaultLog = eval(Yanfly.Param.MsgBacklogDefaultLog);
Yanfly.Param.MsgBacklogSpcInput = String(Yanfly.Parameters['LogSpecialInput']);
Yanfly.Param.MsgBacklogSpcInput = eval(Yanfly.Param.MsgBacklogSpcInput);
Yanfly.Param.MsgBacklogSpcFmt = String(Yanfly.Parameters['SpecialInputFmt']);
Yanfly.Param.MsgBacklogMaxEntries = Number(Yanfly.Parameters['MaximumEntries']);
Yanfly.Param.MsgBacklogScrBarEn = String(Yanfly.Parameters['ScrollBarEnabled']);
Yanfly.Param.MsgBacklogScrBarEn = eval(Yanfly.Param.MsgBacklogScrBarEn);
Yanfly.Param.MsgBacklogScrBarCol = Number(Yanfly.Parameters['ScrollBarColor']);
Yanfly.Param.MsgBacklogScrBarSpriteCode = 
  JSON.parse(Yanfly.Parameters['ScrollBarSpriteCode']);
Yanfly.Param.MsgBacklogScrollSpd = Number(Yanfly.Parameters['ScrollSpeed']);
Yanfly.Param.MsgBacklogScrollWrap = String(Yanfly.Parameters['ScrollWrap']);
Yanfly.Param.MsgBacklogScrollWrap = eval(Yanfly.Param.MsgBacklogScrollWrap);

Yanfly.Param.MsgBacklogBgType = Number(Yanfly.Parameters['BackgroundType']);
Yanfly.Param.MsgBacklogBackOpacity = Number(Yanfly.Parameters['BackOpacity']);
Yanfly.Param.MsgBacklogDimColor1 = String(Yanfly.Parameters['DimColor1']);
Yanfly.Param.MsgBacklogDimColor2 = String(Yanfly.Parameters['DimColor2']);
Yanfly.Param.MsgBacklogPicture = String(Yanfly.Parameters['Picture']);
Yanfly.Param.MsgBacklogPicOpacity = Number(Yanfly.Parameters['PictureOpacity']);
Yanfly.Param.MsgBacklogPicStretch = String(Yanfly.Parameters['PictureStretch']);
Yanfly.Param.MsgBacklogPicStretch = eval(Yanfly.Param.MsgBacklogPicStretch);

//=============================================================================
// Game_Temp
//=============================================================================

Game_Temp.prototype.isMessageBacklogOpened = function() {
  if (SceneManager._scene && SceneManager._scene._messageWindow) {
    var win = SceneManager._scene._messageWindow;
    if (win._backlogWindow && win._backlogWindow.isOpenAndActive()) {
      return true;
    }
  }
  return false;
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.MsgBacklog.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
  Yanfly.MsgBacklog.Game_System_initialize.call(this);
  this.initMessageBacklog();
};

Game_System.prototype.initMessageBacklog = function() {
  this._messageBacklog = [];
  this._messageBacklogKeyEnable = Yanfly.Param.MsgBacklogEnableKey;
  this._messageBacklogLoggingEnable = Yanfly.Param.MsgBacklogDefaultLog;
};

Game_System.prototype.addMessageBacklog = function(text) {
  if (!this.isMessageBacklogLoggingEnabled()) return;
  text = this.convertMessageBacklogText(text);
  this._messageBacklog.push(text);
  while (this._messageBacklog.length > Yanfly.Param.MsgBacklogMaxEntries) {
    this._messageBacklog.shift();
  }
};

Game_System.prototype.convertMessageBacklogText = function(text) {
  if (SceneManager._scene && SceneManager._scene._messageWindow) {
    var win = SceneManager._scene._messageWindow._backlogWindow;
    if (win) text = win.convertMessageText(text);
  }
  return text;
};

Game_System.prototype.getMessageBacklog = function() {
  if (this._messageBacklog === undefined) this.initMessageBacklog();
  return this._messageBacklog;
};

Game_System.prototype.isMessageBacklogKeyEnabled = function() {
  if (this._messageBacklogKeyEnable === undefined) this.initMessageBacklog();
  return this._messageBacklogKeyEnable;
};

Game_System.prototype.setMessageBacklogKeyEnable = function(value) {
  if (this._messageBacklogKeyEnable === undefined) this.initMessageBacklog();
  this._messageBacklogKeyEnable = value;
};

Game_System.prototype.isMessageBacklogLoggingEnabled = function() {
  if (this._messageBacklogLoggingEnable === undefined) {
    this.initMessageBacklog();
  }
  return this._messageBacklogLoggingEnable;
};

Game_System.prototype.setMessageBacklogLoggingEnable = function(value) {
  if (this._messageBacklogLoggingEnable === undefined) {
    this.initMessageBacklog();
  }
  this._messageBacklogLoggingEnable = value;
};

//=============================================================================
// Game_Player
//=============================================================================

Yanfly.MsgBacklog.Game_Player_canMove = Game_Player.prototype.canMove;
Game_Player.prototype.canMove = function() {
  if ($gameTemp.isMessageBacklogOpened()) return false;
  return Yanfly.MsgBacklog.Game_Player_canMove.call(this);
};

//=============================================================================
// Game_Event
//=============================================================================

Yanfly.MsgBacklog.Game_Event_updateSelfMovement =
  Game_Event.prototype.updateSelfMovement;
Game_Event.prototype.updateSelfMovement = function() {
  if ($gameTemp.isMessageBacklogOpened()) return;
  Yanfly.MsgBacklog.Game_Event_updateSelfMovement.call(this);
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.MsgBacklog.Game_Interpreter_pluginCommand =
  Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.MsgBacklog.Game_Interpreter_pluginCommand.call(this, command, args);
  // Plugin Commands
  if (command === 'EnableMessageBacklog') {
    $gameSystem.setMessageHideKeyEnable(true);

  } else if (command === 'DisableMessageBacklog') {
    $gameSystem.setMessageHideKeyEnable(false);

  } else if (command === 'EnableMessageLogging') {
    $gameSystem.setMessageBacklogLoggingEnable(true);

  } else if (command === 'DisableMessageLogging') {
    $gameSystem.setMessageBacklogLoggingEnable(false);

  } else if (command === 'OpenMessageBacklog') {
    if (SceneManager._scene instanceof Scene_Map) {
      var win = SceneManager._scene._messageWindow;
      if (win) win.openBacklogWindow();
    }

  // End
  }
};

//=============================================================================
// Scene_Map
//=============================================================================

Yanfly.MsgBacklog.Scene_Map_isMenuEnabled = Scene_Map.prototype.isMenuEnabled;
Scene_Map.prototype.isMenuEnabled = function() {
  if ($gameTemp.isMessageBacklogOpened()) return false;
  return Yanfly.MsgBacklog.Scene_Map_isMenuEnabled.call(this);
};

//=============================================================================
// Window_Message
//=============================================================================

Yanfly.MsgBacklog.Window_Message_createSubWindows =
  Window_Message.prototype.createSubWindows;
Window_Message.prototype.createSubWindows = function() {
  Yanfly.MsgBacklog.Window_Message_createSubWindows.call(this);
  this.createMessageBacklogWindow();
};

Window_Message.prototype.createMessageBacklogWindow = function() {
  this._backlogWindow = new Window_MessageBacklog();
  SceneManager._scene.addChild(this._backlogWindow);
};

Yanfly.MsgBacklog.Window_Message_isAnySubWindowActive =
  Window_Message.prototype.isAnySubWindowActive;
Window_Message.prototype.isAnySubWindowActive = function() {
  if (this._backlogWindow.active) return true;
  return Yanfly.MsgBacklog.Window_Message_isAnySubWindowActive.call(this);
};

Yanfly.MsgBacklog.Window_Message_startMessage =
  Window_Message.prototype.startMessage;
Window_Message.prototype.startMessage = function() {
  Yanfly.MsgBacklog.Window_Message_startMessage.call(this);
  $gameSystem.addMessageBacklog($gameMessage.allText());
};

Yanfly.MsgBacklog.Window_Message_updateInput =
  Window_Message.prototype.updateInput;
Window_Message.prototype.updateInput = function() {
  if (this.isAnySubWindowActive()) return true;
  this.updateBacklogInput();
  var value = Yanfly.MsgBacklog.Window_Message_updateInput.call(this);
  return value;
};

Window_Message.prototype.updateBacklogInput = function() {
  if (!this.pause) return;
  if (!$gameSystem.isMessageBacklogKeyEnabled()) return;
  if (Input.isTriggered(Yanfly.Param.MsgBacklogKeyButton)) {
    this.openBacklogWindow();
  }
};

Window_Message.prototype.openBacklogWindow = function() {
  this._backlogWindow.fullActivate();
};

Window_Message.prototype.setReturnWindow = function(target) {
  this._backlogWindow.setReturnWindow(target);
};

//=============================================================================
// Window_ChoiceList
//=============================================================================

Yanfly.MsgBacklog.Window_ChoiceList_processHandling =
  Window_ChoiceList.prototype.processHandling;
Window_ChoiceList.prototype.processHandling = function() {
  if (this.isOpenAndActive()) this.updateBacklogInput();
  Yanfly.MsgBacklog.Window_ChoiceList_processHandling.call(this);
};

Window_ChoiceList.prototype.updateBacklogInput = function() {
  if (!$gameSystem.isMessageBacklogKeyEnabled()) return;
  if (Input.isTriggered(Yanfly.Param.MsgBacklogKeyButton)) {
    this.openBacklogWindow();
  }
};

Window_ChoiceList.prototype.openBacklogWindow = function() {
  if (SceneManager._scene && SceneManager._scene._messageWindow) {
    SceneManager._scene._messageWindow.setReturnWindow(this);
    SceneManager._scene._messageWindow.openBacklogWindow();
  }
};

Yanfly.MsgBacklog.Window_ChoiceList_callOkHandler =
  Window_ChoiceList.prototype.callOkHandler;
Window_ChoiceList.prototype.callOkHandler = function() {
  this.backlogAddSelectedChoice();
  Yanfly.MsgBacklog.Window_ChoiceList_callOkHandler.call(this);
};

Window_ChoiceList.prototype.backlogAddSelectedChoice = function() {
  if (!Yanfly.Param.MsgBacklogSpcInput) return;
  var fmt = Yanfly.Param.MsgBacklogSpcFmt;
  var text = fmt.format(this.commandName(this.index()));
  $gameSystem.addMessageBacklog(text);
};

//=============================================================================
// Window_NumberInput
//=============================================================================

Yanfly.MsgBacklog.Window_NumberInput_processHandling =
  Window_NumberInput.prototype.processHandling;
Window_NumberInput.prototype.processHandling = function() {
  if (this.isOpenAndActive()) this.updateBacklogInput();
  Yanfly.MsgBacklog.Window_NumberInput_processHandling.call(this);
};

Window_NumberInput.prototype.updateBacklogInput = function() {
  if (!$gameSystem.isMessageBacklogKeyEnabled()) return;
  if (Input.isTriggered(Yanfly.Param.MsgBacklogKeyButton)) {
    this.openBacklogWindow();
  }
};

Window_NumberInput.prototype.openBacklogWindow = function() {
  if (SceneManager._scene && SceneManager._scene._messageWindow) {
    SceneManager._scene._messageWindow.setReturnWindow(this);
    SceneManager._scene._messageWindow.openBacklogWindow();
  }
};

Yanfly.MsgBacklog.Window_NumberInput_processOk =
  Window_NumberInput.prototype.processOk;
Window_NumberInput.prototype.processOk = function() {
  this.backlogAddSelectedChoice();
  Yanfly.MsgBacklog.Window_NumberInput_processOk.call(this);
};

Window_NumberInput.prototype.backlogAddSelectedChoice = function() {
  if (!Yanfly.Param.MsgBacklogSpcInput) return;
  var fmt = Yanfly.Param.MsgBacklogSpcFmt;
  var text = fmt.format(Yanfly.Util.toGroup(this._number));
  $gameSystem.addMessageBacklog(text);
};

//=============================================================================
// Window_EventItem
//=============================================================================

Yanfly.MsgBacklog.Window_EventItem_processHandling =
  Window_EventItem.prototype.processHandling;
Window_EventItem.prototype.processHandling = function() {
  if (this.isOpenAndActive()) this.updateBacklogInput();
  Yanfly.MsgBacklog.Window_EventItem_processHandling.call(this);
};

Window_EventItem.prototype.updateBacklogInput = function() {
  if (!$gameSystem.isMessageBacklogKeyEnabled()) return;
  if (Input.isTriggered(Yanfly.Param.MsgBacklogKeyButton)) {
    this.openBacklogWindow();
  }
};

Window_EventItem.prototype.openBacklogWindow = function() {
  if (SceneManager._scene && SceneManager._scene._messageWindow) {
    SceneManager._scene._messageWindow.setReturnWindow(this);
    SceneManager._scene._messageWindow.openBacklogWindow();
  }
};

Yanfly.MsgBacklog.Window_EventItem_onOk = Window_EventItem.prototype.onOk;
Window_EventItem.prototype.onOk = function() {
  this.backlogAddSelectedChoice();
  Yanfly.MsgBacklog.Window_EventItem_onOk.call(this);
};

Window_EventItem.prototype.backlogAddSelectedChoice = function() {
  if (!Yanfly.Param.MsgBacklogSpcInput) return;
  var fmt = Yanfly.Param.MsgBacklogSpcFmt;
  var item = this.item();
  var text = fmt.format('\\i[' + item.iconIndex + ']' + item.name);
  $gameSystem.addMessageBacklog(text);
};

//=============================================================================
// Sprite_BacklogScroll
//=============================================================================

function Sprite_BacklogScroll() {
    this.initialize.apply(this, arguments);
}

Sprite_BacklogScroll.prototype = Object.create(Sprite.prototype);
Sprite_BacklogScroll.prototype.constructor = Sprite_BacklogScroll;

Sprite_BacklogScroll.prototype.initialize = function(target) {
  this._target = target;
  Sprite.prototype.initialize.call(this);
  this._target._scrollSprite = this;
  this.initMembers();
  this.createBitmap();
};

Sprite_BacklogScroll.prototype.initMembers = function() {
  this.anchor.x = 1;
  this.anchor.y = 0;
  this.x = Graphics.boxWidth;
  this.y = 0;
  this._increment = 1;
};

Sprite_BacklogScroll.prototype.createBitmap = function() {
  var scrollBarColor = Yanfly.Param.MsgBacklogScrBarCol;
  var backlogWindow = this._target;
  this._increment = 1;
  eval(Yanfly.Param.MsgBacklogScrBarSpriteCode);
};

Sprite_BacklogScroll.prototype.resize = function() {
  this.bitmap.clear();
  this.createBitmap();
};

Sprite_BacklogScroll.prototype.update = function() {
  Sprite.prototype.update.call(this);
  if (!this._target) return;
  this.updateOpacity();
  //this.updatePosition();
};

Sprite_BacklogScroll.prototype.updateOpacity = function() {
  this.opacity = this._target.isOpen() ? 255 : 0;
};

Sprite_BacklogScroll.prototype.updatePosition = function() {
  var target = this._target;
  if (!target.isOpen()) return;
  this.y = target.topRow() * this._increment;
};

//=============================================================================
// Window_MessageBacklog
//=============================================================================

function Window_MessageBacklog() {
    this.initialize.apply(this, arguments);
}

Window_MessageBacklog.prototype = Object.create(Window_Command.prototype);
Window_MessageBacklog.prototype.constructor = Window_MessageBacklog;

Window_MessageBacklog.prototype.initialize = function() {
  this._touchHold = 0;
  this._ready = false;
  Window_Command.prototype.initialize.call(this, 0, 0);
  this.createScrollSprite(this);
  this.setBackgroundType(Yanfly.Param.MsgBacklogBgType);
  this.deactivate();
  this.openness = 0;
  this._ready = true;
};

Window_MessageBacklog.prototype.createScrollSprite = function() {
  if (!Yanfly.Param.MsgBacklogScrBarEn) return;
  this._scrollSprite = new Sprite_BacklogScroll(this);
  this.addChild(this._scrollSprite);
};

Window_MessageBacklog.prototype.windowWidth = function() {
  return Graphics.boxWidth;
};

Window_MessageBacklog.prototype.windowHeight = function() {
  return Graphics.boxHeight;
};

Window_MessageBacklog.prototype.dimColor1 = function() {
  return Yanfly.Param.MsgBacklogDimColor1;
};

Window_MessageBacklog.prototype.dimColor2 = function() {
  return Yanfly.Param.MsgBacklogDimColor2;
};

Window_MessageBacklog.prototype.setBackgroundType = function(type) {
  Window_Base.prototype.setBackgroundType.call(this, type);
  if (type === 2) this.createBackgroundPicture();
};

Window_MessageBacklog.prototype.createBackgroundPicture = function() {
  var filename = Yanfly.Param.MsgBacklogPicture;
  if (filename === '') return;
  this._backgroundPicture = new Sprite();
  this._backgroundPicture.bitmap = ImageManager.loadPicture(filename, 0);
  SceneManager._scene.addChild(this._backgroundPicture);
  this._backgroundPicture.opacity = 0;
  this._backgroundPicture.anchor.x = 0.5;
  this._backgroundPicture.anchor.y = 0.5;
  this._backgroundPicture.x = Graphics.boxWidth / 2;
  this._backgroundPicture.y = Graphics.boxHeight / 2;
};

Window_MessageBacklog.prototype.setBgPictureOpacity = function(opacity) {
  this._backgroundPicture.opacity = opacity;
  
  this.stretchBgPicture();
};

Window_MessageBacklog.prototype.stretchBgPicture = function() {
  if (!Yanfly.Param.MsgBacklogPicStretch) return;
  if (this._backgroundPicture.width < Graphics.boxWidth) {
    var rate = Graphics.boxWidth / this._backgroundPicture.width;
    this._backgroundPicture.scale.x = rate;
  }
  if (this._backgroundPicture.height < Graphics.boxHeight) {
    var rate = Graphics.boxHeight / this._backgroundPicture.height;
    this._backgroundPicture.scale.y = rate;
  }
};

Window_MessageBacklog.prototype.standardFontFace = function() {
  return Window_Message.prototype.standardFontFace.call(this);
};

Window_MessageBacklog.prototype.standardFontSize = function() {
  return Window_Message.prototype.standardFontSize.call(this);
};

Window_MessageBacklog.prototype.standardBackOpacity = function() {
  return Yanfly.Param.MsgBacklogBackOpacity;
};

Window_MessageBacklog.prototype.makeFontBigger = function() {
};

Window_MessageBacklog.prototype.makeFontSmaller = function() {
};

Window_MessageBacklog.prototype.select = function(index) {
};

Window_MessageBacklog.prototype.moveSelect = function(index) {
  Window_Command.prototype.select.call(this, index);
  if (this._scrollSprite) this._scrollSprite.updatePosition();
};

Window_MessageBacklog.prototype.deselect = function() {
  this.moveSelect(-1);
};

Window_MessageBacklog.prototype.processHandling = function() {
  if (!this.isOpenAndActive()) return;
  Window_Command.prototype.processHandling.call(this);
  if (Input.isTriggered(Yanfly.Param.MsgBacklogKeyButton)) {
    this.processCancel();
  }
};

Window_MessageBacklog.prototype.setReturnWindow = function(target) {
  this._returnWindow = target;
  this._returnWindow.deactivate();
};

Window_MessageBacklog.prototype.fullActivate = function() {
  this.updateInputData();
  Input.clear();
  TouchInput.clear();
  this.refresh();
  this.activate();
  this.openness = 255;
  this.moveSelect(this.maxItems() - 1);
  if (this._scrollSprite) this._scrollSprite.resize();
  if (this._backgroundPicture) {
    this.setBgPictureOpacity(Yanfly.Param.MsgBacklogPicOpacity);
  }
};

Window_MessageBacklog.prototype.processOk = function() {
  SoundManager.playOk();
  this.fullDeactivate();
};

Window_MessageBacklog.prototype.isCancelEnabled = function() {
  return true;
};

Window_MessageBacklog.prototype.processCancel = function() {
  SoundManager.playCancel();
  this.fullDeactivate();
};

Window_MessageBacklog.prototype.fullDeactivate = function() {
  this.updateInputData();
  Input.clear();
  TouchInput.clear();
  this.deactivate();
  this.openness = 0;
  this.deselect();
  if (this._returnWindow) {
    this._returnWindow.activate();
    this._returnWindow = undefined;
  }
  if (this._backgroundPicture) this.setBgPictureOpacity(0)
};

Window_MessageBacklog.prototype.isCursorVisible = function() {
  return false;
};

Window_MessageBacklog.prototype.cursorDown = function(wrap) {
  var index = this.bottomRow();
  var maxItems = this.maxItems();
  var maxCols = this.maxCols();
  wrap = Yanfly.Param.MsgBacklogScrollWrap;
  if (index < maxItems - maxCols || (wrap && maxCols === 1)) {
    this.moveSelect((index + maxCols) % maxItems);
  }
};

Window_MessageBacklog.prototype.cursorUp = function(wrap) {
  var index = this.topRow();
  var maxItems = this.maxItems();
  var maxCols = this.maxCols();
  wrap = Yanfly.Param.MsgBacklogScrollWrap;
  if (index >= maxCols || (wrap && maxCols === 1)) {
    this.moveSelect((index - maxCols + maxItems) % maxItems);
  }
};

Window_MessageBacklog.prototype.cursorPagedown = function() {
  var index = this.index();
  var maxItems = this.maxItems();
  if (this.topRow() + this.maxPageRows() < this.maxRows()) {
    SoundManager.playCursor();
  }
  Window_Selectable.prototype.cursorPagedown.call(this);
  if (this._scrollSprite) this._scrollSprite.updatePosition();
};

Window_MessageBacklog.prototype.cursorPageup = function() {
  var index = this.index();
  if (this.topRow() > 0) {
    SoundManager.playCursor();
  }
  Window_Selectable.prototype.cursorPageup.call(this);
  if (this._scrollSprite) this._scrollSprite.updatePosition();
};

Window_MessageBacklog.prototype.processTouch = function() {
  if (!this.isOpenAndActive()) return;
  this._touchHold -= 1;
  if (TouchInput.isPressed() && this._touchHold <= 0) {
    if (TouchInput.y < Graphics.boxHeight / 4) {
      this.scrollUp();
      this._touchHold = Yanfly.Param.MsgBacklogScrollSpd;
    } else if (TouchInput.y > Graphics.boxHeight * 3 / 4) {
      this.scrollDown();
      this._touchHold = Yanfly.Param.MsgBacklogScrollSpd;
    } else {
      this.processOk();
    }
  } else if (TouchInput.isCancelled()) {
    if (this.isCancelEnabled()) {
      this.processCancel();
    }
  }
};

Window_MessageBacklog.prototype.drawItem = function(index) {
  var rect = this.itemRectForText(index);
  var align = this.itemTextAlign();
  var symbol = this.commandSymbol(index);
  if (symbol === 'linebreak') {
    this.drawHorzLine(rect.y);
    this.resetFontSettings();
  } else if (symbol === 'text') {
    this.drawTextEx(this.commandName(index), rect.x, rect.y);
  } else if (symbol === 'buffer') {
    if (index !== this.topRow()) return;
    var ext = this._list[index].ext;
    this.drawItem(index - ext);
  }
};

Window_MessageBacklog.prototype.drawHorzLine = function(y) {
  var lineY = y + this.lineHeight() / 2 - 1;
  this.contents.paintOpacity = 48;
  this.contents.fillRect(0, lineY, this.contentsWidth(), 2, this.normalColor());
  this.contents.paintOpacity = 255;
};

Window_MessageBacklog.prototype.drawTextEx = function(text, x, y) {
  if (text) {
    var textState = { index: 0, x: x, y: y, left: x };
    textState.text = this.convertEscapeCharacters(text);
    textState.height = this.calcTextHeight(textState, false);
    while (textState.index < textState.text.length) {
      this.processCharacter(textState);
    }
    return textState.x - x;
  } else {
    return 0;
  }
};

Window_MessageBacklog.prototype.textHeightEx = function(text) {
  return this.getTextExHeight(text, 0, 0);
};

Window_MessageBacklog.prototype.getTextExHeight = function(text, x, y) {
  if (text) {
    var textState = { index: 0, x: x, y: y, left: x };
    textState.text = this.convertEscapeCharacters(text);
    textState.height = this.calcTextHeight(textState, false);
    while (textState.index < textState.text.length) {
      this.processCharacter(textState);
    }
    this.contents.clear();
    return textState.y;
  } else {
    return 0;
  }
};

Window_MessageBacklog.prototype.makeCommandList = function() {
  if (!this._ready) return;
  var backlog = $gameSystem.getMessageBacklog();
  var length = backlog.length;
  for (var i = 0; i < length; ++i) {
    var text = backlog[i];
    this.addCommand('---', 'linebreak');
    this.addIndividualLines(text);
  }
  this.addCommand('---', 'linebreak');
};

Window_MessageBacklog.prototype.addIndividualLines = function(text) {
  var text = this.convertMessageText(text);
  var items = text.split('\n');
  var length = items.length;
  for (var i = 0; i < length; ++i) {
    var line = items[i];
    if (line.length <= 0) continue;
    this.addCommand(line, 'text');
    this.addWordWrapBuffer(line);
  }
};

Window_MessageBacklog.prototype.convertMessageText = function(text) {
  text = this.convertMessageMacros(text);
  text = text.replace(/\\/g, '\x1b');
  text = this.convertNameboxCodes(text);
  text = this.convertBasicCodes(text);
  text = this.convertSpecialCodes(text);
  text = this.removeMessageBoxOnlyCodes(text);
  return text;
};

Window_MessageBacklog.prototype.convertMessageMacros = function(text) {
  if (Imported.YEP_X_MessageMacros1) {
    text = this.convertMacroText(text);
  }
  return text;
};

Window_MessageBacklog.prototype.convertNameboxCodes = function(text) {
  var name = '';
  // \x1b
  if (text.match(/\x1bN\<(.*?)\>/gi)) {
    name = RegExp.$1;
  } else if (text.match(/\x1bN(\d+)\<(.*?)\>/gi)) {
    name = RegExp.$2;
  } else if (text.match(/\x1bN(?:T|D|L|C|R|DL|DC|DR|TL|TC|TR)\<(.*?)\>/gi)) {
    name = RegExp.$1;
  } else if 
  (text.match(/\x1bN(?:T|D|L|C|R|DL|DC|DR|TL|TC|TR)(\d+)\<(.*?)\>/gi)) {
    name = RegExp.$2;
  }
  if (name.length > 0) {
    var nameText = Yanfly.Param.MSGNameBoxText + name + '\\c[0]\n';
    text = nameText + text;
  }
  // \x1b version
  text = text.replace(/\x1bN\<(.*?)\>/gi, '');
  text = text.replace(/\x1bN(\d+)\<(.*?)\>/gi, '');
  text = text.replace(/\x1bN(?:T|D|L|C|R|DL|DC|DR|TL|TC|TR)\<(.*?)\>/gi, '');
  text = text.replace(/\x1bN\<(.*?)\>/gi, '');
  text = 
    text.replace(/\x1bN(?:T|D|L|C|R|DL|DC|DR|TL|TC|TR)(\d+)\<(.*?)\>/gi, '');
  return text;
};

Window_MessageBacklog.prototype.convertBasicCodes = function(text) {
  text = text.replace(/\\/g, '\x1b');
  text = text.replace(/\x1b\x1b/g, '\\');
  text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
    return $gameVariables.value(parseInt(arguments[1]));
  }.bind(this));
  text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
    return $gameVariables.value(parseInt(arguments[1]));
  }.bind(this));
  text = text.replace(/\x1bN\[(\d+)\]/gi, function() {
    return this.actorName(parseInt(arguments[1]));
  }.bind(this));
  text = text.replace(/\x1bP\[(\d+)\]/gi, function() {
    return this.partyMemberName(parseInt(arguments[1]));
  }.bind(this));
  text = text.replace(/\x1bG/gi, TextManager.currencyUnit);
  return text;
};

Window_MessageBacklog.prototype.convertSpecialCodes = function(text) {
  if (Imported.YEP_X_ExtMesPack2) {
    text = this.convertItemQuantitiesCodes(text);
    text = this.convertActorParameterCodes(text);
    text = this.convertEnemyParameterCodes(text);
  }
  return text;
};

Window_MessageBacklog.prototype.removeMessageBoxOnlyCodes = function(text) {
  text = text.replace(/\x1b/gi, '\\');
  // Message Core
  text = text.replace(/\\AF\[(\d+)\]/gi, '');
  text = text.replace(/\\PF\[(\d+)\]/gi, '');
  text = text.replace(/\\FS\[(\d+)\]/gi, '');
  // Extended Message Pack 1
  text = text.replace(/\\LSON/gi, '');
  text = text.replace(/\\LSOFF/gi, '');
  text = text.replace(/\\LSRESET/gi, '');
  text = text.replace(/\\LSR/gi, '');
  text = text.replace(/\\LSN\[(.*?)\]/gi, '');
  text = text.replace(/\\LSV\[(\d+)\]/gi, '');
  text = text.replace(/\\LSPIV\[(\d+)\]/gi, '');
  text = text.replace(/\\LSPI\[(\d+)\]/gi, '');
  text = text.replace(/\\LSPAV\[(\d+)\]/gi, '');
  text = text.replace(/\\LSPA\[(\d+)\]/gi, '');
  text = text.replace(/\\LSI\[(\d+)\]/gi, '');
  text = text.replace(/\\MSGPOSX\[(.*?)\]/gi, '');
  text = text.replace(/\\MSGPOSY\[(.*?)\]/gi, '');
  text = text.replace(/\\MSGEVENT\[(\d+)\]/gi, '');
  text = text.replace(/\\MSGACTOR\[(\d+)\]/gi, '');
  text = text.replace(/\\MSGPARTY\[(\d+)\]/gi, '');
  text = text.replace(/\\MSGENEMY\[(\d+)\]/gi, '');
  text = text.replace(/\\AUTOEVENT\[(\d+)\]/gi, '');
  text = text.replace(/\\AUTOACTOR\[(\d+)\]/gi, '');
  text = text.replace(/\\AUTOPARTY\[(\d+)\]/gi, '');
  text = text.replace(/\\AUTOENEMY\[(\d+)\]/gi, '');
  text = text.replace(/\\MSGROWS\[(.*?)\]/gi, '');
  text = text.replace(/\\MSGWIDTH\[(.*?)\]/gi, '');
  text = text.replace(/\\AUTO/gi, '');
  text = text.replace(/\\MSGRESET/gi, '');
  text = text.replace(/\\FACEINDEX\[(\d+)\]/gi, '');
  return text;
};

Window_MessageBacklog.prototype.addWordWrapBuffer = function(text) {
  if (!text.match(/<(?:WordWrap)>/gi)) return;
  var textHeight = this.textHeightEx(text);
  var bufferTimes = Math.ceil(textHeight / this.lineHeight());
  for (var i = 1; i <= bufferTimes; ++i) {
    this.addCommand('', 'buffer', true, i);
  }
};

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

if (!Yanfly.Util.toGroup) {

Yanfly.Util.toGroup = function(inVal) {
  return inVal;
}

};

//=============================================================================
// End of File
//=============================================================================
} else {

var text = '';
text += 'You are getting this error because you are trying to run ';
text += 'YEP_X_MessageBacklog without the required plugins. Please visit ';
text += 'Yanfly.moe and install the required plugins neede for this plugin ';
text += 'found in this plugin\'s help file before you can use it.';
console.log(text);
require('nw.gui').Window.get().showDevTools();

}; // Imported.YEP_MessageCore