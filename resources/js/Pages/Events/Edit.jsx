import Create from './Create';

export default function Edit({ event = {}, formationYears = [] }) {
  return <Create defaultValues={event} formationYears={formationYears} isEdit={true} />;
}
