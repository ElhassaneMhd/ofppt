import { cloneElement, useState } from 'react';
import {
  FaBold,
  FaItalic,
  FaStrikethrough,
  FaUnderline,
  FaCode,
  FaHeading,
  FaListUl,
  FaListOl,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaPaintBrush,
} from 'react-icons/fa';
import { FaTextSlash, FaLinkSlash, FaLink } from 'react-icons/fa6';
import { GoHorizontalRule } from 'react-icons/go';
import { GrUndo, GrRedo } from 'react-icons/gr';
import { Button, DropDown, InputField, ToolTip } from '@/components/ui';
import { PiPlusBold } from 'react-icons/pi';

const render = (buttons, size) => {
  return buttons.map(({ toolTip, icon, disabled, onClick, active, custom }, i) => {
    if (custom) return cloneElement(custom, { key: i });
    return (
      <ToolTip key={toolTip} content={toolTip}>
        <Button onClick={onClick} disabled={disabled} state={active ? 'active' : ''} shape='icon' size={size}>
          {icon}
        </Button>
      </ToolTip>
    );
  });
};
const AddLink = ({ editor, size }) => {
  const [url, setUrl] = useState('');

  const handleSetLink = (url) => {
    console.log(url);
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const handleSubmit = () => {
    handleSetLink(url);
    setUrl('');
  };
  return (
    <ToolTip
      content={
        <div className='relative'>
          <form className='flex flex-col gap-2.5'>
            <InputField
              label='Add Link'
              placeholder='https://example.com'
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <Button size='small' color='secondary' onClick={handleSubmit} disabled={!/^https?:\/\//.test(url)}>
              Add
            </Button>
          </form>
        </div>
      }
      trigger='click'
      interactive={true}
      arrow={true}
      placement='bottom'
    >
      <Button
        disabled={!editor.can().chain().focus().toggleLink().run()}
        shape='icon'
        size={size}
        state={editor.isActive('link') ? 'active' : 'not-active'}
        onClick={() => setUrl(editor.isActive('link') ? editor.getAttributes('link').href : '')}
      >
        <FaLink />
      </Button>
    </ToolTip>
  );
};
const Headings = ({ editor, size }) => {
  return (
    <DropDown
      options={{ className: 'w-fit' }}
      toggler={
        <ToolTip content='Heading'>
          <Button shape='icon' state={editor.isActive('heading') ? 'active' : 'not-active'} size={size}>
            <FaHeading />
          </Button>
        </ToolTip>
      }
      togglerTooltip={true}
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <DropDown.Option
          key={i}
          size='small'
          isCurrent={editor.isActive('heading', { level: i + 1 })}
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHeading({ level: i + 1 })
              .run()
          }
        >
          <span className='flex items-baseline'>
            <FaHeading />
            <span className='font-bold'>{i + 1}</span>
          </span>
        </DropDown.Option>
      ))}
    </DropDown>
  );
};

const colors = [
  'var(--text-primary)',
  'var(--text-secondary)',
  '#ff0000',
  '#00ff00',
  '#c8ff2d',
  '#fadb14',
  '#faad14',
  '#ffda77',
  '#fa8c16',
  '#fa541c',
  '#f5222d',
  '#ff6b6b',
  '#64c37e',
  '#9775fa',
];
const TextColor = ({ editor, size }) => {
  const [color, setColor] = useState(document.documentElement.style.getPropertyValue('--editor-text-color'));

  const handleColorChange = (color) => {
    const chosenColor = color.target ? color.target.value : color;
    setColor(chosenColor);
    editor.chain().focus().setColor(chosenColor).run();
  };

  return (
    <ToolTip
      content={
        <ColorPicker
          colors={colors}
          onChange={handleColorChange}
          currentColor={color}
          className='grid grid-cols-5 gap-1'
          size={size}
        />
      }
      trigger='click'
      interactive={true}
      arrow={true}
      placement='bottom'
    >
      <Button
        disabled={!editor.can().chain().focus().toggleLink().run()}
        shape='icon'
        size={size}
        state={editor.isActive('textStyle', { color }) ? 'active' : 'not-active'}
        // onClick={() => setUrl(editor.isActive('link') ? editor.getAttributes('link').href : '')}
      >
        <FaPaintBrush />
      </Button>
    </ToolTip>
  );
};

export function ColorPicker({ colors = [], onChange, currentColor, className = 'flex gap-1', size = 'small' }) {
  return (
    <div className={className}>
      {colors.map((color, index) => (
        <div
          key={index}
          className={`cursor-pointer rounded-full shadow-md transition-transform duration-200 ${currentColor === color ? 'border-2 border-text-primary' : 'border-2 border-background-secondary hover:scale-110'} ${size === 'small' ? 'h-6 w-6' : 'h-7 w-7'} `}
          style={{ backgroundColor: color }}
          onClick={() => onChange(color)}
        />
      ))}
      <Button shape='icon' className={`relative rounded-full ${size === 'small' ? 'h-6 w-6' : 'h-7 w-7'}`}>
        <input
          type='color'
          value={currentColor}
          className='absolute h-8 w-8 cursor-pointer opacity-0'
          onChange={onChange}
        />
        <PiPlusBold />
      </Button>
    </div>
  );
}

