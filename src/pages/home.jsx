import Appdownload from "../component/download";
import Footer from "../component/footer";
import Hero from "../component/hero";
import Joblisting from "../component/joblisting";
import Navbar from "../component/navbar";

function Home() {
    return ( 
        <div>
            <Navbar></Navbar>
            <Hero></Hero>
            <Joblisting></Joblisting>
            <Appdownload></Appdownload>
            <Footer></Footer>
        </div>
     );
}

export default Home;