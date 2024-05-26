import React from 'react'

function LinkText({ link, text }) {
  return (
    <>
      <a href={link} className="text-[#E4A0D5ef] underline decoration-[#E4A0D5ef]" target="_blank">
        {text}
      </a>
    </>
  )
}

export default LinkText