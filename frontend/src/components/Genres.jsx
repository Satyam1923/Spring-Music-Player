import React from 'react'

const Genres = () => {
  return (
    <div className='genres w-2/5 md:w-full'>
      <div className='genres-header px-2'>
        <p>Genres</p>
        <p>See all</p>
      </div>
      <div className="genres-container py-6 px-2">
      <div className="box dance-electric">Dance/Electric</div>
      <div className="box rock">Rock</div>
      <div className="box party">Party</div>
      <div className="box afro">Afro</div>
      <div className="box pop">Pop</div>
      <div className="box chill">Chill</div>
      <div className="box classic-retro">Classic/Retro</div>
    </div>
    </div>
  )
}

export default Genres