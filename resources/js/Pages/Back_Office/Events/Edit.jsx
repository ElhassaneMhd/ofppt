import { getFile } from '@/utils/helpers';
import Create from './Create';

export default function Edit({ event = {},  }) {
  return (
    <Create
      defaultValues={{ ...event, files: event.files.map(getFile) }}
      isEdit={true}
    />
  );
}
