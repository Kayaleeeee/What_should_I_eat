import React, { useEffect, useState } from "react";

const PlaceInfo=({url, show, showInfo})=>{

//     const [show, setShow] = useState(Boolean);

//     console.log(show)
   
//    const showInfo=()=>{
//         setShow(false);
//     }
    
    return (
        <div>
            <div id="place_modal" className={show==true? "show":"hide"}>
                <button className="closeBtn" onClick={showInfo} > X </button>
            <iframe  src={url} title="naver"></iframe>
            </div>
         
            <style jsx>{`

     
                h1{
                    position: absolute;
                    top:0;
                    z-index:10000;
                }
            
                .hide{
                    display:none;
                }

                #place_modal{
                    position:absolute;
                    z-index: 9999;
                    top:20%;
                    width: 50%;
                    height: 50%;
                    right:10%;
                  }
                
                  iframe{
                    border-radius: 20px;
                    border:none;
                    position:relative;
                    width: 100%;
                    height: 95%;
                  }

                .closeBtn{
                    margin-left: 1rem;
                    padding: .5rem;
                    background: black;
                    color:white;
                    border: none;
                    position: absolute;
                    border-radius: 5px;
                    top: 5%;
                    right: 5%;
                    z-index: 999999;
                }

                .closeBtn:hover{
                    transition:0.2s;
                    background: darkgray;
                    cursor:pointer;
                }
          
            `}</style>
        </div>
    );

}

export default PlaceInfo;