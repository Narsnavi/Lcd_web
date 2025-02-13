//=============================================================================
// Yanfly Engine Plugins - Item Core Extension - Item Menu Categories
// YEP_X_ItemCategories.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_ItemCategories = true;

var Yanfly = Yanfly || {};
Yanfly.ItemCat = Yanfly.ItemCat || {};
Yanfly.ItemCat.version = 1.01;

//=============================================================================
 /*:
 * @plugindesc v1.01 物品菜单分类(需要 YEP_ItemCore.js)
 * categories under the item menu.
 * @author Yanfly Engine Plugins + Sylvester Collaboration
 *
 * @param ---General---
 * @default
 *
 * @param Category Order
 * @parent ---General---
 * @desc 这是物品菜单中显示的所有类别的顺序。
 * 查看插件的帮助文件以获取更多信息。
 * @default Items, Weapons, Armors, KeyItems
 *
 * @param ---Naming---
 * @default
 *
 * @param Hidden Item A
 * @parent ---Naming---
 * @desc 该类别在物品菜单中的命名方式
 * @default Special Items
 *
 * @param Hidden Item B
 * @parent ---Naming---
 * @desc 该类别在物品菜单中的命名方式
 * @default Unique Items
 *
 * @param Consumable
 * @parent ---Naming---
 * @desc 该类别在物品菜单中的命名方式
 * @default Consumable
 *
 * @param Nonconsumable
 * @parent ---Naming---
 * @desc 该类别在物品菜单中的命名方式
 * @default Nonconsumable
 *
 * @param Always Usable
 * @parent ---Naming---
 * @desc 该类别在物品菜单中的命名方式
 * @default Usable
 *
 * @param Battle Usable
 * @parent ---Naming---
 * @desc 该类别在物品菜单中的命名方式
 * @default Battle
 *
 * @param Field Usable
 * @parent ---Naming---
 * @desc 该类别在物品菜单中的命名方式
 * @default Field
 *
 * @param Never Usable
 * @parent ---Naming---
 * @desc 该类别在物品菜单中的命名方式
 * @default Misc
 *
 * @help
 * ============================================================================
 * 正式介绍
 * ============================================================================
 *
 * 这个插件需要YEP_ItemCore。确保该插件位于插件列
 * 表中的YEP _ ItemCore下。
 *
 * 在RPG制造商MV中，在物品菜单中只存在四个类别:
 * 物品、武器、盔甲和关键物品。
 * 没有插件，添加额外的类别是不可能的。
 * 这个插件，通过物品核心的帮助，将允许你添加更多的类别，
 * 除了许多基于武器类型，盔甲类型，装备类型，
 * 物品使用等自动添加的预制类别！
 *
 * This is a collaboration plugin by Sylvester and Yanfly to ensure
 * compatibility with the Yanfly Engine Plugins library.
 *
 * ============================================================================
 * 指令
 * ============================================================================
 *
 * 要更改出现在物品菜单中的物品类别，请转到插件参数
 * 并更改列表。用逗号(，)分隔每个类别。每个类别必须
 * 使用以下格式正确拼写:
 *
 * -----------------------   --------------------------------------------------
 * Plugin Parameter Syntax   Description
 * -----------------------   --------------------------------------------------
 * Items                     Lists only Regular Item types
 * AllItems                  All items in the items database with Key Items
 *
 * RegularItems              Lists only Regular Item types
 * KeyItems                  Lists only Key Item types
 * HiddenItemA               Lists only Hidden Item A types
 * HiddenItemB               Lists only Hidden Item B types
 * Consumable                Lists only consumable items
 * Nonconsumable             Lists only nonconsumeable items
 * AlwaysUsable              Lists only always usable items
 * BattleUsable              Lists only battle usable items
 * FieldUsable               Lists only field usable items
 * NeverUsable               Lists only never usable items
 *
 * Weapons                   Lists all weapons
 * WType:x                   Lists weapons of type x (replace x with ID)
 *
 * Armors                    Lists all armors
 * AType:x                   Lists armors of armor type x (replace x with ID)
 *
 * EType:x                   Lists items of equip type x (replace x with ID)
 *
 * Category:x                Lists items of category x (replace x with text)
 *
 * An example of a list that would display something like:
 *   Items
 *   Key Items
 *   Dagger
 *   Sword
 *   Bodygear
 *   Accessory
 *   Herbs
 * 
 * Would look like this for the plugin parameters:
 *
 *   Items, KeyItems, WType:1, WType2, AType1, AType2, Category:Herbs
 *
 * The categories go in the order they're listed so plan them out accordingly.
 *
 * ============================================================================
 * 注释标记
 * ============================================================================
 *
 * 要向物品添加自定义类别，请使用以下注释标记:
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 * 物品、武器和盔甲标签:
 *
 *   <Menu Category: x>
 *   <Menu Category: x, x, x>
 *   - 将“x”替换为您希望为物品指定的类别名称。
 *   插入此标签的倍数以插入更多类别。
 *   这些类别将与Category:x插件参数语法关键字结合使用。
 *
 *   例如:
 *
 *     <Menu Category: Herbs>
 *
 *   插件参数中需要以下语法关键字:
 *
 *     Category:Herbs
 *
 *   如果您将注释标记的版本用于多个类别，
 *   它的工作原理如下:
 *
 *     <Menu Category: Herbs, Potions, Elixirs>
 *
 *   插件参数:
 *
 *     Category:Herbs, Category:Potions, Category:Elixirs
 *
 *   **注意**注意标签不适用于任何预制类别。
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.01:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

if (Imported.YEP_ItemCore) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_ItemCategories');
Yanfly.Param = Yanfly.Param || {};

Yanfly.SetupParameters = function() {
  Yanfly.Param.ItemCatOrder = String(Yanfly.Parameters['Category Order']);
  Yanfly.Param.ItemCatOrder = Yanfly.Param.ItemCatOrder.split(',');
  //---
  var length = Yanfly.Param.ItemCatOrder.length;
  for (var i = 0; i < 0; i++) {
    Yanfly.Param.ItemCatOrder[i] = Yanfly.Param.ItemCatOrder[i].trim();
  }
  Yanfly.Param.ItemCatNames = {
    HiddenItemA: String(Yanfly.Parameters['Hidden Item A']),
    HiddenItemB: String(Yanfly.Parameters['Hidden Item B']),
    Consumable: String(Yanfly.Parameters['Consumable']),
    Nonconsumable: String(Yanfly.Parameters['Nonconsumable']),
    AlwaysUsable: String(Yanfly.Parameters['Always Usable']),
    BattleUsable: String(Yanfly.Parameters['Battle Usable']),
    FieldUsable: String(Yanfly.Parameters['Field Usable']),
    NeverUsable: String(Yanfly.Parameters['Never Usable'])
  }
};
Yanfly.SetupParameters();

//=============================================================================
// DataManager
// ----------------------------------------------------------------------------
// Notetags added by Yanfly
//=============================================================================

Yanfly.ItemCat.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.ItemCat.DataManager_isDatabaseLoaded.call(this)) return false;

  if (!Yanfly._loaded_YEP_X_ItemCategories) {
    this.processItemCategoriesNotetags1($dataItems);
    this.processItemCategoriesNotetags1($dataWeapons);
    this.processItemCategoriesNotetags1($dataArmors);
    Yanfly._loaded_YEP_X_ItemCategories = true;
  }
  
  return true;
};

DataManager.processItemCategoriesNotetags1 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.itemCategory = [];

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<MENU[ ](?:CATEGORY|CATEGORIES):[ ](.*)>/i)) {
        var str = String(RegExp.$1).split(',');
        var length = str.length;
        for (var s = 0; s < length; s++) {
          obj.itemCategory.push(str[s].trim());
        }
      }
    }
  }
};

//=============================================================================
// Window_ItemCategory
//=============================================================================

Yanfly.ItemCat.Window_ItemCategory_update =
  Window_ItemCategory.prototype.update;
Window_ItemCategory.prototype.update = function() {
  Yanfly.ItemCat.Window_ItemCategory_update.call(this);
  if (this._itemWindow) {
    this._itemWindow.setExt(this.currentExt());
  }
};

Window_ItemCategory.prototype.makeCommandList = function() {
  var data = Yanfly.Param.ItemCatOrder;
  var length = data.length;
  for (var i = 0; i < length; i++) {
    var category = data[i].trim();
    this.addItemCategory(category);
  }
};

Window_ItemCategory.prototype.addItemCategory = function(category) {
  var text = Yanfly.Param.ItemCatNames[category];
  if (category.match(/Category:(.*)/i)) {
    var type = String(RegExp.$1);
    return this.addCommand(type, 'Category', true, type);
  }
  if (category.match(/AllItems/i)) {
    return this.addCommand(TextManager.item, 'AllItems');
  }
  if (category.match(/RegularItems/i)) {
    return this.addCommand(text, 'item');
  }
  if (category.match(/KeyItems/i)) {
    return this.addCommand(TextManager.keyItem, 'keyItem');
  }
  if (category.match(/HiddenItemA/i)) {
    return this.addCommand(text, 'HiddenItemA');
  }
  if (category.match(/HiddenItemB/i)) {
    return this.addCommand(text, 'HiddenItemB');
  }
  if (category.match(/Nonconsumable/i)) {
    return this.addCommand(text, 'Nonconsumable');
  }
  if (category.match(/Consumable/i)) {
    return this.addCommand(text, 'Consumable');
  }
  if (category.match(/AlwaysUsable/i)) {
    return this.addCommand(text, 'AlwaysUsable');
  }
  if (category.match(/BattleUsable/i)) {
    return this.addCommand(text, 'BattleUsable');
  }
  if (category.match(/FieldUsable/i)) {
    return this.addCommand(text, 'FieldUsable');
  }
  if (category.match(/NeverUsable/i)) {
    return this.addCommand(text, 'NeverUsable');
  }
  if (category.match(/Items/i)) {
    return this.addCommand(TextManager.item, 'item');
  }
  if (category.match(/Weapons/i)) {
    return this.addCommand(TextManager.weapon, 'weapon');
  }
  if (category.match(/WType:(\d+)/i)) {
    var id = parseInt(RegExp.$1);
    return this.addCommand($dataSystem.weaponTypes[id], 'WType', true, id);
  }
  if (category.match(/Armors/i)) {
    return this.addCommand(TextManager.armor, 'armor');
  }
  if (category.match(/AType:(\d+)/i)) {
    var id = parseInt(RegExp.$1);
    return this.addCommand($dataSystem.armorTypes[id], 'AType', true, id);
  }
  if (category.match(/EType:(\d+)/i)) {
    var id = parseInt(RegExp.$1);
    return this.addCommand($dataSystem.equipTypes[id], 'EType', true, id);
  }
};

//=============================================================================
// Window_ItemList
//=============================================================================

Yanfly.ItemCat.Window_ItemList_initialize =
  Window_ItemList.prototype.initialize;
Window_ItemList.prototype.initialize = function(x, y, width, height) {
  Yanfly.ItemCat.Window_ItemList_initialize.call(this, x, y, width, height);
  this._ext = 'none';
};

Window_ItemList.prototype.setExt = function(ext) {
  if (this._ext !== ext) {
    this._ext = ext;
    this.refresh();
    this.resetScroll();
  }
};

Window_ItemList.prototype.includes = function(item) {
  switch (this._category) {
  case 'AllItems':
    return DataManager.isItem(item);
    break;
  case 'item':
    return DataManager.isItem(item) && item.itypeId === 1;
    break;
  case 'RegularItems':
    return DataManager.isItem(item) && item.itypeId === 1;
    break;
  case 'keyItem':
    return DataManager.isItem(item) && item.itypeId === 2;
    break;
  case 'HiddenItemA':
    return DataManager.isItem(item) && item.itypeId === 3;
    break;
  case 'HiddenItemB':
    return DataManager.isItem(item) && item.itypeId === 4;
    break;
  case 'Consumable':
    return DataManager.isItem(item) && item.consumable;
    break;
  case 'Nonconsumable':
    return DataManager.isItem(item) && !item.consumable;
    break;
  case 'AlwaysUsable':
    return DataManager.isItem(item) && [0].contains(item.occasion);
    break;
  case 'BattleUsable':
    return DataManager.isItem(item) && [0, 1].contains(item.occasion);
    break;
  case 'FieldUsable':
    return DataManager.isItem(item) && [0, 2].contains(item.occasion);
    break;
  case 'NeverUsable':
    return DataManager.isItem(item) && [3].contains(item.occasion);
    break;
  case 'weapon':
    return DataManager.isWeapon(item);
    break;
  case 'WType':
    return DataManager.isWeapon(item) && item.wtypeId === this._ext;
    break;
  case 'armor':
    return DataManager.isArmor(item);
    break;
  case 'AType':
    return DataManager.isArmor(item) && item.atypeId === this._ext;
    break;
  case 'EType':
    return item && item.etypeId === this._ext;
    break;
  case 'Category':
    return item && item.itemCategory.contains(this._ext);
    break;
  default:
    return false;
  }
};

//=============================================================================
// End of File
//=============================================================================
} else {

var text = '================================================================\n';
text += 'YEP_X_ItemCategories requires YEP_ItemCore and to be at the latest '
text += 'version to run properly. '
text += '\n\nPlease go to www.yanfly.moe and update to the latest version for ';
text += 'the YEP_ItemCore plugin.\n';
text += '================================================================\n';
console.log(text);
require('nw.gui').Window.get().showDevTools();

}