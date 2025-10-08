
// You can write more code here

import Reels from "@games/videoslot/components/Reels";
import Level from "./Level";
import { container } from "@gl/di/container";
import { VideoSlotGameState } from "@games/videoslot/VideoSlotGameState";

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class FeaturesScene extends Phaser.Scene {

	constructor() {
		super("FeaturesScene");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// t0AB_png
		const t0AB_png = this.add.image(640, 450, "background_texture0_level0", "AB.png");

		// btnContinue
		const btnContinue = this.add.image(640, 635, "feature_preview_texture0_level0", "CB.png");
		btnContinue.setInteractive(new Phaser.Geom.Rectangle(0, 0, 305, 95), Phaser.Geom.Rectangle.Contains);
		btnContinue.scaleX = 0.9;
		btnContinue.scaleY = 0.9;

		// bB_png
		const bB_png = this.add.image(640, 355, "feature_preview_texture0_level0", "BB.png");
		bB_png.scaleX = 0.9;
		bB_png.scaleY = 0.9;

		// txtContinue
		const txtContinue = this.add.text(640, 635, "", {});
		txtContinue.scaleX = 0.5;
		txtContinue.scaleY = 0.5;
		txtContinue.setOrigin(0.5, 0.5);
		txtContinue.text = "IDS_BTN_CONTINUE";
		txtContinue.setStyle({ "align": "center", "fontFamily": "FLANKER_GRIFFO", "fontSize": "64px" });

		// txtHeader
		const txtHeader = this.add.text(445, 200, "", {});
		txtHeader.scaleX = 0.5;
		txtHeader.scaleY = 0.5;
		txtHeader.setOrigin(0.5, 0.5);
		txtHeader.text = "IDS_FREESPINS_HEADER";
		txtHeader.setStyle({ "align": "center", "fontFamily": "FLANKER_GRIFFO", "fontSize": "86px", "stroke": "#000000", "strokeThickness": 3, "shadow.stroke": true });

		// bgBook1
		const bgBook1 = this.add.image(290, 310, "features_texture0_level0", "GB.png");
		bgBook1.scaleX = 0.7;
		bgBook1.scaleY = 0.7;

		// bgBook2
		const bgBook2 = this.add.image(445, 310, "features_texture0_level0", "GB.png");
		bgBook2.scaleX = 0.7;
		bgBook2.scaleY = 0.7;

		// bgBook3
		const bgBook3 = this.add.image(605, 310, "features_texture0_level0", "GB.png");
		bgBook3.scaleX = 0.7;
		bgBook3.scaleY = 0.7;

		// book1
		const book1 = this.add.image(280, 303, "features_texture0_level0", "IB.png");
		book1.scaleX = 0.65;
		book1.scaleY = 0.65;

		// book2
		const book2 = this.add.image(445, 303, "features_texture0_level0", "IB.png");
		book2.scaleX = 0.65;
		book2.scaleY = 0.65;

		// book3
		const book3 = this.add.image(605, 303, "features_texture0_level0", "IB.png");
		book3.scaleX = 0.65;
		book3.scaleY = 0.65;

		// txtMoreFreespins
		const txtMoreFreespins = this.add.text(447, 445, "", {});
		txtMoreFreespins.scaleX = 0.5;
		txtMoreFreespins.scaleY = 0.5;
		txtMoreFreespins.setOrigin(0.5, 0.5);
		txtMoreFreespins.text = "IDS_BD_MOREFREESPINS";
		txtMoreFreespins.setStyle({ "align": "center", "color": "#5B2E18", "fontFamily": "FLANKER_GRIFFO", "fontSize": "42px", "stroke": "#000000" });
		txtMoreFreespins.setWordWrapWidth(500, true);

		// txtExpanding
		const txtExpanding = this.add.text(845, 456, "", {});
		txtExpanding.scaleX = 0.5;
		txtExpanding.scaleY = 0.5;
		txtExpanding.setOrigin(0.5, 0.5);
		txtExpanding.text = "IDS_BD_EXPANDINGSYMBOL_PROMO";
		txtExpanding.setStyle({ "align": "center", "color": "#5B2E18", "fontFamily": "FLANKER_GRIFFO", "fontSize": "42px", "stroke": "#000000" });
		txtExpanding.setWordWrapWidth(500, true);

		// btnCheckbox
		const btnCheckbox = this.add.sprite(855, 635, "feature_preview_texture0_level0", "DB.png");
		btnCheckbox.setInteractive(new Phaser.Geom.Rectangle(0, 0, 27, 27), Phaser.Geom.Rectangle.Contains);

		// txtCheckbox
		const txtCheckbox = this.add.text(890, 623, "", {});
		txtCheckbox.scaleX = 0.5;
		txtCheckbox.scaleY = 0.5;
		txtCheckbox.text = "IDS_DONTSHOWAGAIN";
		txtCheckbox.setStyle({ "color": "#F7EDA1", "fontFamily": "FLANKER_GRIFFO", "fontSize": "42px" });

		// btnCheck
		const btnCheck = this.add.sprite(855, 635, "feature_preview_texture0_level0", "EB.png");
		btnCheck.visible = false;

		// a_12_png_1
		const a_12_png_1 = this.add.sprite(480, 59, "logo_texture0_level0", "A-12.png");
		a_12_png_1.flipX = true;
		a_12_png_1.play("logo-ribbon-animation");

		// a_12_png
		const a_12_png = this.add.sprite(780, 59, "logo_texture0_level0", "A-12.png");
		a_12_png.play("logo-ribbon-animation");

		// cB_png
		this.add.image(769, 57, "logo_texture0_level0", "CB.png");

		// logo3
		const logo3 = this.add.image(686, 57, "logo_texture0_level0", "BB.png");

		// logo1
		const logo1 = this.add.image(515, 57, "logo_texture0_level0", "AB.png");

		// logo2
		const logo2 = this.add.image(634, 55, "logo_texture0_level0", "DB.png");
		logo2.scaleX = 1.5;
		logo2.scaleY = 1.5;

		// frameFeatures_15
		this.add.image(286, 310, "features_texture0_level0", "EB.png");

		// frameFeatures_16
		this.add.image(445, 310, "features_texture0_level0", "EB.png");

		// frameFeatures_17
		this.add.image(603, 310, "features_texture0_level0", "EB.png");

		// fB_png
		this.add.image(794, 310, "feature_preview_texture0_level0", "FB.png");

		// bgBook
		const bgBook = this.add.image(969, 310, "features_texture0_level0", "BB.png");
		bgBook.scaleX = 0.7;
		bgBook.scaleY = 0.7;

		// book
		const book = this.add.image(969, 303, "features_texture0_level0", "JB.png");
		book.scaleX = 0.65;
		book.scaleY = 0.65;

		// frameFeatures
		this.add.image(967, 310, "features_texture0_level0", "EB.png");

		// lists
		const symbolsList: Array<any> = [];

		this.t0AB_png = t0AB_png;
		this.btnContinue = btnContinue;
		this.txtContinue = txtContinue;
		this.txtHeader = txtHeader;
		this.bgBook1 = bgBook1;
		this.bgBook2 = bgBook2;
		this.bgBook3 = bgBook3;
		this.book1 = book1;
		this.book2 = book2;
		this.book3 = book3;
		this.txtMoreFreespins = txtMoreFreespins;
		this.txtExpanding = txtExpanding;
		this.btnCheckbox = btnCheckbox;
		this.txtCheckbox = txtCheckbox;
		this.btnCheck = btnCheck;
		this.logo3 = logo3;
		this.logo1 = logo1;
		this.logo2 = logo2;
		this.bgBook = bgBook;
		this.book = book;
		this.symbolsList = symbolsList;

		this.events.emit("scene-awake");
	}

	private t0AB_png!: Phaser.GameObjects.Image;
	private btnContinue!: Phaser.GameObjects.Image;
	private txtContinue!: Phaser.GameObjects.Text;
	private txtHeader!: Phaser.GameObjects.Text;
	private bgBook1!: Phaser.GameObjects.Image;
	private bgBook2!: Phaser.GameObjects.Image;
	private bgBook3!: Phaser.GameObjects.Image;
	private book1!: Phaser.GameObjects.Image;
	private book2!: Phaser.GameObjects.Image;
	private book3!: Phaser.GameObjects.Image;
	private txtMoreFreespins!: Phaser.GameObjects.Text;
	private txtExpanding!: Phaser.GameObjects.Text;
	private btnCheckbox!: Phaser.GameObjects.Sprite;
	private txtCheckbox!: Phaser.GameObjects.Text;
	private btnCheck!: Phaser.GameObjects.Sprite;
	private logo3!: Phaser.GameObjects.Image;
	private logo1!: Phaser.GameObjects.Image;
	private logo2!: Phaser.GameObjects.Image;
	private bgBook!: Phaser.GameObjects.Image;
	private book!: Phaser.GameObjects.Image;
	private symbolsList!: Array<any>;

	/* START-USER-CODE */

	// Write your code here
	private GameState!: VideoSlotGameState;
	private dontShowAgain: boolean = false;

	init() {
		this.GameState = container.get<VideoSlotGameState>('VideoSlotGameState');
	}

	create() {

		this.scene.bringToTop();

		this.editorCreate();
		const reels = new Reels();

		this.txtHeader.setText(this.cache.json.get('language').texts[this.txtHeader.text]);
		this.txtMoreFreespins.setText(this.cache.json.get('language').texts[this.txtMoreFreespins.text]);
		this.txtExpanding.setText(this.cache.json.get('language').texts[this.txtExpanding.text]);
		this.txtContinue.setText(this.cache.json.get('language').texts[this.txtContinue.text]);
		this.txtCheckbox.setText(this.cache.json.get('language').texts[this.txtCheckbox.text]);

        const gradientHeader = this.txtHeader.context.createLinearGradient(0, 0, 0, this.txtHeader.height);
        gradientHeader.addColorStop(0, '#000');
        gradientHeader.addColorStop(.5, '#88421fff');
        gradientHeader.addColorStop(.5, '#88421fff');
        gradientHeader.addColorStop(1, '#000');
        this.txtHeader.setFill(gradientHeader)
		this.book1.setDepth(2);
		this.book2.setDepth(2);
		this.book3.setDepth(2);

		const playBooks = () => {
			this.tweens.add({
				targets: [this.book1, this.book2, this.book3],
				scale: 0.8,
				yoyo: true,
				duration: 200,
				repeat: 3,
				onComplete: () => {
				// this.time.delayedCall(7000, playBooks); // call again after 1s
				},
				onRepeat: function() {
					this.targets.forEach((book: Phaser.GameObjects.Image) => {
						const spark = book.scene.add
							.image(
							book.x,
							book.y,
							'skin_texture4_level0',
							'EG.png'
							)
							.setScale(2)
							.setDepth(1);

							book.scene.tweens.add({
								targets: spark,
								duration: 200,
								repeat: 0,
								alpha: { from: 0, to: .5, start: 0 },
								yoyo: 1,
							});
					})
				},
				onStart: function() {
					this.targets.forEach((book: Phaser.GameObjects.Image) => {
						const spark = book.scene.add
							.image(
							book.x,
							book.y,
							'skin_texture4_level0',
							'EG.png'
							)
							.setScale(2)
							.setDepth(1);

							book.scene.tweens.add({
								targets: spark,
								duration: 200,
								repeat: 0,
								alpha: { from: 0, to: .5, start: 0 },
								yoyo: 1,
							});
					})
				}
			});
		};

		playBooks();

		this.feature_animation.on('animationcomplete', () => {
			let index = this.symbolsList.length - 1; // start from the last symbol

			for (let i = 0; i < this.symbolsList.length / 4; i++) {
				setTimeout(() => {
					for (let j = 0; j < 4; j++) {
						if (index >= 0) {
							this.symbolsList[index].setVisible(true);
							if(j === 0) {
								const spark = this.add.image(this.symbolsList[index].x, this.symbolsList[index].y, 'skin_texture4_level0', 'EG.png').setScale(2).setDepth(1);
								this.tweens.add({
									targets: spark,
									duration: 200,
									repeat: 0,
									alpha: { from: 0, to: 1, start: 0 },
									yoyo: 1,
								});
							}
							index--;
							if(index === -1){
								setTimeout(() => {
									this.symbolsList.forEach((symbol: any) => {
										symbol.setVisible(false);
									})
									playBooks();
									if(this.feature_animation){
										this.feature_animation.play('feature-animation');
									}
								}, 2000);
							}
						}
					}
				}, i * 250); // stagger: 0s, 1s, 2s...
			}
		});

        const gradientContinue = this.txtContinue.context.createLinearGradient(0, 0, 0, this.txtContinue.height);
        gradientContinue.addColorStop(0, '#DDA339');
        gradientContinue.addColorStop(.5, '#FFFFFF');
        gradientContinue.addColorStop(.5, '#DDA339');
        gradientContinue.addColorStop(1, '#FFFFFF');
        this.txtContinue.setFill(gradientContinue)

		this.btnCheckbox.on('pointerdown', () => {
			this.dontShowAgain = !this.dontShowAgain;
			this.btnCheck.setVisible(this.dontShowAgain ? true : false);
		})

		this.btnCheck.on('pointerdown', () => {
			this.dontShowAgain = !this.dontShowAgain;
			this.btnCheck.setVisible(this.dontShowAgain ? true : false);
		})

		this.btnContinue.on('pointerdown', () => {
			this.tweens.add({
				targets: this.btnContinue,
				scale: 0.8,
				duration: 100,
			});
		});

		this.btnContinue.on('pointerup', () => {
			this.GameState.isShowingFeatures.set(false)
			// reels.initialize();
			this.tweens.add({
				targets: this.btnContinue,
				scale: 0.9,
				duration: 100,
			});
		})
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
