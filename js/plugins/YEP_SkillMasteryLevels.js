//=============================================================================
// Yanfly Engine Plugins - Skill Mastery Levels
// YEP_SkillMasteryLevels.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_SkillMasteryLevels = true;

var Yanfly = Yanfly || {};
Yanfly.SkillMastery = Yanfly.SkillMastery || {};
Yanfly.SkillMastery.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc v1.00 技能熟练度
 * improves, skill costs drop and/or skill damage rises!
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * 正式介绍
 * ============================================================================
 *
 * 注意:如果你使用的是YEP _ SkillCore.js和/或YEP _ X _ SkillCooldowns.js，
 * 把这个插件放在插件管理器列表的下面。
 * 这个插件独立于那些插件工作，
 * 但是如果按照这个特定的顺序放置的话会更好。
 *
 * 在一些RPG游戏中，反复使用技能会导致某种形
 * 式的技能掌握，有效地增加伤害输出，降低所述技能的
 * 成本，和/或降低技能的冷却时间。这个插件可以让你通
 * 过增加一个技能精通等级来完成这个目的。
 *
 * 技能掌握水平机制是这样工作的:当一个角色或敌人在战
 * 斗中使用一项技能时，他们获得了技能掌握经验。一旦
 * 掌握经验值达到一定的阈值，该技能的掌握程度将会增
 * 加，从而获得想要的掌握效果，这可以是增加伤害、降
 * 低技能成本或减少冷却时间。这些方面中的每一个都可
 * 以根据每一级所需的经验公式进行整体或单独调整，直
 * 到伤害增加、成本改变或冷却持续时间。
 *
 * ============================================================================
 * 注释标记
 * ============================================================================
 *
 * 要确定技能掌握程度的效果或其他各种与掌握程度相关
 * 的属性，请使用以下这些技能的注释标签:
 *
 * ---
 *
 * 技能注释标签:
 *
 *   <Max Mastery Level: x>
 *   - 将“x”替换为您希望技能拥有的最高精通级别。
 *   如果你根本不想让技能有什么精通水平，那就换成0。
 *
 *   <Mastery Effect: +x Damage Per Level>
 *   <Mastery Effect: +x HP Cost Per Level>
 *   <Mastery Effect: +x MP Cost Per Level>
 *   <Mastery Effect: +x TP Cost Per Level>
 *   <Mastery Effect: +x Cooldown Per Level>
 *   <Mastery Effect: -x Damage Per Level>
 *   <Mastery Effect: -x HP Cost Per Level>
 *   <Mastery Effect: -x MP Cost Per Level>
 *   <Mastery Effect: -x TP Cost Per Level>
 *   <Mastery Effect: -x Cooldown Per Level>
 *   - 这将根据技能的掌握程度分别增加或减少技能的伤害、
 *   生命值消耗、MP消耗、TP消耗、冷却回合。
 *   根据技能的掌握程度，
 *   用你希望它移动多少的固定数值来替换“x”。
 *   - 注意: HP Cost需要YEP_SkillCore.js.
 *   - 注意: 冷却需要YEP_X_SkillCooldowns.
 *
 *   <Mastery Effect: +x% Damage Per Level>
 *   <Mastery Effect: +x% HP Cost Per Level>
 *   <Mastery Effect: +x% MP Cost Per Level>
 *   <Mastery Effect: +x% TP Cost Per Level>
 *   <Mastery Effect: +x% Cooldown Per Level>
 *   <Mastery Effect: -x% Damage Per Level>
 *   <Mastery Effect: -x% HP Cost Per Level>
 *   <Mastery Effect: -x% MP Cost Per Level>
 *   <Mastery Effect: -x% TP Cost Per Level>
 *   <Mastery Effect: -x% Cooldown Per Level>
 *   - 这将根据技能的掌握程度分别增加或减少技能的伤害、
 *   生命值消耗、MP消耗、TP消耗、冷却回合。
 *   根据技能的掌握程度，
 *   用百分比数值替换“x”。
 *   - 注意: HP Cost需要YEP_SkillCore.js.
 *   - 注意: 冷却需要 YEP_X_SkillCooldowns.
 *
 *   <No Damage Mastery Effect>
 *   <No HP Cost Mastery Effect>
 *   <No MP Cost Mastery Effect>
 *   <No TP Cost Mastery Effect>
 *   <No Cooldown Mastery Effect>
 *   - 这些笔记标签将从默认设置中禁用它们各自的掌握效果。
 *   它们的默认值将保持不变。
 *   ...
 *   - 注意: HP Cost需要YEP_SkillCore.js.
 *   - 注意: 冷却需要 YEP_X_SkillCooldowns.
 *
 *   <Custom EXP Mastery Formula: x>
 *   - 为技能定制一个经验掌握公式。
 *   用您希望使用的公式替换“x”。
 *   - 例子: <Custom EXP Mastery Formula: level * 20 + 5>
 *
 *   <Custom Damage Mastery Formula: x>
 *   - 为技能定制伤害掌握公式。
 *   用您希望使用的公式替换“x”。
 *   - 例子: <Custom Damage Mastery Formula: value * (1.00 + (level * 0.20))>
 *
 *   <Custom HP Cost Mastery Formula: x>
 *   - 为技能定制一个HP成本控制公式。
 *   。用您希望使用的公式替换“x”。
 *   - 例子: <Custom HP Cost Mastery Formula: cost * (1.00 - (level * 0.05))>
 *   - Note: HP Cost requires YEP_SkillCore.js.
 *
 *   <Custom MP Cost Mastery Formula: x>
 *   - 为技能定制MP费用掌握公式。
 *   用您希望使用的公式替换“x”。
 *   - 例子: <Custom MP Cost Mastery Formula: cost * (1.00 - (level * 0.05))>
 *
 *   <Custom TP Cost Mastery Formula: x>
 *   - 为技能定制一个TP费用掌握公式。
 *   用您希望使用的公式替换“x”。
 *   - 例子: <Custom TP Cost Mastery Formula: cost * (1.00 - (level * 0.05))>
 *
 *   <Custom Cooldown Mastery Formula: x>
 *   - 为技能定制一个冷却精通公式。
 *   将“x”替换为您希望使用的公式。
 *   - 例子: <Custom Cooldown Mastery Formula: turns - (level * 1.5)>
 *
 * ---
 *
 * 角色和敌人标签:
 *
 *   <Starting Skill Masteries>
 *    list
 *    list
 *    list
 *   </Starting Skill Masteries>
 *   - 如果你希望角色和/或敌人有初始的技能掌握水平，
 *   使用上面的注释标签。
 *   这将只适用于角色在开始一个新游戏或初始化他们。
 *   用以下设置之一替换“list”:
 *
 *   Skill x: level
 *   Skill x: level, exp
 *   name: level
 *   name: level, exp
 *   - 将“x”替换为您希望改变其初始掌握水平的技能的ID。
 *   或者，您可以将'Skill x'替换为技能'name'.
 *   如果多个技能在数据库中具有相同的名称，
 *   这将应用于具有该名称的第一个技能条目。
 *   - 用您希望开始的级别替换'level'
 *   这不能低于0，也不能高于技能的最高水平。
 *   - 如果使用，将'exp'替换为当前开始时的EXP值。
 *   这不能大于或等于技能掌握级别的EXP的最大值。
 *   如果不使用，将默认为0。
 *
 *   Example:
 *
 *   <Starting Skill Masteries>
 *    Skill 5: 2
 *    Skill 6: 3, 4
 *    Firaga: 7
 *    Firaja: 8, 10
 *   </Starting Skill Masteries>
 *   - 在上面的例子中，角色/敌人将分别从2级和3级开始拥有技能5和6。
 *   然而，技能6从4开始也会有一些技能EXP。
 *   角色/敌人的'Firaga'和'Firaja'技能将分别从7级和8级开始，
 *   而'Firaja'将在一开始就有10个技能经验值。
 *   ...
 *
 * ---
 *
 * ============================================================================
 * 脚本调用
 * ============================================================================
 *
 * 对于那些有JavaScript经验的人，您可以使用以下脚本
 * 调用来引用或更改技能掌握水平，以满足您的喜好:
 *
 * 脚本调用:
 *
 *   battler.skillMasteryLevel(skillId)
 *   - 'battler'是一个代表角色/敌人的变量。将'skillId'
 *   将'skillId'替换为您希望获得其掌握水平的技能的ID。
 *   这将返回该技能的熟练度。
 *
 *   battler.setSkillMasteryLevel(skillId, level)
 *   - 'battler'是一个代表角色/敌人的变量。将'skillId'
 *   将'skillId'替换为您希望改变其熟练度的技能的ID。
 *   将'level'替换为您希望设置的技能等级。
 *   这将不允许技能熟练级别低于0或高于其最大级别，
 *   并且该级别的使用次数将设置为0。
 *
 *   battler.gainSkillMasteryLevel(skillId, value)
 *   - 是一个代表角色/敌人的变量。
 *   将'替换为您希望提高其熟练度的技能的ID。
 *   将'value'替换为增加(或减少)
 *   技能当前熟练度的等级数量。
 *
 *   battler.skillMasteryUses(skillId)
 *   - 'battler'是一个代表角色/敌人的变量。
 *   将'skillId'替换为您希望获取其当前熟练使用量值的技能的ID。
 *   这将返回该技能的当前熟练使用量。
 *   ...
 *
 *   battler.setSkillMasteryUses(skillId, value)
 *   - 'battler'是一个代表角色/敌人的变量。
 *   将'skillId'替换为当前掌握使用量将被更改的技能的标识。
 *   将“'value'替换为要将金额设置为的金额。
 *   如果使用量超过了达到下一个级别的需要，技能会自动更新
 *   到下一个熟练级别，并将熟练使用量设置为0。
 *
 *   battler.gainSkillMasteryUses(skillId, value)
 *   - 'battler'是一个代表角色/敌人的变量。
 *   将'skillId'替换为当前掌握使用量将被更改的技能的标识。
 *   将'value'替换为要增加/减少的金额。
 *   如果使用量超过达到下一个等级的需要，技能会自动更新到下一个熟练等级
 *   并将熟练使用量设置为0。
 *
 * ============================================================================
 * Lunatic Mode - 需要YEP_SkillCore.js
 * ============================================================================
 *
 * 没有特定的技能熟练度lunatic笔记标签，
 * 但这部分帮助文件将作为一种手段
 * 来回答人们可能有的关于如何根据角色的熟练度
 * 添加特殊效果的潜在问题。
 *
 * 这些例子需要YEP _ SkillCore.js，因为它们使用Skill Core's lunatic
 * 标签来产生特殊效果。
 *
 * 技能注释标签示例:
 *
 * ---
 *
 * <After Eval>
 * if (user.skillMasteryLevel(item.id) >= 5) {
 *   target.addState(10);
 *   target.removeState(9);
 * }
 * <After Eval>
 *
 * 上面的代码将检查该角色当前对该技能的熟练度是否大
 * 于或等于5。如果是，那么数据库中的状态10也将应用
 * 于目标。但是，状态9将从目标中删除。
 * ...
 *
 * ---
 *
 * <After Eval>
 * if (user.skillMasteryLevel(item.id) >= 2) {
 *   user.addBuff(3, 5);
 *   user.addDebuff(5, 8);
 * }
 * <After Eval>
 *
 * 上面的代码将检查该角色当前对该技能的熟练度是否大
 * 于或等于2。如果是，那么用户将获得5回合的防御缓
 * 冲。然而，角色将在接下来的8个回合中承受
 * 负面状态和削弱效果。
 *
 * For reference on what the parameter ID's are:
 *
 * 0 = MaxHP
 * 1 = MaxMP
 * 2 = ATK
 * 3 = DEF
 * 4 = MAT
 * 5 = MDF
 * 6 = AGI
 * 7 = LUK
 *
 * ---
 *
 * <After Eval>
 * if (user.skillMasteryLevel(item.id) >= 3) {
 *   $gameTemp.reserveCommonEvent(5)
 * }
 * <After Eval>
 *
 * 上面的代码将检查该角色当前对该技能的熟练度是否大
 * 于或等于3。如果是，公共事件5将被保留，
 * 并在适用时运行。
 *
 * ---
 *
 * lunatic code使用方式有更多的可能性，不仅仅是这里列
 * 出的这些例子。 For some ideas, be sure to check out the Tips &
 * Tricks on Yanfly.moe.
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
 * @param ---Settings---
 * @default
 *
 * @param Default Max Mastery
 * @parent ---Settings---
 * @type number
 * @desc 技能的默认最高熟练度.
 * @default 10
 *
 * @param Level Formula
 * @parent ---Settings---
 * @type combo
 * @option 5  // 5 uses per mastery level
 * @option 10 // 10 uses per mastery level
 * @option 20 // 20 uses per mastery level
 * @option level * 5  // Increases by 5 each level
 * @option level * 10 // Increases by 10 each level
 * @option level * 20 // Increases by 20 each level
 * @desc 达到下一个技能熟练度之前所需的使用量。
 * level.   level: the target level to be reached
 * @default level * 5  // Increases by 5 each level
 *
 * @param Damage Formula
 * @parent ---Settings---
 * @type combo
 * @option value // no changes based on mastery level
 * @option value * (1.00 + (level * 0.05)) // +5% per level
 * @option value * (1.00 + (level * 0.10)) // +10% per level
 * @option value * (1.00 + (level * 0.20)) // +20% per level
 * @option value + (level * 1)  // +1 MP per level
 * @option value + (level * 5)  // +5 MP per level
 * @option value + (level * 10) // +10 MP per level
 * @desc 基于等级的伤害率。   value: original damage
 * level: the target level to be reached
 * @default value * (1.00 + (level * 0.20)) // +20% per level
 *
 * @param MP Cost Formula
 * @parent ---Settings---
 * @type combo
 * @option cost // no changes based on mastery level
 * @option cost * (1.00 - (level * 0.05)) // -5% per level
 * @option cost * (1.00 - (level * 0.10)) // -10% per level
 * @option cost * (1.00 - (level * 0.20)) // -20% per level
 * @option cost - (level * 1)  // -1 MP per level
 * @option cost - (level * 5)  // -5 MP per level
 * @option cost - (level * 10) // -10 MP per level
 * @desc 基于级别的MP成本。   cost: original cost
 * level: the target level to be reached
 * @default cost * (1.00 + (level * 0.10)) // -10% per level
 *
 * @param Minimum MP Cost
 * @parent MP Cost Formula
 * @desc 一个技能如果降低了的话，最小MP损耗是多少？
 * 如果技能没有MP损耗，这不适用。
 * @default 1
 *
 * @param TP Cost Formula
 * @parent ---Settings---
 * @type combo
 * @option cost // no changes based on mastery level
 * @option cost * (1.00 - (level * 0.05)) // -5% per level
 * @option cost * (1.00 - (level * 0.10)) // -10% per level
 * @option cost * (1.00 - (level * 0.20)) // -20% per level
 * @option cost - (level * 1)  // -1 TP per level
 * @option cost - (level * 5)  // -5 TP per level
 * @option cost - (level * 10) // -10 TP per level
 * @desc 基于等级的TP成本。   cost: original cost
 * level: the target level to be reached
 * @default cost * (1.00 + (level * 0.10)) // -10% per level
 *
 * @param Minimum TP Cost
 * @parent TP Cost Formula
 * @desc 如果一个技能被降低了，它的最小TP损耗是多少？
 * 如果技能没有TP损耗，这不适用。
 * @default 1
 *
 * @param (YEP_SkillCore)
 * @parent ---Settings---
 *
 * @param HP Cost Formula
 * @parent (YEP_SkillCore)
 * @type combo
 * @option cost // no changes based on mastery level
 * @option cost * (1.00 - (level * 0.05)) // -5% per level
 * @option cost * (1.00 - (level * 0.10)) // -10% per level
 * @option cost * (1.00 - (level * 0.20)) // -20% per level
 * @option cost - (level * 1)  // -1 HP per level
 * @option cost - (level * 5)  // -5 HP per level
 * @option cost - (level * 10) // -10 HP per level
 * @desc HP损耗基于级别。   cost: original cost
 * level: the target level to be reached
 * @default cost * (1.00 + (level * 0.10)) // -10% per level
 *
 * @param Minimum HP Cost
 * @parent HP Cost Formula
 * @desc 如果一个技能被降低，它的最小生命值损耗是多少？
 * 如果该技能没有HP损耗，则不适用。
 * @default 1
 *
 * @param (YEP_X_SkillCooldowns)
 * @parent ---Settings---
 *
 * @param Cooldown Formula
 * @parent (YEP_X_SkillCooldowns)
 * @type combo
 * @option turns // no changes based on mastery level
 * @option turns * (1.00 - (level * 0.05)) // -5% per level
 * @option turns * (1.00 - (level * 0.10)) // -10% per level
 * @option turns * (1.00 - (level * 0.20)) // -20% per level
 * @option turns - (level * 1)  // -1 turn per level
 * @option turns - (level * 5)  // -5 turns per level
 * @option turns - (level * 10) // -10 turns per level
 * @desc 根据熟练级别进行切换。   turns: original turns
 * level: the target level to be reached
 * @default turns - (level * 1)  // -1 turn per level
 *
 * @param Minimum Cooldown
 * @parent Cooldown Formula
 * @desc 如果技能被降低，它的最小冷却时间是多少？
 * 如果技能没有冷却时间，这不适用。
 * @default 1
 *
 * @param ---Visual---
 * @default
 *
 * @param Level Up Animation
 * @parent ---Visual---
 * @type animation
 * @desc 当技能达到熟练度时播放动画。
 * 0时离开，不显示任何动画。
 * @default 0
 *
 * @param Mirror Actor
 * @parent Level Up Animation
 * @type boolean
 * @on Mirror
 * @off Don't Mirror
 * @desc 为角色行动动画
 * YES - true     NO - false
 * @default true
 *
 * @param Mirror Enemy
 * @parent Level Up Animation
 * @type boolean
 * @on Mirror
 * @off Don't Mirror
 * @desc 为敌人行动动画
 * YES - true     NO - false
 * @default false
 *
 * @param Draw Gauge
 * @parent ---Visual---
 * @type boolean
 * @on Draw Gauge
 * @off Don't Draw
 * @desc 画技能熟练度显示条
 * YES - true     NO - false
 * @default true
 *
 * @param Gauge Color 1
 * @parent Draw Gauge
 * @type number
 * @min 0
 * @max 31
 * @desc 用于熟练量表的文本颜色1。
 * @default 12
 *
 * @param Gauge Color 2
 * @parent Draw Gauge
 * @type number
 * @min 0
 * @max 31
 * @desc 用于熟练量表的文本颜色2。
 * @default 4
 *
 * @param Gauge Height
 * @parent Draw Gauge
 * @type number
 * @min 1
 * @desc 显示条高度。
 * @default 6
 *
 * @param Gauge Outline
 * @parent Draw Gauge
 * @type boolean
 * @on Outline
 * @off No Outline
 * @desc 给显示条画个轮廓？
 * YES - true     NO - false
 * @default true
 *
 * @param Draw Level
 * @parent ---Visual---
 * @type boolean
 * @on Draw Gauge
 * @off Don't Draw
 * @desc 技能的熟练度
 * YES - true     NO - false
 * @default true
 *
 * @param Show Level 0
 * @parent Draw Level
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc 显示0技能熟练度
 * YES - true     NO - false
 * @default false
 *
 * @param Text Color
 * @parent Draw Level
 * @type number
 * @min 0
 * @max 31
 * @desc 用于熟练级别的文本颜色。
 * @default 29
 *
 * @param Text Align
 * @parent Draw Level
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc 文本向哪个方向对齐？
 * left     center     right
 * @default right
 *
 * @param Text Format
 * @parent Draw Level
 * @desc 用于显示熟练度的文本格式。
 * %1 - value
 * @default LV.%1
 *
 * @param Text Size
 * @parent Draw Level
 * @type number
 * @desc 熟练级别的文本字体大小。
 * @default 14
 *
 * @param Text Y Offset
 * @parent Draw Level
 * @desc 偏移Y位置
 * @default -8
 *
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_SkillMasteryLevels');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.SMLDefaultMaxLv = Number(Yanfly.Parameters['Default Max Mastery']);
Yanfly.Param.SMLLvFormula = String(Yanfly.Parameters['Level Formula']);
Yanfly.Param.SMLDmgFormula = String(Yanfly.Parameters['Damage Formula']);
Yanfly.Param.SMLmpFormula = String(Yanfly.Parameters['MP Cost Formula']);
Yanfly.Param.SMLminMpCost = Number(Yanfly.Parameters['Minimum MP Cost']);
Yanfly.Param.SMLtpFormula = String(Yanfly.Parameters['TP Cost Formula']);
Yanfly.Param.SMLminTpCost = Number(Yanfly.Parameters['Minimum TP Cost']);
Yanfly.Param.SMLhpFormula = String(Yanfly.Parameters['HP Cost Formula']);
Yanfly.Param.SMLminHpCost = Number(Yanfly.Parameters['Minimum HP Cost']);
Yanfly.Param.SMLcdFormula = String(Yanfly.Parameters['Cooldown Formula']);
Yanfly.Param.SMLminCdCost = Number(Yanfly.Parameters['Minimum Cooldown']);

