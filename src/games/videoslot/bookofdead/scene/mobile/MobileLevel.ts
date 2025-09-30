
// You can write more code here

/* START OF COMPILED CODE */

import MobileInfoPrefab from "../../../../../shared/interfaces/components/MobileInfoPrefab";
/* START-USER-IMPORTS */
import { container } from "@gl/di/container";
import { VideoSlotGameState } from "@games/videoslot/VideoSlotGameState";
import MobileMenuScene from "@shared/scenes/Mobile/MobileMenuScene";
import MobileGambleScene from "./MobileGambleScene";
import MobileScatterScene from "./MobileScatterScene";
import MobilePopupScene from "./MobilePopupScene";
import Dispatcher, { ACTION_EVENTS, EVENTS } from "@gl/events/Dispatcher";
import VideoSlotReelsManager from "@games/videoslot/VideoSlotReelsManager";
import MobileFeaturesScene from "./MobileFeaturesScene";

container.bind<MobileMenuScene>("MobileMenuScene").to(MobileMenuScene).inSingletonScope();
container.bind<MobileGambleScene>("MobileGambleScene").to(MobileGambleScene).inSingletonScope();
container.bind<MobileScatterScene>("MobileScatterScene").to(MobileScatterScene).inSingletonScope();
container.bind<MobilePopupScene>("MobilePopupScene").to(MobilePopupScene).inSingletonScope();
container.bind<MobileFeaturesScene>("MobileFeaturesScene").to(MobileFeaturesScene).inSingletonScope();
/* END-USER-IMPORTS */

export default class MobileLevel extends Phaser.Scene {

