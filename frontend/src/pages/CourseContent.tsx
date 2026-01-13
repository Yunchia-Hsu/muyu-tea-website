import PageLayout from "../layouts/PageLayout";
import Navbar from '../components/Navbar'
import '../styles/global.css'
import '../components/Header.css';
import { Link } from "react-router-dom"
import React from 'react';
import travelwithteapic from '../assets/travel-with-tea.png';
import './Coursecontent.css'

import Header from '../components/Header'
export default function Coursecontent() {
    return (
       
        <PageLayout>
         <Header />  
         //加 上一個課程 下一個課程
         // 讀取data base裡的課程
        <div className="image-wrapper">
             <img src={travelwithteapic} alt="travel with tea course picture" />
        </div>
        <div className="textcontainer">
            <h1 className="coursetitle">Entry - Traveling with Teas</h1>
            <p className="courseintro">
                 This course is designed for tea enthusiasts who wish to explore the world of tea beyond their local borders.
                 This course is designed for tea enthusiasts who wish to explore the world of tea beyond their local borders.
                 This course is designed for tea enthusiasts who wish to explore the world of tea beyond their local borders.
            </p>
            <button className="register-button">register</button>     
        </div>
        </PageLayout>          
       
    )
}