//=============================================================================
// Yanfly Engine Plugins - Options Core
// YEP_OptionsCore.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_OptionsCore = true;

var Yanfly = Yanfly || {};
Yanfly.Options = Yanfly.Options || {};
Yanfly.Options.version = 1.02;

//=============================================================================
 /*:
 * @plugindesc v1.02 选项核心
 * with more customization potential.
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * 警告:该插件将与RPG Maker MV 1.5.0或更高版本一起
 * 使用！这是因为MV 1.5.0+编辑器允许以有序和高效的
 * 方式制作这个插件。在使用这个插件之前，请确保你的
 * RPG Maker MV软件是最新的。
 *
 * 选项菜单可以改变玩家在游戏中的设置。
 * 在选项菜单中，玩家可以根据自己的喜好改变任何设置以适应他们的游戏风格。
 * 默认情况下，RPG Maker MV中包含“Always Dash”和“Command Remember”等设置，
 * 为MV制作的其他插件也可能会将更新的选项添加到列表中。
 * 但是，菜单本身总是有点不便，
 * 无法便捷查看或调整。
 * 这个插件可以设置选项菜单的选项以适应游戏！
 * control over what options can be added to the menu to befit your players!
 *
 * 该插件支持以下插件:
 * - GamepadConfig.js
 * - YEP_AnimateTilesOption.js
 * - YEP_BattleAniSpeedOpt.js
 * - YEP_FpsSynchOption.js
 * - YEP_KeyboardConfig.js
 * - YEP_X_ActSeqPack3.js
 * - YEP_X_BattleSysATB.js
 * - YEP_X_DifficultySlider.js
 *
 * 如果您还没有更新，请务必更新它们。
 *
 * ============================================================================
 * 说明-选项类别插件参数
 * ============================================================================
 *
 * 这个插件在选项菜单中增加了 'Option Categories'.
 * 除了'All' 和 'Exit' 类别之外， 所有类别都可以从它们在菜单中的显
 * 示方式到它们的行为方式进行自定义。
 *
 * 下面是每个参数的行为:
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *   Name:
 *   - 确定类别名称的显示方式。根据需要命名或重命名类
 *   别。您可以使用带有此参数的文本代码，允许您添加图
 *   标(\i[x])或更改类别的文本颜色(\c[x]).
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *   Help Description:
 *   - 每当此类别突出显示时，这是选项菜单顶部的帮助窗口
 *   中显示的文本。用它来描述什么类型的选项将出现在这
 *   个类别中，以及它们将如何影响游戏。您也可以在此参
 *   数中使用文本代码。
 *
 *   Options List:
 *   - 这是当突出显示或选择该类别时，选项菜单右侧显示的选项列表。
 *   您可以根据需要在此列表中添加、编辑、移动或删除选项。
 *   有关选项列表的插件参数如何工作的详细信息，
 *   on how the plugin parameters for the Options List work, look in the next
 *   请参考下面的部分:
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 * ============================================================================
 * 说明-选项列表插件参数
 * ============================================================================
 *
 * 本节解释选项列表的插件参数是如何操作的，
 * 以及它们如何与插件的其余部分进行交互。
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *   Name:
 *   - 确定选项名称的显示方式。根据需要命名或重命名选
 *   项。默认情况下，这不会使用其他插件提供的命令名。
 *   您可以使用带有此参数的文本代码，允许您添加图标
 *   (\i[x])或更改选项的文本颜色(\c[x])。
 *
 *   * 如果您将其命名为 'EVAL: code' 而没有 'quotes', 则该选项
 *   的名称将是代码输出的任何字符串。
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *   Help Description:
 *   - 这是选项菜单顶部的帮助窗口中显示的文本，
 *   只要该选项突出显示。
 *   用它来描述这个选项对游戏的改变。
 *
 *   ---
 *
 *   Symbol:
 *   - 这是选项的标识符。
 *   每个选项都应该有一个唯一的符号，以免在选项设置中引起冲突。
 *   然而，共享符号是非常好的，
 *   只要你选择它们执行相同的功能。
 *
 *   ---
 *
 *   Show/Hide:
 *   - 这是用于确定该选项是否在该类别的选项列表
 *   中可见的代码。
 *
 *     要确保它始终显示，请使用以下代码:
 *     show = true;
 *
 *   ---
 *
 *   Enable:
 *   - 这是用于确定是否将启用此选项的代码。
 *   建议您将所有选项保持为启用状态，
 *   以免锁定玩家的选项。
 *
 *     要确保它始终处于启用状态，请使用以下代码:
 *     enabled = true;
 *
 *   ---
 *
 *   Ext:
 *   - 代表延伸。
 *   这是选项的第二个符号，几乎可以用于任何东西。
 *   它对选项没有直接影响，除非选项的效果与扩展值相关。
 *   大多数选项不需要使用Ext值，
 *   所以最好不要管它。
 *
 *     不要管它，下面的代码:
 *     ext = 0;
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *   如果您不知道任何JS编程，并且没有关于如何设置它的
 *   说明，那么最好不要碰下面的部分。这是因为所有与选
 *   项相关的行为都可以从这里控制，
 *   一个错误可能会使游戏崩溃.
 *
 *   Make Command Code:
 *   - 这是用于将选项命令添加到选项列表中的代码。
 *   使用此选项修改名称、符号(如果已启用)或更改扩展名
 *   值，然后再将其添加到列表中。
 *
 *     默认代码:
 *     this.addCommand(name, symbol, enabled, ext);
 *
 *   ---
 *
 *   Draw Option Code:
 *   - 这就是选项是如何 'drawn' 到选项窗口并被玩家看到的。
 *   这里的一切都控制着选项从命名到文本位置的外观。
 *   为了方便起见，
 *   在默认代码的开头定义的大多数变量都放在那里
 *   （所以说这些功能对于不懂JS的人来说然并卵）.
 *
 *     The default code:
 *     var rect = this.itemRectForText(index);
 *     var statusWidth = this.statusWidth();
 *     var titleWidth = rect.width - statusWidth;
 *     this.resetTextColor();
 *     this.changePaintOpacity(this.isCommandEnabled(index));
 *     this.drawOptionsName(index);
 *     this.drawOptionsOnOff(index);
 *
 *   ---
 *
 *   Process OK Code:
 *   - 这是当玩家在这个选项上按下任何一种确认按钮
 *   (Z, Enter, Left Click) 时运行的代码。对于大多数选项，这将在
 *   ON/OFF 选项之间切换。
 *   对于其他人来说，这将使选项的值向上扩展，直到它返回.
 *
 *     The default code:
 *     var index = this.index();
 *     var symbol = this.commandSymbol(index);
 *     var value = this.getConfigValue(symbol);
 *     this.changeValue(symbol, !value);
 *
 *   ---
 *
 *   Cursor Right Code:
 *   - 这是当玩家按下右按钮时运行的代码。
 *   通常，这将把大多数选项移到开的位置。
 *   对其他人来说，这将会增加选择的价值.
 *
 *     The default code:
 *     var index = this.index();
 *     var symbol = this.commandSymbol(index);
 *     var value = this.getConfigValue(symbol);
 *     this.changeValue(symbol, true);
 *
 *   ---
 *
 *   Cursor Left Code:
 *   - 这是玩家按下左键时运行的代码。
 *   通常，这将把大多数选项移到关闭位置。
 *   对其他人来说，这将降低选择的价值。.
 *
 *     The default code:
 *     var index = this.index();
 *     var symbol = this.commandSymbol(index);
 *     var value = this.getConfigValue(symbol);
 *     this.changeValue(symbol, false);
 *
 *   ---
 *
 *   Default Config Code:
 *   - 创建新选项时，这将决定选项的默认值。
 *   对于大多数选项来说，
 *   这从“关”的位置开始，通常用'false' 表示.
 *
 *     默认代码:
 *     ConfigManager[symbol] = false;
 *
 *   ---
 *
 *   Save Config Code:
 *   - 这决定了如何通过代码保存选项设置。
 *   通常，这与配置管理器的值相同。
 *
 *     默认代码:
 *     config[symbol] = ConfigManager[symbol];
 *
 *   ---
 *
 *   Load Config Code:
 *   - 这决定了配置管理器在加载游戏时如何加载保存的选项设置。
 *   通常，这会采用存储在配置文件中的任何设置，
 *   并将其直接放入配置管理器。
 *   （）.
 *
 *     默认代码:
 *     ConfigManager[symbol] = !!config[symbol];
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.02:
 * - Bypass the isDevToolsOpen() error when bad code is inserted into a script
 * call or custom Lunatic Mode code segment due to updating to MV 1.6.1.
 *
 * Version 1.01:
 * - Updated for Message Speed Options.
 *
 * Version 1.00:
 * - Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @param ---Categories---
 * @default
 *
 * @param OptionsCategories
 * @text Options Categories
 * @parent ---Categories---
 * @type struct<Categories>[]
 * @desc 在“选项”场景中找到的类别。
 * @default ["{\"Name\":\"\\\\i[87]General\",\"---Settings---\":\"\",\"HelpDesc\":\"\\\"General settings that alter the way the game behaves.\\\"\",\"OptionsList\":\"[\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[87]Always Dash\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Player walks when OFF. Player dashes when ON.\\\\\\\\\\\\\\\\nHolding SHIFT switches between walking and dashing.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"alwaysDash\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\\nthis.drawOptionsOnOff(index);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, !value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, true);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, false);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ConfigManager[symbol] = false;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"config[symbol] = ConfigManager[symbol];\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ConfigManager[symbol] = config[symbol];\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[87]Command Remember\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Game remembers the last command selected during battle.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"commandRemember\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\\nthis.drawOptionsOnOff(index);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, !value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, true);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, false);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ConfigManager[symbol] = false;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"config[symbol] = ConfigManager[symbol];\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ConfigManager[symbol] = config[symbol];\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[87]ATB Speed\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Determines how fast the ATB Gauge fills up during battle.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"atbSpeed\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"if (Imported.YEP_X_BattleSysATB) {\\\\\\\\\\\\\\\\n  show = $gameSystem.getBattleSystem() === 'atb';\\\\\\\\\\\\\\\\n} else {\\\\\\\\\\\\\\\\n  show = false;\\\\\\\\\\\\\\\\n}\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvar rate = value / 10;\\\\\\\\\\\\\\\\nvar gaugeColor1 = this.textColor(13);\\\\\\\\\\\\\\\\nvar gaugeColor2 = this.textColor(5);\\\\\\\\\\\\\\\\nthis.drawOptionsGauge(index, rate, gaugeColor1, gaugeColor2);\\\\\\\\\\\\\\\\nthis.drawText(this.statusText(index), titleWidth, rect.y, statusWidth, 'center');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue += 1;\\\\\\\\\\\\\\\\nif (value > 10) value = 1;\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue += 1;\\\\\\\\\\\\\\\\nif (value > 10) value = 1;\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue -= 1;\\\\\\\\\\\\\\\\nif (value < 1) value = 10;\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[87]Enemy Difficulty\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Determines the level strength of enemies.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"difficultySlider\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"if (Imported.YEP_X_DifficultySlider) {\\\\\\\\\\\\\\\\n  show = $gameSystem.showDifficultySlider();\\\\\\\\\\\\\\\\n} else {\\\\\\\\\\\\\\\\n  show = false;\\\\\\\\\\\\\\\\n}\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvar rate = value / Yanfly.Param.DSliderMaxDif;\\\\\\\\\\\\\\\\nvar gaugeColor1 = this.textColor(28);\\\\\\\\\\\\\\\\nvar gaugeColor2 = this.textColor(29);\\\\\\\\\\\\\\\\nthis.drawOptionsGauge(index, rate, gaugeColor1, gaugeColor2);\\\\\\\\\\\\\\\\nthis.drawText(this.statusText(index), titleWidth, rect.y, statusWidth, 'center');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue += Yanfly.Param.DSliderChange;\\\\\\\\\\\\\\\\nif (value > Yanfly.Param.DSliderMaxDif) value = Yanfly.Param.DSliderMinDif;\\\\\\\\\\\\\\\\nvalue = value.clamp(Yanfly.Param.DSliderMinDif, Yanfly.Param.DSliderMaxDif);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue += Yanfly.Param.DSliderChange;\\\\\\\\\\\\\\\\nvalue = value.clamp(Yanfly.Param.DSliderMinDif, Yanfly.Param.DSliderMaxDif);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue -= Yanfly.Param.DSliderChange;\\\\\\\\\\\\\\\\nvalue = value.clamp(Yanfly.Param.DSliderMinDif,\\\\\\\\\\\\\\\\nYanfly.Param.DSliderMaxDif);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[87]Message Speed\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Changes the speed text is displayed during messages.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"messageSpeed\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = Imported.YEP_X_MessageSpeedOpt;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvar rate = ((value) / 10).clamp(0, 1);\\\\\\\\\\\\\\\\nif (value > 10) {\\\\\\\\\\\\\\\\n  var gaugeColor1 = this.textColor(14);\\\\\\\\\\\\\\\\n  var gaugeColor2 = this.textColor(6);\\\\\\\\\\\\\\\\n} else {\\\\\\\\\\\\\\\\n  var gaugeColor1 = this.textColor(20);\\\\\\\\\\\\\\\\n  var gaugeColor2 = this.textColor(21);\\\\\\\\\\\\\\\\n}\\\\\\\\\\\\\\\\nthis.drawOptionsGauge(index, rate, gaugeColor1, gaugeColor2);\\\\\\\\\\\\\\\\nthis.drawText(this.statusText(index), titleWidth, rect.y, statusWidth, 'center');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue += 1;\\\\\\\\\\\\\\\\nif (value > 11) value = 0;\\\\\\\\\\\\\\\\nvalue = value.clamp(0, 11);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue += 1;\\\\\\\\\\\\\\\\nvalue = value.clamp(0, 11);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue -= 1;\\\\\\\\\\\\\\\\nvalue = value.clamp(0, 11);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[87]Quest Window\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Show a window displaying the currently active\\\\\\\\\\\\\\\\nquest on the screen while exploring.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"mapQuestWindow\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = Imported.YEP_X_MapQuestWindow;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\\nthis.drawOptionsOnOff(index);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, !value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, true);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, false);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\" \\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\" \\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"none\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\"}","{\"Name\":\"\\\\i[80]Audio\",\"---Settings---\":\"\",\"HelpDesc\":\"\\\"Adjust the audio settings for the game.\\\"\",\"OptionsList\":\"[\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[80]Master Volume\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Adjusts the overall volume of the game.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"masterVolume\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvar rate = value / 100;\\\\\\\\\\\\\\\\nvar gaugeColor1 = this.textColor(22);\\\\\\\\\\\\\\\\nvar gaugeColor2 = this.textColor(23);\\\\\\\\\\\\\\\\nthis.drawOptionsGauge(index, rate, gaugeColor1, gaugeColor2);\\\\\\\\\\\\\\\\nthis.drawText(this.statusText(index), titleWidth, rect.y, statusWidth, 'center');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue += this.volumeOffset();\\\\\\\\\\\\\\\\nif (value > 100) {\\\\\\\\\\\\\\\\n  value = 0;\\\\\\\\\\\\\\\\n}\\\\\\\\\\\\\\\\nvalue = value.clamp(0, 100);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue += this.volumeOffset();\\\\\\\\\\\\\\\\nvalue = value.clamp(0, 100);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue -= this.volumeOffset();\\\\\\\\\\\\\\\\nvalue = value.clamp(0, 100);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ConfigManager[symbol] = 100;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"config[symbol] = ConfigManager[symbol];\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var value = config[symbol];\\\\\\\\\\\\\\\\nif (value !== undefined) {\\\\\\\\\\\\\\\\n  ConfigManager[symbol] = Number(value).clamp(0, 100);\\\\\\\\\\\\\\\\n} else {\\\\\\\\\\\\\\\\n  ConfigManager[symbol] = 100;\\\\\\\\\\\\\\\\n}\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[80]BGM Volume\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Adjusts the volume of the background music.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"bgmVolume\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvar rate = value / 100;\\\\\\\\\\\\\\\\nvar gaugeColor1 = this.textColor(30);\\\\\\\\\\\\\\\\nvar gaugeColor2 = this.textColor(31);\\\\\\\\\\\\\\\\nthis.drawOptionsGauge(index, rate, gaugeColor1, gaugeColor2);\\\\\\\\\\\\\\\\nthis.drawText(this.statusText(index), titleWidth, rect.y, statusWidth, 'center');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue += this.volumeOffset();\\\\\\\\\\\\\\\\nif (value > 100) {\\\\\\\\\\\\\\\\n  value = 0;\\\\\\\\\\\\\\\\n}\\\\\\\\\\\\\\\\nvalue = value.clamp(0, 100);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue += this.volumeOffset();\\\\\\\\\\\\\\\\nvalue = value.clamp(0, 100);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue -= this.volumeOffset();\\\\\\\\\\\\\\\\nvalue = value.clamp(0, 100);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ConfigManager[symbol] = 100;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"config[symbol] = ConfigManager[symbol];\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var value = config[symbol];\\\\\\\\\\\\\\\\nif (value !== undefined) {\\\\\\\\\\\\\\\\n  ConfigManager[symbol] = Number(value).clamp(0, 100);\\\\\\\\\\\\\\\\n} else {\\\\\\\\\\\\\\\\n  ConfigManager[symbol] = 100;\\\\\\\\\\\\\\\\n}\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[80]BGS Volume\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Adjusts the volume of the background sound effects.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"bgsVolume\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvar rate = value / 100;\\\\\\\\\\\\\\\\nvar gaugeColor1 = this.textColor(30);\\\\\\\\\\\\\\\\nvar gaugeColor2 = this.textColor(31);\\\\\\\\\\\\\\\\nthis.drawOptionsGauge(index, rate, gaugeColor1, gaugeColor2);\\\\\\\\\\\\\\\\nthis.drawText(this.statusText(index), titleWidth, rect.y, statusWidth, 'center');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue += this.volumeOffset();\\\\\\\\\\\\\\\\nif (value > 100) {\\\\\\\\\\\\\\\\n  value = 0;\\\\\\\\\\\\\\\\n}\\\\\\\\\\\\\\\\nvalue = value.clamp(0, 100);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue += this.volumeOffset();\\\\\\\\\\\\\\\\nvalue = value.clamp(0, 100);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue -= this.volumeOffset();\\\\\\\\\\\\\\\\nvalue = value.clamp(0, 100);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ConfigManager[symbol] = 100;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"config[symbol] = ConfigManager[symbol];\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var value = config[symbol];\\\\\\\\\\\\\\\\nif (value !== undefined) {\\\\\\\\\\\\\\\\n  ConfigManager[symbol] = Number(value).clamp(0, 100);\\\\\\\\\\\\\\\\n} else {\\\\\\\\\\\\\\\\n  ConfigManager[symbol] = 100;\\\\\\\\\\\\\\\\n}\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[80]ME Volume\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Adjusts the volume of the melody effects\\\\\\\\\\\\\\\\nsuch as fanfares.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"meVolume\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvar rate = value / 100;\\\\\\\\\\\\\\\\nvar gaugeColor1 = this.textColor(30);\\\\\\\\\\\\\\\\nvar gaugeColor2 = this.textColor(31);\\\\\\\\\\\\\\\\nthis.drawOptionsGauge(index, rate, gaugeColor1, gaugeColor2);\\\\\\\\\\\\\\\\nthis.drawText(this.statusText(index), titleWidth, rect.y, statusWidth, 'center');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue += this.volumeOffset();\\\\\\\\\\\\\\\\nif (value > 100) {\\\\\\\\\\\\\\\\n  value = 0;\\\\\\\\\\\\\\\\n}\\\\\\\\\\\\\\\\nvalue = value.clamp(0, 100);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue += this.volumeOffset();\\\\\\\\\\\\\\\\nvalue = value.clamp(0, 100);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue -= this.volumeOffset();\\\\\\\\\\\\\\\\nvalue = value.clamp(0, 100);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ConfigManager[symbol] = 100;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"config[symbol] = ConfigManager[symbol];\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var value = config[symbol];\\\\\\\\\\\\\\\\nif (value !== undefined) {\\\\\\\\\\\\\\\\n  ConfigManager[symbol] = Number(value).clamp(0, 100);\\\\\\\\\\\\\\\\n} else {\\\\\\\\\\\\\\\\n  ConfigManager[symbol] = 100;\\\\\\\\\\\\\\\\n}\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[80]SE Volume\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Adjusts the volume of the sound effects.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"seVolume\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvar rate = value / 100;\\\\\\\\\\\\\\\\nvar gaugeColor1 = this.textColor(30);\\\\\\\\\\\\\\\\nvar gaugeColor2 = this.textColor(31);\\\\\\\\\\\\\\\\nthis.drawOptionsGauge(index, rate, gaugeColor1, gaugeColor2);\\\\\\\\\\\\\\\\nthis.drawText(this.statusText(index), titleWidth, rect.y, statusWidth, 'center');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue += this.volumeOffset();\\\\\\\\\\\\\\\\nif (value > 100) {\\\\\\\\\\\\\\\\n  value = 0;\\\\\\\\\\\\\\\\n}\\\\\\\\\\\\\\\\nvalue = value.clamp(0, 100);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue += this.volumeOffset();\\\\\\\\\\\\\\\\nvalue = value.clamp(0, 100);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue -= this.volumeOffset();\\\\\\\\\\\\\\\\nvalue = value.clamp(0, 100);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ConfigManager[symbol] = 100;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"config[symbol] = ConfigManager[symbol];\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var value = config[symbol];\\\\\\\\\\\\\\\\nif (value !== undefined) {\\\\\\\\\\\\\\\\n  ConfigManager[symbol] = Number(value).clamp(0, 100);\\\\\\\\\\\\\\\\n} else {\\\\\\\\\\\\\\\\n  ConfigManager[symbol] = 100;\\\\\\\\\\\\\\\\n}\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\" \\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\" \\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"none\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\"}","{\"Name\":\"\\\\i[302]Visual\",\"---Settings---\":\"\",\"HelpDesc\":\"\\\"Settings that adjust the visual properties of the game.\\\"\",\"OptionsList\":\"[\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[309]Window Tone: Red\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Changes the window tone's \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[2]red\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] value.\\\\\\\\\\\\\\\\nHold SHIFT while pressing LEFT/RIGHT to adjust more.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"windowToneRed\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\\nvar value = $gameSystem.windowTone()[0];\\\\\\\\\\\\\\\\nvar rate = (value + 255) / 510;\\\\\\\\\\\\\\\\nvar gaugeColor1 = this.textColor(2);\\\\\\\\\\\\\\\\nvar gaugeColor2 = this.textColor(10);\\\\\\\\\\\\\\\\nthis.drawOptionsGauge(index, rate, gaugeColor1, gaugeColor2);\\\\\\\\\\\\\\\\nthis.drawText(value, titleWidth, rect.y, statusWidth, 'center');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = $dataSystem.windowTone[0];\\\\\\\\\\\\\\\\nthis.changeWindowTone(symbol, value, 'red');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = $gameSystem.windowTone()[0];\\\\\\\\\\\\\\\\nvar offset = this.windowToneOffset();\\\\\\\\\\\\\\\\nif (Input.isPressed('shift')) offset *= 10;\\\\\\\\\\\\\\\\nvalue += offset;\\\\\\\\\\\\\\\\nthis.changeWindowTone(symbol, value, 'red');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = $gameSystem.windowTone()[0];\\\\\\\\\\\\\\\\nvar offset = this.windowToneOffset();\\\\\\\\\\\\\\\\nif (Input.isPressed('shift')) offset *= 10;\\\\\\\\\\\\\\\\nvalue -= offset;\\\\\\\\\\\\\\\\nthis.changeWindowTone(symbol, value, 'red');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ConfigManager[symbol] = false;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"config[symbol] = ConfigManager[symbol];\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ConfigManager[symbol] = !!config[symbol];\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[311]Window Tone: Green\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Changes the window tone's \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[3]green\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] value.\\\\\\\\\\\\\\\\nHold SHIFT while pressing LEFT/RIGHT to adjust more.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"windowToneGreen\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\\nvar value = $gameSystem.windowTone()[1];\\\\\\\\\\\\\\\\nvar rate = (value + 255) / 510;\\\\\\\\\\\\\\\\nvar gaugeColor1 = this.textColor(3);\\\\\\\\\\\\\\\\nvar gaugeColor2 = this.textColor(11);\\\\\\\\\\\\\\\\nthis.drawOptionsGauge(index, rate, gaugeColor1, gaugeColor2);\\\\\\\\\\\\\\\\nthis.drawText(value, titleWidth, rect.y, statusWidth, 'center');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = $dataSystem.windowTone[1];\\\\\\\\\\\\\\\\nthis.changeWindowTone(symbol, value, 'green');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = $gameSystem.windowTone()[1];\\\\\\\\\\\\\\\\nvar offset = this.windowToneOffset();\\\\\\\\\\\\\\\\nif (Input.isPressed('shift')) offset *= 10;\\\\\\\\\\\\\\\\nvalue += offset;\\\\\\\\\\\\\\\\nthis.changeWindowTone(symbol, value, 'green');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = $gameSystem.windowTone()[1];\\\\\\\\\\\\\\\\nvar offset = this.windowToneOffset();\\\\\\\\\\\\\\\\nif (Input.isPressed('shift')) offset *= 10;\\\\\\\\\\\\\\\\nvalue -= offset;\\\\\\\\\\\\\\\\nthis.changeWindowTone(symbol, value, 'green');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ConfigManager[symbol] = false;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"config[symbol] = ConfigManager[symbol];\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ConfigManager[symbol] = !!config[symbol];\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[312]Window Tone: Blue\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Changes the window tone's \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[1]blue\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] value.\\\\\\\\\\\\\\\\nHold SHIFT while pressing LEFT/RIGHT to adjust more.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"windowToneBlue\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\\nvar value = $gameSystem.windowTone()[2];\\\\\\\\\\\\\\\\nvar rate = (value + 255) / 510;\\\\\\\\\\\\\\\\nvar gaugeColor1 = this.textColor(1);\\\\\\\\\\\\\\\\nvar gaugeColor2 = this.textColor(9);\\\\\\\\\\\\\\\\nthis.drawOptionsGauge(index, rate, gaugeColor1, gaugeColor2);\\\\\\\\\\\\\\\\nthis.drawText(value, titleWidth, rect.y, statusWidth, 'center');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = $dataSystem.windowTone[2];\\\\\\\\\\\\\\\\nthis.changeWindowTone(symbol, value, 'blue');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = $gameSystem.windowTone()[2];\\\\\\\\\\\\\\\\nvar offset = this.windowToneOffset();\\\\\\\\\\\\\\\\nif (Input.isPressed('shift')) offset *= 10;\\\\\\\\\\\\\\\\nvalue += offset;\\\\\\\\\\\\\\\\nthis.changeWindowTone(symbol, value, 'blue');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = $gameSystem.windowTone()[2];\\\\\\\\\\\\\\\\nvar offset = this.windowToneOffset();\\\\\\\\\\\\\\\\nif (Input.isPressed('shift')) offset *= 10;\\\\\\\\\\\\\\\\nvalue -= offset;\\\\\\\\\\\\\\\\nthis.changeWindowTone(symbol, value, 'blue');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ConfigManager[symbol] = false;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"config[symbol] = ConfigManager[symbol];\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ConfigManager[symbol] = !!config[symbol];\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\" \\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\" \\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"none\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"if (Imported.YEP_StaticTilesOption) {\\\\\\\\\\\\\\\\n  show = true;\\\\\\\\\\\\\\\\n} else if (Imported.YEP_BattleAniSpeedOpt) {\\\\\\\\\\\\\\\\n  show = true;\\\\\\\\\\\\\\\\n} else if (Imported.YEP_X_ActSeqPack3) {\\\\\\\\\\\\\\\\n  show = true;\\\\\\\\\\\\\\\\n} else if (Imported.YEP_SynchFpsOption) {\\\\\\\\\\\\\\\\n  show = true;\\\\\\\\\\\\\\\\n} else {\\\\\\\\\\\\\\\\n  show = false;\\\\\\\\\\\\\\\\n}\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[302]Animated Tiles\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Turns animated tiles ON or OFF.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"animateTiles\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = Imported.YEP_StaticTilesOption;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\\nthis.drawOptionsOnOff(index);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, !value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, true);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, false);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[302]Battle Animation Speed\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Changes the speed of battle animations.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"battleAniSpeed\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = Imported.YEP_BattleAniSpeedOpt;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar quarterWidth = statusWidth / 4;\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nthis.changePaintOpacity(value === 4);\\\\\\\\\\\\\\\\nvar text = this.battleAnimationSpeedText(4);\\\\\\\\\\\\\\\\nthis.drawText(text, titleWidth + quarterWidth * 0, rect.y, quarterWidth, 'center');\\\\\\\\\\\\\\\\nthis.changePaintOpacity(value === 3);\\\\\\\\\\\\\\\\nvar text = this.battleAnimationSpeedText(3);\\\\\\\\\\\\\\\\nthis.drawText(text, titleWidth + quarterWidth * 1, rect.y, quarterWidth, 'center');\\\\\\\\\\\\\\\\nthis.changePaintOpacity(value === 2);\\\\\\\\\\\\\\\\nvar text = this.battleAnimationSpeedText(2);\\\\\\\\\\\\\\\\nthis.drawText(text, titleWidth + quarterWidth * 2, rect.y, quarterWidth, 'center');\\\\\\\\\\\\\\\\nthis.changePaintOpacity(value === 1);\\\\\\\\\\\\\\\\nvar text = this.battleAnimationSpeedText(1);\\\\\\\\\\\\\\\\nthis.drawText(text, titleWidth + quarterWidth * 3, rect.y, quarterWidth, 'center');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue -= 1;\\\\\\\\\\\\\\\\nif (value <= 0) value = 4;\\\\\\\\\\\\\\\\nvalue = value.clamp(1, 4);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue -= 1;\\\\\\\\\\\\\\\\nvalue = value.clamp(1, 4);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue += 1;\\\\\\\\\\\\\\\\nvalue = value.clamp(1, 4);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[302]Battle Camera\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"If ON, the camera in battle will move around.\\\\\\\\\\\\\\\\nIf OFF, the camera in battle will be locked in place.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"battleCamera\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = Imported.YEP_X_ActSeqPack3;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\\nthis.drawOptionsOnOff(index);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, !value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, true);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, false);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[302]Synch Monitor FPS\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Turn this ON if your monitor runs above 60 FPS\\\\\\\\\\\\\\\\nto synchronize the game to run at 60 FPS.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"synchFps\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = Imported.YEP_SynchFpsOption;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\\nthis.drawOptionsOnOff(index);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, !value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, true);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, false);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\" \\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\" \\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"none\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\"}","{\"Name\":\"\\\\i[83]Controls\",\"---Settings---\":\"\",\"HelpDesc\":\"\\\"Change the way you can control the game.\\\"\",\"OptionsList\":\"[\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[83]Gamepad Config\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Configure the game's gamepad settings.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"gamepadConfig\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"if (Imported.GamepadConfig && Input.isControllerConnected()) {\\\\\\\\\\\\\\\\n  show = !Utils.isMobileDevice();\\\\\\\\\\\\\\\\n} else {\\\\\\\\\\\\\\\\n  show = false;\\\\\\\\\\\\\\\\n}\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.playOkSound();\\\\\\\\\\\\\\\\nSceneManager.push(Scene_GamepadConfig);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[83]Keyboard Config\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Configure the game's keyboard settings.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"keyConfig\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"if (Imported.YEP_KeyboardConfig) {\\\\\\\\\\\\\\\\n  show = !Utils.isMobileDevice();\\\\\\\\\\\\\\\\n} else {\\\\\\\\\\\\\\\\n  show = false;\\\\\\\\\\\\\\\\n}\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.playOkSound();\\\\\\\\\\\\\\\\nSceneManager.push(Scene_KeyConfig);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\" \\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\" \\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"none\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\"}"]
 *
 * @param ---Options Menu---
 * @default
 *
 * @param AllCommand
 * @text All Command
 * @parent ---Options Menu---
 * @desc 用于 'All' 命令的字符串.
 * 如果您不想使用此命令，请将此选项留空。
 * @default \i[160]All
 *
 * @param AllHelpDesc
 * @text All Help Description
 * @parent AllCommand
 * @type note
 * @desc 选择 'All' 时的帮助描述。
 * 您可以为此参数使用文本代码。
 * @default "A list of all of the game's settings."
 *
 * @param ExitCommand
 * @text Exit Command
 * @parent ---Options Menu---
 * @desc 用于 'Exit' 命令的字符串。
 * 如果您不想使用此命令，请将此选项留空。
 * @default \i[16]Exit
 *
 * @param ExitHelpDesc
 * @text Exit Help Description
 * @parent ExitCommand
 * @type note
 * @desc 选择 'Exit' 时的帮助描述。
 * 您可以为此参数使用文本代码。
 * @default "Exit the Options Menu."
 *
 * @param ---Options Settings---
 * @default
 *
 * @param CategoryWidth
 * @text Category Window Width
 * @parent ---Options Settings---
 * @type number
 * @min 1
 * @desc 选项菜单屏幕左侧的类别窗口的宽度。
 * Options Menu screen.
 * @default 240
 *
 * @param StatusWidth
 * @text Status Width
 * @parent ---Options Settings---
 * @type number
 * @min 1
 * @desc 用于选项状态宽度的空间量。
 * @default 400
 *
 * @param VolumeOffset
 * @text Volume Offset
 * @parent ---Options Settings---
 * @type number
 * @min 1
 * @max 100
 * @desc 调整音量时的变化量。.
 * 默认: 20
 * @default 10
 *
 * @param WindowToneOffset
 * @text Window Tone Offset
 * @parent ---Options Settings---
 * @type number
 * @min 1
 * @max 255
 * @desc 调整窗口色调时的变化量。
 * @default 5
 *
 */
