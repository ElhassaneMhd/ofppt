import { SearchParams } from '@/utils/SearchParams';
import { PAGE_LIMIT } from '@/utils/constants';
import { getIsoDate } from '@/utils/helpers';
import { usePage, useRemember } from '@inertiajs/react';
import { useEffect, useState } from 'react';

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

export const useMethods = ({ defaultSortBy = 'id', defaultDirection = 'desc', defaultFilters = {} }) => {
  const [filters, setFilters] = useState(defaultFilters);
  const [state, setState] = useRemember({ checked: {} });

  const { url } = usePage();

  const searchParams = new SearchParams({
    endpoint: url,
    cleanupConditions: { search: '', page: '1', sort: defaultSortBy, dir: defaultDirection, limit: PAGE_LIMIT },
  });

  useEffect(() => {
    setFilters((prev) => {
      const updated = {};
      Object.keys(prev).forEach((key) => {
        updated[key] = prev[key].map((f) => ({
          ...f,
          checked: f.checked || state.checked[key]?.includes(f.id) || false,
        }));
      });
      return updated;
    });
  }, [state, url]);

  const query = searchParams.get('search') || '';
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || PAGE_LIMIT;
  const sortBy = searchParams.get('sort') || defaultSortBy;
  const direction = searchParams.get('dir') || defaultDirection;

  const onSearch = (query) => {
    searchParams.set('search', query);
    searchParams.delete('page');
  };

  const onPaginate = (page) => searchParams.set('page', page);

  const onChangeLimit = (limit) => searchParams.set('limit', limit);

  const onSort = (column) => searchParams.set('sort', column);

  const onOrder = (direction) => searchParams.set('dir', direction);

  const onFilter = (key, value) => {
    const updatedFilters = {
      ...filters,
      [key]: filters[key].map((f) => (f.value === value ? { ...f, checked: !f.checked } : f)),
    };
    setFilters(updatedFilters);

    setState((prev) => ({
      ...prev,
      checked: Object.keys(updatedFilters).reduce(
        (acc, key) => ({ ...acc, [key]: updatedFilters[key].filter(({ checked }) => checked).map(({ id }) => id) }),
        {}
      ),
    }));
    if (page !== 1) onPaginate(1);
  };

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

  return {
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
  };
};

export const onFilter = (filters, setFilters, initialFilters) => (key, value, reset) => {
  if (reset) return setFilters(initialFilters);

  const filter = filters[key].map((f) => (f.value === value ? { ...f, checked: !f.checked } : f));
  setFilters({ ...filters, [key]: filter });
};
