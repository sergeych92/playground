export class MatrixOperationError extends Error {}

export function rotateMatrixTricky(matrix) {
    let n = matrix.length;
    if(n <= 1)
        return matrix;
    
    let tmp = 0;
    /* transpose of a matrix */
    for(let i=0;i<n;i++){
        for(let j=i;j<n;j++){
            tmp = matrix[j][i];
            matrix[j][i] = matrix[i][j]
            matrix[i][j] = tmp;
        }
    
        /* swap columns */
        for(let j=0;j<n/2;j++){
            tmp = matrix[i][j];
            matrix[i][j] = matrix[i][n-1-j]
            matrix[i][n-1-j] = tmp;
        }
    }
    return matrix;
}

export function rotateMatrixByLayer(matrix, layer = 0) {
    if (matrix.length <= 1 || layer + layer + 2 > matrix.length) {
        return matrix;
    } else {
        const side = matrix.length - 1;
        const columnLeft = layer;
        const columnRight = side - layer;
        const rowTop = layer;
        const rowBottom = side - layer;
        for (let x = 0; x < columnRight - columnLeft; x++) {
            [
                matrix[rowTop][columnLeft + x],
                matrix[rowTop + x][columnRight],
                matrix[rowBottom][columnRight - x],
                matrix[rowBottom - x][columnLeft]
            ]
            =
            [
                matrix[rowBottom - x][columnLeft],
                matrix[rowTop][columnLeft + x],
                matrix[rowTop + x][columnRight],
                matrix[rowBottom][columnRight - x],
            ];
        }
        return rotateMatrixByLayer(matrix, layer + 1);
    }
}

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
        // let depth = 0;
        // while (depth <= this.side) {
        //     this._swapRowWithColumn(depth);
        //     if (depth > 0) {
        //         this._hoistHead(depth);
        //     }
        //     depth++;
        // }
        return rotateMatrixByLayer(this.rows, 0);
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
