import { TableLayout } from '@/layouts/Admin/TableLayout';
import { useOptions } from '../Shared';
import { getFilter } from '@/utils/helpers';

export default function ArticlesList({ articles, categories, formationYears }) {
  const { columns, options } = useOptions({ routeName: 'articles', resourceName: 'Article', formationYears });

  return (
    <TableLayout
      data={articles}
      columns={[
        columns.id,
        columns.visibility,
        columns.title,
        {
          key: 'publisher',
          displayLabel: 'Publisher',
          visible: true,
          type: 'string',
        },
        {
          key: 'categorie',
          displayLabel: 'Category',
          visible: true,
          type: 'string',
          filter: true, 
        },
        {
          ...columns.date,
          displayLabel: 'Publication Date',
        },
        columns.formationYear,
        columns.createdAt,
      ]}
      {...options}
      fieldsToSearch={['title', 'details', 'location', 'publisher']}
      filters={{ ...options.filters, ...getFilter('categorie',categories) }}
    />
  );
}
