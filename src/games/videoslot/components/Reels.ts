
// You can write more code here
import Phaser from "phaser";
import { container } from "@gl/di/container";

export type SymbolTextureSet = [string, string];

// TODO: Remove hardcode references for assets
export const symbolTextures = [
    ['skin_texture4_level0', 'PF.png'], // Ten
    ['skin_texture4_level0', 'NF.png'], // J
    ['skin_texture4_level0', 'LF.png'], // Q
    ['skin_texture4_level0', 'JF.png'], // K
    ['skin_texture4_level0', 'DF.png'], // A
    ['skin_texture4_level0', 'SE.png'], // Bird
    ['skin_texture4_level0', 'TE.png'], // Anubis
    ['skin_texture4_level0', 'VE.png'], // Pharaoh
    ['skin_texture4_level0', 'WE.png'], // People
    ['skin_texture4_level0', 'XE.png'], // Book
];

export const symbolTexturesMobile = [
    ['skin_texture4_level2', 'PF.png'], // Ten
    ['skin_texture4_level2', 'NF.png'], // J
    ['skin_texture4_level2', 'LF.png'], // Q
    ['skin_texture4_level2', 'JF.png'], // K
    ['skin_texture4_level2', 'DF.png'], // A
    ['skin_texture4_level2', 'SE.png'], // Bird
    ['skin_texture4_level2', 'TE.png'], // Anubis
    ['skin_texture4_level2', 'VE.png'], // Pharaoh
    ['skin_texture4_level2', 'WE.png'], // People
    ['skin_texture4_level2', 'XE.png'], // Book
];

export const winsSymbolTextures = [
    ['skin_texture2_level0', 'OF.png'], // Ten
    ['skin_texture2_level0', 'MF.png'], // J
    ['skin_texture2_level0', 'KF.png'], // Q
    ['skin_texture2_level0', 'IF.png'], // K
    ['skin_texture2_level0', 'CF.png'], // A
    ['skin_texture2_level0', 'TF.png'], // Bird
    ['skin_texture2_level0', 'VG.png'], // Anubis
    ['skin_texture2_level0', 'ZF.png'], // Pharaoh
    ['skin_texture2_level0', 'BG.png'], // People
    ['skin_texture2_level0', 'FG.png'], // Book
];

class ReelsContainer extends Phaser.GameObjects.Container {
    GameState = container.get<VideoSlotGameState>("VideoSlotGameState");
    ReelsManager = container.get<VideoSlotReelsManager>("VideoSlotReelsManager");
    constructor(scene: Reels, x: number, y: number) {
        super(scene, x, y)

        // if(options.isMobile){
        //     options.symbolHeight = 110
        //     console.log(options.symbolHeight)
        // }
        
        let symbols = [];

        for(let i=0;i<5;i++) {
            const symbol = this.GameState.isMobile ? symbolTexturesMobile[i] : scene.symbolList[i];
            this.ReelsManager.symbolHeight = this.GameState.isMobile ? 100 : 200

            symbols.push(this.symbolSprite(0, this.ReelsManager.symbolHeight * i, symbol[0], symbol[1], x, this.ReelsManager.symbolHeight * i))
        }

        // if(GameState.isMobile){
        //     symbols[0].setScale(.55)
        //     symbols[1].setScale(.55)
        //     symbols[2].setScale(.55)
        //     symbols[3].setScale(.55)
        //     symbols[4].setScale(.55)
        // }
        symbols[0].disableInteractive()
        symbols[4].disableInteractive()
        this.add(symbols);
        scene.add.existing(this);
    }

    freeSpinChance(){
        let isFreeSpin
        if (Math.random() < 0.03) {
            isFreeSpin = 'book'
        }
        else if (Math.random() < 0.3) {
            isFreeSpin = 'character'
        }
        else{
            // 70% chance this code runs
            isFreeSpin = 'card'
        }
        return isFreeSpin
    }
    symbolSprite(x: number, y: number, texture: string, frame: string, xCon:number, yCon: number){
        let container = this.scene.add.container(xCon - 125, yCon + 25).setVisible(false).setDepth(2)
        this.paytable(container, frame)
        return this.scene.add.sprite(x, y, texture, frame)
                .setScale(this.GameState.isMobile ? .8 : 1)
                .setInteractive()
                .on('pointerdown', () => {
                    container.visible ? container.setVisible(false) : container.setVisible(true);
				    if(this.GameState.isMobile) container.setVisible(false)
                })
                .on('pointerout', () => {
				    if(container.visible) container.setVisible(false)
                })
    }

