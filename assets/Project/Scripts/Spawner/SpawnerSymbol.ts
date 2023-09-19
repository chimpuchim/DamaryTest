import { _decorator, Component, Node, Vec3, Quat } from 'cc';
import SpawnManager from '../Core/Spawn/SpawnManager/SpawnManager';
const { ccclass, property } = _decorator;

@ccclass('SymbolSpawner')
export class SpawnerSymbol extends SpawnManager {
    public static Instance: SpawnerSymbol;
    public static SymbolName: string = "Symbol";

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

    public override Spawn(prefabName: string, position: Vec3, rotation: Quat): Node 
    {
        
        const prefab = this.GetPrefabByName(prefabName);
        if (!prefab) {
            return null;
        }

        const newPrefab = this.GetObjectFromPool(prefab);
        newPrefab.setPosition(position);
        newPrefab.setRotation(rotation);
        newPrefab.setParent(this.holder);
        newPrefab.active = true;

        return newPrefab;
    }
}

