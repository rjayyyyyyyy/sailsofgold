
import ScrollablePanel from "phaser3-rex-plugins/templates/ui/scrollablepanel/ScrollablePanel";
import RoundRectangle from "phaser3-rex-plugins/plugins/roundrectangle";
import { Sizer, Slider, Swipe, Tabs } from "phaser3-rex-plugins/templates/ui/ui-components";
import { container } from "@gl/di/container";
import { VideoSlotGameState } from "@games/videoslot/VideoSlotGameState";
import Dispatcher, { ACTION_EVENTS, NetworkEvent } from "@gl/events/Dispatcher";


export default class MobileMenuScene extends Phaser.Scene{
    constructor(){
        super("MobileMenuScene")
    }

    private pageContainer: Phaser.GameObjects.Container[] = [];
    private menuPage!: number;
    private tabs!: Tabs;
	private txtCoinsText!: Phaser.GameObjects.Text;
	private txtBetText!: Phaser.GameObjects.Text;
	private txtBalanceText!: Phaser.GameObjects.Text;
	private txtBalanceBetText!: Phaser.GameObjects.Text;
	private txtWinText!: Phaser.GameObjects.Text;
	private txtCoinsValue!: Phaser.GameObjects.Text;
	private txtBetValue!: Phaser.GameObjects.Text;
	private txtBalanceValue!: Phaser.GameObjects.Text;
	private txtBalanceBetValue!: Phaser.GameObjects.Text;
	private txtWinValue!: Phaser.GameObjects.Text;
	private defaultAutoSpins!: number;
    private activeAutoplay: number = 10;
	private btnMenu!: Phaser.GameObjects.Image;
    private patterns: any[] = [];
    private numPatterns: number = 0;
	private GameState!: VideoSlotGameState;

	init() {
		this.GameState = container.get<VideoSlotGameState>("VideoSlotGameState");
	}

    create(){
		this.scene.bringToTop();
		this.scene.sleep()
        
        const bgHeader = this.add.image(this.scale.width / 2, -55, 'ui_mobile01', 'bottomBg.png').setDepth(3).setScale(1.2, 1)

        const titleMenu = this.add.text(10, 5, 'Book of Dead', {
            fontSize : '26px',
            color : '#ffffff',
            fontFamily : 'OSWALD-REGULAR',
            // fontStyle : 'BOLD',
            align: 'center'
        }).setDepth(3);
        const bgHeader2 = this.add.image(this.scale.width / 2, -25, 'ui_mobile01', 'bottomBg.png').setDepth(2).setScale(1.2, 1)


        // bottomBg_png
		const bottomBg_png = this.add.image(360, 1251, "ui_mobile01", "bottomBg.png").setDepth(2);
		bottomBg_png.scaleX = 1.15;
		bottomBg_png.tintTopLeft = 4473924;
		bottomBg_png.tintTopRight = 4473924;

		// bottomBg_png_1
		const bottomBg_png_1 = this.add.image(360, 1109, "ui_mobile01", "bottomBg.png").setDepth(2);
		bottomBg_png_1.scaleX = 1.15;
		bottomBg_png_1.scaleY = 0.6;

		// txtCoinsText
		const txtCoinsText = this.add.text(100, 1110, "", {}).setDepth(2);
		txtCoinsText.setOrigin(0, 0.5);
		txtCoinsText.text = "IDS_COINS_CAPTION";
		txtCoinsText.setStyle({ "fontFamily": "OSWALD-REGULAR", "fontSize": "24px" });

		// txtBetText
		const txtBetText = this.add.text(450, 1110, "", {}).setDepth(2);
		txtBetText.setOrigin(0, 0.5);
		txtBetText.text = "IDS_BET_CAPTION";
		txtBetText.setStyle({ "fontFamily": "OSWALD-REGULAR", "fontSize": "24px" });

		// txtBalanceText
		const txtBalanceText = this.add.text(20, 1200, "", {}).setDepth(2);
		txtBalanceText.setOrigin(0, 0.5);
		txtBalanceText.text = "IDS_BALANCE_CAPTION";
		txtBalanceText.setStyle({ "color": "#AAAAAA", "fontFamily": "OSWALD-REGULAR", "fontSize": "24px" });

		// txtBalanceBetText
		const txtBalanceBetText = this.add.text(20, 1240, "", {}).setDepth(2);
		txtBalanceBetText.setOrigin(0, 0.5);
		txtBalanceBetText.text = "IDS_BET_CAPTION";
		txtBalanceBetText.setStyle({ "color": "#AAAAAA", "fontFamily": "OSWALD-REGULAR", "fontSize": "24px" });

		// txtWinText
		const txtWinText = this.add.text(550, 1240, "", {}).setDepth(2);
		txtWinText.setOrigin(0, 0.5);
		txtWinText.text = "IDS_WIN_CAPTION";
		txtWinText.setStyle({ "color": "#AAAAAA", "fontFamily": "OSWALD-REGULAR", "fontSize": "24px" });

		// btnMenu
		const btnMenu = this.add.image(674, 1110, "ui_elements", "menuImg.png").setDepth(2);
		btnMenu.setInteractive(new Phaser.Geom.Rectangle(0, 0, 93, 93), Phaser.Geom.Rectangle.Contains);
		btnMenu.scaleX = 0.9;
		btnMenu.scaleY = 0.9;
        
		this.txtCoinsText = txtCoinsText;
		this.txtBetText = txtBetText;
		this.txtBalanceText = txtBalanceText;
		this.txtBalanceBetText = txtBalanceBetText;
		this.txtWinText = txtWinText;
        this.btnMenu = btnMenu;

        this.pageContainer.push(...[
            this.add.container(0, 0).setDepth(1),
            this.add.container(0, 0).setDepth(1),
            this.add.container(0, 0).setDepth(1),
            this.add.container(0, 0).setDepth(1),
        ]);

        this.addSubscribe();
        this.setTabsMenu();
        this.addBetMenu();
        this.addSettingsMenu();
        this.addPaytableMenu();

        this.pageContainer[0].setVisible(true);
        this.pageContainer[1].setVisible(false);
        this.pageContainer[2].setVisible(false);
        this.pageContainer[3].setVisible(false);
        const gesture = new Swipe(this, {
            enable: false, //Swipe bug
            // bounds: undefined,

            threshold: 10,
            velocityThreshold: 1000,
            dir: 'left&right',

        });
        gesture.on('swipe', (swipe: any) => {
            if(swipe.right) {
                let index = this.menuPage - 1
                if(index < 0) return;
                else this.changePage(index);
            }
            else if (swipe.left){
                let index = this.menuPage + 1
                if(index > 3) return;
                else this.changePage(index);
            }
        });

        btnMenu.on('pointerdown', () => {
            this.hideWebView()
            this.GameState.isShowingMenu.set(false);
            this.tweens.add({
                targets: [btnMenu],
                scale: .9,
                duration: 100,
                ease: 'Power2'
            });
        });
        ['pointerup', 'pointerout'].forEach(event => {
			btnMenu.on(event, () => {
				this.tweens.add({
					targets: [btnMenu],
					scale: 1,
					duration: 100,
					ease: 'Power2'
				});
			});
		});

		this.txtCoinsText.setText(this.cache.json.get('language').texts[this.txtCoinsText.text]);
		this.txtBetText.setText(this.cache.json.get('language').texts[this.txtBetText.text]);
		this.txtWinText.setText(this.cache.json.get('language').texts[this.txtWinText.text]);
		this.txtBalanceText.setText(this.cache.json.get('language').texts[this.txtBalanceText.text]);
		this.txtBalanceBetText.setText(this.cache.json.get('language').texts[this.txtBalanceBetText.text]);

    }

    setTabsMenu(){
        this.tabs = new Tabs(this, {
            x: 225,
            y: 50,
            // width: 100,
            // height: 10,
            space: {
                left: 10, 
                right: 10, 
                top: 10, 
                bottom: 10,
                topButtonsOffset: 50,
                topButton: 30
            },
            background: new RoundRectangle(this, 0, 0, 10, 10, 0, 0xffffff),
            topButtons: [
                this.add.text(0, 0, 'BET', {
                    fontSize: '20px',
                    fontFamily: 'OSWALD-REGULAR',
                    color: '#ffffff',
                }),
                this.add.text(0, 0, 'SETTINGS', {
                    fontSize: '20px',
                    fontFamily: 'OSWALD-REGULAR',
                    color: '#888888',
                }),
                this.add.text(0, 0, 'PAYTABLE', {
                    fontSize: '20px',
                    fontFamily: 'OSWALD-REGULAR',
                    color: '#888888',
                }),
                this.add.text(0, 0, 'GAME HISTORY', {
                    fontSize: '20px',
                    fontFamily: 'OSWALD-REGULAR',
                    color: '#888888',
                }),
            ],

        }).layout().setDepth(2)
        this.tabs.on('button.click', (button: Phaser.GameObjects.GameObject, groupName: String, index: number) => {
            this.changePage(index)
        })
    }