Yanfly.Param.SMLAnimation = Number(Yanfly.Parameters['Level Up Animation']);
Yanfly.Param.SMLAniMirActor = eval(String(Yanfly.Parameters['Mirror Actor']));
Yanfly.Param.SMLAniMirEnemy = eval(String(Yanfly.Parameters['Mirror Enemy']));

Yanfly.Param.SMLDrawGauge = eval(String(Yanfly.Parameters['Draw Gauge']));
Yanfly.Param.SMLGauge1 = Number(Yanfly.Parameters['Gauge Color 1']);
Yanfly.Param.SMLGauge2 = Number(Yanfly.Parameters['Gauge Color 2']);
Yanfly.Param.SMLGaugeH = Number(Yanfly.Parameters['Gauge Height']);
Yanfly.Param.SMLGaugeOutline = eval(String(Yanfly.Parameters['Gauge Outline']));

Yanfly.Param.SMLDrawLevel = eval(String(Yanfly.Parameters['Draw Level']));
Yanfly.Param.SMLShowLevel0 = eval(String(Yanfly.Parameters['Show Level 0']));
Yanfly.Param.SMLLevelColor = Number(Yanfly.Parameters['Text Color']);
Yanfly.Param.SMLTextAlign = String(Yanfly.Parameters['Text Align']);
Yanfly.Param.SMLTextFmt = String(Yanfly.Parameters['Text Format']);
Yanfly.Param.SMLTextSize = Number(Yanfly.Parameters['Text Size']);
Yanfly.Param.SMLTextOffsetY = Number(Yanfly.Parameters['Text Y Offset']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.SkillMastery.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.SkillMastery.DataManager_isDatabaseLoaded.call(this)) return false;

  if (!Yanfly._loaded_YEP_SkillMasteryLevels) {
    this.processSkillMasteryLevelSkillRef($dataSkills);
    this.processSkillMasteryLevelsNotetags1($dataSkills);
    this.processSkillMasteryLevelsNotetags2($dataActors);
    this.processSkillMasteryLevelsNotetags2($dataEnemies);
    Yanfly._loaded_YEP_SkillMasteryLevels = true;
  }
  
  return true;
};

