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
    private countSymbol: number = 35;
    @property(Number)
    private numSymbolCorrect: number = 25;
    @property
    private currentSpeed: number = 1000;

    public symbolCorrect: Node = null;


    start(): void 
    {
        this.SpawnSymbol();
    }

    private SpawnSymbol()
    {
        SpawnerSymbol.Instance.holder = this.gridLayout;
        for (let i = 0; i < this.countSymbol; i++) {
            const symbolNode = SpawnerSymbol.Instance.Spawn(SpawnerSymbol.SymbolName, new Vec3(0, 0, 0), Quat.IDENTITY);

            if(i == this.numSymbolCorrect - 1)
            {
                this.symbolCorrect = symbolNode;
            }
        }
    }

    public async SpinReel() {
        while (GameController.Instance.isStart) {
            await this.UpdateReelPosition();
        }
    }

    private async UpdateReelPosition() {
        while (this.gridLayout.position.y < -this.symbolCorrect.position.y) {
            const deltaTime: number = await this.WaitForNextFrame();

            this.gridLayout.position = new Vec3(
                this.gridLayout.position.x,
                this.gridLayout.position.y + this.currentSpeed * deltaTime,
                this.gridLayout.position.z
            );

            if (this.gridLayout.position.y >= -this.symbolCorrect.position.y) {
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
}

