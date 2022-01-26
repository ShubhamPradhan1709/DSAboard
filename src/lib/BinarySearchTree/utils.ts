import { pause } from "../../utils/animation";
import { BinaryTreeNode } from "../BinaryTree";
import BinarySearchTree from ".";
import board from "../Board";
import Node from "../Node";
import Color from "../Colors";

const PRIMARY = Color.Violet;
const SUCCESS = Color.Green;

export async function BSTNodeSetLeft(
  node: BinaryTreeNode,
  child: BinaryTreeNode
) {
  await BSTNodeUnsetLeft(node);

  if (child) {
    node.left = child;
    child.parent = node;

    for (let i = 0; i <= 100; i += 2) {
      node.leftEdgePercent = i;
      await board.draw();
    }
  }
}

export async function BSTNodeSetRight(
  node: BinaryTreeNode,
  child: BinaryTreeNode
) {
  await BSTNodeUnsetRight(node);

  if (child) {
    node.right = child;
    child.parent = node;

    for (let i = 0; i <= 100; i += 2) {
      node.rightEdgePercent = i;
      await board.draw();
    }
  }
}

export async function BSTNodeUnsetLeft(node: BinaryTreeNode) {
  if (node.left) {
    for (let i = 100; i >= 0; i -= 2) {
      node.leftEdgePercent = i;
      await board.draw();
    }
  }

  let nodeLeft = node.left;

  node.left = undefined;

  return nodeLeft;
}

export async function BSTNodeUnsetRight(node: BinaryTreeNode) {
  if (node.right) {
    for (let i = 100; i >= 0; i -= 2) {
      node.rightEdgePercent = i;
      await board.draw();
    }
  }

  let nodeRight = node.right;

  node.right = undefined;

  return nodeRight;
}

export async function BSTMinimum(node: BinaryTreeNode) {
  if (node !== undefined) {
    let ptr = node;

    ptr.color = PRIMARY;
    await board.draw();
    await pause();

    while (ptr.left) {
      ptr.color = Node.DEFAULT_COLOR;

      ptr = ptr.left;

      ptr.color = PRIMARY;
      await board.draw();
      await pause();
    }

    ptr.color = SUCCESS;
    await board.draw();
    await pause();

    return ptr;
  }
}

export async function BSTTransplant(
  t: BinarySearchTree,
  u: BinaryTreeNode,
  v: BinaryTreeNode
) {
  if (u.parent === undefined) {
    t.root = v;
  } else if (u === u.parent.left) {
    await BSTNodeSetLeft(u.parent, v);
  } else if (u === u.parent.right) {
    await BSTNodeSetRight(u.parent, v);
  }

  if (v !== undefined) {
    v.parent = u.parent;
  }

  await board.draw();
}
