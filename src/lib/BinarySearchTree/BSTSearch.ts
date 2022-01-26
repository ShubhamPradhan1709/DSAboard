import BinarySearchTree from ".";
import { pause } from "../../utils/animation";
import { BinaryTreeNode } from "../BinaryTree";
import board from "../Board";
import Color from "../Colors";
import Node from "../Node";

const PRIMARY = Color.Violet;
const SUCCESS = Color.Green;
const UNSUCCESS = Color.Red;

async function BSTSearch(t: BinarySearchTree, value: number) {
  let ptr = t.root;

  ptr.color = PRIMARY;
  await board.draw();

  while (ptr !== undefined && ptr.value !== value) {
    ptr.color = PRIMARY;
    await board.draw();
    await pause();

    ptr.color = Node.DEFAULT_COLOR;
    await board.draw();
    await pause();

    if (value < ptr.value) {
      ptr = ptr.left;
    } else if (value > ptr.value) {
      ptr = ptr.right;
    }
  }

  if (ptr) {
    ptr.color = SUCCESS;
    await board.draw();
    await pause();
    await pause();

    ptr.color = Node.DEFAULT_COLOR;
    await board.draw();
    await pause();
  } else {
    const colorAll = async (node: BinaryTreeNode, color: Color) => {
      node.color = color;
      if (node.left) await colorAll(node.left, color);
      if (node.right) await colorAll(node.right, color);
    };

    await colorAll(t.root, UNSUCCESS);
    await board.draw();
    await pause();

    await colorAll(t.root, Node.DEFAULT_COLOR);
    await board.draw();
  }
}

export default BSTSearch;
