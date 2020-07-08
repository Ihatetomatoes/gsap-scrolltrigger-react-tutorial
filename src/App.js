import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import logo from './images/img_react-and-scrolltrigger.png';
import './App.css';

import image1 from './images/background-01.jpg';
import image2 from './images/background-02.jpg';

import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const images = [
  {
    src: image1, 
    alt: 'Some nice description'
  },
  {
    src: image2, 
    alt: 'Another nice description'
  },
  {
    src: image1, 
    alt: 'lorem ipsum 1'
  },
  {
    src: image2, 
    alt: 'lorem ipsum 2'
  },
  {
    src: image1, 
    alt: 'lorem ipsum 3'
  },
  {
    src: image2, 
    alt: 'lorem ipsum 4'
  }
];

const App = () => {

  const revealRefs = useRef([]);
  revealRefs.current = [];

  useEffect(() => {
    
    revealRefs.current.forEach((el, index) => {
        
      gsap.fromTo(el, {
        autoAlpha: 0
      }, {
        duration: 1, 
        autoAlpha: 1,
        ease: 'none',
        scrollTrigger: {
          id: `image-${index+1}`,
          trigger: el,
          start: 'top center+=100'
        }
      });

    });

  }, []);

  const addToRefs = el => {
    if (el && !revealRefs.current.includes(el)) {
        revealRefs.current.push(el);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Scroll down to see images being revealed by ScrollTrigger.
        </p>
      </header>
      <main className="App-main">
        {
          images.map(({src, alt}) => <img key={alt} alt={alt} ref={addToRefs} src={src} />)
        }
      </main>
    </div>
  );
}

export default App;
