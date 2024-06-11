import { PiCheckBold } from './Icons';

export function CheckBox({ checked, onChange, className = '', ...props }) {
  return (
    <div className={'relative h-5 ' + className} onClick={(e) => e.stopPropagation()}>
      <input
        type='checkbox'
        className='peer h-5 w-5 shrink-0 cursor-pointer appearance-none rounded-[4px] border-[1.5px] border-border  transition-colors transition-none duration-200 checked:border-0 checked:bg-primary focus:outline-none disabled:cursor-not-allowed'
        checked={checked || false}
        onChange={onChange}
        {...props}
      />
      <PiCheckBold className='pointer-events-none absolute left-[3px] top-0.5 hidden text-center text-sm text-white transition-none duration-0 peer-checked:block' />
    </div>
  );
}
