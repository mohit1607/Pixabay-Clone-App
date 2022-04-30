import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
  
  const [ hits, sethits] = useState([]);
  const [ loading, setloading] = useState(false);
  const [ Page, setPage] = useState(1);
  const [ search, setSearch] = useState("");
  const [ searchClick , setSearchClick] = useState(false);

//  const refreshPage = ()=>{
  //  window.location.reload();
// }   I am delaying it for future. {major problem}

  const nextpage = () => {
    setPage(Page +1);
    scrollToTop();
  }

  const backpage = () => {
    if(Page >= 1){
      setPage(Page-1);
      scrollToTop();
    }
  }

  const inputEvent = (event) => {
    console.log(event.target.value);
    setSearch(event.target.value)
  }

  const Url = `https://pixabay.com/api/?key=&page=${Page}&q=${search}`;

  const getData = () => {
    setloading(true);
    axios.get(Url
      ).then( (res) => {
        console.log(res.data.hits);
        sethits(res.data.hits);
      })
      setloading(false);
    
  }

  const searchClickfun = () => {
    setSearchClick(!searchClick);
  }

  const scrollToTop  = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"   // browser object model
    });
  }
  
  
  useEffect(() => {
   getData();
  }, [Page,searchClick] );  // this empty array means that it is only run when component did mount or refresh.
 
  return (
    <>

     <div className="container-fluid bg-success">
      <h1 className=" p-5 text-light me-auto ">Pixabay App Clone</h1>
     </div>
    
    <div className="container">
      <div class="input-group mx-auto backImage p-5">
        <input type="text" class="form-control p-3 border-1" placeholder="Search Images Here"
        onChange={inputEvent} aria-label="Recipient's username" 
        aria-describedby="basic-addon2"/>
        <span class="input-group-text" id="basic-addon2" onClick={searchClickfun}>Search</span>
    </div>
    </div>
   
   <div className="container">
      <div className=" d-flex flex-wrap align-self-baseline">
      { hits.map((currEle,ind) => {
          return(
            <img src ={currEle.webformatURL} className='m-1 image-fluid' key={ind+1} alt ='pixabayPic'/>
          )
        })}
      </div>
   </div>

    <div className="container">
      <div className="m-5  p-4 d-flex">
        <button onClick={backpage}  className="btn btn-success p-4" id='nextbutton'>Back</button>
        <h3 className="mx-auto ">Page {Page}</h3>
        <button onClick={nextpage} className="btn btn-success p-4 float-end"  id='backbutton'>{(loading) ? "loading" : "Next"}</button>
      </div>
    </div>
    </>
  );
}

export default App;
