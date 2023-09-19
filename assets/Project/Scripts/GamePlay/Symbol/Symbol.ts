import { _decorator, Component, Node, Sprite, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Symbol')
export class Symbol extends Component {
    @property(Sprite)
    public norSprite: Sprite = null;
    @property(SpriteFrame)
    public norSpriteFrames: SpriteFrame[] = [];
    @property(Sprite)
    public blurSprite: Sprite = null;
    @property(SpriteFrame)
    public blurSpriteFrames: SpriteFrame[] = [];

}