	constructor() {
		super("MobileLevel");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// aB_png
		this.add.image(360, 591, "background_texture0_level2", "AB.png");

		// logo1
		const logo1 = this.add.image(360, 314, "logo_texture0_level2", "AB.png");

		// logo2
		const logo2 = this.add.image(360, 324, "logo_texture0_level2", "DB.png");

		// logo3
		const logo3 = this.add.image(360, 294, "logo_texture0_level2", "BB.png");

		// txtInformation
		const txtInformation = this.add.text(360, 800, "", {});
		txtInformation.scaleX = 0.5;
		txtInformation.scaleY = 0.5;
		txtInformation.setOrigin(0.5, 0.5);
		txtInformation.text = "IDS_PRESSPIN";
		txtInformation.setStyle({ "align": "center", "color": "#FFFFFF", "fontFamily": "ROBOTO_CONDENSED_BOLD", "fontSize": "48px", "stroke": "#000000", "strokeThickness": 3 });

		// spinBtn
		const spinBtn = this.add.sprite(360, 955, "uiElements", "spinBtnBaseHi.png");
		spinBtn.setInteractive(new Phaser.Geom.Rectangle(0, 0, 170, 170), Phaser.Geom.Rectangle.Contains);

		// bgCoins
		const bgCoins = this.add.image(130, 910, "ui_mobile01", "bar01.png");
		bgCoins.scaleX = 0.6;
		bgCoins.scaleY = 0.6;

		// imgCoins
		const imgCoins = this.add.image(130, 868, "ui_mobile01", "coins.png");
		imgCoins.scaleX = 0.6;
		imgCoins.scaleY = 0.6;

		// txtCoinsBet
		const txtCoinsBet = this.add.text(130, 910, "", {});
		txtCoinsBet.scaleX = 0.5;
		txtCoinsBet.scaleY = 0.5;
		txtCoinsBet.setOrigin(0.5, 0.5);
		txtCoinsBet.text = "1";
		txtCoinsBet.setStyle({ "color": "#F7EDA1", "fontFamily": "FLANKER_GRIFFO", "fontSize": "60px" });

		// prevCoinsBtn
		const prevCoinsBtn = this.add.sprite(30, 910, "ui_mobile01", "minus01.png");
		prevCoinsBtn.setInteractive(new Phaser.Geom.Rectangle(0, 0, 90, 80), Phaser.Geom.Rectangle.Contains);
		prevCoinsBtn.scaleX = 0.6;
		prevCoinsBtn.scaleY = 0.6;
		prevCoinsBtn.angle = -90;

		// nextCoinsBtn
		const nextCoinsBtn = this.add.sprite(232, 910, "ui_mobile01", "plus01.png");
		nextCoinsBtn.setInteractive(new Phaser.Geom.Rectangle(0, 0, 90, 80), Phaser.Geom.Rectangle.Contains);
		nextCoinsBtn.scaleX = 0.6;
		nextCoinsBtn.scaleY = 0.6;
		nextCoinsBtn.angle = 90;

		// bgLines
		const bgLines = this.add.image(130, 995, "ui_mobile01", "bar01.png");
		bgLines.scaleX = 0.6;
		bgLines.scaleY = 0.6;

		// txtLinesBet
		const txtLinesBet = this.add.text(130, 995, "", {});
		txtLinesBet.scaleX = 0.5;
		txtLinesBet.scaleY = 0.5;
		txtLinesBet.setOrigin(0.5, 0.5);
		txtLinesBet.text = "1";
		txtLinesBet.setStyle({ "color": "#F7EDA1", "fontFamily": "FLANKER_GRIFFO", "fontSize": "60px" });

		// prevLinesBtn
		const prevLinesBtn = this.add.sprite(30, 995, "ui_mobile01", "minus01.png");
		prevLinesBtn.setInteractive(new Phaser.Geom.Rectangle(0, 0, 90, 80), Phaser.Geom.Rectangle.Contains);
		prevLinesBtn.scaleX = 0.6;
		prevLinesBtn.scaleY = 0.6;
		prevLinesBtn.angle = -90;

		// imgLines
		const imgLines = this.add.image(130, 953, "ui_mobile01", "lines.png");
		imgLines.scaleX = 0.6;
		imgLines.scaleY = 0.6;

		// nextLinesBtn
		const nextLinesBtn = this.add.sprite(232, 995, "ui_mobile01", "plus01.png");
		nextLinesBtn.setInteractive(new Phaser.Geom.Rectangle(0, 0, 90, 80), Phaser.Geom.Rectangle.Contains);
		nextLinesBtn.scaleX = 0.6;
		nextLinesBtn.scaleY = 0.6;
		nextLinesBtn.angle = 90;

		// imgDenomination
		const imgDenomination = this.add.image(580, 894, "ui_mobile01", "coins value.png");
		imgDenomination.scaleX = 0.6;
		imgDenomination.scaleY = 0.6;

		// denominationBtn
		const denominationBtn = this.add.sprite(580, 935, "ui_mobile01", "btn01.png");
		denominationBtn.setInteractive(new Phaser.Geom.Rectangle(0, 0, 417, 92), Phaser.Geom.Rectangle.Contains);
		denominationBtn.scaleX = 0.6;
		denominationBtn.scaleY = 0.6;

		// txtDenominationValue
		const txtDenominationValue = this.add.text(580, 935, "", {});
		txtDenominationValue.scaleX = 0.5;
		txtDenominationValue.scaleY = 0.5;
		txtDenominationValue.setOrigin(0.5, 0.5);
		txtDenominationValue.text = "CNY 2.00";
		txtDenominationValue.setStyle({ "color": "#5A1600", "fontFamily": "ROBOTO_CONDENSED_BOLD", "fontSize": "48px", "fontStyle": "bold" });

		// gambleBtn
		const gambleBtn = this.add.sprite(517, 995, "ui_mobile01", "btn02.png");
		gambleBtn.setInteractive(new Phaser.Geom.Rectangle(0, 0, 207, 97), Phaser.Geom.Rectangle.Contains);
		gambleBtn.scaleX = 0.6;
		gambleBtn.scaleY = 0.6;

		// txtGamble
		const txtGamble = this.add.text(517, 995, "", {});
		txtGamble.scaleX = 0.5;
		txtGamble.scaleY = 0.5;
		txtGamble.setOrigin(0.5, 0.5);
		txtGamble.text = "IDS_BTN_GAMBLE";
		txtGamble.setStyle({ "color": "#5A1600", "fontFamily": "ROBOTO_CONDENSED_BOLD", "fontSize": "48px", "fontStyle": "bold" });

		// collectBtn
		const collectBtn = this.add.sprite(645, 995, "ui_mobile01", "btn02.png");
		collectBtn.setInteractive(new Phaser.Geom.Rectangle(0, 0, 207, 97), Phaser.Geom.Rectangle.Contains);
		collectBtn.scaleX = 0.6;
		collectBtn.scaleY = 0.6;

		// txtCollect
		const txtCollect = this.add.text(645, 995, "", {});
		txtCollect.scaleX = 0.5;
		txtCollect.scaleY = 0.5;
		txtCollect.setOrigin(0.5, 0.5);
		txtCollect.text = "IDS_BTN_COLLECT";
		txtCollect.setStyle({ "color": "#5A1600", "fontFamily": "ROBOTO_CONDENSED_BOLD", "fontSize": "48px", "fontStyle": "bold" });

		// txtAutoplayValue
		const txtAutoplayValue = this.add.text(360, 955, "", {});
		txtAutoplayValue.setOrigin(0.5, 0.5);
		txtAutoplayValue.visible = false;
		txtAutoplayValue.setStyle({ "color": "#F7EDA1", "fontFamily": "FLANKER_GRIFFO", "fontSize": "40px" });

		// freeSpinHeader1
		const freeSpinHeader1 = this.add.image(360, 313, "skin_texture0_level2", "LL.png");
		freeSpinHeader1.alpha = 0;
		freeSpinHeader1.alphaTopLeft = 0;
		freeSpinHeader1.alphaTopRight = 0;
		freeSpinHeader1.alphaBottomLeft = 0;
		freeSpinHeader1.alphaBottomRight = 0;

		// freeSpinHeader2
		const freeSpinHeader2 = this.add.image(230, 313, "skin_texture0_level2", "VI.png");
		freeSpinHeader2.alpha = 0;
		freeSpinHeader2.alphaTopLeft = 0;
		freeSpinHeader2.alphaTopRight = 0;
		freeSpinHeader2.alphaBottomLeft = 0;
		freeSpinHeader2.alphaBottomRight = 0;

		// freeSpinHeader3
		const freeSpinHeader3 = this.add.text(410, 313, "", {});
		freeSpinHeader3.setOrigin(0.5, 0.5);
		freeSpinHeader3.alpha = 0;
		freeSpinHeader3.alphaTopLeft = 0;
		freeSpinHeader3.alphaTopRight = 0;
		freeSpinHeader3.alphaBottomLeft = 0;
		freeSpinHeader3.alphaBottomRight = 0;
		freeSpinHeader3.text = "Free Spin 3 of 10";
		freeSpinHeader3.setStyle({ "color": "#F7EDA1", "fontFamily": "FLANKER_GRIFFO", "fontSize": "25px" });

		// mobileInfoPrefab
		const mobileInfoPrefab = new MobileInfoPrefab(this, 235, 1250);
		this.add.existing(mobileInfoPrefab);

		this.logo1 = logo1;
		this.logo2 = logo2;
		this.logo3 = logo3;
		this.txtInformation = txtInformation;
		this.spinBtn = spinBtn;
		this.txtCoinsBet = txtCoinsBet;
		this.prevCoinsBtn = prevCoinsBtn;
		this.nextCoinsBtn = nextCoinsBtn;
		this.txtLinesBet = txtLinesBet;
		this.prevLinesBtn = prevLinesBtn;
		this.nextLinesBtn = nextLinesBtn;
		this.denominationBtn = denominationBtn;
		this.txtDenominationValue = txtDenominationValue;
		this.gambleBtn = gambleBtn;
		this.txtGamble = txtGamble;
		this.collectBtn = collectBtn;
		this.txtCollect = txtCollect;
		this.txtAutoplayValue = txtAutoplayValue;
		this.freeSpinHeader1 = freeSpinHeader1;
		this.freeSpinHeader2 = freeSpinHeader2;
		this.freeSpinHeader3 = freeSpinHeader3;
		this.mobileInfoPrefab = mobileInfoPrefab;

		this.events.emit("scene-awake");
	}

