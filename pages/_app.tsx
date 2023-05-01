import Head from 'next/head';
// import '../styles/globals.css';
import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import Search from '.';
import BottomNav from '../Components/UI/bottomnav';
import TopNav from '../Components/UI/topnav';
import "../styles/spinner.css";
import "../styles/globals.css"
import { THEME, ThemeContext } from '../Components/context/ThemeContext';
import { useState } from "react"

const client = new ApolloClient({
  uri: 'https://graphql-pokeapi.graphcdn.app/',
  cache: new InMemoryCache(),
});

export default function Home({Component, pageProps}:any) {
  
  let [currTheme, setCurrTheme] = useState(THEME.light);

  let changeTheme = () => {
    if(currTheme === THEME.light){
      setCurrTheme(THEME.dark);
    }else{
      setCurrTheme(THEME.light);
    }
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <ApolloProvider client={client}>
      <ThemeContext.Provider value={currTheme}>
        {
          currTheme === THEME.light ? (<button onClick={changeTheme} className='theme_button'>Dark</button>) : <button onClick={changeTheme} className='theme_button'>Light</button>
        }
        <Head> 
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet" />
          <link rel="icon" href="/icon.png" />
          <title>PokeDeV</title>
        </Head>
        <TopNav></TopNav>
        <Component {...pageProps}></Component>
        <BottomNav></BottomNav>
        </ThemeContext.Provider>
      </ApolloProvider>
    </div>
  )
}