    changePage(index: number){
        
        const setActiveTabStyle = (activeIndex: number) => {
            for (let i = 0; i < 4; i++) {
                (this.tabs.getTopButton(i) as Phaser.GameObjects.Text).setStyle({
                    color: i === activeIndex ? '#ffffff' : '#888888'
                });
            }
        };
        switch(index){
            case 0:
                this.menuPage = index
                this.pageContainer[0].setVisible(true);
                this.pageContainer[1].setVisible(false);
                this.pageContainer[2].setVisible(false);
                this.pageContainer[3].setVisible(false);
                setActiveTabStyle(0)
                this.hideWebView()
                break;
            
            case 1:
                this.menuPage = index
                this.pageContainer[0].setVisible(false);
                this.pageContainer[1].setVisible(true);
                this.pageContainer[2].setVisible(false);
                this.pageContainer[3].setVisible(false);
                setActiveTabStyle(1)
                this.hideWebView()
                break;

            case 2:
                this.menuPage = index
                this.pageContainer[0].setVisible(false);
                this.pageContainer[1].setVisible(false);
                this.pageContainer[2].setVisible(true);
                this.pageContainer[3].setVisible(false);
                setActiveTabStyle(2)
                this.hideWebView()
                break;

            case 3:
                this.menuPage = index
                this.pageContainer[0].setVisible(false);
                this.pageContainer[1].setVisible(false);
                this.pageContainer[2].setVisible(false);
                this.pageContainer[3].setVisible(true);
                this.createIframe('https://cw.lydrst.com/CasinoHistoryMobile?pid=888&lang=en_US&gameid=100310&custid=642&nocache=1754390935388&method=open')
                setActiveTabStyle(3)
                break;
        }
    }
    createIframe(url: string): HTMLIFrameElement {
    // createIframe(x: number, y: number, width: number, height: number, url: string): HTMLIFrameElement {
        let bgMenu = this.add.rectangle(this.scale.width / 2, 430, this.scale.width, this.scale.height, 0xffffff, 1).setOrigin(.5, .5).setDepth(0)
        const iframe = document.getElementById('game-iframe') as HTMLIFrameElement;
        const canvas = this.sys.game.canvas;
        const rect = canvas.getBoundingClientRect();

        iframe.src = url;
        iframe.style.display = 'block';
        iframe.style.position = 'absolute';

        iframe.style.left = rect.left + 'px';
        iframe.style.top = (rect.top + 50) + 'px';
        iframe.style.width = rect.width + 'px';
        iframe.style.height = (rect.height - 200) + 'px';

        window.addEventListener('resize', () => {
            const iframe = document.getElementById('game-iframe') as HTMLIFrameElement;
            const canvas = document.querySelector('canvas')!;
            const rect = canvas.getBoundingClientRect();

            iframe.style.left = rect.left + 'px';
            iframe.style.top = (rect.top + 40) + 'px';
            iframe.style.width = rect.width + 'px';
            iframe.style.height = (rect.height - 170) + 'px';
        });
        return iframe;
    }

    hideWebView(): void {
        // if (this._webview) {
        //     this._webview.remove();
        //     // this._webview = undefined;
        // }
        const iframe = document.getElementById('game-iframe') as HTMLIFrameElement;
        iframe.style.display = 'none';
        iframe.src = ''; // Optional: unload iframe
    }

    addBetMenu(){
        let bgMenu = this.add.rectangle(this.scale.width / 2, 430, 540, 765, 0xffffff, 1).setOrigin(.5, .5).setDepth(0)
        const scrollPanel0 = new ScrollablePanel(this, {
            x: this.scale.width / 2,
            y: 730,
            width: this.scale.width,
            height: 1350,

            scrollMode: 0, // 0 = vertical, 1 = horizontal

            background: bgMenu,

            panel: {
                child: this.createItemList0(),
                mask: { padding: 1 }
            },

            slider: {
                track: this.add.rectangle(0, 0, 10, 400, 0x555555),
                thumb: this.add.rectangle(0, 0, 10, 40, 0xffffff),
            },

            mouseWheelScroller: {
                focus: true,
                speed: 0.1
            },

            space: {
                left: 10, right: 10, top: 10, bottom: 10,
                panel: 10
            }
        }).layout().setDepth(2);
        this.pageContainer[0].add([
            bgMenu,
            scrollPanel0.getTopmostSizer()
        ])
    }

