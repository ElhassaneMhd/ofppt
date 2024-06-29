import { Tag } from '@/components/ui/Tag';
import { Link } from '@inertiajs/react';

export function Tags({ tags }) {
  const render = () => {
    if (!tags.length)
      return (
        <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform'>
          <p className='font-bold text-text-tertiary'>No tags found</p>
        </div>
      );
    return (
      <ul className='flex max-h-[250px] flex-wrap gap-x-3 gap-y-1 overflow-auto py-1.5'>
        {tags?.map(({ id, name }) => (
          <Link key={id} href={`/blog?f=${name.toLowerCase()}`}>
            <Tag tag={name} />
          </Link>
        ))}
      </ul>
    );
  };

  return (
    <div className='relative min-h-[200px] rounded-xl bg-background-secondary p-4'>
      <h4 className='mb-6 text-lg font-bold text-text-primary'>Tags</h4>
      {render()}
    </div>
  );
}
