import { Button } from '../ui';
import { PiMoonStars, PiSunDim } from '../ui/Icons';
import { useTheme } from '@/hooks';

export function ThemeToggler({ layout }) {
  const { theme, changeTheme } = useTheme();

  if (layout === 'long')
    return (
      <button
        onClick={() => changeTheme(theme === 'dark' ? 'light' : 'dark')}
        className='dropdown-option text-xs'
        id='themeToggler'
      >
        <div className={theme === 'dark' ? 'translate-y-9' : 'translate-y-0'}>
          <PiMoonStars size={18} />
          <span>Dark Mode</span>
        </div>
        <div className={theme === 'light' ? 'translate-y-9' : 'translate-y-0'}>
          <PiSunDim size={18} />
          <span>Light Mode</span>
        </div>
      </button>
    );

  return (
    <Button shape='icon' className='bg-transparent' onClick={() => changeTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? <PiSunDim size={18} /> : <PiMoonStars size={18} />}
    </Button>
  );
}
