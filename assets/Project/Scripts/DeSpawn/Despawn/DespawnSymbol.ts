import { _decorator, Component, Node } from 'cc';
import { DespawnByBtn } from '../DespawnType/DespawnByBtn';
import { SpawnerSymbol } from '../../Spawner/SpawnerSymbol';
const { ccclass, property } = _decorator;

@ccclass('DespawnSymbol')
export class DespawnSymbol extends DespawnByBtn {
    protected DespawnObj(): void 
    {
        SpawnerSymbol.Instance.DeSpawn(this.node.parent);  
    }
}

