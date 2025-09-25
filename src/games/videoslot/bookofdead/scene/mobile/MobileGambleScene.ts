
// You can write more code here

import { VideoSlotGameState } from "@games/videoslot/VideoSlotGameState";

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import { container } from "@gl/di/container";
import { CardValue, ClientCardPicked } from "../../types/gamble";
/* END-USER-IMPORTS */

export default class MobileGambleScene extends Phaser.Scene {

	constructor() {
		super("MobileGambleScene");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// aF_png
		this.add.image(360, 560, "skin_texture3_level2", "AF.png");

		// txtInformation
		const txtInformation = this.add.text(361, 448, "", {});
		txtInformation.setOrigin(0.5, 0.5);
		txtInformation.text = "IDS_VP_BONUS2";
		txtInformation.setStyle({ "color": "#FFF59F", "fontFamily": "ROBOTO_CONDENSED_REGULAR" });

		// txtColorpays
		const txtColorpays = this.add.text(197, 479, "", {});
		txtColorpays.setOrigin(0.5, 0.5);
		txtColorpays.text = "IDS_COLORPAYS";
		txtColorpays.setStyle({ "color": "#FFF59F", "fontFamily": "ROBOTO_CONDENSED_REGULAR", "fontSize": "12px" });

		// txtSuitpays
		const txtSuitpays = this.add.text(525, 480, "", {});
		txtSuitpays.setOrigin(0.5, 0.5);
		txtSuitpays.text = "IDS_SUITPAYS";
		txtSuitpays.setStyle({ "color": "#FFF59F", "fontFamily": "ROBOTO_CONDENSED_REGULAR", "fontSize": "12px" });

		// txtColorpaysValue
		const txtColorpaysValue = this.add.text(197, 507, "", {});
		txtColorpaysValue.setOrigin(0.5, 0.5);
		txtColorpaysValue.text = "0";
		txtColorpaysValue.setStyle({ "color": "#FFF59F", "fontFamily": "ROBOTO_CONDENSED_REGULAR" });

		// txtSuitpaysValue
		const txtSuitpaysValue = this.add.text(525, 507, "", {});
		txtSuitpaysValue.setOrigin(0.5, 0.5);
		txtSuitpaysValue.text = "0";
		txtSuitpaysValue.setStyle({ "color": "#FFF59F", "fontFamily": "ROBOTO_CONDENSED_REGULAR" });

		// txtPrevCard
		const txtPrevCard = this.add.text(175, 672, "", {});
		txtPrevCard.setOrigin(0, 0.5);
		txtPrevCard.text = "IDS_PREVIOUSCARDS";
		txtPrevCard.setStyle({ "color": "#FFF59F", "fontFamily": "ROBOTO_CONDENSED_REGULAR" });

		// btnRed
		const btnRed = this.add.sprite(197, 561, "skin_texture3_level2", "II.png");
		btnRed.setInteractive(new Phaser.Geom.Rectangle(0, 0, 217, 96), Phaser.Geom.Rectangle.Contains);

		// txtRed
		const txtRed = this.add.text(197, 561, "", {});
		txtRed.setOrigin(0.5, 0.5);
		txtRed.text = "IDS_INFO_RED";
		txtRed.setStyle({ "color": "#FFF59F", "fontFamily": "ROBOTO_CONDENSED_REGULAR" });

		// btnBlack
		const btnBlack = this.add.sprite(197, 616, "skin_texture3_level2", "GI.png");
		btnBlack.setInteractive(new Phaser.Geom.Rectangle(0, 0, 217, 96), Phaser.Geom.Rectangle.Contains);

		// txtBlack
		const txtBlack = this.add.text(197, 616, "", {});
		txtBlack.setOrigin(0.5, 0.5);
		txtBlack.text = "IDS_INFO_BLACK";
		txtBlack.setStyle({ "color": "#FFF59F", "fontFamily": "ROBOTO_CONDENSED_REGULAR" });

		// cardReveal
		const cardReveal = this.add.sprite(360, 560, "skin_texture3_level2", "PG.png");

		// btnHeart
		const btnHeart = this.add.sprite(495, 562, "skin_texture3_level2", "OG.png");
		btnHeart.setInteractive(new Phaser.Geom.Rectangle(0, 0, 97, 98), Phaser.Geom.Rectangle.Contains);

		// btnDiamond
		const btnDiamond = this.add.sprite(555, 562, "skin_texture3_level2", "NG.png");
		btnDiamond.setInteractive(new Phaser.Geom.Rectangle(0, 0, 97, 98), Phaser.Geom.Rectangle.Contains);

		// btnClub
		const btnClub = this.add.sprite(495, 617, "skin_texture3_level2", "MG.png");
		btnClub.setInteractive(new Phaser.Geom.Rectangle(0, 0, 97, 98), Phaser.Geom.Rectangle.Contains);

		// btnSpade
		const btnSpade = this.add.sprite(555, 617, "skin_texture3_level2", "LG.png");
		btnSpade.setInteractive(new Phaser.Geom.Rectangle(0, 0, 97, 98), Phaser.Geom.Rectangle.Contains);

		this.txtInformation = txtInformation;
		this.txtColorpays = txtColorpays;
		this.txtSuitpays = txtSuitpays;
		this.txtColorpaysValue = txtColorpaysValue;
		this.txtSuitpaysValue = txtSuitpaysValue;
		this.txtPrevCard = txtPrevCard;
		this.btnRed = btnRed;
		this.txtRed = txtRed;
		this.btnBlack = btnBlack;
		this.txtBlack = txtBlack;
		this.cardReveal = cardReveal;
		this.btnHeart = btnHeart;
		this.btnDiamond = btnDiamond;
		this.btnClub = btnClub;
		this.btnSpade = btnSpade;

		this.events.emit("scene-awake");
	}

