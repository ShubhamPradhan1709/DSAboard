import { BinaryTreeNode } from ".";
import board from "../Board";

export async function BTNodeSetLeft(
  node: BinaryTreeNode,
  child: BinaryTreeNode
) {
  await BTNodeUnsetLeft(node);

  if (child) {
    node.left = child;
    child.parent = node;

    for (let i = 0; i <= 100; i += 2) {
      node.leftEdgePercent = i;
      await board.draw();
    }
  }
}

export async function BTNodeSetRight(
  node: BinaryTreeNode,
  child: BinaryTreeNode
) {
  await BTNodeUnsetRight(node);

  if (child) {
    node.right = child;
    child.parent = node;

    for (let i = 0; i <= 100; i += 2) {
      node.rightEdgePercent = i;
      await board.draw();
    }
  }
}

export async function BTNodeUnsetLeft(node: BinaryTreeNode) {
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

export async function BTNodeUnsetRight(node: BinaryTreeNode) {
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

