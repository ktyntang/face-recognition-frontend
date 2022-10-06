import React, {useState} from 'react';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import LoginForm from './components/LoginForm/LoginForm';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const App = () => {
  const [input,setInput] = useState('')
  const [imageUrl,setImageUrl] = useState('')
  const [boxes,setBoxes] = useState([])
  const [route,setRoute] = useState('signin')
  const [isSignedIn,setIsSignedIn] = useState(false)
  const [user,setUser] = useState({
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  })

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    })
  }
  
  const calculateFaceLocation = (data) => {
    const image = document.getElementById('inputimage');
    const [width,height] = [Number(image.width), Number(image.height)]
    const clarifaiFace = data.outputs[0].data.regions.map(region => region.region_info.bounding_box);
    const faceboxes = clarifaiFace.map(face => {
        return {
        leftCol: face.left_col * width,
        topRow: face.top_row * height,
        rightCol: width - (face.right_col * width),
        bottomRow: height - (face.bottom_row * height)}
      })
    setBoxes(faceboxes)
  }

  const onInputChange = (event) => setInput(event.target.value)

  const onButtonSubmit = () => {
    setImageUrl(input);
    fetch('https://quiet-forest-85839.herokuapp.com/image', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"input": input})
          })
          .then(res=>res.json())
          .then(response => {
            if (response.outputs[0].data.regions) {
              calculateFaceLocation(response)
              fetch('https://quiet-forest-85839.herokuapp.com/image', {
                method: 'put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({"id" :user.id})
              })
                .then(response => response.json())
                .then(count => {
                  setUser({...user,entries:count})
                })
                .catch(console.log)
              }
      })
      .catch(err => console.log(err));
  }

  const onRouteChange = (route) => {
    setRoute(route)
    if (route === 'signout') {
      setInput('')
      setImageUrl('')
      setBoxes([])
      setRoute('signin')
      setIsSignedIn(false)
      setUser({
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''})
    } else if (route === 'home') {
      setIsSignedIn(true)
    }
  }

  
  if (route === 'home'){
  return(
      <div className="App">
        <Particles className='particles' params={particlesOptions}/>
        <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
             <Rank
                name={user.name}
                entries={user.entries}
              />
              <ImageLinkForm    
                onInputChange={onInputChange}
                onButtonSubmit={onButtonSubmit}
              />
              <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
              <footer className ='pa1 mb2 white'>model by <a href = 'https://clarifai.com/'>clarifai</a></footer>
            </div>)} else {
          return(
          <div className="App">
         <Particles className='particles' params={particlesOptions}/>
        <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
        <LoginForm loadUser={loadUser} onRouteChange={onRouteChange} route ={route}/>
      </div>)
}
}

export default App;
