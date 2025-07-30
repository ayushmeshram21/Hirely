import { Link } from 'react-router-dom';
import Header from '../header';
import './index.css';

const Home = () => (
  <div className='home-cont'>
    <Header />
    <div className='home-content-cont'>
      <h1 className='home-heading'>Launch Your Career. Rule the Future.</h1>
      <p>
        Explore high-impact jobs that align with your skills and ambition.
        Start your next chapter with roles that excite and inspire you.
      </p>
      <Link to="/jobs">
        <button className='home-btn'>Explore Jobs</button>
      </Link>
    </div>
  </div>
);

export default Home;
