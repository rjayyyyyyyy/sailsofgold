
// You can write more code here

/* START OF COMPILED CODE */

import ReelPrefab from "../prefab/ReelPrefab";
/* START-USER-IMPORTS */
import { VideoSlotGameState } from "@games/videoslot/VideoSlotGameState";
import { container } from "@gl/di/container";
import VideoSlotReelsManager from "@games/videoslot/VideoSlotReelsManager";
import { FeatureAwardType } from "@gl/networking/FeatureType";
/* END-USER-IMPORTS */

export default class MobileScatterScene extends Phaser.Scene {

	constructor() {
		super("MobileScatterScene");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// reelPrefab
		const reelPrefab = new ReelPrefab(this, -348, 109);
		this.add.existing(reelPrefab);

		// animation
		const animation = this.add.sprite(360, 640, "skin_texture1_level2", "KH.png");

		// bgBook
		const bgBook = this.add.image(360, 640, "skin_texture1_level2", "JL.png");
		bgBook.scaleX = 0.2;
		bgBook.scaleY = 0.2;
		bgBook.visible = false;

		// imgDeco1
		const imgDeco1 = this.add.image(215, 450, "skin_texture1_level2", "KL.png");
		imgDeco1.visible = false;

		// imgDeco2
		const imgDeco2 = this.add.image(215, 725, "skin_texture1_level2", "KL.png");
		imgDeco2.visible = false;

		// imgDeco3
		const imgDeco3 = this.add.image(510, 450, "skin_texture1_level2", "KL.png");
		imgDeco3.flipX = true;
		imgDeco3.visible = false;

		// imgDeco4
		const imgDeco4 = this.add.image(510, 725, "skin_texture1_level2", "KL.png");
		imgDeco4.flipX = true;
		imgDeco4.visible = false;

		// selectedSymbol
		const selectedSymbol = this.add.sprite(215, 582, "skin_texture4_level2", "DF.png");
		selectedSymbol.visible = false;

		// txtCongrats
		const txtCongrats = this.add.text(510, 518, "", {});
		txtCongrats.setOrigin(0.5, 0.5);
		txtCongrats.visible = false;
		txtCongrats.text = "IDS_CONGRATULATIONS";
		txtCongrats.setStyle({ "align": "center", "color": "#5c2c17", "fontFamily": "ROBOTO_CONDENSED_BOLD", "fontSize": "18px" });

		// txtYouWon
		const txtYouWon = this.add.text(510, 590, "", {});
		txtYouWon.setOrigin(0.5, 0.5);
		txtYouWon.visible = false;
		txtYouWon.text = "IDS_X_FREESPINS";
		txtYouWon.setStyle({ "align": "center", "color": "#5c2c17", "fontFamily": "ROBOTO_CONDENSED_BOLD", "fontSize": "25px" });
		txtYouWon.setWordWrapWidth(150, true);

		// txtSpinBegin
		const txtSpinBegin = this.add.text(510, 668, "", {});
		txtSpinBegin.setOrigin(0.5, 0.5);
		txtSpinBegin.visible = false;
		txtSpinBegin.text = "IDS_PRESSPIN";
		txtSpinBegin.setStyle({ "align": "center", "color": "#5c2c17", "fontFamily": "ROBOTO_CONDENSED_BOLD" });

		// lists
		const bookContent = [imgDeco1, txtSpinBegin, txtYouWon, txtCongrats, selectedSymbol, imgDeco4, imgDeco3, imgDeco2];

		this.reelPrefab = reelPrefab;
		this.animation = animation;
		this.bgBook = bgBook;
		this.selectedSymbol = selectedSymbol;
		this.txtCongrats = txtCongrats;
		this.txtYouWon = txtYouWon;
		this.txtSpinBegin = txtSpinBegin;
		this.bookContent = bookContent;

		this.events.emit("scene-awake");
	}

	private reelPrefab!: ReelPrefab;
	private animation!: Phaser.GameObjects.Sprite;
	private bgBook!: Phaser.GameObjects.Image;
	private selectedSymbol!: Phaser.GameObjects.Sprite;
	private txtCongrats!: Phaser.GameObjects.Text;
	private txtYouWon!: Phaser.GameObjects.Text;
	private txtSpinBegin!: Phaser.GameObjects.Text;
	private bookContent!: Array<Phaser.GameObjects.Image|Phaser.GameObjects.Text|Phaser.GameObjects.Sprite>;

	/* START-USER-CODE */

	// Write your code here
	symbolList: SymbolTextureSet[];
	private GameState!: VideoSlotGameState;
	private ReelsManager!: VideoSlotReelsManager;

	init() {
		this.GameState = container.get<VideoSlotGameState>("VideoSlotGameState");
		this.ReelsManager = container.get<VideoSlotReelsManager>("VideoSlotReelsManager");
	}

	create() {
		this.scene.bringToTop();
		// this.editorCreate();
	}

