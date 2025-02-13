//=============================================================================
// Yanfly Engine Plugins - Stat Allocation
// YEP_StatAllocation.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_StatAllocation = true;

var Yanfly = Yanfly || {};
Yanfly.StatAlc = Yanfly.StatAlc || {};
Yanfly.StatAlc.version = 1.01;

//=============================================================================
 /*:
 * @plugindesc v1.01 属性加点
 * members. Stats can be allocated through AP, JP, or items!
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * 正式介绍
 * ============================================================================
 *
 * 许多玩家喜欢在游戏中自定义属性。
 * 这让他们可以在自己喜欢玩的游戏中加入一些个人色彩，
 * 还有什么比通过统计分配更好的方法呢？
 * 通过属性分配，玩家可以改变最大生命值、最大生命值、ATK值、防御值等。
 * 通过一个新的资源，接入点，代表分配点。
 * 属性点通常是通过升级获得的，然后用来提升属性！
 *
 * 然而，如果你不喜欢属性点，你也可以通过JP
 * (使用Job Points插件)或物品来分配统计数据！这个插件给
 * 游戏开发者，提供三种不同的方法来分配统计数据！
 *
 * 这个插件中的状态分配是绑定到类的，而不是作为一个
 * 整体的参与者。这意味着执行元的分配构建可以根据执
 * 行元当前所在的类而变化。这意味着玩家可以尝试多种
 * 分配构建，而不是一个大小适合所有分配构建，如果涉
 * 及到职业改变的话。
 *
 * 战士类也可以提供不同的参数来分配点数。
 * 法师类也可以提供不同的参数来分配点数。
 * 而法师职业可以给MaxMP和MAT选项。
 * 这可以通过为每个类使用注释标签来实现。
 *
 * 您也可以调整每个属性的分配规则，从名称到图标，
 * 从成本到效果，直到属性可以分配的最大次数。
 * 这些都可以通过插件参数来完成。
 *
 * ============================================================================
 * 注释标记
 * ============================================================================
 *
 * 如果您想给某些类分配不同的统计信息，请使用以下注
 * 释标签设置:
 *
 * 类别注释标签:
 *
 *   <Stat Allocation: x, x, x>
 *
 *   or
 *
 *   <Stat Allocation>
 *    x
 *    x
 *    x
 *   </Stat Allocation>
 *   - 用一个属性替换x，把它添加到玩家可以分配点数的参
 *   数列表中。根据需要插入尽可能多的“x”条目。它们将按
 *   照放置的顺序出现在菜单中。无关联的统计不会出现在
 *   菜单中。使用以下任一统计数据:
 *   
 *   ---
 *
 *   Param:    Stands for:
 *
 *   mhp       Max HP
 *   mmp       Max MP
 *   atk       Attack
 *   def       Defense
 *   mat       Magic Attack
 *   mdf       Magic Defense
 *   agi       Agility
 *   luk       Luck
 *   
 *   XParam:
 *   
 *   hit       Hit Rate
 *   eva       Evasion Rate
 *   cri       Critical Hit Rate
 *   cev       Critical Evasion Rate
 *   mev       Magic Evasion Rate
 *   mrf       Magic Reflection Rate
 *   cnt       Counterattack Rate
 *   hrg       HP Regeneration Rate
 *   mrg       MP Regeneration Rate 
 *   trg       TP Regeneration Rate
 *   
 *   SParam:
 *   
 *   tgr       Target Rate
 *   grd       Guard Effect Rate
 *   rec       Recovery Rate
 *   pha       Pharmacology (Item Effectiveness)
 *   mcr       MP Cost Rate
 *   tcr       TP Charge Rate
 *   pdr       Physical Damage Rate
 *   mdr       Magical Damage Rate
 *   fdr       Floor Damage Rate
 *   exr       Experience Rate
 *   
 *   ---
 *
 * 这些参数也可以插入到'Default Parameters'插件参数中，
 * 以更改默认列表，
 * 并使其适用于每个没有自己唯一的notetag设置的类。
 *
 * ============================================================================
 * 主菜单管理器-定位分配命令
 * ============================================================================
 *
 * 对于使用主菜单管理器并希望将Allocate命令放置在您想要的位置的用户，
 * 请使用以下格式:
 *
 *       Name: Yanfly.Param.StatAlcCmdName
 *     Symbol: statAllocate
 *       Show: $gameSystem.isShowStatAllocate()
 *    Enabled: $gameSystem.isEnableStatAllocate()
 *        Ext: 
 *  Main Bind: this.commandPersonal.bind(this)
 * Actor Bind: SceneManager.push(Scene_StatAllocation)
 *
 * 将上述设置插入主菜单管理器插槽。如果你把正确的设
 * 置复制到你需要的地方，当你使用所有的命名、启用、
 * 禁用、隐藏和显示插件参数的效果时，它就会出现在那
 * 里。
 *
 * 记得从插件参数中关闭'Auto Add Menu'.
 *
 * ============================================================================
 * 插件命令
 * ============================================================================
 *
 * 你可以使用以下插件命令在你的游戏中实现各种与统计
 * 分配相关的效果！
 *
 * 插件命令:
 *
 *   ShowStatAllocate
 *   HideStatAllocate
 *   - 这将显示或隐藏主菜单的状态分配命令。
 *
 *   EnableStatAllocate
 *   DisableStatAllocate
 *   - 这将启用或禁用主菜单的状态分配命令。
 *
 *   ShowRevertAllocate
 *   HideRevertAllocate
 *   - 这将显示或隐藏分配场景的'Revert'命令。
 *
 *   EnableRevertAllocate
 *   DisableRevertAllocate
 *   - 这将启用或禁用分配场景的'Revert'命令。
 *
 *   OpenStatAllocate x
 *   - 这将为指数等于x打开stat分配菜单。
 *   0是第一个位置。
 *
 * ============================================================================
 * Lunatic Mode - 脚本调用
 * ============================================================================
 * 
 * 可以用下面的脚本调用给角色额外的属性点使用。
 *
 * 脚本调用:
 *
 *   var actor = $gameActors.actor(actorId);
 *   actor.gainBonusAp(x, classId);
 *   - 将'actorId'替换为您希望影响的参与者的ID。
 *   将“x”替换为您希望应用于该角色的AP数量。
 *   将'classId'替换为您希望给予应用程序的类的ID。
 *   您可以将'classId'保留为0，以使其影响角色的当前类别。
 *
 *   var actor = $gameActors.actor(actorId);
 *   actor.setBonusAp(x, classId);
 *   - 将“actorId”替换为您希望影响的参与者的ID。
 *   将“x”替换为您希望将角色的AP设置为的AP数量。
 *   将'classId'替换为您希望将应用程序设置到的类的ID。
 *   您可以将'classId'保留为0，以使其影响角色的当前类
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.01:
 * - Bugfixed for those who didn't have Allocate appear.
 * - Added plugin command to open up Stat Allocation scene.
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
 * @param Command Text
 * @parent ---General---
 * @desc 这是用于菜单命令的文本。
 * @default Allocate
 *
 * @param Auto Add Menu
 * @parent ---General---
 * @desc 自动将'Stat Allocate'（分配属性）命令添加到主菜单中？
 * NO - false     YES - true
 * @default true
 *
 * @param Show Command
 * @parent ---General---
 * @type boolean
 * @on Show
 * @off Hide
 * @desc 默认在主菜单中显示Stat Allocate命令？
 * NO - false     YES - true
 * @default true
 *
 * @param Enable Command
 * @parent ---General---
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc 默认情况下，在主菜单中启用统计分配命令？
 * NO - false     YES - true
 * @default true
 *
 * @param Auto Place Command
 * @parent ---General---
 * @type boolean
 * @on Automatic
 * @off Manual
 * @desc 允许这个插件决定菜单放置位置？
 * NO - false     YES - true
 * @default true
 *
 * @param Left/Right Allocate
 * @parent ---General---
 * @type boolean
 * @on Allow
 * @off Don't Allow
 * @desc 允许用左/右键分配(和取消分配)？
 * NO - false     YES - true
 * @default true
 *
 * @param ---AP---
 * @default
 *
 * @param AP Name
 * @parent ---AP---
 * @desc ‘AP’在你的游戏中是如何出现的。
 * @default AP
 *
 * @param AP Icon
 * @parent ---AP---
 * @desc 用于AP的图标索引。
 * @default 87
 *
 * @param AP Formula
 * @parent ---AP---
 * @desc 在计算级别上，参与者应该拥有多少AP的公式代码。
 * （AP代表属性点）
 * @default (level - 1) * 5
 *
 * @param AP Amount Format
 * @parent ---AP---
 * @desc 显示可用接入点时使用的格式。
 * %1 - Amount   %2 - AP Text   %3 - AP Icon
 * @default %1\c[4]%2\c[0]%3
 *
 * @param Show AP in Menu
 * @parent ---AP---
 * @type boolean
 * @on Show
 * @off Hide
 * @desc 在菜单中显示接入点？
 * NO - false     YES - true
 * @default true
 *
 * @param ---Command Window---
 * @default
 *
 * @param Text Alignment
 * @parent ---Command Window---
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc 如何对齐命令窗口的文本？
 * left     center     right
 * @default center
 *
 * @param Allocate Command
 * @parent ---Command Window---
 * @desc 用于统计分配的命令文本。
 * @default Allocate
 *
 * @param Revert Command
 * @parent ---Command Window---
 * @desc 用于恢复分配设置的命令文本。
 * @default Revert
 *
 * @param Show Revert
 * @parent Revert Command
 * @type boolean
 * @on Show
 * @off Hide
 * @desc 默认情况下显示恢复命令？
 * NO - false     YES - true
 * @default true
 *
 * @param Enable Revert
 * @parent Revert Command
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc 默认情况下启用恢复命令？
 * NO - false     YES - true
 * @default true
 *
 * @param Finish Command
 * @parent ---Command Window---
 * @desc 用于完成/离开场景的命令文本。
 * 将此留空以不包含它.
 * @default Finish
 *
 * @param ---Allocation Window---
 * @default
 *
 * @param Default Parameters
 * @parent ---Allocation Window---
 * @type string[]
 * @desc 要在分配窗口中列出的参数列表。
 * 有关参数列表，请参考帮助文件。
 * @default ["mhp","mmp","atk","def","mat","mdf","agi","luk"]
 *
 * @param Allocate Refresh
 * @parent ---Allocation Window---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 每次分配后刷新角色？
 * 建议打开，但它可能会有延迟。
 * @default false
 *
 * @param Small Item Names
 * @parent ---Allocation Window---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 为降低成本而缩小项目名称？
 * @default false
 *
 * @param drawCode
 * @text Draw Code
 * @parent ---Allocation Window---
 * @type note
 * @desc 用于绘制参数的代码。
 * @default "// Initialize Variables\nvar param = this._list[index].ext;\nvar data = this.paramData(param);\nvar rect = this.itemRectForText(index);\n// Draw Gauge\nvar gaugeColor1 = data.gaugeColor1 || '#000000';\nvar gaugeColor2 = data.gaugeColor2 || '#000000';\nvar rate = this.paramAllocationRate(param);\nvar width = this.contentsWidth() - 330;\nthis.drawGauge(rect.x, rect.y, width, rate, gaugeColor1, gaugeColor2);\n// Draw Parameter Name\nthis.drawParamName(param, rect.x + this.textPadding(), rect.y, width);\n// Draw Parameter Values\nthis.drawParamValues(param, rect.x + this.textPadding(), rect.y, width);\n// Draw Parameter Cost\nthis.drawParamCost(param, rect.x + rect.width - width, rect.y, width);"
 *
 * @param Base Parameters
 * @parent ---Allocation Window---
 *
 * @param mhp Settings
 * @parent Base Parameters
 * @type struct<paramSettings>
 * @desc 此参数的设置。
 * @default {"name":"auto","iconIndex":"0","description":"\"Increases the maximum health of this unit by +10.\"","gaugeColor1":"#e08040","gaugeColor2":"#f0c040","allocationBonus":"10","maxAllocations":"100","apCost":"\"cost = 1 + Math.floor(times / 10);\"","jpCost":"\"cost = 0;\"","itemId":"0","itemCost":"\"cost = 1;\""}
 *
 * @param mmp Settings
 * @parent Base Parameters
 * @type struct<paramSettings>
 * @desc 此参数的设置。
 * @default {"name":"auto","iconIndex":"0","description":"\"Increases the maximum MP of this unit by +5.\"","gaugeColor1":"#4080c0","gaugeColor2":"#40c0f0","allocationBonus":"5","maxAllocations":"100","apCost":"\"cost = 1 + Math.floor(times / 10);\"","jpCost":"\"cost = 0;\"","itemId":"0","itemCost":"\"cost = 1;\""}
 *
 * @param atk Settings
 * @parent Base Parameters
 * @type struct<paramSettings>
 * @desc 此参数的设置。
 * @default {"name":"auto","iconIndex":"0","description":"\"Increases the physical attack power of this unit by +1.\"","gaugeColor1":"#ed1c24","gaugeColor2":"#f26c4f","allocationBonus":"1","maxAllocations":"100","apCost":"\"cost = 1;\"","jpCost":"\"cost = 0;\"","itemId":"0","itemCost":"\"cost = 1;\""}
 *
 * @param def Settings
 * @parent Base Parameters
 * @type struct<paramSettings>
 * @desc 此参数的设置。（后面以此类推）
 * @default {"name":"auto","iconIndex":"0","description":"\"Increases the physical defense of this unit by +1.\"","gaugeColor1":"#f7941d","gaugeColor2":"#fdc689","allocationBonus":"1","maxAllocations":"100","apCost":"\"cost = 1;\"","jpCost":"\"cost = 0;\"","itemId":"0","itemCost":"\"cost = 1;\""}
 *
 * @param mat Settings
 * @parent Base Parameters
 * @type struct<paramSettings>
 * @desc Settings for this parameter.
 * @default {"name":"auto","iconIndex":"0","description":"\"Increases the magical attack power of this unit by +1.\"","gaugeColor1":"#605ca8","gaugeColor2":"#bd8cbf","allocationBonus":"1","maxAllocations":"100","apCost":"\"cost = 1;\"","jpCost":"\"cost = 0;\"","itemId":"0","itemCost":"\"cost = 1;\""}
 *
 * @param mdf Settings
 * @parent Base Parameters
 * @type struct<paramSettings>
 * @desc Settings for this parameter.
 * @default {"name":"auto","iconIndex":"0","description":"\"Increases the magical defense of this unit by +1.\"","gaugeColor1":"#448ccb","gaugeColor2":"#a6caf4","allocationBonus":"1","maxAllocations":"100","apCost":"\"cost = 1;\"","jpCost":"\"cost = 0;\"","itemId":"0","itemCost":"\"cost = 1;\""}
 *
 * @param agi Settings
 * @parent Base Parameters
 * @type struct<paramSettings>
 * @desc Settings for this parameter.
 * @default {"name":"auto","iconIndex":"0","description":"\"Increases the agility of this unit by +1.\"","gaugeColor1":"#39b54a","gaugeColor2":"#82ca9c","allocationBonus":"1","maxAllocations":"100","apCost":"\"cost = 1;\"","jpCost":"\"cost = 0;\"","itemId":"0","itemCost":"\"cost = 1;\""}
 *
 * @param luk Settings
 * @parent Base Parameters
 * @type struct<paramSettings>
 * @desc Settings for this parameter.
 * @default {"name":"auto","iconIndex":"0","description":"\"Increases the luck of this unit by +1.\"","gaugeColor1":"#fff568","gaugeColor2":"#fffac3","allocationBonus":"1","maxAllocations":"100","apCost":"\"cost = 1;\"","jpCost":"\"cost = 0;\"","itemId":"0","itemCost":"\"cost = 1;\""}
 *
 * @param Extra Parameters
 * @parent ---Allocation Window---
 *
 * @param hit Settings
 * @parent Extra Parameters
 * @type struct<paramSettings>
 * @desc Settings for this parameter.
 * @default {"name":"auto","iconIndex":"0","description":"\"Increases the physical hit rate of this unit by +0.5%.\"","gaugeColor1":"#ca3c7a","gaugeColor2":"#ff9fc9","allocationBonus":"0.005","maxAllocations":"10","apCost":"\"cost = 3;\"","jpCost":"\"cost = 0;\"","itemId":"0","itemCost":"\"cost = 1;\""}
 *
 * @param eva Settings
 * @parent Extra Parameters
 * @type struct<paramSettings>
 * @desc Settings for this parameter.
 * @default {"name":"auto","iconIndex":"0","description":"\"Increases the physical evasion rate of this unit by +0.5%.\"","gaugeColor1":"#ca3c7a","gaugeColor2":"#ff9fc9","allocationBonus":"0.005","maxAllocations":"10","apCost":"\"cost = 3;\"","jpCost":"\"cost = 0;\"","itemId":"0","itemCost":"\"cost = 1;\""}
 *
 * @param cri Settings
 * @parent Extra Parameters
 * @type struct<paramSettings>
 * @desc Settings for this parameter.
 * @default {"name":"auto","iconIndex":"0","description":"\"Increases the critical hit rate of this unit by +0.5%.\"","gaugeColor1":"#ca3c7a","gaugeColor2":"#ff9fc9","allocationBonus":"0.005","maxAllocations":"10","apCost":"\"cost = 3;\"","jpCost":"\"cost = 0;\"","itemId":"0","itemCost":"\"cost = 1;\""}
 *
 * @param cev Settings
 * @parent Extra Parameters
 * @type struct<paramSettings>
 * @desc Settings for this parameter.
 * @default {"name":"auto","iconIndex":"0","description":"\"Increases the critical evasion rate of this unit by +0.5%.\"","gaugeColor1":"#ca3c7a","gaugeColor2":"#ff9fc9","allocationBonus":"0.005","maxAllocations":"10","apCost":"\"cost = 3;\"","jpCost":"\"cost = 0;\"","itemId":"0","itemCost":"\"cost = 1;\""}
 *
 * @param mev Settings
 * @parent Extra Parameters
 * @type struct<paramSettings>
 * @desc Settings for this parameter.
 * @default {"name":"auto","iconIndex":"0","description":"\"Increases the magic evasion rate of this unit by +0.5%.\"","gaugeColor1":"#ca3c7a","gaugeColor2":"#ff9fc9","allocationBonus":"0.005","maxAllocations":"10","apCost":"\"cost = 3;\"","jpCost":"\"cost = 0;\"","itemId":"0","itemCost":"\"cost = 1;\""}
 *
 * @param mrf Settings
 * @parent Extra Parameters
 * @type struct<paramSettings>
 * @desc Settings for this parameter.
 * @default {"name":"auto","iconIndex":"0","description":"\"Increases the magic reflection rate of this unit by +1%.\"","gaugeColor1":"#ca3c7a","gaugeColor2":"#ff9fc9","allocationBonus":"0.01","maxAllocations":"10","apCost":"\"cost = 3;\"","jpCost":"\"cost = 0;\"","itemId":"0","itemCost":"\"cost = 1;\""}
 *
 * @param cnt Settings
 * @parent Extra Parameters
 * @type struct<paramSettings>
 * @desc Settings for this parameter.
 * @default {"name":"auto","iconIndex":"0","description":"\"Increases the counterattack rate of this unit by +1%.\"","gaugeColor1":"#ca3c7a","gaugeColor2":"#ff9fc9","allocationBonus":"0.01","maxAllocations":"10","apCost":"\"cost = 3;\"","jpCost":"\"cost = 0;\"","itemId":"0","itemCost":"\"cost = 1;\""}
 *
 * @param hrg Settings
 * @parent Extra Parameters
 * @type struct<paramSettings>
 * @desc Settings for this parameter.
 * @default {"name":"auto","iconIndex":"0","description":"\"Increases the HP regeneration rate of this unit by +1%.\"","gaugeColor1":"#ca3c7a","gaugeColor2":"#ff9fc9","allocationBonus":"0.01","maxAllocations":"20","apCost":"\"cost = 3;\"","jpCost":"\"cost = 0;\"","itemId":"0","itemCost":"\"cost = 1;\""}
 *
 * @param mrg Settings
 * @parent Extra Parameters
 * @type struct<paramSettings>
 * @desc Settings for this parameter.
 * @default {"name":"auto","iconIndex":"0","description":"\"Increases the MP regeneration rate of this unit by +1%.\"","gaugeColor1":"#ca3c7a","gaugeColor2":"#ff9fc9","allocationBonus":"0.01","maxAllocations":"20","apCost":"\"cost = 3;\"","jpCost":"\"cost = 0;\"","itemId":"0","itemCost":"\"cost = 1;\""}
 *
 * @param trg Settings
 * @parent Extra Parameters
 * @type struct<paramSettings>
 * @desc Settings for this parameter.
 * @default {"name":"auto","iconIndex":"0","description":"\"Increases the TP regeneration rate of this unit by +1%.\"","gaugeColor1":"#ca3c7a","gaugeColor2":"#ff9fc9","allocationBonus":"0.01","maxAllocations":"20","apCost":"\"cost = 3;\"","jpCost":"\"cost = 0;\"","itemId":"0","itemCost":"\"cost = 1;\""}
 *
 * @param Special Parameters
 * @parent ---Allocation Window---
 *
 * @param tgr Settings
 * @parent Special Parameters
 * @type struct<paramSettings>
 * @desc Settings for this parameter.
 * @default {"name":"auto","iconIndex":"0","description":"\"Increases the target rate of this unit by -1%.\"","gaugeColor1":"#8c6239","gaugeColor2":"#c69c6d","allocationBonus":"0.01","maxAllocations":"10","apCost":"\"cost = 5;\"","jpCost":"\"cost = 0;\"","itemId":"0","itemCost":"\"cost = 1;\""}
 *
 * @param grd Settings
 * @parent Special Parameters
 * @type struct<paramSettings>
 * @desc Settings for this parameter.
 * @default {"name":"auto","iconIndex":"0","description":"\"Increases the guard effect rate of this unit by +5%.\"","gaugeColor1":"#8c6239","gaugeColor2":"#c69c6d","allocationBonus":"0.05","maxAllocations":"20","apCost":"\"cost = 5;\"","jpCost":"\"cost = 0;\"","itemId":"0","itemCost":"\"cost = 1;\""}
 *
 * @param rec Settings
 * @parent Special Parameters
 * @type struct<paramSettings>
 * @desc Settings for this parameter.
 * @default {"name":"auto","iconIndex":"0","description":"\"Increases the recovery effect rate of this unit by +5%.\"","gaugeColor1":"#8c6239","gaugeColor2":"#c69c6d","allocationBonus":"0.05","maxAllocations":"20","apCost":"\"cost = 5;\"","jpCost":"\"cost = 0;\"","itemId":"0","itemCost":"\"cost = 1;\""}
 *
 * @param pha Settings
 * @parent Special Parameters
 * @type struct<paramSettings>
 * @desc Settings for this parameter.
 * @default {"name":"auto","iconIndex":"0","description":"\"Increases the item effectiveness rate of this unit by +5%.\"","gaugeColor1":"#8c6239","gaugeColor2":"#c69c6d","allocationBonus":"0.05","maxAllocations":"20","apCost":"\"cost = 5;\"","jpCost":"\"cost = 0;\"","itemId":"0","itemCost":"\"cost = 1;\""}
 *
 * @param mcr Settings
 * @parent Special Parameters
 * @type struct<paramSettings>
 * @desc Settings for this parameter.
 * @default {"name":"auto","iconIndex":"0","description":"\"Decrease the MP cost of skills of this unit by -1%.\"","gaugeColor1":"#8c6239","gaugeColor2":"#c69c6d","allocationBonus":"-0.01","maxAllocations":"50","apCost":"\"cost = 5;\"","jpCost":"\"cost = 0;\"","itemId":"0","itemCost":"\"cost = 1;\""}
 *
 * @param tcr Settings
 * @parent Special Parameters
 * @type struct<paramSettings>
 * @desc Settings for this parameter.
 * @default {"name":"auto","iconIndex":"0","description":"\"Increase the TP charge rate of this unit by +1%.\"","gaugeColor1":"#8c6239","gaugeColor2":"#c69c6d","allocationBonus":"0.01","maxAllocations":"50","apCost":"\"cost = 5;\"","jpCost":"\"cost = 0;\"","itemId":"0","itemCost":"\"cost = 1;\""}
 *
 * @param pdr Settings
 * @parent Special Parameters
 * @type struct<paramSettings>
 * @desc Settings for this parameter.
 * @default {"name":"auto","iconIndex":"0","description":"\"Decrease the physical damage received by this unit by -1%.\"","gaugeColor1":"#8c6239","gaugeColor2":"#c69c6d","allocationBonus":"-0.01","maxAllocations":"50","apCost":"\"cost = 5;\"","jpCost":"\"cost = 0;\"","itemId":"0","itemCost":"\"cost = 1;\""}
 *
 * @param mdr Settings
 * @parent Special Parameters
 * @type struct<paramSettings>
 * @desc Settings for this parameter.
 * @default {"name":"auto","iconIndex":"0","description":"\"Decrease the magical damage received by this unit by -1%.\"","gaugeColor1":"#8c6239","gaugeColor2":"#c69c6d","allocationBonus":"-0.01","maxAllocations":"50","apCost":"\"cost = 5;\"","jpCost":"\"cost = 0;\"","itemId":"0","itemCost":"\"cost = 1;\""}
 *
 * @param fdr Settings
 * @parent Special Parameters
 * @type struct<paramSettings>
 * @desc Settings for this parameter.
 * @default {"name":"auto","iconIndex":"0","description":"\"Decrease the floord damage received by this unit by -1%.\"","gaugeColor1":"#8c6239","gaugeColor2":"#c69c6d","allocationBonus":"-0.01","maxAllocations":"50","apCost":"\"cost = 1;\"","jpCost":"\"cost = 0;\"","itemId":"0","itemCost":"\"cost = 1;\""}
 *
 * @param exr Settings
 * @parent Special Parameters
 * @type struct<paramSettings>
 * @desc Settings for this parameter.
 * @default {"name":"auto","iconIndex":"0","description":"\"Increase the EXP received by this unit by +1%.\"","gaugeColor1":"#8c6239","gaugeColor2":"#c69c6d","allocationBonus":"0.01","maxAllocations":"100","apCost":"\"cost = 1;\"","jpCost":"\"cost = 0;\"","itemId":"0","itemCost":"\"cost = 1;\""}
 *
 * @param ---Revert---
 * @default
 *
 * @param RevertConfirmationText
 * @text Confirmation Text
 * @parent ---Revert---
 * @type note
 * @desc 要为还原窗口显示的文本。
 * @default "Do you wish to revert all allocated parmeters?\nAll \\c[4]AP\\c[0], \\c[4]JP\\c[0], and \\c[4]Items\\c[0] will be refunded."
 *
 * @param RevertWinWidth
 * @text Window Width
 * @parent ---Revert---
 * @type number
 * @min 1
 * @desc 还原窗口的窗口宽度。
 * @default 700
 *
 * @param RevertYes
 * @text Yes Text
 * @parent ---Revert---
 * @desc 还原确认窗口中的'Yes'文本。
 * @default Revert
 *
 * @param RevertNo
 * @text No Text
 * @parent ---Revert---
 * @desc 还原确认窗口中的'No'文本
 * @default Don't Revert
 *
 */
