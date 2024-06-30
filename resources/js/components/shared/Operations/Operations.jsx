/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react';
import { Search } from './Search';
import { Sort } from './Sort';
import { Filter } from './Filter';
import { Layout } from './Layout';
import { Pagination } from './Pagination';
import { OperationsContext } from './useOperations';
import { getIsoDate } from '@/utils/helpers';
import { useMethods } from '@/hooks/useMethods';
import { Status } from '@/components/ui';

// Array methods
Array.prototype.customFilter = function (filters, filterCondition) {
  if (!filters) return this;

  const conditions = Object.entries(filters)
    .map(([field, filter]) => ({
      field,
      value: filter.filter(({ checked }) => checked).map(({ value }) => value),
    }))
    .filter(({ value }) => value.length);

  if (!conditions.length) return this;

  return this.filter((el) => {
    const conditionFn = (c) =>
      c.value.some((val) => (val.condition ? val.condition(el) : c.value.includes(el[c.field])));
    return filterCondition === 'AND' ? conditions.every(conditionFn) : conditions.some(conditionFn);
  });
};

Array.prototype.customSort = function (sortBy, direction, sortOptions) {
  if (!sortOptions) return this;

  const stringFields = sortOptions.filter((c) => c.type === 'string').map((c) => c.key);
  const numberFields = sortOptions.filter((c) => c.type === 'number').map((c) => c.key);
  const dateFields = sortOptions.filter((c) => c.type === 'date').map((c) => c.key);
  const customFields = sortOptions.filter((c) => c.type === 'custom').map((c) => c.key);

  return this.toSorted((a, b) => {
    if (numberFields.includes(sortBy))
      return direction === 'asc' ? a?.[sortBy] - b?.[sortBy] : b?.[sortBy] - a?.[sortBy];

    if (stringFields.includes(sortBy)) {
      return direction === 'asc' ? a?.[sortBy]?.localeCompare(b?.[sortBy]) : b?.[sortBy]?.localeCompare(a?.[sortBy]);
    }

    if (dateFields.includes(sortBy)) {
      return direction === 'asc'
        ? getIsoDate(a?.[sortBy]) - getIsoDate(b?.[sortBy])
        : getIsoDate(b?.[sortBy]) - getIsoDate(a?.[sortBy]);
    }

    if (customFields.includes(sortBy)) return sortOptions.find((c) => c.key === sortBy)?.fn(a, b, direction);
  });
};

Array.prototype.search = function (query, fieldsToSearch) {
  if (!query || !fieldsToSearch) return this;

  return this.filter((el) => {
    const valueToSearch = fieldsToSearch.map((field) => el[field]).join(' ');
    return valueToSearch?.trim().toLowerCase().includes(query?.trim().toLowerCase());
  });
};

// const constructFilterString = (filters) => {
//   let filterString = "";

//   Object.keys(filters).forEach((key) => {
//     const checkedFilters = filters[key]
//       .filter(({ checked }) => checked)
//       .map(({ value }) => value)
//       .join(",");

//     if (checkedFilters)
//       filterString = `${
//         filterString ? filterString + "&" : ""
//       }${key}=${checkedFilters}`;
//   });

//   return filterString;
// };

/**
 * Operations component.
 *
 * @component
 *
 * @param {Object} props - Props that get passed to the Operations component.
 * @param {React.ReactNode} props.children - The children nodes of the Operations component.
 * @param {Array} props.data - The initial data for the Operations component.
 * @param {Array} props.sortOptions - The options for sorting the data.
 * @param {string} props.defaultSortBy - The default field to sort the data by.
 * @param {string} props.defaultDirection - The default direction to sort the data in.
 * @param {Object} props.filters - The initial filters for the Operations component.
 * @param {string} props.defaultLayout - The default layout for the Operations component.
 * @param {Array} props.fieldsToSearch - The fields to search the data in.
 * @param {string} paginationKey - The key used for pagination. Default is 'page'.
 * @param {string} searchQueryKey - The key used for search queries. Default is 'search'.
 * @param {string} sortQueryKey - The key used for sorting queries. Default is 'sort'.
 * @param {string} directionQueryKey - The key used for direction queries. Default is 'dir'.
 * @param {boolean} showAll - Flag to indicate if all items should be shown. Default is false.
 *
 * @returns {React.ElementType} Returns a OperationsContext.Provider component with the Operations component.
 */
export function Operations({
  children,
  data: initialData,
  sortOptions,
  defaultSortBy,
  defaultDirection,
  filters: defaultFilters,
  defaultLayout,
  fieldsToSearch,
}) {
  const [filterCondition, setFilterCondition] = useState('AND');
  const [layout, setLayout] = useState(defaultLayout, 'grid');

  const {
    query,
    page,
    limit,
    sortBy,
    direction,
    filters,
    onSearch,
    onPaginate,
    onChangeLimit,
    onOrder,
    onSort,
    onFilter,
    appliedFiltersNumber,
  } = useMethods({
    defaultSortBy,
    defaultDirection,
    defaultFilters,
  });

  const data = initialData
    ?.search(query, fieldsToSearch)
    .customFilter(filters, filterCondition)
    .customSort(sortBy, direction, sortOptions);

  const totalItems = data?.length;
  const totalPages = Math.ceil(totalItems / limit);
  const pageNotFound = page > totalPages && !query && !appliedFiltersNumber('all');
  // Perform operations

  const onChangeFilterCondition = () => setFilterCondition((prev) => (prev === 'OR' ? 'AND' : 'OR'));

  const onchangeLayout = (layout) => setLayout(layout);

  const renderData = (render, name) => {
    if (pageNotFound) return <Status status='pageNotFound' />;
    if (data?.length === 0 && (query || appliedFiltersNumber('all')))
      return (
        <Status status='noResults' heading={`No ${name} found`} message='Try changing your search query or filters' />
      );
    return render();
  };

  const context = {
    initialData,
    data: data?.paginate(page, limit),
    disabled: initialData?.length === 0 || pageNotFound,
    renderData,
    query,
    onSearch,
    sortBy,
    sortOptions,
    onSort,
    direction,
    onOrder,
    defaultFilters,
    filters,
    filterCondition,
    appliedFiltersNumber,
    onFilter,
    onChangeFilterCondition,
    layout,
    onchangeLayout,
    page,
    totalPages,
    totalItems,
    limit,
    pageNotFound,
    onChangeLimit,
    onPaginate,
  };
  return <OperationsContext.Provider value={context}>{children}</OperationsContext.Provider>;
}

Operations.Search = Search;
Operations.Sort = Sort;
Operations.Filter = Filter;
Operations.Layout = Layout;
Operations.Pagination = Pagination;
