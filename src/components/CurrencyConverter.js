import ExchangeRate from "./ExchangeRate";
import {useState} from "react";
import Button from '@mui/material/Button';
import axios from "axios";

const CurrencyConverter = () => {
	const [chosenPrimaryCurrency, setChosenPrimaryCurrency] = useState('BTC')
	const [chosenSecondaryCurrency, setChosenSecondaryCurrency] = useState('BTC')
	const [amount, setAmount] = useState(1)
	const [result, setResult] = useState(0)
	const [exchangeData, setExchangeData] = useState({
		primaryCurrency: 'BTC',
		secondaryCurrency: 'BTC',
		exchangeRate: 0
	})
	const currencies = ["BTC", "ETH", "USD", "XRP", "LTC", "ADA"]

	const convert = () => {
		const options = {
			method: 'GET',
			url: 'https://alpha-vantage.p.rapidapi.com/query',
			params: {from_currency: chosenPrimaryCurrency, function: 'CURRENCY_EXCHANGE_RATE', to_currency: chosenSecondaryCurrency},
			headers: {
				'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
				'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
			}
		};

		axios.request(options).then((response) => {
			console.log(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
			setResult(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'] * amount)
			setExchangeData({
				primaryCurrency: chosenPrimaryCurrency,
				secondaryCurrency: chosenSecondaryCurrency,
				exchangeRate: response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']
			})
		}).catch((error) => {
			console.error(error);
		});
	}

	return (
		<div className="currency-converter">
			<h2>CurrencyConverter</h2>
			<div className="input-box">
				<table>
					<tbody>
					<tr>
						<td>Primary Currency:</td>
						<td>
							<input
								type="number"
								name="currency-amount-1"
								value={amount}
								onChange={(e) => setAmount(e.target.value)}
							/>
						</td>
						<td>
							<select
								name="currency-option-1"
								className="currency-options"
								value={chosenPrimaryCurrency}
								onChange={(e) => setChosenPrimaryCurrency(e.target.value)}
							>
								{currencies.map((currency, _index) => (<option key={_index}>{currency}</option>))}
							</select>
						</td>
					</tr>
					<tr>
						<td>Secondary Currency:</td>
						<td>
							<input
								type="number"
								name="currency-amount-2"
								value={result}
								disabled={true}
							/>
						</td>
						<td>
							<select
								name="currency-option-2"
								className="currency-options"
								value={chosenSecondaryCurrency}
								onChange={(e) => setChosenSecondaryCurrency(e.target.value)}
							>
								{currencies.map((currency, _index) => (<option key={_index}>{currency}</option>))}
							</select>
						</td>
					</tr>

					</tbody>
				</table>
				<Button id="convert-button" onClick={convert}>Convert</Button>
			</div>

			<ExchangeRate
				exchangeData={exchangeData}
			/>
		</div>
	);
}

export default CurrencyConverter;