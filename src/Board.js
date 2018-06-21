// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var row = this.get(rowIndex);
      var hasPieceThere = false;
      for (var i = 0; i < row.length; i++) {
        if (row[i] === 1) {
          if (hasPieceThere) {
            return true;
          }
          hasPieceThere = true;
        }
      }  
      return false;       
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      for (var i = 0; i < this.attributes.n; i++) { //n is the key, i < 4
        if (this.hasRowConflictAt(i)) {
          return true; //runs hasRowConflictAt method on each row, and returns the overall results so if any line has a conflict, it returns true
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var hasPieceThere = false; //set var for hasPieceThere = false;
      var n = this.attributes.n; //set var to identify number of columns
      for (var i = 0; i < n; i++) { //loop through each row accessing the colIndex position
        var row = this.attributes[i]; //if hasPieceThere = true && found second piece, return true
        if (row[colIndex] === 1) {
          if (hasPieceThere) {
            return true;
          }
          hasPieceThere = true; //else if found, update hasPieceThere
        }
      }
      return false; //if we didn't find a conflict, return false
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var columns = this.attributes.n;
      for (var i = 0; i < columns; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    
    //lets you test the top right "triangle" for conflicts, one line at a function call
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var hasPiece = false;
      var n = this.attributes.n;
      var firstRow = this.attributes[0];
      var colIndex = majorDiagonalColumnIndexAtFirstRow;
      // check column index in first row
      if (firstRow[colIndex] === 1) {
        hasPiece = true;
      }
      // check one row down, one column over
      // etc. n times
      for (var i = 1; i < n; i++) {
        var row = this.attributes[i];
        if (row[colIndex + i] === 1) {
          if (hasPiece) {
            return true;
          } else {
            hasPiece = true;
          }
        }
      }
      return false;
    },

    // test if any major diagonals on this board contain conflicts
    //used hMDCA() to loop over top right "triangle," then used separate loop to go over bottom left "triangle"
    hasAnyMajorDiagonalConflicts: function() {
      for (var i = 0; i < this.attributes.n; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      //check bottom left triangle
      //start at R1 loop through R1 -> n
      for (var i = 1; i < this.attributes.n; i++) {
        var row = this.attributes[i];
        var hasPiece = false;
        if (row[0] === 1) { //check index[0] of current row for piece
          hasPiece = true;
        }
        for (var j = i + 1; j < this.attributes.n; j++) {
          var row2 = this.attributes[j];
          if (row2[j - 1] === 1) { //checking index decremented by one
            if (hasPiece) {
              return true;
            } else {
              hasPiece = true;
            }
          } 
        }
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var hasPiece = false;
      var n = this.attributes.n;
      for (var i = 0; i < n; i++) {
        var row = this.attributes[i];
        var index = minorDiagonalColumnIndexAtFirstRow - i;
        if (row[index] === 1) {
          if (hasPiece) {
            return true;
          } else {
            hasPiece = true;
          }
        }
      }
      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var n = this.attributes.n;
      //upper left half via hMDCA
      for (var i = 0; i < n; i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      //bottom right half
      for (var j = 1; j < n; j++) {
        var hasPiece = false;
        var row = this.attributes[j];
        var index = n;
        if (row[index] === 1) {
          if (hasPiece) {
            return true;
          } else {
            hasPiece = true;
          }
        }
        for (var k = j + 1; k < n; k++) {
          var row2 = this.attributes[k];
          var index2 = n - (k - 1);
          if (row2[index2] === 1) {
            if (hasPiece) {
              return true;
            } else {
              hasPiece = true;
            }
          }
        }
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
