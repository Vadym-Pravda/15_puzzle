class Game {
    constructor(size) {
        this.size = size;
        this.moves = 0;
        this.seed = 1000;
        this.map = new Map(this.size);
        this.mapCheck = new Map(this.size);
        this.space = Coordinate.space(size);
    }

    //start game
    start() {
        this.map.createMap();
        this.map.setDefaultValues();
        this.map.setValue(this.space, 0);
        this.mapCheck.createMap();
        this.mapCheck.setDefaultValues();
        this.mapCheck.setValue(this.space, 0);
    }

    //shuffle puzzle
    shuffle() {
        function getRandInt(min, max) { //min max includes
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        if (this.seed > 0) {
            for (let i = 0; i < this.seed; i++) {
                this.pressAt(Coordinate.coord(getRandInt(0, this.size - 1), getRandInt(0, this.size - 1)));
            }
            this.moves = 0; // number of movements
        }
    }

    //press puzzle and her moving
    pressAt(selectedCoord) {
        if (this.space == selectedCoord) return 0;                                         //press by space place
        if (selectedCoord.x != this.space.x && selectedCoord.y != this.space.y) return 0;    // press by diagonal
        let steps = Math.abs(selectedCoord.x - this.space.x)
            + Math.abs(selectedCoord.y - this.space.y);
        while (selectedCoord.x != this.space.x) {                                          //shift puzzle X
            this.shift(Math.sign(selectedCoord.x - this.space.x), 0);
        }

        while (selectedCoord.y != this.space.y) {                                           //shift puzzle X
            this.shift(0, Math.sign(selectedCoord.y - this.space.y));
        }

        this.movesCount(steps);
        return steps;                                                                     //count steps
    }
    //move to a new position
    shift(sftx, sfty) {
        let next = Coordinate.addCoord(this.space, sftx, sfty);
        this.map.setValue(this.space, this.getDigitAt(next));
        this.space = Coordinate.copyCoord(next)
        this.map.setValue(next, 0);

    }
    //get digit
    getDigitAt(coord, arr) {
        if (coord == this.space) return 0;
        if (arr !== undefined) return this.mapCheck.getValue(coord);
        return this.map.getValue(coord);
    }
    // amount steps;
    movesCount(steps) {
        this.moves += steps;
        return this.moves;
    }

    //isSolved
    solved() {
        const arr1 = this.map.map.flat();
        const arr2 = this.mapCheck.map.flat();
        if (arr1.length !== arr2.length) return false;
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) return false;
        }
        return true;                            //you won
    }
}