
// You can write more code here

import { SymbolTextureSet } from "@games/videoslot/components/Reels";
import { VideoSlotGameState } from "@games/videoslot/VideoSlotGameState";
import VideoSlotReelsManager from "@games/videoslot/VideoSlotReelsManager";
import { container } from "@gl/di/container";
import { FeatureAwardType } from "@gl/networking/FeatureType";

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class ScatterScene extends Phaser.Scene {

	constructor() {
		super("ScatterScene");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// animation
		const animation = this.add.sprite(640, 360, "skin_texture1_level0", "KH.png");
		animation.scaleX = 0.8;
		animation.scaleY = 0.8;

		// bgBook
		const bgBook = this.add.image(640, 360, "skin_texture1_level0", "JL.png");
		bgBook.scaleX = 0.15;
		bgBook.scaleY = 0.15;
		bgBook.visible = false;

		// imgDeco1
		const imgDeco1 = this.add.image(435, 100, "skin_texture1_level0", "KL.png");
		imgDeco1.scaleX = 0.8;
		imgDeco1.scaleY = 0.8;
		imgDeco1.visible = false;

		// imgDeco2
		const imgDeco2 = this.add.image(435, 475, "skin_texture1_level0", "KL.png");
		imgDeco2.scaleX = 0.8;
		imgDeco2.scaleY = 0.8;
		imgDeco2.visible = false;

		// imgDeco3
		const imgDeco3 = this.add.image(855, 100, "skin_texture1_level0", "KL.png");
		imgDeco3.scaleX = 0.8;
		imgDeco3.scaleY = 0.8;
		imgDeco3.flipX = true;
		imgDeco3.visible = false;

		// imgDeco4
		const imgDeco4 = this.add.image(855, 475, "skin_texture1_level0", "KL.png");
		imgDeco4.scaleX = 0.8;
		imgDeco4.scaleY = 0.8;
		imgDeco4.flipX = true;
		imgDeco4.visible = false;

		// selectedSymbol
		const selectedSymbol = this.add.sprite(435, 290, "skin_texture4_level0", "DF.png");
		selectedSymbol.scaleX = 0.8;
		selectedSymbol.scaleY = 0.8;
		selectedSymbol.visible = false;

		// txtCongrats
		const txtCongrats = this.add.text(855, 192, "", {});
		txtCongrats.setOrigin(0.5, 0.5);
		txtCongrats.visible = false;
		txtCongrats.text = "IDS_CONGRATULATIONS";
		txtCongrats.setStyle({ "align": "center", "color": "#5c2c17", "fontFamily": "ROBOTO_CONDENSED_BOLD", "fontSize": "22px" });

		// txtYouWon
		const txtYouWon = this.add.text(855, 302, "", {});
		txtYouWon.setOrigin(0.5, 0.5);
		txtYouWon.visible = false;
		txtYouWon.text = "IDS_X_FREESPINS";
		txtYouWon.setStyle({ "align": "center", "color": "#5c2c17", "fontFamily": "ROBOTO_CONDENSED_BOLD", "fontSize": "40px" });
		txtYouWon.setWordWrapWidth(300, true);

		// txtSpinBegin
		const txtSpinBegin = this.add.text(855, 401, "", {});
		txtSpinBegin.setOrigin(0.5, 0.5);
		txtSpinBegin.visible = false;
		txtSpinBegin.text = "IDS_PRESSPIN";
		txtSpinBegin.setStyle({ "align": "center", "color": "#5c2c17", "fontFamily": "ROBOTO_CONDENSED_BOLD", "fontSize": "22px" });

		// lists
		const bookContent = [imgDeco1, txtSpinBegin, txtYouWon, txtCongrats, selectedSymbol, imgDeco4, imgDeco3, imgDeco2];
		const endScatter: Array<any> = [];

		this.animation = animation;
		this.bgBook = bgBook;
		this.imgDeco1 = imgDeco1;
		this.imgDeco2 = imgDeco2;
		this.imgDeco3 = imgDeco3;
		this.imgDeco4 = imgDeco4;
		this.selectedSymbol = selectedSymbol;
		this.txtCongrats = txtCongrats;
		this.txtYouWon = txtYouWon;
		this.txtSpinBegin = txtSpinBegin;
		this.bookContent = bookContent;
		this.endScatter = endScatter;

		this.events.emit("scene-awake");
	}

	private animation!: Phaser.GameObjects.Sprite;
	private bgBook!: Phaser.GameObjects.Image;
	private imgDeco1!: Phaser.GameObjects.Image;
	private imgDeco2!: Phaser.GameObjects.Image;
	private imgDeco3!: Phaser.GameObjects.Image;
	private imgDeco4!: Phaser.GameObjects.Image;
	private selectedSymbol!: Phaser.GameObjects.Sprite;
	private txtCongrats!: Phaser.GameObjects.Text;
	private txtYouWon!: Phaser.GameObjects.Text;
	private txtSpinBegin!: Phaser.GameObjects.Text;
	private bookContent!: Array<Phaser.GameObjects.Image|Phaser.GameObjects.Text|Phaser.GameObjects.Sprite>;
	private endScatter!: Array<any>;

	/* START-USER-CODE */

	// Write your code here
	private GameState!: VideoSlotGameState;
	private ReelsManager!: VideoSlotReelsManager;
	symbolList: SymbolTextureSet[];

	init() {
		this.GameState = container.get<VideoSlotGameState>('VideoSlotGameState');
		this.ReelsManager = container.get<VideoSlotReelsManager>('VideoSlotReelsManager');
	}

	create() {

		this.scene.bringToTop();
		// this.editorCreate();
	}

	bookAnimation(target: Phaser.GameObjects.Sprite[]){
		this.animation.play('bookAnimation');
		for(let i = 0; i < target.length; i++){
			const xTarget = target[i].x
			const yTarget = target[i].y
			this.tweens.add({
				targets: target[i],
                scaleX: 1.2,
                scaleY: 1.2,
                yoyo: true,
                repeat: 2,
                duration: 200,
				onComplete: () => {
					this.tweens.add({
						targets: target[i],
                        x: (this.scale.width / 2) - target[i].parentContainer.x,
                        y: (this.scale.height / 2) - target[i].parentContainer.y,
                        duration: 400,
                        repeat: 0,
                        delay: 800,
                        ease: "Linear",
						onComplete: () => {
							target[i].x = xTarget;
                            target[i].y = yTarget;
							this.editorCreate();

							this.txtCongrats.setText(this.cache.json.get('language').texts[this.txtCongrats.text])
							this.txtYouWon.setText(this.cache.json.get('language').texts[this.txtYouWon.text].replace("%d", "10"))
							this.txtSpinBegin.setText(this.cache.json.get('language').texts[this.txtSpinBegin.text])

							this.animation.on('animationcomplete', (anim: Phaser.GameObjects.Sprite) => {
								// will fire every time an animation truly completes
								(this.animation as Phaser.GameObjects.Sprite).destroy();
								// anim.destroy();
								this.bgBook.setVisible(true)
								this.tweens.add({
									targets: this.bgBook,
									scale: {from: .15, to: .8},
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
		// 10, J, Q, K, A, Bird, Anubis, Pharaoh, Human
		/*this.reelPrefab.symbol_list.forEach((sprite) => {
			this.symbolList.push([sprite.texture.key, sprite.frame.name]);
		});*/

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
					/*const sym = this.symbolList[randomNumber]
					symbol.setTexture(sym[0], sym[1]);*/
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
		const jH_png = this.add.image(800, 450, "skin_texture0_level0", "JH.png");

		// aJ_png
		const aJ_png = this.add.image(500, 450, "skin_texture0_level0", "AJ.png");

		// bJ_png
		const bJ_png = this.add.image(1100, 450, "skin_texture0_level0", "BJ.png");

		// txtTotalWinText
		const txtTotalWinText = this.add.text(800, 350, "", {});
		txtTotalWinText.setOrigin(0.5, 0.5);
		txtTotalWinText.text = this.cache.json.get('language').texts["IDS_TOTALWIN"];
		txtTotalWinText.setStyle({ "color": "#582c15", "fontFamily": "ROBOTO-CONDENSED-BOLD", "fontSize": "40px" });

		// txtTotalWinValue
		const txtTotalWinValue = this.add.text(800, 410, "", {});
		txtTotalWinValue.setOrigin(0.5, 0.5);
		txtTotalWinValue.text = this.GameState.winCoins.get().toString();
		txtTotalWinValue.setStyle({ "color": "#582c15", "fontFamily": "ROBOTO-CONDENSED-BOLD", "fontSize": "60px" });

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
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
