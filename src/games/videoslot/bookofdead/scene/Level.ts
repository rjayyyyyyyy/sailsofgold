// You can write more code here

/* START OF COMPILED CODE */

import Button from "../../../../shared/interfaces/components/Button";
/* START-USER-IMPORTS */
import { container } from "@gl/di/container";
import { VideoSlotGameState } from "@games/videoslot/VideoSlotGameState";
/* END-USER-IMPORTS */

export default class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// this.audio = container.get<IAudioService>(TYPES.AudioService)
		// Write your code here.
		this.videoSlotGameState = container.get<VideoSlotGameState>("VideoSlotGameState");
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

		// aB_png
		const aB_png = this.add.sprite(650, 705, "statusbar_texture0_level0", "AB.png");

		// t0AB_png_1
		const t0AB_png_1 = this.add.image(365, 659, "menu_texture0_level0", "CB.png");

		// t0AB_png_2
		const t0AB_png_2 = this.add.image(600, 659, "menu_texture0_level0", "CB.png");

		// nextLinesBtn
		const nextLinesBtn = this.add.sprite(675, 659, "menu_texture1_level0", "TB.png");
		nextLinesBtn.setInteractive(new Phaser.Geom.Rectangle(0, 0, 54, 64), Phaser.Geom.Rectangle.Contains);
		nextLinesBtn.tintTopLeft = 8947848;
		nextLinesBtn.tintTopRight = 8947848;
		nextLinesBtn.tintBottomLeft = 8947848;
		nextLinesBtn.tintBottomRight = 8947848;

		// nextCoinsBtn
		const nextCoinsBtn = this.add.sprite(440, 659, "menu_texture1_level0", "TB.png");
		nextCoinsBtn.setInteractive(new Phaser.Geom.Rectangle(0, 0, 54, 64), Phaser.Geom.Rectangle.Contains);

		// prevCoinsBtn
		const prevCoinsBtn = this.add.sprite(290, 659, "menu_texture1_level0", "VB.png");
		prevCoinsBtn.setInteractive(new Phaser.Geom.Rectangle(0, 0, 54, 64), Phaser.Geom.Rectangle.Contains);
		prevCoinsBtn.tintTopLeft = 8947848;
		prevCoinsBtn.tintTopRight = 8947848;
		prevCoinsBtn.tintBottomLeft = 8947848;
		prevCoinsBtn.tintBottomRight = 8947848;

		// prevLinesBtn
		const prevLinesBtn = this.add.sprite(525, 659, "menu_texture1_level0", "VB.png");
		prevLinesBtn.setInteractive(new Phaser.Geom.Rectangle(0, 0, 54, 64), Phaser.Geom.Rectangle.Contains);

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

		// txtCoinsText
		const txtCoinsText = this.add.text(365, 648, "", {});
		txtCoinsText.setOrigin(0.5, 0.5);
		txtCoinsText.text = "COINS";
		txtCoinsText.setStyle({ "color": "#F7EDA1", "fontFamily": "FLANKER_GRIFFO" });

		// txtLinesText
		const txtLinesText = this.add.text(600, 648, "", {});
		txtLinesText.setOrigin(0.5, 0.5);
		txtLinesText.text = "LINES";
		txtLinesText.setStyle({ "color": "#F7EDA1", "fontFamily": "FLANKER_GRIFFO" });

		// txtCoinValueText
		const txtCoinValueText = this.add.text(150, 634, "", {});
		txtCoinValueText.setOrigin(0.5, 0.5);
		txtCoinValueText.text = "COIN VALUE";
		txtCoinValueText.setStyle({ "color": "#444444", "fontFamily": "FLANKER_GRIFFO", "fontSize": "14px" });

		// txtDenomination
		const txtDenomination = this.add.text(150, 660, "", {});
		txtDenomination.scaleX = 0.8;
		txtDenomination.setOrigin(0.5, 0.5);
		txtDenomination.text = "CNY 2.00";
		txtDenomination.setStyle({ "color": "#5a1500", "fontFamily": "FLANKER_GRIFFO", "fontSize": "30px" });

		// txtCoinsBet
		const txtCoinsBet = this.add.text(365, 670, "", {});
		txtCoinsBet.setOrigin(0.5, 0.5);
		txtCoinsBet.text = "1";
		txtCoinsBet.setStyle({ "color": "#F7EDA1", "fontFamily": "FLANKER_GRIFFO", "fontSize": "26px" });

		// txtLinesBet
		const txtLinesBet = this.add.text(600, 670, "", {});
		txtLinesBet.setOrigin(0.5, 0.5);
		txtLinesBet.text = "1";
		txtLinesBet.setStyle({ "color": "#F7EDA1", "fontFamily": "FLANKER_GRIFFO", "fontSize": "26px" });

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

		// menuBtn
		const menuBtn = this.add.image(30, 705, "statusbar_texture0_level0", "KB.png");
		menuBtn.setInteractive(new Phaser.Geom.Rectangle(0, 0, 25, 20), Phaser.Geom.Rectangle.Contains);

		// soundBtn
		const soundBtn = this.add.sprite(80, 705, "statusbar_texture0_level0", "IB.png");
		soundBtn.setInteractive(new Phaser.Geom.Rectangle(0, 0, 30, 30), Phaser.Geom.Rectangle.Contains);

		// fastplayBtn
		const fastplayBtn = this.add.sprite(120, 705, "statusbar_texture0_level0", "GB.png");
		fastplayBtn.setInteractive(new Phaser.Geom.Rectangle(0, 0, 15, 30), Phaser.Geom.Rectangle.Contains);

		// helpBtn
		const helpBtn = this.add.sprite(160, 705, "statusbar_texture0_level0", "DB.png");
		helpBtn.setInteractive(new Phaser.Geom.Rectangle(0, 0, 10, 20), Phaser.Geom.Rectangle.Contains);

		// historyBtn
		const historyBtn = this.add.sprite(200, 705, "statusbar_texture0_level0", "FB.png");
		historyBtn.setInteractive(new Phaser.Geom.Rectangle(0, 0, 25, 20), Phaser.Geom.Rectangle.Contains);

		// txtBalanceValue
		const txtBalanceValue = this.add.text(493, 705, "", {});
		txtBalanceValue.setOrigin(0, 0.5);
		txtBalanceValue.text = "Balance: CNY 1100000.00";
		txtBalanceValue.setStyle({ "color": "#aaaaaa", "fontFamily": "ROBOTO_CONDENSED_REGULAR" });

		// txtBalanceBetValue
		const txtBalanceBetValue = this.add.text(745, 705, "", {});
		txtBalanceBetValue.setOrigin(0, 0.5);
		txtBalanceBetValue.text = "Bet: CNY 20.00";
		txtBalanceBetValue.setStyle({ "color": "#aaaaaa", "fontFamily": "ROBOTO_CONDENSED_REGULAR" });

		// txtWinValue
		const txtWinValue = this.add.text(1005, 705, "", {});
		txtWinValue.setOrigin(0, 0.5);
		txtWinValue.text = "Win: ";
		txtWinValue.setStyle({ "color": "#aaaaaa", "fontFamily": "ROBOTO_CONDENSED_REGULAR" });

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

		this.t0AB_png = t0AB_png;
		this.t1BB_png_1 = t1BB_png_1;
		this.informationImg = informationImg;
		this.denominationBtn = denominationBtn;
		this.aB_png = aB_png;
		this.t0AB_png_1 = t0AB_png_1;
		this.t0AB_png_2 = t0AB_png_2;
		this.nextLinesBtn = nextLinesBtn;
		this.nextCoinsBtn = nextCoinsBtn;
		this.prevCoinsBtn = prevCoinsBtn;
		this.prevLinesBtn = prevLinesBtn;
		this.logo1 = logo1;
		this.logo2 = logo2;
		this.logo3 = logo3;
		this.txtCoinsValue = txtCoinsValue;
		this.txtBetValue = txtBetValue;
		this.txtCoinsText = txtCoinsText;
		this.txtLinesText = txtLinesText;
		this.txtCoinValueText = txtCoinValueText;
		this.txtDenomination = txtDenomination;
		this.txtCoinsBet = txtCoinsBet;
		this.txtLinesBet = txtLinesBet;
		this.autoplayBtn = autoplayBtn;
		this.paytableBtn = paytableBtn;
		this.betmaxBtn = betmaxBtn;
		this.spinBtn = spinBtn;
		this.txtInformation = txtInformation;
		this.menuBtn = menuBtn;
		this.soundBtn = soundBtn;
		this.fastplayBtn = fastplayBtn;
		this.helpBtn = helpBtn;
		this.historyBtn = historyBtn;
		this.txtBalanceValue = txtBalanceValue;
		this.txtBalanceBetValue = txtBalanceBetValue;
		this.txtWinValue = txtWinValue;
		this.gambleBtn = gambleBtn;
		this.collectBtn = collectBtn;
		this.bgAutoplay = bgAutoplay;
		this.txtAutoplay = txtAutoplay;
		this.txtAutoplayValue = txtAutoplayValue;
		this.freeSpinHeader1 = freeSpinHeader1;
		this.freeSpinHeader2 = freeSpinHeader2;
		this.freeSpinHeader3 = freeSpinHeader3;

		this.events.emit("scene-awake");
	}

	private t0AB_png!: Phaser.GameObjects.Image;
	private t1BB_png_1!: Phaser.GameObjects.Image;
	private informationImg!: Phaser.GameObjects.Image;
	private denominationBtn!: Phaser.GameObjects.Sprite;
	private aB_png!: Phaser.GameObjects.Sprite;
	private t0AB_png_1!: Phaser.GameObjects.Image;
	private t0AB_png_2!: Phaser.GameObjects.Image;
	private nextLinesBtn!: Phaser.GameObjects.Sprite;
	private nextCoinsBtn!: Phaser.GameObjects.Sprite;
	private prevCoinsBtn!: Phaser.GameObjects.Sprite;
	private prevLinesBtn!: Phaser.GameObjects.Sprite;
	private logo1!: Phaser.GameObjects.Image;
	private logo2!: Phaser.GameObjects.Image;
	private logo3!: Phaser.GameObjects.Image;
	private txtCoinsValue!: Phaser.GameObjects.Text;
	private txtBetValue!: Phaser.GameObjects.Text;
	private txtCoinsText!: Phaser.GameObjects.Text;
	private txtLinesText!: Phaser.GameObjects.Text;
	private txtCoinValueText!: Phaser.GameObjects.Text;
	private txtDenomination!: Phaser.GameObjects.Text;
	private txtCoinsBet!: Phaser.GameObjects.Text;
	private txtLinesBet!: Phaser.GameObjects.Text;
	private autoplayBtn!: Button;
	private paytableBtn!: Button;
	private betmaxBtn!: Button;
	private spinBtn!: Button;
	private txtInformation!: Phaser.GameObjects.Text;
	private menuBtn!: Phaser.GameObjects.Image;
	private soundBtn!: Phaser.GameObjects.Sprite;
	private fastplayBtn!: Phaser.GameObjects.Sprite;
	private helpBtn!: Phaser.GameObjects.Sprite;
	private historyBtn!: Phaser.GameObjects.Sprite;
	private txtBalanceValue!: Phaser.GameObjects.Text;
	private txtBalanceBetValue!: Phaser.GameObjects.Text;
	private txtWinValue!: Phaser.GameObjects.Text;
	private gambleBtn!: Button;
	private collectBtn!: Button;
	private bgAutoplay!: Phaser.GameObjects.Image;
	private txtAutoplay!: Phaser.GameObjects.Text;
	private txtAutoplayValue!: Phaser.GameObjects.Text;
	private freeSpinHeader1!: Phaser.GameObjects.Image;
	private freeSpinHeader2!: Phaser.GameObjects.Image;
	private freeSpinHeader3!: Phaser.GameObjects.Text;

	/* START-USER-CODE */

	// Write your code here
	private toggleVfx!: any;
	private videoSlotGameState: VideoSlotGameState;

	create() {
		this.editorCreate();
		this.setupUI();
		this.videoSlotGameState.coins.subscribe((value) => {
			console.log("Coins updated:", value);
			this.txtCoinsValue.text = `COINS: ${value.toFixed(2)}`;
		});
	}

	private setupUI() {
		console.log("Language data:", this.cache.json.get('language'));
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
