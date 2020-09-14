import React, { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';
import { rateUpdate } from '../types';
import store from "../redux/store";
import {updateRate} from "../redux/ratesSlice";
import { checkIfNum, modNum } from '../helpers';

type TableDataProps = rateUpdate

const TableData:FunctionComponent<TableDataProps> = ({ccy,baseCcy,value,type}) => {
    const [newRate, setNewRate] = useState("0");
    const [editing,setEditing] = useState(false);
    const [hasError,setHasError] = useState(false);
    const [newValues,setNewValues] = useState({posTen:"0",negTen:"0"});
    useEffect(()=>{
        setNewRate(value);
    },[]);
    useEffect(()=>{
        const tenPercent = 0.1 * Number(value);
        const posTen = Number(value) + tenPercent;
        const negTen = Number(value) - tenPercent;
        setNewValues({posTen:modNum(posTen.toString()),negTen:modNum(negTen.toString())});
    },[value]);
    const handleChange=(e:ChangeEvent)=>{
        if(checkIfNum(e.target.value)){
            setNewRate(e.target.value);
        }    
    }
    const handleClick=()=>{
        setEditing(true);
    };
    const handleSave=()=>{
        
        if(newRate===newValues.posTen||newRate===newValues.negTen){
            setHasError(false);
            store.dispatch(updateRate({type,ccy,baseCcy,value:newRate}));
            setEditing(false);
        } else {
            setHasError(true);
        }
        
    };
    const handleCancel=()=>{
        setNewRate(value);
        setEditing(false);
        setHasError(false);
    };
    return (
        <td>
            {!editing && (
                <span>
                <button onClick={handleClick}>click</button>
                </span>
            )}
            {editing ? (
                <div className={hasError ? "error" : ""}>
                    <input onChange={handleChange} type="text" value={newRate} />
                    <button onClick={handleSave}>save</button>
                    <button onClick={handleCancel}>cancel</button>
                </div>
            ) : (
                <div className="tooltip">
                    <span className="tooltiptext">Possible values: {newValues.negTen} &amp; {newValues.posTen}</span>
                    <p>{newRate}</p>
                </div>
            )}
        </td>
    );
}

export default TableData;