DataManager.processSkillMasteryLevelSkillRef = function(group) {
  if (Yanfly.SkillIdRef) return;
  Yanfly.SkillIdRef = {};
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    if (obj.name.length <= 0) continue;
    Yanfly.SkillIdRef[obj.name.toUpperCase()] = n;
  }
};

DataManager.processSkillMasteryLevelsNotetags1 = function(group) {
  var note1 = /<MASTERY EFFECT: ([\+\-]\d+)[ ](.*)[ ]PER LEVEL>/i;
  var note2 = /<MASTERY EFFECT: ([\+\-]\d+)([%％])[ ](.*)[ ]PER LEVEL>/i;
  var note3 = /<CUSTOM (.*) MASTERY FORMULA: (.*)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.masteryMaxLevel = Yanfly.Param.SMLDefaultMaxLv;
    obj.masteryFormula = new Function('level','skill', 
      'return ' + Yanfly.Param.SMLLvFormula);
    obj.masteryDamage = new Function('value', 'level','skill',
      'return ' + Yanfly.Param.SMLDmgFormula);
    obj.masteryMpCost = new Function('cost', 'level','skill',
      'return ' + Yanfly.Param.SMLmpFormula);
    obj.masteryTpCost = new Function('cost', 'level','skill',
      'return ' + Yanfly.Param.SMLtpFormula);
    obj.masteryHpCost = new Function('cost', 'level','skill',
      'return ' + Yanfly.Param.SMLhpFormula);
    obj.masteryCooldown = new Function('turns', 'level','skill',
      'return ' + Yanfly.Param.SMLcdFormula);

    var evalMode = 'none';
    var evalText = '';

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:MAX MASTERY LEVEL):[ ](\d+)>/i)) {
        obj.masteryMaxLevel = parseInt(RegExp.$1);
      // Flat +/- per mastery level
      } else if (line.match(note1)) {
        var value = parseInt(RegExp.$1);
        var type = String(RegExp.$2).toUpperCase();
        if (type === 'DAMAGE') {
          obj.masteryDamage = new Function('value', 'level','skill',
            'return value + (level * ' + value + ')');
        } else if (type === 'MP COST') {
          obj.masteryMpCost = new Function('cost', 'level','skill',
            'return cost + (level * ' + value + ')');
        } else if (type === 'TP COST') {
          obj.masteryTpCost = new Function('cost', 'level','skill',
            'return cost + (level * ' + value + ')');
        } else if (type === 'HP COST') {
          obj.masteryHpCost = new Function('cost', 'level','skill',
            'return cost + (level * ' + value + ')');
        } else if (type === 'COOLDOWN') {
          obj.masteryCooldown = new Function('turns', 'level','skill',
            'return turns + (level * ' + value + ')');
        }
      // Percentile +/- per mastery level
      } else if (line.match(note2)) {
        var value = parseFloat(RegExp.$1) * 0.01;
        var type = String(RegExp.$3).toUpperCase();
        if (type === 'DAMAGE') {
          obj.masteryDamage = new Function('value', 'level','skill',
            'return value * (1.00 + (level * ' + value + '))');
        }if (type === 'MP COST') {
          obj.masteryMpCost = new Function('cost', 'level','skill',
            'return cost * (1.00 + (level * ' + value + '))');
        } else if (type === 'TP COST') {
          obj.masteryTpCost = new Function('cost', 'level','skill',
            'return cost * (1.00 + (level * ' + value + '))');
        } else if (type === 'HP COST') {
          obj.masteryHpCost = new Function('cost', 'level','skill',
            'return cost * (1.00 + (level * ' + value + '))');
        } else if (type === 'COOLDOWN') {
          obj.masteryCooldown = new Function('turns', 'level','skill',
            'return turns * (1.00 + (level * ' + value + '))');
        }
      // No Mastery Change
      } else if (line.match(/<NO[ ](.*)[ ]MASTERY EFFECT>/i)) {
        var type = String(RegExp.$1).toUpperCase();
        if (type === 'DAMAGE') {
          obj.masteryDamage = new Function('value', 'level','skill',
            'return value');
        } else if (type === 'MP COST') {
          obj.masteryMpCost = new Function('cost', 'level','skill',
            'return cost');
        } else if (type === 'TP COST') {
          obj.masteryTpCost = new Function('cost', 'level','skill',
            'return cost');
        } else if (type === 'HP COST') {
          obj.masteryHpCost = new Function('cost', 'level','skill',
            'return cost');
        } else if (type === 'COOLDOWN') {
          obj.masteryCooldown = new Function('turns', 'level','skill',
            'return turns');
        }
      // Mastery Custom Formula
      } else if (line.match(note3)) {
        var type = String(RegExp.$1).toUpperCase();
        var formula = String(RegExp.$2);
        if (type === 'EXP') {
          obj.masteryFormula = new Function('level','skill',
            'return ' + formula);
        } else if (type === 'DAMAGE') {
          obj.masteryDamage = new Function('value', 'level','skill',
            'return ' + formula);
        } else if (type === 'MP COST') {
          obj.masteryMpCost = new Function('cost', 'level','skill',
            'return ' + formula);
        } else if (type === 'TP COST') {
          obj.masteryTpCost = new Function('cost', 'level','skill',
            'return ' + formula);
        } else if (type === 'HP COST') {
          obj.masteryHpCost = new Function('cost', 'level','skill',
            'return ' + formula);
        } else if (type === 'COOLDOWN') {
          obj.masteryCooldown = new Function('turns', 'level','skill',
            'return ' + formula);
        }
      // End
      } else if (evalMode !== 'none') {
        evalText += line + '\n';
      }
    }
  }
};

