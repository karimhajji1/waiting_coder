import React, { useState, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import style from "../sass/level.module.scss"
import {AiOutlineSearch} from 'react-icons/ai';
import karim from '../imgs/karim.jpg'
function Level() {

    const [level, setLevel] = useState(50);
    const gradient = `linear-gradient(to right, #02babd ${level}%, #7b7b7b 50%)`;
    const [selectedValue, setSelectedValue] = useState('');
    const handleSelectChange = (event) => {
      setSelectedValue(event.target.value);
    };

    const [selectedValue2, setSelectedValue2] = useState('');

    const handleSelectChange2 = (event) => {
      setSelectedValue2(event.target.value);
    };

  return (
    <div className={style.container}>
       <div className={style.contLevel}>
            <select value={selectedValue} onChange={handleSelectChange}>
                <option value="">Select an option</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
            </select>
            <select value={selectedValue2} onChange={handleSelectChange2}>
                <option value="">Select an option</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
            </select>
            <div className={style.level} style={{ background: gradient }}>
                <p>level : 2</p>
            </div>
       </div>
    </div>
  );
}

export default Level;
