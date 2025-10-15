// You can write more code here
import Phaser, { Game } from "phaser";
import { container } from "@gl/di/container";

export type SymbolTextureSet = [string, string];

// TODO: Remove hardcode references for assets
export const symbolTextures = [
  ["skin_texture4_level0", "PF.png"], // Ten
  ["skin_texture4_level0", "NF.png"], // J
  ["skin_texture4_level0", "LF.png"], // Q
  ["skin_texture4_level0", "JF.png"], // K
  ["skin_texture4_level0", "DF.png"], // A
  ["skin_texture4_level0", "SE.png"], // Bird
  ["skin_texture4_level0", "TE.png"], // Anubis
  ["skin_texture4_level0", "VE.png"], // Pharaoh
  ["skin_texture4_level0", "WE.png"], // People
  ["skin_texture4_level0", "XE.png"], // Book
];

export const symbolTexturesMobile = [
  ["skin_texture4_level2", "PF.png"], // Ten
  ["skin_texture4_level2", "NF.png"], // J
  ["skin_texture4_level2", "LF.png"], // Q
  ["skin_texture4_level2", "JF.png"], // K
  ["skin_texture4_level2", "DF.png"], // A
  ["skin_texture4_level2", "SE.png"], // Bird
  ["skin_texture4_level2", "TE.png"], // Anubis
  ["skin_texture4_level2", "VE.png"], // Pharaoh
  ["skin_texture4_level2", "WE.png"], // People
  ["skin_texture4_level2", "XE.png"], // Book
];

export const winsSymbolTextures = [
  ["skin_texture2_level0", "OF.png"], // Ten
  ["skin_texture2_level0", "MF.png"], // J
  ["skin_texture2_level0", "KF.png"], // Q
  ["skin_texture2_level0", "IF.png"], // K
  ["skin_texture2_level0", "CF.png"], // A
  ["skin_texture2_level0", "TF.png"], // Bird
  ["skin_texture2_level0", "VG.png"], // Anubis
  ["skin_texture2_level0", "ZF.png"], // Pharaoh
  ["skin_texture2_level0", "BG.png"], // People
  ["skin_texture2_level0", "FG.png"], // Book
];

class ReelsContainer extends Phaser.GameObjects.Container {
  GameState = container.get<VideoSlotGameState>("VideoSlotGameState");
  ReelsManager = container.get<VideoSlotReelsManager>("VideoSlotReelsManager");
  constructor(scene: Reels, x: number, y: number) {
    super(scene, x, y);

    let symbols = [];

    for (let i = 0; i < 5; i++) {
      const symbol = this.GameState.isMobile
        ? symbolTexturesMobile[i]
        : scene.symbolList[i];
      this.ReelsManager.symbolHeight = this.GameState.isMobile ? 125 : 150;

      symbols.push(
        this.symbolSprite(
          0,
          this.ReelsManager.symbolHeight * i,
          symbol[0],
          symbol[1],
          x,
          this.ReelsManager.symbolHeight * i
        )
      );
    }

    symbols[0].disableInteractive();
    symbols[4].disableInteractive();
    this.add(symbols);
    scene.add.existing(this);
  }

  freeSpinChance() {
    let isFreeSpin;
    if (Math.random() < 0.03) {
      isFreeSpin = "book";
    } else if (Math.random() < 0.3) {
      isFreeSpin = "character";
    } else {
      // 70% chance this code runs
      isFreeSpin = "card";
    }
    return isFreeSpin;
  }
  symbolSprite(
    x: number,
    y: number,
    texture: string,
    frame: string,
    xCon: number,
    yCon: number
  ) {
    let container = this.scene.add
      .container(xCon - 125, yCon + 25)
      .setVisible(false)
      .setDepth(2);
    this.paytable(container, frame);
    return this.scene.add
      .sprite(x, y, texture, frame)
      .setScale(this.GameState.isMobile ? 1 : 0.725)
      .setInteractive()
      .on("pointerdown", () => {
        container.visible
          ? container.setVisible(false)
          : container.setVisible(true);
        if (this.GameState.isMobile) container.setVisible(false);
      })
      .on("pointerout", () => {
        if (container.visible) container.setVisible(false);
      });
  }

