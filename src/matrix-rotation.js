export class MatrixOperationError extends Error {}

export class Matrix {
    get side() { return this.rows.length - 1; }
    get size() { return this.rows.length; }

    constructor(m) {
        this.rows = m;
        /* 1 2
           3 4
           is stored as [[1,2],[3,4]]
           indexes are from left to right and from top to bottom
        */

        // Validate that the given matrix is a square
        for (let i = 0; i <= this.side; i++) {
            if (this.rows[i].length !== this.size) {
                throw new MatrixOperationError('The matrix must be NxN for in-place rotation.');
            }
        }
    }

    rotateRight() {
        let depth = 0;
        while (depth <= this.side) {
            this._swapRowWithColumn(depth);
            if (depth > 0) {
                this._hoistHead(depth);
            }
            depth++;
        }
    }

    toString() {
        return this.rows.map(
            r => r.map(c => String(c).padStart(4)).join('')
        ).join('\n');
    }

    _hoistHead(depth) {
        const column = this.side - depth;
        for (let i = 0; i < depth; i++) {
            const head = this.rows[depth - i - 1][column];
            for (let j = depth - i; j <= this.side; j++) {
                this.rows[j - 1][column] = this.rows[j][column];
            }
            this.rows[this.side][column] = head;
        }
    }

    _swapRowWithColumn(depth) {
        const rowRow = depth;
        let rowColumn = this.side - depth;
        let columnRow = this.side;
        const columnColumn = this.side - depth;
        while (rowColumn >= 0) {
            [this.rows[rowRow][rowColumn], this.rows[columnRow][columnColumn]]
                = [this.rows[columnRow][columnColumn], this.rows[rowRow][rowColumn]];
            rowColumn--;
            columnRow--;
        }
        if (this.side - depth > 2) {
            this._reverseVector(rowRow, rowRow, 1, this.side - depth - 1);
        }
    }

    _reverseVector(startRow, endRow, startColumn, endColumn) {
        if (startRow > endRow) {
            throw new MatrixOperationError('Start row must be smaller than the end row.');
        }
        if (startColumn > endColumn) {
            throw new MatrixOperationError('Start column must be smaller than the end column.');
        }
        if (startRow === endRow) {
            let left = startColumn;
            let right = endColumn;
            while (left < right) {
                [this.rows[startRow][left], this.rows[startRow][right]]
                    = [this.rows[startRow][right], this.rows[startRow][left]];
                left++;
                right--;
            }
        } else {
            if (startColumn !== endColumn) {
                throw new MatrixOperationError('The reverse operation must be applied to a vector, not a matrix.');
            }
            let top = startRow;
            let bottom = endRow;
            while (top < bottom) {
                [this.rows[top][startColumn], this.rows[bottom][startColumn]]
                    = [this.rows[bottom][startColumn], this.rows[top][startColumn]];
                top++;
                bottom--;
            }
        }
    }
}