DataManager.processSkillMasteryLevelsNotetags2 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.startingSkillMasteryLevels = [];
    var evalMode = 'none';

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<STARTING SKILL (?:MASTERY|MASTERIES)>/i)) {
        var evalMode = 'starting skill masteries';
      } else if (line.match(/<\/STARTING SKILL (?:MASTERY|MASTERIES)>/i)) {
        var evalMode = 'none';
      } else if (evalMode === 'starting skill masteries') {
        if (line.match(/SKILL[ ](\d+):[ ](\d+)/i)) {
          var skillId = parseInt(RegExp.$1);
          var level = parseInt(RegExp.$2);
        } else if (line.match(/(.*):[ ](\d+)/i)) {
          var name = String(RegExp.$1).toUpperCase();
          var level = parseInt(RegExp.$2);
          if (Yanfly.SkillIdRef[name]) {
            var skillId = Yanfly.SkillIdRef[name];
          } else {
            continue;
          }
        }
        if (line.match(/(\d+),[ ](\d+)/i)) {
          var uses = parseInt(RegExp.$2);
          var formula = $dataSkills[skillId].masteryFormula;
          try {
            var max = formula.call(this, level + 1, $dataSkills[skillId]) - 1;
          } catch (e) {
            Yanfly.Util.SkillMasteryLevelsError('SKILL MASTERY LEVELS:\n' + 
              'Bad code for Mastery EXP Formula for ' +
              $dataSkills[skillId].name, e);
          }
          uses = uses.clamp(0, max);
        } else {
          var uses = 0;
        }
        level = level.clamp(0, $dataSkills[skillId].masteryMaxLevel);
        obj.startingSkillMasteryLevels.push([skillId, level, uses]);
      }
    }
  }
};

