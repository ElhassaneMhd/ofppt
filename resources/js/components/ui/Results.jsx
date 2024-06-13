function Results({ items, resultsRetrieved }) {
  return (
    <span>
      Showing {resultsRetrieved} of {items.length} results{' '}
    </span>
  );
}

export default Results;
