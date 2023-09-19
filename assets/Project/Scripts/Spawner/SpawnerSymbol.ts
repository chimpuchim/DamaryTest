import { _decorator, Component, Node, Vec3, Quat } from 'cc';
import SpawnManager from '../Core/Spawn/SpawnManager/SpawnManager';
const { ccclass, property } = _decorator;

@ccclass('SymbolSpawner')
export class SpawnerSymbol extends SpawnManager {
    static Instance: SpawnerSymbol;
    static SymbolName: string = "Symbol";

    onLoad() {
        super.onLoad();
        if (SpawnerSymbol.Instance == null) 
        {
            SpawnerSymbol.Instance = this;
        } 
        else 
        {
            this.node.destroy();
        }
    }
}

