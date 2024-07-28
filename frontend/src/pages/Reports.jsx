import { useState } from 'react';
import './report.css';
import { useNavigate } from 'react-router-dom';

export function Reports() {
  return (
    
    //<div className="flex justify-content items-center">
    <div class="card" style={{marginTop:10, marginBottom:10, marginLeft:20, marginRight:20, backgroundColor:"#ABE8CA", borderRadius: 20, boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"}}  >
      
      <div>
        <h1 className="text-5xl mr-30" 
        style={{textAlign:'center',padding:50,backgroundColor:'#DBA346', height:150,marginTop:10, marginBottom:10, borderRadius: 20}}>
          Results Page :)
          </h1>
      </div>
      
      
      <div className="content">
        {/* Other content goes here */}
        <h1 className="text-3xl mr-30" >Your Results Here .....</h1>
      </div>
        <a href='/' 
        className="btn btn-warning"
        type="button"
        style={{
          color: 'white',
          backgroundColor:'red',
          textDecoration: 'bold',
          padding: 10,
          marginBottom:30,
          marginTop:300,
          marginLeft:10,
          border: '2px solid red', // Outline color
          cursor: 'pointer', // Change cursor to pointer on hover
          borderRadius: 20
        }} 
        onClick={"/"}
       > Back to Home</a> 
      

      {/* <div>
            <AwesomeButton
              type="primary"
              onReleased={() => {
                navigate("/Results");
              }}
              style={{
                "--button-primary-color": "#ffbc05",
                "--button-primary-color-dark": "#daa000",
                "--button-primary-color-light": "#ffffff",
                "--button-primary-color-hover": "#00cee9",
                "--button-primary-color-active": "#00a5bb",
                "--button-default-border-radius": "10px",
                height: "40px",
                width: "150px",
                marginRight: "10px",
                fontSize: "20px",
                borderStyle: "solid",
                borderRadius: "12px",
                borderColor: "black"
              }}
            >
              Results
            </AwesomeButton>
          </div> */}
        

    </div>
  
  );
}
