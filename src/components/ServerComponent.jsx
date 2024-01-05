

// import { useEffect } from "react"

function ServerComponent(props) {

  // async function fetchData(){
     
  //   const res = await fetch("https://jsonplaceholder.typicode.com/users")
  //   const resdata = await res.json()
    console.log(props)
  // }

  // useEffect(() => {

  //   fetchData()

  // }, [])

  return (
    <p>prnav</p>
  )
}

export async function getServerSideProps() {
  // Fetch data from an API or database
  const response = await fetch('https://jsonplaceholder.typicode.com/users', {
    method : 'GET',
    headers : {
      Accept : 'application/json',
      'Content-Type' : 'application/json'
    }
  });
  const data = await response.json();

  // console.log(data)

  // Return the data as props
  return {
    props: {
      data
    },
  };
}

export default ServerComponent