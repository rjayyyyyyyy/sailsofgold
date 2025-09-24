
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class FooterPrefab extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 38, y ?? 14);

		// aB_png_1
		const aB_png_1 = scene.add.sprite(620, 0, "statusbar_texture0_level0", "AB.png");
		this.add(aB_png_1);

		// btnMenu
		const btnMenu = scene.add.sprite(0, 0, "statusbar_texture0_level0", "KB.png");
		btnMenu.setInteractive(new Phaser.Geom.Rectangle(0, 0, 25, 20), Phaser.Geom.Rectangle.Contains);
		this.add(btnMenu);

		// btnSound
		const btnSound = scene.add.sprite(50, 0, "statusbar_texture0_level0", "IB.png");
		btnSound.setInteractive(new Phaser.Geom.Rectangle(0, 0, 30, 30), Phaser.Geom.Rectangle.Contains);
		this.add(btnSound);

		// btnFast
		const btnFast = scene.add.sprite(90, 0, "statusbar_texture0_level0", "GB.png");
		btnFast.setInteractive(new Phaser.Geom.Rectangle(0, 0, 15, 30), Phaser.Geom.Rectangle.Contains);
		this.add(btnFast);

		// btnHelp
		const btnHelp = scene.add.sprite(130, 0, "statusbar_texture0_level0", "DB.png");
		btnHelp.setInteractive(new Phaser.Geom.Rectangle(0, 0, 10, 20), Phaser.Geom.Rectangle.Contains);
		this.add(btnHelp);

		// btnHistory
		const btnHistory = scene.add.sprite(170, 0, "statusbar_texture0_level0", "FB.png");
		btnHistory.setInteractive(new Phaser.Geom.Rectangle(0, 0, 25, 20), Phaser.Geom.Rectangle.Contains);
		this.add(btnHistory);

		// txtBalanceValue
		const txtBalanceValue = scene.add.text(463.00000000000006, 0, "", {});
		txtBalanceValue.setOrigin(0, 0.5);
		txtBalanceValue.text = "Balance: CNY 1100000.00";
		txtBalanceValue.setStyle({ "color": "#aaaaaa", "fontFamily": "ROBOTO_CONDENSED_REGULAR" });
		this.add(txtBalanceValue);

		// txtBalanceBetValue
		const txtBalanceBetValue = scene.add.text(715, 0, "", {});
		txtBalanceBetValue.setOrigin(0, 0.5);
		txtBalanceBetValue.text = "Bet: CNY 20.00";
		txtBalanceBetValue.setStyle({ "color": "#aaaaaa", "fontFamily": "ROBOTO_CONDENSED_REGULAR" });
		this.add(txtBalanceBetValue);

		// txtWinValue
		const txtWinValue = scene.add.text(975, 0, "", {});
		txtWinValue.setOrigin(0, 0.5);
		txtWinValue.text = "Win: ";
		txtWinValue.setStyle({ "color": "#aaaaaa", "fontFamily": "ROBOTO_CONDENSED_REGULAR" });
		this.add(txtWinValue);

		this.aB_png_1 = aB_png_1;
		this.btnMenu = btnMenu;
		this.btnSound = btnSound;
		this.btnFast = btnFast;
		this.btnHelp = btnHelp;
		this.btnHistory = btnHistory;
		this.txtBalanceValue = txtBalanceValue;
		this.txtBalanceBetValue = txtBalanceBetValue;
		this.txtWinValue = txtWinValue;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	private aB_png_1: Phaser.GameObjects.Sprite;
	public btnMenu: Phaser.GameObjects.Sprite;
	public btnSound: Phaser.GameObjects.Sprite;
	public btnFast: Phaser.GameObjects.Sprite;
	public btnHelp: Phaser.GameObjects.Sprite;
	public btnHistory: Phaser.GameObjects.Sprite;
	public txtBalanceValue: Phaser.GameObjects.Text;
	public txtBalanceBetValue: Phaser.GameObjects.Text;
	public txtWinValue: Phaser.GameObjects.Text;
	public balanceText: string = "";
	public balanceCurrency: string = "";
	public balanceValue: number = 0;
	public betText: string = "";
	public betValue: number = 0;
	public winText: string = "";
	public winValue: number = 0;

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