  paytable(container: Phaser.GameObjects.Container, frame: string) {
    let bgSymbol = this.scene.add.sprite(
      0,
      0,
      this.GameState.isMobile ? "skin_texture2_level2" : "skin_texture2_level0",
      "ZH.png"
    );
    bgSymbol.setScale(this.GameState.isMobile ? 1 : 0.725);
    let txtPaytable1 = this.scene.add
      .text(-70, -5, "x5\nx4\nx3\nx2", {
        // fontSize : '50px',
        color: "#5c2c17",
        // fontFamily : 'flanker',
        font: "100 46px britannicBold",
        align: "center",
        stroke: "#FFDD40",
        strokeThickness: 4,
      })
      .setOrigin(0, 0.5)
      .setScale(0.5);
    let txtPaytable2 = this.scene.add
      .text(-30, -5, "5000\n1000\n100\n10", {
        // fontSize : '50px',
        color: "#FFDD40",
        // fontFamily : 'flanker',
        font: "100 46px britannicBold",
        align: "left",
        stroke: "#5c2c17",
        strokeThickness: 4,
      })
      .setOrigin(0, 0.5)
      .setScale(0.5);

    switch (frame) {
      case "WE.png":
        txtPaytable1.setText("x5\nx4\nx3\nx2");
        txtPaytable2.setText("5000\n1000\n100\n10");
        break;

      case "VE.png":
        txtPaytable1.setText("x5\nx4\nx3\nx2");
        txtPaytable2.setText("2000\n400\n40\n5");
        break;

      case "SE.png":
      case "TE.png":
        txtPaytable1.setText("x5\nx4\nx3\nx2");
        txtPaytable2.setText("750\n100\n30\n5");
        break;

      case "DF.png":
      case "JF.png":
      case "CF.png":
      case "IF.png":
        txtPaytable1.setText("x5\nx4\nx3");
        txtPaytable2.setText("150\n40\n5");
        break;

      case "LF.png":
      case "NF.png":
      case "PF.png":
      case "KF.png":
      case "MF.png":
      case "OF.png":
        txtPaytable1.setText("x5\nx4\nx3");
        txtPaytable2.setText("100\n25\n5");
        break;

      default:
        txtPaytable1.setText("Three symbols\nactivate the FREE\nSPIN feature.");
        txtPaytable1.setStroke("", 0);
        txtPaytable1.setFont("500 22px robotoBold");
        txtPaytable2.setVisible(false);
    }

    container.add([bgSymbol, txtPaytable1, txtPaytable2]);
  }
}
/* START OF COMPILED CODE */

import ReelPrefab from "../bookofdead/scene/prefab/ReelPrefab";
/* START-USER-IMPORTS */
import { VideoSlotGameState } from "../VideoSlotGameState";
import VideoSlotReelsManager from "../VideoSlotReelsManager";
import { Logger } from "@gl/Logger";
/* END-USER-IMPORTS */

export default class Reels extends Phaser.Scene {

