import React, { useState, useEffect , useRef, useCallback} from "react";
import style from '../sass/mainadduser.module.scss'
import { MdGroupAdd } from 'react-icons/md'
import { AiOutlineUserAdd } from 'react-icons/ai'
import {RiGroup2Fill} from 'react-icons/ri'
import {BiSolidDollarCircle} from 'react-icons/bi'


function MainAddUser() {

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    const [errorSize, setErrorSize] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [getALLSpecific, setGetALLSpecific] = useState([]);
    const [getAllGroupOfSpecific, setGetAllGroupOfSpecific] = useState([]);
    const [idSpecific, setIdSpecific] = useState();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName]  = useState('');
    const [email, setEmail] = useState('')
    const [number, setNumber] = useState('')
    const [payment, setPayment] = useState('')
    const [idGroup, setIdGroup] = useState(null)
    const [valid, setValid] = useState(false)
    const [valueSpecific, setValueSpecific] = useState('Choose Specific')
    const [valueGroup, setValueGroup] = useState('')
    const [userExist, setUserExist] = useState(false)
    const fileInputRef = useRef(null);
    const [selectOldGroups, setSelectOldGroups] = useState([]);
    const [selectCurrentGroups, setSelectCurrentGroups] = useState([]);
    const [valueOldGroup, setValueOldGroup] = useState('')
    const [valueCurrentlyGroup, setValueCurrentlyGroup] = useState('')
    const [idGroup2, setIdGroup2] = useState(null)
    const [allStudentGroup, setAllStudentGroup] = useState([]);
    let splitImage1 = null;
    let lastArge1 = null;
    let splitImage2 = null;
    let lastArge2 = null;
    let image = null;
