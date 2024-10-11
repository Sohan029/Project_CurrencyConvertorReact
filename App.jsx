import { useEffect, useState } from 'react'
import {InputBox} from './components/index'
import useCurrencyInfo from './hooks/useCurrencyInfo';

function App() {
    const [amount,setAmount] = useState(0);
    const [from,setFrom] = useState('usd'); 
    const [to,setTo]= useState('inr');
    const [convertAmount,setConvertAmount]= useState(0);

    const currencyInfo = useCurrencyInfo(from);

    const swapCurrency = ()=>{
        setFrom(to);
        setTo(from);
        setAmount(convertAmount);
        setConvertAmount(amount);
    }
    
    const convert=()=>{
        setConvertAmount((amount * currencyInfo[to]).toFixed(2));
    }
    

    return (
        <div
            className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
            style={{
                backgroundImage: `url(https://cdn.britannica.com/87/191987-050-4114E8F9/currency-exchange-rate-background-LED-display-board.jpg)`,
            }}
        >
            <div className="w-full">
                <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            convert();
                        }}
                    >
                        <div className="w-full mb-1">
                            <InputBox
                                label="From"
                                amount={amount}
                                selectCurrency = {from}
                                currencyOption = {Object.keys(currencyInfo)}
                                onCurrencyChange={(currency)=>(setFrom(currency))}
                                onAmountChange={(val)=>(setAmount(val))}
                                
                            />
                        </div>
                        <div className="relative w-full h-0.5">
                            <button
                                type="button"
                                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                                onClick={swapCurrency}
                            >
                                swap
                            </button>
                        </div>
                        <div className="w-full mt-1 mb-4">
                            <InputBox
                                label="To"
                                amount={convertAmount}
                                currencyOption = {Object.keys(currencyInfo)}
                                selectCurrency = {to}
                                onCurrencyChange={(currency)=>(setTo(currency))}
                                amountDisabled
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                            Convert {from.toUpperCase()} to {to.toUpperCase()}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App
