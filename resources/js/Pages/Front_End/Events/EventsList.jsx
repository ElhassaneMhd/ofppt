import { Operations } from '@/components/shared/Operations/Operations';
import { useOperations } from '@/components/shared/Operations/useOperations';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import Event from './Event';

export default function EventsList() {
  const { data: events, layout, renderData } = useOperations();
  const [parent] = useAutoAnimate({ duration: 500 });

  return (
    <div className='flex flex-1 flex-col gap-8 overflow-hidden'>
      <div className='flex items-center justify-between gap-3 pt-2'>
        <div className='flex gap-3'>
          <Operations.Search />
          <div className='flex gap-3'>
            <Operations.Sort />
            <Operations.Filter />
          </div>
        </div>
      </div>

      <div
        className='relative min-h-screen flex-1 gap-8  p-1 pr-2 flex flex-col'
        ref={parent}
      >
        {renderData(() => events.map((event) => <Event key={event.id} event={event} layout={layout} />), 'events')}
      </div>
      <Operations.Pagination  name='events' />
    </div>
  );
}
