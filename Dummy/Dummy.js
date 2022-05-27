/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Dummy extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("idle", "./Dummy/costumes/idle.svg", { x: 137, y: 107 }),
      new Costume("jump", "./Dummy/costumes/jump.svg", { x: 137, y: 107 }),
      new Costume("jump2", "./Dummy/costumes/jump2.svg", { x: 137, y: 107 }),
      new Costume("walk1", "./Dummy/costumes/walk1.svg", { x: 137, y: 107 }),
      new Costume("walk2", "./Dummy/costumes/walk2.svg", { x: 137, y: 107 }),
      new Costume("walk3", "./Dummy/costumes/walk3.svg", {
        x: 137,
        y: 106.99999999999997
      }),
      new Costume("walk4", "./Dummy/costumes/walk4.svg", { x: 137, y: 107 }),
      new Costume("laydown", "./Dummy/costumes/laydown.svg", {
        x: 137,
        y: 107
      }),
      new Costume("clone1", "./Dummy/costumes/clone1.svg", { x: 0, y: 0 }),
      new Costume("clone2", "./Dummy/costumes/clone2.svg", { x: 14.5, y: 50.5 })
    ];

    this.sounds = [
      new Sound("Small", "./Dummy/sounds/Small.wav"),
      new Sound("Large", "./Dummy/sounds/Large.wav")
    ];

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "hurt" }, this.whenIReceiveHurt),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "BeatdownStart" },
        this.whenIReceiveBeatdownstart
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];

    this.vars.walk6 = 4.899999999999999;
    this.vars.walk7 = 0;
    this.vars.dummything4 = 0;
  }

  *whenIReceiveHurt() {
    if (!this.costume.name.includes("clone")) {
      this.stage.vars.hurt += 2.2;
    }
  }

  *startAsClone() {
    if (this.costume.name == "clone1") {
      this.costume = "clone2";
      this.visible = false;
      yield* this.wait(1);
      while (true) {
        if (this.stage.costumeNumber == 2) {
          this.goto(this.sprites["Dummy"].x, this.sprites["Dummy"].y);
          this.visible = true;
          this.direction += 10;
          this.costume = "clone2";
          this.createClone();
          this.visible = false;
          if (this.direction < -160) {
            this.stage.vars.hurt += 5;
          }
        }
        yield;
      }
    }
    if (-90 < this.direction && 90 > this.direction) {
      null;
    } else {
      /* TODO: Implement looks_goforwardbackwardlayers */ null;
    }
    this.rotationStyle = Sprite.RotationStyle.DONT_ROTATE;
    this.effects.clear();
    this.size = 80;
    for (let i = 0; i < 40; i++) {
      this.goto(this.sprites["Dummy"].x, this.sprites["Dummy"].y);
      this.move(35);
      this.y = this.sprites["Dummy"].y;
      this.move(5);
      this.effects.ghost += 4;
      yield;
    }
    this.deleteThisClone();
  }

  *whenIReceiveBeatdownstart() {
    yield* this.wait(0.1);
    for (let i = 0; i < 10; i++) {
      this.goto(120, -85);
      yield;
    }
  }

  *whenGreenFlagClicked() {
    this.stage.vars.dummyxv = 0;
    this.stage.vars.dummyyv = 0;
    this.stage.vars.hurt = 0;
    this.visible = true;
    this.goto(80, -101);
    this.direction = -90;
    this.costume = "clone1";
    this.createClone();
    this.costume = "idle";
    while (true) {
      this.rotationStyle = Sprite.RotationStyle.LEFT_RIGHT;
      this.vars.dummything4 = 0;
      if (
        1 > this.stage.vars.hurt &&
        !this.stage.vars.standskill.includes("Beatdown")
      ) {
        if (this.y < -80) {
          this.vars.dummything4 = 0;
          this.direction = -90;
          if (100 < this.x) {
            this.stage.vars.dummyxv += -1.5;
            this.vars.dummything4 = 1;
          }
          if (this.x < 60) {
            this.direction = 90;
            this.stage.vars.dummyxv += 1.5;
            this.vars.dummything4 = 1;
          }
        }
      }
      this.stage.vars.dummyxv = this.stage.vars.dummyxv * 0.8;
      if (this.sprites["Stand"].costume.name.includes("Fist2")) {
        this.stage.vars.dummyyv = this.stage.vars.dummyyv * 0.8;
      } else {
        this.stage.vars.dummyyv += -1;
      }
      this.x += this.stage.vars.dummyxv;
      this.y += this.stage.vars.dummyyv;
      if (-85 < this.y) {
        if (this.stage.vars.dummyyv > 0) {
          this.costume = "jump";
        } else {
          this.costume = "jump2";
        }
      } else {
        this.y = -85;
        this.stage.vars.dummyyv = 0;
        if (this.vars.dummything4 == 1) {
          this.costume = "" + "walk" + this.vars.walk7[1 - 1];
        } else {
          this.costume = "idle";
        }
      }
      if (0 < this.stage.vars.hurt) {
        this.stage.vars.hurt += -2;
        this.rotationStyle = Sprite.RotationStyle.ALL_AROUND;
        this.costume = "idle";
        this.direction += this.random(-180, 180);
        if (150 < this.stage.vars.dummyxv) {
          this.stage.vars.dummyxv = 150;
        }
        if (this.stage.vars.dummyxv < -150) {
          this.stage.vars.dummyxv = -150;
        }
      } else {
        this.stage.vars.hurt = 0;
      }
      if (270 < this.x) {
        this.x = -250;
      }
      if (this.x < -270) {
        this.x = 250;
      }
      this.vars.walk7 += 0.3;
      if (5 < this.vars.walk7) {
        this.vars.walk7 = 1;
      }
      yield;
    }
  }
}
