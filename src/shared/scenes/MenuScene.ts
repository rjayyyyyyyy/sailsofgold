
// You can write more code here

import { VideoSlotGameState } from "@games/videoslot/VideoSlotGameState";
import { container } from "@gl/di/container";

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class MenuScene extends Phaser.Scene {

	constructor() {
		super("MenuScene");

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

		// fB_png
		const fB_png = this.add.image(640, 360, "videoslot_popup_texture0_level0", "FB.png");
		fB_png.scaleX = 0.8;
		fB_png.scaleY = 0.8;

		// txtTitle
		const txtTitle = this.add.text(640, 218, "", {});
		txtTitle.scaleX = 0.5;
		txtTitle.scaleY = 0.5;
		txtTitle.setOrigin(0.5, 0.5);
		txtTitle.text = "IDS_M_SETTINGS_TITLE";
		txtTitle.setStyle({ "color": "#EBB122", "fontFamily": "ROBOTO-CONDENSED-BOLD", "fontSize": "40px", "fontStyle": "bold" });

		// bgDenomination
		const bgDenomination = this.add.image(539, 295, "videoslot_popup_texture0_level0", "KB.png");
		bgDenomination.scaleX = 0.8;
		bgDenomination.scaleY = 0.8;

		// plusDenomination
		const plusDenomination = this.add.image(540, 255, "videoslot_popup_texture0_level0", "ZB.png");
		plusDenomination.setInteractive(new Phaser.Geom.Rectangle(0, 0, 38, 31), Phaser.Geom.Rectangle.Contains);
		plusDenomination.scaleX = 0.8;
		plusDenomination.scaleY = 0.8;

		// minusDenomination
		const minusDenomination = this.add.image(540, 335, "videoslot_popup_texture0_level0", "YB.png");
		minusDenomination.setInteractive(new Phaser.Geom.Rectangle(0, 0, 38, 31), Phaser.Geom.Rectangle.Contains);
		minusDenomination.scaleX = 0.8;
		minusDenomination.scaleY = 0.8;

		// txtDenominationTitle
		const txtDenominationTitle = this.add.text(540, 280, "", {});
		txtDenominationTitle.scaleX = 0.5;
		txtDenominationTitle.scaleY = 0.6;
		txtDenominationTitle.setOrigin(0.5, 0.5);
		txtDenominationTitle.text = "IDS_COINVALUE";
		txtDenominationTitle.setStyle({ "fontFamily": "OSWALD-REGULAR", "fontSize": "22px" });

		// txtDenominationValue
		const txtDenominationValue = this.add.text(540, 305, "", {});
		txtDenominationValue.scaleX = 0.5;
		txtDenominationValue.scaleY = 0.6;
		txtDenominationValue.setOrigin(0.5, 0.5);
		txtDenominationValue.text = "CNY 0.10";
		txtDenominationValue.setStyle({ "color": "#e6ae22", "fontFamily": "OSWALD-REGULAR", "fontSize": "35px" });

		// bgCoins
		const bgCoins = this.add.image(640, 295, "videoslot_popup_texture0_level0", "KB.png");
		bgCoins.scaleX = 0.8;
		bgCoins.scaleY = 0.8;

		// plusCoins
		const plusCoins = this.add.image(640, 255, "videoslot_popup_texture0_level0", "ZB.png");
		plusCoins.setInteractive(new Phaser.Geom.Rectangle(0, 0, 38, 31), Phaser.Geom.Rectangle.Contains);
		plusCoins.scaleX = 0.8;
		plusCoins.scaleY = 0.8;

		// minusCoins
		const minusCoins = this.add.image(640, 335, "videoslot_popup_texture0_level0", "YB.png");
		minusCoins.setInteractive(new Phaser.Geom.Rectangle(0, 0, 38, 31), Phaser.Geom.Rectangle.Contains);
		minusCoins.scaleX = 0.8;
		minusCoins.scaleY = 0.8;

		// txtCoinsTitle
		const txtCoinsTitle = this.add.text(640, 280, "", {});
		txtCoinsTitle.scaleX = 0.5;
		txtCoinsTitle.scaleY = 0.6;
		txtCoinsTitle.setOrigin(0.5, 0.5);
		txtCoinsTitle.text = "IDS_SLOT_COINS";
		txtCoinsTitle.setStyle({ "fontFamily": "OSWALD-REGULAR", "fontSize": "22px" });

		// txtCoinsValue
		const txtCoinsValue = this.add.text(640, 305, "", {});
		txtCoinsValue.scaleX = 0.5;
		txtCoinsValue.scaleY = 0.6;
		txtCoinsValue.setOrigin(0.5, 0.5);
		txtCoinsValue.text = "5";
		txtCoinsValue.setStyle({ "color": "#e6ae22", "fontFamily": "OSWALD-REGULAR", "fontSize": "35px" });

		// bgLines
		const bgLines = this.add.image(740, 295, "videoslot_popup_texture0_level0", "KB.png");
		bgLines.scaleX = 0.8;
		bgLines.scaleY = 0.8;

		// plusLines
		const plusLines = this.add.image(740, 255, "videoslot_popup_texture0_level0", "ZB.png");
		plusLines.setInteractive(new Phaser.Geom.Rectangle(0, 0, 38, 31), Phaser.Geom.Rectangle.Contains);
		plusLines.scaleX = 0.8;
		plusLines.scaleY = 0.8;

		// minusLines
		const minusLines = this.add.image(740, 335, "videoslot_popup_texture0_level0", "YB.png");
		minusLines.setInteractive(new Phaser.Geom.Rectangle(0, 0, 38, 31), Phaser.Geom.Rectangle.Contains);
		minusLines.scaleX = 0.8;
		minusLines.scaleY = 0.8;

		// txtLinesTitle
		const txtLinesTitle = this.add.text(740, 280, "", {});
		txtLinesTitle.scaleX = 0.5;
		txtLinesTitle.scaleY = 0.6;
		txtLinesTitle.setOrigin(0.5, 0.5);
		txtLinesTitle.text = "IDS_SLOT_LINES";
		txtLinesTitle.setStyle({ "fontFamily": "OSWALD-REGULAR", "fontSize": "22px" });

		// txtLinesValue
		const txtLinesValue = this.add.text(740, 305, "", {});
		txtLinesValue.scaleX = 0.5;
		txtLinesValue.scaleY = 0.6;
		txtLinesValue.setOrigin(0.5, 0.5);
		txtLinesValue.text = "10";
		txtLinesValue.setStyle({ "color": "#e6ae22", "fontFamily": "OSWALD-REGULAR", "fontSize": "35px" });

		// valueSound1
		const valueSound1 = this.add.image(500, 380, "videoslot_popup_texture0_level0", "GB.png");
		valueSound1.setInteractive(new Phaser.Geom.Rectangle(0, 0, 36, 18), Phaser.Geom.Rectangle.Contains);
		valueSound1.scaleX = 0.8;
		valueSound1.scaleY = 0.8;

		// valueSound2
		const valueSound2 = this.add.image(490, 380, "videoslot_popup_texture0_level0", "IB.png");
		valueSound2.setInteractive(new Phaser.Geom.Rectangle(0, 0, 36, 35), Phaser.Geom.Rectangle.Contains);
		valueSound2.scaleX = 0.8;
		valueSound2.scaleY = 0.8;

		// txtSound
		const txtSound = this.add.text(520, 380, "", {});
		txtSound.scaleX = 0.5;
		txtSound.scaleY = 0.5;
		txtSound.setOrigin(0, 0.5);
		txtSound.text = "IDS_M_SETTINGS_L1";
		txtSound.setStyle({ "fontFamily": "OSWALD-REGULAR", "fontSize": "36px" });

		// valueFastPlay1
		const valueFastPlay1 = this.add.image(500, 425, "videoslot_popup_texture0_level0", "GB.png");
		valueFastPlay1.setInteractive(new Phaser.Geom.Rectangle(0, 0, 36, 18), Phaser.Geom.Rectangle.Contains);
		valueFastPlay1.scaleX = 0.8;
		valueFastPlay1.scaleY = 0.8;

		// valueFastPlay2
		const valueFastPlay2 = this.add.image(490, 425, "videoslot_popup_texture0_level0", "IB.png");
		valueFastPlay2.setInteractive(new Phaser.Geom.Rectangle(0, 0, 36, 35), Phaser.Geom.Rectangle.Contains);
		valueFastPlay2.scaleX = 0.8;
		valueFastPlay2.scaleY = 0.8;

		// txtFastPlay
		const txtFastPlay = this.add.text(520, 426, "", {});
		txtFastPlay.scaleX = 0.5;
		txtFastPlay.scaleY = 0.5;
		txtFastPlay.setOrigin(0, 0.5);
		txtFastPlay.text = "IDS_M_SETTINGS_L12";
		txtFastPlay.setStyle({ "fontFamily": "OSWALD-REGULAR", "fontSize": "36px" });

		// valueAutoAdjust1
		const valueAutoAdjust1 = this.add.image(690, 380, "videoslot_popup_texture0_level0", "GB.png");
		valueAutoAdjust1.setInteractive(new Phaser.Geom.Rectangle(0, 0, 36, 18), Phaser.Geom.Rectangle.Contains);
		valueAutoAdjust1.scaleX = 0.8;
		valueAutoAdjust1.scaleY = 0.8;

		// valueAutoAdjust2
		const valueAutoAdjust2 = this.add.image(680, 380, "videoslot_popup_texture0_level0", "IB.png");
		valueAutoAdjust2.setInteractive(new Phaser.Geom.Rectangle(0, 0, 36, 35), Phaser.Geom.Rectangle.Contains);
		valueAutoAdjust2.scaleX = 0.8;
		valueAutoAdjust2.scaleY = 0.8;

		// txtAutoAdjust
		const txtAutoAdjust = this.add.text(710, 380, "", {});
		txtAutoAdjust.scaleX = 0.5;
		txtAutoAdjust.scaleY = 0.5;
		txtAutoAdjust.setOrigin(0, 0.5);
		txtAutoAdjust.text = "IDS_M_SETTINGS_L9";
		txtAutoAdjust.setStyle({ "fontFamily": "OSWALD-REGULAR", "fontSize": "36px" });

		// valueSpacebar1
		const valueSpacebar1 = this.add.image(690, 425, "videoslot_popup_texture0_level0", "GB.png");
		valueSpacebar1.setInteractive(new Phaser.Geom.Rectangle(0, 0, 36, 18), Phaser.Geom.Rectangle.Contains);
		valueSpacebar1.scaleX = 0.8;
		valueSpacebar1.scaleY = 0.8;

		// valueSpacebar2
		const valueSpacebar2 = this.add.image(680, 425, "videoslot_popup_texture0_level0", "IB.png");
		valueSpacebar2.setInteractive(new Phaser.Geom.Rectangle(0, 0, 36, 35), Phaser.Geom.Rectangle.Contains);
		valueSpacebar2.scaleX = 0.8;
		valueSpacebar2.scaleY = 0.8;

		// txtSpacebar
		const txtSpacebar = this.add.text(710, 425, "", {});
		txtSpacebar.scaleX = 0.5;
		txtSpacebar.scaleY = 0.5;
		txtSpacebar.setOrigin(0, 0.5);
		txtSpacebar.text = "IDS_M_SETTINGS_L13";
		txtSpacebar.setStyle({ "fontFamily": "OSWALD-REGULAR", "fontSize": "36px" });

		// btnOk
		const btnOk = this.add.image(640, 480, "videoslot_popup_texture0_level0", "MB.png");
		btnOk.setInteractive(new Phaser.Geom.Rectangle(0, 0, 128, 51), Phaser.Geom.Rectangle.Contains);
		btnOk.scaleX = 0.8;
		btnOk.scaleY = 0.8;

		// txtOk
		const txtOk = this.add.text(640, 480, "", {});
		txtOk.scaleX = 0.5;
		txtOk.scaleY = 0.5;
		txtOk.setOrigin(0.5, 0.5);
		txtOk.text = "IDS_BTN_OK";
		txtOk.setStyle({ "align": "center", "fontFamily": "ROBOTO-CONDENSED-BOLD", "fontSize": "40px" });

		this.txtTitle = txtTitle;
		this.plusDenomination = plusDenomination;
		this.minusDenomination = minusDenomination;
		this.txtDenominationTitle = txtDenominationTitle;
		this.txtDenominationValue = txtDenominationValue;
		this.plusCoins = plusCoins;
		this.minusCoins = minusCoins;
		this.txtCoinsTitle = txtCoinsTitle;
		this.txtCoinsValue = txtCoinsValue;
		this.plusLines = plusLines;
		this.minusLines = minusLines;
		this.txtLinesTitle = txtLinesTitle;
		this.txtLinesValue = txtLinesValue;
		this.valueSound1 = valueSound1;
		this.valueSound2 = valueSound2;
		this.txtSound = txtSound;
		this.valueFastPlay1 = valueFastPlay1;
		this.valueFastPlay2 = valueFastPlay2;
		this.txtFastPlay = txtFastPlay;
		this.valueAutoAdjust1 = valueAutoAdjust1;
		this.valueAutoAdjust2 = valueAutoAdjust2;
		this.txtAutoAdjust = txtAutoAdjust;
		this.valueSpacebar1 = valueSpacebar1;
		this.valueSpacebar2 = valueSpacebar2;
		this.txtSpacebar = txtSpacebar;
		this.btnOk = btnOk;
		this.txtOk = txtOk;

		this.events.emit("scene-awake");
	}

	private txtTitle!: Phaser.GameObjects.Text;
	private plusDenomination!: Phaser.GameObjects.Image;
	private minusDenomination!: Phaser.GameObjects.Image;
	private txtDenominationTitle!: Phaser.GameObjects.Text;
	private txtDenominationValue!: Phaser.GameObjects.Text;
	private plusCoins!: Phaser.GameObjects.Image;
	private minusCoins!: Phaser.GameObjects.Image;
	private txtCoinsTitle!: Phaser.GameObjects.Text;
	private txtCoinsValue!: Phaser.GameObjects.Text;
	private plusLines!: Phaser.GameObjects.Image;
	private minusLines!: Phaser.GameObjects.Image;
	private txtLinesTitle!: Phaser.GameObjects.Text;
	private txtLinesValue!: Phaser.GameObjects.Text;
	private valueSound1!: Phaser.GameObjects.Image;
	private valueSound2!: Phaser.GameObjects.Image;
	private txtSound!: Phaser.GameObjects.Text;
	private valueFastPlay1!: Phaser.GameObjects.Image;
	private valueFastPlay2!: Phaser.GameObjects.Image;
	private txtFastPlay!: Phaser.GameObjects.Text;
	private valueAutoAdjust1!: Phaser.GameObjects.Image;
	private valueAutoAdjust2!: Phaser.GameObjects.Image;
	private txtAutoAdjust!: Phaser.GameObjects.Text;
	private valueSpacebar1!: Phaser.GameObjects.Image;
	private valueSpacebar2!: Phaser.GameObjects.Image;
	private txtSpacebar!: Phaser.GameObjects.Text;
	private btnOk!: Phaser.GameObjects.Image;
	private txtOk!: Phaser.GameObjects.Text;

	/* START-USER-CODE */

	// Write your code here
	private gameState!: VideoSlotGameState;

	create() {
		this.gameState = container.get<VideoSlotGameState>('VideoSlotGameState');

		// this.scene.sleep();
		this.scene.bringToTop();
		this.editorCreate();

		this.txtTitle.setText(this.cache.json.get('language').texts['IDS_M_SETTINGS_TITLE'] || 'IDS_M_SETTINGS_TITLE');
		this.txtDenominationTitle.setText(this.cache.json.get('language').texts['IDS_COINVALUE'] || 'IDS_COINVALUE');
		this.txtCoinsTitle.setText(this.cache.json.get('language').texts['IDS_SLOT_COINS'] || 'IDS_SLOT_COINS');
		this.txtLinesTitle.setText(this.cache.json.get('language').texts['IDS_SLOT_LINES'] || 'IDS_SLOT_LINES');
		this.txtSound.setText(this.cache.json.get('language').texts['IDS_M_SETTINGS_L1'] || 'IDS_M_SETTINGS_L1');
		this.txtFastPlay.setText(this.cache.json.get('language').texts['IDS_M_SETTINGS_L12'] || 'IDS_M_SETTINGS_L12');
		this.txtAutoAdjust.setText(this.cache.json.get('language').texts['IDS_M_SETTINGS_L9'] || 'IDS_M_SETTINGS_L9');
		this.txtSpacebar.setText(this.cache.json.get('language').texts['IDS_M_SETTINGS_L13'] || 'IDS_M_SETTINGS_L13');
		this.txtOk.setText(this.cache.json.get('language').texts['IDS_BTN_OK'] || 'IDS_BTN_OK');

		this.txtDenominationValue.setText(`${this.gameState.coinValueCurrency.get()} ${(this.gameState.coinValue.get() / 100).toFixed(2)}`);
		const denominationValue = this.gameState.coinValueList.indexOf(this.gameState.coinValue.get());
		if (denominationValue <= 0) {
			this.minusDenomination.disableInteractive();
			this.minusDenomination.setTint(0x666666);
		} else {
			this.minusDenomination.setInteractive();
			this.minusDenomination.clearTint();
		}

		// Increase button
		if (denominationValue >= this.gameState.coinValueList.length - 1) {
			this.plusDenomination.disableInteractive();
			this.plusDenomination.setTint(0x666666);
		} else {
			this.plusDenomination.setInteractive();
			this.plusDenomination.clearTint();
		}

		if (this.gameState.linesBet.get() <= 1) {
			this.minusLines.disableInteractive();
			this.minusLines.setTint(0x666666);
		} else {
			this.minusLines.setInteractive();
			this.minusLines.clearTint();
		}

		// Increase button
		if (this.gameState.linesBet.get() >= 10) {
			this.plusLines.disableInteractive();
			this.plusLines.setTint(0x666666);
		} else {
			this.plusLines.setInteractive();
			this.plusLines.clearTint();
		}

		if (this.gameState.coinBet.get() <= 1) {
			this.minusCoins.disableInteractive();
			this.minusCoins.setTint(0x666666);
		} else {
			this.minusCoins.setInteractive();
			this.minusCoins.clearTint();
		}

		// Increase button
		if (this.gameState.coinBet.get() >= 5) {
			this.plusCoins.disableInteractive();
			this.plusCoins.setTint(0x666666);
		} else {
			this.plusCoins.setInteractive();
			this.plusCoins.clearTint();
		}

		this.minusDenomination.on('pointerdown', () => {
			this.gameState.coinValue.set(this.gameState.coinValueList[Math.max(0, this.gameState.coinValueList.indexOf(this.gameState.coinValue.get()) - 1)]);
		});
		this.plusDenomination.on('pointerdown', () => {
			this.gameState.coinValue.set(this.gameState.coinValueList[Math.min(this.gameState.coinValueList.length - 1, this.gameState.coinValueList.indexOf(this.gameState.coinValue.get()) + 1)]);
		});

		this.minusCoins.on('pointerdown', () => {
			this.gameState.coinBet.set(Math.max(0, this.gameState.coinBet.get() - 1));
		});
		this.plusCoins.on('pointerdown', () => {
			this.gameState.coinBet.set(Math.min(5, this.gameState.coinBet.get() + 1));
		});

		this.minusLines.on('pointerdown', () => {
			this.gameState.linesBet.set(Math.max(1, this.gameState.linesBet.get() - 1));
		});
		this.plusLines.on('pointerdown', () => {
			this.gameState.linesBet.set(Math.min(10, this.gameState.linesBet.get() + 1));
		});

		const toggleSound = () => {
			let isSound = this.gameState.isSoundingOn.get();
			this.gameState.isSoundingOn.set(!isSound);
			this.sound.mute = !isSound;
        };
        this.valueSound1.on('pointerdown', toggleSound);
        this.valueSound2.on('pointerdown', toggleSound);

		const toggleFastPlay = () => {
			let isFastPlay = this.gameState.isFastplayOn.get();
			this.gameState.isFastplayOn.set(!isFastPlay);
		};
		this.valueFastPlay1.on('pointerdown', toggleFastPlay);
		this.valueFastPlay2.on('pointerdown', toggleFastPlay);

		const toggleAutoAdjust = () => {
			let isAutoAdjust = this.gameState.isAutoAdjustOn.get();
			this.gameState.isAutoAdjustOn.set(!isAutoAdjust);
		};
		this.valueAutoAdjust1.on('pointerdown', toggleAutoAdjust);
		this.valueAutoAdjust2.on('pointerdown', toggleAutoAdjust);

		const toggleSpacebar = () => {
			let isSpacebar = this.gameState.isSpacebarSpinOn.get();
			this.gameState.isSpacebarSpinOn.set(!isSpacebar);
		};
		this.valueSpacebar1.on('pointerdown', toggleSpacebar);
		this.valueSpacebar2.on('pointerdown', toggleSpacebar);

		this.btnOk.on('pointerdown', () => {
			this.scene.stop();
		});

		 // Subscribe to game state changes
		 // Update denomination value text
		 // and disable/enable buttons
		this.gameState.coinValue.subscribe((val) => {
			if(!this.scene.isActive('MenuScene')) return;
			this.txtDenominationValue.setText(`${this.gameState.coinValueCurrency.get()} ${(val / 100).toFixed(2)}`);

			// Disable/enable buttons
			// Decrease button
			const denominationValue = this.gameState.coinValueList.indexOf(this.gameState.coinValue.get());
			if (denominationValue <= 0) {
				this.minusDenomination.disableInteractive();
				this.minusDenomination.setTint(0x666666);
			} else {
				this.minusDenomination.setInteractive();
				this.minusDenomination.clearTint();
			}

			// Increase button
			if (denominationValue >= this.gameState.coinValueList.length - 1) {
				this.plusDenomination.disableInteractive();
				this.plusDenomination.setTint(0x666666);
			} else {
				this.plusDenomination.setInteractive();
				this.plusDenomination.clearTint();
			}
		});

		this.gameState.linesBet.subscribe((val) => {
			if(!this.scene.isActive('MenuScene')) return;
			this.txtLinesValue.setText(val.toString());
			if (val <= 1) {
				this.minusLines.disableInteractive();
				this.minusLines.setTint(0x666666);
			} else {
				this.minusLines.setInteractive();
				this.minusLines.clearTint();
			}

			// Increase button
			if (val >= 10) {
				this.plusLines.disableInteractive();
				this.plusLines.setTint(0x666666);
			} else {
				this.plusLines.setInteractive();
				this.plusLines.clearTint();
			}
		});

		this.gameState.coinBet.subscribe((val) => {
			if(!this.scene.isActive('MenuScene')) return;
			this.txtCoinsValue.setText(val.toString());
			if (val <= 1) {
				this.minusCoins.disableInteractive();
				this.minusCoins.setTint(0x666666);
			} else {
				this.minusCoins.setInteractive();
				this.minusCoins.clearTint();
			}

			// Increase button
			if (val >= 5) {
				this.plusCoins.disableInteractive();
				this.plusCoins.setTint(0x666666);
			} else {
				this.plusCoins.setInteractive();
				this.plusCoins.clearTint();
			}
		});

		this.gameState.isSoundingOn.subscribe((val) => {
			this.tweens.add({
				targets: this.valueSound2,
				x: val ? 510 : 490,
				duration: 100,
				ease: 'Power2',
				onStart: () => {
					if (val) {
						this.valueSound1.setFrame('HB.png');
						this.valueSound2.setFrame('JB.png');
					} else {
						this.valueSound1.setFrame('GB.png');
						this.valueSound2.setFrame('IB.png');
					}
				}
			});
		});

		this.gameState.isFastplayOn.subscribe((val) => {
			this.tweens.add({
				targets: this.valueFastPlay2,
				x: val ? 510 : 490,
				duration: 100,
				ease: 'Power2',
				onStart: () => {
					if (val) {
						this.valueFastPlay1.setFrame('HB.png');
						this.valueFastPlay2.setFrame('JB.png');
					} else {
						this.valueFastPlay1.setFrame('GB.png');
						this.valueFastPlay2.setFrame('IB.png');
					}
				}
			});
		});

		this.gameState.isAutoAdjustOn.subscribe((val) => {
			this.tweens.add({
				targets: this.valueAutoAdjust2,
				x: val ? 700 : 680,
				duration: 100,
				ease: 'Power2',
				onStart: () => {
					if (val) {
						this.valueAutoAdjust1.setFrame('HB.png');
						this.valueAutoAdjust2.setFrame('JB.png');
					} else {
						this.valueAutoAdjust1.setFrame('GB.png');
						this.valueAutoAdjust2.setFrame('IB.png');
					}
				}
			});
		});

		this.gameState.isSpacebarSpinOn.subscribe((val) => {
			this.tweens.add({
				targets: this.valueSpacebar2,
				x: val ? 700 : 680,
				duration: 100,
				ease: 'Power2',
				onStart: () => {
					if (val) {
						this.valueSpacebar1.setFrame('HB.png');
						this.valueSpacebar2.setFrame('JB.png');
					} else {
						this.valueSpacebar1.setFrame('GB.png');
						this.valueSpacebar2.setFrame('IB.png');
					}
				}
			});
		});
	}

	init() {
		// get game state and subscribe to changes
		this.gameState = container.get<VideoSlotGameState>('VideoSlotGameState');
	}



	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
