import React from 'react';

export default function ImageItem({ src, alt }) {
  return (
    <div style={{ margin: '10px' }}>
      <img
        src={src}
        alt={alt}
        style={{
          width: '150px',
          height: '150px',
          borderRadius: '8px',
          objectFit: 'cover',
          boxShadow: '0 2px 5px rgba(0,0,0,0.3)'
        }}
      />
    </div>
  );
};
