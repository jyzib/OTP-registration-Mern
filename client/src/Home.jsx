import React from 'react'

const Home = ({useremail}) => {
    console.log(useremail.name)
  return (
    <div>
        <h1>hey 👋 {useremail.name}</h1>
      
    </div>
  )
}

export default Home