    paytable(container: Phaser.GameObjects.Container, frame: string){
        let bgSymbol = this.scene.add.sprite(0, 0, this.GameState.isMobile ? 'skin_texture2_level2' : 'skin_texture2_level0', 'ZH.png')
        let txtPaytable1 = this.scene.add.text(-100, -10, 'x5\nx4\nx3\nx2', {
            // fontSize : '50px',
            color : '#5c2c17',
            // fontFamily : 'flanker',
            font: '100 30px britannicBold',
            align: 'center',
            stroke: '#FFDD40',
            strokeThickness: 3,
        }).setOrigin(0, .5)
        let txtPaytable2 = this.scene.add.text(-50, -10, '5000\n1000\n100\n10', {
            // fontSize : '50px',
            color : '#FFDD40',
            // fontFamily : 'flanker',
            font: '100 30px britannicBold',
            align: 'left',
            stroke: '#5c2c17',
            strokeThickness: 3,
        }).setOrigin(0, .5)

        switch(frame){
            case 'WE.png':
                txtPaytable1.setText('x5\nx4\nx3\nx2')
                txtPaytable2.setText('5000\n1000\n100\n10')
                break;

            case 'VE.png':
                txtPaytable1.setText('x5\nx4\nx3\nx2')
                txtPaytable2.setText('2000\n400\n40\n5')
                break;

            case 'SE.png':
            case 'TE.png':
                txtPaytable1.setText('x5\nx4\nx3\nx2')
                txtPaytable2.setText('750\n100\n30\n5')
                break;

            case 'DF.png':
            case 'JF.png':
            case 'CF.png':
            case 'IF.png':
                txtPaytable1.setText('x5\nx4\nx3')
                txtPaytable2.setText('150\n40\n5')
                break;

            case 'LF.png':
            case 'NF.png':
            case 'PF.png':
            case 'KF.png':
            case 'MF.png':
            case 'OF.png':
                txtPaytable1.setText('x5\nx4\nx3')
                txtPaytable2.setText('100\n25\n5')
                break;

            default:
                txtPaytable1.setText('Three symbols\nactivate the FREE\nSPIN feature.')
                txtPaytable1.setStroke('', 0)
                txtPaytable1.setFont('500 22px robotoBold')
                txtPaytable2.setVisible(false)
        }

        container.add([bgSymbol, txtPaytable1, txtPaytable2])
    }
}
/* START OF COMPILED CODE */

