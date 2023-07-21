import { useState, useEffect } from 'react';
import Select from 'react-select';
import { Section } from '../../../components/Section';
import { MainLayout } from '../../../layouts/MainLayout';
import AsyncSelect from 'react-select/async';

async function fetchCurrencyList() {
  const url = `https://api.coingecko.com/api/v3/coins/list`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error('Error al obtener la lista de monedas:', error);
  }
}

const customStyles = {
  control: (provided, state) => ({
    alignItems: 'center',
    cursor: 'default',
    display: 'flex',
    outline: '0!important',
    position: 'relative',
    transition: 'all 100ms',
    backgroundColor: '#680ca5',
    borderStyle: 'solid',
    borderWidth: '1px',
    color: 'white',
    boxSizing: 'border-box',
    padding: '10px',
    justifyContent: 'space-between',
    border: state.isFocused ? '1px solid #430a69' : '1px solid #680ca5',
    borderRadius: '12px',
    fontSize: '18px',
    '&:hover': {
      border: state.isFocused ? '1px solid #430a69' : '1px solid #680ca5',
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'white', // Cambia el color del texto de la opción seleccionada
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#c7a5ee', // Cambia el color del texto del placeholder
  }),
  menu: (provided) => ({
    ...provided,
    boxShadow: 'none',
    borderRadius: '4px',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused
    ? '#430a69'
    : state.isSelected
    ? '#000'
    : 'white',
    color: state.isFocused || state.isSelected ? 'white' : 'black',
  }),
  menuList: (provided) => ({
    ...provided,
    padding: 0,
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: 'none',
  }),
  dropdownIndicator: (provided, state) => ({
  }),
  input: (provided) => ({
    ...provided,
    color: 'white',
  }),
};


export const HolderCalculator = () => {

  const [currency, setCurrency] = useState('');
  const [currencyList, setCurrencyList] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [priceDisabled, setPriceDisabled] = useState(true);
  const [formState, setFormState] = useState({
    investmentAmount: '',
    tokenPrice: '',
    reinvestmentPeriod: '',
    APR: '',
    stakingPeriod: '',
    estimatedTokenPrice: '',
    costTransaction: ''
  });
  const {investmentAmount, tokenPrice, reinvestmentPeriod, APR, stakingPeriod, estimatedTokenPrice, costTransaction} = formState;  

  const [fields, setFields] = useState({
    investmentValue: '',
    finalCapital: '', 
    cryptoProfitability: '', 
    finalValueInvestment: '', 
    profit: '', 
    profitability: '', 
    nTransactions: '', 
    totalCostTransactions: '', 
    realProfit: '', 
    realProfitability: ''
  });
  const {investmentValue, finalCapital, cryptoProfitability, finalValueInvestment, profit, profitability, nTransactions, totalCostTransactions, realProfit, realProfitability} = fields;

  const options = currencyList.map((currency) => ({
    value: currency.id,
    label: currency.symbol.toUpperCase(),
  }));

  const handleFormChange = ({ target }) => {
    const { id, value } = target;
    if( !isNaN(value) ) {
      setFormState({
        ...formState,
        [ id ]: value.trim()
      })
    }
  }


  const handleSuggestPeriod = () => {
    for (let key in formState) {
      if (key !== "reinvestmentPeriod" && formState[key].length === 0) {
        alert("You must fill in all other fields.")
        return;
      }
    }
    let finalProf = 0;
    let period = 1;
    for(let i=1; i<stakingPeriod; i++)
    {
      let temp1 = (1+(APR/365*i)/100);
      let temp2 = Math.floor(stakingPeriod/i);
      let temp3 = investmentAmount * Math.pow( temp1, temp2 );
      let ivalue = investmentAmount*tokenPrice
      let fcap = temp3 + temp3 * (APR/365/100) * (stakingPeriod%i);
      let cprof = (fcap - investmentAmount)*100/investmentAmount;
      let fvalue = fcap * estimatedTokenPrice;
      let prof = fvalue - ivalue;
      let profitability = prof * 100 / ivalue;
      let ntrans = Math.ceil(stakingPeriod/i) + 1;
      let ctrans = ntrans * costTransaction;
      let rprof = prof - ctrans;
      let rprofitability = rprof * 100 / ivalue;
      if(rprofitability>finalProf)
      {
        finalProf = rprofitability;
        period = i;
      }
    }
    setFormState({
      ...formState,
      reinvestmentPeriod: period
    })
  }


  const handleCurrencyChange = async(selectedOption) => {
    setSelectedCurrency(selectedOption);
    setCurrency(selectedOption.label);
    let url =  `https://api.coingecko.com/api/v3/coins/${selectedOption.value}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      const { market_data: { current_price: { usd: currentPrice } } } = data;
      console.log(currentPrice);
      if(currentPrice === undefined) {
        if(priceDisabled) setPriceDisabled(false);
      }
      else {
        if(!priceDisabled) setPriceDisabled(true);

      }

      setFormState((actualFormState) => {
        return { 
          ...actualFormState,
          ["tokenPrice"]: currentPrice === undefined ? 0 : currentPrice
        };
      });
      
    } catch (error) {
      console.error('Error al obtener la lista de monedas:', error);
    }
    
  };


  const calculateFields = () => {
    const temp1 = (1+(APR/365*reinvestmentPeriod)/100);
    const temp2 = Math.floor(stakingPeriod/reinvestmentPeriod);
    const temp3 = investmentAmount * Math.pow( temp1, temp2 );
    const ivalue = investmentAmount*tokenPrice
    const fcap = temp3 + temp3 * (APR/365/100) * (stakingPeriod%reinvestmentPeriod);
    const cprof = (fcap - investmentAmount)*100/investmentAmount;
    const fvalue = fcap * estimatedTokenPrice;
    const prof = fvalue - ivalue;
    const profitability = prof * 100 / ivalue;
    const ntrans = Math.ceil(stakingPeriod/reinvestmentPeriod) + 1;
    const ctrans = ntrans * costTransaction;
    const rprof = prof - ctrans;
    const rprofitability = rprof * 100 / ivalue;

    setFields({
      investmentValue: ivalue,
      finalCapital: isNaN(fcap) ? "" : fcap.toFixed(4),
      cryptoProfitability: isNaN(cprof) ? "" : cprof.toFixed(2), 
      finalValueInvestment: isNaN(fvalue) ? "" : fvalue.toFixed(2), 
      profit: isNaN(prof) ? "" : prof.toFixed(2), 
      profitability: isNaN(profitability) ? "" : profitability.toFixed(2), 
      nTransactions: isNaN(ntrans) ? "" : ntrans, 
      totalCostTransactions: isNaN(ctrans) ? "" : ctrans, 
      realProfit: isNaN(rprof) ? "" : rprof.toFixed(2), 
      realProfitability: isNaN(rprofitability) ? "" : rprofitability.toFixed(2)
    })
  }


  useEffect(() => {
    if(selectedCurrency !== null)
    {
      const newTimerId = setInterval(() => handleCurrencyChange(selectedCurrency), 60000);
      
      return () => clearInterval(newTimerId);
    }
  }, [tokenPrice]);


  useEffect(() => {
    async function fetchData() {
      const currencies = await fetchCurrencyList();
      setCurrencyList(currencies);
    }
    fetchData();
  }, []);


  useEffect(() => {
    calculateFields();
  }, [formState]);


  const loadOptions = async (inputValue) => {

    

    console.log("HOLAAA")
    // Mapeamos los datos recibidos para que react-select pueda manejarlos
    const options = data.map((currency) => ({
      value: currency.id,
      label: currency.symbol.toUpperCase(),
    }));

    return options;
  };


  const filterData = (inputValue) => {
    const data = currencyList.filter((elem) =>  
      elem.id.toUpperCase().includes(inputValue.toUpperCase()) ||
      elem.symbol.toUpperCase().includes(inputValue.toUpperCase()) ||
      elem.name.toUpperCase().includes(inputValue.toUpperCase())
    );
    
    return data.map((currency) => ({
      value: currency.id,
      label: currency.symbol.toUpperCase(),
    }));
  };

  const promiseCurrenciesOptions = (inputValue) =>
  new Promise ((resolve) => {
    setTimeout(() => {
      resolve(filterData(inputValue));
    }, 1000);
  });


  return (
    <MainLayout bodyClassName="pt-sm" navGradient={true}>
      <Section id="crypto-tools" className="tool-item">
      <div className="sub-container">
        <h1 className="mb-40 text-glowy-white">Holder Calculator</h1>
        <div className="fs-20 text-light-1 mt-3 mb-50">Get the most out of your staking!</div>
    
        <div className="row g-4">

          <div className="mt-1 col-xl-6">
            <div className="input-wrapper">
              <label htmlFor="cryptocurrency">Cryptocurrency:</label>
              <AsyncSelect 
                id="cryptocurrency" 
                className="mt-1"
                value={selectedCurrency}
                onChange={handleCurrencyChange}
                styles={customStyles}
                loadOptions={promiseCurrenciesOptions}
                placeholder="Search currency..."
              />
            </div>
            <small className="font-italic">Cryptocurrency symbol</small>
          </div>

          <div className="mt-1 col-xl-6">
            <div className="input-wrapper">
              <label htmlFor="investmentAmount">Investment amount ({currency}):</label>
              <input type="text" 
                     id="investmentAmount" 
                     value={investmentAmount} 
                     className="input-text mt-1" 
                     placeholder="Initial staking amount" 
                     onChange={handleFormChange}
              />
              <span className="input-icon">{currency}</span>
            </div>
            <small className="font-italic">Amount of {currency} tokens to be staked</small>
          </div>

          <div className="mt-1 col-xl-6">
            <div className="input-wrapper">
              <label htmlFor="tokenPrice">Token price:</label>
              <input  type="text" 
                      id="tokenPrice" 
                      value={tokenPrice} 
                      className="input-text mt-1" 
                      placeholder={`Current ${currency} price`} 
                      onChange={handleFormChange}
                      disabled={priceDisabled}
              />
              <span className="input-icon">$</span>
            </div>
            <small className="font-italic">How many dollars does each {currency} cost today?</small>
          </div>

          <div className="mt-1 col-xl-6">
            <div className="row">
              <div className="input-wrapper col-xl-8">
                <label htmlFor="reinvestmentPeriod">Reinvestment period:</label>
                <input  type="text" 
                        value={reinvestmentPeriod} 
                        id="reinvestmentPeriod" 
                        className="input-text mt-1" 
                        placeholder="How many days?" 
                        onChange={handleFormChange}
                />
                <span className="input-icon">Days</span>
              </div>
              <div className="col-xl-4 mt-2" style={{display: "flex"}}>
                <button className="btn btn-white" onClick={handleSuggestPeriod} style={{"flexGrow": "1", height: "100%"}}><span className="btn-text">Suggest the most optimal period</span></button>
              </div>
            </div>
            <small className="font-italic">How often will you reinvest the tokens generated?</small>
          </div>

          <div className="mt-1 col-xl-6">
            <div className="input-wrapper">
              <label htmlFor="APR">APR:</label>
              <input  type="text"
                      value={APR}
                      id="APR" 
                      className="input-text mt-1" 
                      placeholder="Estimated APR"
                      onChange={handleFormChange}
              />
              <span className="input-icon">%</span>
            </div>
            <small className="font-italic">Estimated APR</small>
          </div>

          <div className="mt-1 col-xl-6">
            <div className="input-wrapper">
              <label htmlFor="stakingPeriod">Total staking period:</label>
              <input  type="text" 
                      value={stakingPeriod} 
                      id="stakingPeriod" 
                      className="input-text mt-1" 
                      placeholder="Staking period" 
                      onChange={handleFormChange}
              />
              <span className="input-icon">Days</span>
            </div>
            <small className="font-italic">For how many days will you have your tokens staked?</small>
          </div>

          <div className="mt-1 col-xl-12">
            <div className="input-wrapper">
              <label htmlFor="investmentValue">Investment value:</label>
              <input type="text" value={investmentValue} id="investmentValue" className="input-text mt-1" disabled />
              <span className="input-icon">$</span>
            </div>
            <small className="font-italic">Total value of initial investment in dollars</small>
          </div>

          <hr />

          <div className="mt-1 col-xl-6">
            <div className="input-wrapper">
              <label htmlFor="finalCapital">Final capital:</label>
              <input type="text" value={finalCapital} id="finalCapital" className="input-text mt-1" disabled />
              <span className="input-icon">{currency}</span>
            </div>
            <small className="font-italic">Amount of tokens you will have at the end of the staking period</small>
          </div>
          
          <div className="mt-1 col-xl-6">
            <div className="input-wrapper">
              <label htmlFor="cryptoProfitability">Crypto profitability:</label>
              <input type="text" value={cryptoProfitability} id="cryptoProfitability" className="input-text mt-1" disabled />
              <span className="input-icon">%</span>
            </div>
            <small className="font-italic">Percentage of profit of your {currency}</small>
          </div>
          
          <div className="mt-1 col-xl-6">
            <div className="input-wrapper">
              <label htmlFor="estimatedTokenPrice">Estimated token price:</label>
              <input  type="text" 
                      value={estimatedTokenPrice} 
                      id="estimatedTokenPrice" 
                      className="input-text mt-1" 
                      placeholder={`Estimated ${currency} price`} 
                      onChange={handleFormChange}
              />
              <span className="input-icon">$</span>
            </div>
            <small className="font-italic">How many dollars do you estimate each {currency} will cost at the end of the staking period?</small>
          </div>

          <div className="mt-1 col-xl-6">
            <div className="input-wrapper">
              <label htmlFor="finalValueInvestment">Final value of my investment:</label>
              <input type="text" value={finalValueInvestment} id="finalValueInvestment" className="input-text mt-1" disabled />
              <span className="input-icon">$</span>
            </div>
            <small className="font-italic">The dollar equivalent of your final total token amount</small>
          </div>

          <div className="mt-1 col-xl-6">
            <div className="input-wrapper">
              <label htmlFor="profit">Profit:</label>
              <input type="text" value={profit} id="profit" className="input-text mt-1" disabled />
              <span className="input-icon">$</span>
            </div>
            <small className="font-italic">Profit in US dollars</small>
          </div>
        
          <div className="mt-1 col-xl-6">
            <div className="input-wrapper">
              <label htmlFor="profitability">Profitability:</label>
              <input type="text" value={profitability} id="profitability" className="input-text mt-1" disabled />
              <span className="input-icon">%</span>
            </div>
            <small className="font-italic">Return on investment taking into account dollar value</small>
          </div>

          <hr />
          
          <p>The above calculation is an approximation that does not take into account the cost of fees. You can then calculate the net profit by deducting the money spent on commissions.</p>
          
          <div className="mt-3"></div>

          <div className="mt-1 col-xl-12">
            <div className="input-wrapper">
              <label htmlFor="costTransaction">Cost per transaction:</label>
              <input  type="text" 
                      value={costTransaction} 
                      id="costTransaction" 
                      className="input-text mt-1" 
                      placeholder="Estimated cost" 
                      onChange={handleFormChange}
              />
              <span className="input-icon">$</span>
            </div>
            <small className="font-italic">Approximate cost in dollars to re-stake your tokens. You must enter the total cost of claiming tokens rewards and re-staking them</small>
          </div>

          <div className="mt-1 col-xl-6">
            <div className="input-wrapper">
              <label htmlFor="nTransactions">No. of transactions:</label>
              <input type="text" value={nTransactions} id="nTransactions" className="input-text mt-1" disabled />
            </div>
            <small className="font-italic">Approximate number of transactions you will carry out in the entire staking period</small>
          </div>

          <div className="mt-1 col-xl-6">
            <div className="input-wrapper">
              <label htmlFor="totalCostTransactions">Total cost of transactions:</label>
              <input type="text" value={totalCostTransactions} id="totalCostTransactions" className="input-text mt-1" disabled />
              <span className="input-icon">$</span>
            </div>
            <small className="font-italic">Total cost of transactions over the whole staking period</small>
          </div>
          
          <div className="mt-1 col-xl-6">
            <div className="input-wrapper">
              <label htmlFor="realProfit">Real Profit:</label>
              <input type="text" value={realProfit} id="realProfit" className="input-text mt-1" disabled />
              <span className="input-icon">$</span>
            </div>
            <small className="font-italic">Net return on your investment, net of fees and commissions</small>
          </div>
          
          <div className="mt-1 col-xl-6">
            <div className="input-wrapper">
              <label htmlFor="realProfitability">Real Profitability:</label>
              <input type="text" value={realProfitability} id="realProfitability" className="input-text mt-1" disabled />
              <span className="input-icon">%</span>
            </div>
            <small className="font-italic">Net profitability on your investment, net of fees and commissions</small>
          </div>

        </div>
      </div>
      </Section>
    </MainLayout>
  );
};