/* ----------------------------------------------------------------------------
 * Categories Parameter Structure
 * ----------------------------------------------------------------------------
 */
/*~struct~Categories:
 * @param Name
 * @desc 类别窗口中显示的该类别的名称。
 * 您可以为此参数使用文本代码.
 * @default Category Name
 *
 * @param ---Settings---
 *
 * @param HelpDesc
 * @text Help Description
 * @parent ---Settings---
 * @type note
 * @desc 选择此类别时的帮助描述。
 * 您可以为此参数使用文本代码。
 * @default "<insert category description>\n<category description line 2>"
 *
 * @param OptionsList
 * @text Options List
 * @parent ---Settings---
 * @type struct<Options>[]
 * @desc 用于此类别的选项。
 * @default ["{\"Name\":\"Option 1\",\"---Settings---\":\"\",\"HelpDesc\":\"\\\"<insert option description>\\\\n<option description line 2>\\\"\",\"Symbol\":\"Option1\",\"ShowHide\":\"\\\"show = true;\\\"\",\"Enable\":\"\\\"enabled = true;\\\"\",\"Ext\":\"\\\"ext = 0;\\\"\",\"---Functions---\":\"\",\"MakeCommandCode\":\"\\\"this.addCommand(name, symbol, enabled, ext);\\\"\",\"DrawItemCode\":\"\\\"var rect = this.itemRectForText(index);\\\\nvar statusWidth = this.statusWidth();\\\\nvar titleWidth = rect.width - statusWidth;\\\\nthis.resetTextColor();\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\nthis.drawOptionsName(index);\\\\nthis.drawOptionsOnOff(index);\\\"\",\"ProcessOkCode\":\"\\\"var index = this.index();\\\\nvar symbol = this.commandSymbol(index);\\\\nvar value = this.getConfigValue(symbol);\\\\nthis.changeValue(symbol, !value);\\\"\",\"CursorRightCode\":\"\\\"var index = this.index();\\\\nvar symbol = this.commandSymbol(index);\\\\nvar value = this.getConfigValue(symbol);\\\\nthis.changeValue(symbol, true);\\\"\",\"CursorLeftCode\":\"\\\"var index = this.index();\\\\nvar symbol = this.commandSymbol(index);\\\\nvar value = this.getConfigValue(symbol);\\\\nthis.changeValue(symbol, false);\\\"\",\"DefaultConfigCode\":\"\\\"ConfigManager[symbol] = false;\\\"\",\"SaveConfigCode\":\"\\\"config[symbol] = ConfigManager[symbol];\\\"\",\"LoadConfigCode\":\"\\\"ConfigManager[symbol] = !!config[symbol];\\\"\"}","{\"Name\":\"Option 2\",\"---Settings---\":\"\",\"HelpDesc\":\"\\\"<insert option description>\\\\n<option description line 2>\\\"\",\"Symbol\":\"Option2\",\"ShowHide\":\"\\\"show = true;\\\"\",\"Enable\":\"\\\"enabled = true;\\\"\",\"Ext\":\"\\\"ext = 0;\\\"\",\"---Functions---\":\"\",\"MakeCommandCode\":\"\\\"this.addCommand(name, symbol, enabled, ext);\\\"\",\"DrawItemCode\":\"\\\"var rect = this.itemRectForText(index);\\\\nvar statusWidth = this.statusWidth();\\\\nvar titleWidth = rect.width - statusWidth;\\\\nthis.resetTextColor();\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\nthis.drawOptionsName(index);\\\\nthis.drawOptionsOnOff(index);\\\"\",\"ProcessOkCode\":\"\\\"var index = this.index();\\\\nvar symbol = this.commandSymbol(index);\\\\nvar value = this.getConfigValue(symbol);\\\\nthis.changeValue(symbol, !value);\\\"\",\"CursorRightCode\":\"\\\"var index = this.index();\\\\nvar symbol = this.commandSymbol(index);\\\\nvar value = this.getConfigValue(symbol);\\\\nthis.changeValue(symbol, true);\\\"\",\"CursorLeftCode\":\"\\\"var index = this.index();\\\\nvar symbol = this.commandSymbol(index);\\\\nvar value = this.getConfigValue(symbol);\\\\nthis.changeValue(symbol, false);\\\"\",\"DefaultConfigCode\":\"\\\"ConfigManager[symbol] = false;\\\"\",\"SaveConfigCode\":\"\\\"config[symbol] = ConfigManager[symbol];\\\"\",\"LoadConfigCode\":\"\\\"ConfigManager[symbol] = !!config[symbol];\\\"\"}","{\"Name\":\"Option 3\",\"---Settings---\":\"\",\"HelpDesc\":\"\\\"<insert option description>\\\\n<option description line 2>\\\"\",\"Symbol\":\"Option3\",\"ShowHide\":\"\\\"show = true;\\\"\",\"Enable\":\"\\\"enabled = true;\\\"\",\"Ext\":\"\\\"ext = 0;\\\"\",\"---Functions---\":\"\",\"MakeCommandCode\":\"\\\"this.addCommand(name, symbol, enabled, ext);\\\"\",\"DrawItemCode\":\"\\\"var rect = this.itemRectForText(index);\\\\nvar statusWidth = this.statusWidth();\\\\nvar titleWidth = rect.width - statusWidth;\\\\nthis.resetTextColor();\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\nthis.drawOptionsName(index);\\\\nthis.drawOptionsOnOff(index);\\\"\",\"ProcessOkCode\":\"\\\"var index = this.index();\\\\nvar symbol = this.commandSymbol(index);\\\\nvar value = this.getConfigValue(symbol);\\\\nthis.changeValue(symbol, !value);\\\"\",\"CursorRightCode\":\"\\\"var index = this.index();\\\\nvar symbol = this.commandSymbol(index);\\\\nvar value = this.getConfigValue(symbol);\\\\nthis.changeValue(symbol, true);\\\"\",\"CursorLeftCode\":\"\\\"var index = this.index();\\\\nvar symbol = this.commandSymbol(index);\\\\nvar value = this.getConfigValue(symbol);\\\\nthis.changeValue(symbol, false);\\\"\",\"DefaultConfigCode\":\"\\\"ConfigManager[symbol] = false;\\\"\",\"SaveConfigCode\":\"\\\"config[symbol] = ConfigManager[symbol];\\\"\",\"LoadConfigCode\":\"\\\"ConfigManager[symbol] = !!config[symbol];\\\"\"}"]
 * 
 */
