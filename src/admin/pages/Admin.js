import React, { useState, useEffect, useContext } from "react";
import {  useNavigate } from "react-router-dom";
import style from '../sass/admin.module.scss';
import {FaUserShield} from 'react-icons/fa';
import {SiCodersrank} from 'react-icons/si';
import { UserContext } from '../../utils/UserContext';
import Typewriter from 'typewriter-effect';

function Admin() {
const   [username, setUsername] = useState('');
const   [password, setPassword] = useState('');
const   [valid, setValid] = useState(0);

const {isLoggedIn, setIsLoggedIn} = useContext(UserContext);
const navigate = useNavigate();

useEffect(() => {
  console.log("isLoggedIn", isLoggedIn)
  if(isLoggedIn === 1)
    navigate("/Admin/Dashboard");
}, [isLoggedIn, navigate]);

const handleButtonClick = () => {
  // Set localStorage and state variables when the user logs in
  localStorage.setItem('adminLogin', 1);
  setIsLoggedIn(1);

  // Navigate to the Dashboard
  navigate("/Admin/Dashboard");
};

const singIn = async() =>
{
    try {
        const response = await fetch(`http://${process.env.REACT_APP_ADMIN_HOST}:${process.env.REACT_APP_ADMIN_PORT}/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
          }),
        });

        const data = await response.json();
        if (data.status === 1) {
          handleButtonClick(); // Call the handleButtonClick function
        } else {
          setValid(1);
          setUsername('')
          setPassword('')
        }
        console.log(data)
      } catch (error){
        console.log(error);
      }
}

  return (
    <div className={style.containerResponsive}>
      <div className={style.container}>
        <div className={style.leftSide}>
              <div className={style.overlay}>
                  <div className={style.contianerTitle}>
                      <div className={style.containerContent}>
                          <SiCodersrank  className={style.icon}/>
                          <p className={style.title}>Waiting Coders</p>
                          <div className={style.description}>
                              {/* <p>{displayText}</p> */}
                              <Typewriter
                              options={{
                                strings: ['`Unlock the world of possibilities through the lines of code`'],
                                autoStart: true,
                                loop: true,
                              }}
                            />
                          </div>
                      </div>
                  </div>
                  <div className={style.containerCopieRight}>
                  <p>&copy; 2023 Waiting Coder. All rights reserved.</p>
                  </div>
              </div>
        </div>
        <div className={style.loginSide}>
              <div className={style.containerLogin} >
                  <div className={style.containerIcon}>
                      <FaUserShield className={style.icon}/>
                  </div>
                  <div className={style.containerInputs}>
                      <input type="text" placeholder="Enter your username" className={style.input} value={username} onChange={(e) => setUsername(e.target.value)}/>
                      <input type="password" placeholder="Enter your password" className={style.input}value={password} onChange={(e) => setPassword(e.target.value)}/>
                  </div>
                  <div className={style.containerSubmit}>
                      <input type="submit" value="submit" className={style.submit} onClick={singIn}/>
                  </div>
                  {valid ?
                  <p className={style.error}>Your Password or email does not exist</p>
                  :
                  <p className={style.error}></p>
                  }
              </div>
        </div>
        
      </div>
    </div>
  );
}

export default Admin;