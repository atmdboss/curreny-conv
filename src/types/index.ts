export type rateUpdate = {
    type: string,
    ccy: string,
    baseCcy: string,
    value: string,
};

export type ratesType = {
    ccy: string,
    base_ccy: string,
    buy: string,
    sale: string
}[]