/* ----------------------------------------------------------------------------
 * Options Parameter Structure
 * ----------------------------------------------------------------------------
 */
/*~struct~Options:
 * @param Name
 * @desc 选项窗口中显示的该选项的名称。
 * 您可以为此参数使用文本代码。
 * @default <insert option name>
 *
 * @param ---Settings---
 *
 * @param HelpDesc
 * @text Help Description
 * @type note
 * @parent ---Settings---
 * @desc 选择该选项时的帮助描述。
 * 您可以为此参数使用文本代码。
 * @default "<insert option description>\n<option description line 2>"
 *
 * @param Symbol
 * @parent ---Settings---
 * @desc 选中时用于该选项的符号。
 * 确保这与其他符号不同。
 * @default <insert option symbol>
 * 
 * @param ShowHide
 * @text Show/Hide
 * @parent ---Settings---
 * @type note
 * @desc 用于确定此选项是否可见的代码。
 * @default "show = true;"
 *
 * @param Enable
 * @parent ---Settings---
 * @type note
 * @desc 用于确定是否将启用此选项的代码。
 * @default "enabled = true;"
 *
 * @param Ext
 * @parent ---Settings---
 * @type note
 * @desc 用于确定该选项的外部值的代码。
 * @default "ext = 0;"
 *
 * @param ---Functions---
 *
 * @param MakeCommandCode
 * @text Make Option Code
 * @parent ---Functions---
 * @type note
 * @desc 用于添加选项命令的代码。
 * @default "this.addCommand(name, symbol, enabled, ext);"
 *
 * @param DrawItemCode
 * @text Draw Option Code
 * @parent ---Functions---
 * @type note
 * @desc 用于绘制选项的代码。
 * @default "var rect = this.itemRectForText(index);\nvar statusWidth = this.statusWidth();\nvar titleWidth = rect.width - statusWidth;\nthis.resetTextColor();\nthis.changePaintOpacity(this.isCommandEnabled(index));\nthis.drawOptionsName(index);\nthis.drawOptionsOnOff(index);"
 *
 * @param ProcessOkCode
 * @text Process OK Code
 * @parent ---Functions---
 * @type note
 * @desc 用确认按钮选择时使用的代码。
 * @default "var index = this.index();\nvar symbol = this.commandSymbol(index);\nvar value = this.getConfigValue(symbol);\nthis.changeValue(symbol, !value);"
 *
 * @param CursorRightCode
 * @text Cursor Right Code
 * @parent ---Functions---
 * @type note
 * @desc 按下右按钮时使用的代码。
 * @default "var index = this.index();\nvar symbol = this.commandSymbol(index);\nvar value = this.getConfigValue(symbol);\nthis.changeValue(symbol, true);"
 *
 * @param CursorLeftCode
 * @text Cursor Left Code
 * @parent ---Functions---
 * @type note
 * @desc 按下左按钮时使用的代码。
 * @default "var index = this.index();\nvar symbol = this.commandSymbol(index);\nvar value = this.getConfigValue(symbol);\nthis.changeValue(symbol, false);"
 *
 * @param DefaultConfigCode
 * @text Default Config Code
 * @parent ---Functions---
 * @type note
 * @desc 用于确定该选项默认设置的代码。
 * @default "ConfigManager[symbol] = false;"
 *
 * @param SaveConfigCode
 * @text Save Config Code
 * @parent ---Functions---
 * @type note
 * @desc 保存设置选项配置时使用的代码。
 * @default "config[symbol] = ConfigManager[symbol];"
 *
 * @param LoadConfigCode
 * @text Load Config Code
 * @parent ---Functions---
 * @type note
 * @desc 加载保存的选项配置时使用的代码。
 * @default "ConfigManager[symbol] = !!config[symbol];"
 * 
 */
