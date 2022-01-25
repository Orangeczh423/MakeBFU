"use strict";
cc._RF.push(module, '365b4UAiQRBA7QXa2IuFMmj', 'Fruit');
// scripts/Fruit.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    id: 0
  },
  init: function init(data) {
    this.id = data.id;
    var sp = this.node.getComponent(cc.Sprite);
    sp.spriteFrame = data.iconSF; // todo 控制一下每种水果的尺寸
  },
  start: function start() {},
  onBeginContact: function onBeginContact(contact, self, other) {
    // 貌似检测有点消耗性能
    if (self.node && other.node) {
      var s = self.node.getComponent('Fruit');
      var o = other.node.getComponent('Fruit');

      if (s && o && s.id === o.id && s.id < 9) {
        self.node.emit('sameContact', {
          self: self,
          other: other
        });
      } else {
        self.node.emit('checkBound', {
          self: self,
          other: other
        });
      }
    }
  }
});

cc._RF.pop();