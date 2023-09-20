import { _decorator, Component, Node } from 'cc';
import { Reel } from '../../GamePlay/Reel/Reel';
import Server from '../../Server/Server';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {

    public static Instance: GameController;

    @property(Node)
    private reelNotes: Node[] = new Array<Node>(5);
    @property
    public reels: Reel[] = [];

    public serverInstance: Server;
    

    onLoad() {
        if (GameController.Instance == null) 
        {
            GameController.Instance = this;
        } 
        else 
        {
            this.node.destroy();
        }

        this.serverInstance = new Server();
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

