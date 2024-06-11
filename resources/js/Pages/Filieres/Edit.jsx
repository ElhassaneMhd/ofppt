import { getFile } from '@/utils/helpers';
import Create from './Create';

export default function Edit({ filiere = {}, sectors = [] }) {
  return <Create defaultValues={{ ...filiere, files: filiere.files.map(getFile) }} sectors={sectors} isEdit={true} />;
}
