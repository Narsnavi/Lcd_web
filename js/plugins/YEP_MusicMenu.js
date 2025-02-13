//=============================================================================
// Yanfly Engine Plugins - Music Menu
// YEP_MusicMenu.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_MusicMenu = true;

var Yanfly = Yanfly || {};
Yanfly.MusicMenu = Yanfly.MusicMenu || {};
Yanfly.MusicMenu.version = 1.01;

//=============================================================================
 /*:
 * @plugindesc v1.01 音乐播放菜单
 * songs from in the game as they play.
 * @author Yanfly Engine Plugins + Chickie Collaboration
 *
 * @param ---General---
 * @default
 *
 * @param Music Icon
 * @parent ---General---
 * @desc 该图标将显示在每个歌曲条目旁边！
 * @default 80
 *
 * @param Hidden Name
 * @parent ---General---
 * @desc 这将是歌曲列表中的歌曲名称，
 * 如果它尚未在音乐菜单中解锁。
 * @default ? ? ? ? ?
 *
 * @param Hidden Help
 * @parent ---General---
 * @desc 当歌曲尚未解锁时，
 * 文本将显示在页面顶部的帮助窗口中。
 * @default This song hasn't been unlocked yet.
 *
 * @param ---Song List---
 * @default
 *
 * @param Song 1 Data
 * @parent ---Song List---
 * @desc 这个条目的歌曲数据。格式:
 * filename; display name; volume; pitch; pan; description
 * @default Theme1; Title Theme; 90; 100; 0; Title theme for this game!
 *
 * @param Song 2 Data
 * @parent ---Song List---
 * @desc 这个条目的歌曲数据。格式:
 * filename; display name; volume; pitch; pan; description
 * @default Battle1; Let's Battle; 100; 100; 0; En garde!
 *
 * @param Song 3 Data
 * @parent ---Song List---
 * @desc 这个条目的歌曲数据。格式（后面的都一样）:
 * filename; display name; volume; pitch; pan; description
 * @default Field1; World of Fantasy; 90; 110; 0; The overworld theme!
 *
 * @param Song 4 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default Town1; Calm, Peaceful Days; 90; 100; 0; Our town theme!
 *
 * @param Song 5 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default Castle1; Castle Royalty; 90; 100; 0; Living a life of royalty!
 *
 * @param Song 6 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default Dungeon1; Depths of Dungeon Diving; 90; 100; 0; So mysterious!
 *
 * @param Song 7 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default Scene1; Day to Day; 90; 100; 0; Living life one day at a time!
 *
 * @param Song 8 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default Ship1; Let's Set Sail!; 90; 100; 0; Ahoy! To open waters we go!
 *
 * @param Song 9 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 10 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 11 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 12 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 13 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 14 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 15 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 16 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 17 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 18 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 19 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 20 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 21 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 22 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 23 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 24 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 25 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 26 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 27 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 28 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 29 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 30 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 31 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 32 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 33 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 34 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 35 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 36 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 37 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 38 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 39 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 40 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 41 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 42 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 43 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 44 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 45 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 46 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 47 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 48 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 49 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 50 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 51 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 52 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 53 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 54 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 55 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 56 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 57 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 58 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 59 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 60 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 61 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 62 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 63 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 64 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 65 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 66 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 67 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 68 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 69 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 70 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 71 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 72 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 73 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 74 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 75 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 76 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 77 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 78 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 79 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 80 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 81 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 82 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 83 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 84 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 85 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 86 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 87 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 88 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 89 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 90 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 91 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 92 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 93 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 94 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 95 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 96 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 97 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 98 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 99 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @param Song 100 Data
 * @parent ---Song List---
 * @desc Song data for this entry. Format:
 * filename; display name; volume; pitch; pan; description
 * @default
 *
 * @help
 * ============================================================================
 * 正式介绍
 * ============================================================================
 *
 * 这个插件添加了一个新的菜单，你可以把玩家放入其中。
 * 在游戏中，玩家将能够播放任何你允许他们播放的游戏中以前遇到的歌曲。
 * 您可以设置文件名、歌曲的显示名称、音量、音高、声相，
 * 甚至歌曲重播时的帮助描述。
 * when the song will be replayed. 
 *
 * This is a collaboration plugin by Chickie and Yanfly to ensure compatibility
 * with the Yanfly Engine Plugins library.
 *
 * ============================================================================
 * 指令
 * ============================================================================
 *
 * “音乐菜单”中显示的歌曲将仅是您在插件参数中列出的
 * 标记为歌曲x数据的歌曲.
 *
 * 当输入歌曲数据时，必须以以下某种格式进行:
 *
 *   filename; display name; volume; pitch; pan; description
 *
 * 每个数据段由一个；
 * 并且必须以该特定顺序输入，以保持所有数据有序并正确读取。
 * 以下是如何应用每个条目:
 *
 *   filename
 *   - 这是歌曲的文件名。
 *  这必须区分大小写，并且不得包含文件扩展名。
 *   例如，theme.mp3将作为参数的主题
 *
 *   display name
 *   - 这是游戏中显示在音乐菜单中的名字。
 *   这对实际歌曲本身没有影响。
 *
 *   volume
 *   - 这将是歌曲在音乐菜单场景中播放的音量。
 *   插件参数使用从0到100的整数值。
 *
 *   pitch
 *   - 这是音乐菜单中歌曲的音高。
 *   插件参数使用0到200之间的整数值。
 *
 *   pan
 *   - 这是应用于音乐菜单中歌曲的声像。
 *   插件参数使用-100到100之间的值。
 *
 *   description
 *   - 选择歌曲时出现的帮助描述。
 *   帮助描述将出现在屏幕顶部。
 *   您可以为此设置使用任何类型的文本代码。
 *
 * ============================================================================
 * 主菜单管理器-定位音乐菜单
 * ============================================================================
 *
 * 对于那些使用主菜单管理器并希望将“音乐菜单”命令放
 * 置在您想要的位置的人，请使用以下格式:
 *
 *       Name: "Music Menu"
 *     Symbol: musicMenu
 *       Show: $gameSwitches.value(Insert a Switch ID to show this command)
 *    Enabled: $gameSwitches.value(Insert a Switch ID to enable this command)
 *        Ext: 
 *  Main Bind: this.commandMusicMenu.bind(this)
 * Actor Bind: 
 *
 * 将上述设置插入主菜单管理器插槽。
 * 如果你把正确的设置复制到你需要的地方，
 * 当你使用所有的命名、启用、禁用、隐藏和显示插件参数的效果时，
 * 它就会出现在那里。
 *
 * 记得从插件参数中关闭 'Auto Add Menu' .
 *
 * ============================================================================
 * 插件命令
 * ============================================================================
 *
 * 您可以使用以下插件命令以多种方式
 * 更改游戏的音乐菜单设置.
 *
 * 插件命令:
 *
 *   GoToMusicMenu
 *   - 将播放器发送到音乐菜单场景.
 *
 *   AllMusicMenuSongs
 *   - 为玩家解锁所有音乐，
 *   玩家无需在游戏中至少听一次.
 *
 *   NormalMusicMenuSongs
 *   - 删除解锁所有设置。
 *   玩家现在需要在游戏中至少听到一次音乐才能解锁歌曲。
 *   这不会删除已经解锁的歌曲条目。
 *
 *   UnlockMusicMenuSong x
 *   UnlockMusicMenuSong x x x
 *   - 这将为游戏解锁歌曲ID x。
 *   使用多个x一次解锁一组歌曲。
 *   x将引用插件参数中找到的ID。
 *   所引用的歌曲将被解锁，而玩家不需要在游戏中听到该歌曲至少一次。
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

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_MusicMenu');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.MusicMenuIcon = Number(Yanfly.Parameters['Music Icon']);
Yanfly.Param.MusicMenuHiddenName = String(Yanfly.Parameters['Hidden Name']);
Yanfly.Param.MusicMenuHiddenHelp = String(Yanfly.Parameters['Hidden Help']);

Yanfly.SetupMusicMenuParameters = function() {
  Yanfly.Param.MusicMenuSongFilenameList = [''];
  Yanfly.Param.MusicMenuSongList = [['']];
  for (var i = 1; i < 101; i++) {
    var paramName = 'Song ' + i + ' Data';
    var paramStr = String(Yanfly.Parameters[paramName]);
    var paramData = paramStr.split(';')
    Yanfly.Param.MusicMenuSongList.push(paramData);
    Yanfly.Param.MusicMenuSongFilenameList.push(paramData[0]);
  }
}

Yanfly.SetupMusicMenuParameters();

//=============================================================================
// AudioManager
//=============================================================================

Yanfly.MusicMenu.AudioManager_playBgm = AudioManager.playBgm;
AudioManager.playBgm = function(bgm, pos) {
  Yanfly.MusicMenu.AudioManager_playBgm.call(this, bgm, pos);
  var bgmName = bgm.name;
  if (bgmName && Yanfly.Param.MusicMenuSongFilenameList.contains(bgmName)) {
    if ($gameSystem) {
      var index = Yanfly.Param.MusicMenuSongFilenameList.indexOf(bgmName);
      $gameSystem.unlockMusicMenuSong(index);
    }
  }
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.MusicMenu.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
  Yanfly.MusicMenu.Game_System_initialize.call(this);
  this.initMusicMenuSettings();
};

Game_System.prototype.initMusicMenuSettings = function() {
  this._unlockedMusicMenuSongs = [];
  this._unlockAllMusicMenuSongs = false;
};

Game_System.prototype.getUnlockedMusicMenuSongs = function() {
  if (this._unlockedMusicMenuSongs === undefined) {
    this.initMusicMenuSettings();
  }
  return this._unlockedMusicMenuSongs;
};

Game_System.prototype.unlockMusicMenuSong = function(id) {
  if (this._unlockedMusicMenuSongs === undefined) {
    this.initMusicMenuSettings();
  }
  if (this._unlockedMusicMenuSongs.contains(id)) {
    return;
  } else {
    this._unlockedMusicMenuSongs.push(id);
  }
};

Game_System.prototype.isUnlockedMusicMenuSong = function(id) {
  if (this._unlockedMusicMenuSongs === undefined) {
    this.initMusicMenuSettings();
  }
  if (this.isUnlockedAllMusicMenuSongs()) {
    return true;
  }
  return this._unlockedMusicMenuSongs.contains(id);
};

Game_System.prototype.unlockAllMusicMenuSongs = function(value) {
  if (this._unlockedMusicMenuSongs === undefined) {
    this.initMusicMenuSettings();
  }
  this._unlockAllMusicMenuSongs = value;
};

Game_System.prototype.isUnlockedAllMusicMenuSongs = function() {
  if (this._unlockedMusicMenuSongs === undefined) {
    this.initMusicMenuSettings();
  }
  return this._unlockAllMusicMenuSongs;
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.MusicMenu.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.MusicMenu.Game_Interpreter_pluginCommand.call(this, command, args);
  if (command === 'GoToMusicMenu') {
    SceneManager.push(Scene_MusicMenu);
  }
  if (command === 'AllMusicMenuSongs') {
    $gameSystem.unlockAllMusicMenuSongs(true);
  }
  if (command === 'NormalMusicMenuSongs') {
    $gameSystem.unlockAllMusicMenuSongs(false);
  }
  if (command === 'UnlockMusicMenuSong') {
    for (var i = 0; i < args.length; i++) {
      var songId = args[i];
      if (songId > 0) {
        $gameSystem.unlockMusicMenuSong(parseInt(songId));
      }
    }
  }
};

//=============================================================================
// Window_MusicMenuList
//=============================================================================

function Window_MusicMenuList() {
    this.initialize.apply(this, arguments);
}

Window_MusicMenuList.prototype = Object.create(Window_Command.prototype);
Window_MusicMenuList.prototype.constructor = Window_MusicMenuList;

Window_MusicMenuList.prototype.initialize = function(helpWindow) {
  this._helpWindow = helpWindow;
  Window_Command.prototype.initialize.call(this, 0, helpWindow.height);
  this.setHelpWindow(helpWindow);
};

Window_MusicMenuList.prototype.windowWidth = function() {
  return Graphics.boxWidth;
};

Window_MusicMenuList.prototype.windowHeight = function() {
  return Graphics.boxHeight - this._helpWindow.height;
};

Window_MusicMenuList.prototype.makeCommandList = function() {
  var array = Yanfly.Param.MusicMenuSongList;
  var length = array.length;
  for (var i = 0; i < length; ++i) {
    var data = array[i];
    if (data.length > 1) {
      var ext = {
        name: data[0],
        volume: data[2],
        pitch: data[3],
        pan: data[4],
        description: ''
      }
      if ($gameSystem.isUnlockedMusicMenuSong(i)) {
        var name = data[1].trim();
        ext.description = data[5].trim();
        var enabled = true;
      } else {
        var name = Yanfly.Param.MusicMenuHiddenName.trim();
        ext.description = Yanfly.Param.MusicMenuHiddenHelp.trim();
        var enabled = false;
      }
      this.addCommand(name, 'playsong', enabled, ext);
    }
  }
};

Window_MusicMenuList.prototype.updateHelp = function() {
  this.setHelpWindowItem(this.currentExt());
};

Window_MusicMenuList.prototype.drawItem = function(index) {
  var rect = this.itemRectForText(index);
  var align = this.itemTextAlign();
  this.resetTextColor();
  this.changePaintOpacity(this.isCommandEnabled(index));
  this.drawIcon(Yanfly.Param.MusicMenuIcon, rect.x + 2, rect.y + 2);
  var ibw = Window_Base._iconWidth + 4;
  var name = this.commandName(index);
  this.drawText(name, rect.x + ibw, rect.y, rect.width - ibw, align);
};

//=============================================================================
// Scene_Menu
//=============================================================================

Scene_Menu.prototype.commandMusicMenu = function() {
  SceneManager.push(Scene_MusicMenu);
};

//=============================================================================
// Scene_MusicMenu
//=============================================================================

function Scene_MusicMenu() {
  this.initialize.apply(this, arguments);
}

Scene_MusicMenu.prototype = Object.create(Scene_MenuBase.prototype);
Scene_MusicMenu.prototype.constructor = Scene_MusicMenu;

Scene_MusicMenu.prototype.initialize = function() {
  Scene_MenuBase.prototype.initialize.call(this);
};

Scene_MusicMenu.prototype.create = function() {
  Scene_MenuBase.prototype.create.call(this);
  this.saveBgmAndBgs();
  AudioManager.fadeOutBgm(1)
  this.createHelpWindow();
  this.createMusicListWindow();
};

Scene_MusicMenu.prototype.saveBgmAndBgs = function() {
  this._mapBgm = AudioManager.saveBgm();
  this._mapBgs = AudioManager.saveBgs();
};

Scene_MusicMenu.prototype.replayBgmAndBgs = function() {
  if (this._mapBgm) {
    AudioManager.replayBgm(this._mapBgm);
  } else {
    AudioManager.stopBgm();
  }
  if (this._mapBgs) {
    AudioManager.replayBgs(this._mapBgs);
  }
};

Scene_MusicMenu.prototype.createMusicListWindow = function() {
  this._musicListWindow = new Window_MusicMenuList(this._helpWindow);
  this.addWindow(this._musicListWindow);
  this._musicListWindow.setHandler('cancel', this.exitScene.bind(this));
  this._musicListWindow.setHandler('playsong', this.playSong.bind(this));
};

Scene_MusicMenu.prototype.exitScene = function() {
  this.replayBgmAndBgs();
  this.popScene();
};

Scene_MusicMenu.prototype.playSong = function() {
  var songData = this._musicListWindow.currentExt();
  AudioManager.playBgm(songData);
  this._musicListWindow.activate();
};

//=============================================================================
// End of File
//=============================================================================