	private txtInformation!: Phaser.GameObjects.Text;
	private txtColorpays!: Phaser.GameObjects.Text;
	private txtSuitpays!: Phaser.GameObjects.Text;
	private txtColorpaysValue!: Phaser.GameObjects.Text;
	private txtSuitpaysValue!: Phaser.GameObjects.Text;
	private txtPrevCard!: Phaser.GameObjects.Text;
	private btnRed!: Phaser.GameObjects.Sprite;
	private txtRed!: Phaser.GameObjects.Text;
	private btnBlack!: Phaser.GameObjects.Sprite;
	private txtBlack!: Phaser.GameObjects.Text;
	private cardReveal!: Phaser.GameObjects.Sprite;
	private btnHeart!: Phaser.GameObjects.Sprite;
	private btnDiamond!: Phaser.GameObjects.Sprite;
	private btnClub!: Phaser.GameObjects.Sprite;
	private btnSpade!: Phaser.GameObjects.Sprite;

	/* START-USER-CODE */

	// Write your code here
	private	gameState!: VideoSlotGameState;
	private toggleVfx!: Phaser.Tweens.Tween;
	private largeCard!: Phaser.GameObjects.Sprite;
	private smallCard!: Phaser.GameObjects.Sprite;
	private asCard!: Phaser.GameObjects.Sprite;
	private prevCard!: string;

	init() {
		this.gameState = container.get<VideoSlotGameState>('VideoSlotGameState');
	}

	create() {

		this.scene.bringToTop();
		this.editorCreate();
		this.txtInformation.setText(this.cache.json.get('language').texts['IDS_VP_BONUS2']);
		this.txtColorpays.setText(this.cache.json.get('language').texts['IDS_COLORPAYS']);
		this.txtSuitpays.setText(this.cache.json.get('language').texts['IDS_SUITPAYS']);
		this.txtRed.setText(this.cache.json.get('language').texts['IDS_INFO_RED']);
		this.txtBlack.setText(this.cache.json.get('language').texts['IDS_INFO_BLACK']);
		this.txtPrevCard.setText(this.cache.json.get('language').texts['IDS_PREVIOUSCARDS']);

		const coinsWon = this.gameState.winCoins.get();
		this.txtColorpaysValue.setText((coinsWon * 2).toString());
		this.txtSuitpaysValue.setText((coinsWon * 4).toString());
		
		this.btnRed.on('pointerdown', () =>{
			this.pickCards(ClientCardPicked.Red)
			this.addButtonTween(this.btnRed, [this.txtRed]);
		});

		this.btnBlack.on('pointerdown', () =>{
			this.pickCards(ClientCardPicked.Black)
			this.addButtonTween(this.btnBlack, [this.txtBlack]);
		});

		this.btnHeart.on('pointerdown', () =>{
			this.pickCards(ClientCardPicked.Hearts)
			this.addButtonTween(this.btnHeart);
		});

		this.btnDiamond.on('pointerdown', () =>{
			this.pickCards(ClientCardPicked.Diamonds)
			this.addButtonTween(this.btnDiamond);
		});

		this.btnClub.on('pointerdown', () =>{
			this.pickCards(ClientCardPicked.Clubs)
			this.addButtonTween(this.btnClub);
		});

		this.btnSpade.on('pointerdown', () =>{
			this.pickCards(ClientCardPicked.Spades)
			this.addButtonTween(this.btnSpade);
		});

		this.toggleEffect();
	}

