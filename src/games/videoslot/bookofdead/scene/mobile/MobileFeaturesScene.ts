
// You can write more code here

import Reels from "@games/videoslot/components/Reels";
import MobileLevel from "./MobileLevel";
import { container } from "@gl/di/container";
import { VideoSlotGameState } from "@games/videoslot/VideoSlotGameState";

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class MobileFeaturesScene extends Phaser.Scene {

	constructor() {
		super("MobileFeaturesScene");

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

		// bB_png
		this.add.image(360, 550, "feature_preview_texture0_level2", "BB.png");

		// txtHeader
		const txtHeader = this.add.text(226, 443, "", {});
		txtHeader.scaleX = 0.5;
		txtHeader.scaleY = 0.5;
		txtHeader.setOrigin(0.5, 0.5);
		txtHeader.text = "IDS_FREESPINS_HEADER";
		txtHeader.setStyle({ "align": "center", "fontFamily": "FLANKER_GRIFFO", "fontSize": "46px", "stroke": "#000000", "strokeThickness": 3, "shadow.stroke": true });

		// txtMoreFreespins
		const txtMoreFreespins = this.add.text(224, 604, "", {});
		txtMoreFreespins.scaleX = 0.5;
		txtMoreFreespins.scaleY = 0.5;
		txtMoreFreespins.setOrigin(0.5, 0.5);
		txtMoreFreespins.text = "IDS_BD_MOREFREESPINS";
		txtMoreFreespins.setStyle({ "align": "center", "color": "#5B2E18", "fontFamily": "FLANKER_GRIFFO", "fontSize": "32px", "stroke": "#000000" });
		txtMoreFreespins.setWordWrapWidth(350, true);

		// txtExpanding
		const txtExpanding = this.add.text(498, 605, "", {});
		txtExpanding.scaleX = 0.5;
		txtExpanding.scaleY = 0.5;
		txtExpanding.setOrigin(0.5, 0.5);
		txtExpanding.text = "IDS_BD_EXPANDINGSYMBOL_PROMO";
		txtExpanding.setStyle({ "align": "center", "color": "#5B2E18", "fontFamily": "FLANKER_GRIFFO", "fontSize": "32px", "stroke": "#000000" });
		txtExpanding.setWordWrapWidth(350, true);

		// bgBook1
		const bgBook1 = this.add.image(160, 520, "features_texture0_level2", "GB.png");
		bgBook1.scaleX = 0.7;
		bgBook1.scaleY = 0.7;

		// bgBook2
		const bgBook2 = this.add.image(230, 520, "features_texture0_level2", "GB.png");
		bgBook2.scaleX = 0.7;
		bgBook2.scaleY = 0.7;

		// bgBook3
		const bgBook3 = this.add.image(300, 520, "features_texture0_level2", "GB.png");
		bgBook3.scaleX = 0.7;
		bgBook3.scaleY = 0.7;

		// book1
		const book1 = this.add.image(160, 520, "features_texture0_level2", "IB.png");
		book1.scaleX = 0.7;
		book1.scaleY = 0.7;

		// book2
		const book2 = this.add.image(230, 520, "features_texture0_level2", "IB.png");
		book2.scaleX = 0.7;
		book2.scaleY = 0.7;

		// book3
		const book3 = this.add.image(300, 520, "features_texture0_level2", "IB.png");
		book3.scaleX = 0.7;
		book3.scaleY = 0.7;

		// feature_animation
		const feature_animation = this.add.sprite(495, 504, "features_texture0_level2", "AB.png");
		feature_animation.scaleX = 0.8;
		feature_animation.scaleY = 0.8;
		feature_animation.play("feature-animation");

		// btnContinue
		const btnContinue = this.add.sprite(360, 824, "feature_preview_texture0_level2", "CB.png");
		btnContinue.setInteractive(new Phaser.Geom.Rectangle(0, 0, 183, 57), Phaser.Geom.Rectangle.Contains);

		// txtContinue
		const txtContinue = this.add.text(360, 824, "", {});
		txtContinue.scaleX = 0.5;
		txtContinue.scaleY = 0.5;
		txtContinue.setOrigin(0.5, 0.5);
		txtContinue.text = "IDS_BTN_CONTINUE";
		txtContinue.setStyle({ "align": "center", "fontFamily": "FLANKER_GRIFFO", "fontSize": "50px" });

		// btnCheckbox
		const btnCheckbox = this.add.sprite(290, 755, "feature_preview_texture0_level2", "DB.png");
		btnCheckbox.setInteractive(new Phaser.Geom.Rectangle(0, 0, 27, 27), Phaser.Geom.Rectangle.Contains);

		// txtCheckbox
		const txtCheckbox = this.add.text(323, 746, "", {});
		txtCheckbox.scaleX = 0.5;
		txtCheckbox.scaleY = 0.5;
		txtCheckbox.text = "IDS_DONTSHOWAGAIN";
		txtCheckbox.setStyle({ "color": "#F7EDA1", "fontFamily": "FLANKER_GRIFFO", "fontSize": "36px" });

		// btnCheck
		const btnCheck = this.add.sprite(290, 755, "feature_preview_texture0_level2", "EB.png");
		btnCheck.setInteractive(new Phaser.Geom.Rectangle(0, 0, 35, 25), Phaser.Geom.Rectangle.Contains);
		btnCheck.visible = false;

		// eB_png
		const eB_png = this.add.image(416, 468, "features_texture0_level2", "EB.png");
		eB_png.scaleX = 0.8;
		eB_png.scaleY = 0.8;
		eB_png.visible = false;

		// jB_png
		const jB_png = this.add.image(417, 468, "features_texture0_level2", "JB.png");
		jB_png.scaleX = 0.8;
		jB_png.scaleY = 0.8;
		jB_png.visible = false;

		// kB_png
		const kB_png = this.add.image(417, 476, "features_texture0_level2", "KB.png");
		kB_png.scaleX = 0.8;
		kB_png.scaleY = 0.8;
		kB_png.visible = false;

		// lB_png
		const lB_png = this.add.image(417, 460, "features_texture0_level2", "LB.png");
		lB_png.scaleX = 0.8;
		lB_png.scaleY = 0.8;
		lB_png.visible = false;

		// eB_png_1
		const eB_png_1 = this.add.image(416, 505, "features_texture0_level2", "EB.png");
		eB_png_1.scaleX = 0.8;
		eB_png_1.scaleY = 0.8;
		eB_png_1.visible = false;

		// jB_png_1
		const jB_png_1 = this.add.image(417, 505, "features_texture0_level2", "JB.png");
		jB_png_1.scaleX = 0.8;
		jB_png_1.scaleY = 0.8;
		jB_png_1.visible = false;

		// kB_png_1
		const kB_png_1 = this.add.image(417, 513, "features_texture0_level2", "KB.png");
		kB_png_1.scaleX = 0.8;
		kB_png_1.scaleY = 0.8;
		kB_png_1.visible = false;

		// lB_png_1
		const lB_png_1 = this.add.image(417, 497, "features_texture0_level2", "LB.png");
		lB_png_1.scaleX = 0.8;
		lB_png_1.scaleY = 0.8;
		lB_png_1.visible = false;

		// eB_png_2
		const eB_png_2 = this.add.image(416, 542, "features_texture0_level2", "EB.png");
		eB_png_2.scaleX = 0.8;
		eB_png_2.scaleY = 0.8;
		eB_png_2.visible = false;

		// jB_png_2
		const jB_png_2 = this.add.image(417, 542, "features_texture0_level2", "JB.png");
		jB_png_2.scaleX = 0.8;
		jB_png_2.scaleY = 0.8;
		jB_png_2.visible = false;

		// kB_png_2
		const kB_png_2 = this.add.image(417, 550, "features_texture0_level2", "KB.png");
		kB_png_2.scaleX = 0.8;
		kB_png_2.scaleY = 0.8;
		kB_png_2.visible = false;

		// lB_png_2
		const lB_png_2 = this.add.image(417, 534, "features_texture0_level2", "LB.png");
		lB_png_2.scaleX = 0.8;
		lB_png_2.scaleY = 0.8;
		lB_png_2.visible = false;

		// eB_png_3
		const eB_png_3 = this.add.image(455, 468, "features_texture0_level2", "EB.png");
		eB_png_3.scaleX = 0.8;
		eB_png_3.scaleY = 0.8;
		eB_png_3.visible = false;

		// jB_png_3
		const jB_png_3 = this.add.image(456, 468, "features_texture0_level2", "JB.png");
		jB_png_3.scaleX = 0.8;
		jB_png_3.scaleY = 0.8;
		jB_png_3.visible = false;

		// kB_png_3
		const kB_png_3 = this.add.image(456, 476, "features_texture0_level2", "KB.png");
		kB_png_3.scaleX = 0.8;
		kB_png_3.scaleY = 0.8;
		kB_png_3.visible = false;

		// lB_png_3
		const lB_png_3 = this.add.image(456, 460, "features_texture0_level2", "LB.png");
		lB_png_3.scaleX = 0.8;
		lB_png_3.scaleY = 0.8;
		lB_png_3.visible = false;

		// eB_png_4
		const eB_png_4 = this.add.image(455, 505, "features_texture0_level2", "EB.png");
		eB_png_4.scaleX = 0.8;
		eB_png_4.scaleY = 0.8;
		eB_png_4.visible = false;

		// jB_png_4
		const jB_png_4 = this.add.image(456, 505, "features_texture0_level2", "JB.png");
		jB_png_4.scaleX = 0.8;
		jB_png_4.scaleY = 0.8;
		jB_png_4.visible = false;

		// kB_png_4
		const kB_png_4 = this.add.image(456, 513, "features_texture0_level2", "KB.png");
		kB_png_4.scaleX = 0.8;
		kB_png_4.scaleY = 0.8;
		kB_png_4.visible = false;

		// lB_png_4
		const lB_png_4 = this.add.image(456, 497, "features_texture0_level2", "LB.png");
		lB_png_4.scaleX = 0.8;
		lB_png_4.scaleY = 0.8;
		lB_png_4.visible = false;

		// eB_png_5
		const eB_png_5 = this.add.image(455, 542, "features_texture0_level2", "EB.png");
		eB_png_5.scaleX = 0.8;
		eB_png_5.scaleY = 0.8;
		eB_png_5.visible = false;

		// jB_png_5
		const jB_png_5 = this.add.image(456, 542, "features_texture0_level2", "JB.png");
		jB_png_5.scaleX = 0.8;
		jB_png_5.scaleY = 0.8;
		jB_png_5.visible = false;

		// kB_png_5
		const kB_png_5 = this.add.image(456, 550, "features_texture0_level2", "KB.png");
		kB_png_5.scaleX = 0.8;
		kB_png_5.scaleY = 0.8;
		kB_png_5.visible = false;

		// lB_png_5
		const lB_png_5 = this.add.image(456, 534, "features_texture0_level2", "LB.png");
		lB_png_5.scaleX = 0.8;
		lB_png_5.scaleY = 0.8;
		lB_png_5.visible = false;

		// eB_png_6
		const eB_png_6 = this.add.image(495, 468, "features_texture0_level2", "EB.png");
		eB_png_6.scaleX = 0.8;
		eB_png_6.scaleY = 0.8;
		eB_png_6.visible = false;

		// jB_png_6
		const jB_png_6 = this.add.image(496, 468, "features_texture0_level2", "JB.png");
		jB_png_6.scaleX = 0.8;
		jB_png_6.scaleY = 0.8;
		jB_png_6.visible = false;

		// kB_png_6
		const kB_png_6 = this.add.image(496, 476, "features_texture0_level2", "KB.png");
		kB_png_6.scaleX = 0.8;
		kB_png_6.scaleY = 0.8;
		kB_png_6.visible = false;

		// lB_png_6
		const lB_png_6 = this.add.image(496, 460, "features_texture0_level2", "LB.png");
		lB_png_6.scaleX = 0.8;
		lB_png_6.scaleY = 0.8;
		lB_png_6.visible = false;

		// eB_png_7
		const eB_png_7 = this.add.image(495, 505, "features_texture0_level2", "EB.png");
		eB_png_7.scaleX = 0.8;
		eB_png_7.scaleY = 0.8;
		eB_png_7.visible = false;

		// jB_png_7
		const jB_png_7 = this.add.image(496, 505, "features_texture0_level2", "JB.png");
		jB_png_7.scaleX = 0.8;
		jB_png_7.scaleY = 0.8;
		jB_png_7.visible = false;

		// kB_png_7
		const kB_png_7 = this.add.image(496, 513, "features_texture0_level2", "KB.png");
		kB_png_7.scaleX = 0.8;
		kB_png_7.scaleY = 0.8;
		kB_png_7.visible = false;

		// lB_png_7
		const lB_png_7 = this.add.image(496, 497, "features_texture0_level2", "LB.png");
		lB_png_7.scaleX = 0.8;
		lB_png_7.scaleY = 0.8;
		lB_png_7.visible = false;

		// eB_png_8
		const eB_png_8 = this.add.image(495, 542, "features_texture0_level2", "EB.png");
		eB_png_8.scaleX = 0.8;
		eB_png_8.scaleY = 0.8;
		eB_png_8.visible = false;

		// jB_png_8
		const jB_png_8 = this.add.image(496, 542, "features_texture0_level2", "JB.png");
		jB_png_8.scaleX = 0.8;
		jB_png_8.scaleY = 0.8;
		jB_png_8.visible = false;

		// kB_png_8
		const kB_png_8 = this.add.image(496, 550, "features_texture0_level2", "KB.png");
		kB_png_8.scaleX = 0.8;
		kB_png_8.scaleY = 0.8;
		kB_png_8.visible = false;

		// lB_png_8
		const lB_png_8 = this.add.image(496, 534, "features_texture0_level2", "LB.png");
		lB_png_8.scaleX = 0.8;
		lB_png_8.scaleY = 0.8;
		lB_png_8.visible = false;

		// eB_png_9
		const eB_png_9 = this.add.image(534, 468, "features_texture0_level2", "EB.png");
		eB_png_9.scaleX = 0.8;
		eB_png_9.scaleY = 0.8;
		eB_png_9.visible = false;

		// jB_png_9
		const jB_png_9 = this.add.image(535, 468, "features_texture0_level2", "JB.png");
		jB_png_9.scaleX = 0.8;
		jB_png_9.scaleY = 0.8;
		jB_png_9.visible = false;

		// kB_png_9
		const kB_png_9 = this.add.image(535, 476, "features_texture0_level2", "KB.png");
		kB_png_9.scaleX = 0.8;
		kB_png_9.scaleY = 0.8;
		kB_png_9.visible = false;

		// lB_png_9
		const lB_png_9 = this.add.image(535, 460, "features_texture0_level2", "LB.png");
		lB_png_9.scaleX = 0.8;
		lB_png_9.scaleY = 0.8;
		lB_png_9.visible = false;

		// eB_png_10
		const eB_png_10 = this.add.image(534, 505, "features_texture0_level2", "EB.png");
		eB_png_10.scaleX = 0.8;
		eB_png_10.scaleY = 0.8;
		eB_png_10.visible = false;

		// jB_png_10
		const jB_png_10 = this.add.image(535, 505, "features_texture0_level2", "JB.png");
		jB_png_10.scaleX = 0.8;
		jB_png_10.scaleY = 0.8;
		jB_png_10.visible = false;

		// kB_png_10
		const kB_png_10 = this.add.image(535, 513, "features_texture0_level2", "KB.png");
		kB_png_10.scaleX = 0.8;
		kB_png_10.scaleY = 0.8;
		kB_png_10.visible = false;

		// lB_png_10
		const lB_png_10 = this.add.image(535, 497, "features_texture0_level2", "LB.png");
		lB_png_10.scaleX = 0.8;
		lB_png_10.scaleY = 0.8;
		lB_png_10.visible = false;

		// eB_png_11
		const eB_png_11 = this.add.image(534, 542, "features_texture0_level2", "EB.png");
		eB_png_11.scaleX = 0.8;
		eB_png_11.scaleY = 0.8;
		eB_png_11.visible = false;

		// jB_png_11
		const jB_png_11 = this.add.image(535, 542, "features_texture0_level2", "JB.png");
		jB_png_11.scaleX = 0.8;
		jB_png_11.scaleY = 0.8;
		jB_png_11.visible = false;

		// kB_png_11
		const kB_png_11 = this.add.image(535, 550, "features_texture0_level2", "KB.png");
		kB_png_11.scaleX = 0.8;
		kB_png_11.scaleY = 0.8;
		kB_png_11.visible = false;

		// lB_png_11
		const lB_png_11 = this.add.image(535, 534, "features_texture0_level2", "LB.png");
		lB_png_11.scaleX = 0.8;
		lB_png_11.scaleY = 0.8;
		lB_png_11.visible = false;

		// eB_png_12
		const eB_png_12 = this.add.image(573, 468, "features_texture0_level2", "EB.png");
		eB_png_12.scaleX = 0.8;
		eB_png_12.scaleY = 0.8;
		eB_png_12.visible = false;

		// jB_png_12
		const jB_png_12 = this.add.image(574, 468, "features_texture0_level2", "JB.png");
		jB_png_12.scaleX = 0.8;
		jB_png_12.scaleY = 0.8;
		jB_png_12.visible = false;

		// kB_png_12
		const kB_png_12 = this.add.image(574, 476, "features_texture0_level2", "KB.png");
		kB_png_12.scaleX = 0.8;
		kB_png_12.scaleY = 0.8;
		kB_png_12.visible = false;

		// lB_png_12
		const lB_png_12 = this.add.image(574, 460, "features_texture0_level2", "LB.png");
		lB_png_12.scaleX = 0.8;
		lB_png_12.scaleY = 0.8;
		lB_png_12.visible = false;

		// eB_png_13
		const eB_png_13 = this.add.image(573, 505, "features_texture0_level2", "EB.png");
		eB_png_13.scaleX = 0.8;
		eB_png_13.scaleY = 0.8;
		eB_png_13.visible = false;

		// jB_png_13
		const jB_png_13 = this.add.image(574, 505, "features_texture0_level2", "JB.png");
		jB_png_13.scaleX = 0.8;
		jB_png_13.scaleY = 0.8;
		jB_png_13.visible = false;

		// kB_png_13
		const kB_png_13 = this.add.image(574, 513, "features_texture0_level2", "KB.png");
		kB_png_13.scaleX = 0.8;
		kB_png_13.scaleY = 0.8;
		kB_png_13.visible = false;

		// lB_png_13
		const lB_png_13 = this.add.image(574, 497, "features_texture0_level2", "LB.png");
		lB_png_13.scaleX = 0.8;
		lB_png_13.scaleY = 0.8;
		lB_png_13.visible = false;

		// eB_png_14
		const eB_png_14 = this.add.image(573, 542, "features_texture0_level2", "EB.png");
		eB_png_14.scaleX = 0.8;
		eB_png_14.scaleY = 0.8;
		eB_png_14.visible = false;

		// jB_png_14
		const jB_png_14 = this.add.image(574, 542, "features_texture0_level2", "JB.png");
		jB_png_14.scaleX = 0.8;
		jB_png_14.scaleY = 0.8;
		jB_png_14.visible = false;

		// kB_png_14
		const kB_png_14 = this.add.image(574, 550, "features_texture0_level2", "KB.png");
		kB_png_14.scaleX = 0.8;
		kB_png_14.scaleY = 0.8;
		kB_png_14.visible = false;

		// lB_png_14
		const lB_png_14 = this.add.image(574, 534, "features_texture0_level2", "LB.png");
		lB_png_14.scaleX = 0.8;
		lB_png_14.scaleY = 0.8;
		lB_png_14.visible = false;

		// lists
		const symbolsList = [lB_png_14, kB_png_14, jB_png_14, eB_png_14, lB_png_13, kB_png_13, jB_png_13, eB_png_13, lB_png_12, kB_png_12, jB_png_12, eB_png_12, lB_png_11, kB_png_11, jB_png_11, eB_png_11, lB_png_10, kB_png_10, jB_png_10, eB_png_10, lB_png_9, kB_png_9, jB_png_9, eB_png_9, lB_png_8, kB_png_8, jB_png_8, eB_png_8, lB_png_7, kB_png_7, jB_png_7, eB_png_7, lB_png_6, kB_png_6, jB_png_6, eB_png_6, lB_png_5, kB_png_5, jB_png_5, eB_png_5, lB_png_4, kB_png_4, jB_png_4, eB_png_4, lB_png_3, kB_png_3, jB_png_3, eB_png_3, lB_png_2, kB_png_2, jB_png_2, eB_png_2, lB_png_1, kB_png_1, jB_png_1, eB_png_1, lB_png, kB_png, jB_png, eB_png];

		this.logo1 = logo1;
		this.logo2 = logo2;
		this.logo3 = logo3;
		this.txtHeader = txtHeader;
		this.txtMoreFreespins = txtMoreFreespins;
		this.txtExpanding = txtExpanding;
		this.bgBook1 = bgBook1;
		this.bgBook2 = bgBook2;
		this.bgBook3 = bgBook3;
		this.book1 = book1;
		this.book2 = book2;
		this.book3 = book3;
		this.feature_animation = feature_animation;
		this.btnContinue = btnContinue;
		this.txtContinue = txtContinue;
		this.btnCheckbox = btnCheckbox;
		this.txtCheckbox = txtCheckbox;
		this.btnCheck = btnCheck;
		this.symbolsList = symbolsList;

		this.events.emit("scene-awake");
	}

	private logo1!: Phaser.GameObjects.Image;
	private logo2!: Phaser.GameObjects.Image;
	private logo3!: Phaser.GameObjects.Image;
	private txtHeader!: Phaser.GameObjects.Text;
	private txtMoreFreespins!: Phaser.GameObjects.Text;
	private txtExpanding!: Phaser.GameObjects.Text;
	private bgBook1!: Phaser.GameObjects.Image;
	private bgBook2!: Phaser.GameObjects.Image;
	private bgBook3!: Phaser.GameObjects.Image;
	private book1!: Phaser.GameObjects.Image;
	private book2!: Phaser.GameObjects.Image;
	private book3!: Phaser.GameObjects.Image;
	private feature_animation!: Phaser.GameObjects.Sprite;
	private btnContinue!: Phaser.GameObjects.Sprite;
	private txtContinue!: Phaser.GameObjects.Text;
	private btnCheckbox!: Phaser.GameObjects.Sprite;
	private txtCheckbox!: Phaser.GameObjects.Text;
	private btnCheck!: Phaser.GameObjects.Sprite;
	private symbolsList!: Phaser.GameObjects.Image[];

	/* START-USER-CODE */

	// Write your code here
	private dontShowAgain: boolean = false;
	private GameState: VideoSlotGameState;

	init() {
		this.GameState = container.get<VideoSlotGameState>('VideoSlotGameState');
	}

	create() {

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
							'skin_texture4_level2',
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
								const spark = this.add.image(this.symbolsList[index].x, this.symbolsList[index].y, 'skin_texture4_level2', 'EG.png').setScale(2).setDepth(1);
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
