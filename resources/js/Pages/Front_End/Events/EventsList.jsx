import { Operations } from '@/components/shared/Operations/Operations';
import { useOperations } from '@/components/shared/Operations/useOperations';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import Event from './Event';
import { useState } from 'react';
import { Button, Modal, Status } from '@/components/ui';
import { PiCalendar, PiCaretLeftFill, PiCaretRightFill, PiX } from 'react-icons/pi';
import { DateTime } from 'luxon';
import { getIsoDate } from '@/utils/helpers';

export default function EventsList() {
  const [date, setDate] = useState(null); // type : day | month , date : DateTime
  const { data, layout, renderData } = useOperations();
  const [parent] = useAutoAnimate({ duration: 500 });

  const events = data.filter((event) => {
    const eventDate = DateTime.fromISO(getIsoDate(event.date));

    if (date && date.type === 'day') return eventDate.hasSame(date.date, 'day');
    if (date && date.type === 'month') {
      return eventDate.hasSame(date.date, 'month') && eventDate.hasSame(date.date, 'year');
    }
    return true;
  });

  return (
    <div className='flex flex-1 flex-col gap-8 overflow-hidden'>
      <div className='flex sm:flex-row sm:items-center flex-col justify-between gap-3 pt-2'>
        <div className='flex gap-3'>
          <Operations.Search parentClassName='flex-1 sm:flex-none'  />
          <div className='flex gap-3'>
            <Operations.Sort />
            <Operations.Filter />
          </div>
        </div>
        <DatePicker date={date} setDate={setDate} />
      </div>

      <div className='relative flex min-h-screen flex-1 flex-col gap-8 p-1 pr-2' ref={parent}>
        {events.length === 0 && date ? (
          <Status
            status='noResults'
            heading='No events found'
            message='No events found for the selected date. Please try again with a different date.'
          />
        ) : (
          renderData(() => events.map((event) => <Event key={event.id} event={event} layout={layout} />), 'events')
        )}
      </div>
      <Operations.Pagination name='events' />
    </div>
  );
}

function DatePicker({ date, setDate }) {
  const [isOpen, setIsOpen] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(DateTime.now().startOf('month'));
  const [selectedDate, setSelectedDate] = useState(null);

  const getMonth = (dir) => {
    let month = currentMonth;
    if (dir === 'prev') month = currentMonth.minus({ months: 1 });
    if (dir === 'next') month = currentMonth.plus({ months: 1 });
    return month;
  };

  const onMonthClick = (dir) => {
    const date = getMonth(dir);
    setCurrentMonth(date);
    setDate({ type: 'month', date });
  };

  const onDayClick = (day, dir) => {
    const month = getMonth(dir);
    const date = day ? currentMonth.set({ day }).set({ month: month.month }) : null;
    setSelectedDate(date);
    setCurrentMonth(month);
    setDate(day ? { type: 'day', date } : { type: 'month', date: month });
    setIsOpen(false);
  };

  // Days from previous month to show
  const daysFromPrevMonth = currentMonth.startOf('month').weekday - 1;
  const prevMonthDaysToShow = Array.from(
    { length: daysFromPrevMonth },
    (_, i) => currentMonth.minus({ months: 1 }).daysInMonth - i
  ).reverse();

  // Days from next month to show
  const totalSlots = 6 * 7;
  const daysDisplayed = prevMonthDaysToShow.length + currentMonth.daysInMonth;
  const nextMonthDaysToShow = Array.from({ length: totalSlots - daysDisplayed }, (_, i) => i + 1);

  return (
    <>
      <div className='flex max-sm:justify-between items-center gap-1'>
        <Button display='with-icon' className='flex-1 max-sm:justify-center ' color='tertiary' onClick={() => setIsOpen(true)}>
          <PiCalendar />
          <span>
            {date && date.type === 'day'
              ? date.date.toFormat('dd MMMM yyyy')
              : date && date.type === 'month'
                ? date.date.toFormat('MMMM yyyy')
                : 'Select Date'}
          </span>
        </Button>
        {date && (
          <Button
            shape='icon'
            size='small'
            className='rounded-full bg-transparent hover:bg-red-500'
            onClick={() => setDate(null)}
          >
            <PiX />
          </Button>
        )}
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} className='rounded-xl h-fit w-fit border border-border p-7'>
        <div className='flex items-center justify-between'>
          <Button shape='icon' className='rounded-full bg-transparent' onClick={() => onMonthClick('prev')}>
            <PiCaretLeftFill />
          </Button>
          <h3 className='font-semibold text-text-primary'>{currentMonth.toFormat('MMMM yyyy')}</h3>
          <Button shape='icon' className='rounded-full bg-transparent' onClick={() => onMonthClick('next')}>
            <PiCaretRightFill />
          </Button>
        </div>
        <div className='mt-5 grid grid-cols-7 gap-3'>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className='text-center text-sm text-text-primary'>
              {day}
            </div>
          ))}
          {prevMonthDaysToShow.map((day) => (
            <Day key={`prev-${day}`} day={day} currentMonth={false} onClick={() => onDayClick(day, 'prev')} />
          ))}

          {Array(currentMonth.daysInMonth)
            .fill(null)
            .map((_, day) => {
              const selected = selectedDate?.hasSame(currentMonth.set({ day: day + 1 }), 'day');
              return (
                <Day
                  key={`current-${day}`}
                  day={day + 1}
                  selected={selected}
                  currentMonth={true}
                  onClick={() => onDayClick(selected ? null : day + 1)}
                />
              );
            })}

          {nextMonthDaysToShow.map((day) => (
            <Day key={`next-${day}`} day={day} currentMonth={false} onClick={() => onDayClick(day, 'next')} />
          ))}
        </div>
      </Modal>
    </>
  );
}

function Day({ day, selected, currentMonth, onClick }) {
  return (
    <button
      className={`grid h-9 w-9 place-content-center justify-self-center rounded-full text-center text-sm ${selected ? 'bg-black text-white dark:bg-white dark:text-black' : `bg-transparent hover:bg-background-secondary ${currentMonth ? 'text-text-primary' : 'text-text-disabled'}`} `}
      onClick={onClick}
    >
      {day}
    </button>
  );
}