	pickCards(picked: number){
		this.gameState.playerPick.set(picked);
		this.btnRed.setTexture('skin_texture3_level2', 'HI.png');
		this.btnBlack.setTexture('skin_texture3_level2', 'FI.png');
		this.btnHeart.setTexture('skin_texture3_level2', 'EI.png');
		this.btnDiamond.setTexture('skin_texture3_level2', 'DI.png');
		this.btnSpade.setTexture('skin_texture3_level2', 'BI.png');
		this.btnClub.setTexture('skin_texture3_level2', 'CI.png');
		switch(picked){
			case ClientCardPicked.Red:
				this.btnRed.setTexture('skin_texture3_level2', 'II.png')
				break;

			case ClientCardPicked.Black:
				this.btnBlack.setTexture('skin_texture3_level2', 'GI.png')
				break;

			case ClientCardPicked.Hearts:
				this.btnHeart.setTexture('skin_texture3_level2', 'OG.png')
				break;

			case ClientCardPicked.Diamonds:
				this.btnDiamond.setTexture('skin_texture3_level2', 'NG.png')
				break;

			case ClientCardPicked.Spades:
				this.btnSpade.setTexture('skin_texture3_level2', 'LG.png')
				break;

			case ClientCardPicked.Clubs:
				this.btnClub.setTexture('skin_texture3_level2', 'MG.png')
				break;
		}
		if(this.toggleVfx) this.toggleVfx.destroy();

		// Card Animation
		if(this.cardReveal){
			this.cardReveal.destroy();
		}
		if(this.largeCard){
			this.largeCard.destroy()
			this.smallCard.destroy()
			this.asCard.destroy()
			this.prevCard = ''
		}
		this.cardReveal = this.add.sprite(360, 560, "skin_texture3_level2", "PG.png");
		this.cardReveal.play("card_animation");
		this.cardReveal.on('animationstart', () => {
			this.btnRed.disableInteractive()
			this.btnBlack.disableInteractive()
			this.btnHeart.disableInteractive()
			this.btnDiamond.disableInteractive()
			this.btnClub.disableInteractive()
			this.btnSpade.disableInteractive()
		})
		this.cardReveal.on('animationcomplete', () => {
			switch(this.gameState.winCard.get()){
				case CardValue.Clubs:
					console.log('clubs')
					this.largeCard = this.add.sprite(373 , 593, 'skin_texture3_level2', 'KI.png').setScale(.7).setDepth(2)
					this.smallCard = this.add.sprite(330 , 540, 'skin_texture3_level2', 'KI.png').setScale(.25).setDepth(2)
					this.asCard = this.add.sprite(330 , 515, 'skin_texture3_level2', 'OI.png').setScale(1).setDepth(2)
					this.prevCard = 'MG.png'
				break;

				case CardValue.Diamonds:
					console.log('diamonds')
					this.largeCard = this.add.sprite(373 , 593, 'skin_texture3_level2', 'LI.png').setScale(.7).setDepth(2)
					this.smallCard = this.add.sprite(330 , 540, 'skin_texture3_level2', 'LI.png').setScale(.25).setDepth(2)
					this.asCard = this.add.sprite(330 , 515, 'skin_texture3_level2', 'PI.png').setScale(1).setDepth(2)
					this.prevCard = 'NG.png'
				break;

				case CardValue.Hearts:
					console.log('hearts')
					this.largeCard = this.add.sprite(373 , 593, 'skin_texture3_level2', 'NI.png').setScale(.7).setDepth(2)
					this.smallCard = this.add.sprite(330 , 540, 'skin_texture3_level2', 'NI.png').setScale(.25).setDepth(2)
					this.asCard = this.add.sprite(330 , 515, 'skin_texture3_level2', 'PI.png').setScale(1).setDepth(2)
					this.prevCard = 'OG.png'
				break;

				case CardValue.Spades:
					console.log('spades')
					this.largeCard = this.add.sprite(373 , 593, 'skin_texture3_level2', 'MI.png').setScale(.7).setDepth(2)
					this.smallCard = this.add.sprite(330 , 540, 'skin_texture3_level2', 'MI.png').setScale(.25).setDepth(2)
					this.asCard = this.add.sprite(330 , 515, 'skin_texture3_level2', 'OI.png').setScale(1).setDepth(2)
					this.prevCard = 'LG.png'
				break; 
			}

			const coinsWon = this.gameState.winCoins.get();
			if(coinsWon != 0){
				this.txtColorpaysValue.setText('' + coinsWon * 2)
				this.txtSuitpaysValue.setText('' + coinsWon * 4)

				this.btnHeart.setTexture('skin_texture3_level2', 'OG.png')
				this.btnDiamond.setTexture('skin_texture3_level2', 'NG.png')
				this.btnClub.setTexture('skin_texture3_level2', 'MG.png')
				this.btnSpade.setTexture('skin_texture3_level2', 'LG.png')
				this.btnRed.setTexture('skin_texture3_level2', 'II.png')
				this.btnBlack.setTexture('skin_texture3_level2', 'GI.png')
				this.txtInformation.setText(`${this.cache.json.get('language').texts["IDS_MENU_WIN"]} ${coinsWon}`)

				this.toggleEffect()

				this.btnRed.setInteractive()
				this.btnBlack.setInteractive()
				this.btnHeart.setInteractive()
				this.btnDiamond.setInteractive()
				this.btnClub.setInteractive()
				this.btnSpade.setInteractive()
			} else {
				this.txtInformation.setText(`${this.cache.json.get('language').texts["IDS_VP_GAMEOVER"]}`)
				this.btnHeart.setTexture('skin_texture3_level2', 'EI.png')
				this.btnDiamond.setTexture('skin_texture3_level2', 'DI.png')
				this.btnClub.setTexture('skin_texture3_level2', 'CI.png')
				this.btnSpade.setTexture('skin_texture3_level2', 'BI.png')
				this.btnRed.setTexture('skin_texture3_level2', 'HI.png')
				this.btnBlack.setTexture('skin_texture3_level2', 'FI.png')
				this.time.addEvent({
					delay: 2000,
					callback: () => {
						// if(this.previs){
						//     for(let i = 0; i < this.previs.length; i++){
						//         this.previs[i].destroy()
						//     }
						// }
						this.gameState.isShowingGamble.set(false);
					}
				})
			}
		})
	}

