import React from 'react'
import Header from '../components/Header'
import Slogan from '../components/Slogan'
import Coursepreviews from '../components/Coursepreviews'
import PageLayout from '../layouts/PageLayout'
import '../styles/global.css'

export default function Home() {
  return (
    <PageLayout>
      <Header />  
      <Slogan />  
      <Coursepreviews />
    </PageLayout>
  )
}
