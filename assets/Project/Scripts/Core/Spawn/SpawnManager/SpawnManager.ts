import { _decorator, Component, instantiate, log, Node, Quat, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SpawnManager')
export default abstract class SpawnManager extends Component {
    @property([Node])
    protected prefabs: Node[] = [];

    @property([Node])
    protected poolObjs: Node[] = [];

    @property(Node)
    public holder: Node = null;
    

    onLoad()
    {
        this.HidePrefabs();
    }

    protected HidePrefabs() {
        this.prefabs.forEach((obj) => {
            obj.active = false;
        });
    }

    public DeSpawn(obj: Node) {
        this.poolObjs.push(obj);
        obj.active = false;
    }

    public Spawn(prefabName: string, position: Vec3, rotation: Quat): Node {
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

    protected GetObjectFromPool(prefab: Node): Node {
        const index = this.poolObjs.findIndex((poolObject) => poolObject.name === prefab.name);
        if (index !== -1) {
            const poolObject = this.poolObjs.splice(index, 1)[0];
            return poolObject;
        }

        const newPrefab = instantiate(prefab);
        newPrefab.name = prefab.name;

        return newPrefab;
    }

    public GetPrefabByName(prefabName: string): Node {
        return this.prefabs.find((prefab) => prefab.name === prefabName);
    }
}

