export const modNum = (numStr: string) => {
    const floatIndex = numStr.indexOf(".");
    const precisionNum = floatIndex > 0 ? numStr.slice(0, floatIndex).length + 2 : numStr.length;
    const num = Number(numStr).toPrecision(precisionNum);
    return num;
}

export const possibilities = {
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

export const tryingFunc=(triez:string[],whoChange:{name:string,value:string})=>{
    for (const toTry of triez) {
        for (const key in possibilities[whoChange.value]) {
            if(possibilities[whoChange.value][key]===toTry){
                return true;
            }
        }
    }
    return false;
}

export const checkIfNum=(value:string)=>{
    const num = Number(value);
    return typeof(num)==="number" && !Number.isNaN(num); 
}