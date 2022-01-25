
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Fruit.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcRnJ1aXQuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJpZCIsImluaXQiLCJkYXRhIiwic3AiLCJub2RlIiwiZ2V0Q29tcG9uZW50IiwiU3ByaXRlIiwic3ByaXRlRnJhbWUiLCJpY29uU0YiLCJzdGFydCIsIm9uQmVnaW5Db250YWN0IiwiY29udGFjdCIsInNlbGYiLCJvdGhlciIsInMiLCJvIiwiZW1pdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLEVBQUUsRUFBRTtBQURJLEdBSFA7QUFNTEMsRUFBQUEsSUFOSyxnQkFNQUMsSUFOQSxFQU1NO0FBQ1AsU0FBS0YsRUFBTCxHQUFVRSxJQUFJLENBQUNGLEVBQWY7QUFDQSxRQUFNRyxFQUFFLEdBQUcsS0FBS0MsSUFBTCxDQUFVQyxZQUFWLENBQXVCVCxFQUFFLENBQUNVLE1BQTFCLENBQVg7QUFDQUgsSUFBQUEsRUFBRSxDQUFDSSxXQUFILEdBQWlCTCxJQUFJLENBQUNNLE1BQXRCLENBSE8sQ0FJUDtBQUNILEdBWEk7QUFZTEMsRUFBQUEsS0FaSyxtQkFZRyxDQUVQLENBZEk7QUFlTEMsRUFBQUEsY0FmSywwQkFlVUMsT0FmVixFQWVtQkMsSUFmbkIsRUFleUJDLEtBZnpCLEVBZWdDO0FBQ2pDO0FBQ0EsUUFBSUQsSUFBSSxDQUFDUixJQUFMLElBQWFTLEtBQUssQ0FBQ1QsSUFBdkIsRUFBNkI7QUFDekIsVUFBTVUsQ0FBQyxHQUFHRixJQUFJLENBQUNSLElBQUwsQ0FBVUMsWUFBVixDQUF1QixPQUF2QixDQUFWO0FBQ0EsVUFBTVUsQ0FBQyxHQUFHRixLQUFLLENBQUNULElBQU4sQ0FBV0MsWUFBWCxDQUF3QixPQUF4QixDQUFWOztBQUNBLFVBQUlTLENBQUMsSUFBSUMsQ0FBTCxJQUFVRCxDQUFDLENBQUNkLEVBQUYsS0FBU2UsQ0FBQyxDQUFDZixFQUFyQixJQUEyQmMsQ0FBQyxDQUFDZCxFQUFGLEdBQU8sQ0FBdEMsRUFBeUM7QUFDckNZLFFBQUFBLElBQUksQ0FBQ1IsSUFBTCxDQUFVWSxJQUFWLENBQWUsYUFBZixFQUE4QjtBQUFFSixVQUFBQSxJQUFJLEVBQUpBLElBQUY7QUFBUUMsVUFBQUEsS0FBSyxFQUFMQTtBQUFSLFNBQTlCO0FBQ0gsT0FGRCxNQUVPO0FBQ0hELFFBQUFBLElBQUksQ0FBQ1IsSUFBTCxDQUFVWSxJQUFWLENBQWUsWUFBZixFQUE2QjtBQUFFSixVQUFBQSxJQUFJLEVBQUpBLElBQUY7QUFBUUMsVUFBQUEsS0FBSyxFQUFMQTtBQUFSLFNBQTdCO0FBQ0g7QUFDSjtBQUNKO0FBMUJJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGlkOiAwLFxuICAgIH0sXG4gICAgaW5pdChkYXRhKSB7XG4gICAgICAgIHRoaXMuaWQgPSBkYXRhLmlkXG4gICAgICAgIGNvbnN0IHNwID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpXG4gICAgICAgIHNwLnNwcml0ZUZyYW1lID0gZGF0YS5pY29uU0ZcbiAgICAgICAgLy8gdG9kbyDmjqfliLbkuIDkuIvmr4/np43msLTmnpznmoTlsLrlr7hcbiAgICB9LFxuICAgIHN0YXJ0KCkge1xuXG4gICAgfSxcbiAgICBvbkJlZ2luQ29udGFjdChjb250YWN0LCBzZWxmLCBvdGhlcikge1xuICAgICAgICAvLyDosozkvLzmo4DmtYvmnInngrnmtojogJfmgKfog71cbiAgICAgICAgaWYgKHNlbGYubm9kZSAmJiBvdGhlci5ub2RlKSB7XG4gICAgICAgICAgICBjb25zdCBzID0gc2VsZi5ub2RlLmdldENvbXBvbmVudCgnRnJ1aXQnKVxuICAgICAgICAgICAgY29uc3QgbyA9IG90aGVyLm5vZGUuZ2V0Q29tcG9uZW50KCdGcnVpdCcpXG4gICAgICAgICAgICBpZiAocyAmJiBvICYmIHMuaWQgPT09IG8uaWQgJiYgcy5pZCA8IDkpIHtcbiAgICAgICAgICAgICAgICBzZWxmLm5vZGUuZW1pdCgnc2FtZUNvbnRhY3QnLCB7IHNlbGYsIG90aGVyIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxmLm5vZGUuZW1pdCgnY2hlY2tCb3VuZCcsIHsgc2VsZiwgb3RoZXIgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxufSk7XG4iXX0=