	constructor() {
		super("Reels");

		/* START-USER-CTR-CODE */
    // Write your code here.

    // this.machine2 = null;
    // this.containers = null;
    this.symbolList = [];
    this.winSymbolList = [];
    this.freeSymbolList = [];
    this.GameState = container.get<VideoSlotGameState>("VideoSlotGameState");
    this.ReelsManager = container.get<VideoSlotReelsManager>(
      "VideoSlotReelsManager"
    );
    /* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// machine
		const machine = this.add.image(640, 315, "skin_texture5_level2", "A-0.png");
		machine.scaleX = 0.76;
		machine.scaleY = 0.76;

		// machineMobile
		const machineMobile = this.add.image(360, 550, "skin_texture1_level2", "HG.png");
		machineMobile.scaleX = 0.9;
		machineMobile.scaleY = 0.9;
		machineMobile.visible = false;

		// reelPrefab
		const reelPrefab = new ReelPrefab(this, -186, -70);
		this.add.existing(reelPrefab);

		this.machine = machine;
		this.machineMobile = machineMobile;
		this.reelPrefab = reelPrefab;

		this.events.emit("scene-awake");
	}

	public machine!: Phaser.GameObjects.Image;
	public machineMobile!: Phaser.GameObjects.Image;
	public reelPrefab!: ReelPrefab;

	/* START-USER-CODE */
  public GameState: VideoSlotGameState;
  ReelsManager: VideoSlotReelsManager;
  logger = new Logger();
  symbolList: SymbolTextureSet[];
  winSymbolList: SymbolTextureSet[];
  freeSymbolList: SymbolTextureSet[];
  coinWon: SymbolTextureSet;
  paytableSymbol: SymbolTextureSet;
  // Write your code here
  public machine2: Phaser.GameObjects.Sprite;
  containers: ReelsContainer[];
  containerBlur: Phaser.FX.Blur[] = [];
  columnTween: Phaser.Tweens.Tween[] = [];
  blurTween: Phaser.Tweens.Tween[] = [];
  initialized = false;

  PayLines: number[][][] = [
    [
      [0, 1],
      [1, 1],
      [2, 1],
      [3, 1],
      [4, 1],
    ], //line 1
    [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
    ], //line 2
    [
      [0, 2],
      [1, 2],
      [2, 2],
      [3, 2],
      [4, 2],
    ], //line 3
    [
      [0, 0],
      [1, 1],
      [2, 2],
      [3, 1],
      [4, 0],
    ], //line 4
    [
      [0, 2],
      [1, 1],
      [2, 0],
      [3, 1],
      [4, 2],
    ], //line 5
    [
      [0, 1],
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 1],
    ], //line 6
    [
      [0, 1],
      [1, 2],
      [2, 2],
      [3, 2],
      [4, 1],
    ], //line 7
    [
      [0, 0],
      [1, 0],
      [2, 1],
      [3, 2],
      [4, 2],
    ], //line 8
    [
      [0, 2],
      [1, 2],
      [2, 1],
      [3, 0],
      [4, 0],
    ], //line 9
    [
      [0, 1],
      [1, 2],
      [2, 1],
      [3, 0],
      [4, 1],
    ], //line 10
    [
      [0, 1],
      [1, 0],
      [2, 1],
      [3, 2],
      [4, 1],
    ], //line 11
    [
      [0, 0],
      [1, 1],
      [2, 1],
      [3, 1],
      [4, 0],
    ], //line 12
    [
      [0, 2],
      [1, 1],
      [2, 1],
      [3, 1],
      [4, 2],
    ], //line 13
    [
      [0, 0],
      [1, 1],
      [2, 0],
      [3, 1],
      [4, 0],
    ], //line 14
    [
      [0, 2],
      [1, 1],
      [2, 2],
      [3, 1],
      [4, 2],
    ], //line 15
    [
      [0, 1],
      [1, 1],
      [2, 0],
      [3, 1],
      [4, 1],
    ], //line 16
    [
      [0, 1],
      [1, 1],
      [2, 2],
      [3, 1],
      [4, 1],
    ], //line 17
    [
      [0, 0],
      [1, 0],
      [2, 2],
      [3, 0],
      [4, 0],
    ], //line 18
    [
      [0, 2],
      [1, 2],
      [2, 0],
      [3, 2],
      [4, 2],
    ], //line 19
    [
      [0, 0],
      [1, 2],
      [2, 2],
      [3, 2],
      [4, 0],
    ], //line 20
  ];

  PayValues: number[][] = [
    [0, 5, 25, 100], // 10
    [0, 5, 25, 100], // J
    [5, 25, 100], // Q
    [5, 40, 150], // K
    [5, 40, 150], // A
    [5, 30, 100, 750], // Bird
    [5, 30, 100, 750], // Anubis
    [5, 40, 400, 2000], // Pharaoh
    [10, 100, 1350, 5000], // People
    [0, 2, 20, 200], // Book
  ];

