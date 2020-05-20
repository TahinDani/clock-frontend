import React, { useState, useEffect, useCallback } from 'react';
import Clock from './components/Clock'
import useInterval from './hooks/useInterval'
import './App.css';

function App() {
	const [date, setDate] = useState({})
	const [delay, setDelay] = useState(1000)
	const [options, setOptions] = useState({
		locale: "hu-HU", 
		type: "full", 
		is12: "false", 
		showSeconds: "true"
	})

	const queryString = `?type=${options.type}&locale=${options.locale}&is12=${options.is12}&showSeconds=${options.showSeconds}`
	const updateDate =  useCallback(async () => {
		const response = await fetch(`http://localhost:3001/currentTime${queryString}`)
		const newDate = await response.json()
		setDate(newDate)
	}
	, [queryString])

	const onOptionChange = (e) => {
		if (options[e.currentTarget.name] !== e.currentTarget.value) {
			setOptions({...options, [e.currentTarget.name]:e.currentTarget.value})
		}
	}

	useEffect(()=>{
		if (options.type === "date") {
			setDelay(300000) // 5 minutes
		} else if (options.showSeconds === "false") {
			setDelay(3000)
		} else {
			setDelay(1000)
		}
	}, [options])

	useEffect(()=> {
		console.log("useEffect")
		updateDate()
	}, [options, updateDate])

	useInterval(() => {
		updateDate()
	}, delay);

	return (
		<div className="App">
			<Clock responseDate={date} onChange={onOptionChange}/>
		</div>
	);
}

export default App;