//=============================================================================

if (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= "1.5.0") {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_OptionsCore');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.OptionsAllCmd = String(Yanfly.Parameters['AllCommand']);
Yanfly.Param.OptionsAllCmdHelp = String(Yanfly.Parameters['AllHelpDesc']);
Yanfly.Param.OptionsExitCmd = String(Yanfly.Parameters['ExitCommand']);
Yanfly.Param.OptionsExitCmdHelp = String(Yanfly.Parameters['ExitHelpDesc']);

Yanfly.Param.OptionsCategoryWidth = Number(Yanfly.Parameters['CategoryWidth']);
Yanfly.Param.OptionsStatusWidth = Number(Yanfly.Parameters['StatusWidth']);
Yanfly.Param.OptionsVolumeOffset = Number(Yanfly.Parameters['VolumeOffset']);
Yanfly.Param.OptionsWinToneOffset =
  Number(Yanfly.Parameters['WindowToneOffset']);

Yanfly.SetupParameters = function() {
  Yanfly.Param.OptionsSymbols = {};
  var data = JSON.parse(Yanfly.Parameters['OptionsCategories']);
  var length = data.length;
  // Options Categories
  for (var i = 0; i < length; ++i) {
    data[i] = JSON.parse(data[i]);
    data[i]['OptionsList'] = JSON.parse(data[i]['OptionsList']);
    var optionsLength = data[i]['OptionsList'].length;
    // Options List
    for (var j = 0; j < optionsLength; ++j) {
      data[i]['OptionsList'][j] = JSON.parse(data[i]['OptionsList'][j]);
      var settings = data[i]['OptionsList'][j];
      var symbol = settings.Symbol;
      var name = symbol;
      eval(JSON.parse(settings.DefaultConfigCode));
      Yanfly.Param.OptionsSymbols[symbol] = {
        SaveConfigCode: settings.SaveConfigCode,
        LoadConfigCode: settings.LoadConfigCode
      }
    }
  }
  Yanfly.Param.OptionsCategories = data;
};
Yanfly.SetupParameters();

//=============================================================================
// ConfigManager
//=============================================================================

ConfigManager.masterVolume = 100;
Object.defineProperty(ConfigManager, 'masterVolume', {
    get: function() {
        return parseInt(AudioManager.masterVolume * 100);
    },
    set: function(value) {
        AudioManager.masterVolume = value / 100;
    },
    configurable: true
});

Yanfly.Options.ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function() {
  var config = Yanfly.Options.ConfigManager_makeData.call(this);
  for (var key in Yanfly.Param.OptionsSymbols) {
    var setting = Yanfly.Param.OptionsSymbols[key];
    var symbol = key;
    var name = symbol;
    eval(JSON.parse(Yanfly.Param.OptionsSymbols[key].SaveConfigCode));
  }
  return config;
};

Yanfly.Options.ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function(config) {
  Yanfly.Options.ConfigManager_applyData.call(this, config);
  for (var key in Yanfly.Param.OptionsSymbols) {
    var setting = Yanfly.Param.OptionsSymbols[key];
    var symbol = key;
    var name = symbol;
    eval(JSON.parse(Yanfly.Param.OptionsSymbols[key].LoadConfigCode));
  }
};

//=============================================================================
// Window_OptionsCategory
//=============================================================================

function Window_OptionsCategory() {
    this.initialize.apply(this, arguments);
}

Window_OptionsCategory.prototype = Object.create(Window_Command.prototype);
Window_OptionsCategory.prototype.constructor = Window_OptionsCategory;

Window_OptionsCategory.prototype.initialize = function(helpWin, optionsWin) {
  var x = 0;
  var y = helpWin.y + helpWin.height;
  this._width = Yanfly.Param.OptionsCategoryWidth;
  this._height = Graphics.boxHeight - y;
  Window_Command.prototype.initialize.call(this, x, y);
  this.setOptionsWindow(optionsWin);
  this.setHelpWindow(helpWin);
  this.refresh();
  this.select(0);
  this.activate();
};

Window_OptionsCategory.prototype.windowWidth = function() {
  return this._width;
};

Window_OptionsCategory.prototype.windowHeight = function() {
  return this._height;
};

Window_OptionsCategory.prototype.setOptionsWindow = function(optionsWindow) {
  this._optionsWindow = optionsWindow;
};

Window_OptionsCategory.prototype.makeCommandList = function() {
  this.addAllCommand();
  this.addCategoryList();
  this.addExitCommand();
};

Window_OptionsCategory.prototype.addCategoryList = function() {
  var categories = Yanfly.Param.OptionsCategories;
  var length = categories.length;
  for (var i = 0; i < length; ++i) {
    var category = categories[i];
    var name = category.Name;
    this.addCommand(name, 'category', true, category);
  }
};

Window_OptionsCategory.prototype.addAllCommand = function() {
  if (!Yanfly.Param.OptionsAllCmd) return;
  var data = {
    HelpDesc: Yanfly.Param.OptionsAllCmdHelp,
    OptionsList: []
  }
  for (var key in Yanfly.Param.OptionsCategories) {
    var category = Yanfly.Param.OptionsCategories[key];
    var list = category.OptionsList;
    if (list) {
      var length = list.length;
      for (var i = 0; i < length; ++i) {
        data.OptionsList.push(list[i]);
      }
    }
  }
  this.addCommand(Yanfly.Param.OptionsAllCmd, 'category', true, data);
};

Window_OptionsCategory.prototype.addExitCommand = function() {
  if (!Yanfly.Param.OptionsExitCmd) return;
  var data = {
    HelpDesc: Yanfly.Param.OptionsExitCmdHelp,
    OptionsList: []
  }
  this.addCommand(Yanfly.Param.OptionsExitCmd, 'cancel', true, data);
};

Window_OptionsCategory.prototype.updateHelp = function() {
  if (!this._helpWindow) return;
  if (this.currentExt()) {
    var data = this.currentExt();
    this._helpWindow.setText(JSON.parse(data.HelpDesc));
    if (data.OptionsList.length > 0) {
      this._optionsWindow.makeCommandListFromData(data.OptionsList);
    } else {
      this._optionsWindow.clearRefresh();
    }
  } else {
    this._helpWindow.clear();
  }
};

Window_OptionsCategory.prototype.drawItem = function(index) {
  var rect = this.itemRectForText(index);
  var align = this.itemTextAlign();
  this.resetTextColor();
  this.changePaintOpacity(this.isCommandEnabled(index));
  this.drawTextEx(this.commandName(index), rect.x, rect.y);
};

//=============================================================================
// Window_Options
//=============================================================================

Window_Options.prototype.initialize = function() {
  this._commandListData = undefined;
  Window_Command.prototype.initialize.call(this, 0, 0);
  this.deactivate();
  this.deselect();
};

Window_Options.prototype.updatePlacement = function() {
  this._placementUpdated = true;
  this.x = Yanfly.Param.OptionsCategoryWidth;
  this.y = this._helpWindow.y + this._helpWindow.height;
};

Window_Options.prototype.windowWidth = function() {
  return Graphics.boxWidth - Yanfly.Param.OptionsCategoryWidth;
};

Window_Options.prototype.windowHeight = function() {
  if (this._placementUpdated) {
    return Graphics.boxHeight - this.y;
  } else {
    return Graphics.boxHeight - this.fittingHeight(2);
  }
};

Window_Options.prototype.setHelpWindow = function(helpWindow) {
  Window_Command.prototype.setHelpWindow.call(this, helpWindow);
  this.updatePlacement();
  this.refresh();
};

Window_Options.prototype.clearRefresh = function() {
    this.clearCommandList();
    this.createContents();
    Window_Selectable.prototype.refresh.call(this);
};

Window_Options.prototype.makeCommandList = function() {
  if (!this._commandListData) return;
  this._symbolData = {};
  var data = this._commandListData;
  var length = data.length;
  for (var i = 0; i < length; ++i) {
    this.processCommandData(data[i]);
  }
};

Window_Options.prototype.statusWidth = function() {
  return Math.min(Yanfly.Param.OptionsStatusWidth, this.contents.width / 2);
};

Window_Options.prototype.volumeOffset = function() {
  return Yanfly.Param.OptionsVolumeOffset || 20;
};

Window_Options.prototype.windowToneOffset = function() {
  return Yanfly.Param.OptionsWinToneOffset || 5;
};

Window_Options.prototype.makeCommandListFromData = function(data) {
  if (!data) return;
  this._commandListData = data;
  this.refresh();
};

Window_Options.prototype.processCommandData = function(data) {
  // Check if Shown
  var show = false;
  eval(JSON.parse(data.ShowHide));
  if (!show) return;
  // Add Command
  var name = data.Name;
  if (name === '<insert option name>') return;
  if (name.match(/EVAL:[ ](.*)/i)){
    var code = String(RegExp.$1);
    try {
      name = eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, formula, 'CUSTOM OPTIONS NAME ERROR');
    }
  }
  var symbol = data.Symbol;
  if (symbol === '<insert option symbol>') symbol = name;
  var enable = false;
  var ext = 0;
  eval(JSON.parse(data.Enable));
  eval(JSON.parse(data.Ext));
  eval(JSON.parse(data.MakeCommandCode));
  // Save symbol data
  this._symbolData[symbol] = {
    DrawItemCode: data.DrawItemCode,
    ProcessOkCode: data.ProcessOkCode,
    CursorLeftCode: data.CursorLeftCode,
    CursorRightCode: data.CursorRightCode,
    HelpDesc: data.HelpDesc
  }
};

