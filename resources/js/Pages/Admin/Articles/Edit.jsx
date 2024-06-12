import { getFile } from '@/utils/helpers';
import Create from './Create';

export default function Edit({ article = {}, categories = [],}) {
  return <Create defaultValues={{...article,files: article.files.map(getFile)}} categories={categories} isEdit={true} />;
}
