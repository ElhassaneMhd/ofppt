import { TableLayout } from '@/layouts/TableLayout';
import { useOptions } from '../Shared';

export default function ArticlesList({ articles,categories }) {
  const { columns, options } = useOptions({ routeName: 'articles', resourceName: 'Article' });

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
          key: 'category',
          displayLabel: 'Category',
          visible: true,
          type: 'string',
          filter: { category: categories.map((c) => ({ value: c, checked: false })) },
        },
        {
          ...columns.date,
          displayLabel: 'Publication Date',
        },
        columns.formationYear,
        columns.tags,
        columns.createdAt,
      ]}
      {...options}
      fieldsToSearch={['title', 'details', 'location', 'publisher']}
      filters={{ ...options.filters, category: categories.map((c) => ({ value: c, checked: false })) }}
    />
  );
}