Yanfly.Options.Window_Options_drawItem = Window_Options.prototype.drawItem;
Window_Options.prototype.drawItem = function(index) {
  var symbol = this.commandSymbol(index);
  if (symbol) {
    eval(JSON.parse(this._symbolData[symbol].DrawItemCode));
  } else {
    Yanfly.Options.Window_Options_drawItem.call(this, index);
  }
};

Window_Options.prototype.drawOptionsName = function(index) {
  var rect = this.itemRectForText(index);
  var statusWidth = this.statusWidth();
  var titleWidth = rect.width - statusWidth;
  this.resetTextColor();
  this.changePaintOpacity(this.isCommandEnabled(index));
  this.drawTextEx(this.commandName(index), rect.x, rect.y);
};

Window_Options.prototype.drawOptionsOnOff = function(index, onText, offText) {
  onText = onText || 'ON';
  offText = offText || 'OFF';
  var rect = this.itemRectForText(index);
  var statusWidth = this.statusWidth();
  var halfStatusWidth = this.statusWidth() / 2;
  var titleWidth = rect.width - statusWidth;
  this.resetTextColor();
  var symbol = this.commandSymbol(index);
  var value = this.getConfigValue(symbol);
  this.changePaintOpacity(!value);
  this.drawText(offText, titleWidth, rect.y, halfStatusWidth, 'center');
  this.changePaintOpacity(value);
  this.drawText(onText, titleWidth + halfStatusWidth, rect.y, halfStatusWidth,
    'center');
};

