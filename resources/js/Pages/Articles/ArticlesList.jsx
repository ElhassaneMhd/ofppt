import { TableLayout } from '@/layouts/TableLayout';
import { useOptions } from '../Shared';

export default function ArticlesList({ articles }) {
  const { columns, options } = useOptions({ routeName: 'articles', resourceName: 'Article' });

  return (
    <TableLayout
      data={articles}
      columns={[
        columns.id,
        columns.visibility,
        columns.title,
        columns.details,
        {
          key: 'publisher',
          displayLabel: 'Publisher',
          visible: true,
          type: 'string',
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
    />
  );
}
