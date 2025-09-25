import Dispatcher, { AUDIO_EVENTS } from "@gl/events/Dispatcher";
import { inject, injectable } from "inversify";
import { Scene } from "phaser";
import { container } from "./di/container";
import VideoSlotReelsManager from "@games/videoslot/VideoSlotReelsManager";

@injectable()
class AudioManager {
   
    bootScene: Scene;
    constructor(
        // TODO: Change to generic ReelsManager if other game types will use AudioManager
        @inject("VideoSlotReelsManager") private reelsManager: VideoSlotReelsManager = container.get<VideoSlotReelsManager>("VideoSlotReelsManager")
    ) {
        Dispatcher.addListener(AUDIO_EVENTS.BGM_PLAY, () => {
            this.playBGM();
        });
        Dispatcher.addListener(AUDIO_EVENTS.BGM_STOP, () => {
            this.stopBGM();
        });

        Dispatcher.addListener(AUDIO_EVENTS.SWITCH_BGM_FREE_SPIN, () => {
            this.switchBGMFreeSpin();
        });

        Dispatcher.addListener(AUDIO_EVENTS.SWITCH_BGM_NORMAL, () => {
            this.switchBGMNormal();
        });

        Dispatcher.addListener(AUDIO_EVENTS.MUTE_AUDIO, () => {
            this.bootScene.sound.mute = true;
        });
        Dispatcher.addListener(AUDIO_EVENTS.UNMUTE_AUDIO, () => {
            this.bootScene.sound.mute = false;
        });

        Dispatcher.addListener(AUDIO_EVENTS.REEL_START, () => {
            this.bootScene.sound.play('reel_start');
            this.bootScene.sound.play('reel_loop', {
                loop: true,
                volume: 0.5
            });
        });
        Dispatcher.addListener(AUDIO_EVENTS.REEL_STOP, () => {
            this.bootScene.sound.play('reel_stop');
            this.bootScene.sound.stopByKey('reel_loop');
        });

        Dispatcher.addListener(AUDIO_EVENTS.WIN_LINE_SOUND, (index: number) => {
            if(this.reelsManager.scatterInfo.isScatterSpin) {
                this.bootScene.sound.play(`win_line_${index+1}_scatter`);
            } else {
                this.bootScene.sound.play(`win_line_${index+1}`);
            }
        });
    }

    bindBootScene(scene: Scene){
        this.bootScene = scene;
    }

    switchBGMFreeSpin(){
        this.bootScene.sound.stopByKey('bgm');
        this.bootScene.sound.stopByKey('bgm_layer1');
        this.bootScene.sound.stopByKey('bgm_layer2');
        this.bootScene.sound.stopByKey('bgm_layer3');
        this.bootScene.sound.play('bgm_free_spin', {
            loop: true,
            volume: 0.5
        });
    }

    switchBGMNormal(){
        this.bootScene.sound.stopByKey('bgm_free_spin');
        this.bootScene.sound.play('bgm', {
            loop: true,
            volume: 0.5
        });
        this.bootScene.sound.play('bgm_layer1', {
            loop: true,
            volume: 0.5
        });
        this.bootScene.sound.play('bgm_layer2', {
            loop: true,
            volume: 0.5
        });
        this.bootScene.sound.play('bgm_layer3', {
            loop: true,
            volume: 0.5
        });
    }


    playBGM(){
        this.bootScene.sound.play('bgm', {
            loop: true,
            volume: 0.5
        });
        this.bootScene.sound.play('bgm_layer1', {
            loop: true,
            volume: 0.5
        });
        this.bootScene.sound.play('bgm_layer2', {
            loop: true,
            volume: 0.5
        });
        this.bootScene.sound.play('bgm_layer3', {
            loop: true,
            volume: 0.5
        });
    }

    stopBGM(){
        this.bootScene.sound.stopByKey('bgm');
        this.bootScene.sound.stopByKey('bgm_layer1');
        this.bootScene.sound.stopByKey('bgm_layer2');
        this.bootScene.sound.stopByKey('bgm_layer3');
    }

    
}

export default AudioManager;