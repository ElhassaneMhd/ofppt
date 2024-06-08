import { useEffect, useState } from 'react';
import { Table } from './Table';
import { Search } from './Search';
import { View } from './View';
import { Pagination } from './Pagination';
import { Download } from './Download';
import { PAGE_LIMIT } from '../../../utils/constants';
import { TableRecord } from './TableRecord';
import { Actions } from './Actions';
import { NewRecord } from './NewRecord';
import { Selected } from './Selected';
import { TableContext } from './useTable';
import { usePage } from '@inertiajs/react';
import { getIsoDate, setSearchParams } from '@/utils/helpers';

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
  isLoading,
  error,
  columns: tableColumns,
  formFields,
  selectedOptions: defaultSelectedOptions,
  formDefaults,
  fieldsToSearch,
  defaultSortBy = 'id',
  defaultDirection = 'desc',
  downloadOptions,
  displayAllData,
}) {
  const [columns, setColumns] = useState(tableColumns);
  const [selected, setSelected] = useState([]);
  const [formOptions, setFormOptions] = useState({
    defaultValues: formDefaults,
    fields: formFields,
    onSubmit: () => {},
    resetToDefault: true,
    gridLayout: true,
    submitButtonText: '',
    heading: '',
    isOpen: false,
    type: 'create',
  });
  const [selectedOptions, setSelectedOptions] = useState({
    isOpen: false,
    actions: defaultSelectedOptions?.actions || [],
    deleteOptions: defaultSelectedOptions?.deleteOptions,
  });
  const [filters, setFilters] = useState({});

  const { props } = usePage();
  const query = props.search || '';
  const page = Number(props.page) || 1;
  const limit = Number(props.limit) || PAGE_LIMIT;
  const sortBy = props.sort || defaultSortBy;
  const direction = props.dir || defaultDirection;

  // Variables
  console.log(data);
  const rows = data?.search(query, fieldsToSearch).customFilter(filters, 'AND').customSort(sortBy, direction, columns);

  const totalItems = rows?.length;
  const totalPages = Math.ceil(totalItems / limit);

  const appliedFiltersNumber = (filter) => {
    if (filter === 'all')
      return Object.values(filters)
        .flat()
        .filter((f) => f.checked).length;

    if (!filters[filter]) return;

    return Object.values(filters[filter])
      .flat()
      .filter((f) => f.checked).length;
  };

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

  // useEffect(() => {
  //   if (page === 1) searchParams.delete('page');
  //   if (sortBy === defaultSortBy && direction === defaultDirection) {
  //     searchParams.delete('sort');
  //     searchParams.delete('dir');
  //   }
  //   if (!query) searchParams.delete('search');
  //   setSearchParams(searchParams);
  // }, [direction, page, searchParams, sortBy, query, setSearchParams, defaultSortBy, defaultDirection]);

  useEffect(() => {
    setColumns(tableColumns);
    setFilters(
      tableColumns
        .filter((col) => col.filter)
        .reduce((acc, col) => {
          acc[col.key] = col.filter;
          return acc;
        }, {}) || {}
    );
  }, [tableColumns]);

  // Handlers

  const onSearch = (query) => {
    searchParams.set('search', query);
    searchParams.delete('page');
    setSearchParams(searchParams);
  };

  const onPaginate = (page) => {
    searchParams.set('page', page);
    setSearchParams(searchParams);
  };

  const onChangeLimit = (limit) => {
    searchParams.set('limit', limit);
    setSearchParams(searchParams);
  };

  const onChangeView = (column, showAll) => {
    if (showAll) return setColumns(columns.map((c) => ({ ...c, visible: true })));

    setColumns(
      columns.map((c) => {
        const visible = columns.filter((co) => co.visible).length === 1 ? true : !c.visible;

        return c.displayLabel === column ? { ...c, visible } : c;
      })
    );
  };

  const onSort = (column, direction) => {
    searchParams.set('sort', column);
    searchParams.set('dir', direction);
    setSearchParams(searchParams);
  };

  const onFilter = (filters, setFilters, initialFilters) => (key, value, reset) => {
    if (reset) return setFilters(initialFilters);

    const filter = filters[key].map((f) => (f.value === value ? { ...f, checked: !f.checked } : f));
    setFilters({ ...filters, [key]: filter });
  };

  const showForm = (options) => {
    setFormOptions((prev) => ({
      ...prev,
      ...options,
      close: () => {
        setFormOptions((prev) => ({
          ...prev,
          isOpen: false,
          defaultValues: formDefaults,
          heading: '',
          submitButtonText: '',
        }));
      },
    }));
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
    isLoading,
    error,
    // table
    tableColumns,
    columns,
    rows: displayAllData ? rows : rows?.paginate(page, limit),
    disabled: isLoading || error || data?.length === 0 || (page > totalPages && !query && !appliedFiltersNumber('all')),
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
    onFilter: onFilter(filters, setFilters),
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
    onSort,
    // download
    csvConfig,
    pdfConfig,
    // other
    formOptions,
    formFields,
    showForm,
    confirmOptions,
  };

  return <TableContext.Provider value={context}>{children}</TableContext.Provider>;
}

TableProvider.Table = Table;
TableProvider.Search = Search;
TableProvider.View = View;
TableProvider.Download = Download;
TableProvider.Pagination = Pagination;
TableProvider.NewRecord = NewRecord;
TableProvider.TableRecord = TableRecord;
TableProvider.Actions = Actions;
TableProvider.Selected = Selected;
