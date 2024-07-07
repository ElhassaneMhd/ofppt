import Editor from '@/components/shared/Editor/Editor';
import { ColorPicker } from '@/components/shared/Editor/Menubar';
import { Button, Switch } from '@/components/ui';
import { Overlay } from '@/components/ui/Modal';
import { useForm } from '@/hooks';
import { DEFAULT_STYLES } from '@/utils/constants';
import { isContentEmpty } from '@/utils/helpers';
import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';
import { IoChevronDownOutline } from 'react-icons/io5';
import { PiX } from 'react-icons/pi';

const colors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#9055FF', '#FFA45B', '#A5FECB'];

export default function NewAnnouncement({ defaultValues, action, onSubmit, onClose }) {
  const [editorInstance, setEditorInstance] = useState(null);
  const {
    Form,
    options: { isUpdated, handleSubmit, updateValues, getValue, setValue },
  } = useForm({
    defaultValues,
    fields: [
      {
        name: 'content',
        customComponent: ({ getValue, setValue }) => (
          <div className='mt-2 flex h-[200px] flex-col gap-3 mobile:col-span-2'>
            <label className='text-sm font-medium text-text-tertiary'>Content</label>
            <Editor
              size='small'
              visibleButtons={[
                'bold',
                'italic',
                'strike',
                'underline',
                'link',
                'unlink',
                'text color',
                'align left',
                'align center',
                'align right',
              ]}
              className='text-sm'
              content={getValue('content')}
              onUpdate={(val) => setValue('content', val)}
              setEditorInstance={setEditorInstance}
              fullScreen={false}
            />
          </div>
        ),
      },
      {
        name: 'startDate',
        label: 'Start Date',
        type: 'datetime-local',
      },
      {
        name: 'endDate',
        label: 'End Date',
        type: 'datetime-local',
      },
      {
        name: 'visibility',
        customComponent: ({ getValue, setValue }) => (
          <div className='mt-2 flex items-center justify-between gap-3 mobile:col-span-2'>
            <label className='text-sm font-medium text-text-tertiary'>Visibility</label>
            <Switch
              checked={getValue('visibility') === 'true'}
              onChange={(e) => setValue('visibility', String(e.target.checked))}
            />
          </div>
        ),
      },
    ],
    onSubmit,
    gridLayout: true,
  });

  useEffect(() => {
    if (defaultValues) {
      updateValues(defaultValues);
      editorInstance && editorInstance.commands.setContent(defaultValues?.content || '');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues]);

  const close = () => {
    editorInstance && editorInstance.commands.setContent(defaultValues?.content || '');
    onClose();
  };

  const isOpen = Boolean(defaultValues);

  return (
    <>
      <Overlay isOpen={isOpen} onClose={close} closeOnBlur={true} className='z-30' />
      <div
        className={`absolute top-0 z-40 flex h-full w-full flex-col gap-3 overflow-auto border-l border-border bg-background-primary p-3 transition-[right] duration-500 sm:w-fit sm:max-w-[550px] ${
          isOpen ? 'right-0' : '-right-full'
        }`}
      >
        <Section title='Announcement Details'>{Form}</Section>
        <AnnouncementStyles getValue={getValue} setValue={setValue} />
        <Section title='Preview' isExpanded={false}>
          {isContentEmpty(getValue('content')) ? (
            <p className='mt-2 text-center text-sm font-medium text-text-secondary'>No content to preview...</p>
          ) : (
            <Announcement announcement={{ content: getValue('content'), styles: getValue('styles') }} />
          )}
        </Section>

        <div className='mt-auto grid w-full gap-3 xs:grid-cols-2'>
          <Button color='tertiary' onClick={close}>
            Cancel
          </Button>
          <Button onClick={() => handleSubmit(close)} disabled={!isUpdated}>
            {action === 'edit' ? 'Update Announcement' : 'Create Announcement'}
          </Button>
        </div>
      </div>
    </>
  );
}

function AnnouncementStyles({ getValue, setValue }) {
  const style = getValue('styles') || DEFAULT_STYLES;
  const setStyle = (value) => setValue('styles', value);

  const handleColorChange = (color, prop) => {
    const chosenColor = color.target ? color.target.value : color;
    setStyle({ ...style, [prop]: chosenColor });
  };

  return (
    <Section title='Styles' isExpanded={false}>
      <div className='mt-3 space-y-4'>
        {/* Background Color */}
        <div className='flex items-center justify-between gap-3'>
          <label className='text-sm font-medium text-text-tertiary'>Background Color</label>
          <ColorPicker
            colors={colors}
            currentColor={style.backgroundColor}
            onChange={(color) => handleColorChange(color, 'backgroundColor')}
          />
        </div>
        <div className='grid grid-cols-2 gap-3'>
          <label className='col-span-2 text-sm font-medium text-text-tertiary'>Border</label>
          <div className='flex flex-col gap-3 border-r-2 border-border pl-3 pr-3'>
            {/* Border Width */}
            <div className='flex items-center justify-between gap-3'>
              <label className='text-xs font-medium text-text-tertiary'>Width</label>
              <input
                type='number'
                min='0'
                max='10'
                value={style.borderWidth}
                onChange={(e) => setStyle({ ...style, borderWidth: Number(e.target.value) })}
                className='count w-12 text-xs'
              />
            </div>
            <BorderRadius style={style} setStyle={setStyle} />
          </div>
          <div className='flex flex-col gap-3'>
            {/* Border Color */}
            <div className='flex flex-col gap-3'>
              <label className='text-xs font-medium text-text-tertiary'>Color</label>
              <ColorPicker
                colors={colors}
                currentColor={style.borderColor}
                onChange={(color) => handleColorChange(color, 'borderColor')}
              />
            </div>
            <BorderStyle style={style} setStyle={setStyle} />
          </div>
          <Padding style={style} setStyle={setStyle} />
          <div className='flex flex-col gap-3'>
            <Width style={style} setStyle={setStyle} />
            <div className='flex items-center justify-between gap-3'>
              <label className='text-sm font-medium text-text-tertiary'>Close Button</label>
              <Switch
                checked={style.closeButton}
                onChange={(e) => setStyle({ ...style, closeButton: e.target.checked })}
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

const BorderRadius = ({ style, setStyle }) => {
  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-between gap-3'>
        <label className='text-xs font-medium text-text-tertiary'>Radius</label>
        <span className='count text-xs'>{style.borderRadius}</span>
      </div>
      <div>
        <input
          type='range'
          min='0'
          max='40'
          value={style.borderRadius}
          onChange={(e) => setStyle({ ...style, borderRadius: Number(e.target.value) })}
          className='h-2 w-full cursor-pointer appearance-none rounded-lg bg-background-secondary'
        />
        <div className='mt-1 grid grid-cols-3 gap-2'>
          {[
            { borderRadius: 0, label: 'Sharp', className: '' },
            { borderRadius: 20, label: 'Curved', className: 'rounded-lg' },
            { borderRadius: 40, label: 'Round', className: 'rounded-xl' },
          ].map(({ borderRadius, label, className }) => (
            <button
              key={borderRadius}
              className={`rounded-lg px-2 pb-1 pt-2 transition-colors duration-300 hover:bg-background-secondary ${style.borderRadius === borderRadius ? 'bg-background-secondary' : ''}`}
              onClick={() => setStyle({ ...style, borderRadius })}
            >
              <div className='relative mx-auto h-8 w-8 overflow-hidden rounded-md border-2 border-border bg-background-secondary'>
                <div
                  className={`absolute -bottom-3 -left-3 h-full w-full ${className} border-2 border-text-primary`}
                ></div>
              </div>
              <label className='text-[10px] text-text-tertiary'>{label}</label>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const BorderStyle = ({ style, setStyle }) => {
  return (
    <div className='flex flex-col gap-3'>
      <label className='text-xs font-medium text-text-tertiary'>Style</label>
      <div className='grid grid-cols-4 gap-2'>
        {['none', 'solid', 'dotted', 'dashed'].map((borderStyle) => (
          <button
            key={borderStyle}
            className={`rounded-lg px-2 pb-1 pt-2 transition-colors duration-300 hover:bg-background-secondary ${style.borderStyle === borderStyle ? 'bg-background-secondary' : ''}`}
            onClick={() => setStyle({ ...style, borderStyle })}
          >
            <div className='relative mx-auto h-8 w-8 overflow-hidden rounded-md border-2 border-border bg-background-secondary'>
              <div
                className='absolute -bottom-3 -left-3 h-full w-full border-2 border-text-primary'
                style={{ borderStyle }}
              ></div>
            </div>
            <label className='text-[10px] capitalize text-text-tertiary'>{borderStyle}</label>
          </button>
        ))}
      </div>
    </div>
  );
};

const Padding = ({ style, setStyle }) => {
  return (
    <div className='flex flex-col gap-3 border-r-2 border-border pr-3'>
      <label className='text-sm font-medium text-text-tertiary'>
        Padding
        <span className='ml-2 text-[10px] text-text-secondary'>(Top - Left - Right - Bottom)</span>
      </label>
      <div className='grid w-fit grid-cols-2 gap-3 self-center'>
        {['Top', 'Left', 'Right', 'Bottom'].map((direction) => (
          <div
            key={direction}
            className={`flex flex-col gap-3 ${direction === 'Top' || direction === 'Bottom' ? 'col-span-2 items-center' : ''}`}
          >
            <div className='flex items-center gap-3'>
              <input
                type='number'
                min='0'
                max='9999'
                value={style[`padding${direction}`]}
                onChange={(e) => setStyle({ ...style, [`padding${direction}`]: Number(e.target.value) })}
                className='count w-12 text-xs'
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Width = ({ style, setStyle }) => {
  return (
    <div className='flex flex-col gap-3'>
      <label className='text-sm font-medium text-text-tertiary'>Width</label>
      <div className='grid grid-cols-3 gap-3'>
        {[
          { label: 'Fit', width: 'fit-content' },
          { label: '1/2', width: '50%' },
          { label: 'Full', width: '100%' },
        ].map(({ width, label }) => (
          <button
            key={width}
            className={`rounded-lg px-2 pb-1 pt-2 transition-colors duration-300 hover:bg-background-secondary ${style.width === width ? 'bg-background-secondary' : ''}`}
            onClick={() => setStyle({ ...style, width })}
          >
            <div className='relative mx-auto h-8 w-full overflow-hidden rounded-md border-2 border-border bg-background-secondary'>
              <div
                style={{ width: label === 'Fit' ? Math.random() * 100 + '%' : width }}
                className={`absolute h-full bg-text-primary transition-[width] duration-300`}
              ></div>
            </div>
            <label className='text-[10px] text-text-tertiary'>{label}</label>
          </button>
        ))}
      </div>
    </div>
  );
};

const Section = ({ children, title, isExpanded = true }) => {
  const [expanded, setExpanded] = useState(isExpanded);

  return (
    <div className={`rounded-lg border border-border p-1.5 ${expanded ? 'pb-3' : ''}`}>
      <Button
        display='with-icon'
        type='transparent'
        className='w-full justify-between hover:bg-background-secondary'
        onClick={() => setExpanded((prev) => !prev)}
      >
        <h4 className='font-semibold text-text-primary'>{title}</h4>
        <IoChevronDownOutline className={`transition-transform duration-300 ${expanded ? 'rotate-180' : 'rotate-0'}`} />
      </Button>
      <div className={`overflow-hidden px-3 ${expanded ? 'h-auto' : 'h-0 pb-0'}`}>{children}</div>
    </div>
  );
};

export const Announcement = ({ announcement, onClose, preview, previewVisible }) => {
  return (
    <div
      className={
        preview
          ? `fixed left-1/2 z-[99999] w-full -translate-x-1/2 transition-[top] duration-500 ${previewVisible ? 'top-0' : '-top-10'}`
          : 'relative'
      }
    >
      <div
        className='mx-auto'
        style={announcement.styles || {}}
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(announcement.content) }}
      />
      {announcement.styles?.closeButton && (
        <button
          className='absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full p-1 text-text-primary transition-colors duration-300 hover:bg-white/30'
          onClick={() => onClose?.()}
        >
          <PiX />
        </button>
      )}
    </div>
  );
};
