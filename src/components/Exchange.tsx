import React, { ChangeEvent, FunctionComponent, useState } from 'react';

type ExchangeProps = {
    currency: string[];
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

const Exchange:FunctionComponent<ExchangeProps> = ({currency}) => {
    const [currChange, setCurrChange] = useState({"xChange":"USD","xGet":"UAH"});

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

    const flipper=()=>{
        const {xChange,xGet} = currChange;
        setCurrChange({xChange:xGet,xGet:xChange});
    }

    return (
        <div className="converter">
            <div className="change">
                <small>Change</small>
                <input type="text"/>
                <select onChange={handleChange} value={currChange["xChange"]} name="xChange" id="xChange">
                    {currency.map((val)=>{
                        return <option key={val} value={val}>{val}</option>
                    })}
                </select>
            </div>
            <button onClick={flipper}>Switch</button>
            <div className="get">
                <small>Get</small>
                <input type="text"/>
                <select onChange={handleChange} value={currChange["xGet"]} name="xGet" id="xGet">
                {currency.map((val)=>{
                        return <option key={val} value={val}>{val}</option>
                    })}
                </select>
            </div>
        </div>
    );
};

export default Exchange;