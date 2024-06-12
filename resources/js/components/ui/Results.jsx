function Results({ filieres, resultsRetrieved }) {
  return (
    <span>
      Showing {resultsRetrieved} of {filieres.length} results{' '}
    </span>
  );
}

export default Results;
