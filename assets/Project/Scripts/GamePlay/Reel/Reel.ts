import { Symbol } from './../Symbol/Symbol';
import { _decorator, Component, log, Node, Quat, Vec3 } from 'cc';
import { SpawnerSymbol } from '../../Spawner/SpawnerSymbol';
const { ccclass, property } = _decorator;

@ccclass('Reel')
export class Reel extends Component {
    @property(Node)
    gridLayout: Node = null;
    @property(Number)
    countSymbol: number = 35;
    @property(Number)
    numSymbolCorrect: number = 25;

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
}

