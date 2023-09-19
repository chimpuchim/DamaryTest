import { _decorator, Component, Node, log } from 'cc';
import { ButtonManager } from '../Core/UI/ButtonManager';
import { GameController } from '../Core/GameCore/GameController';
const { ccclass, property } = _decorator;

@ccclass('StartSpinBtn')
export class StartSpinBtn extends ButtonManager {
    protected async ClickEvent() {
        const reels = GameController.Instance.reels;
        for (let i = 0; i < reels.length; i++) {
            const reel = reels[i];
            GameController.Instance.isStart = true;
            await this.delay(100 * i);
            reel.SpinReel();
        }
    }
    
    private delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    protected update(dt: number): void 
    {
        if(GameController.Instance.isStart)
        {
            this.button.interactable = false;
            return;
        }
        
        this.button.interactable = true;
    }
}