	private logo1!: Phaser.GameObjects.Image;
	private logo2!: Phaser.GameObjects.Image;
	private logo3!: Phaser.GameObjects.Image;
	private txtInformation!: Phaser.GameObjects.Text;
	private spinBtn!: Phaser.GameObjects.Sprite;
	private txtCoinsBet!: Phaser.GameObjects.Text;
	private prevCoinsBtn!: Phaser.GameObjects.Sprite;
	private nextCoinsBtn!: Phaser.GameObjects.Sprite;
	private txtLinesBet!: Phaser.GameObjects.Text;
	private prevLinesBtn!: Phaser.GameObjects.Sprite;
	private nextLinesBtn!: Phaser.GameObjects.Sprite;
	private denominationBtn!: Phaser.GameObjects.Sprite;
	private txtDenominationValue!: Phaser.GameObjects.Text;
	private gambleBtn!: Phaser.GameObjects.Sprite;
	private txtGamble!: Phaser.GameObjects.Text;
	private collectBtn!: Phaser.GameObjects.Sprite;
	private txtCollect!: Phaser.GameObjects.Text;
	private txtAutoplayValue!: Phaser.GameObjects.Text;
	private freeSpinHeader1!: Phaser.GameObjects.Image;
	private freeSpinHeader2!: Phaser.GameObjects.Image;
	private freeSpinHeader3!: Phaser.GameObjects.Text;
	private mobileInfoPrefab!: MobileInfoPrefab;

