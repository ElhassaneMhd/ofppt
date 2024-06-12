import Section from './Section';

function Hero() {
  return (
    <Section className={'mb-12 bg-blue-50 py-6'}>
      <div className='flex h-[70vh] w-full items-center justify-between gap-14 lg:h-auto'>
        <div className='lg:flex-0 flex flex-1 flex-col items-center lg:max-w-[40%] lg:items-start'>
          <h3 className='mb-3 font-bold uppercase text-orange-500'>Cours Du Soir</h3>
          <h1 className='mb-6 text-center text-5xl font-extrabold tracking-wide lg:text-start lg:text-7xl'>
            Bienvenue à{' '}
            <span className='italic text-secondary selection:bg-secondary selection:text-white'>l&apos;OFPPT </span>
          </h1>
          <p className='mb-6 text-center font-medium lg:text-start'>
            Vous êtes sur la bonne voie, pour devenir acteur du Maroc des Compétences ! Bien choisir votre métier est
            votre premier pas sur le chemin de la réussite.
          </p>
        </div>
        <div className='hidden w-1/2 lg:block'>
          <img src='/images/hero-bg.png' className='w-full' alt='' />
        </div>
      </div>
    </Section>
  );
}

export default Hero;
