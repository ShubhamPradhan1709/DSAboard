import BubbleSort from './BubbleSort';
import InsertionSort from './InsertionSort';
import MergeSort from './MergeSort';
import QuickSort from './QuickSort';
import SelectionSort from './SelectionSort';


const algoList = [
  {
    name: 'Insertion Sort',
    func: InsertionSort,
  },
  {
    name: 'Merge Sort',
    func: MergeSort,
  },
  {
    name: 'Bubble Sort',
    func: BubbleSort,
  },
  {
    name: 'Quick Sort',
    func: QuickSort,
  },
  {
    name: 'Selection Sort',
    func: SelectionSort,
  },
];

export default algoList;
