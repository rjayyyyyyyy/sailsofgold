// You can write more code here

import { VideoSlotGameState } from "@games/videoslot/VideoSlotGameState";
import { container } from "@gl/di/container";

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class PaytableScene extends Phaser.Scene {

	constructor() {
		super("PaytableScene");

		/* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// paytableBg
		const paytableBg = this.add.image(640, 314, "menu_texture2_level1", "A-0.png");
		paytableBg.scaleX = 0.8;
		paytableBg.scaleY = 0.8;

		// book1
		const book1 = this.add.image(370, 180, "features_texture0_level0", "FB.png");
		book1.scaleX = 0.4;
		book1.scaleY = 0.4;
		book1.visible = false;

		// book2
		const book2 = this.add.image(435, 180, "features_texture0_level0", "FB.png");
		book2.scaleX = 0.4;
		book2.scaleY = 0.4;
		book2.visible = false;

		// book3
		const book3 = this.add.image(500, 180, "features_texture0_level0", "FB.png");
		book3.scaleX = 0.4;
		book3.scaleY = 0.4;
		book3.visible = false;

		// imgLines
		const imgLines = this.add.image(435, 266, "menu_texture0_level0", "HB.png");
		imgLines.visible = false;

		// book
		const book = this.add.image(390, 350, "features_texture0_level0", "FB.png");
		book.scaleX = 0.55;
		book.scaleY = 0.55;
		book.visible = false;

		// imgLines2
		const imgLines2 = this.add.image(630, 288, "skin_texture5_level1", "A-1.png");
		imgLines2.scaleX = 1.2;
		imgLines2.scaleY = 1.1;
		imgLines2.visible = false;

		// txtFreeSpinsDesc
		const txtFreeSpinsDesc = this.add.text(786, 396, "", {});
		txtFreeSpinsDesc.scaleX = 0.5;
		txtFreeSpinsDesc.scaleY = 0.5;
		txtFreeSpinsDesc.setOrigin(0.5, 0.5);
		txtFreeSpinsDesc.visible = false;
		txtFreeSpinsDesc.text = "IDS_BD_MOREFREESPINS";
		txtFreeSpinsDesc.setStyle({ "color": "#8B4513", "fontFamily": "flanker", "fontSize": "26px", "stroke": "#8B4513", "strokeThickness": 2 });
		txtFreeSpinsDesc.setWordWrapWidth(500, true);

		// txtScatter
		const txtScatter = this.add.text(357, 162, "", {});
		txtScatter.scaleX = 0.5;
		txtScatter.scaleY = 0.5;
		txtScatter.setOrigin(0.5, 0.5);
		txtScatter.visible = false;
		txtScatter.text = "IDS_SCATTER";
		txtScatter.setStyle({ "color": "#FFF59F", "fontFamily": "FLANKER_GRIFFO", "fontSize": "44px", "stroke": "#8B4513", "strokeThickness": 5 });

		// txtFreeSpins
		const txtFreeSpins = this.add.text(732, 163, "", {});
		txtFreeSpins.scaleX = 0.5;
		txtFreeSpins.scaleY = 0.5;
		txtFreeSpins.setOrigin(0.5, 0.5);
		txtFreeSpins.visible = false;
		txtFreeSpins.text = "IDS_FREESPINS_HEADER";
		txtFreeSpins.setStyle({ "color": "#FFF59F", "fontFamily": "FLANKER_GRIFFO", "fontSize": "44px", "stroke": "#8B4513", "strokeThickness": 5 });

		// scatterMultiplier
		const scatterMultiplier = this.add.text(337, 329, "", {});
		scatterMultiplier.scaleX = 0.5;
		scatterMultiplier.scaleY = 0.5;
		scatterMultiplier.setOrigin(0.5, 0.5);
		scatterMultiplier.visible = false;
		scatterMultiplier.text = "5000\n1000\n100\n10";
		scatterMultiplier.setStyle({ "color": "#8B4513", "fontFamily": "FLANKER_GRIFFO", "fontSize": "44px", "stroke": "#8B4513", "strokeThickness": 4 });

		// txtScatterDesc1
		const txtScatterDesc1 = this.add.text(357, 407, "", {});
		txtScatterDesc1.scaleX = 0.5;
		txtScatterDesc1.scaleY = 0.5;
		txtScatterDesc1.setOrigin(0.5, 0);
		txtScatterDesc1.visible = false;
		txtScatterDesc1.text = "IDS_BD_WILDSCATTERGOLD";
		txtScatterDesc1.setStyle({ "align": "center", "color": "#8B4513", "fontFamily": "flanker", "fontSize": "26px", "stroke": "#8B4513", "strokeThickness": 2 });
		txtScatterDesc1.setWordWrapWidth(300);

		// scatterX
		const scatterX = this.add.text(295, 328, "", {});
		scatterX.scaleX = 0.5;
		scatterX.scaleY = 0.5;
		scatterX.setOrigin(0.5, 0.5);
		scatterX.visible = false;
		scatterX.text = "X5\nX4\nX3\nX2";
		scatterX.setStyle({ "color": "#b60202ff", "fontFamily": "FLANKER_GRIFFO", "fontSize": "44px", "stroke": "#b60202ff", "strokeThickness": 4 });

		// txtExpandingDesc
		const txtExpandingDesc = this.add.text(804, 326, "", {});
		txtExpandingDesc.scaleX = 0.5;
		txtExpandingDesc.scaleY = 0.5;
		txtExpandingDesc.setOrigin(0.5, 0);
		txtExpandingDesc.visible = false;
		txtExpandingDesc.text = "IDS_BD_EXPANDINGSYMBOL";
		txtExpandingDesc.setStyle({ "color": "#8B4513", "fontFamily": "flanker", "fontSize": "26px", "stroke": "#8B4513", "strokeThickness": 2 });
		txtExpandingDesc.setWordWrapWidth(500, true);

		// txtWinUp
		const txtWinUp = this.add.text(668, 481, "", {});
		txtWinUp.scaleX = 0.5;
		txtWinUp.scaleY = 0.5;
		txtWinUp.setOrigin(0.5, 0.5);
		txtWinUp.visible = false;
		txtWinUp.text = "IDS_WINUPTO_COINS";
		txtWinUp.setStyle({ "backgroundColor": "", "color": "#FFF59F", "fontFamily": "FLANKER_GRIFFO", "fontSize": "60px", "stroke": "#8B4513", "strokeThickness": 5 });

		// prevPage
		const prevPage = this.add.sprite(276, 483, "menu_texture2_level0.png", "OB.png");
		prevPage.setInteractive(new Phaser.Geom.Rectangle(0, 0, 49, 39), Phaser.Geom.Rectangle.Contains);
		prevPage.scaleX = 0.8;
		prevPage.scaleY = 0.8;
		prevPage.angle = -180;

		// closePage
		const closePage = this.add.sprite(310, 493, "menu_texture2_level0.png", "OB.png");
		closePage.setInteractive(new Phaser.Geom.Rectangle(0, 0, 49, 39), Phaser.Geom.Rectangle.Contains);
		closePage.scaleX = 0.8;
		closePage.scaleY = 0.8;
		closePage.angle = 90;

		// nextPage
		const nextPage = this.add.sprite(346, 483, "menu_texture2_level0.png", "OB.png");
		nextPage.setInteractive(new Phaser.Geom.Rectangle(0, 0, 49, 39), Phaser.Geom.Rectangle.Contains);
		nextPage.scaleX = 0.8;
		nextPage.scaleY = 0.8;

		// dotPage1
		const dotPage1 = this.add.sprite(291, 463, "menu_texture0_level0", "PB.png");
		dotPage1.setInteractive(new Phaser.Geom.Rectangle(0, 0, 15, 16), Phaser.Geom.Rectangle.Contains);
		dotPage1.scaleX = 0.8;
		dotPage1.scaleY = 0.8;

		// dotPage2
		const dotPage2 = this.add.sprite(311, 463, "menu_texture2_level0.png", "PB.png");
		dotPage2.setInteractive(new Phaser.Geom.Rectangle(0, 0, 15, 16), Phaser.Geom.Rectangle.Contains);
		dotPage2.scaleX = 0.5;
		dotPage2.scaleY = 0.5;

		// dotPage3
		const dotPage3 = this.add.sprite(331, 463, "menu_texture2_level0.png", "PB.png");
		dotPage3.setInteractive(new Phaser.Geom.Rectangle(0, 0, 15, 16), Phaser.Geom.Rectangle.Contains);
		dotPage3.scaleX = 0.5;
		dotPage3.scaleY = 0.5;

		// activePage
		const activePage = this.add.image(291, 463, "menu_texture2_level0.png", "QB.png");
		activePage.scaleX = 0.8;
		activePage.scaleY = 0.8;

		// fB_png
		const fB_png = this.add.image(629, 258, "skin_texture5_level1", "A-2.png");

		// wE_png
		const wE_png = this.add.image(453, 187, "skin_texture5_level0", "A-86.png");
		wE_png.scaleX = 0.55;
		wE_png.scaleY = 0.55;

		// vE_png
		const vE_png = this.add.image(643, 185, "skin_texture5_level0", "A-132.png");
		vE_png.scaleX = 0.55;
		vE_png.scaleY = 0.55;

		// tE_png
		const tE_png = this.add.image(818, 187, "skin_texture5_level0", "A-166.png");
		tE_png.scaleX = 0.55;
		tE_png.scaleY = 0.55;

		// sE_png
		const sE_png = this.add.image(894, 176, "skin_texture4_level0", "SE.png");
		sE_png.scaleX = 0.55;
		sE_png.scaleY = 0.55;
		sE_png.visible = false;

		// symbolX
		const symbolX = this.add.text(429, 313, "", {});
		symbolX.setOrigin(0.5, 0.5);
		symbolX.text = "X5\nX4\nX3\nX2";
		symbolX.setStyle({ "color": "#b60202ff", "fontFamily": "FLANKER_GRIFFO", "fontSize": "24px", "stroke": "#b60202ff", "strokeThickness": 2 });

		// symbolMultiplier
		const symbolMultiplier = this.add.text(483, 313, "", {});
		symbolMultiplier.setOrigin(0.5, 0.5);
		symbolMultiplier.text = "1000\n200\n50\n5";
		symbolMultiplier.setStyle({ "color": "#8B4513", "fontFamily": "FLANKER_GRIFFO", "fontSize": "24px", "stroke": "#8B4513", "strokeThickness": 2 });

		// symbolX_1
		const symbolX_1 = this.add.text(609, 313, "", {});
		symbolX_1.setOrigin(0.5, 0.5);
		symbolX_1.text = "X5\nX4\nX3\nX2";
		symbolX_1.setStyle({ "color": "#b60202ff", "fontFamily": "FLANKER_GRIFFO", "fontSize": "24px", "stroke": "#b60202ff", "strokeThickness": 2 });

		// symbolMultiplier_1
		const symbolMultiplier_1 = this.add.text(658, 313, "", {});
		symbolMultiplier_1.setOrigin(0.5, 0.5);
		symbolMultiplier_1.text = "500\n100\n25\n5";
		symbolMultiplier_1.setStyle({ "color": "#8B4513", "fontFamily": "FLANKER_GRIFFO", "fontSize": "24px", "stroke": "#8B4513", "strokeThickness": 2 });

		// symbolX_2
		const symbolX_2 = this.add.text(791, 313, "", {});
		symbolX_2.setOrigin(0.5, 0.5);
		symbolX_2.text = "X5\nX4\nX3\nX2";
		symbolX_2.setStyle({ "color": "#b60202ff", "fontFamily": "FLANKER_GRIFFO", "fontSize": "24px", "stroke": "#b60202ff", "strokeThickness": 2 });

		// symbolMultiplier_2
		const symbolMultiplier_2 = this.add.text(841, 313, "", {});
		symbolMultiplier_2.setOrigin(0.5, 0.5);
		symbolMultiplier_2.text = "250\n75\n15\n5";
		symbolMultiplier_2.setStyle({ "color": "#8B4513", "fontFamily": "FLANKER_GRIFFO", "fontSize": "24px", "stroke": "#8B4513", "strokeThickness": 2 });

		// symbolX_3
		const symbolX_3 = this.add.text(867, 313, "", {});
		symbolX_3.setOrigin(0.5, 0.5);
		symbolX_3.visible = false;
		symbolX_3.text = "X5\nX4\nX3\nX2";
		symbolX_3.setStyle({ "fontFamily": "FLANKER_GRIFFO", "fontSize": "24px" });

		// symbolMultiplier_3
		const symbolMultiplier_3 = this.add.text(922, 313, "", {});
		symbolMultiplier_3.setOrigin(0.5, 0.5);
		symbolMultiplier_3.visible = false;
		symbolMultiplier_3.text = "750\n100\n30\n5";
		symbolMultiplier_3.setStyle({ "color": "#FFF59F", "fontFamily": "FLANKER_GRIFFO", "fontSize": "24px" });

		// rulePaytable1
		const rulePaytable1 = this.add.image(635, 425, "skin_texture5_level1", "A-5.png");
		rulePaytable1.scaleX = 0.5;
		rulePaytable1.scaleY = 0.7;

		// txtPage2
		const txtPage2 = this.add.text(654, 461, "", {});
		txtPage2.scaleX = 0.5;
		txtPage2.scaleY = 0.5;
		txtPage2.setOrigin(0.5, 0);
		txtPage2.text = "IDS_PT_STANDARDTEXT_MONEY";
		txtPage2.setStyle({ "align": "center", "color": "#8B4513", "fontFamily": "flanker", "fontSize": "30px", "stroke": "#8B4513", "strokeThickness": 1 });
		txtPage2.setWordWrapWidth(800, true);

		// eB_png
		const eB_png = this.add.image(637, 261, "skin_texture5_level1", "A-3.png");
		eB_png.scaleX = 0.8;
		eB_png.scaleY = 0.8;
		eB_png.visible = false;

		// dF_png
		const dF_png = this.add.image(333, 194, "skin_texture5_level0", "A-79.png");
		dF_png.scaleX = 0.55;
		dF_png.scaleY = 0.55;
		dF_png.visible = false;

		// dF_png_1
		const dF_png_1 = this.add.image(490, 194, "skin_texture5_level0", "A-73.png");
		dF_png_1.scaleX = 0.55;
		dF_png_1.scaleY = 0.55;
		dF_png_1.visible = false;

		// dF_png_2
		const dF_png_2 = this.add.image(634, 194, "skin_texture5_level0", "A-70.png");
		dF_png_2.scaleX = 0.55;
		dF_png_2.scaleY = 0.55;
		dF_png_2.visible = false;

		// dF_png_3
		const dF_png_3 = this.add.image(789, 194, "skin_texture5_level0", "A-68.png");
		dF_png_3.scaleX = 0.55;
		dF_png_3.scaleY = 0.55;
		dF_png_3.visible = false;

		// dF_png_4
		const dF_png_4 = this.add.image(944, 194, "skin_texture5_level0", "A-75.png");
		dF_png_4.scaleX = 0.55;
		dF_png_4.scaleY = 0.55;
		dF_png_4.visible = false;

		// symbolX_4
		const symbolX_4 = this.add.text(300, 310, "", {});
		symbolX_4.setOrigin(0.5, 0.5);
		symbolX_4.visible = false;
		symbolX_4.text = "X5\nX4\nX3";
		symbolX_4.setStyle({ "align": "center", "fontFamily": "FLANKER_GRIFFO", "fontSize": "24px" });

		// symbolMultiplier_4
		const symbolMultiplier_4 = this.add.text(355, 310, "", {});
		symbolMultiplier_4.setOrigin(0.5, 0.5);
		symbolMultiplier_4.visible = false;
		symbolMultiplier_4.text = "150\n40\n5";
		symbolMultiplier_4.setStyle({ "align": "center", "color": "#FFF59F", "fontFamily": "FLANKER_GRIFFO", "fontSize": "24px" });

		// symbolX_5
		const symbolX_5 = this.add.text(459, 310, "", {});
		symbolX_5.setOrigin(0.5, 0.5);
		symbolX_5.visible = false;
		symbolX_5.text = "X5\nX4\nX3";
		symbolX_5.setStyle({ "align": "center", "fontFamily": "FLANKER_GRIFFO", "fontSize": "24px" });

		// symbolMultiplier_5
		const symbolMultiplier_5 = this.add.text(514, 310, "", {});
		symbolMultiplier_5.setOrigin(0.5, 0.5);
		symbolMultiplier_5.visible = false;
		symbolMultiplier_5.text = "150\n40\n5";
		symbolMultiplier_5.setStyle({ "align": "center", "color": "#FFF59F", "fontFamily": "FLANKER_GRIFFO", "fontSize": "24px" });

		// symbolX_6
		const symbolX_6 = this.add.text(614, 310, "", {});
		symbolX_6.setOrigin(0.5, 0.5);
		symbolX_6.visible = false;
		symbolX_6.text = "X5\nX4\nX3";
		symbolX_6.setStyle({ "align": "center", "fontFamily": "FLANKER_GRIFFO", "fontSize": "24px" });

		// symbolMultiplier_6
		const symbolMultiplier_6 = this.add.text(669, 310, "", {});
		symbolMultiplier_6.setOrigin(0.5, 0.5);
		symbolMultiplier_6.visible = false;
		symbolMultiplier_6.text = "100\n25\n5";
		symbolMultiplier_6.setStyle({ "align": "center", "color": "#FFF59F", "fontFamily": "FLANKER_GRIFFO", "fontSize": "24px" });

		// symbolX_7
		const symbolX_7 = this.add.text(768, 310, "", {});
		symbolX_7.setOrigin(0.5, 0.5);
		symbolX_7.visible = false;
		symbolX_7.text = "X5\nX4\nX3";
		symbolX_7.setStyle({ "align": "center", "fontFamily": "FLANKER_GRIFFO", "fontSize": "24px" });

		// symbolMultiplier_7
		const symbolMultiplier_7 = this.add.text(823, 310, "", {});
		symbolMultiplier_7.setOrigin(0.5, 0.5);
		symbolMultiplier_7.visible = false;
		symbolMultiplier_7.text = "100\n25\n5";
		symbolMultiplier_7.setStyle({ "align": "center", "color": "#FFF59F", "fontFamily": "FLANKER_GRIFFO", "fontSize": "24px" });

		// symbolX_8
		const symbolX_8 = this.add.text(927, 310, "", {});
		symbolX_8.setOrigin(0.5, 0.5);
		symbolX_8.visible = false;
		symbolX_8.text = "X5\nX4\nX3";
		symbolX_8.setStyle({ "align": "center", "fontFamily": "FLANKER_GRIFFO", "fontSize": "24px" });

		// symbolMultiplier_8
		const symbolMultiplier_8 = this.add.text(982, 310, "", {});
		symbolMultiplier_8.setOrigin(0.5, 0.5);
		symbolMultiplier_8.visible = false;
		symbolMultiplier_8.text = "100\n25\n5";
		symbolMultiplier_8.setStyle({ "align": "center", "color": "#FFF59F", "fontFamily": "FLANKER_GRIFFO", "fontSize": "24px" });

		// txtPage3
		const txtPage3 = this.add.text(655, 461, "", {});
		txtPage3.scaleX = 0.5;
		txtPage3.scaleY = 0.5;
		txtPage3.setOrigin(0.5, 0);
		txtPage3.visible = false;
		txtPage3.text = "IDS_PT_STANDARDTEXT_MONEY";
		txtPage3.setStyle({ "align": "center", "color": "#8B4513", "fontFamily": "flanker", "fontSize": "30px", "stroke": "#8B4513", "strokeThickness": 1 });
		txtPage3.setWordWrapWidth(800, true);

		// a_41_png
		const a_41_png = this.add.image(640, 102, "skin_texture5_level1", "A-41.png");
		a_41_png.scaleX = 0.76;
		a_41_png.scaleY = 0.8;

		// rulePaytable
		const rulePaytable = this.add.image(635, 425, "skin_texture5_level1", "A-5.png");
		rulePaytable.scaleX = 0.5;
		rulePaytable.scaleY = 0.7;
		rulePaytable.visible = false;

		// a_67_png
		const a_67_png = this.add.image(356, 225, "skin_texture5_level0", "A-67.png");
		a_67_png.scaleX = 0.5;
		a_67_png.scaleY = 0.5;
		a_67_png.visible = false;

		// a_69_png
		const a_69_png = this.add.image(620, 221, "skin_texture5_level0", "A-69.png");
		a_69_png.scaleX = 0.45;
		a_69_png.scaleY = 0.45;
		a_69_png.visible = false;

		// a_69_png_1
		const a_69_png_1 = this.add.image(738, 221, "skin_texture5_level0", "A-69.png");
		a_69_png_1.scaleX = 0.45;
		a_69_png_1.scaleY = 0.45;
		a_69_png_1.visible = false;

		// a_69_png_2
		const a_69_png_2 = this.add.image(850, 220, "skin_texture5_level0", "A-69.png");
		a_69_png_2.scaleX = 0.45;
		a_69_png_2.scaleY = 0.45;
		a_69_png_2.visible = false;

		// a_72_png
		const a_72_png = this.add.image(621, 366, "skin_texture5_level0", "A-72.png");
		a_72_png.scaleX = 0.5;
		a_72_png.scaleY = 0.5;
		a_72_png.visible = false;

		// txtExpandingDesc_1
		const txtExpandingDesc_1 = this.add.text(739, 269, "", {});
		txtExpandingDesc_1.scaleX = 0.5;
		txtExpandingDesc_1.scaleY = 0.5;
		txtExpandingDesc_1.setOrigin(0.5, 0);
		txtExpandingDesc_1.visible = false;
		txtExpandingDesc_1.text = "IDS_BD_TRIGGERFREESPINS";
		txtExpandingDesc_1.setStyle({ "color": "#8B4513", "fontFamily": "flanker", "fontSize": "26px", "stroke": "#8B4513", "strokeThickness": 2 });
		txtExpandingDesc_1.setWordWrapWidth(txtExpandingDesc_1.style.wordWrapWidth, true);

		// lists
		const page1 = [txtFreeSpins, txtWinUp, txtExpandingDesc, imgLines2, txtScatterDesc1, scatterMultiplier, scatterX, book, txtScatter, imgLines, txtFreeSpinsDesc, book3, book2, book1, a_69_png, a_72_png, txtExpandingDesc_1, a_67_png, a_69_png_1, a_69_png_2];
		const page2 = [fB_png, txtPage2, rulePaytable1, symbolMultiplier_2, symbolX_2, symbolMultiplier_1, symbolX_1, symbolMultiplier, symbolX, tE_png, vE_png, wE_png];
		const page3 = [txtPage3, symbolMultiplier_8, symbolX_8, symbolMultiplier_7, symbolX_7, symbolMultiplier_6, symbolX_6, symbolMultiplier_5, symbolX_5, symbolMultiplier_4, symbolX_4, dF_png_4, dF_png_3, dF_png_2, dF_png_1, dF_png, eB_png, rulePaytable];

		this.txtFreeSpinsDesc = txtFreeSpinsDesc;
		this.txtScatter = txtScatter;
		this.txtFreeSpins = txtFreeSpins;
		this.txtScatterDesc1 = txtScatterDesc1;
		this.txtExpandingDesc = txtExpandingDesc;
		this.txtWinUp = txtWinUp;
		this.prevPage = prevPage;
		this.closePage = closePage;
		this.nextPage = nextPage;
		this.dotPage1 = dotPage1;
		this.dotPage2 = dotPage2;
		this.dotPage3 = dotPage3;
		this.activePage = activePage;
		this.txtPage2 = txtPage2;
		this.txtPage3 = txtPage3;
		this.txtExpandingDesc_1 = txtExpandingDesc_1;
		this.page1 = page1;
		this.page2 = page2;
		this.page3 = page3;

		this.events.emit("scene-awake");
	}

	private txtFreeSpinsDesc!: Phaser.GameObjects.Text;
	private txtScatter!: Phaser.GameObjects.Text;
	private txtFreeSpins!: Phaser.GameObjects.Text;
	private txtScatterDesc1!: Phaser.GameObjects.Text;
	private txtExpandingDesc!: Phaser.GameObjects.Text;
	private txtWinUp!: Phaser.GameObjects.Text;
	private prevPage!: Phaser.GameObjects.Sprite;
	private closePage!: Phaser.GameObjects.Sprite;
	private nextPage!: Phaser.GameObjects.Sprite;
	private dotPage1!: Phaser.GameObjects.Sprite;
	private dotPage2!: Phaser.GameObjects.Sprite;
	private dotPage3!: Phaser.GameObjects.Sprite;
	private activePage!: Phaser.GameObjects.Image;
	private txtPage2!: Phaser.GameObjects.Text;
	private txtPage3!: Phaser.GameObjects.Text;
	private txtExpandingDesc_1!: Phaser.GameObjects.Text;
	private page1!: Array<Phaser.GameObjects.Text|Phaser.GameObjects.Image>;
	private page2!: Array<Phaser.GameObjects.Image|Phaser.GameObjects.Text>;
	private page3!: Array<Phaser.GameObjects.Text|Phaser.GameObjects.Image>;

	/* START-USER-CODE */

  // Write your code here
  private pageNumber: number = 1;
  private pages: Array<any> = [];
  private gameState!: VideoSlotGameState;

  init() {
    // get game state and subscribe to changes
    this.gameState = container.get<VideoSlotGameState>("VideoSlotGameState");
  }

  create() {
    // this.scene.sleep();
    this.scene.bringToTop();
    this.editorCreate();

    this.txtFreeSpins.setText(
      this.cache.json.get("language").texts["IDS_FREESPINS_HEADER"]
    );
    this.txtFreeSpinsDesc.setText(
      this.cache.json.get("language").texts["IDS_BD_MOREFREESPINS"]
    );
    this.txtScatter.setText(
      this.cache.json.get("language").texts["IDS_SCATTER"]
    );
    this.txtScatterDesc1.setText(
      this.cache.json.get("language").texts["IDS_BD_WILDSCATTERGOLD"]
    );

    this.txtExpandingDesc.setText(
      this.cache.json.get("language").texts["IDS_BD_EXPANDINGSYMBOL"]
    );
    this.txtExpandingDesc_1.setText(
      this.cache.json.get("language").texts["IDS_BD_TRIGGERFREESPINS"]
    );
    this.txtWinUp.setText(
      this.cache.json.get("language").texts["IDS_WINUPTO_COINS"]
    );
    this.txtPage2.setText(
      this.cache.json.get("language").texts["IDS_PT_STANDARDTEXT_MONEY"]
    );
    this.txtPage3.setText(
      this.cache.json.get("language").texts["IDS_PT_STANDARDTEXT_MONEY"]
    );

    //Navigation
    this.page1.forEach((item) => item.setVisible(true));
    // setup once (e.g., in create)
    this.pages = [this.page1, this.page2, this.page3]; // each is an array of GameObjects
    const activeX = [290, 310, 330];
    this.pageNumber = 1;

    const showPage = (index: number) => {
      this.pages.forEach((page, i) => {
        const visible = i === index;
        console.log(index);
        page.forEach((obj: { setVisible: (arg0: boolean) => any }) =>
          obj.setVisible(visible)
        );
      });

      if (this.activePage) {
        this.activePage.setX(activeX[index]);
      }
    };

    // prev button
    this.prevPage.on("pointerdown", () => {
      const len = this.pages.length;
      // convert to 0-based, wrap, then back to 1-based
      this.pageNumber = ((this.pageNumber - 2 + len) % len) + 1;
      showPage(this.pageNumber - 1);
    });

    // (optional) next button
    this.nextPage.on("pointerdown", () => {
      const len = this.pages.length;
      this.pageNumber = (this.pageNumber % len) + 1;
      showPage(this.pageNumber - 1);
    });

    // show initial page
    showPage(this.pageNumber - 1);

    this.closePage.on("pointerdown", () => {
      this.gameState.isShowingPaytable.set(false);
    });
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
