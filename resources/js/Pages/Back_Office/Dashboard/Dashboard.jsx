import PageLayout from '@/layouts/Back_Office/PageLayout';
import PieChartStats, { Legend, createCustomTooltip } from './PieChart';
import { Bar, BarChart, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useNavigate } from '@/hooks/useNavigate';
import { Stat } from './Stat';
import { Button } from '@/components/ui';
import { IoPeople, IoBriefcaseOutline, GrArticle, BsCalendar4Event } from '@/components/ui/Icons';
import { usePage } from '@inertiajs/react';
import { useUser } from '@/hooks';

export default function Dashboard({ stats = {} }) {
  return (
    <PageLayout title='Dashboard'>
      <div className='flex h-full py-3 pr-2 flex-col gap-5 overflow-auto'>
        <div className='grid gap-5 md:grid-cols-3'>
          <Stats stats={stats} />
          <Sectors stats={stats} />
        </div>
        <Analytics stats={stats} />
      </div>
    </PageLayout>
  );
}

function Stats({ stats }) {
  const { navigate } = useNavigate();
  const { user } = useUser();

  const statistics = [
    { value: 'Filieres', icon: <IoBriefcaseOutline /> },
    { value: 'Events', icon: <BsCalendar4Event /> },
    { value: 'Articles', icon: <GrArticle /> },
  ].map(({ value, icon }) => ({
    label: { value: value },
    value: stats?.[value.toLocaleLowerCase()],
    icon: { icon: icon },
    onClick: () => navigate({ url: `${value.toLocaleLowerCase()}.index` }),
  }));

  return (
    <div className='grid gap-3 sm:grid-cols-2 md:grid-cols-1'>
      {statistics.map((stat, index) => (
        <Stat key={index} {...stat} className={index === statistics.length - 1 ? 'sm:col-span-2 md:col-span-1' : ''} />
      ))}
      {user.role === 'super-admin' && (
        <div className='flex items-start justify-between rounded-lg border-[1.2px] shadow-md border-border p-3 sm:col-span-2 md:col-span-1'>
          <div className='space-y-5'>
            <h4 className='text-sm font-medium text-text-secondary'>Total Personnel</h4>
            <div className='flex flex-wrap gap-2'>
              {[
                { name: 'Admins', value: stats?.users?.admins,param : 'super-admin' },
                { name: 'Gestionaires', value: stats?.users?.gestionaires,param : 'gestionaire' },
              ].map(({ name, value,param }) => (
                <Button
                  key={name}
                  display='with-icon'
                  color='tertiary'
                  onClick={() => navigate({ url: 'users.index', params: { role: param } })}
                >
                  <h3 className='font-bold lg:text-xl'>{value}</h3>
                  <h5 className='text-xs capitalize lg:text-sm'>{name}</h5>
                </Button>
              ))}
            </div>
          </div>
          <Button shape='icon'>
            <IoPeople />
          </Button>
        </div>
      )}
    </div>
  );
}

function Sectors({ stats }) {
  const sectors = stats?.filieres.sectors;
  const COLORS = [
    '#003366',
    '#004080',
    '#0059b3',
    '#0073e6',
    '#004d99',
    '#004d00',
    '#006600',
    '#008000',
    '#009900',
    '#00b300',
    '#660000',
    '#800000',
    '#990000',
    '#b30000',
    '#cc0000',
    '#e60000',
  ];

  return (
    <PieChartStats
      data={Object.keys(sectors).map((sector) => ({ name: sector, value: sectors[sector] })) || []}
      title='Sectors Distribution'
      legend={Object.keys(sectors).map((sector, i) => ({ text: sector, color: COLORS[i] }))}
      COLORS={Object.keys(sectors).map((_, i) => COLORS[i])}
      className='bg-background-secondary md:col-span-2 dark:bg-transparent'
    />
  );
}

function Analytics({ stats }) {
  const currentYear = usePage().props.year;
  const years = stats?.years?.years;

  const latestYears = Object.keys(years).reduce((acc, year, i, arr) => {
    const currentIndex = arr.findIndex((y) => y === currentYear.year);
    const fn = (y) => ({ ...years[y], year: y });
    if (currentIndex >= 7) acc = arr.slice(currentIndex - 6, currentIndex + 1).map(fn);
    else acc = arr.slice(0, 7).map(fn);
    return acc;
  }, []);

  const data = latestYears.map(({ filieres, events, articles, year }) => ({ name: year, filieres, events, articles }));

  const CustomTooltip = createCustomTooltip([
    { key: 'filieres', intro: 'Filieres' },
    { key: 'events', intro: 'Events' },
    { key: 'articles', intro: 'Articles' },
  ]);

  return (
    <div className='relative grid min-h-[350px] gap-5 rounded-lg border-[1.2px] shadow-md border-border p-3'>
      <div className='flex flex-col items-center justify-between gap-2 self-start md:flex-row'>
        <h2 className='text-lg font-bold text-text-primary'>
          Analytics for the last 7 years
          <span className='ml-2 text-xs font-normal text-text-secondary'>(Filières, Events, Articles)</span>
        </h2>
        <Legend
          legend={[
            { text: 'Filieres', color: 'bg-green-800' },
            { text: 'Events', color: 'bg-blue-700' },
            { text: 'Articles', color: 'bg-orange-500' },
          ]}
        />
      </div>

      <ResponsiveContainer width='100%' height='100%'>
        <BarChart data={data}>
          <XAxis dataKey='name' className='text-xs font-medium' />
          <YAxis width={35} domain={[0, 'dataMax']} allowDecimals={false} />

          <Tooltip
            content={CustomTooltip}
            wrapperClassName='tooltip'
            cursor={<Rectangle radius={5} stroke='var(--border)' fill='var(--background-tertiary)' />}
          />
          <Bar dataKey='filieres' fill='#166534' className='cursor-pointer' legendType='circle' />
          <Bar dataKey='events' fill='#0059b3' className='cursor-pointer' legendType='circle' />
          <Bar dataKey='articles' fill='#f97316' className='cursor-pointer' legendType='circle' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