/*~struct~paramSettings:
 * @param name
 * @text Name
 * @desc 用于此参数的名称。使用'auto'进行自动命名。
 * @default auto
 *
 * @param iconIndex
 * @text Icon
 * @desc 用于此参数的图标。
 * @default 0
 *
 * @param description
 * @text Help Description
 * @type note
 * @desc 用于此参数的帮助描述。
 * @default "Line1\nLine2"
 *
 * @param gaugeColor1
 * @text Gauge Color 1
 * @desc 这是十六进制颜色格式的该参数的显示条颜色1。
 * .... #rrggbb
 * @default #ffffff
 *
 * @param gaugeColor2
 * @text Gauge Color 2
 * @desc 这是十六进制颜色格式的该参数的显示条颜色2
 * ... #rrggbb
 * @default #ffffff
 *
 * @param allocationBonus
 * @text Allocation Bonus
 * @desc 每次分配增加的数值。
 * @default 1
 *
 * @param maxAllocations
 * @text Max Allocations
 * @type number
 * @min 1
 * @desc 此统计可分配的最大次数。
 * @default 100
 *
 * @param apCost
 * @text AP Cost
 * @type note
 * @desc 升级此参数的AP成本。
 * cost = final value     times = times already upgraded
 * @default "cost = 1 + times;"
 *
 * @param jpCost
 * @text JP Cost
 * @type note
 * @desc 升级此参数的成本. Req: YEP_JobPoints.
 * cost = final value     times = times already upgraded
 * @default "cost = 0;"
 *
 * @param itemId
 * @text Item ID
 * @type item
 * @desc 用于成本的物品的ID。
 * 如果您不想要物品消耗，请将其保留为0.
 * @default 0
 *
 * @param itemCost
 * @text Item Cost
 * @type note
 * @desc 升级此参数的项目成本。
 * cost = final value     times = times already upgraded
 * @default "cost = 1;"
 * 
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_StatAllocation');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.StatAlcCmdName = String(Yanfly.Parameters['Command Text']);
Yanfly.Param.StatAlcAutoAdd = eval(String(Yanfly.Parameters['Auto Add Menu']));
Yanfly.Param.StatAlcShowCmd = String(Yanfly.Parameters['Show Command']);
Yanfly.Param.StatAlcShowCmd = eval(Yanfly.Param.StatAlcShowCmd);
Yanfly.Param.StatAlcEnableCmd = String(Yanfly.Parameters['Enable Command']);
Yanfly.Param.StatAlcEnableCmd = eval(Yanfly.Param.StatAlcEnableCmd);
Yanfly.Param.StatAlcAutoPlace = String(Yanfly.Parameters['Auto Place Command']);
Yanfly.Param.StatAlcAutoPlace = eval(Yanfly.Param.StatAlcAutoPlace);
Yanfly.Param.StatAlcLfRt = String(Yanfly.Parameters['Left/Right Allocate']);
Yanfly.Param.StatAlcLfRt = eval(Yanfly.Param.StatAlcLfRt);

Yanfly.Param.StatAlcAP = String(Yanfly.Parameters['AP Name']);
Yanfly.Param.StatAlcAPIcon = Number(Yanfly.Parameters['AP Icon']);
Yanfly.Param.StatAlcAPAmtFmt = String(Yanfly.Parameters['AP Amount Format']);
Yanfly.Param.StatAlcAPMenu = eval(String(Yanfly.Parameters['Show AP in Menu']));

Yanfly.Param.StatAlcTextAlign = String(Yanfly.Parameters['Text Alignment']);
Yanfly.Param.StatAlcAllocateCmd = String(Yanfly.Parameters['Allocate Command']);
Yanfly.Param.StatAlcRevertCmd = String(Yanfly.Parameters['Revert Command']);
Yanfly.Param.StatAlcRevertShow = eval(String(Yanfly.Parameters['Show Revert']));
Yanfly.Param.StatAlcRevertEnable = String(Yanfly.Parameters['Enable Revert']);
Yanfly.Param.StatAlcRevertEnable = eval(Yanfly.Param.StatAlcRevertEnable);
Yanfly.Param.StatAlcFinishCmd = String(Yanfly.Parameters['Finish Command']);

Yanfly.Param.StatAlcList = JSON.parse(Yanfly.Parameters['Default Parameters']);
Yanfly.Param.StatAlcRefresh = String(Yanfly.Parameters['Allocate Refresh']);
Yanfly.Param.StatAlcRefresh = eval(Yanfly.Param.StatAlcRefresh);
Yanfly.Param.StatAlcDrawCode = JSON.parse(Yanfly.Parameters['drawCode']);
Yanfly.Param.StatAlcDrawCode = new Function('index', 
  Yanfly.Param.StatAlcDrawCode);
Yanfly.Param.StatAlcSmItemName = String(Yanfly.Parameters['Small Item Names']);
Yanfly.Param.StatAlcSmItemName = eval(Yanfly.Param.StatAlcSmItemName);

Yanfly.Param.StatAlcRevConfirmText = 
  JSON.parse(Yanfly.Parameters['RevertConfirmationText']);
Yanfly.Param.StatAlcRevWinWidth = String(Yanfly.Parameters['RevertWinWidth']);
Yanfly.Param.StatAlcRevYes = String(Yanfly.Parameters['RevertYes']);
Yanfly.Param.StatAlcRevNo = String(Yanfly.Parameters['RevertNo']);

Yanfly.SetupParameters = function() {
  Yanfly.Param.StatAlcAPFormula = new Function('level', 'return ' +
    String(Yanfly.Parameters['AP Formula']));
  Yanfly.Param.StatAlcParamSettings = {
    mhp: Yanfly.ConvertParameterStructure('mhp Settings'),
    mmp: Yanfly.ConvertParameterStructure('mmp Settings'),
    atk: Yanfly.ConvertParameterStructure('atk Settings'),
    def: Yanfly.ConvertParameterStructure('def Settings'),
    mat: Yanfly.ConvertParameterStructure('mat Settings'),
    mdf: Yanfly.ConvertParameterStructure('mdf Settings'),
    agi: Yanfly.ConvertParameterStructure('agi Settings'),
    luk: Yanfly.ConvertParameterStructure('luk Settings'),

    hit: Yanfly.ConvertParameterStructure('hit Settings'),
    eva: Yanfly.ConvertParameterStructure('eva Settings'),
    cri: Yanfly.ConvertParameterStructure('cri Settings'),
    cev: Yanfly.ConvertParameterStructure('cev Settings'),
    mev: Yanfly.ConvertParameterStructure('mev Settings'),
    mrf: Yanfly.ConvertParameterStructure('mrf Settings'),
    cnt: Yanfly.ConvertParameterStructure('cnt Settings'),
    hrg: Yanfly.ConvertParameterStructure('hrg Settings'),
    mrg: Yanfly.ConvertParameterStructure('mrg Settings'),
    trg: Yanfly.ConvertParameterStructure('trg Settings'),

    tgr: Yanfly.ConvertParameterStructure('tgr Settings'),
    grd: Yanfly.ConvertParameterStructure('grd Settings'),
    rec: Yanfly.ConvertParameterStructure('rec Settings'),
    pha: Yanfly.ConvertParameterStructure('pha Settings'),
    mcr: Yanfly.ConvertParameterStructure('mcr Settings'),
    tcr: Yanfly.ConvertParameterStructure('tcr Settings'),
    pdr: Yanfly.ConvertParameterStructure('pdr Settings'),
    mdr: Yanfly.ConvertParameterStructure('mdr Settings'),
    fdr: Yanfly.ConvertParameterStructure('fdr Settings'),
    exr: Yanfly.ConvertParameterStructure('exr Settings')
  }
};

Yanfly.ConvertParameterStructure = function(parameterName) {
  var data = JSON.parse(Yanfly.Parameters[parameterName]);
  data.description = JSON.parse(data.description);
  data.allocationBonus = Number(data.allocationBonus);
  data.maxAllocations = Math.max(1, Number(data.maxAllocations));
  data.apCost = new Function('times', 'var cost = 0;\n ' +
    JSON.parse(data.apCost) + '\nreturn Math.ceil(cost);');
  data.jpCost = new Function('times', 'var cost = 0;\n ' +
    JSON.parse(data.jpCost) + '\nreturn Math.ceil(cost);');
  data.itemId = Number(data.itemId);
  data.itemCost = new Function('times', 'var cost = 0;\n ' +
    JSON.parse(data.itemCost) + '\nreturn Math.ceil(cost);');
  return data;
};

Yanfly.SetupParameters();

//=============================================================================
// DataManager
//=============================================================================

Yanfly.StatAlc.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.StatAlc.DataManager_isDatabaseLoaded.call(this)) return false;

  if (!Yanfly._loaded_YEP_StatAllocation) {
    this.processStatAllocationNotetags1($dataClasses);
    Yanfly._loaded_YEP_StatAllocation = true;
  }
  
  return true;
};

DataManager.processStatAllocationNotetags1 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.statAllocationList = JsonEx.makeDeepCopy(Yanfly.Param.StatAlcList);
    var customMode = 'none';

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<Stat[ ](?:Allocation|Allocate):[ ](.*)>/i)) {
        obj.statAllocationList = this.extractStatAllocationList(RegExp.$1);
      } else if (line.match(/<Stat[ ](?:Allocation|Allocate)>/i)) {
        obj.statAllocationList = [];
        var customMode = 'stat allocation';
      } else if (line.match(/<Stat[ ](?:Allocation|Allocate)>/i)) {
        var customMode = 'none';
      } else if (customMode === 'stat allocation') {
        line = line.toLowerCase().trim();
        if (line === 'maxhp') line = 'mhp';
        if (line === 'maxmp') line = 'mmp';
        obj.statAllocationList.push(line);
      }
    }
  }
};

DataManager.extractStatAllocationList = function(data) {
  var array = [];
  var list = data.split(',');
  var length = list.length;
  for (var i = 0; i < length; ++i) {
    var str = list[i];
    array.push(str.trim().toLowerCase());
  }
  return array;
};

//=============================================================================
// TextManager
//=============================================================================

TextManager.ap = function() {
  return Yanfly.Param.StatAlcAP;
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.StatAlc.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
  Yanfly.StatAlc.Game_System_initialize.call(this);
  this.initStatAllocation();
};

Game_System.prototype.initStatAllocation = function() {
  this._showStatAlloccate = Yanfly.Param.StatAlcShowCmd;
  this._enableStatAllocate = Yanfly.Param.StatAlcEnableCmd;
  this._showRevertAllocate = Yanfly.Param.StatAlcRevertShow;
  this._enableRevertAllocate = Yanfly.Param.StatAlcRevertEnable;
};

Game_System.prototype.isShowStatAllocate = function() {
  if (this._showStatAlloccate === undefined) this.initStatAllocation();
  return this._showStatAlloccate;
};

Game_System.prototype.isEnableStatAllocate = function() {
  if (this._enableStatAllocate === undefined) this.initStatAllocation();
  return this._enableStatAllocate;
};

Game_System.prototype.isShowRevertAllocate = function() {
  if (this._showRevertAllocate === undefined) this.initStatAllocation();
  return this._showRevertAllocate;
};

Game_System.prototype.isEnableRevertAllocate = function() {
  if (this._enableRevertAllocate === undefined) this.initStatAllocation();
  return this._enableRevertAllocate;
};

//=============================================================================
// Game_BattlerBase
//=============================================================================

Yanfly.StatAlc.Game_BattlerBase_param = Game_BattlerBase.prototype.param;
Game_BattlerBase.prototype.param = function(paramId) {
  var value = Yanfly.StatAlc.Game_BattlerBase_param.call(this, paramId);
  value += this.paramAllocationBonus(paramId);
  return value;
};

Game_BattlerBase.prototype.paramAllocationBonus = function(paramId) {
  return 0;
};

Yanfly.StatAlc.Game_BattlerBase_xparam = Game_BattlerBase.prototype.xparam;
Game_BattlerBase.prototype.xparam = function(xparamId) {
  var value = Yanfly.StatAlc.Game_BattlerBase_xparam.call(this, xparamId);
  value += this.xparamAllocationBonus(xparamId);
  return value;
};

Game_BattlerBase.prototype.xparamAllocationBonus = function(xparamId) {
  return 0;
};

Yanfly.StatAlc.Game_BattlerBase_sparam = Game_BattlerBase.prototype.sparam;
Game_BattlerBase.prototype.sparam = function(sparamId) {
  var value = Yanfly.StatAlc.Game_BattlerBase_sparam.call(this, sparamId);
  value += this.sparamAllocationBonus(sparamId);
  return value;
};

Game_BattlerBase.prototype.sparamAllocationBonus = function(sparamId) {
  return 0;
};

//=============================================================================
// Game_Actor
//=============================================================================

Yanfly.StatAlc.Game_Actor_initMembers = Game_Actor.prototype.initMembers;
Game_Actor.prototype.initMembers = function() {
  Yanfly.StatAlc.Game_Actor_initMembers.call(this);
  this.initStatAllocation();
  this.initAllocationPoints();
};

Game_Actor.prototype.initStatAllocation = function() {
  this._paramAllocationTimes = {};
  this._xparamAllocationTimes = {};
  this._sparamAllocationTimes = {};
};

Game_Actor.prototype.initAllocationPoints = function() {
  this._bonusAllocationPoints = {};
  this._spentAllocationPoints = {};
};

Game_Actor.prototype.initAllocationPointsCheck = function() {
  if (this._bonusAllocationPoints === undefined) this.initAllocationPoints();
  if (this._spentAllocationPoints === undefined) this.initAllocationPoints();
};

Game_Actor.prototype.getParamAllocateTimes = function(paramId, classId) {
  classId = classId || this._classId;
  if (this._paramAllocationTimes === undefined) this.initStatAllocation();
  if (this._paramAllocationTimes[classId] === undefined) {
    this._paramAllocationTimes[classId] = [0, 0, 0, 0, 0, 0, 0, 0];
  }
  var max = this.getParamAllocateMax(paramId);
  return this._paramAllocationTimes[classId][paramId].clamp(0, max);
};

Game_Actor.prototype.gainParamAllocateTimes = function(paramId, times, classId) {
  classId = classId || this._classId;
  if (this._paramAllocationTimes === undefined) this.initStatAllocation();
  var value = this.getParamAllocateTimes(paramId) + times;
  this.setParamAllocateTimes(paramId, value);
};

Game_Actor.prototype.setParamAllocateTimes = function(paramId, times, classId) {
  classId = classId || this._classId;
  if (this._paramAllocationTimes === undefined) this.initStatAllocation();
  if (this._paramAllocationTimes[classId] === undefined) {
    this._paramAllocationTimes[classId] = [0, 0, 0, 0, 0, 0, 0, 0];
  }
  this._paramAllocationTimes[classId][paramId] = times;
  var max = this.getParamAllocateMax(paramId);
  this._paramAllocationTimes[classId][paramId] = 
    this._paramAllocationTimes[classId][paramId].clamp(0, max);
  if (Yanfly.Param.StatAlcRefresh) this.refresh();
};

Game_Actor.prototype.getParamAllocateBoost = function(paramId) {
  var data = Yanfly.Param.StatAlcParamSettings;
  if (paramId === 0) return data.mhp.allocationBonus;
  if (paramId === 1) return data.mmp.allocationBonus;
  if (paramId === 2) return data.atk.allocationBonus;
  if (paramId === 3) return data.def.allocationBonus;
  if (paramId === 4) return data.mat.allocationBonus;
  if (paramId === 5) return data.mdf.allocationBonus;
  if (paramId === 6) return data.agi.allocationBonus;
  if (paramId === 7) return data.luk.allocationBonus;
  return 1;
};

Game_Actor.prototype.getParamAllocateMax = function(paramId) {
  var data = Yanfly.Param.StatAlcParamSettings;
  if (paramId === 0) return data.mhp.maxAllocations;
  if (paramId === 1) return data.mmp.maxAllocations;
  if (paramId === 2) return data.atk.maxAllocations;
  if (paramId === 3) return data.def.maxAllocations;
  if (paramId === 4) return data.mat.maxAllocations;
  if (paramId === 5) return data.mdf.maxAllocations;
  if (paramId === 6) return data.agi.maxAllocations;
  if (paramId === 7) return data.luk.maxAllocations;
  return 100;
};

Game_Actor.prototype.paramAllocationBonus = function(paramId) {
  if ($gameTemp._ignoreStatAllocations) return 0;
  return Math.ceil(this.getParamAllocateTimes(paramId) * 
      this.getParamAllocateBoost(paramId));
};

Game_Actor.prototype.getXParamAllocateTimes = function(paramId, classId) {
  classId = classId || this._classId;
  if (this._xparamAllocationTimes === undefined) this.initStatAllocation();
  if (this._xparamAllocationTimes[classId] === undefined) {
    this._xparamAllocationTimes[classId] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  }
  var max = this.getXParamAllocateMax(paramId);
  return this._xparamAllocationTimes[classId][paramId].clamp(0, max);
};

Game_Actor.prototype.gainXParamAllocateTimes = function(paramId, times, classId) {
  classId = classId || this._classId;
  if (this._xparamAllocationTimes === undefined) this.initStatAllocation();
  var value = this.getXParamAllocateTimes(paramId) + times;
  this.setXParamAllocateTimes(paramId, value);
};

Game_Actor.prototype.setXParamAllocateTimes = function(paramId, times, classId) {
  classId = classId || this._classId;
  if (this._xparamAllocationTimes === undefined) this.initStatAllocation();
  if (this._xparamAllocationTimes[classId] === undefined) {
    this._xparamAllocationTimes[classId] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  }
  this._xparamAllocationTimes[classId][paramId] = times;
  var max = this.getXParamAllocateMax(paramId);
  this._xparamAllocationTimes[classId][paramId] = 
    this._xparamAllocationTimes[classId][paramId].clamp(0, max);
  if (Yanfly.Param.StatAlcRefresh) this.refresh();
};

Game_Actor.prototype.getXParamAllocateBoost = function(paramId) {
  var data = Yanfly.Param.StatAlcParamSettings;
  if (paramId === 0) return data.hit.allocationBonus;
  if (paramId === 1) return data.eva.allocationBonus;
  if (paramId === 2) return data.cri.allocationBonus;
  if (paramId === 3) return data.cev.allocationBonus;
  if (paramId === 4) return data.mev.allocationBonus;
  if (paramId === 5) return data.mrf.allocationBonus;
  if (paramId === 6) return data.cnt.allocationBonus;
  if (paramId === 7) return data.hrg.allocationBonus;
  if (paramId === 8) return data.mrg.allocationBonus;
  if (paramId === 9) return data.trg.allocationBonus;
  return 1;
};

Game_Actor.prototype.getXParamAllocateMax = function(paramId) {
  var data = Yanfly.Param.StatAlcParamSettings;
  if (paramId === 0) return data.hit.maxAllocations;
  if (paramId === 1) return data.eva.maxAllocations;
  if (paramId === 2) return data.cri.maxAllocations;
  if (paramId === 3) return data.cev.maxAllocations;
  if (paramId === 4) return data.mev.maxAllocations;
  if (paramId === 5) return data.mrf.maxAllocations;
  if (paramId === 6) return data.cnt.maxAllocations;
  if (paramId === 7) return data.hrg.maxAllocations;
  if (paramId === 8) return data.mrg.maxAllocations;
  if (paramId === 9) return data.trg.maxAllocations;
  return 100;
};

Game_Actor.prototype.xparamAllocationBonus = function(paramId) {
  if ($gameTemp._ignoreStatAllocations) return 0;
  return this.getXParamAllocateTimes(paramId) * 
      this.getXParamAllocateBoost(paramId);
};

Game_Actor.prototype.getSParamAllocateTimes = function(paramId, classId) {
  classId = classId || this._classId;
  if (this._sparamAllocationTimes === undefined) this.initStatAllocation();
  if (this._sparamAllocationTimes[classId] === undefined) {
    this._sparamAllocationTimes[classId] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  }
  var max = this.getSParamAllocateMax(paramId);
  return this._sparamAllocationTimes[classId][paramId].clamp(0, max);
};

Game_Actor.prototype.gainSParamAllocateTimes = function(paramId, times, classId) {
  classId = classId || this._classId;
  if (this._sparamAllocationTimes === undefined) this.initStatAllocation();
  var value = this.getSParamAllocateTimes(paramId) + times;
  this.setSParamAllocateTimes(paramId, value);
};

Game_Actor.prototype.setSParamAllocateTimes = function(paramId, times, classId) {
  classId = classId || this._classId;
  if (this._sparamAllocationTimes === undefined) this.initStatAllocation();
  if (this._sparamAllocationTimes[classId] === undefined) {
    this._sparamAllocationTimes[classId] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  }
  this._sparamAllocationTimes[classId][paramId] = times;
  var max = this.getSParamAllocateMax(paramId);
  this._sparamAllocationTimes[classId][paramId] = 
    this._sparamAllocationTimes[classId][paramId].clamp(0, max);
  if (Yanfly.Param.StatAlcRefresh) this.refresh();
};

Game_Actor.prototype.getSParamAllocateBoost = function(paramId) {
  var data = Yanfly.Param.StatAlcParamSettings;
  if (paramId === 0) return data.tgr.allocationBonus;
  if (paramId === 1) return data.grd.allocationBonus;
  if (paramId === 2) return data.rec.allocationBonus;
  if (paramId === 3) return data.pha.allocationBonus;
  if (paramId === 4) return data.mcr.allocationBonus;
  if (paramId === 5) return data.tcr.allocationBonus;
  if (paramId === 6) return data.pdr.allocationBonus;
  if (paramId === 7) return data.mdr.allocationBonus;
  if (paramId === 8) return data.fdr.allocationBonus;
  if (paramId === 9) return data.exr.allocationBonus;
  return 1;
};

Game_Actor.prototype.getSParamAllocateMax = function(paramId) {
  var data = Yanfly.Param.StatAlcParamSettings;
  if (paramId === 0) return data.tgr.maxAllocations;
  if (paramId === 1) return data.grd.maxAllocations;
  if (paramId === 2) return data.rec.maxAllocations;
  if (paramId === 3) return data.pha.maxAllocations;
  if (paramId === 4) return data.mcr.maxAllocations;
  if (paramId === 5) return data.tcr.maxAllocations;
  if (paramId === 6) return data.pdr.maxAllocations;
  if (paramId === 7) return data.mdr.maxAllocations;
  if (paramId === 8) return data.fdr.maxAllocations;
  if (paramId === 9) return data.exr.maxAllocations;
  return 100;
};

Game_Actor.prototype.sparamAllocationBonus = function(paramId) {
  if ($gameTemp._ignoreStatAllocations) return 0;
  return this.getSParamAllocateTimes(paramId) * 
      this.getSParamAllocateBoost(paramId);
};

Game_Actor.prototype.baseAp = function() {
  return Math.max(0, Yanfly.Param.StatAlcAPFormula.call(this, this.level));
};

Game_Actor.prototype.bonusAp = function() {
  this.initAllocationPointsCheck();
  this._bonusAllocationPoints[this._classId] =
    this._bonusAllocationPoints[this._classId] || 0;
  return Math.max(0, this._bonusAllocationPoints[this._classId]);
};

Game_Actor.prototype.spentAp = function() {
  this.initAllocationPointsCheck();
  this._spentAllocationPoints[this._classId] =
    this._spentAllocationPoints[this._classId] || 0;
  return Math.max(0, this._spentAllocationPoints[this._classId]);
};

Game_Actor.prototype.totalAp = function() {
  return Math.max(0, this.baseAp() + this.bonusAp());
};

Game_Actor.prototype.availableAp = function() {
  return Math.max(0, this.totalAp() - this.spentAp());
};

Game_Actor.prototype.spendAp = function(value) {
  this.initAllocationPointsCheck();
  this._spentAllocationPoints[this._classId] =
    this._spentAllocationPoints[this._classId] || 0;
  this._spentAllocationPoints[this._classId] += value;
};

Game_Actor.prototype.setBonusAp = function(value, classId) {
  this.initAllocationPointsCheck();
  classId = classId || this._classId;
  this._bonusAllocationPoints[classId] = value;
};

Game_Actor.prototype.gainBonusAp = function(value, classId) {
  this.initAllocationPointsCheck();
  classId = classId || this._classId;
  var ap = this._bonusAllocationPoints[classId] || 0;
  ap += value;
  this.setBonusAp(value, classId);
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.StatAlc.Game_Interpreter_pluginCommand =
  Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.StatAlc.Game_Interpreter_pluginCommand.call(this, command, args);
  if (command.match(/ShowStatAllocate/i)) {
    $gameSystem._showStatAlloccate = true;
  } else if (command.match(/HideStatAllocate/i)) {
    $gameSystem._showStatAlloccate = false;
  } else if (command.match(/EnableStatAllocate/i)) {
    $gameSystem._enableStatAllocate = true;
  } else if (command.match(/DisableStatAllocate/i)) {
    $gameSystem._enableStatAllocate = false;
  } else if (command.match(/ShowRevertAllocate/i)) {
    $gameSystem._showRevertAllocate = true;
  } else if (command.match(/HideRevertAllocate/i)) {
    $gameSystem._showRevertAllocate = false;
  } else if (command.match(/EnableRevertAllocate/i)) {
    $gameSystem._enableRevertAllocate = true;
  } else if (command.match(/DisableRevertAllocate/i)) {
    $gameSystem._enableRevertAllocate = false;
  } else if (command.match(/OpenStatAllocat/i)) {
    var index = args.shift() || 0;
    $gameParty.members().forEach(function(actor) {
        ImageManager.reserveFace(actor.faceName());
    }, this);
    $gameParty.setMenuActor($gameParty.members()[index]);
    SceneManager.push(Scene_StatAllocation);
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
// Window_Base
//=============================================================================

Window_Base.prototype.drawActorAp = function(actor, x, y) {
  var fmt = Yanfly.Param.StatAlcAPAmtFmt;
  var icon = '\\i[' + Yanfly.Param.StatAlcAPIcon + ']';
  var name = Yanfly.Param.StatAlcAP;
  var amount = actor.availableAp();
  var text = fmt.format(amount, name, icon);
  this.drawTextEx(text, x, y);
};

Yanfly.StatAlc.Window_Base_drawActorStatus =
  Window_Base.prototype.drawActorSimpleStatus;
Window_Base.prototype.drawActorSimpleStatus = function(actor, x, y, width) {
  Yanfly.StatAlc.Window_Base_drawActorStatus.call(this, actor, x, y, width);
  if (!Yanfly.Param.StatAlcAPMenu) return;
  if (Yanfly.Param.MenuTpGauge) {
    y += this.lineHeight() * 3;
  } else {
    y += this.lineHeight() * 2.5;
    x -= Window_Base._faceWidth + this.standardPadding() - this.textPadding();
  }
  this.drawActorAp(actor, x, y);
};

//=============================================================================
// Window_MenuCommand
//=============================================================================

Yanfly.StatAlc.Window_MenuCommand_addOriginalCommands =
  Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
  Yanfly.StatAlc.Window_MenuCommand_addOriginalCommands.call(this);
  if (Yanfly.Param.StatAlcAutoAdd) this.addStatAllocationCommand();
};

Window_MenuCommand.prototype.addStatAllocationCommand = function() {
  if (!Yanfly.Param.StatAlcAutoPlace) return;
  if (!$gameSystem.isShowStatAllocate()) return;
  if (this.findSymbol('statAllocate') > -1) return;
  var text = Yanfly.Param.StatAlcCmdName;
  var enabled = $gameSystem.isEnableStatAllocate();
  this.addCommand(text, 'statAllocate', enabled);
};

//=============================================================================
// Window_StatAllocationCommand
//=============================================================================

function Window_StatAllocationCommand() {
  this.initialize.apply(this, arguments);
}

Window_StatAllocationCommand.prototype = Object.create(Window_Command.prototype);
Window_StatAllocationCommand.prototype.constructor = Window_StatAllocationCommand;

Window_StatAllocationCommand.prototype.initialize = function() {
  Window_Command.prototype.initialize.call(this, 0, 0);
};

Window_StatAllocationCommand.prototype.windowWidth = function() {
  return 240;
};

Window_StatAllocationCommand.prototype.numVisibleRows = function() {
  return 4;
};

Window_StatAllocationCommand.prototype.itemTextAlign = function() {
  return Yanfly.Param.StatAlcTextAlign;
};

Window_StatAllocationCommand.prototype.makeCommandList = function() {
  this.addAllocateCommand();
  this.addCustomCommands();
  this.addRevertCommand();
  this.addFinishCommand();
};

Window_StatAllocationCommand.prototype.addAllocateCommand = function() {
  var name = Yanfly.Param.StatAlcAllocateCmd;
  this.addCommand(name, 'allocate', true);
};

Window_StatAllocationCommand.prototype.addCustomCommands = function() {
};

Window_StatAllocationCommand.prototype.addRevertCommand = function() {
  if (!$gameSystem.isShowRevertAllocate()) return;
  var name = Yanfly.Param.StatAlcRevertCmd;
  var enabled = $gameSystem.isEnableRevertAllocate();
  this.addCommand(name, 'revert', enabled);
};

Window_StatAllocationCommand.prototype.addFinishCommand = function() {
  if (Yanfly.Param.StatAlcFinishCmd === '') return;
  var name = Yanfly.Param.StatAlcFinishCmd;
  this.addCommand(name, 'cancel', true);
};

//=============================================================================
// Window_AllocationList
//=============================================================================

function Window_AllocationList() {
  this.initialize.apply(this, arguments);
}

Window_AllocationList.prototype = Object.create(Window_Command.prototype);
Window_AllocationList.prototype.constructor = Window_AllocationList;

Window_AllocationList.prototype.initialize = function(x, y) {
  this._windowWidth = Graphics.boxWidth - x;
  this._windowHeight = Graphics.boxHeight - y;
  Window_Command.prototype.initialize.call(this, x, y);
  this.calculateConstants();
  this.deactivate();
  this._lastIndex = 0;
  this.deselect();
};

Window_AllocationList.prototype.calculateConstants = function() {
  var max = 0;
  for (var i = 0; i < 8; ++i) {
    max = Math.max(max, $gameActors.actor(1).paramMax(i));
  }
  max = Yanfly.Util.toGroup(max);
  this._bonusWidth = this.textWidth('(+' + max + ') ');
  this._bonusWidth = Math.max(this._bonusWidth, this.textWidth('(+9.99%) '));
};

Window_AllocationList.prototype.paramData = function(param) {
  return Yanfly.Param.StatAlcParamSettings[param];
};

Window_AllocationList.prototype.windowWidth = function() {
  return this._windowWidth;
};

Window_AllocationList.prototype.windowHeight = function() {
  return this._windowHeight;
};

Window_AllocationList.prototype.textWidthEx = function(text) {
  return this.drawTextEx(text, 0, this.contents.height);
};

Window_AllocationList.prototype.setActor = function(actor) {
  if (this._actor === actor) return;
  this._actor = actor;
  this.refresh();
};

Window_AllocationList.prototype.activate = function() {
  Window_Command.prototype.activate.call(this);
  this.select(this._lastIndex);
};

Window_AllocationList.prototype.deactivate = function() {
  this._lastIndex = this.index();
  Window_Command.prototype.deactivate.call(this);
};

Window_AllocationList.prototype.updateHelp = function() {
  if (this.currentSymbol() === 'param') {
    this._helpWindow.setText(this.paramData(this.currentExt()).description);
  } else if (this.currentSymbol() === 'xparam') {
    this._helpWindow.setText(this.paramData(this.currentExt()).description);
  } else if (this.currentSymbol() === 'sparam') {
    this._helpWindow.setText(this.paramData(this.currentExt()).description);
  } else {
    this._helpWindow.clear();
  }
};

Window_AllocationList.prototype.makeCommandList = function() {
  if (!this._actor) return;
  var list = this._actor.currentClass().statAllocationList;
  var length = list.length;
  for (var i = 0; i < length; ++i) {
    var item = list[i];
    this.addParameterItem(item);
  }
};

Window_AllocationList.prototype.addParameterItem = function(item) {
  var param = item.trim().toLowerCase();
  switch (param) {
  case 'mhp':
  case 'mmp':
  case 'atk':
  case 'def':
  case 'mat':
  case 'mdf':
  case 'agi':
  case 'luk':
    this.addCommand(param, 'param', this.isParamEnabled(param), param);
    break;
  case 'hit':
  case 'eva':
  case 'cri':
  case 'cev':
  case 'mev':
  case 'mrf':
  case 'cnt':
  case 'hrg':
  case 'mrg':
  case 'trg':
    this.addCommand(param, 'xparam', this.isParamEnabled(param), param);
    break;
  case 'tgr':
  case 'grd':
  case 'rec':
  case 'pha':
  case 'mcr':
  case 'tcr':
  case 'pdr':
  case 'mdr':
  case 'fdr':
  case 'exr':
    this.addCommand(param, 'sparam', this.isParamEnabled(param), param);
    break;
  }
};

Window_AllocationList.prototype.isParamEnabled = function(param) {
  var params = ['mhp','mmp','atk','def','mat','mdf','agi','luk'];
  var xparams = ['hit','eva','cri','cev','mev','mrf','cnt','hrg','mrg','trg'];
  var sparams = ['tgr','grd','rec','pha','mcr','tcr','pdr','mdr','fdr','exr'];
  if (params.contains(param)) {
    var paramId = params.indexOf(param);
    var times = this._actor.getParamAllocateTimes(paramId);
  } else if (xparams.contains(param)) {
    var paramId = xparams.indexOf(param);
    var times = this._actor.getXParamAllocateTimes(paramId);
  } else if (sparams.contains(param)) {
    var paramId = sparams.indexOf(param);
    var times = this._actor.getSParamAllocateTimes(paramId);
  } else {
    return false;
  }
  var max = this.paramData(param).maxAllocations;
  if (times >= max) return false;
  if (!this.meetApCost(param, paramId, times)) return false;
  if (!this.meetJpCost(param, paramId, times)) return false;
  if (!this.meetItemCost(param, paramId, times)) return false;
  return true;
};

Window_AllocationList.prototype.meetApCost = function(param, paramId, times) {
  var apCost = this.paramData(param).apCost.call(this, times);
  return this._actor.availableAp() >= apCost;
};

Window_AllocationList.prototype.meetJpCost = function(param, paramId, times) {
  if (!Imported.YEP_JobPoints) return true;
  var jpCost = this.paramData(param).jpCost.call(this, times);
  return this._actor.jp() >= jpCost;
};

Window_AllocationList.prototype.meetItemCost = function(param, paramId, times) {
  var itemId = this.paramData(param).itemId;
  if (itemId <= 0) return true;
  var item = $dataItems[itemId];
  if (!item) return true;
  var itemCost = this.paramData(param).itemCost.call(this, times);
  return $gameParty.numItems(item) >= itemCost;
};

Window_AllocationList.prototype.drawItem = function(index) {
  this.changePaintOpacity(true);
  var symbol = this.commandSymbol(index);
  this.drawParamItem(index);
};

Window_AllocationList.prototype.drawParamItem = function(index) {
  var data = this.paramData(this._list[index].ext);
  Yanfly.Param.StatAlcDrawCode.call(this, index);
  return;
  var param = this._list[index].ext;
  var data = this.paramData(param);
  var rect = this.itemRectForText(index);
  // Draw Gauge
  var gaugeColor1 = data.gaugeColor1 || '#000000';
  var gaugeColor2 = data.gaugeColor2 || '#000000';
  var rate = this.paramAllocationRate(param);
  var width = this.contentsWidth() - 330;
  this.drawGauge(rect.x, rect.y, width, rate, gaugeColor1, gaugeColor2);
  // Draw Parameter Name
  this.drawParamName(param, rect.x + this.textPadding(), rect.y, width);
  // Draw Parameter Values
  this.drawParamValues(param, rect.x + this.textPadding(), rect.y, width);
  // Draw Parameter Cost
  this.drawParamCost(param, rect.x + rect.width - width, rect.y, width);
};

Window_AllocationList.prototype.paramAllocationRate = function(param) {
  var a = 0;
  // Base
  if (param === 'mhp') var a = this._actor.getParamAllocateTimes(0);
  if (param === 'mmp') var a = this._actor.getParamAllocateTimes(1);
  if (param === 'atk') var a = this._actor.getParamAllocateTimes(2);
  if (param === 'def') var a = this._actor.getParamAllocateTimes(3);
  if (param === 'mat') var a = this._actor.getParamAllocateTimes(4);
  if (param === 'mdf') var a = this._actor.getParamAllocateTimes(5);
  if (param === 'agi') var a = this._actor.getParamAllocateTimes(6);
  if (param === 'luk') var a = this._actor.getParamAllocateTimes(7);
  // Extra
  if (param === 'hit') var a = this._actor.getXParamAllocateTimes(0);
  if (param === 'eva') var a = this._actor.getXParamAllocateTimes(1);
  if (param === 'cri') var a = this._actor.getXParamAllocateTimes(2);
  if (param === 'cev') var a = this._actor.getXParamAllocateTimes(3);
  if (param === 'mev') var a = this._actor.getXParamAllocateTimes(4);
  if (param === 'mrf') var a = this._actor.getXParamAllocateTimes(5);
  if (param === 'cnt') var a = this._actor.getXParamAllocateTimes(6);
  if (param === 'hrg') var a = this._actor.getXParamAllocateTimes(7);
  if (param === 'mrg') var a = this._actor.getXParamAllocateTimes(8);
  if (param === 'trg') var a = this._actor.getXParamAllocateTimes(9);
  // Special
  if (param === 'tgr') var a = this._actor.getSParamAllocateTimes(0);
  if (param === 'grd') var a = this._actor.getSParamAllocateTimes(1);
  if (param === 'rec') var a = this._actor.getSParamAllocateTimes(2);
  if (param === 'pha') var a = this._actor.getSParamAllocateTimes(3);
  if (param === 'mcr') var a = this._actor.getSParamAllocateTimes(4);
  if (param === 'tcr') var a = this._actor.getSParamAllocateTimes(5);
  if (param === 'pdr') var a = this._actor.getSParamAllocateTimes(6);
  if (param === 'mdr') var a = this._actor.getSParamAllocateTimes(7);
  if (param === 'fdr') var a = this._actor.getSParamAllocateTimes(8);
  if (param === 'exr') var a = this._actor.getSParamAllocateTimes(9);

  var b = 1;
  // Base
  if (param === 'mhp') var b = this._actor.getParamAllocateMax(0);
  if (param === 'mmp') var b = this._actor.getParamAllocateMax(1);
  if (param === 'atk') var b = this._actor.getParamAllocateMax(2);
  if (param === 'def') var b = this._actor.getParamAllocateMax(3);
  if (param === 'mat') var b = this._actor.getParamAllocateMax(4);
  if (param === 'mdf') var b = this._actor.getParamAllocateMax(5);
  if (param === 'agi') var b = this._actor.getParamAllocateMax(6);
  if (param === 'luk') var b = this._actor.getParamAllocateMax(7);
  // Extra
  if (param === 'hit') var b = this._actor.getXParamAllocateMax(0);
  if (param === 'eva') var b = this._actor.getXParamAllocateMax(1);
  if (param === 'cri') var b = this._actor.getXParamAllocateMax(2);
  if (param === 'cev') var b = this._actor.getXParamAllocateMax(3);
  if (param === 'mev') var b = this._actor.getXParamAllocateMax(4);
  if (param === 'mrf') var b = this._actor.getXParamAllocateMax(5);
  if (param === 'cnt') var b = this._actor.getXParamAllocateMax(6);
  if (param === 'hrg') var b = this._actor.getXParamAllocateMax(7);
  if (param === 'mrg') var b = this._actor.getXParamAllocateMax(8);
  if (param === 'trg') var b = this._actor.getXParamAllocateMax(9);
  // Special
  if (param === 'tgr') var b = this._actor.getSParamAllocateMax(0);
  if (param === 'grd') var b = this._actor.getSParamAllocateMax(1);
  if (param === 'rec') var b = this._actor.getSParamAllocateMax(2);
  if (param === 'pha') var b = this._actor.getSParamAllocateMax(3);
  if (param === 'mcr') var b = this._actor.getSParamAllocateMax(4);
  if (param === 'tcr') var b = this._actor.getSParamAllocateMax(5);
  if (param === 'pdr') var b = this._actor.getSParamAllocateMax(6);
  if (param === 'mdr') var b = this._actor.getSParamAllocateMax(7);
  if (param === 'fdr') var b = this._actor.getSParamAllocateMax(8);
  if (param === 'exr') var b = this._actor.getSParamAllocateMax(9);
  return a / b;
};

Window_AllocationList.prototype.getParamAutoName = function(param) {
  // Basic
  if (param === 'mhp') return TextManager.param(0);
  if (param === 'mmp') return TextManager.param(1);
  if (param === 'atk') return TextManager.param(2);
  if (param === 'def') return TextManager.param(3);
  if (param === 'mat') return TextManager.param(4);
  if (param === 'mdf') return TextManager.param(5);
  if (param === 'agi') return TextManager.param(6);
  if (param === 'luk') return TextManager.param(7);
  // Extra
  if (param === 'hit') return 'Physical Hit Rate';
  if (param === 'eva') return 'Physical Evasion Rate';
  if (param === 'cri') return 'Critical Hit Rate';
  if (param === 'cev') return 'Critical Evasion';
  if (param === 'mev') return 'Magical Evasion';
  if (param === 'mrf') return 'Magical Reflection';
  if (param === 'cnt') return 'Counterattack';
  if (param === 'hrg') return 'HP Regeneration';
  if (param === 'mrg') return 'MP Regeneration';
  if (param === 'trg') return 'TP Regeneration';
  // Special
  if (param === 'tgr') return 'Target Rate';
  if (param === 'grd') return 'Guard Power';
  if (param === 'rec') return 'Recovery';
  if (param === 'pha') return 'Item Effect';
  if (param === 'mcr') return 'MP Cost';
  if (param === 'tcr') return 'TP Charge';
  if (param === 'pdr') return 'Physical Damage Received';
  if (param === 'mdr') return 'Magical Damage Received';
  if (param === 'fdr') return 'Floor Damage Received';
  if (param === 'exr') return 'EXP Multiplier';
  return '';
};

Window_AllocationList.prototype.getParamValue = function(param) {
  // Basic
  if (param === 'mhp') return this._actor.mhp;
  if (param === 'mmp') return this._actor.mmp;
  if (param === 'atk') return this._actor.atk;
  if (param === 'def') return this._actor.def;
  if (param === 'mat') return this._actor.mat;
  if (param === 'mdf') return this._actor.mdf;
  if (param === 'agi') return this._actor.agi;
  if (param === 'luk') return this._actor.luk;
  // Extra
  if (param === 'hit') return this._actor.hit;
  if (param === 'eva') return this._actor.eva;
  if (param === 'cri') return this._actor.cri;
  if (param === 'cev') return this._actor.cev;
  if (param === 'mev') return this._actor.mev;
  if (param === 'mrf') return this._actor.mrf;
  if (param === 'cnt') return this._actor.cnt;
  if (param === 'hrg') return this._actor.hrg;
  if (param === 'mrg') return this._actor.mrg;
  if (param === 'trg') return this._actor.trg;
  // Special
  if (param === 'tgr') return this._actor.tgr;
  if (param === 'grd') return this._actor.grd;
  if (param === 'rec') return this._actor.rec;
  if (param === 'pha') return this._actor.pha;
  if (param === 'mcr') return this._actor.mcr;
  if (param === 'tcr') return this._actor.tcr;
  if (param === 'pdr') return this._actor.pdr;
  if (param === 'mdr') return this._actor.mdr;
  if (param === 'fdr') return this._actor.fdr;
  if (param === 'exr') return this._actor.exr;
  return 0;
};

Window_AllocationList.prototype.isFlatParam = function(param) {
  var params = ['mhp','mmp','atk','def','mat','mdf','agi','luk'];
  return params.contains(param);
};

Window_AllocationList.prototype.drawParamName = function(param, x, y, width) {
  var data = this.paramData(param);
  if (data.iconIndex > 0) {
    this.drawIcon(data.iconIndex, x, y + 2);
    x += Window_Base._iconWidth + 4;
  }
  var name = data.name;
  if (name === 'auto') name = this.getParamAutoName(param);
  this.changeTextColor(this.systemColor());
  this.drawText(name, x, y, width - x);
};

Window_AllocationList.prototype.drawParamValues = function(param, x, y, width) {
  width -= this.textPadding();
  $gameTemp._ignoreStatAllocations = true;
  var bonus = this.getParamValue(param);
  $gameTemp._ignoreStatAllocations = false;
  var full = this.getParamValue(param);
  bonus = full - bonus;
  if (this.isFlatParam(param)) {
    var bonusText = Yanfly.Util.toGroup(bonus);
    var fullText = Yanfly.Util.toGroup(full);
  } else {
    var bonusText = (bonus * 100).toFixed(1) + '%';
    var fullText = (full * 100).toFixed(1) + '%';
  }
  if (bonus >= 0) {
    bonusText = '(+' + bonusText + ')';
  } else {
    bonusText = '(' + bonusText + ')';
  }
  this.changeTextColor(this.powerUpColor());
  this.drawText(bonusText, x, y, width, 'right');
  width -= this._bonusWidth;
  this.changeTextColor(this.normalColor());
  this.drawText(fullText, x, y, width, 'right');

};

Window_AllocationList.prototype.drawParamCost = function(param, x, y, width) {
  this.resetFontSettings();
  width -= this.textPadding();
  this.changePaintOpacity(this.isParamEnabled(param));
  width = this.drawItemCost(param, x, y, width);
  width = this.drawJpCost(param, x, y, width);
  width = this.drawCostAp(param, x, y, width);
};

Window_AllocationList.prototype.drawItemCost = function(param, x, y, width) {
  var data = this.paramData(param);
  if (data.itemId <= 0) return width;
  var item = $dataItems[data.itemId];
  if (!item) return width;
  var params = ['mhp','mmp','atk','def','mat','mdf','agi','luk'];
  var xparams = ['hit','eva','cri','cev','mev','mrf','cnt','hrg','mrg','trg'];
  var sparams = ['tgr','grd','rec','pha','mcr','tcr','pdr','mdr','fdr','exr'];
  if (params.contains(param)) {
    var paramId = params.indexOf(param);
    var times = this._actor.getParamAllocateTimes(paramId);
  } else if (xparams.contains(param)) {
    var paramId = xparams.indexOf(param);
    var times = this._actor.getXParamAllocateTimes(paramId);
  } else if (sparams.contains(param)) {
    var paramId = sparams.indexOf(param);
    var times = this._actor.getSParamAllocateTimes(paramId);
  } else {
    return width;
  }
  var itemCost = data.itemCost.call(this, times);
  if (itemCost <= 0) return width;
  if (itemCost > $gameParty.numItems(item)) {
    var fmt = '×\\c[25]%1\\c[0]/%2';
  } else {
    var fmt = '×%1/%2';
  }
  var amount = Yanfly.Util.toGroup($gameParty.numItems(item));
  var total = fmt.format(Yanfly.Util.toGroup(itemCost), amount);
  var text = total;
  if (item.iconIndex > 0) text += '\\i[' + item.iconIndex + ']';
  if (Yanfly.Param.StatAlcSmItemName) {
    text += '\\}' + item.name + '\\{';
  } else {
    text += item.name;
  }
  var textWidth = this.textWidthEx(text);
  x = x + width - textWidth;
  this.drawTextEx(text, x, y);
  width -= textWidth + this.textPadding();
  return width;
};

Window_AllocationList.prototype.drawJpCost = function(param, x, y, width) {
  if (!Imported.YEP_JobPoints) return width;
  var params = ['mhp','mmp','atk','def','mat','mdf','agi','luk'];
  var xparams = ['hit','eva','cri','cev','mev','mrf','cnt','hrg','mrg','trg'];
  var sparams = ['tgr','grd','rec','pha','mcr','tcr','pdr','mdr','fdr','exr'];
  if (params.contains(param)) {
    var paramId = params.indexOf(param);
    var times = this._actor.getParamAllocateTimes(paramId);
  } else if (xparams.contains(param)) {
    var paramId = xparams.indexOf(param);
    var times = this._actor.getXParamAllocateTimes(paramId);
  } else if (sparams.contains(param)) {
    var paramId = sparams.indexOf(param);
    var times = this._actor.getSParamAllocateTimes(paramId);
  } else {
    return width;
  }
  var jpCost = this.paramData(param).jpCost.call(this, times);
  if (jpCost <= 0) return width;
  var icon = '\\i[' + Yanfly.Icon.Jp + ']';
  var fmt = Yanfly.Param.JpMenuFormat;
  if (jpCost > this._actor.jp()) {
    var fmt2 = '\\c[25]%1\\c[0]/%2';
  } else {
    var fmt2 = '%1/%2';
  }
  var amount = Yanfly.Util.toGroup(this._actor.jp());
  var total = fmt2.format(Yanfly.Util.toGroup(jpCost), amount);
  var text = fmt.format(total, Yanfly.Param.Jp, icon);
  var textWidth = this.textWidthEx(text);
  x = x + width - textWidth;
  this.drawTextEx(text, x, y);
  width -= textWidth + this.textPadding();
  return width;
};

Window_AllocationList.prototype.drawCostAp = function(param, x, y, width) {
  var params = ['mhp','mmp','atk','def','mat','mdf','agi','luk'];
  var xparams = ['hit','eva','cri','cev','mev','mrf','cnt','hrg','mrg','trg'];
  var sparams = ['tgr','grd','rec','pha','mcr','tcr','pdr','mdr','fdr','exr'];
  if (params.contains(param)) {
    var paramId = params.indexOf(param);
    var times = this._actor.getParamAllocateTimes(paramId);
  } else if (xparams.contains(param)) {
    var paramId = xparams.indexOf(param);
    var times = this._actor.getXParamAllocateTimes(paramId);
  } else if (sparams.contains(param)) {
    var paramId = sparams.indexOf(param);
    var times = this._actor.getSParamAllocateTimes(paramId);
  } else {
    return width;
  }
  var apCost = this.paramData(param).apCost.call(this, times);
  if (apCost <= 0) return width;
  var fmt = Yanfly.Param.StatAlcAPAmtFmt;
  if (apCost > this._actor.availableAp()) {
    var fmt2 = '\\c[25]%1\\c[0]/%2';
  } else {
    var fmt2 = '%1/%2';
  }
  var amount = Yanfly.Util.toGroup(this._actor.availableAp());
  var total = fmt2.format(Yanfly.Util.toGroup(apCost), amount);
  var apText = TextManager.ap();
  var apIcon = '\\i[' + Yanfly.Param.StatAlcAPIcon + ']';
  var text = fmt.format(total, apText, apIcon);
  var textWidth = this.textWidthEx(text);
  x = x + width - textWidth;
  this.drawTextEx(text, x, y);
  width -= textWidth + this.textPadding();
  return width;
};

if (Yanfly.Param.StatAlcLfRt) {

Window_AllocationList.prototype.cursorRight = function(wrap) {
  if (!this.isCommandEnabled(this.index())) return;
  this.processOk();
};

Window_AllocationList.prototype.cursorLeft = function(wrap) {
  if (!this._actor) return;
  var param = this.currentExt();
  var params = ['mhp','mmp','atk','def','mat','mdf','agi','luk'];
  var xparams = ['hit','eva','cri','cev','mev','mrf','cnt','hrg','mrg','trg'];
  var sparams = ['tgr','grd','rec','pha','mcr','tcr','pdr','mdr','fdr','exr'];
  if (params.contains(param)) {
    var paramId = params.indexOf(param);
    var times = this._actor.getParamAllocateTimes(paramId);
  } else if (xparams.contains(param)) {
    var paramId = xparams.indexOf(param);
    var times = this._actor.getXParamAllocateTimes(paramId);
  } else if (sparams.contains(param)) {
    var paramId = sparams.indexOf(param);
    var times = this._actor.getSParamAllocateTimes(paramId);
  } else {
    return;
  }
  if (times <= 0) return;
  times -= 1;
  if (params.contains(param)) {
    this._actor.gainParamAllocateTimes(paramId, -1);
  } else if (xparams.contains(param)) {
    this._actor.gainXParamAllocateTimes(paramId, -1);
  } else if (sparams.contains(param)) {
    this._actor.gainSParamAllocateTimes(paramId, -1);
  }
  var data = Yanfly.Param.StatAlcParamSettings[param];
  var apCost = data.apCost.call(this, times);
  this._actor.spendAp(-apCost);
  if (Imported.YEP_JobPoints) {
    var jp = data.jpCost.call(this, times);
    this._actor.gainJp(jp);
  }
  if (data.itemId > 0) {
    var item = $dataItems[data.itemId];
    var cost = data.itemCost.call(this, times);
    $gameParty.gainItem(item, cost);
  }
  if (param === 'mhp' || param === 'mmp') {
    this._actor._hp = Math.min(this._actor._hp, this._actor.mhp);
    this._actor._mp = Math.min(this._actor._mp, this._actor.mmp);
  }
  SoundManager.playCancel();
  SceneManager._scene.refreshWindows();
};

}; // Yanfly.Param.StatAlcLfRt

//=============================================================================
// Window_AllocationRevert
//=============================================================================

function Window_AllocationRevert() {
  this.initialize.apply(this, arguments);
}

Window_AllocationRevert.prototype = Object.create(Window_Command.prototype);
Window_AllocationRevert.prototype.constructor = Window_AllocationRevert;

Window_AllocationRevert.prototype.initialize = function() {
  this._lines = Yanfly.Param.StatAlcRevConfirmText.split('\n').length;
  this._lines += 2;
  Window_Command.prototype.initialize.call(this, 0, 0);
  this.refresh();
  this.deactivate();
  this.x = Math.ceil((Graphics.boxWidth - this.width) / 2);
  this.y = Math.ceil((Graphics.boxHeight - this.height) / 2);
  this.openness = 0;
};

Window_AllocationRevert.prototype.windowWidth = function() {
  return Yanfly.Param.StatAlcRevWinWidth;
};

Window_AllocationRevert.prototype.itemTextAlign = function() {
  return 'center';
};

Window_AllocationRevert.prototype.numVisibleRows = function() {
  return this._lines;
};

Window_AllocationRevert.prototype.itemRect = function(index) {
  var rect = new Rectangle();
  var maxCols = this.maxCols();
  rect.width = this.itemWidth();
  rect.height = this.itemHeight();
  rect.x = index % maxCols * (rect.width + this.spacing()) - this._scrollX;
  rect.y = (this._lines - 2 + index) * this.lineHeight();
  return rect;
};

Window_AllocationRevert.prototype.makeCommandList = function() {
  this.addCommand(Yanfly.Param.StatAlcRevYes, 'revertYes', true);
  this.addCommand(Yanfly.Param.StatAlcRevNo, 'cancel', true);
};

Window_AllocationRevert.prototype.refresh = function() {
  Window_Command.prototype.refresh.call(this);
  this.drawTextEx(Yanfly.Param.StatAlcRevConfirmText, this.textPadding(), 0);
};

//=============================================================================
// Scene_Menu
//=============================================================================

Yanfly.StatAlc.Scene_Menu_createCommandWindow =
  Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
  Yanfly.StatAlc.Scene_Menu_createCommandWindow.call(this);
  this._commandWindow.setHandler('statAllocate',
    this.commandPersonal.bind(this));
};

Yanfly.StatAlc.Scene_Menu_onPersonalOk = Scene_Menu.prototype.onPersonalOk;
Scene_Menu.prototype.onPersonalOk = function() {
  if (this._commandWindow.currentSymbol() === 'statAllocate') {
    SceneManager.push(Scene_StatAllocation);
  } else {
    Yanfly.StatAlc.Scene_Menu_onPersonalOk.call(this);
  }
};

//=============================================================================
// Scene_StatAllocation
//=============================================================================

function Scene_StatAllocation() {
  this.initialize.apply(this, arguments);
}

Scene_StatAllocation.prototype = Object.create(Scene_MenuBase.prototype);
Scene_StatAllocation.prototype.constructor = Scene_StatAllocation;

Scene_StatAllocation.prototype.initialize = function() {
  Scene_MenuBase.prototype.initialize.call(this);
};

Scene_StatAllocation.prototype.create = function() {
  Scene_MenuBase.prototype.create.call(this);
  this.createHelpWindow();
  this.createCommandWindow();
  this.createStatusWindow();
  this.createAllocationWindow();
  this.createRevertWindow();
  this.refreshActor();
};

Scene_StatAllocation.prototype.createCommandWindow = function() {
  this._commandWindow = new Window_StatAllocationCommand();
  var win = this._commandWindow;
  win.y = this._helpWindow.height;
  win.setHandler('pagedown', this.nextActor.bind(this));
  win.setHandler('pageup', this.previousActor.bind(this));
  win.setHandler('cancel', this.commandCancel.bind(this));
  win.setHandler('allocate', this.commandAllocate.bind(this));
  win.setHandler('revert', this.commandRevert.bind(this));
  this.addWindow(win);
};

Scene_StatAllocation.prototype.createStatusWindow = function() {
  var wx = this._commandWindow.width;
  var wy = this._helpWindow.height;
  var ww = Graphics.boxWidth - wx;
  var wh = this._commandWindow.height;
  this._statusWindow = new Window_SkillStatus(wx, wy, ww, wh);
  this.addWindow(this._statusWindow);
};

Scene_StatAllocation.prototype.createAllocationWindow = function() {
  var y = this._commandWindow.y + this._commandWindow.height;
  this._allocationWindow = new Window_AllocationList(0, y);
  var win = this._allocationWindow;
  win.setHelpWindow(this._helpWindow);
  win.setHandler('cancel', this.onAllocationCancel.bind(this));
  win.setHandler('param', this.onAllocationParam.bind(this));
  win.setHandler('xparam', this.onAllocationParam.bind(this));
  win.setHandler('sparam', this.onAllocationParam.bind(this));
  this.addWindow(win);
};

Scene_StatAllocation.prototype.refreshActor = function() {
  this.actor().refresh();
  var actor = this.actor();
  actor.refresh();
  this._commandWindow.refresh();
  this._statusWindow.setActor(actor);
  this._allocationWindow.setActor(actor);
};

Scene_StatAllocation.prototype.refreshWindows = function() {
  this._commandWindow.refresh();
  this._statusWindow.refresh();
  this._allocationWindow.refresh();
};

Scene_StatAllocation.prototype.onActorChange = function() {
  this.refreshActor();
  this._commandWindow.activate();
};

Scene_StatAllocation.prototype.commandCancel = function() {
  this._actor.refresh();
  this.popScene();
};

Scene_StatAllocation.prototype.commandAllocate = function() {
  this._allocationWindow.activate();
};

Scene_StatAllocation.prototype.onAllocationCancel = function() {
  this._commandWindow.activate();
  this._allocationWindow.deselect();
  this._helpWindow.clear();
};

Scene_StatAllocation.prototype.onAllocationParam = function() {
  this.processAllocationCost();
  if (this._allocationWindow.currentSymbol() === 'param') {
    this.processAllocateParam();
  } else if (this._allocationWindow.currentSymbol() === 'xparam') {
    this.processAllocateXParam();
  } else if (this._allocationWindow.currentSymbol() === 'sparam') {
    this.processAllocateSParam();
  }
};

Scene_StatAllocation.prototype.processAllocationCost = function() {
  var param = this._allocationWindow.currentExt();
  var data = this._allocationWindow.paramData(param);
  this.processAllocationCostAp(param, data);
  this.processAllocationCostJp(param, data);
  this.processAllocationCostItems(param, data);
};

Scene_StatAllocation.prototype.processAllocationCostAp = function(param, data) {
  var params = ['mhp','mmp','atk','def','mat','mdf','agi','luk'];
  var xparams = ['hit','eva','cri','cev','mev','mrf','cnt','hrg','mrg','trg'];
  var sparams = ['tgr','grd','rec','pha','mcr','tcr','pdr','mdr','fdr','exr'];
  if (params.contains(param)) {
    var paramId = params.indexOf(param);
    var times = this._actor.getParamAllocateTimes(paramId);
  } else if (xparams.contains(param)) {
    var paramId = xparams.indexOf(param);
    var times = this._actor.getXParamAllocateTimes(paramId);
  } else if (sparams.contains(param)) {
    var paramId = sparams.indexOf(param);
    var times = this._actor.getSParamAllocateTimes(paramId);
  } else {
    return;
  }
  var apCost = data.apCost.call(this, times);
  if (apCost <= 0) return;
  this._actor.spendAp(apCost);
};

Scene_StatAllocation.prototype.processAllocationCostJp = function(param, data) {
  var params = ['mhp','mmp','atk','def','mat','mdf','agi','luk'];
  var xparams = ['hit','eva','cri','cev','mev','mrf','cnt','hrg','mrg','trg'];
  var sparams = ['tgr','grd','rec','pha','mcr','tcr','pdr','mdr','fdr','exr'];
  if (params.contains(param)) {
    var paramId = params.indexOf(param);
    var times = this._actor.getParamAllocateTimes(paramId);
  } else if (xparams.contains(param)) {
    var paramId = xparams.indexOf(param);
    var times = this._actor.getXParamAllocateTimes(paramId);
  } else if (sparams.contains(param)) {
    var paramId = sparams.indexOf(param);
    var times = this._actor.getSParamAllocateTimes(paramId);
  } else {
    return;
  }
  var jpCost = data.jpCost.call(this, times);
  if (jpCost <= 0) return;
  this._actor.gainJp(-jpCost);
};

Scene_StatAllocation.prototype.processAllocationCostItems = 
function(param, data) {
  var itemId = data.itemId;
  if (itemId <= 0) return;
  var item = $dataItems[itemId];
  if (!item) return;
  var params = ['mhp','mmp','atk','def','mat','mdf','agi','luk'];
  var xparams = ['hit','eva','cri','cev','mev','mrf','cnt','hrg','mrg','trg'];
  var sparams = ['tgr','grd','rec','pha','mcr','tcr','pdr','mdr','fdr','exr'];
  if (params.contains(param)) {
    var paramId = params.indexOf(param);
    var times = this._actor.getParamAllocateTimes(paramId);
  } else if (xparams.contains(param)) {
    var paramId = xparams.indexOf(param);
    var times = this._actor.getXParamAllocateTimes(paramId);
  } else if (sparams.contains(param)) {
    var paramId = sparams.indexOf(param);
    var times = this._actor.getSParamAllocateTimes(paramId);
  } else {
    return;
  }
  var itemCost = data.itemCost.call(this, times);
  if (itemCost <= 0) return;
  $gameParty.loseItem(item, itemCost);
};

Scene_StatAllocation.prototype.processAllocateParam = function() {
  var param = this._allocationWindow.currentExt();
  var params = ['mhp','mmp','atk','def','mat','mdf','agi','luk'];
  var paramId = params.indexOf(param);
  var maxHp = this._actor.mhp;
  var maxMp = this._actor.mmp;
  this._actor.gainParamAllocateTimes(paramId, 1);
  var hpGain = this._actor.mhp - maxHp;
  var mpGain = this._actor.mmp - maxMp;
  this._actor._hp += hpGain;
  this._actor._mp += mpGain;
  this._allocationWindow.activate();
  this.refreshWindows();
};

Scene_StatAllocation.prototype.processAllocateXParam = function() {
  var param = this._allocationWindow.currentExt();
  var params = ['hit','eva','cri','cev','mev','mrf','cnt','hrg','mrg','trg'];
  var paramId = params.indexOf(param);
  this._actor.gainXParamAllocateTimes(paramId, 1);
  this._allocationWindow.activate();
  this.refreshWindows();
};

Scene_StatAllocation.prototype.processAllocateSParam = function() {
  var param = this._allocationWindow.currentExt();
  var params = ['tgr','grd','rec','pha','mcr','tcr','pdr','mdr','fdr','exr'];
  var paramId = params.indexOf(param);
  this._actor.gainSParamAllocateTimes(paramId, 1);
  this._allocationWindow.activate();
  this.refreshWindows();
};

Scene_StatAllocation.prototype.createRevertWindow = function() {
  this._revertWindow = new Window_AllocationRevert();
  this.addChild(this._revertWindow);
  var win = this._revertWindow;
  win.setHandler('cancel', this.onRevertCancel.bind(this));
  win.setHandler('revertYes', this.onRevertConfirm.bind(this));
};

Scene_StatAllocation.prototype.commandRevert = function() {
  this._revertWindow.activate();
  this._revertWindow.select(0);
  this._revertWindow.open();
};

Scene_StatAllocation.prototype.onRevertCancel = function() {
  this._revertWindow.close();
  this._commandWindow.activate();
};

Scene_StatAllocation.prototype.onRevertConfirm = function() {
  this.processRevertAllParams();
  this._revertWindow.close();
  this._commandWindow.activate();
  this._commandWindow.select(0);
  this.refreshWindows();
};

Scene_StatAllocation.prototype.processRevertAllParams = function() {
  var params = ['mhp','mmp','atk','def','mat','mdf','agi','luk'];
  var xparams = ['hit','eva','cri','cev','mev','mrf','cnt','hrg','mrg','trg'];
  var sparams = ['tgr','grd','rec','pha','mcr','tcr','pdr','mdr','fdr','exr'];
  var allParams = params.concat(xparams).concat(sparams);
  var length = allParams.length;
  for (var i = 0; i < length; ++i) {
    var param = allParams[i];
    this.processRevertParam(param);
  }
};

Scene_StatAllocation.prototype.processRevertParam = function(param) {
  var params = ['mhp','mmp','atk','def','mat','mdf','agi','luk'];
  var xparams = ['hit','eva','cri','cev','mev','mrf','cnt','hrg','mrg','trg'];
  var sparams = ['tgr','grd','rec','pha','mcr','tcr','pdr','mdr','fdr','exr'];
  // Identify Basic Variables
  if (params.contains(param)) {
    var paramId = params.indexOf(param);
    var times = this._actor.getParamAllocateTimes(paramId);
  } else if (xparams.contains(param)) {
    var paramId = xparams.indexOf(param);
    var times = this._actor.getXParamAllocateTimes(paramId);
  } else if (sparams.contains(param)) {
    var paramId = sparams.indexOf(param);
    var times = this._actor.getSParamAllocateTimes(paramId);
  } else {
    return;
  }
  // Loop through all times and their costs
  var jp = 0;
  var items = {};
  while (times > 0) {
    times -= 1;
    if (params.contains(param)) {
      this._actor.gainParamAllocateTimes(paramId, -1);
    } else if (xparams.contains(param)) {
      this._actor.gainXParamAllocateTimes(paramId, -1);
    } else if (sparams.contains(param)) {
      this._actor.gainSParamAllocateTimes(paramId, -1);
    }
    var data = Yanfly.Param.StatAlcParamSettings[param];
    var apCost = data.apCost.call(this, times);
    this._actor.spendAp(-apCost);
    if (Imported.YEP_JobPoints) {
      jp += data.jpCost.call(this, times);
    }
    if (data.itemId > 0) {
      items[data.itemId] = items[data.itemId] || 0;
      items[data.itemId] += data.itemCost.call(this, times);
    }
  }
  // Return consumed resources
  if (Imported.YEP_JobPoints) this._actor.gainJp(jp);
  for (var key in items) {
    var item = $dataItems[key];
    var amount = items[key];
    $gameParty.gainItem(item, amount);
  }
  if (param === 'mhp' || param === 'mmp') {
    this._actor._hp = Math.min(this._actor._hp, this._actor.mhp);
    this._actor._mp = Math.min(this._actor._mp, this._actor.mmp);
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

}; // Yanfly.Util.toGroup

//=============================================================================
// End of File
//=============================================================================