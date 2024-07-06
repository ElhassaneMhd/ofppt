import Editor from '@/components/shared/Editor/Editor';
import { Button } from '@/components/ui';
import { useNavigate } from '@/hooks/useNavigate';
import { isContentEmpty } from '@/utils/helpers';
import { useEffect, useState } from 'react';

export default function About({ settings = {} }) {
  const [about, setAbout] = useState(settings?.aboutDescription || '<p></p>');
  const [editorInstance, setEditorInstance] = useState(null);
  const [isChanged, setIsChanged] = useState(false);
  const { navigate } = useNavigate();

  useEffect(() => {
    setIsChanged(() => {
      const isDifferent = about !== (settings?.aboutDescription || '<p></p>');
      if ((isContentEmpty(about) && isDifferent) || isDifferent) return true;
      return false;
    });
  }, [about, settings?.aboutDescription]);

  const handleCancel = () => {
    setAbout(settings?.aboutDescription || '<p></p>');
    if (editorInstance) editorInstance.commands.setContent(settings?.aboutDescription || '');
  };

  return (
    <div className='flex flex-1 flex-col gap-2 overflow-auto'>
      <Editor
        size='small'
        className='flex-1'
        onUpdate={(text) => setAbout(text)}
        bubbleMenu={true}
        content={about}
        setEditorInstance={setEditorInstance}
      />
      <div className='flex justify-end gap-3'>
        <Button disabled={!isChanged} color='tertiary' onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          disabled={!isChanged}
          onClick={() =>
            navigate({ url: 'settings.update', method: 'put', data: { ...settings, aboutDescription: about } })
          }
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}