//=============================================================================
// Game_BattlerBase
//=============================================================================

Yanfly.SkillMastery.Game_BattlerBase_initMembers =
  Game_BattlerBase.prototype.initMembers;
Game_BattlerBase.prototype.initMembers = function() {
  Yanfly.SkillMastery.Game_BattlerBase_initMembers.call(this);
  this.initSkillMasteryLevels();
};

Game_BattlerBase.prototype.initSkillMasteryLevels = function() {
  this._skillMasteryLevels = {};
  this._skillMasteryUses = {};
  this._skillMasteryUsageMax = {};
};

Game_BattlerBase.prototype.checkSkillMasteryLevels = function() {
  if (this._skillMasteryLevels === undefined) this.initSkillMasteryLevels();
  if (this._skillMasteryUses === undefined) this.initSkillMasteryLevels();
  if (this._skillMasteryUsageMax === undefined) this.initSkillMasteryLevels();
};

Game_BattlerBase.prototype.updateSkillMasteryUsageMax = function(skillId) {
  this.checkSkillMasteryLevels();
  this._skillMasteryLevels[skillId] = this._skillMasteryLevels[skillId] || 0;
  this._skillMasteryUses[skillId] = this._skillMasteryUses[skillId] || 0;
  var skillFormula = $dataSkills[skillId].masteryFormula;
  try {
    this._skillMasteryUsageMax[skillId] = skillFormula.call(this,
      this._skillMasteryLevels[skillId] + 1, $dataSkills[skillId]);
  } catch (e) {
    Yanfly.Util.SkillMasteryLevelsError('SKILL MASTERY LEVELS:\n' + 
      'Bad code for Mastery EXP Formula for ' +
      $dataSkills[skillId].name, e);
  }
};