    createItemList0(){
        const MAX_VALUE = (this.GameState.coinValue.get() / 100) * 10000;
        const STEP = (this.GameState.coinValue.get() / 100) * 100;
        const sizer = new Sizer(this, {
            space: { item: 10 },
            orientation: 'y',
            // align: 'center',
            height: 1750
        });
        let txtCon = this.add.container(0, 0, []).setSize(0, 20);
        sizer.add(txtCon)

        let txtCoins = this.add.text(0, 0, this.cache.json.get('language').texts["IDS_COINS_CAPTION"], {
            fontSize : '26px',
            color : '#000000',
            fontFamily : 'OSWALD-REGULAR',
            // fontStyle : 'BOLD',
            align: 'left'
        }).setOrigin(0, .5);
        const txtSlider1 = this.add.text(275, -25, '1', {
            fontSize : '24px',
            color : '#000000',
            fontFamily : 'OSWALD-REGULAR',
            // fontStyle : 'BOLD',
            align: 'left'
        }).setOrigin(0, .5);
        let slider1: Slider;
        slider1 = new Slider(this, {
            x: 450,
            y: 0,
            width: 350,
            height: 5,
            orientation: 'x', // 'x' = horizontal, 'y' = vertical
            reverseAxis: false,
            track: this.add.rectangle(0, 0, 0, 5, 0x464646),
            indicator: this.add.rectangle(0, 0, 0, 5, 0xffc517),
            thumb: this.add.circle(0, 0, 10, 0xffc517),
            thumbOffsetX: 0,
            thumbOffsetY: 0,
            input: 'drag',
            // easeValue: { duration: 250 },
            enable: true,
            value: 0, // initial value (0~1)
            gap: 0.25,
            valuechangeCallback: (newValue: number) => {
                let mapped = Math.round(1 + newValue * 4);
                this.GameState.betCoins.set(mapped)
                // setTimeout(() => {
                if(slider1){
                    const thumb = slider1.getElement('thumb');
                    txtSlider1.setPosition(thumb.x - 5, thumb.y - 25)
                    txtSlider1.setText(mapped.toString())
                    this.GameState.betValue.set(this.GameState.betCoins.get() * this.GameState.betLines.get() * (this.GameState.coinValue.get() / 100))
                    this.txtBalanceBetValue.setText(`${this.GameState.coinValueCurrency} ${this.GameState.betValue.get().toFixed(1)}`)
                    this.txtBetValue.setText((this.GameState.betCoins.get() * this.GameState.betLines.get()).toString())
                    console.log(this.GameState.coinValue)
                }
                // }, 100)
                // txtSlider1.setText(mapped.toFixed(2));
            }
        }).layout();
        // Dispatcher.addListener(ACTION_EVENTS.OPEN_MENU, () => {
        //     if(!this.GameState.isMobile) return;
        //     slider1.setValue((this.GameState.betCoins.get() - 1) / 4)
        // })
        let txtCon1 = this.add.container(0, 0, [txtCoins, txtSlider1, slider1]).setSize(0, 75);
        sizer.add(txtCon1, { align: 'left' })


        const snapValues = this.GameState.coinValueList;
        const totalSteps = snapValues.length - 1;
        // const snapValues = this.GameState.coinValueList;
        let txtCoinValue = this.add.text(0, 0, this.cache.json.get('language').texts["IDS_COINVALUE_CAPTION"] + ' ('+ this.GameState.coinValueCurrency+')', {
            fontSize : '26px',
            color : '#000000',
            fontFamily : 'OSWALD-REGULAR',
            // fontStyle : 'BOLD',
            align: 'left'
        }).setOrigin(0, .5);
        // Dispatcher.addListener(ACTION_EVENTS.OPEN_MENU, () => {
        //     if(!this.GameState.isMobile) return;
        //     txtCoinValue.setText(this.cache.json.get('language').texts["IDS_COINVALUE_CAPTION"] + ' ('+ this.GameState.coinValueCurrency+')')
        // })
        const txtSlider2 = this.add.text(275, -25, '0.10', {
            fontSize : '24px',
            color : '#000000',
            fontFamily : 'OSWALD-REGULAR',
            // fontStyle : 'BOLD',
            align: 'left'
        }).setOrigin(0, .5);
        let slider2: Slider;
        slider2 = new Slider(this, {
            x: 450,
            y: 0,
            width: 350,
            height: 5,
            orientation: 'x', // 'x' = horizontal, 'y' = vertical
            reverseAxis: false,
            track: this.add.rectangle(0, 0, 0, 5, 0x464646),
            indicator: this.add.rectangle(0, 0, 0, 5, 0xffc517),
            thumb: this.add.circle(0, 0, 10, 0xffc517),
            thumbOffsetX: 0,
            thumbOffsetY: 0,
            input: 'drag',
            // easeValue: { duration: 250 },
            enable: true,
            value: 0, // initial value (0~1)
            gap: 1 / totalSteps,
            valuechangeCallback: (newValue: number) => {
                let mapped = Math.round(newValue * totalSteps);
                this.GameState.coinValue.set(snapValues[mapped] * 100)
                // setTimeout(() => {
                if(slider2){
                    const thumb = slider2.getElement('thumb');
                    txtSlider2.setPosition(thumb.x - 15, thumb.y - 25)
                    txtSlider2.setText(((this.GameState.coinValue.get() / 100).toFixed(2)))
                    this.GameState.betValue.set(this.GameState.betCoins.get() * this.GameState.betLines.get() * (this.GameState.coinValue.get() / 100))
                    console.log(mapped)
                    this.txtBalanceBetValue.setText(`${this.GameState.coinValueCurrency} ${this.GameState.betValue.get().toFixed(1)}`)
                    this.txtCoinsValue.setText(((this.GameState.balance.get() / (this.GameState.coinValue.get() / 100) / 100)).toFixed(0));
                }
                // }, 100)
                // txtSlider1.setText(mapped.toFixed(2));
            }
        }).layout();
        // Dispatcher.addListener(ACTION_EVENTS.OPEN_MENU, () => {
        //     if(!this.GameState.isMobile) return;
        //     const index = snapValues.indexOf(this.GameState.coinValue.get() / 100)
        //     slider2.setValue(index / (totalSteps))
        //     console.log(snapValues)
        // })
        let txtCon2 = this.add.container(0, 0, [txtCoinValue, txtSlider2, slider2]).setSize(0, 75);
        sizer.add(txtCon2, { align: 'left' })


        let txtLines = this.add.text(0, 0, this.cache.json.get('language').texts["IDS_LINES_CAPTION"], {
            fontSize : '26px',
            color : '#000000',
            fontFamily : 'OSWALD-REGULAR',
            // fontStyle : 'BOLD',
            align: 'left'
        }).setOrigin(0, .5);
        const txtSlider3 = this.add.text(605, -25, '10', {
            fontSize : '24px',
            color : '#000000',
            fontFamily : 'OSWALD-REGULAR',
            // fontStyle : 'BOLD',
            align: 'left'
        }).setOrigin(0, .5);
        let slider3: Slider;
        slider3 = new Slider(this, {
            x: 450,
            y: 0,
            width: 350,
            height: 5,
            orientation: 'x', // 'x' = horizontal, 'y' = vertical
            reverseAxis: false,
            track: this.add.rectangle(0, 0, 0, 5, 0x464646),
            indicator: this.add.rectangle(0, 0, 0, 5, 0xffc517),
            thumb: this.add.circle(0, 0, 10, 0xffc517),
            thumbOffsetX: 0,
            thumbOffsetY: 0,
            input: 'drag',
            // easeValue: { duration: 250 },
            enable: true,
            value: 1, // initial value (0~1)
            gap: 1 / 9,
            valuechangeCallback: (newValue: number) => {
                let mapped = Math.round(newValue * 9) + 1;
                this.GameState.betLines.set(mapped)
                // setTimeout(() => {
                if(slider3){
                    const thumb = slider3.getElement('thumb');
                    txtSlider3.setPosition(thumb.x - 5, thumb.y - 25)
                    txtSlider3.setText(mapped.toString())
                    this.GameState.betValue.set(this.GameState.betCoins.get() * this.GameState.betLines.get() * (this.GameState.coinValue.get() / 100))
                    this.txtBalanceBetValue.setText(`${this.GameState.coinValueCurrency} ${this.GameState.betValue.get().toFixed(1)}`)
                    this.txtBetValue.setText((this.GameState.betCoins.get() * this.GameState.betLines.get()).toString())
                }
                // }, 100)
                // txtSlider1.setText(mapped.toFixed(2));
            }
        }).layout();
        // Dispatcher.addListener(ACTION_EVENTS.OPEN_MENU, () => {
        //     if(!this.GameState.isMobile) return;
        //     slider3.setValue((this.GameState.betLines.get() - 1) / 9)
        // })
        let txtCon3 = this.add.container(0, 0, [txtLines, txtSlider3, slider3]).setSize(0, 75);
        sizer.add(txtCon3, { align: 'left' })

        const graphic = this.add.graphics();

        graphic.lineStyle(1, 0x444444, 1);
        graphic.beginPath();
        graphic.moveTo(10, 0); // start point (x1, y1)
        graphic.lineTo(550, 0); // end point (x2, y2)
        graphic.strokePath();

        let txtCon4 = this.add.container(-240, 0, [graphic]).setSize(0, 75);
        sizer.add(txtCon4, { align: 'left' })


        let txtAutoplay = this.add.text(0, 0, this.cache.json.get('language').texts["IDS_AP_CAPTION2"], {
            fontSize : '30px',
            color : '#000000',
            fontFamily : 'OSWALD-REGULAR',
            // fontStyle : 'BOLD',
            align: 'left'
        }).setOrigin(0, .5);
        let txtCon5 = this.add.container(0, 0, [txtAutoplay]).setSize(0, 75);
        sizer.add(txtCon5, { align: 'left' })


        const snapValues4 = [10, 20, 50, 75, 100];
        const txtSlider4 = this.add.text(55, -25, '10', {
            fontSize : '24px',
            color : '#000000',
            fontFamily : 'OSWALD-REGULAR',
            // fontStyle : 'BOLD',
            align: 'left'
        }).setOrigin(.5);

        let btnAutoplay = this.add.sprite(600, 0, 'uiElements', 'settingsAutoPlayBtn.png').setInteractive()
        btnAutoplay.on('pointerdown', () => {
			this.GameState.activeAutoplay.set(this.activeAutoplay)
            this.GameState.isShowingAutoplay.set(false);
            // Dispatcher.emit(ACTION_EVENTS.CLOSE_MENU)
            // Dispatcher.emit(ACTION_EVENTS.AUTO_PLAY_START, this.activeAutoplay)
        })
        let txtAutoplayValue = this.add.text(600, 0, '10', {
            fontSize : '30px',
            color : '#000000',
            fontFamily : 'OSWALD-REGULAR',
            // fontStyle : 'BOLD',
            align: 'left'
        }).setOrigin(.5);

        let slider4: Slider;
        slider4 = new Slider(this, {
            x: 300,
            y: 0,
            width: 400,
            height: 5,
            orientation: 'x', // 'x' = horizontal, 'y' = vertical
            reverseAxis: false,
            track: this.add.rectangle(0, 0, 0, 5, 0x464646),
            indicator: this.add.rectangle(0, 0, 0, 5, 0xffc517),
            thumb: this.add.circle(0, 0, 10, 0xffc517),
            thumbOffsetX: 0,
            thumbOffsetY: 0,
            input: 'drag',
            // easeValue: { duration: 250 },
            enable: true,
            value: this.defaultAutoSpins / 100, // initial value (0~1)
            gap: 1 / 4,
            valuechangeCallback: (newValue: number) => {
                const raw = newValue * 100;
                const closest = snapValues4.reduce((prev, curr) =>
                    Math.abs(curr - raw) < Math.abs(prev - raw) ? curr : prev
                );
                this.activeAutoplay = closest
                // setTimeout(() => {
                if(slider4){
                    const thumb = slider4.getElement('thumb');
                    txtSlider4.setPosition(thumb.x, thumb.y - 25)
                    txtSlider4.setText(closest.toString())
                    txtAutoplayValue.setText(closest.toString())
                }
                // }, 100)
                // txtSlider1.setText(mapped.toFixed(2));
            }
        }).layout();
        let txtCon6 = this.add.container(0, 0, [txtSlider4, slider4, btnAutoplay, txtAutoplayValue]).setSize(0, 75);
        sizer.add(txtCon6, { align: 'left' })
        // Dispatcher.addListener(ACTION_EVENTS.OPEN_MENU, () => {
        //     slider4.value = this.defaultAutoSpins / 100
        //     if(slider4){
        //         const thumb = slider4.getElement('thumb');
        //         txtSlider4.setPosition(thumb.x, thumb.y - 25)
        //         txtSlider4.setText(this.defaultAutoSpins.toString())
        //         txtAutoplayValue.setText(this.defaultAutoSpins.toString())
        //     }
        // })

        let txtStopAutoplay = this.add.text(0, 0, this.cache.json.get('language').texts["IDS_AP_STOPAUTOPLAY"], {
            fontSize : '30px',
            color : '#000000',
            fontFamily : 'OSWALD-REGULAR',
            // fontStyle : 'BOLD',
            align: 'left'
        }).setOrigin(0, .5);
        let txtCon7 = this.add.container(0, 0, [txtStopAutoplay]).setSize(0, 75);
        sizer.add(txtCon7, { align: 'left-bottom' })


        let txtSingleWin = this.add.text(0, 0, this.cache.json.get('language').texts["IDS_AP_WINEXCEEDS"] + '('+ this.GameState.coinValueCurrency+')', {
            fontSize : '26px',
            color : '#000000',
            fontFamily : 'OSWALD-REGULAR',
            // fontStyle : 'BOLD',
            align: 'left'
        }).setOrigin(0, .5);
        
        // Dispatcher.addListener(ACTION_EVENTS.OPEN_MENU, () => {
        //     if(!this.GameState.isMobile) return;
        //     txtSingleWin.setText(this.cache.json.get('language').texts["IDS_AP_WINEXCEEDS"] + ' ('+ this.GameState.coinValueCurrency+')')
        // })
        let txtCon8 = this.add.container(0, 0, [txtSingleWin]).setSize(0, 75);
        sizer.add(txtCon8, { align: 'left' })


        let txtMinSingle = this.add.text(50, 0, (Math.round(0 * (MAX_VALUE / STEP)) * STEP).toFixed(2).toString(), {
            fontSize : '22px',
            color : '#000000',
            fontFamily : 'OSWALD-REGULAR',
            // fontStyle : 'BOLD',
            align: 'left'
        }).setOrigin(0, .5);
        let txtMaxSingle = this.add.text(600, 0, (Math.round(1 * (MAX_VALUE / STEP)) * STEP).toFixed(2).toString(), {
            fontSize : '22px',
            color : '#000000',
            fontFamily : 'OSWALD-REGULAR',
            // fontStyle : 'BOLD',
            align: 'left'
        }).setOrigin(0, .5);
        
        const txtSlider5 = this.add.text(140, -25, '0.00', {
            fontSize : '24px',
            color : '#000000',
            fontFamily : 'OSWALD-REGULAR',
            // fontStyle : 'BOLD',
            align: 'left'
        }).setOrigin(.5);
        let slider5: Slider;
        slider5 = new Slider(this, {
            x: 350,
            y: 0,
            width: 450,
            height: 5,
            orientation: 'x', // 'x' = horizontal, 'y' = vertical
            reverseAxis: false,
            track: this.add.rectangle(0, 0, 0, 5, 0x464646),
            indicator: this.add.rectangle(0, 0, 0, 5, 0xffc517),
            thumb: this.add.circle(0, 0, 10, 0xffc517),
            thumbOffsetX: 0,
            thumbOffsetY: 0,
            input: 'drag',
            // easeValue: { duration: 250 },
            enable: true,
            value: 0, // initial value (0~1)
            valuechangeCallback: (newValue: number) => {
                let mapped = Math.round(newValue * (MAX_VALUE / STEP)) * STEP;
                this.GameState.ifAutoplaySingleWin.set(mapped * 100)
                // setTimeout(() => {
                if(slider5){
                    const thumb = slider5.getElement('thumb');
                    txtSlider5.setPosition(thumb.x, thumb.y - 25)
                    txtSlider5.setText(mapped.toFixed(2))
                }
                // }, 100)
                // txtSlider1.setText(mapped.toFixed(2));
            }
        }).layout();
        let txtCon9 = this.add.container(0, 0, [txtMinSingle, txtMaxSingle, txtSlider5, slider5]).setSize(0, 75);
        sizer.add(txtCon9, { align: 'left' })


        let txtBalanceIncrease = this.add.text(0, 0, this.cache.json.get('language').texts["IDS_AP_BALANCEINC"] + '('+ this.GameState.coinValueCurrency+')', {
            fontSize : '26px',
            color : '#000000',
            fontFamily : 'OSWALD-REGULAR',
            // fontStyle : 'BOLD',
            align: 'left'
        }).setOrigin(0, .5);
        // Dispatcher.addListener(ACTION_EVENTS.OPEN_MENU, () => {
        //     if(!this.GameState.isMobile) return;
        //     txtBalanceIncrease.setText(this.cache.json.get('language').texts["IDS_AP_BALANCEINC"] + ' ('+ this.GameState.coinValueCurrency+')')
        // })
        let txtCon10 = this.add.container(0, 0, [txtBalanceIncrease]).setSize(0, 75);
        sizer.add(txtCon10, { align: 'left' })


        let txtMinIncrease = this.add.text(50, 0, (Math.round(0 * (MAX_VALUE / STEP)) * STEP * 10).toFixed(2).toString(), {
            fontSize : '22px',
            color : '#000000',
            fontFamily : 'OSWALD-REGULAR',
            // fontStyle : 'BOLD',
            align: 'left'
        }).setOrigin(0, .5);
        let txtMaxIncrease = this.add.text(600, 0, (Math.round(1 * (MAX_VALUE / STEP)) * STEP * 10).toFixed(2).toString(), {
            fontSize : '22px',
            color : '#000000',
            fontFamily : 'OSWALD-REGULAR',
            // fontStyle : 'BOLD',
            align: 'left'
        }).setOrigin(0, .5);
        
        const txtSlider6 = this.add.text(140, -25, '0.00', {
            fontSize : '24px',
            color : '#000000',
            fontFamily : 'OSWALD-REGULAR',
            // fontStyle : 'BOLD',
            align: 'left'
        }).setOrigin(.5);
        let slider6: Slider;
        slider6 = new Slider(this, {
            x: 350,
            y: 0,
            width: 450,
            height: 5,
            orientation: 'x', // 'x' = horizontal, 'y' = vertical
            reverseAxis: false,
            track: this.add.rectangle(0, 0, 0, 5, 0x464646),
            indicator: this.add.rectangle(0, 0, 0, 5, 0xffc517),
            thumb: this.add.circle(0, 0, 10, 0xffc517),
            thumbOffsetX: 0,
            thumbOffsetY: 0,
            input: 'drag',
            // easeValue: { duration: 250 },
            enable: true,
            value: 0, // initial value (0~1)
            valuechangeCallback: (newValue: number) => {
                let mapped = Math.round(newValue * (MAX_VALUE / STEP)) * STEP * 10;
                this.GameState.ifAutoplayBalanceIncrease.set(mapped * 100)
                // setTimeout(() => {
                if(slider6){
                    const thumb = slider6.getElement('thumb');
                    txtSlider6.setPosition(thumb.x, thumb.y - 25)
                    txtSlider6.setText(mapped.toFixed(2))
                }
                // }, 100)
                // txtSlider1.setText(mapped.toFixed(2));
            }
        }).layout();
        let txtCon11 = this.add.container(0, 0, [txtMinIncrease, txtMaxIncrease, txtSlider6, slider6]).setSize(0, 75);
        sizer.add(txtCon11, { align: 'left' })


        let txtBalanceDecrease = this.add.text(0, 0, this.cache.json.get('language').texts["IDS_AP_BALANCEDEC"] + '('+ this.GameState.coinValueCurrency+')', {
            fontSize : '26px',
            color : '#000000',
            fontFamily : 'OSWALD-REGULAR',
            // fontStyle : 'BOLD',
            align: 'left'
        }).setOrigin(0, .5);
        // Dispatcher.addListener(ACTION_EVENTS.OPEN_MENU, () => {
        //     if(!this.GameState.isMobile) return;
        //     txtBalanceDecrease.setText(this.cache.json.get('language').texts["IDS_AP_BALANCEDEC"] + ' ('+ this.GameState.coinValueCurrency+')')
        // })
        let txtCon12 = this.add.container(0, 0, [txtBalanceDecrease]).setSize(0, 75);
        sizer.add(txtCon12, { align: 'left' })


        let txtMinDecrease = this.add.text(50, 0, (Math.round(0 * (MAX_VALUE / STEP)) * STEP * 10).toFixed(2), {
            fontSize : '22px',
            color : '#000000',
            fontFamily : 'OSWALD-REGULAR',
            // fontStyle : 'BOLD',
            align: 'left'
        }).setOrigin(0, .5);
        let txtMaxDecrease = this.add.text(600, 0, (Math.round(1 * (MAX_VALUE / STEP)) * STEP * 10).toFixed(2), {
            fontSize : '22px',
            color : '#000000',
            fontFamily : 'OSWALD-REGULAR',
            // fontStyle : 'BOLD',
            align: 'left'
        }).setOrigin(0, .5);
        
        const txtSlider7 = this.add.text(140, -25, '0.00', {
            fontSize : '24px',
            color : '#000000',
            fontFamily : 'OSWALD-REGULAR',
            // fontStyle : 'BOLD',
            align: 'left'
        }).setOrigin(.5);
        let slider7: Slider;
        slider7 = new Slider(this, {
            x: 350,
            y: 0,
            width: 450,
            height: 5,
            orientation: 'x', // 'x' = horizontal, 'y' = vertical
            reverseAxis: false,
            track: this.add.rectangle(0, 0, 0, 5, 0x464646),
            indicator: this.add.rectangle(0, 0, 0, 5, 0xffc517),
            thumb: this.add.circle(0, 0, 10, 0xffc517),
            thumbOffsetX: 0,
            thumbOffsetY: 0,
            input: 'drag',
            // easeValue: { duration: 250 },
            enable: true,
            value: 0, // initial value (0~1)
            valuechangeCallback: (newValue: number) => {
                let mapped = Math.round(newValue * (MAX_VALUE / STEP)) * STEP * 10;
                this.GameState.ifAutoplayBalanceDecrease.set(mapped * 100)
                // setTimeout(() => {
                if(slider7){
                    const thumb = slider7.getElement('thumb');
                    txtSlider7.setPosition(thumb.x, thumb.y - 25)
                    txtSlider7.setText(mapped.toFixed(2))
                }
                // }, 100)
                // txtSlider1.setText(mapped.toFixed(2));
            }
        }).layout();
        let txtCon13 = this.add.container(0, 0, [txtMinDecrease, txtMaxDecrease, txtSlider7, slider7]).setSize(0, 75);
        sizer.add(txtCon13, { align: 'left' })


        let txtAnyWin = this.add.text(0, 0, this.cache.json.get('language').texts["IDS_AP_ONANYWIN"], {
            fontSize : '26px',
            color : '#000000',
            fontFamily : 'OSWALD-REGULAR',
            // fontStyle : 'BOLD',
            align: 'left'
        }).setOrigin(0, .5);
        const valueAnyWin1 = this.add.sprite(620, 0, 'uiElements', 'toggleBaseOff.png').setInteractive();
        const valueAnyWin2 = this.add.sprite(600, 0, 'uiElements', 'sliderThumbDisabled.png').setInteractive();
        const toggleAnyWin = () => {
            let isAutoplayAnyWin = !this.GameState.isAutoplayAnyWin.get();
			this.GameState.isAutoplayAnyWin.set(isAutoplayAnyWin); // Toggle boolean

            if (isAutoplayAnyWin) {
                valueAnyWin1.setFrame('toggleBaseOn.png');
                valueAnyWin2.setFrame('sliderThumb.png');
                // valueAnyWin2.setX(540);
            } else {
                valueAnyWin1.setFrame('toggleBaseOff.png');
                valueAnyWin2.setFrame('sliderThumbDisabled.png');
                // valueAnyWin2.setX(500);
            }
            this.tweens.add({
                targets: valueAnyWin2,
                x: this.GameState.isAutoplayAnyWin.get() ? 640 : 600,
                duration: 100,
                ease: 'Power2',
            });
        };
        valueAnyWin1.on('pointerdown', toggleAnyWin);
        valueAnyWin2.on('pointerdown', toggleAnyWin);
        let txtCon14 = this.add.container(0, 0, [txtAnyWin, valueAnyWin1, valueAnyWin2]).setSize(0, 75);
        sizer.add(txtCon14, { align: 'left' })


        let txtFreeSpin = this.add.text(0, 0, this.cache.json.get('language').texts["IDS_AP_ONFREESPINS"], {
            fontSize : '26px',
            color : '#000000',
            fontFamily : 'OSWALD-REGULAR',
            // fontStyle : 'BOLD',
            align: 'left'
        }).setOrigin(0, .5);
        const valueFreeSpin1 = this.add.sprite(620, 0, 'uiElements', 'toggleBaseOn.png').setInteractive();
        const valueFreeSpin2 = this.add.sprite(640, 0, 'uiElements', 'sliderThumb.png').setInteractive();
        const toggleFreeSpin = () => {
            let isAutoplayFreeSpin = !this.GameState.isAutoplayFreeSpin.get();
			this.GameState.isAutoplayFreeSpin.set(isAutoplayFreeSpin); // Toggle boolean

            if (isAutoplayFreeSpin) {
                valueFreeSpin1.setFrame('toggleBaseOn.png');
                valueFreeSpin2.setFrame('sliderThumb.png');
                // valueFreeSpin2.setX(540);
            } else {
                valueFreeSpin1.setFrame('toggleBaseOff.png');
                valueFreeSpin2.setFrame('sliderThumbDisabled.png');
                // valueFreeSpin2.setX(500);
            }
            this.tweens.add({
                targets: valueFreeSpin2,
                x: this.GameState.isAutoplayFreeSpin.get() ? 640 : 600,
                duration: 100,
                ease: 'Power2',
            });
        };
        valueFreeSpin1.on('pointerdown', toggleFreeSpin);
        valueFreeSpin2.on('pointerdown', toggleFreeSpin);
        let txtCon15 = this.add.container(0, 0, [txtFreeSpin, valueFreeSpin1, valueFreeSpin2]).setSize(0, 75);
        sizer.add(txtCon15, { align: 'left' })


        let txtJackpot = this.add.text(0, 0, this.cache.json.get('language').texts["IDS_AP_ONJACKPOT"], {
            fontSize : '26px',
            color : '#000000',
            fontFamily : 'OSWALD-REGULAR',
            // fontStyle : 'BOLD',
            align: 'left'
        }).setOrigin(0, .5);
        const valueJackpot1 = this.add.sprite(620, 0, 'uiElements', 'toggleBaseOn.png').setInteractive();
        const valueJackpot2 = this.add.sprite(640, 0, 'uiElements', 'sliderThumb.png').setInteractive();
        const toggleJackpot = () => {
            let isAutoplayJackpot = !this.GameState.isAutoplayJackpot.get();
			this.GameState.isAutoplayJackpot.set(isAutoplayJackpot); // Toggle boolean

            if (isAutoplayJackpot) {
                valueJackpot1.setFrame('toggleBaseOn.png');
                valueJackpot2.setFrame('sliderThumb.png');
                // valueJackpot2.setX(640);
            } else {
                valueJackpot1.setFrame('toggleBaseOff.png');
                valueJackpot2.setFrame('sliderThumbDisabled.png');
                // valueJackpot2.setX(600);
            }
            this.tweens.add({
                targets: valueJackpot2,
                x: isAutoplayJackpot ? 640 : 600,
                duration: 100,
                ease: 'Power2',
            });
        };
        valueJackpot1.on('pointerdown', toggleJackpot);
        valueJackpot2.on('pointerdown', toggleJackpot);
        let txtCon16 = this.add.container(0, 0, [txtJackpot, valueJackpot1, valueJackpot2]).setSize(0, 75);
        sizer.add(txtCon16, { align: 'left' })
        return sizer;
    }

