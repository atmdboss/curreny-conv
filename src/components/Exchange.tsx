import React, { FunctionComponent } from 'react';
import { currType } from '../redux/currencySlice';

type ExchangeProps = {
    data: currType;
};

const Exchange:FunctionComponent<ExchangeProps> = ({data}) => {    
    const modCurrency=(curren:currType)=>{
        const selData = curren?.map((curr)=>{
            return [curr.base_ccy,curr.ccy];
        });
        const flatData = new Set(selData?.flat());
        return [...flatData];
    };
    const moddedCurr = modCurrency(data);
    return (
        <div className="converter" style={{display:"flex"}}>
            <div className="change">
                <small>Change</small>
                <input type="text"/>
                <select name="curr-change" id="curr-change">
                    {moddedCurr.map((val)=>{
                        return <option key={val} value={val}>{val}</option>
                    })}
                </select>
            </div>
            <button>Switch</button>
            <div className="get">
                <small>Get</small>
                <input type="text"/>
                <select name="curr-get" id="curr-get">
                {moddedCurr.map((val)=>{
                        return <option key={val} value={val}>{val}</option>
                    })}
                </select>
            </div>
        </div>
    );
};

export default Exchange;