	/* START-USER-CODE */

	// Write your code here
	private GameState!: VideoSlotGameState;
	private ReelsManager!: VideoSlotReelsManager;
	private toggleVfx!: any;

	init() {
		this.GameState = container.get<VideoSlotGameState>('VideoSlotGameState');
		this.ReelsManager = container.get<VideoSlotReelsManager>('VideoSlotReelsManager');
	}

	preload() {
		this.scene.add('MobileMenuScene', container.get<Phaser.Scene>('MobileMenuScene'), true);
		this.scene.add('MobileGambleScene', container.get<Phaser.Scene>('MobileGambleScene'), true);
		this.scene.add('MobileScatterScene', container.get<Phaser.Scene>('MobileScatterScene'), true);
		this.scene.add('MobilePopupScene', container.get<Phaser.Scene>('MobilePopupScene'), true);
		this.scene.add('MobileFeaturesScene', container.get<Phaser.Scene>('MobileFeaturesScene'), true);

		setTimeout(() => {
			this.GameState.isShowingMenu.subscribe((val) => {
				if (val) {
					console.log("show Menu")
					this.scene.wake("MobileMenuScene");
				} else {
					console.log("hide Menu")
					this.scene.sleep("MobileMenuScene");
				}
			});

			this.GameState.isShowingGamble.subscribe((val) => {
				if (val) {
					console.log("show Gamble")
					this.scene.launch("MobileGambleScene");
					this.setButtonInteractive(this.gambleBtn, false);
					this.setButtonInteractive(this.collectBtn, true);
				} else {
					console.log("hide Gamble")
					this.scene.stop("MobileGambleScene");
					this.setButtonInteractive(this.gambleBtn, false);
					this.setButtonInteractive(this.collectBtn, false);
                	this.GameState.isReward.set(false);
				}
			});

			this.GameState.isIllegalSession.subscribe((val) => {
				if (val) {
					console.log("show Popup")
					this.scene.launch("MobilePopupScene");
				} else {
					console.log("hide Popup")
					this.scene.stop("MobilePopupScene");
				}
			});

			this.GameState.isReward.subscribe((val) => {
				if(this.GameState.isAutoPlayRunning.get()) return;
				if(this.GameState.isAutoSpinRunning.get()) return;
				if(this.toggleVfx) this.toggleVfx.destroy();
				if (val) {
					console.log("show Reward")
					const grayTint = 0x888888;
					const whiteTint = 0xFFFFFF;
					const firstColor = Phaser.Display.Color.ValueToColor(grayTint);
					const secondColor = Phaser.Display.Color.ValueToColor(whiteTint);
					this.toggleVfx = this.tweens.addCounter({
						from: 0,
						to: 100,
						hold: 300,
						repeatDelay: 300,
						duration: 10,
						repeat: -1,
						yoyo: true,
						onUpdate: tween => {
							const value = tween.getValue() as number;
							const color1 = Phaser.Display.Color.Interpolate.ColorWithColor(firstColor, secondColor, 100, value);
							const color2 = Phaser.Display.Color.Interpolate.ColorWithColor(secondColor, firstColor, 100, value);
							(this.gambleBtn as Phaser.GameObjects.Sprite).setTint(Phaser.Display.Color.GetColor(color1.r, color1.g, color1.b));
							(this.collectBtn as Phaser.GameObjects.Sprite).setTint(Phaser.Display.Color.GetColor(color2.r, color2.g, color2.b));
						}
					});
					this.setButtonInteractive(this.collectBtn, true);
					this.setButtonInteractive(this.gambleBtn, true);
				} else {
					console.log("hide Reward")
					this.setButtonInteractive(this.collectBtn, false);
					this.setButtonInteractive(this.gambleBtn, false);
            		this.ReelsManager.removePayLineImages()
				}
			});
			Dispatcher.addListener(EVENTS.SPIN_REWARD, (coinWon: number, paylineIndex: number) => {
				if(!this.GameState.isReward.get()) {
					this.GameState.isReward.set(true);
				} else{
					return;
				}
				const wonLine = this.cache.json.get('language').texts['IDS_MENU_WON'];
				const totalWin = wonLine.replace('%d', this.GameState.winCoins.get().toString());
				if (paylineIndex) {
					let txtCoinWon = this.cache.json.get('language').texts["IDS_MENU_WONMONEY_LINE"];
					txtCoinWon = txtCoinWon.replace('%d', coinWon.toString()).replace('%l', paylineIndex.toString())
					this.GameState.informationText.set(`${totalWin}\n${txtCoinWon}`);
				} else if (coinWon) {
					this.GameState.informationText.set(`${totalWin}`);
				} else {
					this.GameState.informationText.set(this.cache.json.get('language').texts["IDS_PRESSPIN"]);
				}
			})

			this.GameState.isSpinning.subscribe((val) => {
				if (val) {
					if(this.toggleVfx) this.toggleVfx.destroy();
					this.ReelsManager.removePayLineImages();
					this.GameState.isReward.set(false);
					this.GameState.informationText.set(this.cache.json.get('language').texts['IDS_VP_SPINNING']);
					if(this.GameState.isShowingGamble.get()){
						this.GameState.isShowingGamble.set(false);
					}
					console.log("show Spin")
					this.setButtonInteractive(this.spinBtn, this.GameState.isAutoPlayRunning.get() ? true : false);
					this.setButtonInteractive(this.denominationBtn, false);
					this.setButtonInteractive(this.gambleBtn, false);
					this.setButtonInteractive(this.collectBtn, false);
					this.setButtonInteractive(this.prevCoinsBtn, false);
					this.setButtonInteractive(this.nextCoinsBtn, false);
					this.setButtonInteractive(this.prevLinesBtn, false);
					this.setButtonInteractive(this.nextLinesBtn, false);
					this.setButtonInteractive(this.mobileInfoPrefab.btnMenu, false);
				} else {
					console.log("hide Spin")
					this.setButtonInteractive(this.spinBtn, true);
					this.setButtonInteractive(this.denominationBtn, true);
					this.setButtonInteractive(this.mobileInfoPrefab.btnMenu, true);

					if (this.GameState.coinBet.get() <= 1) {
						this.setButtonInteractive(this.prevCoinsBtn, false);
					} else {
						this.setButtonInteractive(this.prevCoinsBtn, true);
					}
					if (this.GameState.coinBet.get() >= 5) {
						this.setButtonInteractive(this.nextCoinsBtn, false);
					} else {
						this.setButtonInteractive(this.nextCoinsBtn, true);
					}
					if (this.GameState.linesBet.get() <= 1) {
						this.setButtonInteractive(this.prevLinesBtn, false);
					} else {
						this.setButtonInteractive(this.prevLinesBtn, true);
					}
					if (this.GameState.linesBet.get() >= 10) {
						this.setButtonInteractive(this.nextLinesBtn, false);
					} else {
						this.setButtonInteractive(this.nextLinesBtn, true);
					}
				}
			});

			this.GameState.isEndScatter.subscribe((val) => {
				if (!val) {
					if(this.GameState.isAutoPlayRunning.get()) {
						this.spinBtn.setFrame('stopBtn.png');
						this.spinBtn.setInteractive();
						this.txtAutoplayValue.setVisible(true);
						Dispatcher.emit(ACTION_EVENTS.AUTO_PLAY_START, this.GameState.activeAutoplay.get());
					}
				}
			})

			// Autoplay state
			this.GameState.isAutoPlayRunning.subscribe((isAutoPlayRunning) => {
				console.log("isAutoPlayRunning", isAutoPlayRunning);
				console.log("activeAutoplay", this.GameState.activeAutoplay.get());
				if (isAutoPlayRunning) {
					this.spinBtn.setFrame('stopBtn.png');
					this.spinBtn.setInteractive();
					this.txtAutoplayValue.setVisible(true);
				} else if(!isAutoPlayRunning && this.GameState.activeAutoplay.get() === 0) {
					this.spinBtn.setVisible(true)
					this.spinBtn.setFrame('spinBtnBaseHi.png');
					this.spinBtn.setInteractive();
					this.txtAutoplayValue.setVisible(false);
				}
			});
			this.GameState.activeAutoplay.subscribe((val) => {
				console.log("activeAutoplay", val);
				this.txtAutoplayValue.setText((val).toString());
				if(val === 0) {
					this.GameState.isAutoPlayRunning.set(false);
				}
			});

			this.GameState.isLeftHand.subscribe((val) => {
				if (val) {
					this.mobileInfoPrefab.btnMenu.setX(-195);
				} else {
					this.mobileInfoPrefab.btnMenu.setX(440);
				}
			});
		}, 0);
	}