    addSettingsMenu(){
        let bgMenu = this.add.rectangle(this.scale.width / 2, 430, this.scale.width, this.scale.height, 0xffffff, 1).setOrigin(.5, .5).setDepth(0)
        this.pageContainer[1].add([
            bgMenu,
        ])

        const iconSound = this.add.image(50, 120, 'uiElements', 'settingsIconSound.png')
        let txtSound = this.add.text(100, 120, this.cache.json.get('language').texts["IDS_M_SETTINGS_L1"], {
            fontSize : '26px',
            color : '#000000',
            fontFamily : 'OSWALD-REGULAR',
            // fontStyle : 'BOLD',
            align: 'left'
        }).setOrigin(0, .5);
        const valueSound1 = this.add.sprite(640, 120, 'uiElements', this.GameState.isSoundingOn.get() ? 'toggleBaseOn.png' : 'toggleBaseOff.png').setInteractive()
        const valueSound2 = this.add.sprite(
            this.GameState.isSoundingOn.get() ? 660 : 620, 
            120, 
            'uiElements', 
            this.GameState.isSoundingOn.get() ? 'sliderThumb.png' : 'sliderThumbDisabled.png').setInteractive()
        const toggleSound = () => {
			let isSoundingOn = !this.GameState.isSoundingOn.get();
            this.GameState.isSoundingOn.set(isSoundingOn);
            this.sound.mute = isSoundingOn;
            this.tweens.add({
                targets: valueSound2,
                x: this.GameState.isSoundingOn.get() ? 660 : 620,
                duration: 100,
                ease: 'Power2',
            });

            if (this.GameState.isSoundingOn.get()) {
                valueSound1.setFrame('toggleBaseOn.png');
                valueSound2.setFrame('sliderThumb.png');
                // valueSound2.setX(660);
            } else {
                valueSound1.setFrame('toggleBaseOff.png');
                valueSound2.setFrame('sliderThumbDisabled.png');
                // valueSound2.setX(620);
            }
        };
        valueSound1.on('pointerdown', toggleSound);
        valueSound2.on('pointerdown', toggleSound);

        this.pageContainer[1].add([
            iconSound,
            txtSound,
            valueSound1,
            valueSound2
        ])

        const iconAutoBet = this.add.image(50, 220, 'uiElements', 'settingsIconAutoAdjustBet.png')
        let txtAutoBet = this.add.text(100, 220, this.cache.json.get('language').texts["IDS_M_SETTINGS_L9"], {
            fontSize : '26px',
            color : '#000000',
            fontFamily : 'OSWALD-REGULAR',
            // fontStyle : 'BOLD',
            align: 'left'
        }).setOrigin(0, .5);

        const valueAutoBet1 = this.add.sprite(640, 220, 'uiElements', this.GameState.isAutoAdjustOn.get() ? 'toggleBaseOn.png' : 'toggleBaseOff.png').setInteractive()
        const valueAutoBet2 = this.add.sprite(
            this.GameState.isAutoAdjustOn.get() ? 660 : 620, 
            220, 
            'uiElements', 
            this.GameState.isAutoAdjustOn.get() ? 'sliderThumb.png' : 'sliderThumbDisabled.png').setInteractive()

        const toggleAutoBet = () => {
			let isAutoAdjustOn = !this.GameState.isAutoAdjustOn.get();
            this.GameState.isAutoAdjustOn.set(isAutoAdjustOn);

            if (isAutoAdjustOn) {
                valueAutoBet1.setFrame('toggleBaseOn.png');
                valueAutoBet2.setFrame('sliderThumb.png');
                // valueAutoBet2.setX(660);
            } else {
                valueAutoBet1.setFrame('toggleBaseOff.png');
                valueAutoBet2.setFrame('sliderThumbDisabled.png');
                // valueAutoBet2.setX(620);
            }
            this.tweens.add({
                targets: valueAutoBet2,
                x: this.GameState.isAutoAdjustOn.get() ? 660 : 620,
                duration: 100,
                ease: 'Power2',
            });
        };
        valueAutoBet1.on('pointerdown', toggleAutoBet);
        valueAutoBet2.on('pointerdown', toggleAutoBet);
        
        this.pageContainer[1].add([
            iconAutoBet,
            txtAutoBet,
            valueAutoBet1,
            valueAutoBet2
        ])
        
        const iconLeftHand = this.add.image(50, 320, 'uiElements', 'settingsIconLeftHand.png')
        let txtLeftHand = this.add.text(100, 320, this.cache.json.get('language').texts["IDS_M_SETTINGS_L14"], {
            fontSize : '26px',
            color : '#000000',
            fontFamily : 'OSWALD-REGULAR',
            // fontStyle : 'BOLD',
            align: 'left'
        }).setOrigin(0, .5);
        const valueLeftHand1 = this.add.sprite(640, 320, 'uiElements', 'toggleBaseOff.png').setInteractive()
        const valueLeftHand2 = this.add.sprite(620, 320, 'uiElements', 'sliderThumbDisabled.png').setInteractive()
		
        const toggleLeftHand = () => {
			let isLeftHand = !this.GameState.isLeftHand.get();
            this.GameState.isLeftHand.set(isLeftHand);

            if (this.GameState.isLeftHand.get()) {
                valueLeftHand1.setFrame('toggleBaseOn.png');
                valueLeftHand2.setFrame('sliderThumb.png');
                // valueLeftHand2.setX(660);
                this.btnMenu.setX(40)
            } else {
                valueLeftHand1.setFrame('toggleBaseOff.png');
                valueLeftHand2.setFrame('sliderThumbDisabled.png');
                // valueLeftHand2.setX(620);
                this.btnMenu.setX(675)
            }
            this.tweens.add({
                targets: valueLeftHand2,
                x: this.GameState.isLeftHand.get() ? 660 : 620,
                duration: 100,
                ease: 'Power2',
            });
        };
        valueLeftHand1.on('pointerdown', toggleLeftHand);
        valueLeftHand2.on('pointerdown', toggleLeftHand);
        this.pageContainer[1].add([
            iconLeftHand,
            txtLeftHand,
            valueLeftHand1,
            valueLeftHand2
        ])
        
        const iconFastPlay = this.add.image(50, 420, 'uiElements', 'settingsIconFastPlay.png')
        let txtFastPlay = this.add.text(100, 420, this.cache.json.get('language').texts["IDS_M_SETTINGS_L12"], {
            fontSize : '26px',
            color : '#000000',
            fontFamily : 'OSWALD-REGULAR',
            // fontStyle : 'BOLD',
            align: 'left'
        }).setOrigin(0, .5);
        
        const valueFastPlay1 = this.add.sprite(640, 420, 'uiElements', this.GameState.isFastplayOn ? 'toggleBaseOn.png' : 'toggleBaseOff.png').setInteractive()
        const valueFastPlay2 = this.add.sprite(
            this.GameState.isFastplayOn ? 660 : 620, 
            420, 
            'uiElements', 
            this.GameState.isFastplayOn ? 'sliderThumb.png' : 'sliderThumbDisabled.png').setInteractive()
        const toggleFastPlay = () => {
			let isFastplayOn = !this.GameState.isFastplayOn.get();
            this.GameState.isFastplayOn.set(isFastplayOn);

            if (this.GameState.isFastplayOn.get()) {
                valueFastPlay1.setFrame('toggleBaseOn.png');
                valueFastPlay2.setFrame('sliderThumb.png');
                // valueFastPlay2.setX(660);
            } else {
                valueFastPlay1.setFrame('toggleBaseOff.png');
                valueFastPlay2.setFrame('sliderThumbDisabled.png');
                // valueFastPlay2.setX(620);
            }
            this.tweens.add({
                targets: valueFastPlay2,
                x: this.GameState.isFastplayOn.get() ? 660 : 620,
                duration: 100,
                ease: 'Power2',
            });
        };
        valueFastPlay1.on('pointerdown', toggleFastPlay);
        valueFastPlay2.on('pointerdown', toggleFastPlay);
        this.pageContainer[1].add([
            iconFastPlay,
            txtFastPlay,
            valueFastPlay1,
            valueFastPlay2
        ])
    }

