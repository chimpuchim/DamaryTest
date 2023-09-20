export default class Server {
    private _dataRespondCallbacks: Function[] = [];

    public registerDataRespondEvent(callback: (data: number[]) => void): void {
        this._dataRespondCallbacks.push(callback);
    }

    public requestSpinData(): void {
        const delay = this._randomRange(100, 1500) + ((Math.random() > 0.8) ? 2000 : 0);
        setTimeout(() => {
            const randomNumber = this._randomRange(50, 60, true);
            const data: number[] = [randomNumber];
            this._dataRespondCallbacks.forEach((callback) => {
                callback(data);
            });
        }, delay);
    }

    private _randomRange(min: number, max: number, int: boolean = false): number {
        const delta = max - min;
        const rnd = Math.random();
        let result = min + rnd * delta;

        if (int) {
            result = Math.round(result);
        }

        return result;
    }
}