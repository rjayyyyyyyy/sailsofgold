
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class ReelPrefab extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? -280, y ?? 55);

		// symbol_0
		const symbol_0 = scene.add.sprite(-942, 53, "skin_texture4_level0", "PF.png");
		this.add(symbol_0);

		// symbol_1
		const symbol_1 = scene.add.sprite(-933, 245, "skin_texture4_level0", "NF.png");
		this.add(symbol_1);

		// symbol_2
		const symbol_2 = scene.add.sprite(-944, 422, "skin_texture4_level0", "LF.png");
		this.add(symbol_2);

		// symbol_3
		const symbol_3 = scene.add.sprite(-952, 602, "skin_texture4_level0", "JF.png");
		this.add(symbol_3);

		// symbol_4
		const symbol_4 = scene.add.sprite(-958, 776, "skin_texture4_level0", "DF.png");
		this.add(symbol_4);

		// symbol_5
		const symbol_5 = scene.add.sprite(-956, 978, "skin_texture4_level0", "SE.png");
		this.add(symbol_5);

		// symbol_6
		const symbol_6 = scene.add.sprite(-957, 1209, "skin_texture4_level0", "TE.png");
		this.add(symbol_6);

		// symbol_7
		const symbol_7 = scene.add.sprite(-956, 1444, "skin_texture4_level0", "VE.png");
		this.add(symbol_7);

		// symbol_8
		const symbol_8 = scene.add.sprite(-959, 1648, "skin_texture4_level0", "WE.png");
		this.add(symbol_8);

		// symbol_9
		const symbol_9 = scene.add.sprite(-952, 1873, "skin_texture4_level0", "XE.png");
		this.add(symbol_9);

		// win_symbol_0
		const win_symbol_0 = scene.add.sprite(-376, 72, "skin_texture2_level0", "OF.png");
		this.add(win_symbol_0);

		// win_symbol_1
		const win_symbol_1 = scene.add.sprite(-376, 252, "skin_texture2_level0", "MF.png");
		this.add(win_symbol_1);

		// win_symbol_2
		const win_symbol_2 = scene.add.sprite(-380, 435, "skin_texture2_level0", "KF.png");
		this.add(win_symbol_2);

		// text_1
		const text_1 = scene.add.text(-1041, -128, "", {});
		text_1.text = "Default Symbol HD\n";
		text_1.setStyle({ "fontSize": "32px" });
		this.add(text_1);

		// text
		const text = scene.add.text(-429, -100, "", {});
		text.text = "Win Symbol HD";
		text.setStyle({ "fontSize": "32px" });
		this.add(text);

		// win_symbol_3
		const win_symbol_3 = scene.add.sprite(-381, 602, "skin_texture2_level0", "IF.png");
		this.add(win_symbol_3);

		// win_symbol_4
		const win_symbol_4 = scene.add.sprite(-377, 778, "skin_texture2_level0", "CF.png");
		this.add(win_symbol_4);

		// win_symbol_5
		const win_symbol_5 = scene.add.sprite(-389, 993, "skin_texture2_level0", "TF.png");
		this.add(win_symbol_5);

		// win_symbol_6
		const win_symbol_6 = scene.add.sprite(-376, 1200, "skin_texture2_level0", "VF.png");
		this.add(win_symbol_6);

		// win_symbol_7
		const win_symbol_7 = scene.add.sprite(-373, 1429, "skin_texture2_level0", "ZF.png");
		this.add(win_symbol_7);

		// win_symbol_8
		const win_symbol_8 = scene.add.sprite(-383, 1643, "skin_texture2_level0", "BG.png");
		this.add(win_symbol_8);

		// win_symbol_9
		const win_symbol_9 = scene.add.sprite(-377, 1860, "skin_texture2_level0", "FG.png");
		this.add(win_symbol_9);

		// sd_symbol_0
		const sd_symbol_0 = scene.add.sprite(-2125, -6, "skin_texture4_level2", "PF.png");
		this.add(sd_symbol_0);

		// sd_symbol_1
		const sd_symbol_1 = scene.add.sprite(-2128, 122, "skin_texture4_level2", "NF.png");
		this.add(sd_symbol_1);

		// sd_symbol_2
		const sd_symbol_2 = scene.add.sprite(-2126, 240, "skin_texture4_level2", "LF.png");
		this.add(sd_symbol_2);

		// sd_symbol_3
		const sd_symbol_3 = scene.add.sprite(-2124, 369, "skin_texture4_level2", "JF.png");
		this.add(sd_symbol_3);

		// sd_symbol_4
		const sd_symbol_4 = scene.add.sprite(-2124, 496, "skin_texture4_level2", "DF.png");
		this.add(sd_symbol_4);

		// sd_symbol_5
		const sd_symbol_5 = scene.add.sprite(-2121, 633, "skin_texture4_level2", "SE.png");
		this.add(sd_symbol_5);

		// sd_symbol_6
		const sd_symbol_6 = scene.add.sprite(-2118, 770, "skin_texture4_level2", "TE.png");
		this.add(sd_symbol_6);

		// sd_symbol_7
		const sd_symbol_7 = scene.add.sprite(-2119, 904, "skin_texture4_level2", "VE.png");
		this.add(sd_symbol_7);

		// sd_symbol_8
		const sd_symbol_8 = scene.add.sprite(-2117, 1036, "skin_texture4_level2", "WE.png");
		this.add(sd_symbol_8);

		// sd_symbol_9
		const sd_symbol_9 = scene.add.sprite(-2116, 1165, "skin_texture4_level2", "XE.png");
		this.add(sd_symbol_9);

		// sd_win_symbol_0
		const sd_win_symbol_0 = scene.add.sprite(-1898, -10, "skin_texture2_level2", "OF.png");
		this.add(sd_win_symbol_0);

		// sd_win_symbol_1
		const sd_win_symbol_1 = scene.add.sprite(-1896, 122, "skin_texture2_level2", "MF.png");
		this.add(sd_win_symbol_1);

		// sd_win_symbol_2
		const sd_win_symbol_2 = scene.add.sprite(-1904, 250, "skin_texture2_level2", "KF.png");
		this.add(sd_win_symbol_2);

		// sd_win_symbol_3
		const sd_win_symbol_3 = scene.add.sprite(-1904, 371, "skin_texture2_level2", "IF.png");
		this.add(sd_win_symbol_3);

		// sd_win_symbol_4
		const sd_win_symbol_4 = scene.add.sprite(-1902, 496, "skin_texture2_level2", "CF.png");
		this.add(sd_win_symbol_4);

		// sd_win_symbol_5
		const sd_win_symbol_5 = scene.add.sprite(-1905, 634, "skin_texture2_level2", "TF.png");
		this.add(sd_win_symbol_5);

		// sd_win_symbol_6
		const sd_win_symbol_6 = scene.add.sprite(-1899, 763, "skin_texture2_level2", "VF.png");
		this.add(sd_win_symbol_6);

		// sd_win_symbol_7
		const sd_win_symbol_7 = scene.add.sprite(-1894, 897, "skin_texture2_level2", "ZF.png");
		this.add(sd_win_symbol_7);

		// sd_win_symbol_8
		const sd_win_symbol_8 = scene.add.sprite(-1903, 1030, "skin_texture2_level2", "BG.png");
		this.add(sd_win_symbol_8);

		// sd_win_symbol_9
		const sd_win_symbol_9 = scene.add.sprite(-1900, 1159, "skin_texture2_level2", "FG.png");
		this.add(sd_win_symbol_9);

		// free_symbol_0
		const free_symbol_0 = scene.add.sprite(-2940, -5, "skin_texture0_level0", "RI.png");
		this.add(free_symbol_0);

		// free_symbol_1
		const free_symbol_1 = scene.add.sprite(-2940, 78, "skin_texture0_level0", "SI.png");
		this.add(free_symbol_1);

		// free_symbol_2
		const free_symbol_2 = scene.add.sprite(-2940, 160, "skin_texture0_level0", "TI.png");
		this.add(free_symbol_2);

		// free_symbol_3
		const free_symbol_3 = scene.add.sprite(-2940, 242, "skin_texture0_level0", "UI.png");
		this.add(free_symbol_3);

		// free_symbol_4
		const free_symbol_4 = scene.add.sprite(-2940, 326, "skin_texture0_level0", "VI.png");
		this.add(free_symbol_4);

		// free_symbol_5
		const free_symbol_5 = scene.add.sprite(-2940, 408, "skin_texture0_level0", "WI.png");
		this.add(free_symbol_5);

		// free_symbol_6
		const free_symbol_6 = scene.add.sprite(-2940, 491, "skin_texture0_level0", "XI.png");
		this.add(free_symbol_6);

		// free_symbol_7
		const free_symbol_7 = scene.add.sprite(-2940, 576, "skin_texture0_level0", "YI.png");
		this.add(free_symbol_7);

		// free_symbol_8
		const free_symbol_8 = scene.add.sprite(-2940, 659, "skin_texture0_level0", "ZI.png");
		this.add(free_symbol_8);

		// sd_free_symbol_0
		const sd_free_symbol_0 = scene.add.sprite(-2795, -3, "skin_texture0_level2", "RI.png");
		this.add(sd_free_symbol_0);

		// sd_free_symbol_1
		const sd_free_symbol_1 = scene.add.sprite(-2795, 45, "skin_texture0_level2", "SI.png");
		this.add(sd_free_symbol_1);

		// sd_free_symbol_2
		const sd_free_symbol_2 = scene.add.sprite(-2795, 93, "skin_texture0_level2", "TI.png");
		this.add(sd_free_symbol_2);

		// sd_free_symbol_3
		const sd_free_symbol_3 = scene.add.sprite(-2795, 142, "skin_texture0_level2", "UI.png");
		this.add(sd_free_symbol_3);

		// sd_free_symbol_4
		const sd_free_symbol_4 = scene.add.sprite(-2795, 191, "skin_texture0_level2", "VI.png");
		this.add(sd_free_symbol_4);

		// sd_free_symbol_5
		const sd_free_symbol_5 = scene.add.sprite(-2795, 239, "skin_texture0_level2", "WI.png");
		sd_free_symbol_5.name = "sd_free_symbol_5";
		this.add(sd_free_symbol_5);

		// sd_free_symbol_6
		const sd_free_symbol_6 = scene.add.sprite(-2795, 285, "skin_texture0_level2", "XI.png");
		this.add(sd_free_symbol_6);

		// sd_free_symbol_7
		const sd_free_symbol_7 = scene.add.sprite(-2795, 332, "skin_texture0_level2", "YI.png");
		this.add(sd_free_symbol_7);

		// sd_free_symbol_8
		const sd_free_symbol_8 = scene.add.sprite(-2795, 381, "skin_texture0_level2", "ZI.png");
		this.add(sd_free_symbol_8);

		// lists
		const symbol_list = [symbol_0, symbol_1, symbol_2, symbol_3, symbol_4, symbol_5, symbol_6, symbol_7, symbol_8, symbol_9];
		const win_symbol_list = [win_symbol_0, win_symbol_1, win_symbol_2, win_symbol_3, win_symbol_4, win_symbol_5, win_symbol_6, win_symbol_7, win_symbol_8, win_symbol_9];
		const sd_symbol_list = [sd_symbol_0, sd_symbol_1, sd_symbol_2, sd_symbol_3, sd_symbol_4, sd_symbol_5, sd_symbol_6, sd_symbol_7, sd_symbol_8, sd_symbol_9];
		const sd_win_symbol_list = [sd_win_symbol_0, sd_win_symbol_1, sd_win_symbol_2, sd_win_symbol_3, sd_win_symbol_4, sd_win_symbol_5, sd_win_symbol_6, sd_win_symbol_7, sd_win_symbol_8, sd_win_symbol_9];
		const free_symbol_list = [free_symbol_0, free_symbol_1, free_symbol_2, free_symbol_3, free_symbol_4, free_symbol_5, free_symbol_6, free_symbol_7, free_symbol_8];
		const sd_free_symbol_list = [sd_free_symbol_0, sd_free_symbol_1, sd_free_symbol_2, sd_free_symbol_3, sd_free_symbol_4, sd_free_symbol_5, sd_free_symbol_6, sd_free_symbol_7, sd_free_symbol_8];

		this.symbol_list = symbol_list;
		this.win_symbol_list = win_symbol_list;
		this.sd_symbol_list = sd_symbol_list;
		this.sd_win_symbol_list = sd_win_symbol_list;
		this.free_symbol_list = free_symbol_list;
		this.sd_free_symbol_list = sd_free_symbol_list;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	public symbol_list: Phaser.GameObjects.Sprite[];
	public win_symbol_list: Phaser.GameObjects.Sprite[];
	public sd_symbol_list: Phaser.GameObjects.Sprite[];
	public sd_win_symbol_list: Phaser.GameObjects.Sprite[];
	public free_symbol_list: Phaser.GameObjects.Sprite[];
	public sd_free_symbol_list: Phaser.GameObjects.Sprite[];

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
