import { LuGraduationCap } from 'react-icons/lu';

function Sectors({ sectorsWithStats }) {
  return (
    <section className={'px-28 mb-24'}>
      <SectorList sectorsWithStats={sectorsWithStats} />
    </section>
  );
}

function SectorList({ sectorsWithStats }) {
  return (
    <>
      <h2 className='mb-10 text-center text-4xl font-medium'>Our Top Sectors</h2>
      <ul className='grid grid-cols-5 gap-6'>
        {sectorsWithStats.slice(0, 5).map((sector, i) => (
          <SectorItem key={i} sector={sector} />
        ))}
      </ul>
    </>
  );
}

function SectorItem({ sector }) {
  return (
    <li className='item-center rounded-sm border-[1px] border-gray-300 transition-colors hover:border-blue-500'>
      <a href='' className='flex flex-col px-6 py-10 text-center'>
        <LuGraduationCap size={56} className='mx-auto mb-2 text-gray-600' strokeWidth='1.4' />
        <span className='mb-2 text-xl font-semibold capitalize transition-colors hover:text-blue-500'>
          {sector.name}
        </span>
        <span className='text-sm text-gray-500'>{sector.count} Courses</span>
      </a>
    </li>
  );
}

export default Sectors;
