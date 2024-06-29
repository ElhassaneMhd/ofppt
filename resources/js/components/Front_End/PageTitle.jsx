import { Breadcrumbs } from "../ui/BreadCrumbs";

export function PageTitle({ title, image }) {
  return (
    <div
      className='h-[150px] w-full bg-cover bg-center bg-no-repeat sm:h-[200px]'
      style={{ backgroundImage: `url(/images/${image}.jpg)` }}
    >
      <div className='flex h-full w-full flex-col text-white justify-center gap-6 bg-black bg-opacity-70 px-10'>
        <h1 className='text-4xl font-bold capitalize  sm:text-6xl'>{title}</h1>
        <Breadcrumbs />
      </div>
    </div>
  );
}
