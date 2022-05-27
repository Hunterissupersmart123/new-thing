import { Project } from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import VisualEffects from "./VisualEffects/VisualEffects.js";
import Cooldown from "./Cooldown/Cooldown.js";
import Player from "./Player/Player.js";
import Dummy from "./Dummy/Dummy.js";
import Stand from "./Stand/Stand.js";
import Standfist from "./Standfist/Standfist.js";
import NailGun from "./NailGun/NailGun.js";
import Juan from "./Juan/Juan.js";
import SpecialeEffects from "./SpecialeEffects/SpecialeEffects.js";
import Transform from "./Transform/Transform.js";

const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  VisualEffects: new VisualEffects({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 4,
    size: 240,
    visible: true
  }),
  Cooldown: new Cooldown({
    x: -230,
    y: 150,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false
  }),
  Player: new Player({
    x: -150,
    y: 8,
    direction: 90,
    costumeNumber: 14,
    size: 80,
    visible: true
  }),
  Dummy: new Dummy({
    x: 80,
    y: -85,
    direction: -90,
    costumeNumber: 1,
    size: 80,
    visible: true
  }),
  Stand: new Stand({
    x: -179.9999989578632,
    y: 64.42677431335709,
    direction: 90,
    costumeNumber: 7,
    size: 80,
    visible: true
  }),
  Standfist: new Standfist({
    x: 2.973918865036829,
    y: -34.216023848572604,
    direction: 90,
    costumeNumber: 1,
    size: 80,
    visible: false
  }),
  NailGun: new NailGun({
    x: -80,
    y: 16,
    direction: 90,
    costumeNumber: 3,
    size: 79,
    visible: true
  }),
  Juan: new Juan({
    x: -150,
    y: -53,
    direction: 90,
    costumeNumber: 1,
    size: 80,
    visible: true
  }),
  SpecialeEffects: new SpecialeEffects({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 10,
    visible: false
  }),
  Transform: new Transform({
    x: -384.73904733356034,
    y: -148.51362679200003,
    direction: 169.921875,
    costumeNumber: 1,
    size: 140,
    visible: false
  })
};

const project = new Project(stage, sprites);
export default project;