Game_BattlerBase.prototype.skillMasteryLevel = function(skill) {
  if (DataManager.isSkill(skill)) {
    var skillId = skill.id;
  } else if (typeof skill === 'number') {
    var skillId = skill;
  } else {
    return 0;
  }
  this.checkSkillMasteryLevels();
  this._skillMasteryLevels[skillId] = this._skillMasteryLevels[skillId] || 0;
  this._skillMasteryUses[skillId] = this._skillMasteryUses[skillId] || 0;
  return this._skillMasteryLevels[skillId];
};

Game_BattlerBase.prototype.setSkillMasteryLevel = function(skill, value) {
  if (DataManager.isSkill(skill)) {
    var skillId = skill.id;
  } else if (typeof skill === 'number') {
    var skillId = skill;
  } else {
    return 0;
  }
  this.checkSkillMasteryLevels();
  var level = value.clamp(0, $dataSkills[skillId].masteryMaxLevel);
  this._skillMasteryLevels[skillId] = level;
  this._skillMasteryUses[skillId] = 0;
  this.updateSkillMasteryUsageMax(skillId);
};

Game_BattlerBase.prototype.gainSkillMasteryLevel = function(skillId, value) {
  this.checkSkillMasteryLevels();
  this._skillMasteryLevels[skillId] = this._skillMasteryLevels[skillId] || 0;
  this._skillMasteryLevels[skillId] += value;
  this._skillMasteryLevels[skillId] = this._skillMasteryLevels[skillId].clamp(0,
    $dataSkills[skillId].masteryMaxLevel);
  this._skillMasteryUses[skillId] = 0;
  this.updateSkillMasteryUsageMax(skillId);
};

Game_BattlerBase.prototype.isMaxedSkillMasteryLevel = function(skill) {
  if (DataManager.isSkill(skill)) {
    var skillId = skill.id;
  } else if (typeof skill === 'number') {
    var skillId = skill;
  } else {
    return false;
  }
  this.checkSkillMasteryLevels();
  return this.skillMasteryLevel(skillId) >=
    $dataSkills[skillId].masteryMaxLevel;
};

Game_BattlerBase.prototype.skillMasteryUses = function(skill) {
  if (DataManager.isSkill(skill)) {
    var skillId = skill.id;
  } else if (typeof skill === 'number') {
    var skillId = skill;
  } else {
    return 0;
  }
  this.checkSkillMasteryLevels();
  this._skillMasteryLevels[skillId] = this._skillMasteryLevels[skillId] || 0;
  this._skillMasteryUses[skillId] = this._skillMasteryUses[skillId] || 0;
  return this._skillMasteryUses[skillId];
};