    addPaytableMenu(){
        const background = this.add.image(this.scale.width / 2, 480, "background_texture0_level2", "AB.png");
        const bgMenu = this.add.rectangle(this.scale.width / 2, this.scale.height / 2 - 120, this.scale.width, this.scale.height, 0xffffff, .5).setOrigin(.5, .5)
        // .setInteractive();

        // const pageMenu = this.add.container(0, 0).setDepth(2)
        const scrollPanel2 = new ScrollablePanel(this, {
            x: this.scale.width / 2,
            y: 930,
            width: this.scale.width,
            height: 1800,

            scrollMode: 0, // 0 = vertical, 1 = horizontal

            // background: this.background,

            panel: {
                child: this.createItemList2(),
                mask: { padding: 1 }
            },

            slider: {
                track: this.add.rectangle(0, 0, 10, 400, 0x555555),
                thumb: this.add.rectangle(0, 0, 10, 40, 0xffffff),
            },

            mouseWheelScroller: {
                focus: true,
                speed: 0.1
            },

            space: {
                left: 10, right: 10, top: 10, bottom: 10,
                panel: 10
            }
        }).layout().setDepth(0);
        this.pageContainer[2].add([
            background,
            bgMenu,
            scrollPanel2.getTopmostSizer()
        ])
        // pageMenu.add(this.scrollPanel)
    }

