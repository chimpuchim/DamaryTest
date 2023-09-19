import { _decorator, Component, log, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Reel')
export class Reel extends Component {
    @property(Node)
    gridLayout: Node = null;

    onLoad(): void 
    {
        
    }
}

