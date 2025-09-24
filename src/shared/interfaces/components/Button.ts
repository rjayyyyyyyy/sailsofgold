
// You can write more code here


/* START OF COMPILED CODE */

/* START-USER-IMPORTS */

/* END-USER-IMPORTS */

export default class Button extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 619, y ?? 259);

		// btnButton
		const btnButton = scene.add.sprite(0, 0, "menu_texture1_level0", "RB.png");
		btnButton.setInteractive(new Phaser.Geom.Rectangle(0, 0, 162, 67), Phaser.Geom.Rectangle.Contains);
		this.add(btnButton);

		// text_1
		const text_1 = scene.add.text(0, 0, "", {});
		text_1.setOrigin(0.5, 0.5);
		text_1.text = "New text";
		text_1.setStyle({ "fontFamily": "FLANKER_GRIFFO", "fontSize": "22px" });
		this.add(text_1);

		this.btnButton = btnButton;
		this.text_1 = text_1;

		/* START-USER-CTR-CODE */
		// Write your code here.

		setTimeout(() => {
			if(this.text != ""){
				console.log("Setting button text:", this.text);
				this.text_1.setText(scene.cache.json.get('language').texts[this.text] || this.text);
			}
			if(this.buttonSprite){
				btnButton.setTexture(this.buttonSprite.key, this.buttonSprite.frame)
			}

			if(this.event == 'spin'){
				text_1.setStyle({"fontSize": "38px"})
				const gradient = text_1.context.createLinearGradient(0, 0, 0, text_1.height);
				gradient.addColorStop(0, '#DDA339');
				gradient.addColorStop(.5, '#FBF2A5');
				gradient.addColorStop(.5, '#DDA339');
				gradient.addColorStop(1, '#FBF2A5');
				text_1.setFill(gradient)
			}
			else{
				let gradient = text_1.context.createLinearGradient(0, 0, 0, text_1.height);
				gradient.addColorStop(0, '#442B14');
				gradient.addColorStop(.5, '#6B4A17');
				gradient.addColorStop(1, '#442B14');
				text_1.setFill(gradient)
			}


			btnButton.on('pointerdown', () => {
				scene.tweens.add({
					targets: [btnButton, text_1],
					scale: 0.9,     // shrink a bit
					duration: 100,
					ease: 'Power2'
				});
			});
			['pointerup', 'pointerout'].forEach(event => {
				btnButton.on(event, () => {
					scene.tweens.add({
					targets: [btnButton, text_1],
					scale: 1,
					duration: 100,
					ease: 'Power2'
					});
				});
			});
		}, 0)
		/* END-USER-CTR-CODE */
	}

	public btnButton: Phaser.GameObjects.Sprite;
	private text_1: Phaser.GameObjects.Text;
	public text: string = "";
	public buttonSprite!: {key:string,frame?:string|number};
	public event: string = "";

	/* START-USER-CODE */

	setText(newText: string){
		this.text_1.setText(newText);
	}

	// Write your code here.
	update(){
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
