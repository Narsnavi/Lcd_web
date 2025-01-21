//=============================================================================
// Yanfly Engine Plugins - Dynamic Title Images
// YEP_DynamicTitleImages.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_DynamicTitleImages = true;

var Yanfly = Yanfly || {};
Yanfly.DTI = Yanfly.DTI || {};
Yanfly.DTI.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc v1.00 动态标题
 * the player has progressed.
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * 正式介绍
 * ============================================================================
 *
 * 标题图片可以给你的游戏一个不错的第一印象.
 * 然而，看久了就会产生审美疲劳
 * 这个插件可以让你
 * 更改标题图片
 * 在游戏的任何一点你想做什么就做什么，这样下一次
 * 当你的玩家返回到标题屏幕时，他们将会得到
 * 一些新的和令人耳目一新的东西!
 *
 * ============================================================================
 * 指令
 * ============================================================================
 *
 * 选择什么标题屏幕图像很简单. 
 * 默认情况下，
 * 显示的图像是在设置中应用的图像.
 * 但是如果您想在玩家到达游戏中的某个点时控制它，
 * 请在事件中输入这些插件命令：
 *
 * 插件命令:
 *
 * ChangeTitle1 filename
 * ChangeTitle2 filename
 * - 将'filename' 替换为在 'titles1'中找到的图像文件名或者
 * 'titles2' 文件夹. 确保文件名与它完全相同
 * 因区分大小写而显示。一旦事件运行了这个插件命令
 * 下次玩家访问标题屏幕时，会出现新的图像.
 *
 * ClearChangeTitle1
 * ClearChangeTitle2
 * - 这将分别将 Title1 或 Title2 图像恢复为默认.
 * 玩家将会看到默认的 Title1/Title2 图像
 * 游戏的数据库设置s.
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
 * @param RequireSaveGame
 * @text Require Save Game?
 * @type boolean
 * @on YES
 * @off NO
 * @desc 需要一个保存游戏来显示自定义标题
 * 图像？如果没有，则使用默认图像.
 * @default false
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_DynamicTitleImages');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.DTIRequireSaveGame = String(Yanfly.Parameters['RequireSaveGame']);
Yanfly.Param.DTIRequireSaveGame = eval(Yanfly.Param.DTIRequireSaveGame);

//=============================================================================
// ConfigManager
//=============================================================================

ConfigManager.title1ImageName = '';
ConfigManager.title2ImageName = '';

Yanfly.DTI.ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function() {
  var config = Yanfly.DTI.ConfigManager_makeData.call(this);
  config.title1ImageName = this.title1ImageName;
  config.title2ImageName = this.title2ImageName;
  return config;
};

Yanfly.DTI.ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function(config) {
  Yanfly.DTI.ConfigManager_applyData.call(this, config);
  this.title1ImageName = config.title1ImageName || '';
  this.title2ImageName = config.title2ImageName || '';
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.DTI.Game_Interpreter_pluginCommand =
  Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.DTI.Game_Interpreter_pluginCommand.call(this, command, args);
  if (command === 'ChangeTitle1') {
    var filename = this.argsToString(args);
    ConfigManager.title1ImageName = filename;
    ConfigManager.save();
  } else if (command === 'ChangeTitle2') {
    var filename = this.argsToString(args);
    ConfigManager.title2ImageName = filename;
    ConfigManager.save();
  } else if (command === 'ClearChangeTitle1') {
    ConfigManager.title1ImageName = '';
    ConfigManager.save();
  } else if (command === 'ClearChangeTitle2') {
    ConfigManager.title2ImageName = '';
    ConfigManager.save();
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
// Scene_Title
//=============================================================================

Yanfly.DTI.Scene_Title_createBackground = Scene_Title.prototype.createBackground;
Scene_Title.prototype.createBackground = function() {
  var originalTitle1 = $dataSystem.title1Name;
  var originalTitle2 = $dataSystem.title2Name;
  this.changeTitleBackgroundImages();
  Yanfly.DTI.Scene_Title_createBackground.call(this);
  $dataSystem.title1Name = originalTitle1;
  $dataSystem.title2Name = originalTitle2;
}

Scene_Title.prototype.changeTitleBackgroundImages = function() {
  if (Yanfly.Param.DTIRequireSaveGame && !DataManager.isAnySavefileExists()) {
    return;
  }
  if (ConfigManager.title1ImageName) {
    $dataSystem.title1Name = ConfigManager.title1ImageName;
  }
  if (ConfigManager.title2ImageName) {
    $dataSystem.title2Name = ConfigManager.title2ImageName;
  }
};

//=============================================================================
// End of File
//=============================================================================