  create() {
    this.editorCreate();

    this.logger.trace("Reels scene created");
    this.logger.trace("Is Mobile: " + this.GameState.isMobile);

    this.machine2 = this.GameState.isMobile
      ? this.add.sprite(360, 550, "skin_texture1_level2", "HG.png")
      : this.add.sprite(640, 320, "skin_texture1_level0", "HG.png");
    this.machine2.scaleX = this.GameState.isMobile ? 0.9 : 0.625;
    this.machine2.scaleY = this.GameState.isMobile ? 0.9 : 0.625;
    this.machine2.setCrop(
      0,
      this.GameState.isMobile ? 25 : 40,
      1500,
      this.GameState.isMobile ? 415 : 695
    );
    let mach = this.machine2.createBitmapMask();
    this.machine2.setVisible(false);
    for (let i = 0; i < 5; i++) {
      this.columnTween.push();
      this.blurTween.push();
      this.containerBlur.push();
    }
    console.log("ReelPrefab Symbol List");
    console.log(this.reelPrefab.symbol_list);
    if (!this.GameState.isMobile) {
      this.reelPrefab.symbol_list.forEach((sprite) => {
        this.symbolList.push([sprite.texture.key, sprite.frame.name]);
      });

      this.reelPrefab.win_symbol_list.forEach((sprite) => {
        this.winSymbolList.push([sprite.texture.key, sprite.frame.name]);
      });

      this.reelPrefab.free_symbol_list.forEach((sprite) => {
        this.freeSymbolList.push([sprite.texture.key, sprite.frame.name]);
      });
    } else {
      this.reelPrefab.sd_symbol_list.forEach((sprite) => {
        this.symbolList.push([sprite.texture.key, sprite.frame.name]);
      });

      this.reelPrefab.sd_win_symbol_list.forEach((sprite) => {
        this.winSymbolList.push([sprite.texture.key, sprite.frame.name]);
      });

      this.reelPrefab.sd_free_symbol_list.forEach((sprite) => {
        this.freeSymbolList.push([sprite.texture.key, sprite.frame.name]);
      });
    }

    this.coinWon = this.GameState.isMobile
      ? [
          this.reelPrefab.bgCoinWinMobile.texture.key,
          this.reelPrefab.bgCoinWinMobile.frame.name,
        ]
      : [
          this.reelPrefab.bgCoinWin.texture.key,
          this.reelPrefab.bgCoinWin.frame.name,
        ];
    this.paytableSymbol = this.GameState.isMobile
      ? [
          this.reelPrefab.paytableSymbolSD.texture.key,
          this.reelPrefab.paytableSymbolSD.frame.name,
        ]
      : [
          this.reelPrefab.paytableSymbolHD.texture.key,
          this.reelPrefab.paytableSymbolHD.frame.name,
        ];

    console.log("Reels SymbolList");
    console.log(this.symbolList);
    console.log("Reels WinSymbolList");
    console.log(this.winSymbolList);
    this.containers = [
      new ReelsContainer(
        this,
        this.GameState.isMobile
          ? this.scale.width / 2 - 270
          : this.scale.width / 2 - 310,
        this.GameState.isMobile ? 310 : 30
      ),
      new ReelsContainer(
        this,
        this.GameState.isMobile
          ? this.scale.width / 2 - 135
          : this.scale.width / 2 - 155,
        this.GameState.isMobile ? 310 : 30
      ),
      new ReelsContainer(
        this,
        this.GameState.isMobile ? this.scale.width / 2 : this.scale.width / 2,
        this.GameState.isMobile ? 310 : 30
      ),
      new ReelsContainer(
        this,
        this.GameState.isMobile
          ? this.scale.width / 2 + 135
          : this.scale.width / 2 + 155,
        this.GameState.isMobile ? 310 : 30
      ),
      new ReelsContainer(
        this,
        this.GameState.isMobile
          ? this.scale.width / 2 + 270
          : this.scale.width / 2 + 310,
        this.GameState.isMobile ? 310 : 30
      ),
    ];
    this.containers.forEach((container) => {
      container.setMask(mach);
      container.setPosition(container.x, container.y + 1000);
    });
    this.machine.setAlpha(0);
    this.machineMobile.setAlpha(0);
    this.machine2.setAlpha(0);
    this.containers.forEach((container) => {
      container.setVisible(false);
    });

    this.ReelsManager.bindScene(this);
    this.initialize();

    this.GameState.isShowingMenu.subscribe((val) => {
      if (!this.GameState.isMobile) return;
      if (val) {
        this.machineMobile.setVisible(false);
        this.machine2.setVisible(false);
        for (let i = 0; i < this.containers.length; i++) {
          this.containers[i].setVisible(false);
        }
      } else {
        this.machineMobile.setVisible(true);
        this.machine2.setVisible(true);
        for (let i = 0; i < this.containers.length; i++) {
          this.containers[i].setVisible(true);
        }
      }
    });

    this.GameState.isShowingFeatures.subscribe((val) => {
      // const alpha = val ? 0 : 1; // hide if true, show if false

      if (!val) {
        this.scene.stop(
          this.GameState.isMobile ? "MobileFeaturesScene" : "FeaturesScene"
        );
        if (this.GameState.isMobile) {
          this.machineMobile.setAlpha(1);
        } else {
          this.machine.setAlpha(1);
        }
        this.machine2.setAlpha(1);
        this.containers.forEach((container) => {
          container.setVisible(true);
        });
      }
    });
  }

