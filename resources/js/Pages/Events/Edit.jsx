import { getFile } from '@/utils/helpers';
import Create from './Create';

export default function Edit({ event = {}, formationYears = [] }) {
  return (
    <Create
      defaultValues={{ ...event, files: event.files.map(getFile) }}
      formationYears={formationYears}
      isEdit={true}
    />
  );
}
