import React, { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';
import { ratesType } from '../redux/currencySlice';

type ExchangeProps = {
    currency: string[];
    rates: ratesType;
};

const possibilities = {
    BTC:{
        0: "BTC/USD",
        1: "USD/BTC"
    },
    USD:{
        0: "USD/BTC",
        1: "BTC/USD",
        2: "USD/UAH",
        3: "UAH/USD"
    },
    UAH:{
        0:"UAH/RUR",
        1:"RUR/UAH",
        2:"UAH/EUR",
        3:"EUR/UAH",
        4:"UAH/USD",
        5:"USD/UAH"
    },
    EUR:{
        0:"UAH/EUR",
        1:"EUR/UAH"
    },
    RUR:{
        0:"RUR/UAH",
        1:"UAH/RUR"
    }
};

const tryingFunc=(triez:string[],whoChange:{name:string,value:string})=>{
    for (const toTry of triez) {
        for (const key in possibilities[whoChange.value]) {
            if(possibilities[whoChange.value][key]===toTry){
                return true;
            }
        }
    }
    return false;
}



const Exchange:FunctionComponent<ExchangeProps> = ({currency,rates}) => {
    const [currChange, setCurrChange] = useState({xChange:"USD",xGet:"UAH"});
    const [moneyChange,setMoneyChange] = useState({mChange:"",mGet:""});
    const [curRate,setCurRate] = useState({buy:"",sale:""})

    useEffect(()=>{
        const currentCurrency = `${currChange.xChange}/${currChange.xGet}`;
        const currToSet = rates.find((rate)=>{
            return `${rate.ccy}/${rate.base_ccy}`===currentCurrency || `${rate.base_ccy}/${rate.ccy}`===currentCurrency  
        }) || {
            ccy: "",
            base_ccy: "",
            buy: "",
            sale: ""
        };
        setCurRate({buy:currToSet.buy,sale:currToSet.sale});
    },[rates,currChange]);

    useEffect(()=>{
        // NEED to know who just changed
        // calculate amount
        let result;
        if(moneyChange.mChange){
            result = Number(moneyChange.mChange) * Number(curRate.buy);
            setMoneyChange({...moneyChange,mGet:result.toString()});
        } else if(moneyChange.mGet){
            result = Number(moneyChange.mGet) / Number(curRate.sale);
            setMoneyChange({...moneyChange,mChange:result.toString()});
        }
        // console.log(result);
    },[curRate,currChange]);

    const handleChange=(e:ChangeEvent)=>{
        // 1. know who is being changed
       const whoIsChanging = {name:e.target.id,value:e.target.value};
        const otherGuy = Object.entries(currChange).reduce((accumulator, currentVal)=>{
            if(currentVal[0]!==e.target.id){
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
        // not updating in a timely fashion
        const num = Number(e.target.value);
        const isNumber = typeof(num)==="number" && !Number.isNaN(num); 
        if(isNumber){
            // before setting....calculate some shit
            // find who changed
            const whoChanged = {name:e.target.id,value:e.target.value};
            // find other guy
            const otherGuy = Object.entries(moneyChange).reduce((accumulator, currentVal)=>{
                if(currentVal[0]!==e.target.id){
                    accumulator.name = currentVal[0];
                    accumulator.value = currentVal[1];
                }
                return accumulator;
            },{name:"",value:""});
            // do correct calculation for who changed
            let result:number;
            if(whoChanged.name==="mChange"){
               result = Number(moneyChange.mChange) * Number(curRate.buy);
            } else {
               result = Number(moneyChange.mGet) / Number(curRate.sale);
            }
            // set other guy with it
            // set guy who changed with what he changed
            setMoneyChange({...moneyChange,[whoChanged.name]:whoChanged.value,[otherGuy.name]:result.toString()});
        }
    };

    const flipper=()=>{
        const {xChange,xGet} = currChange;
        setCurrChange({xChange:xGet,xGet:xChange});
    }

    return (
        <div className="converter">
            <div className="change">
                <small>Change</small>
                <input onChange={handleMoneyChange} type="text" value={moneyChange.mChange} id="mChange" />
                <select onChange={handleChange} value={currChange.xChange} name="xChange" id="xChange">
                    {currency.map((val)=>{
                        return <option key={val} value={val}>{val}</option>
                    })}
                </select>
            </div>

            <button onClick={flipper}>Switch</button>
            
            <div className="get">
                <small>Get</small>
                <input onChange={handleMoneyChange} type="text" value={moneyChange.mGet} id="mGet" />
                <select onChange={handleChange} value={currChange.xGet} name="xGet" id="xGet">
                {currency.map((val)=>{
                        return <option key={val} value={val}>{val}</option>
                    })}
                </select>
            </div>
        </div>
    );
};

export default Exchange;