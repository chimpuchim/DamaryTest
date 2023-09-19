import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DespawnManager')
export abstract class DespawnManager extends Component {
    update() 
    {
        this.Despawn();
    }

    protected Despawn() 
    {
        if (!this.CanDespawn()) {
            return;
        }

        this.DespawnObj();
    }

    protected abstract CanDespawn(): boolean;

    protected DespawnObj() {}
}

