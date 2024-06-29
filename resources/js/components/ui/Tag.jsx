export function Tag({ tag, className = 'text-text-primary hover:text-text-secondary ' }) {
  return (
    <span
      className={`text-xs font-semibold capitalize transition-colors duration-300 ${className}`}
    >
      <span className='text-secondary'>#</span>
      {tag}
    </span>
  );
}
