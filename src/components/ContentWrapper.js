// src/components/ContentWrapper.js
import React from 'react';

const ContentWrapper = ({ title, description, children }) => {
    return (
        <div style={{ padding: '20px', backgroundColor: '#f4f4f4', borderRadius: '8px' }}>
            <h1>{title}</h1>
            <p>{description}</p>
            {children}
        </div>
    );
};

export default ContentWrapper;