    createItemList2() {
        const sizer = new Sizer(this, {
            space: { item: 10 },
            orientation: 'y',
            // align: 'center',
            height: 2600
        });

        let background1 = new RoundRectangle(this, {
            x: 0, y: 0,
            width: 200, height: 60,
            radius: 10,
        })
        let txtFreeSpin = this.add.text(0, 0, this.cache.json.get('language').texts["IDS_FREESPINS_HEADER"], {
            fontSize : '30px',
            color : '#FFAE1D',
            fontFamily : 'OSWALD-MEDIUM',
            fontStyle : 'BOLD',
            align: 'center'
        }).setOrigin(.5);
        txtFreeSpin.setShadow(1, 1, '#000000', 2)
        let txtCon1 = this.add.container(0, 0, [background1, txtFreeSpin]).setSize(0, 100);
        sizer.add(txtCon1)
        

        const image1 = this.add.image(0,0, 'skin_texture4_level2', 'XE.png').setDisplaySize(115, 115)
        const image3 = this.add.image(0,0, 'skin_texture4_level2', 'XE.png').setDisplaySize(115, 115)
        const image5 = this.add.image(0,0, 'skin_texture4_level2', 'XE.png').setDisplaySize(115, 115)
        const book1 = this.add.container(-125, 0, [image1]).setSize(0, 100);
        const book2 = this.add.container(0, 0, [image3]).setSize(0, 100);
        const book3 = this.add.container(125, 0, [image5]).setSize(0, 100);
        const book = this.add.container(0, 0, [book1, book2, book3]).setSize(0, 100);
        sizer.add(book)


        let background2 = new RoundRectangle(this, {
            x: 0, y: 0,
            width: 200, height: 60,
            radius: 10,
        })
        let txt2 = this.add.text(0, 0, this.cache.json.get('language').texts["IDS_BD_MOREFREESPINS"], {
            fontSize : '18px',
            color : '#000000',
            fontFamily : 'OSWALD-MEDIUM',
            
            align: 'center'
        }).setOrigin(.5);
        let txtCon2 = this.add.container(0, 0, [background2, txt2]).setSize(0, 100);
        sizer.add(txtCon2)

        
        let background3 = new RoundRectangle(this, {
            x: 0, y: 0,
            width: 200, height: 60,
            radius: 10,
        })
        let txt3 = this.add.text(0, 0, this.cache.json.get('language').texts["IDS_BD_WILDSCATTERBOOK"], {
            fontSize : '18px',
            color : '#000000',
            fontFamily : 'OSWALD-MEDIUM',
            
            align: 'center',
            wordWrap: {
                width: 500,
                useAdvancedWrap: true,
            }
        }).setOrigin(.5);
        let txtCon3 = this.add.container(0, 0, [background3, txt3]).setSize(0, 50);
        sizer.add(txtCon3)


        let txt4 = this.add.text(-120, 0, this.cache.json.get('language').texts["IDS_PT_SCATTER_MONEY"], {
            fontSize : '18px',
            color : '#000000',
            fontFamily : 'OSWALD-MEDIUM',
            
            align: 'center',
            wordWrap: {
                width: 300,
                useAdvancedWrap: true,
            }
        }).setOrigin(.5);
        const image7 = this.add.image(0,0, 'skin_texture4_level2', 'XE.png')
        const book4 = this.add.container(100, 0, [image7]).setScale(.5);
        let txt5 = this.add.text(170, 0, '5\n4\n3', {
            fontSize : '18px',
            color : '#FFAE1D',
            fontFamily : 'OSWALD-MEDIUM',
            align: 'center'
        }).setOrigin(.5);
        txt5.setShadow(1, 1, '#000000', 2)
        let txt6 = this.add.text(200, 0, '200\n20\n2', {
            fontSize : '18px',
            color : '#000000',
            fontFamily : 'OSWALD-MEDIUM',
            
            align: 'center'
        }).setOrigin(.5);
        let txtCon4 = this.add.container(0, 0, [txt4, book4, txt5, txt6]).setSize(0, 100);
        sizer.add(txtCon4)


        sizer.add(new RoundRectangle(this, {
            width: 520, height: 2, color: 0xffffff
        }))


        let txt7 = this.add.text(0, 0, this.cache.json.get('language').texts["IDS_BD_EXPANDINGSYMBOL"], {
            fontSize : '18px',
            color : '#000000',
            fontFamily : 'OSWALD-MEDIUM',
            
            align: 'center',
            wordWrap: {
                width: 500,
                useAdvancedWrap: true,
            }
        }).setOrigin(.5);
        let txtCon5 = this.add.container(0, 0, txt7).setSize(0, 100);
        sizer.add(txtCon5)


        const slide = this.add.image(0,0, 'slide_sd', 'slide1.png').setDisplaySize(379, 259)
        const slideshow = this.add.container(0, 0, slide).setSize(0, 170);
        sizer.add(slideshow)


        sizer.add(new RoundRectangle(this, {
            width: 520, height: 2, color: 0xffffff
        }))

        
        let txt8 = this.add.text(0, 0, this.cache.json.get('language').texts["IDS_WINUPTO_COINS"].replace("%d","250000"), {
            fontSize : '30px',
            color : '#FFAE1D',
            fontFamily : 'OSWALD-MEDIUM',
            fontStyle : 'BOLD',
            align: 'center'
        }).setOrigin(.5);
        txt8.setShadow(1, 1, '#000000', 2)
        let txtCon6 = this.add.container(0, 0, txt8).setSize(0, 100);
        sizer.add(txtCon6)


        const image9 = this.add.image(-165,0, 'skin_texture4_level2', 'WE.png').setDisplaySize(100, 100)
        const image10 = this.add.image(-55,0, 'skin_texture4_level2', 'VE.png').setDisplaySize(100, 100)
        const image11 = this.add.image(55,0, 'skin_texture4_level2', 'TE.png').setDisplaySize(100, 100)
        const image12 = this.add.image(165,0, 'skin_texture4_level2', 'SE.png').setDisplaySize(100, 100)
        let txtCon7 = this.add.container(0, 0, [image9, image10, image11, image12]).setSize(0, 100);
        sizer.add(txtCon7)

        
        let txt9 = this.add.text(-195, 0, '5\n4\n3\n2', {
            fontSize : '18px',
            color : '#FFAE1D',
            fontFamily : 'OSWALD-MEDIUM',
            lineSpacing : 10,
            align: 'left'
        }).setOrigin(.5);
        txt9.setShadow(1, 1, '#000000', 2)
        let txt10 = this.add.text(-165, 0, '5000\n1000\n100\n10', {
            fontSize : '18px',
            color : '#000000',
            fontFamily : 'OSWALD-MEDIUM',
            lineSpacing : 10,
            align: 'left'
        }).setOrigin(.5);
        let txt11 = this.add.text(-55, 0, '2000\n400\n40\n5', {
            fontSize : '18px',
            color : '#000000',
            fontFamily : 'OSWALD-MEDIUM',
            lineSpacing : 10,
            align: 'left'
        }).setOrigin(.5);
        let txt12 = this.add.text(55, 0, '750\n100\n30\n5', {
            fontSize : '18px',
            color : '#000000',
            fontFamily : 'OSWALD-MEDIUM',
            lineSpacing : 10,
            align: 'left'
        }).setOrigin(.5);
        let txt13 = this.add.text(165, 0, '750\n100\n30\n5', {
            fontSize : '18px',
            color : '#000000',
            fontFamily : 'OSWALD-MEDIUM',
            lineSpacing : 10,
            align: 'left'
        }).setOrigin(.5);
        let txtCon8 = this.add.container(0, 0, [txt9, txt10, txt11, txt12, txt13]).setSize(0, 120);
        sizer.add(txtCon8)


        const image13 = this.add.image(-200,0, 'skin_texture4_level2', 'DF.png').setDisplaySize(75, 75)
        const image14 = this.add.image(-100,0, 'skin_texture4_level2', 'JF.png').setDisplaySize(75, 75)
        const image15 = this.add.image(0,0, 'skin_texture4_level2', 'LF.png').setDisplaySize(75, 75)
        const image16 = this.add.image(100,0, 'skin_texture4_level2', 'NF.png').setDisplaySize(75, 75)
        const image17 = this.add.image(200,0, 'skin_texture4_level2', 'PF.png').setDisplaySize(75, 75)
        let txtCon9 = this.add.container(0, 0, [image13, image14, image15, image16, image17]).setSize(0, 100);
        sizer.add(txtCon9)


        let txt14 = this.add.text(-230, 0, '5\n4\n3\n2', {
            fontSize : '18px',
            color : '#FFAE1D',
            fontFamily : 'OSWALD-MEDIUM',
            lineSpacing : 10,
            align: 'left'
        }).setOrigin(.5);
        txt14.setShadow(1, 1, '#000000', 2)
        let txt15 = this.add.text(-200, 0, '5000\n1000\n100\n10', {
            fontSize : '18px',
            color : '#000000',
            fontFamily : 'OSWALD-MEDIUM',
            lineSpacing : 10,
            align: 'left'
        }).setOrigin(.5);
        let txt16 = this.add.text(-100, 0, '2000\n400\n40\n5', {
            fontSize : '18px',
            color : '#000000',
            fontFamily : 'OSWALD-MEDIUM',
            lineSpacing : 10,
            align: 'left'
        }).setOrigin(.5);
        let txt17 = this.add.text(0, 0, '750\n100\n30\n5', {
            fontSize : '18px',
            color : '#000000',
            fontFamily : 'OSWALD-MEDIUM',
            lineSpacing : 10,
            align: 'left'
        }).setOrigin(.5);
        let txt18 = this.add.text(100, 0, '750\n100\n30\n5', {
            fontSize : '18px',
            color : '#000000',
            fontFamily : 'OSWALD-MEDIUM',
            lineSpacing : 10,
            align: 'left'
        }).setOrigin(.5);
        let txt19 = this.add.text(200, 0, '750\n100\n30\n5', {
            fontSize : '18px',
            color : '#000000',
            fontFamily : 'OSWALD-MEDIUM',
            lineSpacing : 10,
            align: 'left'
        }).setOrigin(.5);
        let txtCon10 = this.add.container(0, 0, [txt14, txt15, txt16, txt17, txt18, txt19]).setSize(0, 120);
        sizer.add(txtCon10)

        sizer.add(new RoundRectangle(this, {
            width: 520, height: 2, color: 0xffffff
        }))

        this.pattern()

        let numPat = 0
        let txtCon11 = this.add.container(0, 0).setSize(100, 100);
        for(let i = 0; i < 10; i++){
            // pat[i] = this.add.text(200, 0, ''+i, {
            //     fontSize : '18px',
            //     color : '#000000',
            //     fontFamily : 'OSWALD-MEDIUM',
            //     lineSpacing : 10,
            //     align: 'left'
            // });
            // txtCon11.add(pat[i])
            for(let j = numPat; j < numPat+15; j++){
                const pattern = this.patterns[j]
                pattern.setVisible(true)
                txtCon11.add(pattern)
            }
            numPat += 15
        }
        sizer.add(txtCon11)

        let txt20 = this.add.text(0, 0, this.cache.json.get('language').texts["IDS_PT_STANDARDTEXT_MONEY"], {
            fontSize : '18px',
            color : '#000000',
            fontFamily : 'OSWALD-MEDIUM',
            
            align: 'center',
            wordWrap: {
                width: 500,
                useAdvancedWrap: true,
            }
        }).setOrigin(.5);
        let txtCon12 = this.add.container(0, 0, txt20).setSize(0, 400);
        sizer.add(txtCon12)

             
        return sizer;
    }

