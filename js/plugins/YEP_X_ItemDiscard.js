//=============================================================================
// Yanfly Engine Plugins - Item Core Extension - Item Discard
// YEP_X_ItemDiscard.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_ItemDiscard = true;

var Yanfly = Yanfly || {};
Yanfly.ItemDiscard = Yanfly.ItemDiscard || {};
Yanfly.ItemDiscard.version = 1.02;

//=============================================================================
 /*:
 * @plugindesc v1.02 物品丢弃(需要 YEP_ItemCore.js)
 * items from their inventory.
 * @author Yanfly Engine Plugins + Sylvester Collaboration
 *
 * @param ---General---
 * @default
 *
 * @param Discard Command
 * @parent ---General---
 * @desc 用于丢弃物品的命令文本。
 * %1 - Item Name   %2 - Quantity   %3 - Stock
 * @default Discard %1 %2/%3
 *
 * @param Default Discard
 * @parent ---General---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 默认情况下可以丢弃所有物品吗？
 * YES - true     NO - false
 * @default true
 *
 * @param ---Confirm---
 * @default
 *
 * @param Confirm Discard
 * @parent ---Confirm---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 您希望显示确认消息吗？
 * YES - true     NO - false
 * @default true
 *
 * @param Confirm Message
 * @parent ---Confirm---
 * @desc 用于丢弃确认的命令文本。
 * %1 - Item Name   %2 - Quantity
 * @default Are you sure you want to discard %1 %2?
 *
 * @param Confirm Yes
 * @parent ---Confirm---
 * @desc 丢弃时用于"Yes"的文本。
 * @default Yes
 *
 * @param Confirm No
 * @parent ---Confirm---
 * @desc 丢弃时用于"No"的文本。
 * @default No
 *
 * @help
 * ============================================================================
 * 正式介绍
 * ============================================================================
 *
 * 这个插件需要YEP_ItemCore。
 * 确保该插件位于插件列表中的YEP _ ItemCore下。
 *
 * 在RPG Maker MV中丢弃物品是不可能的默认设置。
 * 为了摆脱物品，玩家必须要么使用它们，
 * 要么出售它们，但不能直接丢弃它们。
 * 这个插件使用由炎飞的物品核心插件提供的额外菜单命令来添加一个丢弃选项，
 * 允许玩家选择他们想要丢弃的物品。
 * 玩家可以通过突出显示丢弃选项并按左/右来调整
 * 丢弃数量来设置数量值。
 *
 * This is a collaboration plugin by Sylvester and Yanfly to ensure
 * compatibility with the Yanfly Engine Plugins library.
 *
 * *注意:该插件不支持仅触摸屏游戏，因为键盘或控制器
 * 输入用于访问调整丢弃值的能力。
 *
 * ============================================================================
 * 注释标记
 * ============================================================================
 *
 * 有几个标签可以和物品丢弃插件一起使用。
 * 它们的存在是为了允许你在插件的参数
 * 设置中抵消默认放弃选项。
 *
 * 物品、武器和盔甲标签:
 *
 *   <Can Discard>
 *   - 这将设置物品、武器或护甲是可丢弃的，
 *   不管默认丢弃插件参数。
 *
 *   <Cannot Discard>
 *   - 这将设置物品、武器或盔甲不能被丢弃，
 *   不管默认丢弃插件参数。
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.02:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.01:
 * - Fixed a problem with the notetags not working.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

if (Imported.YEP_ItemCore &&
  Yanfly.Item.version && Yanfly.Item.version >= 1.27) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_ItemDiscard');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.ItemDiscardCmdFmt = String(Yanfly.Parameters['Discard Command']);
Yanfly.Param.ItemDiscardDefault = String(Yanfly.Parameters['Default Discard']);
Yanfly.Param.ItemDiscardDefault = eval(Yanfly.Param.ItemDiscardDefault);
Yanfly.Param.ItemDiscardConfirm = String(Yanfly.Parameters['Confirm Discard']);
Yanfly.Param.ItemDiscardConfirm = eval(Yanfly.Param.ItemDiscardConfirm);
Yanfly.Param.ItemDiscardMessage = String(Yanfly.Parameters['Confirm Message']);
Yanfly.Param.ItemDiscardYes = String(Yanfly.Parameters['Confirm Yes']);
Yanfly.Param.ItemDiscardNo = String(Yanfly.Parameters['Confirm No']);

//=============================================================================
// DataManager
// ----------------------------------------------------------------------------
// Notetags added by Yanfly
//=============================================================================

Yanfly.ItemDiscard.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.ItemDiscard.DataManager_isDatabaseLoaded.call(this)) return false;

  if (!Yanfly._loaded_YEP_X_ItemDiscard) {
    this.processItemDiscardNotetags1($dataItems);
    this.processItemDiscardNotetags1($dataWeapons);
    this.processItemDiscardNotetags1($dataArmors);
    Yanfly._loaded_YEP_X_ItemDiscard = true;
  }
  
  return true;
};

DataManager.processItemDiscardNotetags1 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.canDiscard = Yanfly.Param.ItemDiscardDefault;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<CAN DISCARD>/i)) {
        obj.canDiscard = true;
      } else if (line.match(/<CANNOT DISCARD>/i)) {
        obj.canDiscard = false;
      }
    }
  }
};

//=============================================================================
// Window_ItemActionCommand
//=============================================================================

Yanfly.ItemDiscard.Window_ItemActionCommand_initialize =
  Window_ItemActionCommand.prototype.initialize;
Window_ItemActionCommand.prototype.initialize = function(x, y) {
  Yanfly.ItemDiscard.Window_ItemActionCommand_initialize.call(this, x, y);
  this._discardAmount = 1;
};

Yanfly.ItemDiscard.Window_ItemActionCommand_setItem =
  Window_ItemActionCommand.prototype.setItem;
Window_ItemActionCommand.prototype.setItem = function(item) {
  this._discardAmount = 1;
  Yanfly.ItemDiscard.Window_ItemActionCommand_setItem.call(this, item);
};

Yanfly.ItemDiscard.Window_ItemActionCommand_addCustomCommandsF =
  Window_ItemActionCommand.prototype.addCustomCommandsF;
Window_ItemActionCommand.prototype.addCustomCommandsF = function() {
  Yanfly.ItemDiscard.Window_ItemActionCommand_addCustomCommandsF.call(this);
  if (this.isShowDiscardCommand()) this.addDiscardCommand();
};

Window_ItemActionCommand.prototype.isShowDiscardCommand = function() {
  if (this._item.baseItemId && $gameParty.checkItemIsEquipped(this._item)) {
    return false;
  }
  return true;
};

Window_ItemActionCommand.prototype.addDiscardCommand = function() {
  if (!this._item) {
    return false;
  }
  var enabled = this._item.canDiscard;
  var text = this.createDiscardCommandName();
  this.addCommand(text, 'discard', enabled);
};

Window_ItemActionCommand.prototype.createDiscardCommandName = function() {
  var fmt = Yanfly.Param.ItemDiscardCmdFmt;
  var name = '\\i[' + this._item.iconIndex + ']';
  if (this._item.textColor !== undefined) {
    name += '\\c[' + this._item.textColor + ']';
  }
  name += this._item.name + '\\c[0]';
  if ($gameParty.maxItems(this._item) > 1) {
    var quantity = '\u00d7' + Yanfly.Util.toGroup(this._discardAmount);
    var stock = $gameParty.numItems(this._item);
  } else {
    var quantity = '';
    var stock = '';
  }
  var text = fmt.format(name, quantity, stock);
  return text;
};

Yanfly.ItemDiscard.Window_ItemActionCommand_update =
  Window_ItemActionCommand.prototype.update;
Window_ItemActionCommand.prototype.update = function() {
  Yanfly.ItemDiscard.Window_ItemActionCommand_update.call(this);
  if (this.currentSymbol() === 'discard') this.updateDiscard();
};

Window_ItemActionCommand.prototype.updateDiscard = function() {
  if (!this.active) {
    return;
  }
  if (Input.isRepeated('left')) {
    var prevAmount = this._discardAmount;
    this._discardAmount -= 1;
  } else if (Input.isRepeated('right')) {
    var prevAmount = this._discardAmount;
    this._discardAmount += 1;
  } else {
    return;
  }
  if (Input.isPressed('shift')) {
    this._discardAmount *= 10;
  }
  this._discardAmount = this._discardAmount.clamp(1,
    $gameParty.numItems(this._item));
  if (prevAmount !== this._discardAmount) {
    SoundManager.playCursor();
    this._list[this.index()].name = this.createDiscardCommandName();
    this.redrawCurrentItem();
  }
};

//=============================================================================
// Window_ItemDiscardConfirm
//=============================================================================

function Window_ItemDiscardConfirm() {
    this.initialize.apply(this, arguments);
}

Window_ItemDiscardConfirm.prototype = Object.create(Window_Command.prototype);
Window_ItemDiscardConfirm.prototype.constructor = Window_ItemDiscardConfirm;

Window_ItemDiscardConfirm.prototype.initialize = function() {
  Window_Command.prototype.initialize.call(this, 0, 0);
  this.openness = 0;
};

Window_ItemDiscardConfirm.prototype.makeCommandList = function() {
  this.addCommand(Yanfly.Param.ItemDiscardYes, 'confirm');
  this.addCommand(Yanfly.Param.ItemDiscardNo, 'cancel');
};

Window_ItemDiscardConfirm.prototype.setData = function(item, quantity) {
  var fmt = Yanfly.Param.ItemDiscardMessage;
  var name = '\\i[' + item.iconIndex + ']';
  if (item.textColor !== undefined) {
    name += '\\c[' + item.textColor + ']';
  }
  name += item.name;
  if ($gameParty.maxItems(item) > 1) {
    quantity = '\u00d7' + Yanfly.Util.toGroup(quantity);
  } else {
    quantity = '\u00d7' + 1;
  }
  this._text = fmt.format(name, quantity);
  var ww = this.textWidthEx(this._text) + this.standardPadding() * 4;
  this.width = ww;
  this.refresh();
  this.x = (Graphics.boxWidth - this.width) / 2;
  this.y = (Graphics.boxHeight - this.height) / 2;
  this.drawTextEx(this._text, this.textPadding(), 0);
};

Window_ItemDiscardConfirm.prototype.textWidthEx = function(text) {
  return this.drawTextEx(text, 0, this.contents.height);
};

Window_ItemDiscardConfirm.prototype.itemTextAlign = function() {
  return 'center';
};

Window_ItemDiscardConfirm.prototype.windowHeight = function() {
  return this.fittingHeight(3);
};

Window_ItemDiscardConfirm.prototype.itemRect = function(index) {
  var rect = Window_Selectable.prototype.itemRect.call(this, index);
  rect.y += this.lineHeight();
  return rect;
};

//=============================================================================
// Scene_Item
//=============================================================================

Yanfly.ItemDiscard.Scene_Item_createActionWindow =
  Scene_Item.prototype.createActionWindow;
Scene_Item.prototype.createActionWindow = function() {
  Yanfly.ItemDiscard.Scene_Item_createActionWindow.call(this);
  this._itemActionWindow.setHandler('discard', this.onActionDiscard.bind(this));
  this.createDiscardConfirmWindow()
};

Scene_Item.prototype.onActionDiscard = function() {
  var item = this._itemActionWindow._item;
  var quantity = this._itemActionWindow._discardAmount;
  if (Yanfly.Param.ItemDiscardConfirm) {
    this._discardConfirmWindow.setData(item, quantity);
    this._discardConfirmWindow.open();
    this._discardConfirmWindow.activate();
    this._discardConfirmWindow.select(0);
  } else {
    this.performDiscardItem(item, quantity);
  }
};

Scene_Item.prototype.createDiscardConfirmWindow = function() {
  this._discardConfirmWindow = new Window_ItemDiscardConfirm();
  var win = this._discardConfirmWindow;
  win.setHandler('confirm', this.onDiscardConfirmOk.bind(this));
  win.setHandler('cancel',  this.onDiscardConfirmCancel.bind(this));
  this.addWindow(this._discardConfirmWindow);
};

Scene_Item.prototype.onDiscardConfirmOk = function() {
  var item = this._itemActionWindow._item;
  var quantity = this._itemActionWindow._discardAmount;
  this._discardConfirmWindow.close();
  this.performDiscardItem(item, quantity);
};

Scene_Item.prototype.onDiscardConfirmCancel = function() {
  this._discardConfirmWindow.deactivate();
  this._discardConfirmWindow.close();
  this._itemActionWindow.activate();
};

Scene_Item.prototype.performDiscardItem = function(item, quantity) {
  $gameParty.loseItem(item, quantity);
  if ($gameParty.numItems(item) > 0) {
    this._itemActionWindow._discardAmount = 1;
    this._itemActionWindow.refresh();
    this._itemActionWindow.activate();
    this._itemWindow.refresh();
  } else {
    this._itemActionWindow.hide();
    this._itemActionWindow.deactivate();
    this._itemWindow.refresh();
    this._itemWindow.activate();
  }
};

//=============================================================================
// Yanfly's Functions
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

Yanfly.Util.toGroup = function(inVal) {
  if (typeof inVal !== 'string') { inVal = String(inVal); }
  if (!eval(Yanfly.Param.DigitGroup)) return inVal;
  return inVal.replace(/(^|[^\w.])(\d{4,})/g, function($0, $1, $2) {
    return $1 + $2.replace(/\d(?=(?:\d\d\d)+(?!\d))/g, "$&,");
  });
};

//=============================================================================
// End of File
//=============================================================================
} else {

var text = '================================================================\n';
text += 'YEP_X_ItemDiscard requires YEP_ItemCore and to be at the latest '
text += 'version to run properly. '
text += '\n\nPlease go to www.yanfly.moe and update to the latest version for ';
text += 'the YEP_ItemCore plugin.\n';
text += '================================================================\n';
console.log(text);
require('nw.gui').Window.get().showDevTools();

}; // if (Imported.YEP_ItemCore) {