import Dispatcher, { EVENTS } from '@gl/events/Dispatcher';
import Phaser from 'phaser';

export class Preload extends Phaser.Scene {
	private progressBar!: Phaser.GameObjects.Rectangle;
    constructor() {
        super({ key: 'Preload' });
    }

    preload() {
        this.createLoading();
        const width = this.progressBar.width;
        this.load.on("progress", (value: number) => {
			this.progressBar.width = width * value;
		});

		this.load.on('complete', () => {
            console.log('loader-complete');
            Dispatcher.emit(EVENTS.LOAD_COMPLETE);
            setTimeout(() => {
                this.scene.remove('Preload');
            }, 1000);
        });
    }

    createLoading() {
        // aB_png
		this.add.image(800, 450, "background_texture0_level0", "AB.png");

		// progressBar
		const progressBar = this.add.rectangle(650, 454, 256, 20);
		progressBar.setOrigin(0, 0);
		progressBar.isFilled = true;
		progressBar.fillColor = 14737632;

		// progressBarBg
		const progressBarBg = this.add.rectangle(650, 454, 256, 20);
		progressBarBg.setOrigin(0, 0);
		progressBarBg.fillColor = 14737632;
		progressBarBg.isStroked = true;

		// loadingText
		const loadingText = this.add.text(746, 422, "", {});
		loadingText.text = "Loading...";
		loadingText.setStyle({ "color": "#e0e0e0", "fontFamily": "arial", "fontSize": "20px" });

		this.progressBar = progressBar;
    }
}