Window_Options.prototype.drawOptionsGauge = function(index, rate, c1, c2) {
  var rect = this.itemRectForText(index);
  var statusWidth = this.statusWidth();
  var halfStatusWidth = this.statusWidth() / 2;
  var titleWidth = rect.width - statusWidth;
  this.drawGauge(titleWidth, rect.y, statusWidth, rate, c1, c2);
};

Yanfly.Options.Window_Options_processOk = Window_Options.prototype.processOk;
Window_Options.prototype.processOk = function() {
  var symbol = this.commandSymbol(this.index());
  if (symbol) {
    eval(JSON.parse(this._symbolData[symbol].ProcessOkCode));
  } else {
    Yanfly.Options.Window_Options_processOk.call(this);
  }
};

Yanfly.Options.Window_Options_cursorLeft = Window_Options.prototype.cursorLeft;
Window_Options.prototype.cursorLeft = function(wrap) {
  var symbol = this.commandSymbol(this.index());
  if (symbol) {
    eval(JSON.parse(this._symbolData[symbol].CursorLeftCode));
  } else {
    Yanfly.Options.Window_Options_cursorLeft.call(this, wrap);
  }
};

Yanfly.Options.Window_Options_cursorRight =
  Window_Options.prototype.cursorRight;
Window_Options.prototype.cursorRight = function(wrap) {
  var symbol = this.commandSymbol(this.index());
  if (symbol) {
    eval(JSON.parse(this._symbolData[symbol].CursorRightCode));
  } else {
    Yanfly.Options.Window_Options_cursorRight.call(this, wrap);
  }
};

