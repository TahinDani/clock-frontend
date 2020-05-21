import React, { useState, useEffect, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import useInterval from '../hooks/useInterval'
import '../styles/Clock.css'

const Clock = () => {
	const [date, setDate] = useState({})
	const [delay, setDelay] = useState(1000)
	const [options, setOptions] = useState({
		locale: "hu-HU", 
		type: "full", 
		is12: "false", 
		showSeconds: "true"
	})
	const hourMinute = date.time?.slice(0, -3)
	const second = date.time?.slice(-3)
	console.log(hourMinute, second);

	const updateDate =  useCallback(async () => {
		const queryString = `?type=${options.type}&locale=${options.locale}&is12=${options.is12}&showSeconds=${options.showSeconds}`
		const response = await fetch(`http://localhost:3001/currentTime${queryString}`)
		const newDate = await response.json()
		setDate(newDate)
	}
	, [options])

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
			//setDelay(1000)
			setDelay(60000)
		}
	}, [options])

	useEffect(()=> {
		updateDate()
	}, [options, updateDate])

	useInterval(() => {
		updateDate()
	}, delay);
	
	return (
		<div className="Clock">
			<div className="Clock-display">
				<div className="Clock-time">{hourMinute}<span>{second}</span></div>
				<div className="Clock-date">{date.date}</div>
			</div>
			<div className="Clock-settings">
				<div className="Clock-option">
					<ButtonGroup color="secondary" aria-label="outlined secondary button group">
						<Button onClick={onOptionChange} name="type" value="full">mind</Button>
						<Button onClick={onOptionChange} name="type" value="date">dátum</Button>
						<Button onClick={onOptionChange} name="type" value="time">idő</Button>
					</ButtonGroup>
				</div>

				<div className="Clock-option">
					<ButtonGroup color="secondary" aria-label="outlined secondary button group">
						<Button onClick={onOptionChange} name="locale" value="hu-HU">magyar</Button>
						<Button onClick={onOptionChange} name="locale" value="en-US">angol</Button>
					</ButtonGroup>
				</div>

				<div className="Clock-option">
					<ButtonGroup color="secondary" aria-label="outlined secondary button group">
						<Button onClick={onOptionChange} name="is12" value="true">12 óra</Button>
						<Button onClick={onOptionChange} name="is12" value="false">24 óra</Button>
					</ButtonGroup>
				</div>

				<div className="Clock-option">
					<ButtonGroup color="secondary" aria-label="outlined secondary button group">
						<Button onClick={onOptionChange} name="showSeconds" value="true">mp</Button>
						<Button onClick={onOptionChange} name="showSeconds" value="false">no mp</Button>
					</ButtonGroup>
				</div>
			</div>
		</div>
	);
};

export default Clock;