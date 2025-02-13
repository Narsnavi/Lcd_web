//=============================================================================
// Yanfly Engine Plugins - Status Menu Extension - More Status Menu Pages
// YEP_X_MoreStatusPages.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_MoreStatusPages = true;

var Yanfly = Yanfly || {};
Yanfly.MSMP = Yanfly.MSMP || {};
Yanfly.MSMP.version = 1.02;

//=============================================================================
 /*:
 * @plugindesc v1.02 更多状态页面(需要 YEP_StatusMenuCore.js)
 * your status menu however you want!
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * 介绍
 * ============================================================================
 *
 * 这个插件需要YEP _ StatusMenuCore。
 * 确保该插件位于插件列表中的YEP _ StatusMenuCore下。
 *
 * 有时，你会希望能够在每个党员的状态菜单页面中放置更多的信息。
 * 这个扩展菜单允许你创建任意多的自定义页面，
 * 并在其中插入任意文本！
 * 用它来创建自定义背景故事，角色的附加信息，
 * 等等！
 *
 * ============================================================================
 * 说明
 * ============================================================================
 *
 * 按照以下步骤向您的状态菜单列表添加更多状态页面:
 *
 *   1. 在插件列表中打开你的YEP _ StatusMenuCore插件。
 *      查找'Command Order'插件参数。
 *
 *   2. 在其中，将文本'MorePages'放在您希望额外的状态菜单
 *      页面所在的位置。
 *
 *   3. 按确定并关闭插件管理器。
 *
 *   4. 保存您的游戏项目。
 *
 * ============================================================================
 * 注释标记
 * ============================================================================
 *
 * 将下列注释标记放在您希望向其添加更多状态菜单页面
 * 的参与者的注释框中。
 *
 * 角色注释标签:
 *
 *   ========================================================================
 *
 *   <Status Menu Page: title>
 *    text
 *    text
 *   </Status Menu Page: title>
 *   - 将'title'替换为您希望在命令窗口中显示的状态菜单页面的标题。
 *   插入您认为适合您的额外状态菜单配置文件的多行'text'.
 *   插入此标签的多个设置将允许您在状态
 *   菜单中有更多的页面条目。
 *
 *   注意:您可以为'text'条目使用文本代码。
 *
 *   -- 例子 ---
 *
 *   <Status Menu Page: Origin>
 *    \n[1] is originally from the kingdom of Dragnof, a country that
 *    existed 400 years in the past; the population was made up of both
 *    humans and Dragons co-existing peacefully with each other.
 *   </Status Menu Page: Origin>
 *
 *   <Status Menu Page: Discipline>
 *    \n[1] firmly believes in noblesse oblige, where the strong and
 *    privileged should act with generosity and nobility towards those
 *    less privileged.
 *   </Status Menu Page: Discipline>
 *
 *   ========================================================================
 *
 *   <Status Menu Page title Switch: x>
 *   <Status Menu Page title Switch: x, x, x>
 *   - 将'title'替换为您希望此注释标记影响的状态菜单页面的标题。
 *   将“x”替换为开关ID，该标识必须为ON，以便
 *   此状态菜单页面显示在参与者的状态菜单配置文件中。
 *   如果使用多个开关，所有开关都必须打开才能显示此状
 *   态菜单页面。
 *
 *   -- 例子 ---
 *
 *   <Status Menu Page Origin Switch: 1>
 *   <Status Menu Page Discipline Switch: 5, 6, 7, 8, 9, 10>
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.02:
 * - Fixed a bug that crashed the game if certain actors did not have the same
 * status page keys as others when changing between actors.
 *
 * Version 1.01:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

if (Imported.YEP_StatusMenuCore && Yanfly.Status.version &&
  Yanfly.Status.version >= 1.02) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_MoreStatusPages');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.Variables = String(Yanfly.Parameters['Variables']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.MSMP.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.MSMP.DataManager_isDatabaseLoaded.call(this)) return false;

  if (!Yanfly._loaded_YEP_X_MoreStatusPages) {
    this.processMoreStatusMenuPagesNotetags1($dataActors);
    Yanfly._loaded_YEP_X_MoreStatusPages = true;
  }
  
  return true;
};

DataManager.processMoreStatusMenuPagesNotetags1 = function(group) {
  var note1 = /<STATUS MENU PAGE:[ ](.*)>/i;
  var note2 = /<\/STATUS MENU PAGE:[ ](.*)>/i;
  var note3 = /<STATUS MENU PAGE[ ](.*)[ ]SWITCH:[ ]*(\d+(?:\s*,\s*\d+)*)>/i
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.customStatusMenuPages = [];
    obj.customStatusMenuPagesData = {};
    obj.customStatusMenuPageRequirement = {};
    var evalMode = 'none';
    var pageKey = 'none';

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note1)) {
        evalMode = 'custom status menu page';
        var pageKey = String(RegExp.$1);
        obj.customStatusMenuPages.push(pageKey);
        obj.customStatusMenuPagesData[pageKey] = [];
      } else if (line.match(note2)) {
        evalMode = 'none';
        pageKey = 'none';
      } else if (evalMode === 'custom status menu page') {
        obj.customStatusMenuPagesData[pageKey].push(line);
      } else if (line.match(note3)) {
        var pageKey = String(RegExp.$1);
        obj.customStatusMenuPageRequirement[pageKey] =
          obj.customStatusMenuPageRequirement[pageKey] || [];
        var array = JSON.parse('[' + RegExp.$2.match(/\d+/g) + ']');
        obj.customStatusMenuPageRequirement[pageKey] =
          obj.customStatusMenuPageRequirement[pageKey].concat(array);
      }
    }
  }
};

//=============================================================================
// Window_StatusCommand
//=============================================================================

Yanfly.MSMP.Window_StatusCommand_createCommand =
  Window_StatusCommand.prototype.createCommand;
Window_StatusCommand.prototype.createCommand = function(command) {
  Yanfly.MSMP.Window_StatusCommand_createCommand.call(this, command);
  command = command.toUpperCase();
  if (['MOREPAGES', 'MOREPAGE'].contains(command)) {
    this.addMoreStatusMenuPages();
  }
};

Yanfly.MSMP.Window_StatusCommand_setActor =
  Window_StatusCommand.prototype.setActor;
Window_StatusCommand.prototype.setActor = function(actor) {
  var prevActor = this._actor;
  Yanfly.MSMP.Window_StatusCommand_setActor.call(this, actor);
  this.clearCommandList();
  this.makeCommandList();
  this.refresh();
};

Window_StatusCommand.prototype.addMoreStatusMenuPages = function() {
  if (!this._actor) {
    return;
  }
  var order = this._actor.actor().customStatusMenuPages;
  if (!order) return;
  for (var i = 0; i < order.length; i++) {
    var pageKey = order[i];
    if (this.isShowStatusMenuPage(pageKey)) {
      this.addCommand(pageKey, 'morePages', true, pageKey);
    }
  }
};

Window_StatusCommand.prototype.isShowStatusMenuPage = function(pageKey) {
  var data = this._actor.actor().customStatusMenuPageRequirement[pageKey] || [];
  if (data.length <= 0) return true;
  for (var i = 0; i < data.length; i++) {
    var switchId = data[i];
    if (!$gameSwitches.value(switchId)) {
      return false;
    }
  }
  return true;
};

//=============================================================================
// Window_StatusInfo
//=============================================================================

Yanfly.MSMP.Window_StatusInfo_setSymbol =
  Window_StatusInfo.prototype.setSymbol;
Window_StatusInfo.prototype.setSymbol = function(symbol) {
  Yanfly.MSMP.Window_StatusInfo_setSymbol.call(this, symbol);
  if (this._symbol === 'morePages') {
    this.refresh();
  }
};

Yanfly.MSMP.Window_StatusInfo_drawInfoContents =
  Window_StatusInfo.prototype.drawInfoContents;
Window_StatusInfo.prototype.drawInfoContents = function(symbol) {
  if (symbol === 'morePages') {
    this.drawAllItems();
  } else {
    Yanfly.MSMP.Window_StatusInfo_drawInfoContents.call(this, symbol);
  }
};

Yanfly.MSMP.Window_StatusInfo_maxItems = Window_StatusInfo.prototype.maxItems;
Window_StatusInfo.prototype.maxItems = function() {
  if (this._symbol === 'morePages') {
    var pageKey = SceneManager._scene._commandWindow.currentExt();
    if (this._actor.actor().customStatusMenuPagesData) {
      if (this._actor.actor().customStatusMenuPagesData[pageKey]) {
        return this._actor.actor().customStatusMenuPagesData[pageKey].length;
      }
    }
  }
  return Yanfly.MSMP.Window_StatusInfo_maxItems.call(this);
};

Yanfly.MSMP.Window_StatusInfo_drawItem = Window_StatusInfo.prototype.drawItem;
Window_StatusInfo.prototype.drawItem = function(index) {
  Yanfly.MSMP.Window_StatusInfo_drawItem.call(this);
  if (this._symbol === 'morePages') {
    this.drawMoreStatusPageContent(index);
  }
};

Window_StatusInfo.prototype.drawMoreStatusPageContent = function(index) {
  var pageKey = SceneManager._scene._commandWindow.currentExt();
  if (!this._actor.actor().customStatusMenuPagesData) return;
  if (!this._actor.actor().customStatusMenuPagesData[pageKey]) return;
  var data = this._actor.actor().customStatusMenuPagesData[pageKey];
  var text = data[index];
  var rect = this.itemRectForText(index);
  this.drawTextEx(text, rect.x, rect.y);
};

//=============================================================================
// End of File
//=============================================================================
} else {

var text = '================================================================\n';
text += 'YEP_X_MoreStatusPages requires YEP_StatusMenuCore to be at the ';
text += 'latest version to run properly.\n\nPlease go to www.yanfly.moe and ';
text += 'update to the latest version for the YEP_StatusMenuCore plugin.\n';
text += '================================================================\n';
console.log(text);
require('nw.gui').Window.get().showDevTools();

}; // YEP_StatusMenuCore