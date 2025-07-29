import { Link } from 'react-router-dom'

const Preferences = () => {
  return (
    <div>
      <h1>Preference Page</h1>
      <p>Welcome to the preference page!</p>
      <nav>
        <Link to="/about">Go to About</Link>
        <br />
        <Link to="/contact">Go to Contact</Link>
      </nav>
    </div>
  )
}

export default Preferences;