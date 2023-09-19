import { _decorator, Component, Node } from 'cc';
import { Reel } from '../../GamePlay/Reel/Reel';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {

    public static Instance: GameController;

    @property
    public isStart: boolean = false;
    @property(Node)
    private reelNotes: Node[] = new Array<Node>(5);
    @property
    public reels: Reel[] = [];


    onLoad() {
        if (GameController.Instance == null) 
        {
            GameController.Instance = this;
        } 
        else 
        {
            this.node.destroy();
        }
    }

    protected start(): void 
    {
        this.SetupReels();
    }

    private SetupReels()
    {
        this.reelNotes.forEach((reelNote) => {
            this.reels.push(reelNote.getComponent(Reel));
        });
    }
}

