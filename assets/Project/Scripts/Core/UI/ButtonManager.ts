import { _decorator, Button, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ButtonManager')
export abstract class ButtonManager extends Component {
    @property(Button)
    button: Button = null;
    

    onLoad(): void 
    {
        this.AddOnClickButton();
    }

    private AddOnClickButton(): void
    {
        this.button.node.on('click', this.ClickEvent, this);
    }

    protected abstract ClickEvent();
}