import ReelPrefab from "../bookofdead/scene/prefab/ReelPrefab";
import { VideoSlotGameState } from "../VideoSlotGameState";
import VideoSlotReelsManager from "../VideoSlotReelsManager";
import { Logger } from "@gl/Logger";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Reels extends Phaser.Scene {
	constructor() {
		super("Reels");
		/* START-USER-CTR-CODE */
		// Write your code here.
        this.machine2 = null;
        this.containers = null;
        this.symbolList = [];
        this.winSymbolList = [];
        this.freeSymbolList = [];
        this.GameState = container.get<VideoSlotGameState>("VideoSlotGameState");
        this.ReelsManager = container.get<VideoSlotReelsManager>("VideoSlotReelsManager");
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// machine
		const machine = this.add.image(800, 410, "skin_texture1_level0", "HG.png");
		machine.scaleX = 0.85;
		machine.scaleY = 0.85;

		// machineMobile
		const machineMobile = this.add.image(270, 395, "skin_texture1_level2", "HG.png");
		machineMobile.scaleX = 0.7;
		machineMobile.scaleY = 0.7;
		machineMobile.visible = false;

		// reelPrefab
		const reelPrefab = new ReelPrefab(this, -186, -70);
		this.add.existing(reelPrefab);

		this.machine = machine;
		this.machineMobile = machineMobile;
		this.reelPrefab = reelPrefab;

		this.events.emit("scene-awake");
	}

	private machine!: Phaser.GameObjects.Image;
	private machineMobile!: Phaser.GameObjects.Image;
	private reelPrefab!: ReelPrefab;

	/* START-USER-CODE */
    GameState: VideoSlotGameState;
    ReelsManager: VideoSlotReelsManager;
    logger = new Logger();
    symbolList: SymbolTextureSet[];
    winSymbolList: SymbolTextureSet[];
    freeSymbolList: SymbolTextureSet[];
	// Write your code here
    machine2: Phaser.GameObjects.Sprite | null;
    containers: ReelsContainer[] | null;
    containerBlur: Phaser.FX.Blur[] = [];
    columnTween: Phaser.Tweens.Tween[] = [];
    blurTween: Phaser.Tweens.Tween[] = [];
    initialized = false;

	create() {
		this.editorCreate();

        this.logger.trace("Reels scene created");
        this.logger.trace("Is Mobile: " + this.GameState.isMobile);
		this.machine2 = this.GameState.isMobile ? this.add.sprite(270, 395, "skin_texture1_level2", "HG.png") : this.add.sprite(800, 410, "skin_texture1_level0", "HG.png");
		this.machine2.scaleX = this.GameState.isMobile ? 0.7 : 0.85;
		this.machine2.scaleY = this.GameState.isMobile ? 0.7 : 0.85;
		this.machine2.setCrop(0, this.GameState.isMobile ? 25 : 40, 1500, this.GameState.isMobile ? 415 : 695)
		let mach = this.machine2.createBitmapMask();
        for(let i = 0; i < 5; i++) {
            this.columnTween.push();
            this.blurTween.push();
            this.containerBlur.push();
        }
        console.log("ReelPrefab Symbol List");
        console.log(this.reelPrefab.symbol_list);
        if(!this.GameState.isMobile) {
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
        


        console.log("Reels SymbolList");
        console.log(this.symbolList);
        console.log("Reels WinSymbolList");
        console.log(this.winSymbolList);
		this.containers = [
			new ReelsContainer(this, this.GameState.isMobile ? 270 - 210 : 800 - 424, this.GameState.isMobile ? 200 : 20),
            new ReelsContainer(this, this.GameState.isMobile ? 270 - 105 : 800 - 212, this.GameState.isMobile ? 200 : 20),
            new ReelsContainer(this, this.GameState.isMobile ? 270 : 800, this.GameState.isMobile ? 200 : 20),
            new ReelsContainer(this, this.GameState.isMobile ? 270 + 105 : 800 + 212, this.GameState.isMobile ? 200 : 20),
            new ReelsContainer(this, this.GameState.isMobile ? 270 + 210 : 800 + 424, this.GameState.isMobile ? 200 : 20)
		]
		this.containers.forEach(container => {
            container.setMask(mach);
            container.setPosition(container.x, container.y + 1000);
        });
        this.machine.setAlpha(0);
        this.machineMobile.setAlpha(0);
		this.machine2.setAlpha(0);

		this.ReelsManager.bindScene(this)
        this.initialize();
	}

	update(time: number, delta: number): void {
        this.ReelsManager.update();
    }

	initialize() {
        this.logger.trace("Reels scene initialized");
        this.initialized = true;
        this.machineMobile.setVisible(this.GameState.isMobile ? true : false)
        this.containers?.forEach(container => {

            this.tweens.add({
                targets: container,
                y: container.y - 1000,
                duration: 1000,
                ease: 'Power2',
            });
        });

        this.tweens.add({
            targets: this.GameState.isMobile ? this.machineMobile : this.machine,
            alpha: 1,
            duration: 1000,
            ease: 'Power2',
        });
        this.tweens.add({
            targets: this.machine2,
            alpha: 1,
            duration: 1000,
            ease: 'Power2',
        });
    }

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here