// You can write more code here

/* START OF COMPILED CODE */

import Button from "@shared/interfaces/components/Button";
import BetPrefab from "@shared/interfaces/components/BetPrefab";
import FooterPrefab from "@shared/interfaces/components/FooterPrefab";
/* START-USER-IMPORTS */
import MenuScene from "@shared/scenes/MenuScene";
import { container } from "@gl/di/container";
import { VideoSlotGameState } from "@games/videoslot/VideoSlotGameState";
import PaytableScene from "./PaytableScene";
import AutoplayScene from "@shared/scenes/AutoplayScene";
import GambleScene from "./GambleScene";
import ScatterScene from "./ScatterScene";
import PopupScene from "./PopupScene";

// container.bind<VideoSlotGameState>("VideoSlotGameState").to(VideoSlotGameState).inSingletonScope();
container.bind<MenuScene>("MenuScene").to(MenuScene).inSingletonScope();
container.bind<PaytableScene>("PaytableScene").to(PaytableScene).inSingletonScope();
container.bind<AutoplayScene>("AutoplayScene").to(AutoplayScene).inSingletonScope();
container.bind<GambleScene>("GambleScene").to(GambleScene).inSingletonScope();
container.bind<ScatterScene>("ScatterScene").to(ScatterScene).inSingletonScope();
container.bind<PopupScene>("PopupScene").to(PopupScene).inSingletonScope();

/* END-USER-IMPORTS */

