/*
Helper Class. Work with coordinates
*/
class Coordinate {
    static coord(x, y) {
        let coord = {};
        coord['x'] = x || 0;
        coord['y'] = y || 0;
        return coord;
    }
    static space(size) {
        let space = {};
        space['x'] = size - 1;
        space['y'] = size - 1;
        return space;
    }
    static onBoard(coord, size) {
        if (coord.x < 0 || coord.x > size - 1) return false;
        if (coord.y < 0 || coord.y > size - 1) return false;
        return true;
    }
    static addCoord(space, sftx, sfty) {
        return Coordinate.coord(space.x + sftx, space.y + sfty);
    }
    static copyCoord(next) {
        return Coordinate.coord(next.x, next.y);
    }
}