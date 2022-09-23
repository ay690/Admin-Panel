import React, { useEffect } from 'react'
import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { collection, doc, setDoc, addDoc, serverTimestamp, } from "firebase/firestore"; 
import { auth, storage, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from 'react-router-dom';

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPerc] = useState(null); //per -> percentage
  const navigate = useNavigate();

  useEffect(() => {
   const uploadFile = () => {

    //if you use multiple files with the same name its gonna overwrite, so to prevent that
    //we will create a unique name with a time stamp onto to it
    // name = timeStamp + file name
    const name = new Date().getTime() + file.name;
    console.log(name);

    const storageRef = ref(storage, file.name);

    const uploadTask = uploadBytesResumable(storageRef, file);

uploadTask.on('state_changed', 
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    setPerc(progress);
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
      default:
       break;
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
    console.log(error);
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      //console.log('File available at', downloadURL);
      setData((prev) => ({...prev, img:downloadURL}));
    });
  }
);

  }

  file && uploadFile();

},[file])

console.log(data);

  const handleInput = (e) =>{
    const id = e.target.id;
    const value = e.target.value;

    setData({...data, [id]: value});
  };
  
  //console.log(data);

  const handleAdd = async (e) => {
    e.preventDefault();
    try{
    const res = await createUserWithEmailAndPassword( //now this returns the user with an id and we can use it in db 
    //now to do that we will use setDoc because we are not generating any id we already made it
      auth, 
      data.email, 
      data.password,
      );

     await setDoc(doc(db, "users", res.user.uid), { //res -> response
      ...data,
      timeStamp: serverTimestamp(),
    });

    navigate(-1);
  }catch(err){
    console.log(err);
  } 
   //console.log(res.id);
  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleAdd} >
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map ((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input 
                  id={input.id} type={input.type} placeholder={input.placeholder} onChange = { handleInput } />
                </div>
              ))}
              <button disabled = {per !== null && per < 100} type='submit' >Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;