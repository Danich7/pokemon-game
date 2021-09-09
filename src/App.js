import Header from "./components/Header";
import Layout from "./components/Layout";
import Footer from "./components/Footer";

import back from "./assets/bg2.jpg";

import "./index.css";

const App = () => {
  
  return (
    <>
      <Header title descr/>
      <Layout title descr urlBg={ back } />
      <Layout title descr colorBg="red" />
      <Layout title descr urlBg={ back } />
      <Footer />
    </>
  );
};

export default App;
