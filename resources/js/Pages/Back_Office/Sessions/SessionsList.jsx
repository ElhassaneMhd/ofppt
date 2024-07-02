import { TableLayout } from '@/layouts/Back_Office/TableLayout';
import { useOptions } from '../Shared';
import { TbDeviceDesktop, TbDeviceMobile, TbDeviceTablet } from 'react-icons/tb';
import { FiActivity, FiLogOut } from 'react-icons/fi';
import { useState } from 'react';
import { ActivitiesList } from './ActivitesList';

const BROWSERS_IMAGES = [
  {
    name: 'Chrome',
    display: 'Google Chrome',
    image: 'https://cdnjs.cloudflare.com/ajax/libs/browser-logos/74.0.0/chrome/chrome.png',
  },
  {
    name: 'Firefox',
    image: 'https://cdnjs.cloudflare.com/ajax/libs/browser-logos/74.0.0/firefox/firefox.png',
  },
  {
    name: 'YaBrowser',
    display: 'Yandex',
    image: 'https://cdnjs.cloudflare.com/ajax/libs/browser-logos/74.0.0/yandex/yandex.png',
  },
  {
    name: 'Safari',
    image: 'https://cdnjs.cloudflare.com/ajax/libs/browser-logos/74.0.0/safari/safari.png',
  },
  {
    name: 'Brave',
    image: 'https://cdnjs.cloudflare.com/ajax/libs/browser-logos/74.0.0/brave/brave.png',
  },
  {
    name: 'Edge',
    display: 'Microsoft Edge',
    image: 'https://cdnjs.cloudflare.com/ajax/libs/browser-logos/74.0.0/edge/edge.png',
  },
  {
    name: 'Opera',
    image: 'https://cdnjs.cloudflare.com/ajax/libs/browser-logos/74.0.0/opera/opera.png',
  },
];
export default function SessionsListe({ sessions, isTrashed }) {
    const [activities, setActivities] = useState(null);
  const { columns, options } = useOptions({
    routeName: 'sessions',
    resourceName: 'Session',
    isTrashed,
  });

    return (
      <>
        <TableLayout
          data={sessions}
          columns={[
            columns.id,
            {
              key: 'fullName',
              displayLabel: 'Full Name',
              visible: true,
              type: 'string',
              filter: true,
            },
            {
              key: 'location',
              displayLabel: 'Location',
              visible: true,
              type: 'string',
              format: (val = '') => `${val.slice(0, 20)}${val.slice(20).length ? '...' : ''}`,
            },
            {
              key: 'ip',
              displayLabel: 'IP Address',
              visible: true,
              type: 'string',
            },
            {
              key: 'device',
              displayLabel: 'Device',
              visible: true,
              type: 'string',
              format: (val, id, isDownload) => {
                const icons = {
                  Desktop: <TbDeviceDesktop size={20} />,
                  Phone: <TbDeviceMobile size={20} />,
                  Tablet: <TbDeviceTablet size={20} />,
                };
                return isDownload ? (
                  val
                ) : (
                  <div className='flex items-center gap-1.5'>
                    {icons[val]}
                    {val}
                  </div>
                );
              },
              filter: [
                { value: 'Desktop', checked: false },
                { value: 'Tablet', checked: false },
                { value: 'Phone', checked: false },
              ],
            },
            {
              key: 'browser',
              displayLabel: 'Browser',
              visible: true,
              type: 'string',
              format: (val, id, isDownload) => {
                const browser = BROWSERS_IMAGES.find((b) => val?.toLowerCase().includes(b.name?.toLowerCase()));

                return isDownload ? (
                  browser?.display || browser?.name || 'Unknown'
                ) : (
                  <div className='flex items-center gap-2'>
                    <img src={browser?.image || '/images/default-browser.png'} alt='browser' className='h-7 w-7' />
                    <span className='text-sm font-medium text-text-primary'>
                      {browser?.display || browser?.name || 'Unknown'}
                    </span>
                  </div>
                );
              },
              filter: [
                {
                  value: { value: 'Google Chrome', condition: (el) => el.browser === 'Chrome' },
                  checked: false,
                },
                {
                  value: { value: 'Microsoft Edge', condition: (el) => el.browser === 'Edge' },
                  checked: false,
                },
                { value: 'Safari', checked: false },
                { value: 'Brave', checked: false },
                { value: 'Firefox', checked: false },
                { value: 'Opera', checked: false },
                {
                  value: { value: 'Yandex', condition: (el) => el.browser === 'YaBrowser' },
                  checked: false,
                },
              ],
            },
            {
              key: 'activities',
              displayLabel: 'Activities',
              visible: true,
              format: (val) => `${val.length} Activites`,
              fn(a, b, direction) {
                return direction === 'asc'
                  ? a?.activities.length - b?.activities.length
                  : b?.activities.length - a?.activities.length;
              },
              type: 'custom',
            },
          ]}
          {...options}
          fieldsToSearch={['fullName', 'location', 'ip', 'device', 'browser']}
          isTrashed={isTrashed}
          filters={{ ...options.filters }}
          layoutOptions={{
            displayNewRecord: false,
            actions: (def) => [
              {
                text: 'Activities',
                icon: <FiActivity />,
                onClick: (session) => setActivities(session.activities),
              },
              {
                text: 'Abort',
                icon: <FiLogOut />,
                onClick: () => true,
                hidden: (session) => session?.status !== 'Online',
              },
              {
                ...def.delete,
                hidden: (session) => session?.status !== 'Offline',
              },
            ],
          }}
          selectedOptions={{
            actions: [
              {
                text: 'Abort',
                color: 'orange',
                onClick: (ids, onClose) => {
                  onClose();
                },
                disabledCondition: (ids, data) => data?.some((app) => ids.includes(app.id) && app.status !== 'Online'),
                message: (data) =>
                  data.length === 1
                    ? 'This session has already been aborted.'
                    : 'Some of these sessions have already been aborted.',
              },
            ],
            deleteOptions: {
              resourceName: 'session',
              onConfirm: (ids) => true,
            },
          }}
          canView={false}
        />
        <ActivitiesList isOpen={activities} activities={activities} onClose={() => setActivities(null)} />
      </>
    );
}