const handleImageChange = (event) => {
    image = event.target.files ? event.target.files[0] : null;
    if (image) {
        splitImage1 = image.name.split('.');
        lastArge1 = splitImage1[splitImage1.length - 1];
    }
    
    if (image && (image.size >= 250 * 1024 || (lastArge1 !== 'png' && lastArge1 !== 'jpeg' && lastArge1 !== 'jpg'
        && lastArge1 !== 'WebP' && lastArge1 !== 'PNG' && lastArge1 !== 'WEBP'
        && lastArge1 !== 'JPEG' && lastArge1 !== 'JPG' && lastArge1 !== 'webp'))) {
        setErrorSize(true);
        setSelectedImage(null);
    } else {
        setSelectedImage(image);
        setErrorSize(false);
    }
    };
      

    const handleSubmit = async (event) => {
      event.preventDefault();
    
      // Create a FormData object to send the data to the server
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("number", number);
      formData.append("payment", payment);
      formData.append("idSpecific", idSpecific);
      formData.append("idGroup", idGroup);
    
      if (selectedImage) {
        splitImage2 = selectedImage.name.split('.');
        lastArge2 = splitImage2[splitImage2.length - 1];
        formData.append("image", selectedImage);
      }
      
      if (
        selectedImage &&
        selectedImage.size <= 250 * 1024 &&
        (lastArge2 === 'png' || lastArge2 === 'jpeg' || lastArge2 === 'jpg' ||
          lastArge2 === 'WebP' || lastArge2 === 'PNG' || lastArge2 === 'WEBP' ||
          lastArge2 === 'JPEG' || lastArge2 === 'JPG' || lastArge2 === 'webp') &&
        firstName.length >= 3 &&
        lastName.length >= 3 &&
        email.length >= 7 &&
        number.length === 10 &&
        !isNaN(number) &&
        idSpecific !== 'Choose Specific' &&
        idSpecific !== undefined &&
        idGroup !== 'Choose Group' &&
        idGroup !== undefined &&
        idGroup !== null && (!isNaN(payment) || payment.length === 0)
      ) {
        // Send the form data to the server using a POST request
        fetch(`http://${process.env.REACT_APP_ADMIN_HOST}:${process.env.REACT_APP_ADMIN_PORT}/api/upload`, {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            if (response.ok) {
              // Handle success (e.g., show a success message)
              console.log("Image uploaded successfully!");
              setSelectedImage(null);
              setFirstName("");
              setLastName("");
              setEmail("");
              setNumber("");
              setValid(false);
              setValueSpecific("Choose Specific");
              setValueGroup("");
              setPayment('');
              setIdGroup(null);
              splitImage1 = null;
              lastArge1 = null;
              splitImage2 = null;
              lastArge2 = null;
              image = null;
              setUserExist(false)
              if (fileInputRef.current) {
                fileInputRef.current.value = null;
              }
            } 
            else if (response.status === 409) {
              setUserExist(true)
            } 
            else {
              // Handle other errors (e.g., show an error message)
              console.error("Error uploading image");
            }
          })
          .catch((error) => {
            console.error("Error uploading image", error);
          });
      } else {
        setValid(true);
      }
    };
    

  const handelChangeSpecific = (event) =>
  {
    const selectedValue = event.target.value;
    setIdSpecific(selectedValue)
    setValueSpecific(selectedValue)
  }

  useEffect(() => {
    fetch(`http://${process.env.REACT_APP_ADMIN_HOST}:${process.env.REACT_APP_ADMIN_PORT}/api/getAllNameSpecifics`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setGetALLSpecific(data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    fetch(`http://${process.env.REACT_APP_ADMIN_HOST}:${process.env.REACT_APP_ADMIN_PORT}/api/getGroupsConditonSpecific/${idSpecific}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setGetAllGroupOfSpecific(data);
      })
      .catch((error) => console.error(error));
  }, [idSpecific]);

  const handelChangeGroup = (event) =>
  {
        const selectedValue = event.target.value;
        setIdGroup(selectedValue);
        setValueGroup(selectedValue);
  }

  useEffect(() => {
    fetch(`http://${process.env.REACT_APP_ADMIN_HOST}:${process.env.REACT_APP_ADMIN_PORT}/api/getOldGroups`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSelectOldGroups(data);
      })
      .catch((error) => console.error(error));
  }, []);

  // select currently groups 
  useEffect(() => {
    fetch(`http://${process.env.REACT_APP_ADMIN_HOST}:${process.env.REACT_APP_ADMIN_PORT}/api/getCurrentGroups`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSelectCurrentGroups(data);
        setIdGroup2(data[0].IdGroup)
        setValueCurrentlyGroup(data[0].IdGroup);
      })
      .catch((error) => console.error(error));
    }, []);
  const handleChangeOldGroup = (event) =>
  {
    const selectedValue = event.target.value;
    setValueOldGroup(selectedValue)
    setValueCurrentlyGroup('')
    setIdGroup2(selectedValue)
  }
  const handleChangeCurrentlyGroup = (event) =>
  {
    const selectedValue = event.target.value;
    setValueCurrentlyGroup(selectedValue)
    setValueOldGroup('')
    setIdGroup2(selectedValue)
  }
  const getStudents = useCallback(() => {
    fetch(`http://${process.env.REACT_APP_ADMIN_HOST}:${process.env.REACT_APP_ADMIN_PORT}/api/getStudentsGroupOnly/${idGroup2}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setAllStudentGroup(data);
      })
      .catch((error) => console.error(error));
  }, [idGroup2]); 
  const [prices, setPrices] = useState([]);
  
  useEffect(() => {
    getStudents();
  }, [idGroup2, getStudents]);
  const [currentStyle, setCurrentStyle] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [idStudent, setISdtudent] = useState(0);
  const [indexStudent, setIndexSdtudent] = useState(0);
  const updatePrice = (valid) => {
    
    if (parseInt(prices[indexStudent]) > 0 && parseInt(prices[indexStudent]) < 1001 && valid === "yes") {
      fetch(`http://${process.env.REACT_APP_ADMIN_HOST}:${process.env.REACT_APP_ADMIN_PORT}/api/updatePayment/${idStudent}/${prices[indexStudent]}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((responseData) => {
          // You can add code here to handle the response data if needed.
          const newPrices = [...prices];
          newPrices[indexStudent] = ''; // Reset the corresponding price to an empty string
          setPrices(newPrices);
          getStudents();
        })
        .catch((error) => {
          console.error('Error pushing data:', error);
        });
        
        console.log('Update Price function called');
      }
      document.body.style.overflow = 'auto';
      setCurrentStyle(0);

  };

  
  function confarmationF(id, index) {
    setISdtudent(id)
    setIndexSdtudent(index)
    setCurrentStyle(1);
    document.body.style.overflow = 'hidden';
  }


  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array means this effect runs once when the component mounts
  useEffect(() => {
    
  }, [currentStyle]);
  const styleAlert = currentStyle === 0 ? style.validUpdatePymentNone : style.validUpdatePyment;
    
  return (
    <>
    <div className={style.containerResponcive}>
    <div className={styleAlert} style={{top: scrollPosition }}>
      
        <div className={style.confirmation}>
          <p>Are you chuse you want to confirm ?</p>
          <div className={style.containerInput}>
            <input type="button" value="cancel" onClick={() => updatePrice("no")}/>
            <input type="button" value="ok" onClick={() => updatePrice("yes")} />
          </div>
        </div>
    </div>
    <div className={style.container}>
      <div className={style.containerAddUser}>
        <div className={style.containerTitle}>
          <MdGroupAdd className={style.iconFolder} />
          <p>Add Students</p>
        </div>
        <div className={style.containerForm}>
        {/* start first form */}
          <div className={style.forms}>
            <div className={style.containerTitle}>
              <AiOutlineUserAdd className={style.iconFolder} />
              <p>Add Student</p>
            </div>
            <form>
                <input type="text" placeholder="Enter First Name Student" value={firstName}  onChange={(event) => setFirstName(event.target.value)}/>
                <input type="text" placeholder="Enter Last Name Student" value={lastName} onChange={(event) => setLastName(event.target.value)}/>
                <input type="text" placeholder="Enter Email Student" value={email} onChange={(event) => setEmail(event.target.value)}/>
                {userExist === true ? <span className={style.errorSize}>* This email is already exist</span> : <span></span>}
                <input type="text" placeholder="Enter Number Student" value={number} onChange={(event) => setNumber(event.target.value)}/>
                <label>
                {selectedImage ? 'Img Name: ' + selectedImage.name : 'Choose Img'}
                <input 
                ref={fileInputRef}
                type="file" style={{display: 'none'}} onChange={handleImageChange}/>
                </label>
                {errorSize === true ? <span className={style.errorSize}>* Error size is big or type</span>:<span></span>}
            </form>
            
            </div>
        {/* finish first form */}

        {/* start second form */}
        <div className={style.forms}>
            <div className={style.containerTitle}>
              <RiGroup2Fill className={style.iconFolder} />
              <p>Choose Specialty</p>
            </div>
            <form onSubmit={handleSubmit}>
                <select value={valueSpecific} onChange={handelChangeSpecific}>
                    <option value="Choose Specific" >Choose Specific</option>
                    {getALLSpecific.map((item, index) => (
                        <option key={index} value={item.id}>{item.name}</option>
                    ))}
                </select>
                <select value={valueGroup} onChange={handelChangeGroup}>
                    <option value="Choose Group" >Choose Group</option>
                    {getAllGroupOfSpecific.map((item, index) => (
                        <option key={index} value={item.id}>Group : {item.name_group}</option>
                    ))}
                </select>
                <span className={style.choice}>* Choice</span>
                <input type="text" placeholder="Enter Payment" value={payment} onChange={(event) => setPayment(event.target.value)}/>
                <button  type="submit">Submit</button>
                {valid === true ? <span className={style.errorSize}>* Complete All</span> : <span></span>}
            </form>
        </div>
        {/* finish second form */}
        </div>
      </div>
      {/* finish container add user */}

      {/* start container choose group */}
        <div className={style.containerGroups}>
            <div className={style.containerTitle}>
                <RiGroup2Fill className={style.iconFolder} />
                <p>Choose Specialty</p>
            </div>
            <div className={style.containerSelect}>
                <select value={valueOldGroup} onChange={handleChangeOldGroup}>
                    <option value="Choose Group" >Choose Old Group</option>
                    {selectOldGroups.map((item, index) => (
                        <option  key={index} value={item.IdGroup} >Group : {item.name} {item.name_group}</option>
                    ))}
                </select>
                <select value={valueCurrentlyGroup} onChange={handleChangeCurrentlyGroup}>
                    <option value="Choose Group" >Choose Crruntly Group</option>
                    {selectCurrentGroups.map((item, index) => (
                        <option key={index} value={item.IdGroup}>Group : {item.name} {item.name_group}</option>
                    ))}
                </select>
            </div>
        </div>
      {/* finish container choose group */}

      {/* start container payment */}
      <div className={style.containerTable}>
        <div className={style.containerTitle}>
            <BiSolidDollarCircle className={style.iconFolder} />
            <p>Enter payment</p>
        </div>
        <table>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Student(s)</th>
                        <th>payemnt</th>
                        <th className={style.displayNone}>Enter payemnt</th>
                        <th className={style.displayNone}>New Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    
                      {allStudentGroup.length > 0 ?(
                        allStudentGroup.map((item, index) => (
                        
                    <tr key={index} className={style.trHover}>
                      <td>
                      {item.phone === "null" ? (
                          <img
                          src={item.image}
                          alt={item.firstName}
                          className={style.img}
                          />
                        ) : (
                          <img
                          src={item.image ? require(`../../imgs/${item.image}`) : 'fallback-image-url.jpg'}
                          alt={item.firstName}
                          className={style.img}
                          />
                        )}
                      </td>
                      <td>
                        {item.firstName}
                        </td>
                      <td style={{fontWeight: "bold"}}>
                        {item.payment} DH
                      </td>
                      <td className={style.displayNone}>
                        <input
                          type="text"
                          value={prices[index] || ''} // Ensure value is defined
                          onChange={(event) => {
                            const newPrices = [...prices];
                            newPrices[index] = event.target.value;
                            setPrices(newPrices);
                          }}
                        />
                      </td>
                      <td className={style.displayNone}>
                        <button onClick={() => confarmationF(item.idOfUser, index)}>Valid</button>
                        {/* <button onClick={() => updatePrice(item.idOfUser, index)}>Valid</button> */}
                      </td>
                  </tr>    
                ))) : (
                  <>
                    <tr style={{backgroundColor: '#00bbbe'}}>
                      <td>empty</td>
                      <td>empty</td>
                      <td>empty</td>
                      <td>empty</td>
                      <td>empty</td>
                    </tr>
                  </>
                )}
                  </tbody>
              </table>
        </div>
        {/* finish container payment */}
    </div>
    </div>
    </>
  );
}

export default MainAddUser;
