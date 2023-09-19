import { _decorator, Component, Node, log } from 'cc';
import { ButtonManager } from '../Core/UI/ButtonManager';
import { GameController } from '../Core/GameCore/GameController';
const { ccclass, property } = _decorator;

@ccclass('StartSpinBtn')
export class StartSpinBtn extends ButtonManager {
    protected ClickEvent() {
        GameController.Instance.reels.forEach((reel) => {
            GameController.Instance.isStart = true;
            reel.SpinReel();
        });
    }
}