export default class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// this.audio = container.get<IAudioService>(TYPES.AudioService)
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// t0AB_png
		const t0AB_png = this.add.image(640, 450, "background_texture0_level0", "AB.png");

		// t1BB_png_1
		const t1BB_png_1 = this.add.image(550, 594, "menu_texture1_level0", "NB.png");

		// informationImg
		const informationImg = this.add.image(550, 594, "menu_texture1_level0", "BB.png");

		// denominationBtn
		const denominationBtn = this.add.sprite(150, 650, "menu_texture1_level0", "WB.png");
		denominationBtn.setInteractive(this.input.makePixelPerfect());

		// logo1
		const logo1 = this.add.image(640, 48, "logo_texture0_level0", "AB.png");

		// logo2
		const logo2 = this.add.image(640, 66, "logo_texture0_level0", "DB.png");

		// logo3
		const logo3 = this.add.image(640, 23, "logo_texture0_level0", "BB.png");

		// txtCoinsValue
		const txtCoinsValue = this.add.text(150, 585, "", {});
		txtCoinsValue.setOrigin(0.5, 0.5);
		txtCoinsValue.text = "COINS: ";
		txtCoinsValue.setStyle({ "color": "#F7EDA1", "fontFamily": "FLANKER_GRIFFO", "fontSize": "22px" });

		// txtBetValue
		const txtBetValue = this.add.text(975, 585, "", {});
		txtBetValue.setOrigin(0.5, 0.5);
		txtBetValue.text = "BET: ";
		txtBetValue.setStyle({ "color": "#F7EDA1", "fontFamily": "FLANKER_GRIFFO", "fontSize": "20px" });

		// txtCoinValueText
		const txtCoinValueText = this.add.text(150, 634, "", {});
		txtCoinValueText.scaleX = 0.5;
		txtCoinValueText.scaleY = 0.5;
		txtCoinValueText.setOrigin(0.5, 0.5);
		txtCoinValueText.text = "COIN VALUE";
		txtCoinValueText.setStyle({ "color": "#444444", "fontFamily": "FLANKER_GRIFFO", "fontSize": "28px" });

		// txtDenomination
		const txtDenomination = this.add.text(150, 660, "", {});
		txtDenomination.scaleX = 0.4;
		txtDenomination.scaleY = 0.5;
		txtDenomination.setOrigin(0.5, 0.5);
		txtDenomination.text = "CNY 2.00";
		txtDenomination.setStyle({ "color": "#5a1500", "fontFamily": "FLANKER_GRIFFO", "fontSize": "60px" });

		// autoplayBtn
		const autoplayBtn = new Button(this, 1155, 659);
		this.add.existing(autoplayBtn);
		autoplayBtn.scaleX = 1;
		autoplayBtn.scaleY = 1;

		// paytableBtn
		const paytableBtn = new Button(this, 1155, 590);
		this.add.existing(paytableBtn);
		paytableBtn.scaleX = 1;
		paytableBtn.scaleY = 1;

		// betmaxBtn
		const betmaxBtn = new Button(this, 795, 659);
		this.add.existing(betmaxBtn);
		betmaxBtn.scaleX = 1;
		betmaxBtn.scaleY = 1;

		// spinBtn
		const spinBtn = new Button(this, 972, 647);
		this.add.existing(spinBtn);
		spinBtn.scaleX = 1;
		spinBtn.scaleY = 1;

		// txtInformation
		const txtInformation = this.add.text(570, 595, "", {});
		txtInformation.setOrigin(0.5, 0.5);
		txtInformation.text = "Information";
		txtInformation.setStyle({ "align": "center", "color": "#F7EDA1", "fontFamily": "FLANKER_GRIFFO", "fontSize": "20px" });

		// gambleBtn
		const gambleBtn = new Button(this, 795, 659);
		this.add.existing(gambleBtn);
		gambleBtn.scaleX = 1;
		gambleBtn.scaleY = 1;
		gambleBtn.visible = false;

		// collectBtn
		const collectBtn = new Button(this, 1155, 659);
		this.add.existing(collectBtn);
		collectBtn.scaleX = 1;
		collectBtn.scaleY = 1;
		collectBtn.visible = false;

		// bgAutoplay
		const bgAutoplay = this.add.image(970, 648, "menu_texture0_level0", "LB.png");
		bgAutoplay.scaleX = 0.8;
		bgAutoplay.scaleY = 0.8;
		bgAutoplay.visible = false;

		// txtAutoplay
		const txtAutoplay = this.add.text(970, 633, "", {});
		txtAutoplay.scaleX = 0.75;
		txtAutoplay.setOrigin(0.5, 0.5);
		txtAutoplay.visible = false;
		txtAutoplay.text = "IDS_AP_RUNNING";
		txtAutoplay.setStyle({ "color": "#F7EDA1", "fontFamily": "FLANKER_GRIFFO", "fontSize": "15px" });

		// txtAutoplayValue
		const txtAutoplayValue = this.add.text(970, 661, "", {});
		txtAutoplayValue.setOrigin(0.5, 0.5);
		txtAutoplayValue.visible = false;
		txtAutoplayValue.text = "50";
		txtAutoplayValue.setStyle({ "color": "#F7EDA1", "fontFamily": "FLANKER_GRIFFO", "fontSize": "28px" });

		// freeSpinHeader1
		const freeSpinHeader1 = this.add.image(640, 56, "skin_texture0_level0", "LL.png");
		freeSpinHeader1.scaleX = 0.8;
		freeSpinHeader1.scaleY = 0.8;
		freeSpinHeader1.alpha = 0;
		freeSpinHeader1.alphaTopLeft = 0;
		freeSpinHeader1.alphaTopRight = 0;
		freeSpinHeader1.alphaBottomLeft = 0;
		freeSpinHeader1.alphaBottomRight = 0;

		// freeSpinHeader2
		const freeSpinHeader2 = this.add.image(454, 56, "skin_texture0_level0", "VI.png");
		freeSpinHeader2.scaleX = 0.8;
		freeSpinHeader2.scaleY = 0.8;
		freeSpinHeader2.alpha = 0;
		freeSpinHeader2.alphaTopLeft = 0;
		freeSpinHeader2.alphaTopRight = 0;
		freeSpinHeader2.alphaBottomLeft = 0;
		freeSpinHeader2.alphaBottomRight = 0;

		// freeSpinHeader3
		const freeSpinHeader3 = this.add.text(715, 56, "", {});
		freeSpinHeader3.setOrigin(0.5, 0.5);
		freeSpinHeader3.alpha = 0;
		freeSpinHeader3.alphaTopLeft = 0;
		freeSpinHeader3.alphaTopRight = 0;
		freeSpinHeader3.alphaBottomLeft = 0;
		freeSpinHeader3.alphaBottomRight = 0;
		freeSpinHeader3.text = "Free Spin 3 of 10";
		freeSpinHeader3.setStyle({ "color": "#F7EDA1", "fontFamily": "FLANKER_GRIFFO", "fontSize": "35px" });

		// betCoins
		const betCoins = new BetPrefab(this, 300, 660);
		this.add.existing(betCoins);

		// betLines
		const betLines = new BetPrefab(this, 500, 660);
		this.add.existing(betLines);

		// footerPrefab
		const footerPrefab = new FooterPrefab(this, 36, 707);
		this.add.existing(footerPrefab);

		// autoplayBtn (prefab fields)
		autoplayBtn.text = "IDS_BTN_AUTOPLAY";
		autoplayBtn.buttonSprite;
		autoplayBtn.event = "autoplay";

		// paytableBtn (prefab fields)
		paytableBtn.text = "IDS_BTN_PAYTABLE";
		paytableBtn.buttonSprite;
		paytableBtn.event = "paytable";

		// betmaxBtn (prefab fields)
		betmaxBtn.text = "IDS_BTN_BETMAX";
		betmaxBtn.buttonSprite;
		betmaxBtn.event = "betmax";

		// spinBtn (prefab fields)
		spinBtn.text = "IDS_BTN_SPIN";
		spinBtn.buttonSprite = {"key":"menu_texture1_level0","frame":"SB.png"};
		spinBtn.event = "spin";

		// gambleBtn (prefab fields)
		gambleBtn.text = "IDS_BTN_GAMBLE";
		gambleBtn.buttonSprite;
		gambleBtn.event = "gamble";

		// collectBtn (prefab fields)
		collectBtn.text = "IDS_BTN_COLLECT";
		collectBtn.buttonSprite;
		collectBtn.event = "collect";

		// betCoins (prefab fields)
		betCoins.title = "IDS_VP_COINS";

		// betLines (prefab fields)
		betLines.title = "IDS_SLOT_LINES";

		this.t0AB_png = t0AB_png;
		this.t1BB_png_1 = t1BB_png_1;
		this.informationImg = informationImg;
		this.denominationBtn = denominationBtn;
		this.logo1 = logo1;
		this.logo2 = logo2;
		this.logo3 = logo3;
		this.txtCoinsValue = txtCoinsValue;
		this.txtBetValue = txtBetValue;
		this.txtCoinValueText = txtCoinValueText;
		this.txtDenomination = txtDenomination;
		this.autoplayBtn = autoplayBtn;
		this.paytableBtn = paytableBtn;
		this.betmaxBtn = betmaxBtn;
		this.spinBtn = spinBtn;
		this.txtInformation = txtInformation;
		this.gambleBtn = gambleBtn;
		this.collectBtn = collectBtn;
		this.bgAutoplay = bgAutoplay;
		this.txtAutoplay = txtAutoplay;
		this.txtAutoplayValue = txtAutoplayValue;
		this.freeSpinHeader1 = freeSpinHeader1;
		this.freeSpinHeader2 = freeSpinHeader2;
		this.freeSpinHeader3 = freeSpinHeader3;
		this.betCoins = betCoins;
		this.betLines = betLines;
		this.footerPrefab = footerPrefab;

		this.events.emit("scene-awake");
	}

	private t0AB_png!: Phaser.GameObjects.Image;
	private t1BB_png_1!: Phaser.GameObjects.Image;
	private informationImg!: Phaser.GameObjects.Image;
	private denominationBtn!: Phaser.GameObjects.Sprite;
	private logo1!: Phaser.GameObjects.Image;
	private logo2!: Phaser.GameObjects.Image;
	private logo3!: Phaser.GameObjects.Image;
	private txtCoinsValue!: Phaser.GameObjects.Text;
	private txtBetValue!: Phaser.GameObjects.Text;
	private txtCoinValueText!: Phaser.GameObjects.Text;
	private txtDenomination!: Phaser.GameObjects.Text;
	private autoplayBtn!: Button;
	private paytableBtn!: Button;
	private betmaxBtn!: Button;
	private spinBtn!: Button;
	private txtInformation!: Phaser.GameObjects.Text;
	private gambleBtn!: Button;
	private collectBtn!: Button;
	private bgAutoplay!: Phaser.GameObjects.Image;
	private txtAutoplay!: Phaser.GameObjects.Text;
	private txtAutoplayValue!: Phaser.GameObjects.Text;
	private freeSpinHeader1!: Phaser.GameObjects.Image;
	private freeSpinHeader2!: Phaser.GameObjects.Image;
	private freeSpinHeader3!: Phaser.GameObjects.Text;
	private betCoins!: BetPrefab;
	private betLines!: BetPrefab;
	private footerPrefab!: FooterPrefab;

	/* START-USER-CODE */

	// Write your code here
	private toggleVfx!: any;
	private GameState!: VideoSlotGameState;

	init() {
		this.GameState = container.get<VideoSlotGameState>('VideoSlotGameState');
	}

	preload() {
		this.scene.add('MenuScene', container.get<Phaser.Scene>('MenuScene'), true);
		this.scene.add('PaytableScene', container.get<Phaser.Scene>('PaytableScene'), true);
		this.scene.add('AutoplayScene', container.get<Phaser.Scene>('AutoplayScene'), true);
		this.scene.add('GambleScene', container.get<Phaser.Scene>('GambleScene'), true);
		this.scene.add('ScatterScene', container.get<Phaser.Scene>('ScatterScene'), true);
		this.scene.add('PopupScene', container.get<Phaser.Scene>('PopupScene'), true);

		setTimeout(() => {
			this.GameState.isShowingAutoplay.subscribe((val) => {
				if (val) {
					console.log("show Autoplay")
					this.scene.launch("AutoplayScene");
				} else {
					console.log("hide Autoplay")
					this.scene.stop("AutoplayScene");
				}
			});
	
			this.GameState.isShowingMenu.subscribe((val) => {
				if (val) {
					console.log("show Menu")
					this.scene.launch("MenuScene");
				} else {
					console.log("hide Menu")
					this.scene.stop("MenuScene");
				}
			});
	
			this.GameState.isShowingPaytable.subscribe((val) => {
				if (val) {
					console.log("show Paytable")
					this.scene.launch("PaytableScene");
				} else {
					console.log("hide Paytable")
					this.scene.stop("PaytableScene");
				}
			});
	
			this.GameState.isShowingGamble.subscribe((val) => {
				if (val) {
					console.log("show Gamble")
					this.scene.launch("GambleScene");
				} else {
					console.log("hide Gamble")
					this.scene.stop("GambleScene");
				}
			});
	
			this.GameState.isShowingScatter.subscribe((val) => {
				if (val) {
					console.log("show Scatter")
					this.scene.launch("ScatterScene");
				} else {
					console.log("hide Scatter")
					this.scene.stop("ScatterScene");
				}
			});
			
			this.GameState.isIllegalSession.subscribe((val) => {
				if (val) {
					console.log("show Popup")
					this.scene.launch("PopupScene");
				} else {
					console.log("hide Popup")
					this.scene.stop("PopupScene");
				}
			});
	
			this.GameState.isSpinning.subscribe((val) => {
				if (val) {
					console.log("show Spin")
					this.setButtonInteractive(this.spinBtn.btnButton, false);
					this.setButtonInteractive(this.denominationBtn, false);
					this.setButtonInteractive(this.gambleBtn.btnButton, false);
					this.setButtonInteractive(this.collectBtn.btnButton, false);
					this.setButtonInteractive(this.betCoins.btnDecrease, false);
					this.setButtonInteractive(this.betCoins.btnIncrease, false);
					this.setButtonInteractive(this.betLines.btnDecrease, false);
					this.setButtonInteractive(this.betLines.btnIncrease, false);
					this.setButtonInteractive(this.betmaxBtn.btnButton, false);
					this.setButtonInteractive(this.autoplayBtn.btnButton, false);
					this.setButtonInteractive(this.paytableBtn.btnButton, false);
					setTimeout(	() => {
						this.GameState.isSpinning.set(false);
					}, 1000);
				} else {
					console.log("hide Spin")
					this.setButtonInteractive(this.spinBtn.btnButton, true);
					this.setButtonInteractive(this.denominationBtn, true);
					this.setButtonInteractive(this.betmaxBtn.btnButton, true);
					this.setButtonInteractive(this.autoplayBtn.btnButton, true);
					this.setButtonInteractive(this.paytableBtn.btnButton, true);
					
					if (this.GameState.betCoins.get() <= 1) {
						this.setButtonInteractive(this.betCoins.btnDecrease, false);
					} else {
						this.setButtonInteractive(this.betCoins.btnDecrease, true);
					}
					if (this.GameState.betCoins.get() >= 5) {
						this.setButtonInteractive(this.betCoins.btnIncrease, false);
					} else {
						this.setButtonInteractive(this.betCoins.btnIncrease, true);
					}
					if (this.GameState.betLines.get() <= 1) {
						this.setButtonInteractive(this.betLines.btnDecrease, false);
					} else {
						this.setButtonInteractive(this.betLines.btnDecrease, true);
					}
					if (this.GameState.betLines.get() >= 10) {
						this.setButtonInteractive(this.betLines.btnIncrease, false);
					} else {
						this.setButtonInteractive(this.betLines.btnIncrease, true);
					} 
				}
			});

			this.GameState.isReward.subscribe((val) => {
				if (val) {
					console.log("show Reward")
					this.gambleBtn.setVisible(true);
					this.collectBtn.setVisible(true);
					this.betmaxBtn.setVisible(false);
					this.autoplayBtn.setVisible(false);
				} else {
					console.log("hide Reward")
					this.gambleBtn.setVisible(false);
					this.collectBtn.setVisible(false);
					this.betmaxBtn.setVisible(true);
					this.autoplayBtn.setVisible(true);
				}
			});

			// Autoplay state
			this.GameState.isAutoPlayRunning.subscribe((isAutoPlayRunning) => {
				if (isAutoPlayRunning) {
					this.spinBtn.setVisible(false);
					this.autoplayBtn.txtButton.setText(this.cache.json.get('language').texts['IDS_BTN_STOP'])
					this.bgAutoplay.setVisible(true);
					this.txtAutoplay.setVisible(true);
					this.txtAutoplayValue.setVisible(true);
				} else {
					this.autoplayBtn.setVisible(true);
					this.autoplayBtn.txtButton.setText(this.cache.json.get('language').texts['IDS_BTN_AUTOPLAY'])
					this.bgAutoplay.setVisible(false);
					this.txtAutoplay.setVisible(false);
					this.txtAutoplayValue.setVisible(false);
				}
			});
			this.GameState.activeAutoplay.subscribe((val) => {
				this.txtAutoplayValue.setText(val.toString());
			});
		}, 0);
	}

	create() {

		this.editorCreate();
		this.setupUI();

	}

	private setupUI() {
		console.log("Language data:", this.cache.json.get('language'));

		setTimeout(() => {
			const balance = this.GameState.balance;
			const betCoins = this.GameState.betCoins;
			const betLines = this.GameState.betLines;
			const informationText = this.GameState.informationText;
			const totalWinAmount = this.GameState.totalWinAmount;
			const coinValueList = this.GameState.coinValueList;
			const coinValue = this.GameState.coinValue;
			const coinValueCurrency = this.GameState.coinValueCurrency;

			// Initialize UI with current state values
			this.txtCoinsValue.setText(`${this.cache.json.get('language').texts['IDS_VP_COINS']}: ${balance.get() * coinValue.get()}`);
			this.txtBetValue.setText(`${this.cache.json.get('language').texts['IDS_MENU_BET_VSLOT']}: ${betCoins.get() * betLines.get() }`);
			this.txtInformation.setText(informationText.get());
			this.txtDenomination.setText(`${coinValueCurrency.get()} ${coinValue.get().toFixed(2)}`);
			this.footerPrefab.txtBalanceValue.setText(`${this.cache.json.get('language').texts['IDS_BALANCE_CAPTION']} ${coinValueCurrency.get()} ${balance.get().toString()}`);
			this.footerPrefab.txtBalanceBetValue.setText(`${this.cache.json.get('language').texts['IDS_BET_CAPTION']} ${coinValueCurrency.get()} ${(coinValue.get() * betCoins.get() * betLines.get()).toFixed(2)}`);
			this.footerPrefab.txtWinValue.setText(`${this.cache.json.get('language').texts['IDS_WIN_CAPTION']} ${coinValueCurrency.get()} ${totalWinAmount.get().toFixed(2)}`);
			this.betCoins.txtBetValue.setText(betCoins.get().toString());
			this.betLines.txtBetValue.setText(betLines.get().toString());
			this.txtAutoplay.setText(this.cache.json.get('language').texts['IDS_AP_RUNNING']);

			// Set button states based on initial values
			if (betCoins.get() <= 1) {
				this.betCoins.btnDecrease.disableInteractive();
				this.betCoins.btnDecrease.setTint(0x666666);
			}
			if (betCoins.get() >= 5) {
				this.betCoins.btnIncrease.disableInteractive();
				this.betCoins.btnIncrease.setTint(0x666666);
			}
			if (betLines.get() <= 1) {
				this.betLines.btnDecrease.disableInteractive();
				this.betLines.btnDecrease.setTint(0x666666);
			}
			if (betLines.get() >= 10) {
				this.betLines.btnIncrease.disableInteractive();
				this.betLines.btnIncrease.setTint(0x666666);
			}

			// Subscribe to state changes to update UI reactively
			balance.subscribe((val) => {
				let valueMoney = ((val / (this.GameState.coinValue.get() / 100) / 100).toFixed(0));
				this.txtCoinsValue.setText(`${this.cache.json.get('language').texts['IDS_VP_COINS']}: ${valueMoney}`);
				this.footerPrefab.txtBalanceValue.setText(`${this.cache.json.get('language').texts['IDS_BALANCE_CAPTION']} ${coinValueCurrency.get()} ${(val / 100).toString()}`);
			});

			betCoins.subscribe((val) => {
				this.txtBetValue.setText(`${this.cache.json.get('language').texts['IDS_MENU_BET_VSLOT']}: ${betCoins.get() * betLines.get() }`);
				this.betCoins.txtBetValue.setText(val.toString());
				this.footerPrefab.txtBalanceBetValue.setText(`${this.cache.json.get('language').texts['IDS_BET_CAPTION']} ${coinValueCurrency.get()} ${(val * (coinValue.get() / 100) * betLines.get()).toFixed(2)}`);
				this.updateBetButtons(val, this.betCoins, 1, 5);
			});

			betLines.subscribe((val) => {
				this.txtBetValue.setText(`${this.cache.json.get('language').texts['IDS_MENU_BET_VSLOT']}: ${betCoins.get() * betLines.get() }`);
				this.betLines.txtBetValue.setText(val.toString());
				this.footerPrefab.txtBalanceBetValue.setText(`${this.cache.json.get('language').texts['IDS_BET_CAPTION']} ${coinValueCurrency.get()} ${(val * betCoins.get() * (coinValue.get() / 100)).toFixed(2)}`);
				this.updateBetButtons(val, this.betLines, 1, 10);
			});

			informationText.subscribe((val) => {
				this.txtInformation.setText(val);
			});

			coinValue.subscribe((val) => {
				let valueMoney = ((this.GameState.balance.get() / (val / 100) / 100).toFixed(0));
				this.txtCoinsValue.setText(`${this.cache.json.get('language').texts['IDS_VP_COINS']}: ${valueMoney}`);
				this.txtDenomination.setText(`${coinValueCurrency.get()} ${(val / 100).toFixed(2)}`);
				this.footerPrefab.txtBalanceBetValue.setText(`${this.cache.json.get('language').texts['IDS_BET_CAPTION']} ${coinValueCurrency.get()} ${((val / 100) * betCoins.get() * betLines.get()).toFixed(2)}`);
			});

			totalWinAmount.subscribe((val) => {
				this.footerPrefab.txtWinValue.setText(`${this.cache.json.get('language').texts['IDS_WIN_CAPTION']} ${coinValueCurrency.get()} ${val.toFixed(2)}`);
			});
		}, 0);

		// Denomination (coin value)
		this.denominationBtn.on('pointerdown', () => {
			const currentIndex = this.GameState.coinValueList.indexOf(this.GameState.coinValue.get());
			const nextIndex = (currentIndex + 1) % this.GameState.coinValueList.length;
			this.GameState.coinValue.set(this.GameState.coinValueList[nextIndex]);
			this.addButtonTween(this, this.denominationBtn, [ this.txtDenomination, this.txtCoinValueText ] );
		});

		// Paytable
		this.paytableBtn.btnButton.on('pointerdown', () => {
			const current = this.GameState.isShowingPaytable.get();
      		this.GameState.isShowingPaytable.set(!current);
		});


		// Bet Coins
		this.betCoins.btnDecrease.on('pointerdown', () => {
			let currentBet = this.GameState.betCoins.get();
			if (currentBet > 1) {
				currentBet -= 1;
				this.GameState.betCoins.set(currentBet);
			}
		});

		this.betCoins.btnIncrease.on('pointerdown', () => {
			let currentBet = this.GameState.betCoins.get();
			currentBet += 1;
			this.GameState.betCoins.set(currentBet);
		});

		// Bet Lines
		this.betLines.btnDecrease.on('pointerdown', () => {
			let currentBet = this.GameState.betLines.get();
			if (currentBet > 1) {
				currentBet -= 1;
				this.GameState.betLines.set(currentBet);
			}
		});

		this.betLines.btnIncrease.on('pointerdown', () => {
			let currentBet = this.GameState.betLines.get();
			currentBet += 1;
			this.GameState.betLines.set(currentBet);
		});

		// Bet Max
		this.betmaxBtn.btnButton.on('pointerdown', () => {
			this.GameState.betLines.set(10);
			this.GameState.betCoins.set(5);
		});

		// Spin
		this.spinBtn.btnButton.on('pointerdown', () => {
			this.GameState.startSpin();
		});

		// Autoplay
		this.autoplayBtn.btnButton.on('pointerdown', () => {
			if(this.GameState.isShowingAutoplay.get()) {
				this.GameState.isShowingAutoplay.set(false);
			}
			const current = this.GameState.isShowingAutoplay.get();
	  		this.GameState.isShowingAutoplay.set(!current);
		});

		// Gamble
		this.gambleBtn.btnButton.on('pointerdown', () => {
			this.GameState.isShowingGamble.set(true);
		});

		// Collect
		this.collectBtn.btnButton.on('pointerdown', () => {
			this.GameState.playerPick.set(0);
			this.GameState.isShowingGamble.set(false);
		});

		// Footer menu
		this.footerPrefab.btnMenu.on('pointerdown', () => {
			const current = this.GameState.isShowingMenu.get();
      		this.GameState.isShowingMenu.set(!current);
		});
	}

	updateBetButtons(currentBet: number, controls: { btnIncrease: Phaser.GameObjects.Sprite; btnDecrease: Phaser.GameObjects.Sprite }, minBet = 1, maxBet = 5) {
		// Decrease button
		if (currentBet <= minBet) {
			controls.btnDecrease.disableInteractive();
			controls.btnDecrease.setTint(0x666666);
		} else {
			controls.btnDecrease.setInteractive();
			controls.btnDecrease.clearTint();
		}

		// Increase button
		if (currentBet >= maxBet) {
			controls.btnIncrease.disableInteractive();
			controls.btnIncrease.setTint(0x666666);
		} else {
			controls.btnIncrease.setInteractive();
			controls.btnIncrease.clearTint();
		}
	}

	addButtonTween(scene: Phaser.Scene, sprite: Phaser.GameObjects.Sprite, text: Phaser.GameObjects.Text[] = []) {
		const targets = [sprite, ...text] as Phaser.GameObjects.GameObject[];

		const playTween = (scale: number) => {
			scene.tweens.add({
				targets,
				scale : (target: Phaser.GameObjects.GameObject) =>
      				(target as any).scale + scale,
				duration: 100,
				ease: "Power2"
			});
		};

		sprite.on("pointerdown", () => playTween(-0.1));
		["pointerup"].forEach(evt => sprite.on(evt, () => playTween(0.1)));
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