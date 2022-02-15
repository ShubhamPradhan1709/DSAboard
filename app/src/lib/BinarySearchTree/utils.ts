import { pause } from "../../utils/animation";
import { BinaryTreeNode } from "../BinaryTree";
import BinarySearchTree from ".";
import board from "../Board";
import Node from "../Node";
import Color from "../Colors";
import { BTNodeSetLeft, BTNodeSetRight } from "../BinaryTree/utils";

const PRIMARY = Color.Violet;
const SUCCESS = Color.Green;

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
    await BTNodeSetLeft(u.parent, v);
  } else if (u === u.parent.right) {
    await BTNodeSetRight(u.parent, v);
  }

  if (v !== undefined) {
    v.parent = u.parent;
  }

  await board.draw();
}
