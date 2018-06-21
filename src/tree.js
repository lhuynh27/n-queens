var OptionsTree = function(matrix) {
  var newTree = {};
  newTree.position = matrix;

  Object.assign(newTree, treeMethods);
  newTree.children = [];

  return newTree;
};

var treeMethods = {};

//Input: value
//Output: none (side effect: added child object in memory with pointer in tree)
treeMethods.addChild = function(matrix) {
  var child = Tree(matrix);
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
