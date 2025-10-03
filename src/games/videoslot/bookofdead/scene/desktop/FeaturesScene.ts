
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

		// logo1
		const logo1 = this.add.image(640, 48, "logo_texture0_level0", "AB.png");

		// logo2
		const logo2 = this.add.image(640, 66, "logo_texture0_level0", "DB.png");

		// logo3
		const logo3 = this.add.image(640, 23, "logo_texture0_level0", "BB.png");

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
		const bgBook1 = this.add.image(330, 310, "features_texture0_level0", "GB.png");
		bgBook1.scaleX = 0.7;
		bgBook1.scaleY = 0.7;

		// bgBook2
		const bgBook2 = this.add.image(440, 310, "features_texture0_level0", "GB.png");
		bgBook2.scaleX = 0.7;
		bgBook2.scaleY = 0.7;

		// bgBook3
		const bgBook3 = this.add.image(550, 310, "features_texture0_level0", "GB.png");
		bgBook3.scaleX = 0.7;
		bgBook3.scaleY = 0.7;

		// book1
		const book1 = this.add.image(330, 310, "features_texture0_level0", "IB.png");
		book1.scaleX = 0.7;
		book1.scaleY = 0.7;

		// book2
		const book2 = this.add.image(440, 310, "features_texture0_level0", "IB.png");
		book2.scaleX = 0.7;
		book2.scaleY = 0.7;

		// book3
		const book3 = this.add.image(550, 310, "features_texture0_level0", "IB.png");
		book3.scaleX = 0.7;
		book3.scaleY = 0.7;

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

		// feature_animation
		const feature_animation = this.add.sprite(840, 270, "features_texture0_level0", "AB.png");
		feature_animation.scaleX = 0.7;
		feature_animation.scaleY = 0.7;
		feature_animation.play("feature-animation");

		// bgFeatures
		const bgFeatures = this.add.image(725, 218, "features_texture0_level0", "JB.png");
		bgFeatures.scaleX = 0.7;
		bgFeatures.scaleY = 0.7;
		bgFeatures.visible = false;

		// frameFeatures
		const frameFeatures = this.add.image(725, 218, "features_texture0_level0", "EB.png");
		frameFeatures.scaleX = 0.7;
		frameFeatures.scaleY = 0.7;
		frameFeatures.visible = false;

		// symbolsBot
		const symbolsBot = this.add.image(725, 229, "features_texture0_level0", "KB.png");
		symbolsBot.scaleX = 0.7;
		symbolsBot.scaleY = 0.7;
		symbolsBot.visible = false;

		// symbolsTop
		const symbolsTop = this.add.image(726, 206, "features_texture0_level0", "LB.png");
		symbolsTop.scaleX = 0.7;
		symbolsTop.scaleY = 0.7;
		symbolsTop.visible = false;

		// bgFeatures_1
		const bgFeatures_1 = this.add.image(725, 271, "features_texture0_level0", "JB.png");
		bgFeatures_1.scaleX = 0.7;
		bgFeatures_1.scaleY = 0.7;
		bgFeatures_1.visible = false;

		// frameFeatures_1
		const frameFeatures_1 = this.add.image(725, 271, "features_texture0_level0", "EB.png");
		frameFeatures_1.scaleX = 0.7;
		frameFeatures_1.scaleY = 0.7;
		frameFeatures_1.visible = false;

		// symbolsBot_1
		const symbolsBot_1 = this.add.image(725, 282, "features_texture0_level0", "KB.png");
		symbolsBot_1.scaleX = 0.7;
		symbolsBot_1.scaleY = 0.7;
		symbolsBot_1.visible = false;

		// symbolsTop_1
		const symbolsTop_1 = this.add.image(726, 259, "features_texture0_level0", "LB.png");
		symbolsTop_1.scaleX = 0.7;
		symbolsTop_1.scaleY = 0.7;
		symbolsTop_1.visible = false;

		// bgFeatures_2
		const bgFeatures_2 = this.add.image(725, 325, "features_texture0_level0", "JB.png");
		bgFeatures_2.scaleX = 0.7;
		bgFeatures_2.scaleY = 0.7;
		bgFeatures_2.visible = false;

		// frameFeatures_2
		const frameFeatures_2 = this.add.image(725, 325, "features_texture0_level0", "EB.png");
		frameFeatures_2.scaleX = 0.7;
		frameFeatures_2.scaleY = 0.7;
		frameFeatures_2.visible = false;

		// symbolsBot_2
		const symbolsBot_2 = this.add.image(725, 336, "features_texture0_level0", "KB.png");
		symbolsBot_2.scaleX = 0.7;
		symbolsBot_2.scaleY = 0.7;
		symbolsBot_2.visible = false;

		// symbolsTop_2
		const symbolsTop_2 = this.add.image(726, 313, "features_texture0_level0", "LB.png");
		symbolsTop_2.scaleX = 0.7;
		symbolsTop_2.scaleY = 0.7;
		symbolsTop_2.visible = false;

		// bgFeatures_3
		const bgFeatures_3 = this.add.image(782, 218, "features_texture0_level0", "JB.png");
		bgFeatures_3.scaleX = 0.7;
		bgFeatures_3.scaleY = 0.7;
		bgFeatures_3.visible = false;

		// frameFeatures_3
		const frameFeatures_3 = this.add.image(782, 218, "features_texture0_level0", "EB.png");
		frameFeatures_3.scaleX = 0.7;
		frameFeatures_3.scaleY = 0.7;
		frameFeatures_3.visible = false;

		// symbolsBot_3
		const symbolsBot_3 = this.add.image(782, 229, "features_texture0_level0", "KB.png");
		symbolsBot_3.scaleX = 0.7;
		symbolsBot_3.scaleY = 0.7;
		symbolsBot_3.visible = false;

		// symbolsTop_3
		const symbolsTop_3 = this.add.image(783, 206, "features_texture0_level0", "LB.png");
		symbolsTop_3.scaleX = 0.7;
		symbolsTop_3.scaleY = 0.7;
		symbolsTop_3.visible = false;

		// bgFeatures_4
		const bgFeatures_4 = this.add.image(782, 271, "features_texture0_level0", "JB.png");
		bgFeatures_4.scaleX = 0.7;
		bgFeatures_4.scaleY = 0.7;
		bgFeatures_4.visible = false;

		// frameFeatures_4
		const frameFeatures_4 = this.add.image(782, 271, "features_texture0_level0", "EB.png");
		frameFeatures_4.scaleX = 0.7;
		frameFeatures_4.scaleY = 0.7;
		frameFeatures_4.visible = false;

		// symbolsBot_4
		const symbolsBot_4 = this.add.image(782, 282, "features_texture0_level0", "KB.png");
		symbolsBot_4.scaleX = 0.7;
		symbolsBot_4.scaleY = 0.7;
		symbolsBot_4.visible = false;

		// symbolsTop_4
		const symbolsTop_4 = this.add.image(783, 259, "features_texture0_level0", "LB.png");
		symbolsTop_4.scaleX = 0.7;
		symbolsTop_4.scaleY = 0.7;
		symbolsTop_4.visible = false;

		// bgFeatures_5
		const bgFeatures_5 = this.add.image(782, 325, "features_texture0_level0", "JB.png");
		bgFeatures_5.scaleX = 0.7;
		bgFeatures_5.scaleY = 0.7;
		bgFeatures_5.visible = false;

		// frameFeatures_5
		const frameFeatures_5 = this.add.image(782, 325, "features_texture0_level0", "EB.png");
		frameFeatures_5.scaleX = 0.7;
		frameFeatures_5.scaleY = 0.7;
		frameFeatures_5.visible = false;

		// symbolsBot_5
		const symbolsBot_5 = this.add.image(782, 336, "features_texture0_level0", "KB.png");
		symbolsBot_5.scaleX = 0.7;
		symbolsBot_5.scaleY = 0.7;
		symbolsBot_5.visible = false;

		// symbolsTop_5
		const symbolsTop_5 = this.add.image(783, 313, "features_texture0_level0", "LB.png");
		symbolsTop_5.scaleX = 0.7;
		symbolsTop_5.scaleY = 0.7;
		symbolsTop_5.visible = false;

		// bgFeatures_6
		const bgFeatures_6 = this.add.image(839, 218, "features_texture0_level0", "JB.png");
		bgFeatures_6.scaleX = 0.7;
		bgFeatures_6.scaleY = 0.7;
		bgFeatures_6.visible = false;

		// frameFeatures_6
		const frameFeatures_6 = this.add.image(839, 218, "features_texture0_level0", "EB.png");
		frameFeatures_6.scaleX = 0.7;
		frameFeatures_6.scaleY = 0.7;
		frameFeatures_6.visible = false;

		// symbolsBot_6
		const symbolsBot_6 = this.add.image(839, 229, "features_texture0_level0", "KB.png");
		symbolsBot_6.scaleX = 0.7;
		symbolsBot_6.scaleY = 0.7;
		symbolsBot_6.visible = false;

		// symbolsTop_6
		const symbolsTop_6 = this.add.image(840, 206, "features_texture0_level0", "LB.png");
		symbolsTop_6.scaleX = 0.7;
		symbolsTop_6.scaleY = 0.7;
		symbolsTop_6.visible = false;

		// bgFeatures_7
		const bgFeatures_7 = this.add.image(839, 271, "features_texture0_level0", "JB.png");
		bgFeatures_7.scaleX = 0.7;
		bgFeatures_7.scaleY = 0.7;
		bgFeatures_7.visible = false;

		// frameFeatures_7
		const frameFeatures_7 = this.add.image(839, 271, "features_texture0_level0", "EB.png");
		frameFeatures_7.scaleX = 0.7;
		frameFeatures_7.scaleY = 0.7;
		frameFeatures_7.visible = false;

		// symbolsBot_7
		const symbolsBot_7 = this.add.image(839, 282, "features_texture0_level0", "KB.png");
		symbolsBot_7.scaleX = 0.7;
		symbolsBot_7.scaleY = 0.7;
		symbolsBot_7.visible = false;

		// symbolsTop_7
		const symbolsTop_7 = this.add.image(840, 259, "features_texture0_level0", "LB.png");
		symbolsTop_7.scaleX = 0.7;
		symbolsTop_7.scaleY = 0.7;
		symbolsTop_7.visible = false;

		// bgFeatures_8
		const bgFeatures_8 = this.add.image(839, 325, "features_texture0_level0", "JB.png");
		bgFeatures_8.scaleX = 0.7;
		bgFeatures_8.scaleY = 0.7;
		bgFeatures_8.visible = false;

		// frameFeatures_8
		const frameFeatures_8 = this.add.image(839, 325, "features_texture0_level0", "EB.png");
		frameFeatures_8.scaleX = 0.7;
		frameFeatures_8.scaleY = 0.7;
		frameFeatures_8.visible = false;

		// symbolsBot_8
		const symbolsBot_8 = this.add.image(839, 336, "features_texture0_level0", "KB.png");
		symbolsBot_8.scaleX = 0.7;
		symbolsBot_8.scaleY = 0.7;
		symbolsBot_8.visible = false;

		// symbolsTop_8
		const symbolsTop_8 = this.add.image(840, 313, "features_texture0_level0", "LB.png");
		symbolsTop_8.scaleX = 0.7;
		symbolsTop_8.scaleY = 0.7;
		symbolsTop_8.visible = false;

		// bgFeatures_9
		const bgFeatures_9 = this.add.image(897, 218, "features_texture0_level0", "JB.png");
		bgFeatures_9.scaleX = 0.7;
		bgFeatures_9.scaleY = 0.7;
		bgFeatures_9.visible = false;

		// frameFeatures_9
		const frameFeatures_9 = this.add.image(897, 218, "features_texture0_level0", "EB.png");
		frameFeatures_9.scaleX = 0.7;
		frameFeatures_9.scaleY = 0.7;
		frameFeatures_9.visible = false;

		// symbolsBot_9
		const symbolsBot_9 = this.add.image(897, 229, "features_texture0_level0", "KB.png");
		symbolsBot_9.scaleX = 0.7;
		symbolsBot_9.scaleY = 0.7;
		symbolsBot_9.visible = false;

		// symbolsTop_9
		const symbolsTop_9 = this.add.image(898, 206, "features_texture0_level0", "LB.png");
		symbolsTop_9.scaleX = 0.7;
		symbolsTop_9.scaleY = 0.7;
		symbolsTop_9.visible = false;

		// bgFeatures_10
		const bgFeatures_10 = this.add.image(897, 271, "features_texture0_level0", "JB.png");
		bgFeatures_10.scaleX = 0.7;
		bgFeatures_10.scaleY = 0.7;
		bgFeatures_10.visible = false;

		// frameFeatures_10
		const frameFeatures_10 = this.add.image(897, 271, "features_texture0_level0", "EB.png");
		frameFeatures_10.scaleX = 0.7;
		frameFeatures_10.scaleY = 0.7;
		frameFeatures_10.visible = false;

		// symbolsBot_10
		const symbolsBot_10 = this.add.image(897, 282, "features_texture0_level0", "KB.png");
		symbolsBot_10.scaleX = 0.7;
		symbolsBot_10.scaleY = 0.7;
		symbolsBot_10.visible = false;

		// symbolsTop_10
		const symbolsTop_10 = this.add.image(898, 259, "features_texture0_level0", "LB.png");
		symbolsTop_10.scaleX = 0.7;
		symbolsTop_10.scaleY = 0.7;
		symbolsTop_10.visible = false;

		// bgFeatures_11
		const bgFeatures_11 = this.add.image(897, 325, "features_texture0_level0", "JB.png");
		bgFeatures_11.scaleX = 0.7;
		bgFeatures_11.scaleY = 0.7;
		bgFeatures_11.visible = false;

		// frameFeatures_11
		const frameFeatures_11 = this.add.image(897, 325, "features_texture0_level0", "EB.png");
		frameFeatures_11.scaleX = 0.7;
		frameFeatures_11.scaleY = 0.7;
		frameFeatures_11.visible = false;

		// symbolsBot_11
		const symbolsBot_11 = this.add.image(897, 336, "features_texture0_level0", "KB.png");
		symbolsBot_11.scaleX = 0.7;
		symbolsBot_11.scaleY = 0.7;
		symbolsBot_11.visible = false;

		// symbolsTop_11
		const symbolsTop_11 = this.add.image(898, 313, "features_texture0_level0", "LB.png");
		symbolsTop_11.scaleX = 0.7;
		symbolsTop_11.scaleY = 0.7;
		symbolsTop_11.visible = false;

		// bgFeatures_12
		const bgFeatures_12 = this.add.image(953, 218, "features_texture0_level0", "JB.png");
		bgFeatures_12.scaleX = 0.7;
		bgFeatures_12.scaleY = 0.7;
		bgFeatures_12.visible = false;

		// frameFeatures_12
		const frameFeatures_12 = this.add.image(953, 218, "features_texture0_level0", "EB.png");
		frameFeatures_12.scaleX = 0.7;
		frameFeatures_12.scaleY = 0.7;
		frameFeatures_12.visible = false;

		// symbolsBot_12
		const symbolsBot_12 = this.add.image(953, 229, "features_texture0_level0", "KB.png");
		symbolsBot_12.scaleX = 0.7;
		symbolsBot_12.scaleY = 0.7;
		symbolsBot_12.visible = false;

		// symbolsTop_12
		const symbolsTop_12 = this.add.image(954, 206, "features_texture0_level0", "LB.png");
		symbolsTop_12.scaleX = 0.7;
		symbolsTop_12.scaleY = 0.7;
		symbolsTop_12.visible = false;

		// bgFeatures_13
		const bgFeatures_13 = this.add.image(953, 271, "features_texture0_level0", "JB.png");
		bgFeatures_13.scaleX = 0.7;
		bgFeatures_13.scaleY = 0.7;
		bgFeatures_13.visible = false;

		// frameFeatures_13
		const frameFeatures_13 = this.add.image(953, 271, "features_texture0_level0", "EB.png");
		frameFeatures_13.scaleX = 0.7;
		frameFeatures_13.scaleY = 0.7;
		frameFeatures_13.visible = false;

		// symbolsBot_13
		const symbolsBot_13 = this.add.image(953, 282, "features_texture0_level0", "KB.png");
		symbolsBot_13.scaleX = 0.7;
		symbolsBot_13.scaleY = 0.7;
		symbolsBot_13.visible = false;

		// symbolsTop_13
		const symbolsTop_13 = this.add.image(954, 259, "features_texture0_level0", "LB.png");
		symbolsTop_13.scaleX = 0.7;
		symbolsTop_13.scaleY = 0.7;
		symbolsTop_13.visible = false;

		// bgFeatures_14
		const bgFeatures_14 = this.add.image(953, 325, "features_texture0_level0", "JB.png");
		bgFeatures_14.scaleX = 0.7;
		bgFeatures_14.scaleY = 0.7;
		bgFeatures_14.visible = false;

		// frameFeatures_14
		const frameFeatures_14 = this.add.image(953, 325, "features_texture0_level0", "EB.png");
		frameFeatures_14.scaleX = 0.7;
		frameFeatures_14.scaleY = 0.7;
		frameFeatures_14.visible = false;

		// symbolsBot_14
		const symbolsBot_14 = this.add.image(953, 336, "features_texture0_level0", "KB.png");
		symbolsBot_14.scaleX = 0.7;
		symbolsBot_14.scaleY = 0.7;
		symbolsBot_14.visible = false;

		// symbolsTop_14
		const symbolsTop_14 = this.add.image(954, 313, "features_texture0_level0", "LB.png");
		symbolsTop_14.scaleX = 0.7;
		symbolsTop_14.scaleY = 0.7;
		symbolsTop_14.visible = false;

		// lists
		const symbolsList = [symbolsTop_14, symbolsBot_14, frameFeatures_14, bgFeatures_14, symbolsTop_13, symbolsBot_13, frameFeatures_13, bgFeatures_13, symbolsTop_12, symbolsBot_12, frameFeatures_12, bgFeatures_12, symbolsTop_11, symbolsBot_11, frameFeatures_11, bgFeatures_11, symbolsTop_10, symbolsBot_10, frameFeatures_10, bgFeatures_10, symbolsTop_9, symbolsBot_9, frameFeatures_9, bgFeatures_9, symbolsTop_8, symbolsBot_8, frameFeatures_8, bgFeatures_8, symbolsTop_7, symbolsBot_7, frameFeatures_7, bgFeatures_7, symbolsTop_6, symbolsBot_6, frameFeatures_6, bgFeatures_6, symbolsTop_5, symbolsBot_5, frameFeatures_5, bgFeatures_5, symbolsTop_4, symbolsBot_4, frameFeatures_4, bgFeatures_4, symbolsTop_3, symbolsBot_3, frameFeatures_3, bgFeatures_3, symbolsTop_2, symbolsBot_2, frameFeatures_2, bgFeatures_2, symbolsTop_1, symbolsBot_1, frameFeatures_1, bgFeatures_1, symbolsTop, symbolsBot, frameFeatures, bgFeatures];

		this.t0AB_png = t0AB_png;
		this.btnContinue = btnContinue;
		this.logo1 = logo1;
		this.logo2 = logo2;
		this.logo3 = logo3;
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
		this.feature_animation = feature_animation;
		this.symbolsList = symbolsList;

		this.events.emit("scene-awake");
	}

	private t0AB_png!: Phaser.GameObjects.Image;
	private btnContinue!: Phaser.GameObjects.Image;
	private logo1!: Phaser.GameObjects.Image;
	private logo2!: Phaser.GameObjects.Image;
	private logo3!: Phaser.GameObjects.Image;
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
	private feature_animation!: Phaser.GameObjects.Sprite;
	private symbolsList!: Phaser.GameObjects.Image[];

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
