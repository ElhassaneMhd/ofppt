import DOMPurify from 'dompurify';

export function LongDetails({ details, className = '' }) {
  return (
    <div
      className={`break-words details leading-relaxed text-text-primary ${className}`}
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(details) }}
    />
  );
}

export function ShortDetails({ details, className = '' }) {
  return (
    <p
      className={`text-ellipsis text-sm font-medium text-text-secondary ${className}`}
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(details) }}
    />
  );
}
