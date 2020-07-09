import React, { useRef, useEffect, useState } from 'react';
import { gsap } from "gsap";
import logo from './images/img_react-gsap.png';
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


  const [background, setBackground] = useState('#262626');
  const headerRef = useRef(null);

  const revealRefs = useRef([]);
  revealRefs.current = [];

  const toggleBackground = () => {
    const color = background !== '#262626' ? '#262626' : '#1b4943';
    setBackground(color);
  }

  useEffect(() => {

    gsap.to(headerRef.current, { backgroundColor: background, duration: 1,  ease: 'none' });

  }, [background]);

  useEffect(() => {
    
    gsap.from(headerRef.current, {
      autoAlpha: 0, 
      ease: 'none',
      delay: 1
    });

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
      <header ref={headerRef} className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={() => toggleBackground()}>Change background</button>
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
