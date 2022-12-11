export class Position {
    column;
    row;

    constructor(rowValue, columnValue) {
        this.column = columnValue;
        this.row = rowValue;
    }

    get row() {
        return this.row;
    }

    get column() {
        return this.column;
    }

    set row(value) {
        this.row = value;
    }

    set column(value) {
        this.column = value;
    }
}