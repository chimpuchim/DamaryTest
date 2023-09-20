import { _decorator, Component, Node, log } from 'cc';
import { ButtonManager } from '../Core/UI/ButtonManager';
import { GameController } from '../Core/GameCore/GameController';
import Server from '../Server/Server';
import { Reel } from '../GamePlay/Reel/Reel';
const { ccclass, property } = _decorator;

@ccclass('StartSpinBtn')
export class StartSpinBtn extends ButtonManager {
    
    protected lateUpdate(dt: number): void 
    {
        for (let i = 0; i < GameController.Instance.reels.length; i++) 
        {
            if(GameController.Instance.reels[i].isSpinning === true)
            {
                return;
            }
            
            this.button.interactable = true;
        }
    }

    protected async ClickEvent() 
    {
        this.button.interactable = false;
        GameController.Instance.serverInstance.requestSpinData();

        for (let i = 0; i < GameController.Instance.reels.length; i++) 
        {
            await this.delay(100 * i);
            GameController.Instance.reels[i].SpinReel();
        }

    }
    
    private delay(ms) 
    {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}

