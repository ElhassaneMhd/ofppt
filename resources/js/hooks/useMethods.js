import { SearchParams } from '@/utils/SearchParams';
import { PAGE_LIMIT } from '@/utils/constants';
import { usePage, useRemember } from '@inertiajs/react';
import { useEffect, useState } from 'react';

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
