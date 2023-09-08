import React, { useState, useRef } from 'react';
import './ImageGenerator.css';
import DefultImage from '../assets/default_image.svg';

export const ImageGenerator = () => {
  const [image_url, setImage_url] = useState('/');
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (inputRef.current.value === '') {
      return;
    }
    setLoading(true);

    try {
      const res = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer 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`, // Replace with your actual API key
          'User-Agent': 'Chrome',
        },
        body: JSON.stringify({
          prompt: `${inputRef.current.value}`,
          n: 1,
          size: '512x512',
        }),
      });
      
      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      let data_arry = data.data;
      setImage_url(data_arry[0].url);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='AiGenerator'>
      <div className='header'>ai Image <span> generator</span></div>
      <div className='imgLoad'>
        <div className='image'><img src={image_url === '/' ? DefultImage : image_url} alt="Generated Image" /></div>
      </div>
      <div className={loading ? 'loading-bar-full' : 'loading-bar'}></div>
      <div className={loading ? 'loading-text' : 'display-none'}>{loading ? 'Loading....' : ''}</div>

      <div className='search_box'>
        <input type="text" ref={inputRef} className='search-input' id="" placeholder='Describe what we need' />
        <div className='GenerateButton' onClick={generateImage}>Generate</div>
      </div>
    </div>
  );
};
