import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Home() {
  const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
  const [note, setNote] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      axios({
        method: "get",
        url: "http://localhost:8000/Content"
      }).then(res => setNote(res.data));
    }
    catch (err) {
      console.log("Unable to fetch data: " + err);
    }
  }, [])

  const deleteData = async element => {
    try {
      await axios({
        method: "delete",
        url: "http://localhost:8000/Content",
        data: { element }
      })
    }
    catch (err) {
      console.log("Error in deleting post: " + err);
    }
  };

  return (
    <>
      <Navbar />
      <div className='container overflow-scroll p-4 mb-5'>
        <h1>Home</h1>
        <p>{homeStartingContent}</p>
        <ul className='list-group'>
          {note.map((element, index) => (
            <li key={index}
              className="list-group-item"
              onClick={() => navigate(`/post/${element.title}`)}>
              <ul className='list-group list-group-horizontal'>
                <li style={{ "position": "relative" }}><img src={element.coverImage} alt={null} /></li>
                <ul className='list-group' style={{ "marginLeft": "5%" }}>
                  <li><p className='display-6'>{element.title}</p></li>
                  <li><p className='fw-light'>{element.snippet}</p></li>
                </ul>
                <li><button onClick={e => {
                  e.preventDefault();
                  deleteData(element);
                }}
                  className='btn btn-outline-light'>
                  <i className="bi bi-trash3" />
                </button>
                </li>
              </ul>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </>
  )
}

export default Home;