Game_BattlerBase.prototype.setSkillMasteryUses = function(skill, value) {
  if (DataManager.isSkill(skill)) {
    var skillId = skill.id;
  } else if (typeof skill === 'number') {
    var skillId = skill;
  } else {
    return 0;
  }
  this.checkSkillMasteryLevels();
  this._skillMasteryUses[skillId] = Math.max(0, value);
  this.updateSkillMasteryUsageMax(skillId);
  if (this._skillMasteryUses[skillId] >= this._skillMasteryUsageMax[skillId]) {
    this.gainSkillMasteryLevel(skillId, 1);
  }
};

Game_BattlerBase.prototype.gainSkillMasteryUses = function(skill, value) {
  var uses = this.skillMasteryUses(skill) + value;
  this.setSkillMasteryUses(skill, uses);
};

Game_BattlerBase.prototype.skillMasteryUsageMax = function(skill) {
  if (DataManager.isSkill(skill)) {
    var skillId = skill.id;
  } else if (typeof skill === 'number') {
    var skillId = skill;
  } else {
    return 0;
  }
  this.checkSkillMasteryLevels();
  this.updateSkillMasteryUsageMax(skillId);
  return this._skillMasteryUsageMax[skillId];
};

Game_BattlerBase.prototype.skillMasteryRate = function(skill) {
  if (DataManager.isSkill(skill)) {
    var skillId = skill.id;
  } else if (typeof skill === 'number') {
    var skillId = skill;
  } else {
    return 0;
  }
  if (this.isMaxedSkillMasteryLevel(skillId)) return 1;
  this.checkSkillMasteryLevels();
  this.updateSkillMasteryUsageMax(skillId);
  return this._skillMasteryUses[skillId] / this._skillMasteryUsageMax[skillId];
};

Yanfly.SkillMastery.Game_BattlerBase_paySkillCost =
  Game_BattlerBase.prototype.paySkillCost;
Game_BattlerBase.prototype.paySkillCost = function(skill) {
  Yanfly.SkillMastery.Game_BattlerBase_paySkillCost.call(this, skill);
  if ($gameParty.inBattle()) {
    this._actionMastery = this._actionMastery || [];
    this._actionMastery.push(skill.id);
  }
};

Yanfly.SkillMastery.Game_Battler_onAllActionsEnd =
  Game_Battler.prototype.onAllActionsEnd;
Game_Battler.prototype.onAllActionsEnd = function() {
  Yanfly.SkillMastery.Game_Battler_onAllActionsEnd.call(this);
  if (this._actionMastery && $gameParty.inBattle()) {
    var levelup = false;
    while (this._actionMastery.length > 0) {
      var skillId = this._actionMastery.shift();
      if (this.isMaxedSkillMasteryLevel(skillId)) continue;
      var level = this.skillMasteryLevel(skillId);
      this.gainSkillMasteryUses(skillId, 1);
      if (this.skillMasteryLevel(skillId) > level) levelup = true;
    }
    if (levelup && Yanfly.Param.SMLAnimation > 0) {
      if (this.isActor()) {
        var mirror = Yanfly.Param.SMLAniMirActor;
      } else {
        var mirror = Yanfly.Param.SMLAniMirEnemy;
      }
      this.startAnimation(Yanfly.Param.SMLAnimation, mirror);
    }
  }
};

Yanfly.SkillMastery.Game_BattlerBase_skillMpCost =
  Game_BattlerBase.prototype.skillMpCost;
Game_BattlerBase.prototype.skillMpCost = function(skill) {
  var cost = Yanfly.SkillMastery.Game_BattlerBase_skillMpCost.call(this, skill);
  if (cost > 0) {
    var level = this.skillMasteryLevel(skill);
    try {
      cost = Math.floor(skill.masteryMpCost.call(this, cost, level, skill));
    } catch (e) {
      Yanfly.Util.SkillMasteryLevelsError('SKILL MASTERY LEVELS:\n' + 
        'Bad code for Mastery MP Cost Formula for ' +
        $dataSkills[skill.id].name, e);
    }
    cost = Math.max(cost, Yanfly.Param.SMLminMpCost);
  }
  return cost;
};

Yanfly.SkillMastery.Game_BattlerBase_skillTpCost =
  Game_BattlerBase.prototype.skillTpCost;
Game_BattlerBase.prototype.skillTpCost = function(skill) {
  var cost = Yanfly.SkillMastery.Game_BattlerBase_skillTpCost.call(this, skill);
  if (cost > 0) {
    var level = this.skillMasteryLevel(skill);
    try {
      cost = Math.floor(skill.masteryTpCost.call(this, cost, level, skill));
    } catch (e) {
      Yanfly.Util.SkillMasteryLevelsError('SKILL MASTERY LEVELS:\n' + 
        'Bad code for Mastery TP Cost Formula for ' +
        $dataSkills[skill.id].name, e);
    }
    cost = Math.max(cost, Yanfly.Param.SMLminTpCost);
  }
  return cost;
};

if (Imported.YEP_SkillCore) {

Yanfly.SkillMastery.Game_BattlerBase_skillHpCost =
  Game_BattlerBase.prototype.skillHpCost;
Game_BattlerBase.prototype.skillHpCost = function(skill) {
  var cost = Yanfly.SkillMastery.Game_BattlerBase_skillHpCost.call(this, skill);
  if (cost > 0) {
    var level = this.skillMasteryLevel(skill);
    try {
      cost = Math.floor(skill.masteryHpCost.call(this, cost, level, skill));
    } catch (e) {
      Yanfly.Util.SkillMasteryLevelsError('SKILL MASTERY LEVELS:\n' + 
        'Bad code for Mastery HP Cost Formula for ' +
        $dataSkills[skill.id].name, e);
    }
    cost = Math.max(cost, Yanfly.Param.SMLminHpCost);
  }
  return cost;
};

if (Imported.YEP_X_SkillCooldowns) {

Yanfly.SkillMastery.Game_BattlerBase_applyCooldownMods =
  Game_BattlerBase.prototype.applyCooldownMods;
Game_BattlerBase.prototype.applyCooldownMods = function(skill) {
  Yanfly.SkillMastery.Game_BattlerBase_applyCooldownMods.call(this, skill);
  var turns = this.cooldown(skill.id);
  if (turns > 0) {
    var level = this.skillMasteryLevel(skill);
    try {
      turns = Math.floor(skill.masteryCooldown.call(this, turns, level, skill));
    } catch (e) {
      Yanfly.Util.SkillMasteryLevelsError('SKILL MASTERY LEVELS:\n' + 
        'Bad code for Mastery Cooldown Formula for ' +
        $dataSkills[skill.id].name, e);
    }
    this.setCooldown(skill.id, Math.max(Yanfly.Param.SMLminCdCost, turns));
  }
};

}; // Imported.YEP_X_SkillCooldowns
}; // Imported.YEP_SkillCore

