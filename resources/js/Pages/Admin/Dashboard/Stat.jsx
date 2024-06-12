import { IoEyeOffOutline, IoTrashOutline, IoEyeOutline } from '@/components/ui/Icons';

export function Stat({ value={}, label={}, icon={}, onClick, className }) {
  return (
    <div
      className={`flex min-h-24 items-start border border-border justify-between rounded-lg p-3 shadow-md bg-background-secondary ${className} ${onClick ? 'cursor-pointer transition-transform duration-300 hover:scale-95' : ''} `}
      onClick={() => onClick?.()}
    >
      <div className='space-y-3'>
        <h4 className={`text-sm font-medium ${label.color || 'text-text-primary'}`}>{label.value}</h4>
        {value?.total ? (
          <div className='flex gap-3 text-lg text-white'>
            <div className='bg-green-600 py-1 px-2 rounded-lg flex items-center gap-2'>
              <IoEyeOutline />
              <h3 className='font-bold'>{value.visible}</h3>
            </div>
            <div className='bg-blue-500 py-1 px-2 rounded-lg flex items-center gap-2'>
              <IoEyeOffOutline />
              <h3 className='font-bold'>{value.hidden}</h3>
            </div>
            <div className='bg-red-500 py-1 px-2 rounded-lg flex items-center gap-2'>
              <IoTrashOutline />
              <h3 className='font-bold'>{value.trashed}</h3>
            </div>
          </div>
        ) : (
          <h3 className={`text-3xl font-bold ${value.color || 'text-white'}`}>{value.value}</h3>
        )}
      </div>
      <div className={`rounded-lg p-2 text-xl ${icon.className || 'text-text-primary bg-background-tertiary'}`}>{icon.icon}</div>
    </div>
  );
}
