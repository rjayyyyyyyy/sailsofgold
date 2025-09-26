
// You can write more code here

import { VideoSlotGameState } from "@games/videoslot/VideoSlotGameState";
import { container } from "@gl/di/container";
import Dispatcher, { ACTION_EVENTS } from "@gl/events/Dispatcher";
import { IGameConfig } from "@gl/GameConfig";
import NetworkManager from "@gl/networking/NetworkManager";
import { Slider } from "phaser3-rex-plugins/templates/ui/ui-components";

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class AutoplayScene extends Phaser.Scene {

	constructor() {
		super("AutoplayScene");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// backgroundBlack
		const backgroundBlack = this.add.rectangle(640, 360, 128, 128);
		backgroundBlack.setInteractive(new Phaser.Geom.Rectangle(0, 0, 128, 128), Phaser.Geom.Rectangle.Contains);
		backgroundBlack.scaleX = 12.5;
		backgroundBlack.scaleY = 7;
		backgroundBlack.isFilled = true;
		backgroundBlack.fillColor = 0;
		backgroundBlack.fillAlpha = 0.5;

		// bgAutoplay
		const bgAutoplay = this.add.image(640, 360, "videoslot_popup_texture0_level0", "DB.png");
		bgAutoplay.scaleX = 0.8;
		bgAutoplay.scaleY = 0.8;

		// txtTitle
		const txtTitle = this.add.text(640, 162, "", {});
		txtTitle.scaleX = 0.4;
		txtTitle.scaleY = 0.5;
		txtTitle.setOrigin(0.5, 0.5);
		txtTitle.text = "IDS_AP_CAPTION";
		txtTitle.setStyle({ "align": "center", "color": "#EBB122", "fontFamily": "ROBOTO_CONDENSED_BOLD", "fontSize": "40px" });

		// txtStopAutoplay
		const txtStopAutoplay = this.add.text(460, 237, "", {});
		txtStopAutoplay.scaleX = 0.4;
		txtStopAutoplay.scaleY = 0.5;
		txtStopAutoplay.setOrigin(0, 0.5);
		txtStopAutoplay.text = "IDS_AP_STOPAUTOPLAY";
		txtStopAutoplay.setStyle({ "align": "center", "fontFamily": "ROBOTO_CONDENSED_BOLD", "fontSize": "30px" });

		// valueAnyWin1
		const valueAnyWin1 = this.add.image(480, 270, "videoslot_popup_texture0_level0", "GB.png");
		valueAnyWin1.setInteractive(this.input.makePixelPerfect());

		// valueAnyWin2
		const valueAnyWin2 = this.add.image(470, 270, "videoslot_popup_texture0_level0", "IB.png");
		valueAnyWin2.setInteractive(this.input.makePixelPerfect());

		// txtAnyWin
		const txtAnyWin = this.add.text(507, 270, "", {});
		txtAnyWin.scaleX = 0.4;
		txtAnyWin.scaleY = 0.5;
		txtAnyWin.setOrigin(0, 0.5);
		txtAnyWin.text = "IDS_AP_ONANYWIN";
		txtAnyWin.setStyle({ "align": "center", "fontFamily": "ROBOTO_CONDENSED_BOLD", "fontSize": "30px" });

		// valueFreeSpins1
		const valueFreeSpins1 = this.add.image(670, 270, "videoslot_popup_texture0_level0", "GB.png");
		valueFreeSpins1.setInteractive(this.input.makePixelPerfect());

		// valueFreeSpins2
		const valueFreeSpins2 = this.add.image(660, 270, "videoslot_popup_texture0_level0", "IB.png");
		valueFreeSpins2.setInteractive(this.input.makePixelPerfect());

		// txtFreeSpins
		const txtFreeSpins = this.add.text(700, 270, "", {});
		txtFreeSpins.scaleX = 0.4;
		txtFreeSpins.scaleY = 0.5;
		txtFreeSpins.setOrigin(0, 0.5);
		txtFreeSpins.text = "IDS_AP_ONFREESPINS";
		txtFreeSpins.setStyle({ "align": "center", "fontFamily": "ROBOTO_CONDENSED_BOLD", "fontSize": "30px" });

		// valueJackpotWon1
		const valueJackpotWon1 = this.add.image(480, 309, "videoslot_popup_texture0_level0", "GB.png");
		valueJackpotWon1.setInteractive(this.input.makePixelPerfect());

		// valueJackpotWon2
		const valueJackpotWon2 = this.add.image(470, 309, "videoslot_popup_texture0_level0", "IB.png");
		valueJackpotWon2.setInteractive(this.input.makePixelPerfect());

		// txtJackpotWon
		const txtJackpotWon = this.add.text(505, 310, "", {});
		txtJackpotWon.scaleX = 0.4;
		txtJackpotWon.scaleY = 0.5;
		txtJackpotWon.setOrigin(0, 0.5);
		txtJackpotWon.text = "IDS_AP_ONJACKPOT";
		txtJackpotWon.setStyle({ "align": "center", "fontFamily": "ROBOTO_CONDENSED_BOLD", "fontSize": "30px" });

		// qB_png
		const qB_png = this.add.image(775, 340, "videoslot_popup_texture0_level0", "QB.png");
		qB_png.scaleX = 0.8;
		qB_png.scaleY = 0.8;

		// txtIfSingleWin
		const txtIfSingleWin = this.add.text(460, 365, "", {});
		txtIfSingleWin.scaleX = 0.4;
		txtIfSingleWin.scaleY = 0.5;
		txtIfSingleWin.setOrigin(0, 0.5);
		txtIfSingleWin.text = "IDS_AP_WINEXCEEDS";
		txtIfSingleWin.setStyle({ "align": "center", "fontFamily": "ROBOTO_CONDENSED_BOLD", "fontSize": "32px" });

		// txtSlider1
		const txtSlider1 = this.add.text(780, 340, "", {});
		txtSlider1.scaleX = 0.85;
		txtSlider1.setOrigin(0.5, 0.5);
		txtSlider1.text = "0.00";
		txtSlider1.setStyle({ "align": "center", "color": "#EBB122", "fontFamily": "ROBOTO_CONDENSED_REGULAR", "fontSize": "15px" });

		// qB_png_1
		const qB_png_1 = this.add.image(775, 400, "videoslot_popup_texture0_level0", "QB.png");
		qB_png_1.scaleX = 0.8;
		qB_png_1.scaleY = 0.8;

		// txtBalanceInc
		const txtBalanceInc = this.add.text(460, 425, "", {});
		txtBalanceInc.scaleX = 0.4;
		txtBalanceInc.scaleY = 0.5;
		txtBalanceInc.setOrigin(0, 0.5);
		txtBalanceInc.text = "IDS_AP_BALANCEINC";
		txtBalanceInc.setStyle({ "align": "center", "fontFamily": "ROBOTO_CONDENSED_BOLD", "fontSize": "32px" });

		// txtSlider2
		const txtSlider2 = this.add.text(780, 400, "", {});
		txtSlider2.scaleX = 0.85;
		txtSlider2.setOrigin(0.5, 0.5);
		txtSlider2.text = "0.00";
		txtSlider2.setStyle({ "align": "center", "color": "#EBB122", "fontFamily": "ROBOTO_CONDENSED_REGULAR", "fontSize": "15px" });

		// qB_png_2
		const qB_png_2 = this.add.image(775, 460, "videoslot_popup_texture0_level0", "QB.png");
		qB_png_2.scaleX = 0.8;
		qB_png_2.scaleY = 0.8;

		// txtBalanceDec
		const txtBalanceDec = this.add.text(460, 485, "", {});
		txtBalanceDec.scaleX = 0.4;
		txtBalanceDec.scaleY = 0.5;
		txtBalanceDec.setOrigin(0, 0.5);
		txtBalanceDec.text = "IDS_AP_BALANCEDEC";
		txtBalanceDec.setStyle({ "align": "center", "fontFamily": "ROBOTO_CONDENSED_BOLD", "fontSize": "32px" });

		// txtSlider3
		const txtSlider3 = this.add.text(780, 460, "", {});
		txtSlider3.scaleX = 0.85;
		txtSlider3.setOrigin(0.5, 0.5);
		txtSlider3.text = "0.00";
		txtSlider3.setStyle({ "align": "center", "color": "#EBB122", "fontFamily": "ROBOTO_CONDENSED_REGULAR", "fontSize": "15px" });

		// btnOk
		const btnOk = this.add.sprite(726, 543, "videoslot_popup_texture0_level0", "MB.png");
		btnOk.setInteractive(this.input.makePixelPerfect());
		btnOk.scaleX = 0.8;
		btnOk.scaleY = 0.8;

		// btnCancel
		const btnCancel = this.add.sprite(540, 543, "videoslot_popup_texture0_level0", "OB.png");
		btnCancel.setInteractive(this.input.makePixelPerfect());
		btnCancel.scaleX = 0.8;
		btnCancel.scaleY = 0.8;

		// txtOk
		const txtOk = this.add.text(725, 543, "", {});
		txtOk.scaleX = 0.85;
		txtOk.setOrigin(0.5, 0.5);
		txtOk.text = "IDS_BTN_OK";
		txtOk.setStyle({ "align": "center", "fontFamily": "ROBOTO_CONDENSED_REGULAR", "fontSize": "15px" });

		// txtCancel
		const txtCancel = this.add.text(540, 543, "", {});
		txtCancel.scaleX = 0.85;
		txtCancel.setOrigin(0.5, 0.5);
		txtCancel.text = "IDS_BTN_CANCEL";
		txtCancel.setStyle({ "align": "center", "fontFamily": "ROBOTO_CONDENSED_REGULAR", "fontSize": "15px" });

		this.txtTitle = txtTitle;
		this.txtStopAutoplay = txtStopAutoplay;
		this.valueAnyWin1 = valueAnyWin1;
		this.valueAnyWin2 = valueAnyWin2;
		this.txtAnyWin = txtAnyWin;
		this.valueFreeSpins1 = valueFreeSpins1;
		this.valueFreeSpins2 = valueFreeSpins2;
		this.txtFreeSpins = txtFreeSpins;
		this.valueJackpotWon1 = valueJackpotWon1;
		this.valueJackpotWon2 = valueJackpotWon2;
		this.txtJackpotWon = txtJackpotWon;
		this.txtIfSingleWin = txtIfSingleWin;
		this.txtSlider1 = txtSlider1;
		this.txtBalanceInc = txtBalanceInc;
		this.txtSlider2 = txtSlider2;
		this.txtBalanceDec = txtBalanceDec;
		this.txtSlider3 = txtSlider3;
		this.btnOk = btnOk;
		this.btnCancel = btnCancel;
		this.txtOk = txtOk;
		this.txtCancel = txtCancel;

		this.events.emit("scene-awake");
	}

	private txtTitle!: Phaser.GameObjects.Text;
	private txtStopAutoplay!: Phaser.GameObjects.Text;
	private valueAnyWin1!: Phaser.GameObjects.Image;
	private valueAnyWin2!: Phaser.GameObjects.Image;
	private txtAnyWin!: Phaser.GameObjects.Text;
	private valueFreeSpins1!: Phaser.GameObjects.Image;
	private valueFreeSpins2!: Phaser.GameObjects.Image;
	private txtFreeSpins!: Phaser.GameObjects.Text;
	private valueJackpotWon1!: Phaser.GameObjects.Image;
	private valueJackpotWon2!: Phaser.GameObjects.Image;
	private txtJackpotWon!: Phaser.GameObjects.Text;
	private txtIfSingleWin!: Phaser.GameObjects.Text;
	private txtSlider1!: Phaser.GameObjects.Text;
	private txtBalanceInc!: Phaser.GameObjects.Text;
	private txtSlider2!: Phaser.GameObjects.Text;
	private txtBalanceDec!: Phaser.GameObjects.Text;
	private txtSlider3!: Phaser.GameObjects.Text;
	public btnOk!: Phaser.GameObjects.Sprite;
	public btnCancel!: Phaser.GameObjects.Sprite;
	private txtOk!: Phaser.GameObjects.Text;
	private txtCancel!: Phaser.GameObjects.Text;

	/* START-USER-CODE */

	// Write your code here
    autoSpins: number[] = [];
	activeAutoplay: number = 0;
	private gameState!: VideoSlotGameState;
	private gameConfig!: IGameConfig;

	create() {
		
		this.scene.bringToTop()
		this.gameState = container.get<VideoSlotGameState>('VideoSlotGameState');

		this.editorCreate();
		this.txtTitle.setText(this.cache.json.get('language').texts['IDS_AP_CAPTION']);
		this.txtStopAutoplay.setText(this.cache.json.get('language').texts['IDS_AP_STOPAUTOPLAY']);
		this.txtAnyWin.setText(this.cache.json.get('language').texts['IDS_AP_ONANYWIN']);
		this.txtFreeSpins.setText(this.cache.json.get('language').texts['IDS_AP_ONFREESPINS']);
		this.txtJackpotWon.setText(this.cache.json.get('language').texts['IDS_AP_ONJACKPOT']);
		this.txtIfSingleWin.setText(this.cache.json.get('language').texts['IDS_AP_WINEXCEEDS']);
		this.txtBalanceInc.setText(this.cache.json.get('language').texts['IDS_AP_BALANCEINC']);
		this.txtBalanceDec.setText(this.cache.json.get('language').texts['IDS_AP_BALANCEDEC']);
		this.txtOk.setText(this.cache.json.get('language').texts['IDS_BTN_OK']);
		this.txtCancel.setText(this.cache.json.get('language').texts['IDS_BTN_CANCEL']);

		this.setAutoplayBtn();
		this.setStopAutoplay();

		// OnAnyWin
		if (this.gameState.isAutoplayAnyWin.get()) {
			this.valueAnyWin1.setFrame('HB.png');
			this.valueAnyWin2.setFrame('JB.png');
		} else {
			this.valueAnyWin1.setFrame('GB.png');
			this.valueAnyWin2.setFrame('IB.png');
		}
		this.tweens.add({
			targets: this.valueAnyWin2,
			x: this.gameState.isAutoplayAnyWin.get() ? 490 : 470,
			duration: 100,
			ease: 'Power2',
		});

		// OnFreeSpins
		if (this.gameState.isAutoplayFreeSpin.get()) {
			this.valueFreeSpins1.setFrame('HB.png');
			this.valueFreeSpins2.setFrame('JB.png');
		} else {
			this.valueFreeSpins1.setFrame('GB.png');
			this.valueFreeSpins2.setFrame('IB.png');
		}
		this.tweens.add({
			targets: this.valueFreeSpins2,
			x: this.gameState.isAutoplayFreeSpin.get() ? 680 : 660,
			duration: 100,
			ease: 'Power2',
		});

		// OnJackpot
		if (this.gameState.isAutoplayJackpot.get()) {
			this.valueJackpotWon1.setFrame('HB.png');
			this.valueJackpotWon2.setFrame('JB.png');
		} else {
			this.valueJackpotWon1.setFrame('GB.png');
			this.valueJackpotWon2.setFrame('IB.png');
		}
		this.tweens.add({
			targets: this.valueJackpotWon2,
			x: this.gameState.isAutoplayJackpot.get() ? 490 : 470,
			duration: 100,
			ease: 'Power2',
		});

		
	}

	setAutoplayBtn(){
		this.gameConfig = container.get<NetworkManager>('NetworkManager').getGameConfig() as IGameConfig;
		let autoSpins: string[] = []
		if(this.gameConfig){
			autoSpins = this.gameConfig.autoSpins?.split(",") as string[]
		} else{

			autoSpins = "10,20,50,75,100".split(",")
		}
        for(let i = 0; i < autoSpins?.length; i++){
            this.autoSpins.push(parseInt(autoSpins[i]));
        }

		const autoplayOptions = [
            { value: this.autoSpins[0], offset: 500 },
            { value: this.autoSpins[1], offset: 570 },
            { value: this.autoSpins[2], offset: 640 },
            { value: this.autoSpins[3], offset: 710 },
            { value: this.autoSpins[4], offset: 780 }
        ];

		const selectAutoplay: Phaser.GameObjects.Sprite[] = []
		autoplayOptions.forEach((opt, index) => {
            // Create button sprite
            const btn = this.add.sprite(
                opt.offset,
                195,
                'videoslot_popup_texture0_level0',
                'VB.png'
            ).setDepth(2).setScale(.8); // ensure it can be clicked
			btn.setInteractive();

            // Create text label
            const txt = this.add.text(
                opt.offset,
                195,
                `${opt.value}`,
                {
                color: '#000000',
                fontFamily: 'ROBOTO-CONDENSED-REGULAR',
                align: 'center',
                font: '18px ROBOTO-CONDENSED-REGULAR'
                }
            ).setOrigin(0.5).setDepth(2);

            // Add click event
            btn.on('pointerdown', () => {
                selectAutoplay.forEach(item => {
                // Reset all buttons to "inactive" style
                item.setFrame('VB.png'); 
                });

                // Set the clicked button as active
                btn.setFrame('UB.png'); // assume you have a "selected" frame

                // Save the active autoplay value
                this.activeAutoplay = opt.value;
            });

            selectAutoplay.push(btn);
			let defaultAutoSpins;
			if(this.gameConfig){
				defaultAutoSpins = parseInt(this.gameConfig.defaultAutoSpins as string);
			} else{
				defaultAutoSpins = 50;
			}
            if (opt.value === defaultAutoSpins) {
                btn.setFrame('UB.png'); // visually highlight
                this.activeAutoplay = opt.value; // set default selected value
            }
        });
	}

	setStopAutoplay(){
		const toggleAnyWin = () => {
			let isAutoplayAnyWin = this.gameState.isAutoplayAnyWin.get();
			this.gameState.isAutoplayAnyWin.set(!isAutoplayAnyWin); // Toggle boolean

			// Update button visuals
			this.gameState.isAutoplayAnyWin.subscribe((val) => {
				if (val) {
					this.valueAnyWin1.setFrame('HB.png');
					this.valueAnyWin2.setFrame('JB.png');
				} else {
					this.valueAnyWin1.setFrame('GB.png');
					this.valueAnyWin2.setFrame('IB.png');
				}
				this.tweens.add({
					targets: this.valueAnyWin2,
					x: this.gameState.isAutoplayAnyWin.get() ? 490 : 470,
					duration: 100,
					ease: 'Power2',
				});
			});
			
        };
        this.valueAnyWin1.on('pointerdown', toggleAnyWin);
        this.valueAnyWin2.on('pointerdown', toggleAnyWin);

		const toggleFreeSpinsWon = () => {
			let isAutoplayFreeSpin = this.gameState.isAutoplayFreeSpin.get();
			this.gameState.isAutoplayFreeSpin.set(!isAutoplayFreeSpin); // Toggle boolean
			// Update button visuals
			this.gameState.isAutoplayFreeSpin.subscribe((val) => {
				if (val) {
					this.valueFreeSpins1.setFrame('HB.png');
					this.valueFreeSpins2.setFrame('JB.png');
				} else {
					this.valueFreeSpins1.setFrame('GB.png');
					this.valueFreeSpins2.setFrame('IB.png');
				}
				this.tweens.add({
					targets: this.valueFreeSpins2,
					x: this.gameState.isAutoplayFreeSpin.get() ? 680 : 660,
					duration: 100,
					ease: 'Power2',
				});
			});
		};
        this.valueFreeSpins1.on('pointerdown', toggleFreeSpinsWon);
        this.valueFreeSpins2.on('pointerdown', toggleFreeSpinsWon);

		const toggleJackpotWon = () => {
			let isAutoplayJackpot = this.gameState.isAutoplayJackpot.get();
			this.gameState.isAutoplayJackpot.set(!isAutoplayJackpot); // Toggle boolean
			// Update button visuals
			this.gameState.isAutoplayJackpot.subscribe((val) => {
				if (val) {
					this.valueJackpotWon1.setFrame('HB.png');
					this.valueJackpotWon2.setFrame('JB.png');
				} else {
					this.valueJackpotWon1.setFrame('GB.png');
					this.valueJackpotWon2.setFrame('IB.png');
				}
				this.tweens.add({
					targets: this.valueJackpotWon2,
					x: this.gameState.isAutoplayJackpot.get() ? 490 : 470,
					duration: 100,
					ease: 'Power2',
				});
			});
		};
        this.valueJackpotWon1.on('pointerdown', toggleJackpotWon);
        this.valueJackpotWon2.on('pointerdown', toggleJackpotWon);

        const MAX_VALUE = (this.gameState.coinValue.get()) * 10000;
        const STEP = (this.gameState.coinValue.get()) * 100;
		const slider1 = new Slider(this, {
            x: 590,
            y: 340,
            width: 270,
            height: 5,
            orientation: 'x', // 'x' = horizontal, 'y' = vertical
            reverseAxis: false,
            track: this.add.rectangle(0, 0, 0, 5, 0x464646),
            indicator: this.add.rectangle(0, 0, 0, 5, 0xffc517),
            thumb: this.add.circle(0, 0, 10, 0xffc517),
            thumbOffsetX: 0,
            thumbOffsetY: 0,
            input: 'drag',
            easeValue: { duration: 250 },
            enable: true,
            value: 0, // initial value (0~1)
            valuechangeCallback: (newValue: number) => {
                let mapped = Math.round(newValue * (MAX_VALUE / STEP)) * STEP;
                this.gameState.ifAutoplaySingleWin.set(mapped * 100)
                this.txtSlider1.setText(`${mapped.toFixed(2)}`);
            }
        }).layout();

		const slider2 = new Slider(this, {
            x: 590,
            y: 400,
            width: 270,
            height: 5,
            orientation: 'x', // 'x' = horizontal, 'y' = vertical
            reverseAxis: false,
            track: this.add.rectangle(0, 0, 0, 5, 0x464646),
            indicator: this.add.rectangle(0, 0, 0, 5, 0xffc517),
            thumb: this.add.circle(0, 0, 10, 0xffc517),
            thumbOffsetX: 0,
            thumbOffsetY: 0,
            input: 'drag',
            easeValue: { duration: 250 },
            enable: true,
            value: 0, // initial value (0~1)
            valuechangeCallback: (newValue: number) => {
                let mapped = Math.round(newValue * (MAX_VALUE / STEP)) * STEP * 10;
                this.gameState.ifAutoplayBalanceIncrease.set(mapped * 100)
                this.txtSlider2.setText(mapped.toFixed(2));
            }
        }).layout();

		const slider3 = new Slider(this, {
            x: 590,
            y: 460,
            width: 270,
            height: 5,
            orientation: 'x', // 'x' = horizontal, 'y' = vertical
            reverseAxis: false,
            track: this.add.rectangle(0, 0, 0, 5, 0x464646),
            indicator: this.add.rectangle(0, 0, 0, 5, 0xffc517),
            thumb: this.add.circle(0, 0, 10, 0xffc517),
            thumbOffsetX: 0,
            thumbOffsetY: 0,
            input: 'drag',
            easeValue: { duration: 250 },
            enable: true,
            value: 0, // initial value (0~1)
            valuechangeCallback: (newValue: number) => {
                let mapped = Math.round(newValue * (MAX_VALUE / STEP)) * STEP * 10;
                this.gameState.ifAutoplayBalanceDecrease.set(-mapped * 100)
                this.txtSlider3.setText(mapped.toFixed(2));
            }
        }).layout();

		this.btnCancel.on('pointerdown', () => {
			this.gameState.isShowingAutoplay.set(false);
		})

		this.btnOk.on('pointerdown', () => {
			this.gameState.isShowingAutoplay.set(false);
			this.gameState.isAutoPlayRunning.set(true);
			this.gameState.activeAutoplay.set(this.activeAutoplay);
			Dispatcher.emit(ACTION_EVENTS.AUTO_PLAY_START, this.activeAutoplay);
		})
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