Game_BattlerBase.prototype.makeStartingSkillMasteryLevels = function(obj) {
  if (!obj) return;
  if (!obj.startingSkillMasteryLevels) return;
  var data = obj.startingSkillMasteryLevels;
  var length = data.length;
  for (var i = 0; i < length; ++i) {
    var skillId = data[i][0];
    var level = data[i][1];
    var uses = data[i][2];
    this.setSkillMasteryLevel(skillId, level);
    this.setSkillMasteryUses(skillId, uses);
  }
};

//=============================================================================
// Game_Action
//=============================================================================

Yanfly.SkillMastery.Game_Action_makeDamageValue =
  Game_Action.prototype.makeDamageValue;
Game_Action.prototype.makeDamageValue = function(target, critical) {
  var value = Yanfly.SkillMastery.Game_Action_makeDamageValue.call(this,
    target, critical);
  if (value !== 0 && this.isSkill()) {
    var level = this.subject().skillMasteryLevel(this.item());
    try {
      value = Math.round(this.item().masteryDamage.call(this, value, level,
        this.item()));
    } catch (e) {
      Yanfly.Util.SkillMasteryLevelsError('SKILL MASTERY LEVELS:\n' + 
        'Bad code for Mastery Damage Formula for ' +
        this.item().name, e);
    }
  }
  return value;
};

//=============================================================================
// Game_Actor
//=============================================================================

Yanfly.SkillMastery.Game_Actor_initSkills = Game_Actor.prototype.initSkills;
Game_Actor.prototype.initSkills = function() {
  Yanfly.SkillMastery.Game_Actor_initSkills.call(this);
  this.makeStartingSkillMasteryLevels(this.actor());
};

//=============================================================================
// Game_Enemy
//=============================================================================

Yanfly.SkillMastery.Game_Enemy_setup = Game_Enemy.prototype.setup;
Game_Enemy.prototype.setup = function(enemyId, x, y) {
  Yanfly.SkillMastery.Game_Enemy_setup.call(this, enemyId, x, y);
  this.makeStartingSkillMasteryLevels(this.enemy());
};

//=============================================================================
// Window_Base
//=============================================================================

Yanfly.SkillMastery.Window_Base_drawItemName =
  Window_Base.prototype.drawItemName;
Window_Base.prototype.drawItemName = function(item, x, y, width) {
  width = width || 312;
  var drawSkillMastery = this._actor && DataManager.isSkill(item);
  if (drawSkillMastery && Yanfly.Param.SMLDrawGauge) {
    this.drawSkillMasteryGauge(item, x, y, width);
  }
  Yanfly.SkillMastery.Window_Base_drawItemName.call(this, item, x, y, width);
  if (drawSkillMastery && Yanfly.Param.SMLDrawLevel) {
    this.drawSkillMasteryLevel(item, x, y, width);
  }
};

Window_Base.prototype.drawSkillMasteryGauge = function(skill, x, y, width) {
  if (skill.masteryMaxLevel <= 0) return;
  x += Window_Base._iconWidth + 4;
  width -= Window_Base._iconWidth + 4;
  var color1 = this.textColor(Yanfly.Param.SMLGauge1);
  var color2 = this.textColor(Yanfly.Param.SMLGauge2);
  var gaugeH = Yanfly.Param.SMLGaugeH;
  var gaugeY = y + this.lineHeight() - gaugeH - 2;
  if (Yanfly.Param.SMLGaugeOutline) {
    gaugeY -= 2;
    gaugeH += 2;
  }
  this.contents.fillRect(x, gaugeY, width, gaugeH, this.gaugeBackColor());
  if (Yanfly.Param.SMLGaugeOutline) {
    gaugeY += 1;
    gaugeH -= 2;
    x += 1;
    width -= 1;
  }
  var rate = this._actor.skillMasteryRate(skill);
  var fillW = Math.floor(width * rate);
  this.contents.gradientFillRect(x, gaugeY, fillW, gaugeH, color1, color2);
};

Window_Base.prototype.drawSkillMasteryLevel = function(skill, x, y, width) {
  var level = this._actor.skillMasteryLevel(skill);
  if (level <= 0 && !Yanfly.Param.SMLShowLevel0) return;
  var fmt = Yanfly.Param.SMLTextFmt;
  var text = fmt.format(Yanfly.Util.toGroup(level));
  this.resetFontSettings();
  this.contents.fontSize = Yanfly.Param.SMLTextSize;
  this.changeTextColor(this.textColor(Yanfly.Param.SMLLevelColor));
  var align = Yanfly.Param.SMLTextAlign;
  var offsetY = Yanfly.Param.SMLTextOffsetY;
  this.drawText(text, x + 2, y + offsetY, Window_Base._iconWidth, align);
  this.resetFontSettings();
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

Yanfly.Util.SkillMasteryLevelsError = function(text, e) {
  text = text + '\n\n' + e.stack;
  alert(text);
  SceneManager.terminate();
};

//=============================================================================
// End of File
//=============================================================================