import { BinaryTreeNode } from "../BinaryTree";
import BinarySearchTree from ".";
import Color from "../Colors";
import { BTNodeSetLeft, BTNodeSetRight } from "../BinaryTree/utils";
import board from "../../App/Canvas/Board";

const PRIMARY = Color.Violet;
const SUCCESS = Color.Green;

export async function BSTMinimum(node: BinaryTreeNode) {
  if (node !== undefined) {
    let ptr = node;

    ptr.color = PRIMARY;
    await board.render();
    await board.pause();

    while (ptr.left) {
      ptr.color = Color.Transparent;

      ptr = ptr.left;

      ptr.color = PRIMARY;
      await board.render();
      await board.pause();
    }

    ptr.color = SUCCESS;
    await board.render();
    await board.pause();

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

  await board.render();
}
