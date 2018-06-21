var OptionsTree = function(matrix) {
  var newTree = {};
  newTree.board = matrix;

  Object.assign(newTree, treeMethods);
  newTree.children = [];

  return newTree;
};

var treeMethods = {};

//Input: value
//Output: none (side effect: added child object in memory with pointer in tree)
treeMethods.addChild = function(matrix) {
  var child = OptionsTree(matrix);
  this.children.push(child);

};

//Input: 
treeMethods.contains = function(target) {
  var node = this;
  var check = function(node) {
    var result = false;
    
    if (node.value === target) {
      return true;
    } else {
      for (var i = 0; i < node.children.length; i++) {
        if (!result) {
          result = check(node.children[i]);
        }
      }
      
      return result;
    }
  };
  return check(node);
};

  var empty = new Board(n);
  var possibilities = [];
  for (var i = 0; i < n; i++) {
    var row = Math.floor(i / n);
    var column = i % n;
    var play = empty.attributes;
    play[row]
    var play = empty;
    var possibilities.push(new OptionsTree(empty)); 
  }
  
  //tree helper function, accepts board position & returns object if noConflict w/ rook position & children array
//create tree of boards, starting w/ position & populating child arrays w/ each play
//

//return new Board(solution);