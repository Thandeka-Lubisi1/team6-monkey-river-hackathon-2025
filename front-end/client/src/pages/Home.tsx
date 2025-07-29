import { Link } from 'react-router-dom'
import AppToggle from "../pages/AuthToggle"
const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the home page!</p>
      <AppToggle/>
    </div>
  )
}

export default Home;