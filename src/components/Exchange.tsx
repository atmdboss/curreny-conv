import React, { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';
import { ratesType } from '../types';
import { checkIfNum, possibilities,tryingFunc } from "../helpers";

type ExchangeProps = {
    currency: string[];
    rates: ratesType;
};

const Exchange:FunctionComponent<ExchangeProps> = ({currency,rates}) => {
    const [currChange, setCurrChange] = useState({change:"USD",get:"UAH"});
    const [moneyChange,setMoneyChange] = useState({change:"",get:""});
    const [curRate,setCurRate] = useState({buy:"",sale:"",ccy: "",base_ccy: ""})

    useEffect(()=>{
        const currentCurrency = `${currChange.change}/${currChange.get}`;
        const currToSet = rates.find((rate)=>{
            return `${rate.ccy}/${rate.base_ccy}`===currentCurrency || `${rate.base_ccy}/${rate.ccy}`===currentCurrency  
        }) || {
            ccy: "",
            base_ccy: "",
            buy: "",
            sale: ""
        };
        setCurRate(currToSet);
    },[rates,currChange]);

    useEffect(()=>{
        let result;
        if(moneyChange.change){
            if(curRate.ccy===currChange.change){
                // use buy rate
                result = Number(moneyChange.change) * Number(curRate.buy);
                setMoneyChange({...moneyChange,get:result.toString()});
            } else {
                // use sell rate
                result = Number(moneyChange.change) / Number(curRate.sale);
                setMoneyChange({...moneyChange,get:result.toString()});
            }  
        } else if(moneyChange.get){
            if(curRate.base_ccy===currChange.get){
                // use buy rate
                result = Number(moneyChange.get) * Number(curRate.buy);
                setMoneyChange({...moneyChange,change:result.toString()});
            } else {
                // use sell rate
                result = Number(moneyChange.get) / Number(curRate.sale);
                setMoneyChange({...moneyChange,change:result.toString()});
            }
        }
    },[curRate,currChange]);

    const handleCurrencyChange=(e:ChangeEvent)=>{
        // 1. know who is being changed
       const whoIsChanging = {name:e.target.name,value:e.target.value};
        const otherGuy = Object.entries(currChange).reduce((accumulator, currentVal)=>{
            if(currentVal[0]!==e.target.name){
                accumulator.name = currentVal[0];
                accumulator.value = currentVal[1];
            }
            return accumulator;
        },{name:"",value:""});

        const tries = [`${whoIsChanging.value}/${otherGuy.value}`,`${otherGuy.value}/${whoIsChanging.value}`];
       
        const matchFound = tryingFunc(tries,whoIsChanging);
        // if match is NOT found, find a match for whoIsChanging and use the other value to change otherGuy
        if(matchFound){
            setCurrChange({...currChange,[whoIsChanging.name]:whoIsChanging.value});
        } else {
            // first find a match
            const match:string = possibilities[whoIsChanging.value][0];
            const smth = match.split("/").find((val)=> val !== whoIsChanging.value);
            setCurrChange({[whoIsChanging.name]:whoIsChanging.value,[otherGuy.name]:smth});
        }
    };

    const handleMoneyChange=(e:ChangeEvent)=>{
        const isNumber = checkIfNum(e.target.value);
        if(isNumber){
            const whoChanged = {name:e.target.name,value:e.target.value};
            const otherGuy = Object.entries(moneyChange).reduce((accumulator, currentVal)=>{
                if(currentVal[0]!==e.target.name){
                    accumulator.name = currentVal[0];
                    accumulator.value = currentVal[1];
                }
                return accumulator;
            },{name:"",value:""});

            let result:number;
            if(whoChanged.name==="change"){
                if(currChange.change===curRate.ccy){
                    result = Number(whoChanged.value) * Number(curRate.buy);
                } else {
                    result = Number(whoChanged.value) / Number(curRate.sale);
                }  
            } else {
                if(currChange.get===curRate.base_ccy){
                    result = Number(whoChanged.value) / Number(curRate.sale);
                } else {
                    result = Number(whoChanged.value) * Number(curRate.buy);
                }
            }
            setMoneyChange({...moneyChange,[whoChanged.name]:whoChanged.value,[otherGuy.name]:result.toString()});
        }
    };

    const flipper=()=>{
        const {change,get} = currChange;
        setCurrChange({change:get,get:change});
    }

    return (
        <div className="converter">
            <div className="change">
                <small>Change</small>
                <input onChange={handleMoneyChange} type="text" value={moneyChange.change} name="change" />
                <select onChange={handleCurrencyChange} value={currChange.change} name="change">
                    {currency.map((val)=>{
                        return <option key={val} value={val}>{val}</option>
                    })}
                </select>
            </div>

            <button onClick={flipper}>Switch</button>
            
            <div className="get">
                <small>Get</small>
                <input onChange={handleMoneyChange} type="text" value={moneyChange.get} name="get" />
                <select onChange={handleCurrencyChange} value={currChange.get} name="get">
                {currency.map((val)=>{
                        return <option key={val} value={val}>{val}</option>
                    })}
                </select>
            </div>
        </div>
    );
};

export default Exchange;