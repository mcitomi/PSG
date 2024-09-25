var osztalyzatok = [5, 4, 3, 2, 1, "ALMA"];

for (let i = 0; i < osztalyzatok.length; i++) {
    console.log(osztalyzatok[i]);    
}

var matrix = new Array(2);

for (let i = 0; i < matrix.length; i++) {
    matrix[i] = new Array(2);

    for (let j = 0; j < matrix[i].length; j++) {
        matrix[i][j] = j;
    }
}

console.log(matrix[1][0]);

console.log("Hello világ!".length);