"use client";
import React from 'react';
import './Loading.css'; // CSS dosyasını import edin

const Loading = () => {
    return (
        <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Yükleniyor...</p>
        </div>
    );
};

export default Loading;