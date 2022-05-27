/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Cooldown extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("0", "./Cooldown/costumes/0.svg", {
        x: 125.6912484848485,
        y: 52
      }),
      new Costume("pose", "./Cooldown/costumes/pose.svg", {
        x: 139.5,
        y: 121.92073000000005
      })
    ];

    this.sounds = [
      new Sound(
        "JoJo's Bizarre Adventure Steel Ball Run OST Main Theme Johnny's Theme Fan Made",
        "./Cooldown/sounds/JoJo's Bizarre Adventure Steel Ball Run OST Main Theme Johnny's Theme Fan Made.mp3"
      )
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked3),
      new Trigger(
        Trigger.BROADCAST,
        { name: "BeatdownStart" },
        this.whenIReceiveBeatdownstart
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "BeatdownEnd" },
        this.whenIReceiveBeatdownend
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
      new Trigger(Trigger.CLONE_START, this.startAsClone3)
    ];

    this.audioEffects.volume = 80;

    this.vars.cooldownnumber2 = 9;
    this.vars.cooldownthing2 = 0;
    this.vars.walk3 = 0;
    this.vars.dummything2 = 0;
    this.vars.clonething1Xv2 = 0;
    this.vars.clonething2Yv2 = 0;
    this.vars.clonething3Direction2 = 0;
    this.vars.wormholething2 = 0;
  }

  *whenGreenFlagClicked() {
    this.vars.cooldownnumber2 = 0;
    this.stage.vars.cooldowns = [];
    for (let i = 0; i < 9; i++) {
      this.stage.vars.cooldowns.push(0);
      this.vars.cooldownnumber2 += 1;
      this.createClone();
      yield;
    }
    this.audioEffects.volume = 80;
    this.stage.costume = "platform1";
    while (true) {
      yield* this.playSoundUntilDone(
        "JoJo's Bizarre Adventure Steel Ball Run OST Main Theme Johnny's Theme Fan Made"
      );
      yield;
    }
  }

  *startAsClone() {
    this.visible = false;
    this.costume = 0;
    if (this.vars.cooldownnumber2 == "menacing") {
      this.direction = 90;
      this.goto(this.sprites["Player"].x, this.sprites["Player"].y);
      this.x += 30;
      this.visible = true;
      this.size = 30;
      this.costume = "pose";
      this.effects.ghost = 100;
      this.vars.cooldownnumber2 = 0;
      this.rotationStyle = Sprite.RotationStyle.ALL_AROUND;
      if (this.touching(this.sprites["Transform"].andClones())) {
        this.deleteThisClone();
      }
      yield* this.wait(0.1);
      for (let i = 0; i < 20; i++) {
        this.vars.cooldownnumber2 += 2.5;
        this.effects.ghost += -15;
        this.goto(this.sprites["Player"].x, this.sprites["Player"].y);
        this.x += 30;
        this.x += this.vars.cooldownnumber2 / 2.25 + this.random(1.5, -1.5);
        this.y += this.vars.cooldownnumber2 + this.random(1.5, -1.5);
        this.direction = 90;
        this.direction += this.random(-5, 5);
        yield;
      }
      for (let i = 0; i < 10; i++) {
        this.vars.cooldownnumber2 += 2.5;
        this.effects.ghost += 10;
        this.goto(this.sprites["Player"].x, this.sprites["Player"].y);
        this.x += 30;
        this.x += this.vars.cooldownnumber2 / 2.25 + this.random(1.5, -1.5);
        this.y += this.vars.cooldownnumber2 + this.random(1.5, -1.5);
        this.direction = 90;
        this.direction += this.random(-5, 5);
        yield;
      }
      this.deleteThisClone();
    }
    if (this.vars.cooldownnumber2 == "poseeffect") {
      this.vars.cooldownnumber2 = "menacing";
      /* TODO: Implement looks_gotofrontback */ null;
      yield* this.wait(0.2);
      /* TODO: Implement looks_gotofrontback */ null;
      while (true) {
        if (this.sprites["Player"].costume.name.includes("pose")) {
          this.createClone();
          yield* this.wait(0.2);
        }
        yield;
      }
    }
    if (this.vars.cooldownnumber2 == 1) {
      this.vars.cooldownnumber2 = "poseeffect";
      this.createClone();
      this.vars.cooldownnumber2 = 1;
    }
    while (true) {
      if (0 < this.stage.vars.cooldowns[this.vars.cooldownnumber2 - 1]) {
        yield* this.wait(
          this.stage.vars.cooldowns[this.vars.cooldownnumber2 - 1]
        );
        this.stage.vars.cooldowns.splice(this.vars.cooldownnumber2 - 1, 1, 0);
      }
      yield;
    }
  }

  *whenGreenFlagClicked2() {
    this.visible = false;
    this.costume = 0;
    this.clearPen();
    this.penColor = Color.rgb(255, 221, 0);
    this.penSize = 5;
    this.vars.cooldownthing2 = 0;
    while (true) {
      this.visible = false;
      this.clearPen();
      this.goto(-230, 150);
      this.vars.cooldownthing2 +=
        (this.sprites["Juan"].vars["horseclone3"] - this.vars.cooldownthing2) /
        2.5;
      if (this.vars.cooldownthing2 < 0.2) {
        this.penDown = false;
      } else {
        this.penDown = true;
      }
      this.x += this.vars.cooldownthing2 / 4;
      this.penDown = false;
      yield;
    }
  }

  *whenGreenFlagClicked3() {
    this.visible = true;
    this.effects.clear();
  }

  *whenIReceiveBeatdownstart() {
    for (let i = 0; i < 10; i++) {
      this.audioEffects.volume += -8;
      yield;
    }
  }

  *whenIReceiveBeatdownend() {
    yield* this.wait(2);
    for (let i = 0; i < 20; i++) {
      this.audioEffects.volume += 4;
      yield;
    }
  }

  *startAsClone2() {
    if (this.vars.cooldownnumber2 == 2) {
      while (true) {
        this.penColor = Color.rgb(0, 187, 255);
        while (!(this.sprites["NailGun"].costume.name[1 - 1] == 2)) {
          yield;
        }
        for (let i = 0; i < 5; i++) {
          this.penColor.h += -8;
          yield;
        }
        while (!(this.sprites["NailGun"].costume.name[1 - 1] == 1)) {
          yield;
        }
        for (let i = 0; i < 5; i++) {
          this.penColor.h += 8;
          yield;
        }
        yield;
      }
    }
  }

  *startAsClone3() {
    if (this.vars.cooldownnumber2 == 2) {
      this.vars.cooldownthing2 = 0;
      this.visible = false;
      while (true) {
        this.penSize = 10;
        this.goto(-230, 160);
        this.vars.cooldownthing2 +=
          (this.stage.vars.nails - this.vars.cooldownthing2) / 2.5;
        if (this.vars.cooldownthing2 < 0.2) {
          this.penDown = false;
        } else {
          this.penDown = true;
        }
        this.x += this.vars.cooldownthing2 * 7.5;
        this.goto(-230, 160);
        this.costume = 0;
        this.visible = true;
        yield;
      }
    }
  }
}