export default function Menubar({
  editor,
  size,
  visibleButtons = [
    'bold',
    'italic',
    'strike',
    'underline',
    'link',
    'unlink',
    'text color',
    'headings',
    'bullets',
    'numbered',
    'horizontal rule',
    'align left',
    'align center',
    'align right',
    'clear content',
    'undo',
    'redo',
  ],
}) {
  if (!editor) return null;

  const buttons = [
    {
      toolTip: 'Bold',
      onClick: () => editor.chain().focus().toggleBold().run(),
      disabled: !editor.can().chain().focus().toggleBold().run(),
      active: editor.isActive('bold'),
      icon: <FaBold />,
    },
    {
      toolTip: 'Italic',
      onClick: () => editor.chain().focus().toggleItalic().run(),
      disabled: !editor.can().chain().focus().toggleItalic().run(),
      active: editor.isActive('italic'),
      icon: <FaItalic />,
    },
    {
      toolTip: 'Strike',
      onClick: () => editor.chain().focus().toggleStrike().run(),
      disabled: !editor.can().chain().focus().toggleStrike().run(),
      active: editor.isActive('strike'),
      icon: <FaStrikethrough />,
    },
    {
      toolTip: 'Underline',
      onClick: () => editor.chain().focus().toggleUnderline().run(),
      disabled: !editor.can().chain().focus().toggleUnderline().run(),
      active: editor.isActive('underline'),
      icon: <FaUnderline />,
    },
    {
      toolTip: 'Link',
      custom: <AddLink editor={editor} size={size} />,
    },
    {
      toolTip: 'Unlink',
      onClick: () => editor.chain().focus().unsetLink().run(),
      disabled: !editor.isActive('link'),
      active: editor.isActive('link'),
      icon: <FaLinkSlash />,
    },
    {
      toolTip: 'Text Color',
      custom: <TextColor editor={editor} size={size} />,
    },
    {
      toolTip: 'Headings',
      custom: <Headings editor={editor} size={size} />,
    },
    {
      toolTip: 'Bullets',
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      active: editor.isActive('bulletList'),
      icon: <FaListUl />,
    },
    {
      toolTip: 'Numbered',
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      active: editor.isActive('orderedList'),
      icon: <FaListOl />,
    },
    {
      toolTip: 'Horizontal Rule',
      onClick: () => editor.chain().focus().setHorizontalRule().run(),
      icon: <GoHorizontalRule />,
    },
    {
      toolTip: 'Align Left',
      onClick: () => editor.chain().focus().setTextAlign('left').run(),
      active: editor.isActive({ textAlign: 'left' }),
      icon: <FaAlignLeft />,
    },
    {
      toolTip: 'Align Center',
      onClick: () => editor.chain().focus().setTextAlign('center').run(),
      active: editor.isActive({ textAlign: 'center' }),
      icon: <FaAlignCenter />,
    },
    {
      toolTip: 'Align Right',
      onClick: () => editor.chain().focus().setTextAlign('right').run(),
      active: editor.isActive({ textAlign: 'right' }),
      icon: <FaAlignRight />,
    },
    {
      toolTip: 'Other',
      custom: (
        <div className='flex flex-1 justify-end gap-2'>
          {render(
            [
              {
                toolTip: 'Clear Content',
                onClick: () => editor.commands.clearContent(true),
                icon: <FaTextSlash />,
              },
              {
                toolTip: 'Undo',
                onClick: () => editor.chain().undo().run(),
                disabled: !editor.can().chain().undo().run(),
                icon: <GrUndo />,
              },
              {
                toolTip: 'Redo',
                onClick: () => editor.chain().redo().run(),
                disabled: !editor.can().chain().redo().run(),
                icon: <GrRedo />,
              },
            ],
            size
          )}
        </div>
      ),
    },
  ];

  return (
    <div className='flex w-full gap-2 overflow-auto border-b border-border p-2 transition-[inset] duration-300'>
      {render(
        buttons.filter((button) => visibleButtons.includes(button.toolTip.toLowerCase())),
        size
      )}
    </div>
  );
}

export function CustomBubbleMenu({ editor }) {
  if (!editor) return null;

  const buttons = [
    {
      toolTip: 'Bold',
      onClick: () => editor.chain().focus().toggleBold().run(),
      disabled: !editor.can().chain().focus().toggleBold().run(),
      active: editor.isActive('bold'),
      icon: <FaBold />,
    },
    {
      toolTip: 'Italic',
      onClick: () => editor.chain().focus().toggleItalic().run(),
      disabled: !editor.can().chain().focus().toggleItalic().run(),
      active: editor.isActive('italic'),
      icon: <FaItalic />,
    },
    {
      toolTip: 'Strike',
      onClick: () => editor.chain().focus().toggleStrike().run(),
      disabled: !editor.can().chain().focus().toggleStrike().run(),
      active: editor.isActive('strike'),
      icon: <FaStrikethrough />,
    },
    {
      toolTip: 'Underline',
      onClick: () => editor.chain().focus().toggleUnderline().run(),
      disabled: !editor.can().chain().focus().toggleUnderline().run(),
      active: editor.isActive('underline'),
      icon: <FaUnderline />,
    },
    {
      toolTip: 'Code',
      onClick: () => editor.chain().focus().toggleCode().run(),
      disabled: !editor.can().chain().focus().toggleCode().run(),
      active: editor.isActive('code'),
      icon: <FaCode />,
    },
    {
      custom: <TextColor editor={editor} />,
    },
    {
      custom: <Headings editor={editor} />,
    },
  ];

  return <div className='flex items-center gap-2'> {render(buttons)}</div>;
}
