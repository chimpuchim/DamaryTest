import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {

    static Instance: GameController;

    onLoad() {
        super.onLoad();
        if (GameController.Instance == null) 
        {
            GameController.Instance = this;
        } 
        else 
        {
            this.node.destroy();
        }
    }
}

