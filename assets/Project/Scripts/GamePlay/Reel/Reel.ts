import { Symbol } from './../Symbol/Symbol';
import { _decorator, Component, log, Node, Quat, Vec3 } from 'cc';
import { SpawnerSymbol } from '../../Spawner/SpawnerSymbol';
import { GameController } from '../../Core/GameCore/GameController';
const { ccclass, property } = _decorator;

@ccclass('Reel')
export class Reel extends Component {
    @property(Node)
    private gridLayout: Node = null;
    @property(Number)
    private countSymbol: number = 32;
    @property(Number)
    private numSymbolCorrect: number = 25;
    @property
    private currentSpeed: number = 2000;
    @property
    public symbolCorrects: Node[] = [];


    start(): void 
    {
        this.SpawnSymbol();
    }

    private SpawnSymbol()
    {
        SpawnerSymbol.Instance.holder = this.gridLayout;
        for (let i = 0; i < this.countSymbol; i++) {
            const symbolNode = SpawnerSymbol.Instance.Spawn(SpawnerSymbol.SymbolName, new Vec3(0, 0, 0), Quat.IDENTITY);
            
            const symbol: Symbol = symbolNode.getComponent(Symbol);

            const randomNumber = Math.floor(Math.random() * 9);

            symbol.norSprite.spriteFrame = symbol.norSpriteFrames[randomNumber];
            symbol.blurSprite.spriteFrame = symbol.blurSpriteFrames[randomNumber];

            if(i >= this.numSymbolCorrect - 1 && i <= this.numSymbolCorrect + 1)
            {
                symbolNode.name = "hehe"
                this.symbolCorrects.push(symbolNode);
            }
        }
    }

    public async SpinReel() 
    {
        for (const child of this.gridLayout.children) 
        {
            child.children[0].children[0].active = false;
            child.children[0].children[1].active = true;
        }

        while (GameController.Instance.isStart) 
        {
            await this.UpdateReelPosition();
        }

        this.ResetWhenDone();
    }

    private async UpdateReelPosition() 
    {
        const targetPositionY = -this.symbolCorrects[1].position.y;
        let currentSpeed = this.currentSpeed;

        while (this.gridLayout.position.y < targetPositionY) {
            const deltaTime: number = await this.WaitForNextFrame();

            const distanceToTarget = this.symbolCorrects[1].position.y + this.gridLayout.position.y;

            if (distanceToTarget < 200) {
                currentSpeed -= 400 * deltaTime;
                currentSpeed = Math.max(currentSpeed, 300);
            }

            this.gridLayout.position = new Vec3(
                this.gridLayout.position.x,
                this.gridLayout.position.y + currentSpeed * deltaTime,
                this.gridLayout.position.z
            );

            if (this.gridLayout.position.y >= targetPositionY) {
                GameController.Instance.isStart = false;
                break;
            }
        }
    }

    private WaitForNextFrame(): Promise<number> {
        return new Promise<number>((resolve) => {
            requestAnimationFrame(() => {
                resolve(1 / 60);
            });
        });
    }

    private ResetWhenDone(): void 
    {
        this.gridLayout.position = new Vec3(
            this.gridLayout.position.x,
            15,
            this.gridLayout.position.z
        );

        for (let i = 0; i < this.gridLayout.children.length; i++) {
            const child = this.gridLayout.children[i];
            child.children[0].children[1].active = false;
            child.children[0].children[0].active = true;
            
            const symbol: Symbol = child.getComponent(Symbol);

            if(i <= 2)
            {
                symbol.norSprite.spriteFrame = this.symbolCorrects[i].getComponent(Symbol).norSprite.spriteFrame;
                symbol.blurSprite.spriteFrame = this.symbolCorrects[i].getComponent(Symbol).blurSprite.spriteFrame;
            }
        }
    }
}