  createPaytableContainer(x: number, y: number, symbol: number) {
    const bgSymbol = this.add.sprite(
      0,
      0,
      this.paytableSymbol[0],
      this.paytableSymbol[1]
    );
    bgSymbol.setScale(this.GameState.isMobile ? 1 : 0.725);
    const txtPaytable1 = this.add
      .text(-70, -5, "", {
        color: "#5c2c17",
        font: "500 46px britannicBold",
        align: "center",
        stroke: "#FFDD40",
        strokeThickness: 4,
      })
      .setOrigin(0, 0.5)
      .setScale(0.5);
    const txtPaytable2 = this.add
      .text(-30, -5, "", {
        color: "#FFDD40",
        font: "500 46px britannicBold",
        align: "left",
        stroke: "#5c2c17",
        strokeThickness: 4,
      })
      .setOrigin(0, 0.5)
      .setScale(0.5);
    let multiplier = 5;
    const container = this.add
      .container(x - 125, y, [bgSymbol, txtPaytable1, txtPaytable2])
      .setVisible(false);
    if (symbol === 9) {
      txtPaytable1.setText(
        this.cache.json.get("language").texts["IDS_PT_THREE_TRIGGER_FREESPIN"]
      );
      txtPaytable1.setStroke("#5c2c17", 1);
      txtPaytable1.setFont("500 36px robotoBold");
      txtPaytable1.setX(txtPaytable1.x - 5);
      txtPaytable1.setWordWrapWidth(250, true);
      txtPaytable2.setVisible(false);
      return container;
    }
    for (let i = this.PayValues[symbol].length - 1; i >= 0; i--) {
      if (this.PayValues[symbol][i] === 0) {
        return container;
      } else if (i === this.PayValues[symbol].length - 1) {
        txtPaytable1.setText(`${multiplier}x`);
        txtPaytable2.setText(`${this.PayValues[symbol][i]}`);
      } else {
        txtPaytable1.setText(`${txtPaytable1.text}\n${multiplier}x`);
        txtPaytable2.setText(
          `${txtPaytable2.text}\n${this.PayValues[symbol][i]}`
        );
      }
      multiplier--;
    }
    return container;
  }

  update(time: number, delta: number): void {
    this.ReelsManager.update();
  }

  initialize() {
    this.logger.trace("Reels scene initialized");
    this.initialized = true;
    this.machineMobile.setVisible(this.GameState.isMobile ? true : false);
    this.containers?.forEach((container) => {
      this.tweens.add({
        targets: container,
        y: container.y - 1000,
        duration: 1000,
        ease: "Power2",
      });
    });
    if (this.GameState.isShowingFeatures.get()) return;
    this.tweens.add({
      targets: this.GameState.isMobile ? this.machineMobile : this.machine,
      alpha: 1,
      duration: 1000,
      ease: "Power2",
    });
    this.tweens.add({
      targets: this.machine2,
      alpha: 1,
      duration: 1000,
      ease: "Power2",
    });
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
