function SortBy({setSortBy}) {
  return (
    <select className='px-2 outline-none' onChange={(e) => setSortBy(e.target.value)}>
      <option value=''>Newly published</option>
      <option value='title-asc'>Title a-z</option>
      <option value='title-desc'>Title z-a</option>
    </select>
  );
}

export default SortBy;