	addButtonTween(sprite: Phaser.GameObjects.Sprite, text: Phaser.GameObjects.Text[] = []) {
		const targets = [sprite, ...text] as Phaser.GameObjects.GameObject[];

		const playTween = (scale: number) => {
			this.tweens.add({
				targets,
				scale : (target: Phaser.GameObjects.GameObject) =>
					(target as any).scale + scale,
				duration: 100,
				ease: "Power2"
			});
		};

		sprite.on("pointerdown", () => playTween(-0.1));
		["pointerup"].forEach(evt => sprite.on(evt, () => playTween(0.1)));
	}

	toggleEffect(){
		const firstColor = Phaser.Display.Color.ValueToColor('0x888888')
		const secondColor = Phaser.Display.Color.ValueToColor('0xFFFFFF')
		this.toggleVfx = this.tweens.addCounter({
			from: 0,
			to: 100,
			hold: 300,
			repeatDelay: 300,
			duration: 10,
			repeat: -1,
			yoyo: true,
			onUpdate: tween => {
				const value = tween.getValue()
				const colorObject = Phaser.Display.Color.Interpolate.ColorWithColor(
					firstColor,
					secondColor,
					100,
					value as number
				)
				const colorObject2 = Phaser.Display.Color.Interpolate.ColorWithColor(
					secondColor,
					firstColor,
					100,
					value as number
				)
				const color = Phaser.Display.Color.GetColor(colorObject.r, colorObject.g, colorObject.b)
				const color2 = Phaser.Display.Color.GetColor(colorObject2.r, colorObject2.g, colorObject2.b)

				// this.paytable.btnPaytable.setTint(color)
				this.btnRed.setTint(color)
				this.btnBlack.setTint(color)
				this.btnClub.setTint(color2)
				this.btnHeart.setTint(color2)
				this.btnDiamond.setTint(color2)
				this.btnSpade.setTint(color2)
			}
		});
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
