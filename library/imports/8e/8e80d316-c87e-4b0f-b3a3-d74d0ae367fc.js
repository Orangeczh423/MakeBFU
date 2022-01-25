"use strict";
cc._RF.push(module, '8e80dMWyH5LD7Oj100K42f8', 'Game');
// scripts/Game.js

"use strict";

var Fruit = cc.Class({
  name: 'FruitItem',
  properties: {
    id: 0,
    iconSF: cc.SpriteFrame
  }
});
var JuiceItem = cc.Class({
  name: 'JuiceItem',
  properties: {
    particle: cc.SpriteFrame,
    circle: cc.SpriteFrame,
    slash: cc.SpriteFrame
  }
});
cc.Class({
  "extends": cc.Component,
  properties: {
    fruits: {
      "default": [],
      type: Fruit
    },
    titleText: {
      "default": null,
      type: cc.Node
    },
    score: {
      "default": null,
      type: cc.Node
    },
    ground: {
      "default": null,
      type: cc.Node
    },
    endNodeBG: {
      "default": null,
      type: cc.Node
    },
    endNode: {
      "default": null,
      type: cc.Node
    },
    juices: {
      "default": [],
      type: JuiceItem
    },
    // 动态生成 找到批量处理预置元素的方案
    fruitPrefab: {
      "default": null,
      type: cc.Prefab
    },
    juicePrefab: {
      "default": null,
      type: cc.Prefab
    },
    // todo 可以实现一个audioManager
    boomAudio: {
      "default": null,
      type: cc.AudioClip
    },
    knockAudio: {
      "default": null,
      type: cc.AudioClip
    },
    waterAudio: {
      "default": null,
      type: cc.AudioClip
    }
  },
  onLoad: function onLoad() {
    // 记录当前屏幕大小
    this.lastWidth = this.node.width; // 记录北京林业数量

    this.count = 0;
    this.score = this.score.getComponent(cc.Label); // 设置地面位置

    this.ground.y = 15;
    this.isCreating = false;
    this.fruitCount = 0;
    this.isEnd = false; // 距离上边界的位置

    this.topBound = 15; // 地面位置

    this.buttomBound = 15;
    this.initPhysics();
    this.initBound(); // 监听点击事件 todo 是否能够注册全局事件

    this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    cc.view.resizeWithBrowserSize(false);
    this.initOneFruit();
    var meta = ["开发者:原项目开发(暂未找到),JinYu", "本项目仓库地址：https://github.com/Kingfish404/Make-WUT", "原项目：武汉理工大学", "北京林业大学信息学院数字媒体技术 ByCZH", "翻制date:2022-01-25"];

    for (var _i = 0, _meta = meta; _i < _meta.length; _i++) {
      var i = _meta[_i];
      console.log(i);
    }
  },
  // 开启物理引擎和碰撞检测
  initPhysics: function initPhysics() {
    // 物理引擎
    var instance = cc.director.getPhysicsManager();
    instance.enabled = true; // instance.debugDrawFlags = 4

    instance.gravity = cc.v2(0, -960); // 碰撞检测

    var collisionManager = cc.director.getCollisionManager();
    collisionManager.enabled = true;
  },
  // 设置边界和UI位置
  initBound: function initBound() {
    // 设置标题位置
    this.titleText.x = 15; // 设置分数位置

    this.score.node.x = this.node.width - 15; // 设置四周的碰撞区域

    var width = this.node.width;
    var height = this.node.height;
    var node = new cc.Node();
    var body = node.addComponent(cc.RigidBody);
    body.type = cc.RigidBodyType.Static;

    var _addBound = function _addBound(node, x, y, width, height) {
      var collider = node.addComponent(cc.PhysicsBoxCollider);
      collider.offset.x = x;
      collider.offset.y = y;
      collider.size.width = width;
      collider.size.height = height;
    };

    _addBound(node, 0, -height / 2 + this.buttomBound, width, 1);

    _addBound(node, 0, height / 2, width, 1);

    _addBound(node, -width / 2, 0, 1, height);

    _addBound(node, width / 2, 0, 1, height);

    node.parent = this.node;
  },
  initOneFruit: function initOneFruit(id) {
    if (id === void 0) {
      id = 1;
    }

    this.fruitCount++;
    this.currentFruit = this.createFruitOnPos(0, 400, id);
  },
  // 监听屏幕点击完毕
  onTouchEnd: function onTouchEnd(e) {
    var _this = this;

    if (this.isCreating) {
      return;
    }

    if (this.isEnd) {
      if (this.currentFruit) {
        var cur = this.currentFruit;
        this.currentFruit.removeFromParent(false);
      }

      return;
    }

    if (this.lastWidth != this.node.width) {
      // 屏幕大小改变了，重新设置边界
      this.initBound();
    }

    this.isCreating = true;
    var fruit = this.currentFruit;
    var width = this.node.width;
    var pos = e.getLocation();
    var x = pos.x - width / 2;
    fruit.x = x;
    cc.tween(fruit).by(0, {
      position: cc.v2(0, 0)
    }, {
      easing: function easing(t) {
        return 100000 * t * t;
      }
    }).call(function () {
      // 开启物理效果
      _this.startFruitPhysics(fruit); // 0.75s后重新生成一个


      _this.scheduleOnce(function () {
        var nextId = _this.getNextFruitId();

        _this.initOneFruit(nextId);

        _this.isCreating = false;
      }, 0.75);
    }).start();
  },
  // 监听屏幕移动
  onTouchMove: function onTouchMove(e) {
    if (this.isCreating) {
      return;
    }

    var width = this.node.width;
    var pos = e.getLocation();
    var x;

    if (pos.x <= this.currentFruit.width / 2 || pos.x >= width - this.currentFruit.width / 2) {
      return;
    } else {
      x = pos.x - width / 2;
    }

    this.currentFruit.x = x;
  },
  // 获取下一个水果的id
  getNextFruitId: function getNextFruitId() {
    if (this.fruitCount < 3) {
      return 1;
    } else if (this.fruitCount === 3) {
      return 2;
    } else {
      // 随机返回前5个
      return Math.floor(Math.random() * 5) + 1;
    }
  },
  // 创建一个水果
  createOneFruit: function createOneFruit(num) {
    var fruit = cc.instantiate(this.fruitPrefab);
    var config = this.fruits[num - 1];
    fruit.getComponent('Fruit').init({
      id: config.id,
      iconSF: config.iconSF
    });
    fruit.getComponent(cc.RigidBody).type = cc.RigidBodyType.Static;
    fruit.getComponent(cc.PhysicsCircleCollider).radius = 0;
    this.node.addChild(fruit);
    fruit.scale = 0.6; // 有Fruit组件传入

    fruit.on('sameContact', this.onSameFruitContact.bind(this));
    fruit.on('checkBound', this.onCheckBound.bind(this));
    return fruit;
  },
  startFruitPhysics: function startFruitPhysics(fruit) {
    fruit.getComponent(cc.RigidBody).type = cc.RigidBodyType.Dynamic;
    var physicsCircleCollider = fruit.getComponent(cc.PhysicsCircleCollider);
    physicsCircleCollider.radius = fruit.height / 2;
    physicsCircleCollider.apply();
  },
  // 在指定位置生成水果
  createFruitOnPos: function createFruitOnPos(x, y, type) {
    if (type === void 0) {
      type = 1;
    }

    var fruit = this.createOneFruit(type);
    cc.tween(fruit).to(0.25, {
      scale: 0.8
    }).start();
    fruit.setPosition(cc.v2(x, y));
    return fruit;
  },
  // 两个水果碰撞
  onSameFruitContact: function onSameFruitContact(_ref) {
    var self = _ref.self,
        other = _ref.other;
    other.node.off('sameContact'); // 两个node都会触发，todo 看看有没有其他方法只展示一次的

    var id = other.getComponent('Fruit').id; // todo 可以使用对象池回收

    self.node.removeFromParent(false);
    other.node.removeFromParent(false);
    var _other$node = other.node,
        x = _other$node.x,
        y = _other$node.y;
    this.createFruitJuice(id, cc.v2({
      x: x,
      y: y
    }), other.node.width);
    var nextId = id + 1;

    if (nextId <= 9) {
      if (nextId == 8) {
        // 统计数量
        this.count++;
      }

      if (nextId == 9) {
        nextId = 1;
      }

      var newFruit = this.createFruitOnPos(x, y, nextId); // 分数累加

      this.score.string = String(parseInt(this.score.string) + nextId * 10);
      this.startFruitPhysics(newFruit); // 展示动画 todo 动画效果需要调整

      newFruit.scale = 0;
      cc.tween(newFruit).to(.5, {
        scale: 0.8
      }, {
        easing: "backOut"
      }).start();
    } else {
      // todo 合成两个西瓜
      console.log(' todo 合成两个最大的 还没有实现哦~ ');
    }
  },
  // 检测当前的两个水果是否超出边界了
  onCheckBound: function onCheckBound(_ref2) {
    var _this2 = this;

    var self = _ref2.self,
        other = _ref2.other;

    if (this.lastWidth == this.node.width && self.node.y + self.node.width / 2 > this.node.y - this.topBound) {
      // TODO fix bug in here
      var last_x = self.node.x;
      setTimeout(function () {
        if (_this2.lastWidth == _this2.node.width && last_x == self.node.x && self.node.y + self.node.width / 2 > _this2.node.y - _this2.topBound) {
          console.log("超出范围啦"); // 设置显示结束

          _this2.endNode.x = _this2.node.width / 2;
          _this2.endNode.y = _this2.node.height / 2;
          _this2.endNodeBG.x = _this2.node.width / 2;
          _this2.endNodeBG.y = _this2.node.height / 2;

          var end_msg = _this2.endNode.getComponent(cc.Label);

          if (_this2.count == 0) {} else {
            end_msg.string = '恭喜你合成了\n\n' + _this2.count + '个北林绿团';
          }

          _this2.isEnd = true;
        }
      }, 1500);
    }
  },
  // 合并时的动画效果
  createFruitJuice: function createFruitJuice(id, pos, n) {
    // 播放合并的声音
    cc.audioEngine.play(this.boomAudio, false, 1);
    cc.audioEngine.play(this.waterAudio, false, 1); // 展示动画

    var juice = cc.instantiate(this.juicePrefab);
    this.node.addChild(juice);
    var config = this.juices[id - 1];
    var instance = juice.getComponent('Juice');
    instance.init(config);
    instance.showJuice(pos, n);
  }
});

cc._RF.pop();