export function Tag({ tag, className = '' }) {
  return (
    <span className={`text-xs font-semibold text-text-primary hover:text-text-secondary capitalize transition-colors duration-300 ${className}`}>
      <span className='text-secondary'>#</span>
      {tag}
    </span>
  );
}
