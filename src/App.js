import Header from "./components/Header";
import Layout from "./components/Layout";
import Footer from "./components/Footer";

import back from "./assets/bg2.jpg";

import "./index.css";

const App = () => {
  
  return (
    <>
      <Header title="This is new title" descr="This is new Description!" />
      <Layout title="This is new title" descr="This is new Description!" urlBg={ back } />
      <Layout title="This is new title" descr="Thi1212121212" colorBg="red" />
      <Layout title="This is new title" descr="This is new Description!" urlBg={ back }  />
      <Footer />
    </>
  );
};

export default App;
