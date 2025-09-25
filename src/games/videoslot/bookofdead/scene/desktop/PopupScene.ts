
// You can write more code here

import { VideoSlotGameState } from "@games/videoslot/VideoSlotGameState";
import { container } from "@gl/di/container";

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class PopupScene extends Phaser.Scene {

	constructor() {
		super("PopupScene");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// backgroundBlack
		const backgroundBlack = this.add.rectangle(640, 360, 128, 128);
		backgroundBlack.scaleX = 13;
		backgroundBlack.scaleY = 8;
		backgroundBlack.isFilled = true;
		backgroundBlack.fillColor = 0;
		backgroundBlack.fillAlpha = 0.5;

		// fB_png
		const fB_png = this.add.image(640, 360, "videoslot_popup_texture0_level0", "FB.png");
		fB_png.scaleX = 0.8;
		fB_png.scaleY = 0.8;

		// txtTitleTimeout
		const txtTitleTimeout = this.add.text(640, 236, "", {});
		txtTitleTimeout.scaleX = 0.4;
		txtTitleTimeout.scaleY = 0.5;
		txtTitleTimeout.setOrigin(0.5, 0.5);
		txtTitleTimeout.text = "IDS_SERVER_NOSESSION";
		txtTitleTimeout.setStyle({ "align": "center", "color": "#EBB122", "fontFamily": "ROBOTO-CONDENSED-BOLD", "fontSize": "48px", "fontStyle": "bold" });

		// txtTimeout
		const txtTimeout = this.add.text(640, 359, "", {});
		txtTimeout.scaleX = 0.4;
		txtTimeout.scaleY = 0.5;
		txtTimeout.setOrigin(0.5, 0.5);
		txtTimeout.text = "IDS_SERVER_NOSESSIONTEXT";
		txtTimeout.setStyle({ "align": "center", "color": "#ffffff", "fontFamily": "ROBOTO-CONDENSED-REGULAR", "fontSize": "36px" });
		txtTimeout.setWordWrapWidth(850, true);

		// btnExit
		const btnExit = this.add.image(639, 485, "videoslot_popup_texture0_level0", "OB.png");
		btnExit.scaleX = 0.8;
		btnExit.scaleY = 0.8;

		// txtExit
		const txtExit = this.add.text(640, 485, "", {});
		txtExit.scaleX = 0.5;
		txtExit.scaleY = 0.5;
		txtExit.setOrigin(0.5, 0.5);
		txtExit.text = "IDS_BTN_EXIT";
		txtExit.setStyle({ "align": "center", "fontFamily": "ROBOTO-CONDENSED-BOLD", "fontSize": "32px" });

		this.txtTitleTimeout = txtTitleTimeout;
		this.txtTimeout = txtTimeout;
		this.btnExit = btnExit;
		this.txtExit = txtExit;

		this.events.emit("scene-awake");
	}

	private txtTitleTimeout!: Phaser.GameObjects.Text;
	private txtTimeout!: Phaser.GameObjects.Text;
	private btnExit!: Phaser.GameObjects.Image;
	private txtExit!: Phaser.GameObjects.Text;

	/* START-USER-CODE */

	// Write your code here
	private GameState!: VideoSlotGameState;

	init() {
		this.GameState = container.get<VideoSlotGameState>("VideoSlotGameState");
	}

	create() {

		this.scene.bringToTop();
		this.editorCreate();
		this.txtTitleTimeout.setText(this.cache.json.get('language').texts[this.txtTitleTimeout.text])
		this.txtTimeout.setText(this.cache.json.get('language').texts[this.txtTimeout.text])
		this.btnExit.on('pointerdown', () => {
			window.location.reload();
			this.tweens.add({
				targets: [this.btnExit],
				scale: .9,
				duration: 100,
				ease: 'Power2'
			});
		});
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
