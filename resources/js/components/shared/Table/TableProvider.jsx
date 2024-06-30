import { useState } from 'react';
import { Table } from './Table';
import { Search } from './Search';
import { View } from './View';
import { Pagination } from './Pagination';
import { Download } from './Download';
import { Actions } from './Actions';
import { Selected } from './Selected';
import { TableContext } from './useTable';
import { getIsoDate } from '@/utils/helpers';
import { NewRecord } from './NewRecord';
import { useMethods } from '@/hooks/useMethods';

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

Array.prototype.paginate = function (page, limit) {
  const start = (page - 1) * limit;
  const end = page * limit;

  return this.slice(start, end);
};

/**
 * TableProvider component.
 *
 * @component
 *
 * @param {Object} props - Props that get passed to the TableProvider component.
 * @param {React.ReactNode} props.children - The children nodes of the TableProvider component.
 * @param {Array} props.data - The initial data for the TableProvider component.
 * @param {string} props.resourceName - The name of the resource.
 * @param {boolean} props.isLoading - If true, the TableProvider component is in a loading state.
 * @param {Object} props.error - The error object, if any error occurred.
 * @param {Array} props.columns - The columns for the table.
 * @param {Array} props.formFields - The fields for the form.
 * @param {Object} props.formDefaults - The default values for the form.
 * @param {Array} props.fieldsToSearch - The fields to search the data in.
 * @param {Object} props.downloadOptions - The options for downloading the data.
 * @param {boolean} props.displayAllData - If true, all data is displayed.
 *
 * @returns {React.ElementType} Returns a TableContext.Provider component with the TableProvider component.
 */
export function TableProvider({
  children,
  data,
  resourceName,
  routeName,
  columns: tableColumns,
  filters: defaultFilters,
  selectedOptions: defaultSelectedOptions,
  fieldsToSearch,
  defaultSortBy,
  defaultDirection,
  downloadOptions,
  displayAllData,
  isTrashed,
}) {
  const [columns, setColumns] = useState(tableColumns);
  const [selected, setSelected] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({
    isOpen: false,
    actions: defaultSelectedOptions?.actions || [],
    deleteOptions: defaultSelectedOptions?.deleteOptions,
  });

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

  // Variables
  const rows = data?.search(query, fieldsToSearch).customFilter(filters, 'AND').customSort(sortBy, direction, columns);

  const totalItems = rows?.length;
  const totalPages = Math.ceil(totalItems / limit);

  const excludedFields = columns.filter((c) => !c.visible).map((c) => c.displayLabel);

  const csvConfig = {
    filename: downloadOptions?.csvFileName || resourceName,
    columnHeaders: columns.filter((c) => !excludedFields.includes(c.displayLabel)),
  };
  const pdfConfig = {
    filename: downloadOptions?.pdfFileName || resourceName,
    tableHeaders: columns.map((c) => c.displayLabel).filter((c) => !excludedFields.includes(c)),
  };

  const confirmOptions = {
    message: `Are you sure you want to delete this ${resourceName.toLowerCase()} ?`,
    title: `Delete ${resourceName}`,
    confirmText: 'Delete',
  };

  // Handlers

  const onChangeView = (column, showAll) => {
    if (showAll) return setColumns(columns.map((c) => ({ ...c, visible: true })));

    setColumns(
      columns.map((c) => {
        const visible = columns.filter((co) => co.visible).length === 1 ? true : !c.visible;

        return c.displayLabel === column ? { ...c, visible } : c;
      })
    );
  };

  const onSelect = (id, isAll) => {
    setSelected((prev) => {
      const selected = prev.includes(id) ? (isAll ? prev : prev.filter((s) => s !== id)) : [...prev, id];
      setSelectedOptions((prev) => ({
        ...prev,
        isOpen: selected.length > 0,
        onClose: () => setSelectedOptions((p) => ({ ...p, isOpen: false })),
      }));
      return selected;
    });
  };

  // Context value
  const context = {
    // data
    data,
    resourceName,
    routeName,
    // table
    tableColumns,
    columns,
    rows: displayAllData ? rows : rows?.paginate(page, limit),
    disabled: data?.length === 0 || (page > totalPages && !query && !appliedFiltersNumber('all')),
    // Selection
    selected,
    isSelecting: selected.length > 0,
    selectedOptions,
    onSelect,
    // search
    query,
    onSearch,
    // filter
    filters,
    appliedFiltersNumber,
    onFilter,
    // pagination
    totalItems,
    totalPages,
    page,
    limit,
    onChangeLimit,
    onPaginate,
    // view
    onChangeView,
    // sort
    sortBy,
    direction,
    onSort: (sortBy, direction) => {
      onSort(sortBy);
      onOrder(direction);
    },
    // download
    csvConfig,
    pdfConfig,
    // other
    confirmOptions,
    isTrashed,
  };

  return <TableContext.Provider value={context}>{children}</TableContext.Provider>;
}

TableProvider.Table = Table;
TableProvider.Search = Search;
TableProvider.View = View;
TableProvider.Download = Download;
TableProvider.Pagination = Pagination;
TableProvider.NewRecord = NewRecord;
TableProvider.Actions = Actions;
TableProvider.Selected = Selected;
