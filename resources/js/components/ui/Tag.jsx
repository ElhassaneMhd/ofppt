export function Tag({ tag, className = '' }) {
  return (
    <span
      className={`rounded-md bg-background-secondary p-2 text-xs font-semibold capitalize text-text-primary transition-colors duration-300 hover:text-text-secondary ${className}`}
    >
      <span className='text-secondary'>#</span>
      {tag}
    </span>
  );
}

export function Tags({ tags = [] }) {
  const render = () => {
    if (!tags.length) return <p className='text-sm font-medium text-text-secondary'>No tags found...</p>;
    return (
      <ul className='flex max-h-[250px] flex-wrap gap-x-3 gap-y-1 overflow-auto py-1.5'>
        {tags?.map((tag) => {
          const { id, name } = typeof tag === 'string' ? { id: tag, name: tag } : tag;
          return <Tag key={id} tag={name} />;
        })}
      </ul>
    );
  };

  return (
    <div className='relative min-h-[120px] border-t border-border pt-4'>
      <h4 className='mb-3 text-lg font-bold text-text-primary'>Tags</h4>
      {render()}
    </div>
  );
}
