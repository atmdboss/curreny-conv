import React, { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';
import { ratesType } from '../redux/currencySlice';

let justChanged:string|null=null;

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
            // need to know the currency for change here
            // check against ccy and basy_ccy and do calc
            /* if value for "ccy" is same as value on "change" side, then they
            want to buy the other currency. hence, buy rate should be multiplied 
            by money to change

            else, the values should be treated as flipped and it would means they
            want to sell what is on the "get" side, for the value on the other side.
            hence money to change should be divided by sale rate
            */
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

            // result = Number(moneyChange.get) / Number(curRate.sale);
            // setMoneyChange({...moneyChange,change:result.toString()});
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
        // not updating in a timely fashion
        const num = Number(e.target.value);
        const isNumber = typeof(num)==="number" && !Number.isNaN(num); 
        if(isNumber){
            // before setting....calculate some shit
            // find who changed
            // debugger;
            const whoChanged = {name:e.target.name,value:e.target.value};
            // find other guy
            const otherGuy = Object.entries(moneyChange).reduce((accumulator, currentVal)=>{
                if(currentVal[0]!==e.target.name){
                    accumulator.name = currentVal[0];
                    accumulator.value = currentVal[1];
                }
                return accumulator;
            },{name:"",value:""});
            // do correct calculation for who changed
            let result:number;
            if(whoChanged.name==="change"){
                //    result = Number(moneyChange.change) * Number(curRate.buy);
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
            // set other guy with it
            // set guy who changed with what he changed
            setMoneyChange({...moneyChange,[whoChanged.name]:whoChanged.value,[otherGuy.name]:result.toString()});
        }
    };

    const flipper=()=>{
        const {change,get} = currChange;
        // const {buy,sale} = curRate;
        // const newObj = {
        //     change:currChange.get,
        //     get:currChange.change
        // };
        setCurrChange({change:get,get:change});
        // setCurRate({buy:sale,sale:buy});
        
        // console.log("currency changed")
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