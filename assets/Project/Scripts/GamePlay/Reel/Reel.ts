import { Symbol } from './../Symbol/Symbol';
import { _decorator, Component, log, Node, Quat, Vec3 } from 'cc';
import { SpawnerSymbol } from '../../Spawner/SpawnerSymbol';
import { GameController } from '../../Core/GameCore/GameController';
import Server from '../../Server/Server';
const { ccclass, property } = _decorator;

@ccclass('Reel')
export class Reel extends Component {
    @property(Node)
    private gridLayout: Node = null;
    @property(Number)
    private countSymbol: number = 200;
    @property(Number)
    public numSymbolCorrect: number = 190;
    @property
    public symbolCorrects: Node[] = [];
    @property
    private speed: number = 500;
    @property
    private distance: number = 3;

    public isSpinning: boolean = false;


    start() {
        this.SpawnSymbol();
        GameController.Instance.serverInstance.registerDataRespondEvent((data) => {
            this.SetupWhenHasData(data);
        });
    }

    update(dt: number) 
    {
        if (this.isSpinning) 
        {
            this.UpdateReelPosition(dt);
        }
    }

    private SetupWhenHasData(data: number[])
    {
        this.numSymbolCorrect = data[0];

        this.symbolCorrects.splice(0, 3);

        for (let i = 0; i < this.gridLayout.children.length; i++) {
            const child = this.gridLayout.children[i];

            if(i >= this.numSymbolCorrect - 1 && i <= this.numSymbolCorrect + 1)
            {
                this.symbolCorrects.push(child);
            }
        }
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

            symbolNode.name = "Symbol" + i;
        }
    }

    public SpinReel() 
    {
        this.isSpinning = true;

        this.SetupReelOnSpin();
    }

    private UpdateReelPosition(dt) 
    {
        if (this.symbolCorrects.length === 3) 
        {
            this.distance = this.symbolCorrects[1].position.y + this.gridLayout.position.y;

            if (this.distance >= 0) 
            {
                this.isSpinning = false;
                this.speed = 0;
                this.ResetWhenDone();
            } 
            
            if(this.distance > -1000)
            {
                const maxDeceleration = 1500;
                const minSpeed = 300;

                const ratio = Math.max(this.distance / -1000, 0);
                const decelerationSpeed = this.speed - maxDeceleration * Math.pow(ratio, 2) * dt;

                this.speed = Math.max(decelerationSpeed, minSpeed);
            }
        }

        this.gridLayout.position = new Vec3(this.gridLayout.position.x, this.gridLayout.position.y + this.speed * dt, this.gridLayout.position.z);
    }

    private SetupReelOnSpin() 
    {
        for (const child of this.gridLayout.children) {
            child.children[0].children[0].active = false;
            child.children[0].children[1].active = true;
        }
    }

    private ResetWhenDone(): void 
    {
        this.gridLayout.position = new Vec3(
            this.gridLayout.position.x,
            15,
            this.gridLayout.position.z
        );

        for (let i = 0; i < this.gridLayout.children.length; i++) 
        {
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

        this.speed = 1200;
    }
}

