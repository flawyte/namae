import React from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import {Helmet} from 'react-helmet';
import {useTranslation} from 'react-i18next';
import {Switch, Route, useParams, Redirect} from 'react-router-dom';

import Welcome from './components/Welcome';
import Form from './components/Form';
import Cards from './components/cards';
import Footer from './components/Footer';

import {mobile} from './util/css';
import {isStandalone} from './util/pwa';
import {sanitize} from './util/text';

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/s/:query">
          <Search />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
      {!isStandalone() && <Footer />}
    </>
  );
}

function Home() {
  const {t} = useTranslation();

  return (
    <>
      <Helmet>
        <title>namae — {t('title')}</title>
      </Helmet>
      <Header>
        <Form />
      </Header>
      <Content>
        <Welcome />
      </Content>
    </>
  );
}

function Search() {
  const {query} = useParams<{query: string}>();
  const currentQuery = sanitize(query);

  return (
    <>
      <Helmet>
        <title>Search for &quot;{currentQuery}&quot; — namae</title>
      </Helmet>
      <Header>
        <Form initialValue={currentQuery} />
      </Header>
      <Content>
        <Cards query={currentQuery} />
      </Content>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 100%;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  line-height: 1.625em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #ffffff;
  
  ${mobile} {
    background: #f5f5f5;
  }
}
`;

const Content = styled.div`
  padding-top: 100px;

  ${mobile} {
    padding-top: 60px;
  }
`;

const Header = styled.header`
  padding: 0 40px;
  background-image: linear-gradient(180deg, #bda2ff 0%, #1b24cc 99%);

  ${mobile} {
    padding: 0 20px;
  }
`;
