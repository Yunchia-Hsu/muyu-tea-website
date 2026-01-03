import React from "react";
import './ChatWidget.css';
import head from '../assets/head.jpg';
export default function ChatWidget() {
    return (
        <div className="chat-widget">
            <div className="chat-bubble">
                <div className="chat-avatar">
                    <img src={head} alt="chatbot avatar" />
                </div>
                <p className="chat-text">
                    Hi there! Need help?
                </p>
            </div>
        </div>
    );
}