    pattern(){
        const patterns = this.getPatterns();
        const startX = 50;
        const startY = 50;
        const cellSize = 17;
        const gap = 20;

        patterns.forEach((pattern, index) => {
            let x = startX + (index % 5) * (cellSize * 5 + gap) - 300;
            let y = startY + Math.floor(index / 5) * (cellSize * 3 + gap + 20);

            // this.add.text(x, y - 20, `Pattern ${index + 1}`, {
            //     fontSize: '8px',
            //     color: '#fff'
            // });

            this.drawPattern(pattern, x, y, cellSize);
        });

    }

    drawPattern(pattern: number[][], x: number, y: number, size: number) {
        
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 5; col++) {
                const isFilled = pattern[row][col];
                const color = isFilled ? 0xFFAE1D : 0x444444;

                this.patterns[this.numPatterns] = this.add.rectangle(
                    x + col * size,
                    y + row * size,
                    size - 2,
                    size - 2,
                    color
                ).setOrigin(0);
                this.patterns[this.numPatterns].setVisible(true)
                this.numPatterns++
            }
        }
    }

    getPatterns() {
        return [
            [ [0,0,0,0,0], [1,1,1,1,1], [0,0,0,0,0] ], // pattern 1
            [ [1,1,1,1,1], [0,0,0,0,0], [0,0,0,0,0] ], // pattern 2
            [ [0,0,0,0,0], [0,0,0,0,0], [1,1,1,1,1] ], // pattern 3
            [ [1,0,0,0,1], [0,1,0,1,0], [0,0,1,0,0] ], // pattern 4
            [ [0,0,1,0,0], [0,1,0,1,0], [1,0,0,0,1] ], // pattern 5
            [ [0,1,1,1,0], [1,0,0,0,1], [0,0,0,0,0] ], // pattern 6
            [ [0,0,0,0,0], [1,0,0,0,1], [0,1,1,1,0] ], // pattern 7
            [ [1,1,0,0,0], [0,0,1,0,0], [0,0,0,1,1] ], // pattern 8
            [ [0,0,0,1,1], [0,0,1,0,0], [1,1,0,0,0] ], // pattern 9
            [ [0,0,0,1,0], [1,0,1,0,1], [0,1,0,0,0] ], // pattern 10
        ];
    }

    addSubscribe(){
		const balance = this.GameState.balance;
		const betCoins = this.GameState.betCoins;
		const betLines = this.GameState.betLines;
		const informationText = this.GameState.informationText;
		const totalWinAmount = this.GameState.totalWinAmount;
		const coinValueList = this.GameState.coinValueList;
		const coinValue = this.GameState.coinValue;
		const coinValueCurrency = this.GameState.coinValueCurrency;
		// Subscribe to state changes to update UI reactively
		balance.subscribe((val) => {
			// if(!this.scene.isActive('MobileMenuScene')) return;
			let valueMoney = ((val / (this.GameState.coinValue.get() / 100) / 100).toFixed(0));
			this.txtCoinsText.setText(`${this.cache.json.get('language').texts['IDS_COINS_CAPTION']} ${valueMoney}`);
			this.txtBalanceText.setText(`${this.cache.json.get('language').texts['IDS_BALANCE_CAPTION']} ${coinValueCurrency.get()} ${(val / 100).toFixed(2)}`);
		});

		betCoins.subscribe((val) => {
			// if(!this.scene.isActive('MobileMenuScene')) return;
			this.txtBetText.setText(`${this.cache.json.get('language').texts['IDS_BET_CAPTION']} ${betCoins.get() * betLines.get()}`);
			this.txtBalanceBetText.setText(`${this.cache.json.get('language').texts['IDS_BET_CAPTION']} ${coinValueCurrency.get()} ${(val * (coinValue.get() / 100) * betLines.get()).toFixed(2)}`);
		});

		betLines.subscribe((val) => {
			// if(!this.scene.isActive('MobileMenuScene')) return;
			this.txtBetText.setText(`${this.cache.json.get('language').texts['IDS_BET_CAPTION']} ${betCoins.get() * betLines.get()}`);
			this.txtBalanceBetText.setText(`${this.cache.json.get('language').texts['IDS_BET_CAPTION']} ${coinValueCurrency.get()} ${(val * betCoins.get() * (coinValue.get() / 100)).toFixed(2)}`);
			
		});

		coinValue.subscribe((val) => {
			// if(!this.scene.isActive('MobileMenuScene')) return;
			let valueMoney = ((this.GameState.balance.get() / (val / 100) / 100).toFixed(0));
			this.txtCoinsText.setText(`${this.cache.json.get('language').texts['IDS_COINS_CAPTION']} ${valueMoney}`);
			this.txtBalanceBetText.setText(`${this.cache.json.get('language').texts['IDS_BET_CAPTION']} ${coinValueCurrency.get()} ${((val / 100) * betCoins.get() * betLines.get()).toFixed(2)}`);
		});

		totalWinAmount.subscribe((val) => {
			// if(!this.scene.isActive('MobileMenuScene')) return;
			this.txtWinText.setText(`${this.cache.json.get('language').texts['IDS_WIN_CAPTION']} ${coinValueCurrency.get()} ${val.toFixed(2)}`);
		});
        // Dispatcher.addListener(ACTION_EVENTS.OPEN_MENU, () => {
        //     if(!this.GameState.isMobile) return;
        //     this.defaultAutoSpins = parseInt(GameSettings.defaultAutoSpins as string)
        //     this.txtCoinsValue.setText(((this.GameState.balance / (this.GameState.coinValue / 100) / 100)).toFixed(0));
        //     this.txtBetText.setText((this.GameState.betCoins * this.GameState.betLines).toString())
        //     this.txtBalanceBetValue.setText(`${this.GameState.coinValueCurrency} ${(this.GameState.betValue).toFixed(1)}`)
        //     this.txtBalanceValue.setText(`${this.GameState.coinValueCurrency} ${(this.GameState.balance / 100).toFixed(2)}`);
        //     this.txtWinValue.setText(this.GameState.winCoins.toFixed(1))
        //     if(this.menuPage === 3){
        //         this.createIframe('https://cw.lydrst.com/CasinoHistoryMobile?pid=888&lang=en_US&gameid=100310&custid=642&nocache=1754390935388&method=open')
        //     }
        // })
        
    }
}