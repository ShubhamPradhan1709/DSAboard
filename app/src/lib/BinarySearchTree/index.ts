import BinaryTree, { BinaryTreeNode } from "../BinaryTree";

class BinarySearchTree extends BinaryTree {

  setTreeFromArray(arr: number[]) {
    if (arr.length > 0) {
      this.root = new BinaryTreeNode(arr[0]);

      for (let i = 1; i < arr.length; i++) {
        this.insert(arr[i]);
      }
    }
  }

  /**
   * Insert a new Node with given value
   * @param {number} value - value of node to be inserted
   */
  public insert(value: number) {
    let [found, parent] = this.search(value);

    if (found) {
      // Node with value is already present
    } else {
      // Tree has no nodes
      if (parent === undefined) {
        this.root = new BinaryTreeNode(value);
        this.root.moveTo(this.box.x, this.box.y);
      } else {
        if (value < parent.value) {
          parent.setLeft(value);
        }

        if (value > parent.value) {
          parent.setRight(value);
        }
      }
    }
  }

  /**
   * Search node for given value
   * if node found return [true, node]
   * else return [false, undefined]
   * @param {number} value - value of node to be inserted
   */
  search(value: number): [boolean, BinaryTreeNode] {
    if (!this.root) {
      return [false, undefined];
    }

    // Start with root Node
    let ptr = this.root;

    while (ptr) {
      if (value === ptr.value) {
        return [true, ptr];
      } else if (value < ptr.value) {
        if (ptr.left) {
          ptr = ptr.left;
        } else {
          return [false, ptr];
        }
      } else if (value > ptr.value) {
        if (ptr.right) {
          ptr = ptr.right;
        } else {
          return [false, ptr];
        }
      }
    }
  }

  /**
   * Replaces one subtree as a child of its parent with another subtree
   * @param {BinaryTreeNode} u - root of subtree to be replaced
   * @param {BinaryTreeNode} v - root of subtree that will replace u
   */
  transplant(u: BinaryTreeNode, v: BinaryTreeNode) {
    if (u.parent === undefined) {
      this.root = v;
    } else if (u === u.parent.left) {
      u.parent.left = v;
    } else if (u === u.parent.right) {
      u.parent.right = v;
    }

    if (v !== undefined) {
      v.parent = u.parent;
    }
  }

  /**
   * Delete Node with given value
   * @param {number} value - value of node to be inserted
   */
  public delete(value: number) {
    if (!this.root) {
      return;
    }

    let [found, ptr] = this.search(value);

    if (found) {
      if (ptr.left === undefined) {
        this.transplant(ptr, ptr.right);
      } else if (ptr.right === undefined) {
        this.transplant(ptr, ptr.left);
      } else {
        let y = this.minimum(ptr.right);

        if (y.parent !== ptr) {
          this.transplant(y, y.right);
          y.right = ptr.right;
          y.right.parent = y;
        }

        this.transplant(ptr, y);
        y.left = ptr.left;
        y.left.parent = y;
      }
    } else {
      // Node with value not found
    }
  }

  /**
   * Returns minimum node of a subtree
   * @param {BinaryTreeNode} node - subtree root
   */
  minimum(node: BinaryTreeNode) {
    if (node !== undefined) {
      let ptr = node;

      while (ptr.left) {
        ptr = ptr.left;
      }

      return ptr;
    }
  }
}

export default BinarySearchTree;
