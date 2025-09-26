
// You can write more code here

import { VideoSlotGameState } from "@games/videoslot/VideoSlotGameState";
import { container } from "@gl/di/container";

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class MobilePopupScene extends Phaser.Scene {

	constructor() {
		super("MobilePopupScene");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// backgroundBlack
		const backgroundBlack = this.add.rectangle(360, 640, 128, 128);
		backgroundBlack.scaleX = 5.9;
		backgroundBlack.scaleY = 10.5;
		backgroundBlack.isFilled = true;
		backgroundBlack.fillColor = 0;
		backgroundBlack.fillAlpha = 0.5;

		// fB_png
		this.add.image(360, 640, "videoslot_popup_texture0_level2", "FB.png");

		// txtTitleTimeout
		const txtTitleTimeout = this.add.text(360, 548, "", {});
		txtTitleTimeout.scaleX = 0.4;
		txtTitleTimeout.scaleY = 0.5;
		txtTitleTimeout.setOrigin(0.5, 0.5);
		txtTitleTimeout.text = "IDS_SERVER_NOSESSION";
		txtTitleTimeout.setStyle({ "align": "center", "color": "#EBB122", "fontFamily": "ROBOTO-CONDENSED-BOLD", "fontSize": "48px", "fontStyle": "bold" });

		// txtTimeout
		const txtTimeout = this.add.text(360, 633, "", {});
		txtTimeout.scaleX = 0.4;
		txtTimeout.scaleY = 0.5;
		txtTimeout.setOrigin(0.5, 0.5);
		txtTimeout.text = "IDS_SERVER_NOSESSIONTEXT";
		txtTimeout.setStyle({ "align": "center", "fontFamily": "ROBOTO-CONDENSED-REGULAR", "fontSize": "28px" });
		txtTimeout.setWordWrapWidth(550, true);

		// btnExit
		const btnExit = this.add.image(360, 730, "videoslot_popup_texture0_level2", "OB.png");

		// txtExit
		const txtExit = this.add.text(360, 730, "", {});
		txtExit.scaleX = 0.5;
		txtExit.scaleY = 0.5;
		txtExit.setOrigin(0.5, 0.5);
		txtExit.text = "IDS_BTN_EXIT";
		txtExit.setStyle({ "align": "center", "fontFamily": "ROBOTO-CONDENSED-BOLD", "fontSize": "20px" });

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
