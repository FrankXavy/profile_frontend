import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { useLocation } from 'react-router-dom';

function App() {

  
  console.log(window.location.href);
  var url = window.location.href;
  console.log("la url es:"+url);
  var urlSepareted = url.split(":");
  console.log("la urlSepareted:"+urlSepareted[2]);
  var paramId = urlSepareted[2].split("/");
  console.log("la paramId es:"+paramId[1]);

  const [profile, setProfile] = useState([])
  const [tweets, setTweets] = useState([])

  useEffect(() => {
    
    const fetchData = async () => {
      const result = await fetch('http://localhost:7777/profile/'+paramId[1])
      const jsonResult = await result.json()

      setProfile(jsonResult)

      const tweetsResult = await fetch('http://localhost:7777/tweets/timeline/'+jsonResult.twitterUserId)
      const jsonTweets = await tweetsResult.json()

      setTweets(jsonTweets)
    }

   

    fetchData()
  }, [])

  return (
    <div className="App container">
      <div className='row'>
        <div className='col-4 mt-5' >
          <img alt='profile' className='card-img' 
          src={profile.imageUrl}>
          </img>
          <div className='card mt-5'>
            <div className='card-body'>
                <div className='card-title h3 text-left'>
                  {profile.names}'s timeline
                </div>
                <div className='card-text'>
                  <ul>
                    {tweets.map((tweet) => (
                      <li style={{color: '#2874A6'}} key={tweet.id}>{tweet.text}</li>
                    ))}
                  </ul>
                </div>
            </div>
          </div>
        </div>
        <div className='col-8'>
          <div className='card mt-5'>
            <div className='card-body'>
              <h2 className='text-center'>{profile.name}</h2>
              <div className='card-title h3 text-left'>
                {profile.title}
              </div>
              <div className='card-text'>
                <p>
                  {profile.experienceSummary}
                </p>
                <p>
                  {profile.experience}
                </p>
                <p>
                  {profile.description}
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
