function Overlay({ isLoading }) {
    return (
      <div
        className={`absolute flex h-full w-full items-center justify-center bg-white bg-opacity-20 ${!isLoading ? 'hidden' : 'block'}`}
      >
        <div className='spinning-animation h-12 w-12 rounded-full border-4 border-dashed border-black border-r-transparent'></div>
      </div>
    );
  }

  export default Overlay