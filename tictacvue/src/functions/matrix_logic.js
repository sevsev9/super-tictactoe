module.exports = {
    checkWinner(matrix, char) {
        var ret = 0;
        this.vectorize(this.createBinMap(matrix, char)).forEach(function (row) {
            row.forEach(function (val) {
                if (val >= matrix.length) {
                    ret++;
                }
            })
        });

        return ret;
    },
    createBinMap(matrix, chr) {
        let bin_matrix = [];
        for (let i = 0; i < matrix.length; i++) {
            let row = [];
            for (let j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] === chr) {
                    row.push(1)
                } else {
                    row.push(0)
                }
            }
            bin_matrix.push(row)
        }
        return bin_matrix;
    },
    //returns:
    //[
    //  [horizontal sums]
    //  [vertical sums]
    //  [diagonal sums]
    //]
    vectorize(bin_matrix) {
        let sums = [];
        sums.push(this.calculateRowSums(bin_matrix));
        sums.push(this.calculateRowSums(this.rotateMatrix(bin_matrix)));
        sums.push(this.calculateDiagonalSums(bin_matrix));
        return sums;
    },
    calc_sum(arr) {
        let sum = 0;
        arr.forEach(function (x) {
            sum += x;
        });
        return sum;
    },
    calculateRowSums(bin_matrix) {
        let sums = [];
        for (let i = 0; i < bin_matrix.length; i++) {
            let row_sum = this.calc_sum(bin_matrix[i]);
            sums.push(row_sum);
        }
        return sums;
    },
    calculateDiagonalSums(matrix) {
        let sums = [0, 0];
        const N = matrix.length - 1;
        for (let i = 0; i <= N; i++) {
            sums[0] += matrix[i][i];
            sums[1] += matrix[i][N - i];
        }
        return sums;
    },
    rotateMatrix(matrix) {
        const N = matrix.length - 1;
        const result = matrix.map((row, i) => row.map((val, j) => matrix[N - j][i]));
        matrix.length = 0;
        matrix.push(...result);
        return matrix;
    }
};
