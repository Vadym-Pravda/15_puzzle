/*
    ^ X
    |
    |           Y
 ---|------------>
 
*/
class Map {
    constructor(size) {
        this.size = size;
        this.map = [];
        this._count = 0;
    }
    createMap() {
        for (let arr = 0; arr < this.size; arr++) {
            this.map.push([]);
        }
        return this.map;
    }
    setDefaultValues() {
        for (let x = 0; x < this.size; x++) {
            for (let y = 0; y < this.size; y++) {
                this._count++;
                this.setValue(Coordinate.coord(x, y), this._count);
            }
        }
        return this.map;
    }
    setValue(coord, value) {
        if (Coordinate.onBoard(coord, this.size))
            this.map[coord.x][coord.y] = value;
    }
    getValue(coord) {
        if (Coordinate.onBoard(coord, this.size))
            return this.map[coord.x][coord.y];
        return 0;
    }
}
