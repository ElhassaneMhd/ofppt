function Section({ children, className }) {
  return <section className={`px-28 ${className ? className : ''}`}>{children}</section>;
}

export default Section;
