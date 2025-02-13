//=============================================================================
// Yanfly Engine Plugins - Key Name Entry (American QWERTY English Keyboard)
// YEP_KeyNameEntry.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_KeyNameEntry = true;

var Yanfly = Yanfly || {};
Yanfly.KNE = Yanfly.KNE || {};

//=============================================================================
 /*:
 * @plugindesc 键盘名字输入
 * 允许名称输入处理事件通过键盘按键输入字母和数字.
 * @author Yanfly Engine Plugins
 *
 * @param QWERTY Layout
 * @desc 将屏幕上可见的键盘设置为QWERTY布局？
 * @default true
 *
 * @help
 * ============================================================================
 * 正式介绍
 * ============================================================================
 *
 * 此插件允许您使用键盘在名称输入处理事件上执行名称输入。
 * 在那里，玩家将拥有全系列的键盘来输入角色名称。
 * 如果他们更喜欢手动输入，他们可以单击鼠标或按键盘上的箭头键，
 * 立即将名称输入切换为手动输入。
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version BETA:
 * - Started Plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_KeyNameEntry');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.KNEQwertyLayout = String(Yanfly.Parameters['QWERTY Layout']);
Yanfly.Param.KNEQwertyLayout = eval(Yanfly.Param.KNEQwertyLayout);

if (Yanfly.Param.KNEQwertyLayout) {
  Window_NameInput.LATIN1 =
   ['1','2','3','4','5',  '6','7','8','9','0',
    'Q','W','E','R','T',  'Y','U','I','O','P',
    'A','S','D','F','G',  'H','J','K','L',"'",
    '`','Z','X','C','V',  'B','N','M',',','.',
    'q','w','e','r','t',  'y','u','i','o','p',
    'a','s','d','f','g',  'h','j','k','l',':',
    '~','z','x','c','v',  'b','n','m','"',';',
    '!','@','#','$','%',  '^','&','*','(',')',
    '<','>','[',']',' ',  ' ',' ',' ','Page','OK'];
};

Yanfly.KNE.KeyboardSettingsAmericanEnglish = {
    8: 'backspace',
   13: 'enter',
   16: 'shift',
   32: 'space',
   46: 'delete',

  192: '`',
   48: '0', 49: '1', 50: '2', 51: '3', 52: '4', 53: '5',
   54: '6', 55: '7', 56: '8', 57: '9', 189: '-', 188: '=',
   65: 'a', 66: 'b', 67: 'c', 68: 'd', 69: 'e', 70: 'f', 71: 'g', 72: 'h',
   73: 'i', 74: 'j', 75: 'k', 76: 'l', 77: 'm', 78: 'n', 79: 'o', 80: 'p',
   81: 'q', 82: 'r', 83: 's', 84: 't', 85: 'u', 86: 'v', 87: 'w', 88: 'x',
   89: 'y', 90: 'z',
   219: '[', 220: '\\', 221: ']', 186: ';', 222: "'", 188: '<', 190: '>',
   191: '/'
};

Yanfly.KNE.CheckKeysAmericanEnglish = [
  'backspace', 'enter', 'shift', 'space', 'delete', '`', '[', '\\', ']',
  ';', "'", '<', '>', '/', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g',
  'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'
];

//=============================================================================
// Scene_Name
//=============================================================================

Yanfly.KNE.Scene_Name_create = Scene_Name.prototype.create;
Scene_Name.prototype.create = function() {
  Yanfly.KNE.Scene_Name_create.call(this);
  this.savePreviousKeyboardSettings();
  this.setupKeyboard();
};

Scene_Name.prototype.savePreviousKeyboardSettings = function() {
  this._savedKeyboardSettings = JsonEx.makeDeepCopy(Input.keyMapper);
};

Scene_Name.prototype.setupKeyboard = function() {
  var setting = Yanfly.KNE.KeyboardSettingsAmericanEnglish;
  for (key in setting) {
    Input.keyMapper[key] = setting[key];
  }
};

Yanfly.KNE.Scene_Name_onInputOk = Scene_Name.prototype.onInputOk;
Scene_Name.prototype.onInputOk = function() {
  Yanfly.KNE.Scene_Name_onInputOk.call(this);
  this.restorePreviousKeyboardSettings();
};

Scene_Name.prototype.restorePreviousKeyboardSettings = function() {
  Input.keyMapper = this._savedKeyboardSettings;
  this._savedKeyboardSettings = undefined;
};

//=============================================================================
// Window_NameEdit
//=============================================================================

Window_NameEdit.prototype.update = function() {
  Window_Base.prototype.update.call(this);
  this.updateBackspace();
};

Window_NameEdit.prototype.updateBackspace = function() {
  if (!this.isOpen()) return;
  if (TouchInput.isRepeated() && this.isTouchedInsideFrame()) {
    this.back();
    SoundManager.playCancel();
  };
};

Window_NameEdit.prototype.isTouchedInsideFrame = function() {
  var x = this.canvasToLocalX(TouchInput.x);
  var y = this.canvasToLocalY(TouchInput.y);
  return x >= 0 && y >= 0 && x < this.width && y < this.height;
};

//=============================================================================
// Window_NameInput
//=============================================================================

Window_NameInput.prototype.processHandling = function() {
  if (!this.isOpen()) return;
  if (!this.active) return;
  if (Input.isRepeated('cancel')) {
    this.processBack();
  }
  if (Input.isRepeated('ok')) {
    this.processOk();
  }
  if (Input.isRepeated('backspace')) {
    return this.processBack();
  }
  this.processKeyboardPress();
};

Window_NameInput.prototype.onTouch = function(triggered) {
  var lastIndex = this.index();
  var x = this.canvasToLocalX(TouchInput.x);
  var y = this.canvasToLocalY(TouchInput.y);
  var hitIndex = this.hitTest(x, y);
  this.select(hitIndex);
  if (triggered) this.processOk();
};

Window_NameInput.prototype.processKeyboardPress = function() {
  for (var i = 0; i < Yanfly.KNE.CheckKeysAmericanEnglish.length; ++i) {
    var key = Yanfly.KNE.CheckKeysAmericanEnglish[i];
    if (Input.isTriggered(key)) {
      this.processKeyboardPressedKey(key);
    }
  }
};

Window_NameInput.prototype.processKeyboardPressedKey = function(key) {
  if (key === 'shift') return;
  if (key === 'backspace') return this.processBack();
  if (key === 'delete') return this.processBack();
  if (key === 'space') return this.onNameAddCharacter(' ');
  if (key === 'enter') {
    if (this._index !== 89) {
      this._index = 89;
      SoundManager.playCursor();
    } else {
      this.onNameOk();
    }
    return;
  }
  var text = key;
  if (Input.isPressed('shift')) text = text.toUpperCase();
  if (key === '`' && Input.isPressed('shift')) text = '~';
  if (key === '1' && Input.isPressed('shift')) text = '!';
  if (key === '2' && Input.isPressed('shift')) text = '@';
  if (key === '3' && Input.isPressed('shift')) text = '#';
  if (key === '4' && Input.isPressed('shift')) text = '$';
  if (key === '5' && Input.isPressed('shift')) text = '%';
  if (key === '6' && Input.isPressed('shift')) text = '^';
  if (key === '7' && Input.isPressed('shift')) text = '&';
  if (key === '8' && Input.isPressed('shift')) text = '*';
  if (key === '9' && Input.isPressed('shift')) text = '(';
  if (key === '0' && Input.isPressed('shift')) text = ')';
  if (key === '-' && Input.isPressed('shift')) text = '_';
  if (key === '=' && Input.isPressed('shift')) text = '+';
  if (key === '[' && Input.isPressed('shift')) text = '{';
  if (key === ']' && Input.isPressed('shift')) text = '}';
  if (key === '\\' && Input.isPressed('shift')) text = '|';
  if (key === ';' && Input.isPressed('shift')) text = ':';
  if (key === "'" && Input.isPressed('shift')) text = '"';
  if (key === ',' && Input.isPressed('shift')) text = '<';
  if (key === '.' && Input.isPressed('shift')) text = '>';
  if (key === '/' && Input.isPressed('shift')) text = '?';
  this.onNameAddCharacter(text);
};

Window_NameInput.prototype.onNameAddCharacter = function(text) {
  if (this._editWindow.add(text)) {
    SoundManager.playOk();
  } else {
    SoundManager.playBuzzer();
  }
};

//=============================================================================
// End of File
//=============================================================================

