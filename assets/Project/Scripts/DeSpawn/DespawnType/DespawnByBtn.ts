import { _decorator, Component, Node } from 'cc';
import { DespawnManager } from '../../Core/Despawn/DespawnManager';
const { ccclass, property } = _decorator;

@ccclass('DespawnByBtn')
export class DespawnByBtn extends DespawnManager {
    protected CanDespawn(): boolean 
    {
        return false;
    }
}

