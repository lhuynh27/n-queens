/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// goal: return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

//build empty board matrix: new Board(n)

window.findNRooksSolution = function(n) {
  var solution = [];
  //empty board matrix of n size
  var board = new Board({n: n});
  //iterate from 0 to n - 1
  console.log(board);
  for (var i = 0; i < n; i++) {
    board.attributes[i][i] = 1; //for each row at that index, place a rook at index[i]
  }
  for (var i = 0; i < n; i++) {
    solution.push(board.attributes[i]);
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //create count of possibilities
  var board = new Board({n:n}); //create board object for successful rook placements w/in place function
  
  var place = function(currentRow, remainingRooks) { //create recursive function that places rooks w/out conflict
    
    if (remainingRooks === 0) {
        solutionCount++; //& increment solutionCount
        return;
    }
    
    //if not base case
    // for (var r = currentRow; r < n; r++) { //loop through all unpopulated rows
    for (var c = 0; c < n; c++) { //loop through column indices
      board.togglePiece(currentRow, c); 
      if (!board.hasAnyRowConflicts() && !board.hasAnyColConflicts()) {
        place(currentRow + 1, remainingRooks - 1); //and place remaining rooks
      }
      board.togglePiece(currentRow, c);                 
    }
    // }   
  };
  
  place(0, n);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  if (n === 0) {
    var solution = 0;
    // console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
    return solution;
  }
  var solution = [];
  //empty board matrix of n size
  var board = new Board({n: n});
  //iterate from 0 to n - 1
  var index = 1;
  debugger;
  for (var r = 0; r < n; r++) {
    if (index > n - 1 || n === 1) {
      index = 0;
    }
    board.togglePiece(r, index); //for each row at that index, place a queen at index[i]
    index += 2;
  }
  for (var i = 0; i < n; i++) {
    solution.push(board.attributes[i]);
  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //create count of possibilities
  var board = new Board({n:n}); //create board object for successful queen placements w/in place function
  
  var place = function(currentRow, remainingQueens) { //recursive function that places queens w/out conflict
    
    if (remainingQueens === 0) {
      solutionCount++; //increment solutionCount
      return solutionCount;
    }
    
    //if not base case
    for (var c = 0; c < n; c++) { //loop through column indices
      board.togglePiece(currentRow, c); 
      if (!board.hasAnyQueensConflicts()) {
        place(currentRow + 1, remainingQueens - 1); //and place remaining queens
      }
      board.togglePiece(currentRow, c);                 
    }  
  };
  place(0, n);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
