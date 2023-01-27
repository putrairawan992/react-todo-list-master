import {
  TbArrowsSort, TbSortAscending, TbSortAscendingLetters, TbSortDescending, TbSortDescendingLetters,
} from 'react-icons/tb';
import {
  SORT_ACTIVE, SORT_ASC, SORT_DESC, SORT_NEWEST, SORT_OLDEST,
} from '../redux/todoSlice';

const sortingItems = [
  {
    id: SORT_NEWEST,
    name: 'Terbaru',
    icon: <TbSortDescending data-cy="sort-selection-icon" size={24} className="icon-sort my-auto" />,
    cy: 'sort-latest',
  },
  {
    id: SORT_OLDEST,
    name: 'Terlama',
    icon: <TbSortAscending data-cy="sort-selection-icon" size={24} className="icon-sort my-auto" />,
    cy: 'sort-oldest',
  },
  {
    id: SORT_ASC,
    name: 'A-Z',
    icon: <TbSortAscendingLetters data-cy="sort-selection-icon" size={24} className="icon-sort my-auto" />,
    cy: 'sort-az',
  },
  {
    id: SORT_DESC,
    name: 'Z-A',
    icon: <TbSortDescendingLetters data-cy="sort-selection-icon" size={24} className="icon-sort my-auto" />,
    cy: 'sort-za',
  },
  {
    id: SORT_ACTIVE,
    name: 'Belum Selesai',
    icon: <TbArrowsSort data-cy="sort-selection-icon" size={24} className="icon-sort my-auto" />,
    cy: 'sort-unfinished',
  },
];

export default sortingItems;