	bookAnimation(target: Phaser.GameObjects.Sprite[]){
		this.animation.play("book-animation-sd");
		for(let i = 0; i < target.length; i++){
			const xTarget = target[i].x
			const yTarget = target[i].y
			this.tweens.add({
				targets: target[i],
				scaleX: 1,
				scaleY: 1,
				yoyo: true,
				repeat: 2,
				duration: 200,
				onComplete: () => {
					this.tweens.add({
						targets: target[i],
						x: (540 / 2) - target[i].parentContainer.x,
						y: (960 / 2) - target[i].parentContainer.y - 50,
						duration: 400,
						repeat: 0,
						delay: 800,
						ease: "Linear",
						onComplete: () => {
							target[i].x = xTarget;
							target[i].y = yTarget;
							this.editorCreate();
							this.setLocalizationText();
							this.animation.on('animationcomplete', (anim: Phaser.GameObjects.Sprite) => {
								// will fire every time an animation truly completes
								(this.animation as Phaser.GameObjects.Sprite).destroy();
								// anim.destroy();
								this.bgBook.setVisible(true)
								this.tweens.add({
									targets: this.bgBook,
									scale: {from: .2, to: 1},
									duration: 500,
									onComplete: () => {
										this.bookContent.forEach(value => {
											value.setVisible(true);
										})
										if(i === 0) this.addScatter();
									},
								})
							});
						}
					})
				}
			})
		}
	}

	addScatter(){
		//10, J, Q, K, A, Bird, Anubis, Pharaoh, Human
		this.reelPrefab.sd_symbol_list.forEach((sprite) => {
			this.symbolList.push([sprite.texture.key, sprite.frame.name]);
		});

		let repeatCounter = 0
		this.tweens.add({
			targets: this.selectedSymbol,
			duration: 150,
			alpha: { from: 0, to: 1, start: 1},
			repeat: 15,
			onRepeat: () => {
				repeatCounter++
				let randomNumber = Phaser.Math.RND.between(0, 8);
				const symbol = this.selectedSymbol;
				if(repeatCounter == 15){
					const winSymbol = (this.ReelsManager.scatterInfo.collections[FeatureAwardType.Feature]?.amount as number);
					const sym = this.symbolList[winSymbol]
					symbol.setTexture(sym[0], sym[1]);
					console.log(winSymbol)
					this.GameState.isSpinning.set(false)
					// Dispatcher.emit(ACTION_EVENTS.AUTO_SPIN_START, 'T4'+arraySymbols[winSymbol]+'B.png')

					// if(winSymbol) {
					// }
				}
				else{
					const sym = this.symbolList[randomNumber]
					symbol.setTexture(sym[0], sym[1]);
				}
			},
			onComplete: function()  {
				repeatCounter = 0
				// Option.checkClick = false;
			}
		})
	}

	paperScatter(){
		const paper = this.add.container(0, 0).setDepth(1)
		const backgroundBlack = this.add.rectangle(800, 450, 128, 128);
		backgroundBlack.setInteractive(new Phaser.Geom.Rectangle(0, 0, 128, 128), Phaser.Geom.Rectangle.Contains);
		backgroundBlack.scaleX = 12.5;
		backgroundBlack.scaleY = 7.8;
		backgroundBlack.isFilled = true;
		backgroundBlack.fillColor = 0;
		backgroundBlack.fillAlpha = 0.5;
		// jH_png
		const jH_png = this.add.image(270, 395, "skin_texture0_level2", "JH.png");

		// aJ_png
		const aJ_png = this.add.image(90, 395, "skin_texture0_level2", "AJ.png");

		// bJ_png
		const bJ_png = this.add.image(450, 395, "skin_texture0_level2", "BJ.png");

		// txtTotalWinText
		const txtTotalWinText = this.add.text(270, 330, "", {});
		txtTotalWinText.setOrigin(0.5, 0.5);
		txtTotalWinText.text = this.cache.json.get('language').texts["IDS_TOTALWIN"];
		txtTotalWinText.setStyle({ "color": "#582c15", "fontFamily": "ROBOTO-CONDENSED-BOLD", "fontSize": "30px" });

		// txtTotalWinValue
		const txtTotalWinValue = this.add.text(270, 370, "", {});
		txtTotalWinValue.setOrigin(0.5, 0.5);
		txtTotalWinValue.text = this.GameState.winCoins.get().toString();
		txtTotalWinValue.setStyle({ "color": "#582c15", "fontFamily": "ROBOTO-CONDENSED-BOLD", "fontSize": "50px" });

		paper.add([
			backgroundBlack,
			jH_png,
			aJ_png,
			bJ_png,
			txtTotalWinText,
			txtTotalWinValue
		])

		this.tweens.add({
			targets: paper,
			alpha: { from: 0, to: 1, start: 0 },
			duration: 500,
			hold: 3000,
			onComplete: () => {
				this.tweens.add({
					targets: paper,
					alpha: { from: 1, to: 0, start: 1 },
					duration: 500,
					onComplete: () => {
						paper.destroy();
						this.GameState.isEndScatter.set(true);
					}
				})
			}
		})
	}

	setLocalizationText(){
		this.txtCongrats.setText(this.cache.json.get('language').texts[this.txtCongrats.text])
		this.txtYouWon.setText(this.cache.json.get('language').texts[this.txtYouWon.text].replace("%d", "10"))
		this.txtSpinBegin.setText(this.cache.json.get('language').texts[this.txtSpinBegin.text])
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
