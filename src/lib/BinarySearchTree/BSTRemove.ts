import BinarySearchTree from '.';
import { pause } from '../../utils/animation';
import board from '../Board';
import Color from '../Colors';
import Node from '../Node';
import BSTSearch from './BSTSearch';
import {
    BSTMinimum,
  BSTNodeSetLeft,
  BSTNodeSetRight,
  BSTNodeUnsetLeft,
  BSTNodeUnsetRight,
  BSTTransplant,
} from './utils';

const SUCCESS = Color.Green;
const UNSUCCESS = Color.Red;

async function BSTRemove(t: BinarySearchTree, value: number) {
  await BSTSearch(t, value);
  let [found, ptr] = t.search(value);

  if (found) {
    ptr.color = UNSUCCESS;
    await board.draw();
    await pause();

    if (ptr.left === undefined) {
      if (ptr.right) {
        ptr.right.color = SUCCESS;
        await board.draw();
        await pause();
      }

      await BSTTransplant(t, ptr, ptr.right);
    } else if (ptr.right === undefined) {
      if (ptr.left) {
        ptr.left.color = SUCCESS;
        await board.draw();
        await pause();
      }

      await BSTTransplant(t, ptr, ptr.left);
    } else {
      await BSTMinimum(ptr.right);

      let y = t.minimum(ptr.right);
      let yTree = new BinarySearchTree(0);
      yTree.moveTo(y.box.x, y.box.y);
      yTree.root = y;

      if (y.parent !== ptr) {
        await BSTTransplant(t, y, y.right);

        board.add(yTree);
        let ptrRight = ptr.right;
        await BSTNodeUnsetRight(ptr);
        await BSTNodeSetRight(y, ptrRight);
        y.right.parent = y;
      }

      await BSTNodeSetLeft(y, await BSTNodeUnsetLeft(ptr));
      await BSTTransplant(t, ptr, y);
      y.left.parent = y;

      board.remove(yTree);

      y.color = Node.DEFAULT_COLOR;
      await board.draw();
      await pause();
    }

    await board.draw();
    await pause();
  } else {
    // Node with value not found
  }
}

export default BSTRemove;
