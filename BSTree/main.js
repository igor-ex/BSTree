
function BSTree() {
    this.root = null;
}

BSTree.prototype.insert = function (val) {
    if (this.root === null) {
        this.root = new Entry(val, null);
    } else {
        this.root.insert(val);
    }
};

BSTree.prototype.find = function (val) {
    if (this.root === null) {
        return null;
    } else {
        return this.root.find(val);
    }
};

BSTree.prototype.remove = function (val) {
    if (this.root === null) {
        return;
    }
    const tree = this.root.remove(val);
    this.root = tree;
    if (tree !== null) {
        tree.parent = null;
    }
};

BSTree.prototype.toString = function () {
    if (this.root === null) {
        return '{}';
    }
    const arr = [];
    this.root.inOrder(function (val) {
        arr.push(val);
    });
    return '{' + arr.join(', ') + '}';
};

BSTree.prototype.toArray = function () {
    if (this.root === null) {
        return [];
    }
    const arr = [];
    this.root.inOrder(function (val) {
        arr.push(val);
    });
    return arr;
};

BSTree.prototype.empty = function () {
    if (this.root !== null) {
        this.root.parent = null;
        this.root = null;
    }
};

BSTree.prototype.toLinkedList = function () {
    const lList = new LList;
    if (this.root === null) {
        return lList;
    }
    this.root.inOrder(function (val) {
        lList.push(val);
    });
    return lList;
};

BSTree.prototype.inOrder = function (callback) {
    if (this.root === null) {
        return null;
    } else {
        return this.root.inOrder(callback);
    }
};

function Entry(val, parent) {
    this.parent = typeof parent === 'undefined' ? null : parent;
    this.val = val;
    this.left = null;
    this.right = null;
}

Entry.prototype.insert = function (val) {
    if (val < this.val) {
        if (this.left === null) {
            this.left = new Entry(val, this);
        } else {
            this.left.insert(val);
        }
    } else {
        if (this.right === null) {
            this.right = new Entry(val, this);
        } else {
            this.right.insert(val);
        }
    }
};

// Когдадаляет родителя с двумя детьми, то не перемещает объект самый меньший правой ветки, а только значение
// Entry.prototype.remove = function (val) {
//     if (val < this.val) {
//         if (this.left !== null) {
//             this.left = this.left.remove(val);
//             if (this.left !== null) {
//                 this.left.parent = this;
//             }
//         }
//     } else if (val > this.val) {
//         if (this.right !== null) {
//             this.right = this.right.remove(val);
//             if (this.right !== null) {
//                 this.right.parent = this;
//             }
//         }
//     } else if(this.left !== null && this.right !== null) {
//         this.val = (this.right.getMin()).val;
//         this.right = this.right.remove(this.val);
//     } else {
//         if (this.left !== null) {
//             return this.left;
//         } else {
//             return this.right;
//         }
//     }
//     return this;
// };


Entry.prototype.remove = function (val) {
    if (val < this.val) {
        if (this.left !== null) {
            this.left = this.left.remove(val);
            if (this.left !== null) {
                this.left.parent = this;
            }
        }
    } else if (val > this.val) {
        if (this.right !== null) {
            this.right = this.right.remove(val);
            if (this.right !== null) {
                this.right.parent = this;
            }
        }
    } else if(this.left !== null && this.right !== null) {
        const newThis = this.right.getMin();
        newThis.right = this.right.remove(newThis.val);
        if (newThis.right !== null) {
            newThis.right.parent = newThis;
        }
        newThis.left = this.left;
        if (newThis.left !== null) {
            newThis.left.parent = newThis;
        }
        return newThis;
    } else {
        if (this.left !== null) {
            return this.left;
        } else {
            return this.right;
        }
    }
    return this;
};

Entry.prototype.find = function (val) {
    if (this.val === val) {
        return this;
    }
    if (val < this.val) {
        if (this.left === null) {
            return null;
        } else {
            return this.left.find(val);
        }
    } else {
        if (this.right === null) {
            return null;
        } else {
            return this.right.find(val);
        }
    }
};

Entry.prototype.inOrder = function (callback) {
    if (this.left !== null) {
        this.left.inOrder(callback);
    }
    callback(this.val);
    if (this.right !== null) {
        this.right.inOrder(callback);
    }
};

Entry.prototype.getMin = function () {
    if (this.left === null) {
        return this;
    }
    return this.left.getMin();
};