Window_Options.prototype.changeWindowTone = function(symbol, value, color) {
  var index = ['red', 'green', 'blue'].indexOf(color);
  if (index < 0) return;
  var tone = JsonEx.makeDeepCopy($gameSystem.windowTone());
  var lastValue = tone[index];
  tone[index] = value.clamp(-255, 255);
  if (lastValue !== tone[index]) {
    $gameSystem.setWindowTone(tone);
    this.redrawItem(this.findSymbol(symbol));
    SoundManager.playCursor();
  }
};

Window_Options.prototype.updateHelp = function() {
  if (!this._helpWindow) return;
  if (this.index() < 0) return;
  var symbol = this.commandSymbol(this.index());
  if (this._symbolData && this._symbolData[symbol]) {
    this._helpWindow.setText(JSON.parse(this._symbolData[symbol].HelpDesc));
  } else {
    this._helpWindow.clear();
  }
};

//=============================================================================
// Scene_Options
//=============================================================================

Scene_Options.prototype.create = function() {
  Scene_MenuBase.prototype.create.call(this);
  this.createHelpWindow();
  this.createOptionsWindow();
  this.createCategoryWindow();
};

Yanfly.Options.Scene_Options_createOptionsWindow =
  Scene_Options.prototype.createOptionsWindow;
