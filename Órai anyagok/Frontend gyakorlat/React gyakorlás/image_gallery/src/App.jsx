import React, { useState } from 'react';
import ImageItem from './ImageItem';

export default function App() {
    const images = [
        { src: 'https://via.placeholder.com/150/FF5733/FFFFFF?text=Image+1', alt: 'Image 1' },
        { src: 'https://via.placeholder.com/150/33FF57/FFFFFF?text=Image+2', alt: 'Image 2' },
        { src: 'https://via.placeholder.com/150/3357FF/FFFFFF?text=Image+3', alt: 'Image 3' },
        { src: 'https://via.placeholder.com/150/FF33A8/FFFFFF?text=Image+4', alt: 'Image 4' },
        { src: 'https://via.placeholder.com/150/33FFF6/FFFFFF?text=Image+5', alt: 'Image 5' }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    function goToPrevious() {
        let previousIndex;
        if (currentIndex === 0) {
            previousIndex = images.length - 1;
        } else {
            previousIndex = currentIndex - 1;
        }

        setCurrentIndex(previousIndex);
    }

    function goToNext() {
        let nextIndex;
        if (currentIndex == images.length - 1) {
            nextIndex = 0;
        } else {
            nextIndex = currentIndex + 1;
        }

        setCurrentIndex(nextIndex);
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2>Image Gallery</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <ImageItem 
                    src={images[currentIndex].src}
                    alt={images[currentIndex].alt}
                />
            </div>

            <button onClick={goToPrevious}>Vissza</button>
            <button onClick={goToNext}>Előre</button>
        </div>
    );
};
