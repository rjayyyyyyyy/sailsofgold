
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

		// txtButton
		const txtButton = scene.add.text(0, 0, "", {});
		txtButton.scaleX = 0.5;
		txtButton.scaleY = 0.5;
		txtButton.setOrigin(0.5, 0.5);
		txtButton.text = "New text";
		txtButton.setStyle({ "fontFamily": "FLANKER_GRIFFO", "fontSize": "35px" });
		this.add(txtButton);

		this.btnButton = btnButton;
		this.txtButton = txtButton;

		/* START-USER-CTR-CODE */
		// Write your code here.

		setTimeout(() => {
			if(this.text != ""){
				console.log("Setting button text:", this.text);
				this.txtButton.setText(scene.cache.json.get('language').texts[this.text] || this.text);
			}
			if(this.buttonSprite){
				btnButton.setTexture(this.buttonSprite.key, this.buttonSprite.frame)
			}


			btnButton.on('pointerdown', () => {
				scene.tweens.add({
					targets: [txtButton],
					scale: 0.45,     // shrink a bit
					duration: 100,
					ease: 'Power2'
				});
				scene.tweens.add({
					targets: [btnButton],
					scale: .9,     // shrink a bit
					duration: 100,
					ease: 'Power2'
				});
			});
			['pointerup', 'pointerout'].forEach(event => {
				btnButton.on(event, () => {
					scene.tweens.add({
					targets: [txtButton],
					scale: .5,
					duration: 100,
					ease: 'Power2'
					});
					scene.tweens.add({
					targets: [btnButton],
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
	public txtButton: Phaser.GameObjects.Text;
	public text: string = "";
	public buttonSprite!: {key:string,frame?:string|number};
	public event: string = "";

	/* START-USER-CODE */

	setText(newText: string){
		this.txtButton.setText(newText);
	}

	// Write your code here.
	update(){
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
