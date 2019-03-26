import React from 'react';

// Styles
import '../styles/index.css';
import '../styles/Homepage.css';

// Components
import Header from '../components/Header.js';
import Venues from '../components/Venues.js'
import RecentSearches from '../components/RecentSearches.js';


export default class Homepage extends React.Component {


  render() {


    return (

      <>
        <Header type="long" />

        <div className="home-venues">
          <Venues />
        </div>

        <div className="home-recent-searches">
          <RecentSearches />
        </div>



      </>

    )
  }


}