	create() {

		this.editorCreate();
		this.setupUI()
	}

	setupUI() {
		this.txtInformation.setText(this.cache.json.get('language').texts[this.txtInformation.text]);
		this.GameState.informationText.set(this.cache.json.get('language').texts[this.GameState.informationText.get()]);
		this.txtGamble.setText(this.cache.json.get('language').texts[this.txtGamble.text]);
		this.txtCollect.setText(this.cache.json.get('language').texts[this.txtCollect.text]);
		this.mobileInfoPrefab.txtCoinsText.setText(this.cache.json.get('language').texts[this.mobileInfoPrefab.txtCoinsText.text]);
		this.mobileInfoPrefab.txtBetText.setText(this.cache.json.get('language').texts[this.mobileInfoPrefab.txtBetText.text]);
		this.mobileInfoPrefab.txtWinText.setText(this.cache.json.get('language').texts[this.mobileInfoPrefab.txtWinText.text]);
		this.mobileInfoPrefab.txtBalanceText.setText(this.cache.json.get('language').texts[this.mobileInfoPrefab.txtBalanceText.text]);
		this.mobileInfoPrefab.txtBalanceBetText.setText(this.cache.json.get('language').texts[this.mobileInfoPrefab.txtBalanceBetText.text]);

		const balance = this.GameState.balance;
		const betCoins = this.GameState.coinBet;
		const betLines = this.GameState.linesBet;
		const informationText = this.GameState.informationText;
		const totalWin = this.GameState.totalWin;
		const coinValueList = this.GameState.coinValueList;
		const coinValue = this.GameState.coinValue;
		const coinValueCurrency = this.GameState.coinValueCurrency;

		// Set button states based on initial values
		if (betCoins.get() <= 1) {
			this.setButtonInteractive(this.prevCoinsBtn, false);
		}
		if (betCoins.get() >= 5) {
			this.setButtonInteractive(this.nextCoinsBtn, false);
		}
		if (betLines.get() <= 1) {
			this.setButtonInteractive(this.prevLinesBtn, false);
		}
		if (betLines.get() >= 10) {
			this.setButtonInteractive(this.nextLinesBtn, false);
		}

		// Subscribe to state changes to update UI reactively
		balance.subscribe((val) => {
			let valueMoney = ((val / (this.GameState.coinValue.get() / 100) / 100).toFixed(0));
			this.mobileInfoPrefab.txtCoinsText.setText(`${this.cache.json.get('language').texts['IDS_COINS_CAPTION']} ${valueMoney}`);
			this.mobileInfoPrefab.txtBalanceText.setText(`${this.cache.json.get('language').texts['IDS_BALANCE_CAPTION']} ${coinValueCurrency.get()} ${(val / 100).toFixed(2)}`);
		});

		betCoins.subscribe((val) => {
			this.txtCoinsBet.setText(val.toString());
			this.mobileInfoPrefab.txtBetText.setText(`${this.cache.json.get('language').texts['IDS_BET_CAPTION']} ${betCoins.get() * betLines.get()}`);
			this.mobileInfoPrefab.txtBalanceBetText.setText(`${this.cache.json.get('language').texts['IDS_BET_CAPTION']} ${coinValueCurrency.get()} ${(val * (coinValue.get() / 100) * betLines.get()).toFixed(2)}`);

			if (val <= 1) {
				this.setButtonInteractive(this.prevCoinsBtn, false);
			} else {
				this.setButtonInteractive(this.prevCoinsBtn, true);
			}

			// Increase button
			if (val >= 5) {
				this.setButtonInteractive(this.nextCoinsBtn, false);
			} else {
				this.setButtonInteractive(this.nextCoinsBtn, true);
			}
		});

		betLines.subscribe((val) => {
			this.txtLinesBet.setText(val.toString());
			this.mobileInfoPrefab.txtBetText.setText(`${this.cache.json.get('language').texts['IDS_BET_CAPTION']} ${betCoins.get() * betLines.get()}`);
			this.mobileInfoPrefab.txtBalanceBetText.setText(`${this.cache.json.get('language').texts['IDS_BET_CAPTION']} ${coinValueCurrency.get()} ${(val * betCoins.get() * (coinValue.get() / 100)).toFixed(2)}`);

			if (val <= 1) {
				this.setButtonInteractive(this.prevLinesBtn, false);
			} else {
				this.setButtonInteractive(this.prevLinesBtn, true);
			}

			// Increase button
			if (val >= 10) {
				this.setButtonInteractive(this.nextLinesBtn, false);
			} else {
				this.setButtonInteractive(this.nextLinesBtn, true);
			}
		});

		informationText.subscribe((val) => {
			this.txtInformation.setText(val);
		});

		coinValue.subscribe((val) => {
			let valueMoney = ((this.GameState.balance.get() / (val / 100) / 100).toFixed(0));
			this.mobileInfoPrefab.txtCoinsText.setText(`${this.cache.json.get('language').texts['IDS_COINS_CAPTION']} ${valueMoney}`);
			this.txtDenominationValue.setText(`${coinValueCurrency.get()} ${(val / 100).toFixed(2)}`);
			this.mobileInfoPrefab.txtBalanceBetText.setText(`${this.cache.json.get('language').texts['IDS_BET_CAPTION']} ${coinValueCurrency.get()} ${((val / 100) * betCoins.get() * betLines.get()).toFixed(2)}`);
		});

		totalWin.subscribe((val) => {
			this.mobileInfoPrefab.txtWinText.setText(`${this.cache.json.get('language').texts['IDS_WIN_CAPTION']} ${val.toFixed(2)}`);
		});

		// Spin
		this.spinBtn.on('pointerdown', () => {
			if(this.GameState.isSpinning.get() && !this.GameState.isAutoPlayRunning.get()) return;
			if(this.GameState.isScatterInfoShown.get()) {
				this.setButtonInteractive(this.spinBtn, false);
				Dispatcher.emit(ACTION_EVENTS.SPIN_START);
				return;
			}
			if(this.GameState.isAutoPlayRunning.get()) {
				this.GameState.autoplayBalance.set(0);
				this.GameState.activeAutoplay.set(0);
				this.GameState.isAutoPlayRunning.set(false);
				Dispatcher.emit(ACTION_EVENTS.AUTO_PLAY_STOP);
				this.setButtonInteractive(this.spinBtn, false);
				return;
			};
			this.setButtonInteractive(this.spinBtn, false);
			Dispatcher.emit(ACTION_EVENTS.SPIN_START);
		});

		// Bet Coins
		this.prevCoinsBtn.on('pointerdown', () => {
			this.addButtonTween(this.prevCoinsBtn)
			let currentBet = betCoins.get();
			if (currentBet > 1) {
				currentBet -= 1;
				betCoins.set(currentBet);
			}
		});
		this.nextCoinsBtn.on('pointerdown', () => {
			this.addButtonTween(this.nextCoinsBtn)
			let currentBet = betCoins.get();
			currentBet += 1;
			betCoins.set(currentBet);
		});

		// Bet Lines
		this.prevLinesBtn.on('pointerdown', () => {
			this.addButtonTween(this.prevLinesBtn)
			let currentBet = betLines.get();
			if (currentBet > 1) {
				currentBet -= 1;
				betLines.set(currentBet);
			}
		});
		this.nextLinesBtn.on('pointerdown', () => {
			this.addButtonTween(this.nextLinesBtn)
			let currentBet = betLines.get();
			currentBet += 1;
			betLines.set(currentBet);
		});

		// Denomination
		this.denominationBtn.on('pointerdown', () => {
			const currentIndex = coinValueList.indexOf(coinValue.get());
			const nextIndex = (currentIndex + 1) % coinValueList.length;
			coinValue.set(coinValueList[nextIndex]);
			this.addButtonTween(this.denominationBtn, [ this.txtDenominationValue ] );
		});

		// Gamble
		this.gambleBtn.on('pointerdown', () => {
			this.GameState.isShowingGamble.set(true);
			if(this.toggleVfx) this.toggleVfx.destroy();
			this.addButtonTween(this.gambleBtn)
		});

		// Collect
		this.collectBtn.on('pointerdown', () => {
			this.GameState.playerPick.set(0);
			this.GameState.isShowingGamble.set(false);
			if(this.toggleVfx) this.toggleVfx.destroy();
			this.addButtonTween(this.collectBtn)
		});

		// Menu
		this.mobileInfoPrefab.btnMenu.on('pointerdown', () => {
			this.GameState.isShowingMenu.set(true);
			Dispatcher.emit(ACTION_EVENTS.OPEN_MENU);
			this.tweens.add({
				targets: [this.mobileInfoPrefab.btnMenu],
				scale: .9,
				duration: 100,
				ease: 'Power2'
			});
		});
		['pointerup', 'pointerout'].forEach(event => {
			this.mobileInfoPrefab.btnMenu.on(event, () => {
				this.tweens.add({
					targets: [this.mobileInfoPrefab.btnMenu],
					scale: 1,
					duration: 100,
					ease: 'Power2'
				});
			});
		});

		Dispatcher.addListener(ACTION_EVENTS.AUTO_SPIN_START, (symbol, freeSpinCounter = 0) => {
			this.GameState.isAutoSpinRunning.set(true);
			this.setButtonInteractive(this.spinBtn, false);
			if(this.logo1.alpha == 1){
				this.tweens.add({
					targets: [this.logo1, this.logo2, this.logo3],
					alpha: { from: 1, to: 0, start: 1},
					duration: 500,
				})
				this.tweens.add({
					targets: [this.freeSpinHeader1, this.freeSpinHeader2, this.freeSpinHeader3],
					alpha: { from: 0, to: 1, start: 0},
					delay: 500,
					duration: 500,
				})
			}
			if(symbol !== null){
				this.freeSpinHeader2.setTexture(symbol[0], symbol[1])
			}
			const textFreeSpin = this.cache.json.get('language').texts["IDS_FREESPIN_X_OF_Y"].replace("%d", freeSpinCounter).replace("%t", "10")
			this.freeSpinHeader3.setText(textFreeSpin)
		})

		Dispatcher.addListener(ACTION_EVENTS.AUTO_SPIN_STOP, () => {

			this.tweens.add({
				targets: [this.logo1, this.logo2, this.logo3],
				alpha: { from: 0, to: 1, start: 0},
				duration: 500,
			})
			this.tweens.add({
				targets: [this.freeSpinHeader1, this.freeSpinHeader2, this.freeSpinHeader3],
				alpha: { from: 1, to: 0, start: 1},
				delay: 500,
				duration: 500,
			})
		})

		Dispatcher.addListener(EVENTS.SHOW_SCATTER_INFO, (scatterSymbolSprite) => {
			this.GameState.isShowingScatter.set(true);

			this.spinBtn.setFrame('spinBtnBaseHi.png');
			this.txtAutoplayValue.setVisible(false)

			console.log(scatterSymbolSprite)
			this.scene.launch('MobileScatterScene');
			if(scatterSymbolSprite){
				(this.scene.get('MobileScatterScene') as MobileScatterScene)?.bookAnimation(scatterSymbolSprite);
			}
			else{
				(this.scene.get('MobileScatterScene') as MobileScatterScene)?.paperScatter();
			}
		});

		Dispatcher.addListener(EVENTS.HIDE_SCATTER_INFO, () => {
			this.GameState.isShowingScatter.set(false);
			this.GameState.isSpinning.set(false);
			this.ReelsManager.currentSpin = null;
			this.scene.stop('MobileScatterScene');
		});


		Dispatcher.addListener(ACTION_EVENTS.AUTO_PLAY_STOP, () => {
			this.spinBtn.setFrame('spinBtnBaseHi.png');
			this.txtAutoplayValue.setVisible(false)
		})
	}

	addButtonTween(sprite: Phaser.GameObjects.Sprite, text: Phaser.GameObjects.Text[] = []) {
		const targets = [sprite, ...text] as Phaser.GameObjects.GameObject[];

		const playTween = (scale: number) => {
			this.tweens.add({
				targets,
				scale,
				duration: 100,
				ease: "Power2"
			});
		};

		sprite.on("pointerdown", () => playTween(.55));
		["pointerup"].forEach(evt => sprite.on(evt, () => playTween(0.6)));
	}

	setButtonInteractive(btn: Phaser.GameObjects.Sprite, isInteractive: boolean){
		if(isInteractive){
			btn.setInteractive();
			btn.setTint(0xffffff);
		} else {
			btn.disableInteractive();
			btn.setTint(0x888888);
		}
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
