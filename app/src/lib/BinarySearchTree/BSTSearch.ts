import BinarySearchTree from ".";
import board from "../../App/Canvas/Board";
import { BinaryTreeNode } from "../BinaryTree";
import Color from "../Colors";

const PRIMARY = Color.Violet;
const SUCCESS = Color.Green;
const UNSUCCESS = Color.Red;

async function BSTSearch(t: BinarySearchTree, value: number) {
  let ptr = t.root;

  ptr.color = PRIMARY;
  await board.render();

  while (ptr !== undefined && ptr.value !== value) {
    ptr.color = PRIMARY;
    await board.render();
    await board.pause();

    ptr.color = Color.Transparent;
    await board.render();
    await board.pause();

    if (value < ptr.value) {
      ptr = ptr.left;
    } else if (value > ptr.value) {
      ptr = ptr.right;
    }
  }

  if (ptr) {
    ptr.color = SUCCESS;
    await board.render();
    await board.pause();
    await board.pause();

    ptr.color = Color.Transparent;
    await board.render();
    await board.pause();
  } else {
    const colorAll = async (node: BinaryTreeNode, color: Color) => {
      node.color = color;
      if (node.left) await colorAll(node.left, color);
      if (node.right) await colorAll(node.right, color);
    };

    await colorAll(t.root, UNSUCCESS);
    await board.render();
    await board.pause();

    await colorAll(t.root, Color.Transparent);
    await board.render();
  }
}

export default BSTSearch;
