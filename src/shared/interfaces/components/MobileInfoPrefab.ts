
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class MobileInfoPrefab extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 238, y ?? 193.7062544272801);

		// bottomBg_png
		const bottomBg_png = scene.add.image(125, -31, "ui_mobile01", "bottomBg.png");
		bottomBg_png.scaleX = 1.15;
		bottomBg_png.scaleY = 0.7;
		bottomBg_png.tintTopLeft = 4473924;
		bottomBg_png.tintTopRight = 4473924;
		this.add(bottomBg_png);

		// bottomBg_png_1
		const bottomBg_png_1 = scene.add.image(125, -140, "ui_mobile01", "bottomBg.png");
		bottomBg_png_1.scaleX = 1.15;
		bottomBg_png_1.scaleY = 0.6;
		this.add(bottomBg_png_1);

		// txtCoinsText
		const txtCoinsText = scene.add.text(-135, -139, "", {});
		txtCoinsText.scaleX = 0.5;
		txtCoinsText.scaleY = 0.5;
		txtCoinsText.setOrigin(0, 0.5);
		txtCoinsText.text = "IDS_COINS_CAPTION";
		txtCoinsText.setStyle({ "fontFamily": "OSWALD-REGULAR", "fontSize": "48px" });
		this.add(txtCoinsText);

		// txtBetText
		const txtBetText = scene.add.text(215, -139, "", {});
		txtBetText.scaleX = 0.5;
		txtBetText.scaleY = 0.5;
		txtBetText.setOrigin(0, 0.5);
		txtBetText.text = "IDS_BET_CAPTION";
		txtBetText.setStyle({ "fontFamily": "OSWALD-REGULAR", "fontSize": "48px" });
		this.add(txtBetText);

		// txtBalanceText
		const txtBalanceText = scene.add.text(-215, -49, "", {});
		txtBalanceText.scaleX = 0.5;
		txtBalanceText.scaleY = 0.5;
		txtBalanceText.setOrigin(0, 0.5);
		txtBalanceText.text = "IDS_BALANCE_CAPTION";
		txtBalanceText.setStyle({ "color": "#AAAAAA", "fontFamily": "OSWALD-REGULAR", "fontSize": "48px" });
		this.add(txtBalanceText);

		// txtBalanceBetText
		const txtBalanceBetText = scene.add.text(-215, -9, "", {});
		txtBalanceBetText.scaleX = 0.5;
		txtBalanceBetText.scaleY = 0.5;
		txtBalanceBetText.setOrigin(0, 0.5);
		txtBalanceBetText.text = "IDS_BET_CAPTION";
		txtBalanceBetText.setStyle({ "color": "#AAAAAA", "fontFamily": "OSWALD-REGULAR", "fontSize": "48px" });
		this.add(txtBalanceBetText);

		// txtWinText
		const txtWinText = scene.add.text(315, -9, "", {});
		txtWinText.scaleX = 0.5;
		txtWinText.scaleY = 0.5;
		txtWinText.setOrigin(0, 0.5);
		txtWinText.text = "IDS_WIN_CAPTION";
		txtWinText.setStyle({ "color": "#AAAAAA", "fontFamily": "OSWALD-REGULAR", "fontSize": "48px" });
		this.add(txtWinText);

		// btnMenu
		const btnMenu = scene.add.sprite(440, -139, "ui_elements", "menuImg.png");
		btnMenu.setInteractive(new Phaser.Geom.Rectangle(0, 0, 93, 93), Phaser.Geom.Rectangle.Contains);
		this.add(btnMenu);

		this.txtCoinsText = txtCoinsText;
		this.txtBetText = txtBetText;
		this.txtBalanceText = txtBalanceText;
		this.txtBalanceBetText = txtBalanceBetText;
		this.txtWinText = txtWinText;
		this.btnMenu = btnMenu;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	public txtCoinsText: Phaser.GameObjects.Text;
	public txtBetText: Phaser.GameObjects.Text;
	public txtBalanceText: Phaser.GameObjects.Text;
	public txtBalanceBetText: Phaser.GameObjects.Text;
	public txtWinText: Phaser.GameObjects.Text;
	public btnMenu: Phaser.GameObjects.Sprite;

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