Scene_Options.prototype.createOptionsWindow = function() {
  Yanfly.Options.Scene_Options_createOptionsWindow.call(this);
  this._optionsWindow.setHelpWindow(this._helpWindow);
  this._optionsWindow.setHandler('cancel', this.onOptionsCancel.bind(this));
};

Scene_Options.prototype.createCategoryWindow = function() {
  var helpWin = this._helpWindow;
  var optionsWin = this._optionsWindow;
  this._categoryWindow = new Window_OptionsCategory(helpWin, optionsWin);
  this._categoryWindow.setHandler('cancel', this.popScene.bind(this));
  this._categoryWindow.setHandler('category', this.onCategoryOk.bind(this));
  this.addWindow(this._categoryWindow);
};

Scene_Options.prototype.onCategoryOk = function() {
  this._optionsWindow.activate();
  this._optionsWindow.select(0);
};

Scene_Options.prototype.onOptionsCancel = function() {
  this._optionsWindow.deselect();
  this._categoryWindow.activate();
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
// End of Main Functions
//=============================================================================
} else {

var text = '';
text += 'You are getting this error because you are trying to run ';
text += 'YEP_OptionsCore while your project files are lower than version ';
text += '1.5.0.\n\nPlease visit this thread for instructions on how to update ';
text += 'your project files to 1.5.0 or higher: \n\n';
text += 'https://forums.rpgmakerweb.com/index.php';
console.log(text);
require('nw.gui').Window.get().showDevTools();

} // (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= '1.5.0')
//=============================================================================
// End of File
//=============================================================================