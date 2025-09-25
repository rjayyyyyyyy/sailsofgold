
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class BetPrefab extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 15, y ?? 30);

		// bgBet
		const bgBet = scene.add.image(85, 0, "menu_texture0_level0", "CB.png");
		this.add(bgBet);

		// btnDecrease
		const btnDecrease = scene.add.sprite(10, 0, "menu_texture1_level0", "VB.png");
		btnDecrease.setInteractive(this.scene.input.makePixelPerfect());
		this.add(btnDecrease);

		// btnIncrease
		const btnIncrease = scene.add.sprite(160, 0, "menu_texture1_level0", "TB.png");
		btnIncrease.setInteractive(this.scene.input.makePixelPerfect());
		this.add(btnIncrease);

		// txtBetTitle
		const txtBetTitle = scene.add.text(85, -12, "", {});
		txtBetTitle.scaleX = 0.5;
		txtBetTitle.scaleY = 0.5;
		txtBetTitle.setOrigin(0.5, 0.5);
		txtBetTitle.text = "COINS";
		txtBetTitle.setStyle({ "color": "#F7EDA1", "fontFamily": "FLANKER_GRIFFO", "fontSize": "32px" });
		this.add(txtBetTitle);

		// txtBetValue
		const txtBetValue = scene.add.text(85, 10, "", {});
		txtBetValue.scaleX = 0.5;
		txtBetValue.scaleY = 0.5;
		txtBetValue.setOrigin(0.5, 0.5);
		txtBetValue.text = "1";
		txtBetValue.setStyle({ "color": "#F7EDA1", "fontFamily": "FLANKER_GRIFFO", "fontSize": "52px" });
		this.add(txtBetValue);

		this.bgBet = bgBet;
		this.btnDecrease = btnDecrease;
		this.btnIncrease = btnIncrease;
		this.txtBetTitle = txtBetTitle;
		this.txtBetValue = txtBetValue;

		/* START-USER-CTR-CODE */
		// Write your code here.
		setTimeout(() => {
			if(this.title != ""){
				console.log("Setting title text:", this.title);
				this.txtBetTitle.setText(scene.cache.json.get('language').texts[this.title] || this.title);
			}
			if(this.value != 0){
				console.log("Setting value text:", this.value);
				this.txtBetTitle.setText(this.value.toString());
			}
		}, 100);

		btnDecrease.on('pointerdown', () => {
			addButtonTween(this.scene, btnDecrease)
		});

		btnIncrease.on('pointerdown', () => {
			addButtonTween(this.scene, btnIncrease)
		});
			/* END-USER-CTR-CODE */
	}

	private bgBet: Phaser.GameObjects.Image;
	public btnDecrease: Phaser.GameObjects.Sprite;
	public btnIncrease: Phaser.GameObjects.Sprite;
	private txtBetTitle: Phaser.GameObjects.Text;
	public txtBetValue: Phaser.GameObjects.Text;
	public title: string = "";
	public value: number = 0;

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here

function addButtonTween(scene: Phaser.Scene, sprite: Phaser.GameObjects.Sprite, text: Phaser.GameObjects.Text[] = []) {
	const targets = [sprite, ...text] as Phaser.GameObjects.GameObject[];

	const playTween = (scale: number) => {
		scene.tweens.add({
		targets,
		scale,
		duration: 100,
		ease: "Power2"
		});
	};

	sprite.on("pointerdown", () => playTween(0.9));
	["pointerup", "pointerout"].forEach(evt => sprite.on(evt, () => playTween(1)));
}
