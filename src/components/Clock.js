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

	let hourMinute
	let second
	let period
	const formatDate  = () => {
		if (options.is12 === "true") {
			if (options.locale === "hu-HU") {
				period = date.time?.slice(0, 3)
				hourMinute = date.time?.slice(4,9)
				if (options.showSeconds === "true") {
					second = date.time?.slice(-3)
				}
			} else if (options.locale === "en-US") {
				period = date.time?.slice(-3)
				hourMinute = date.time?.slice(0,5)
				if (options.showSeconds === "true") {
					second = date.time?.slice(5,9)
				}
			}
		} else if (options.is12 === "false") {
			hourMinute = date.time?.slice(0,5)
			if (options.showSeconds === "true") {
				second = date.time?.slice(5,9)
			}
		}
		
	}
	formatDate()

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
			setDelay(1000)
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
				<div className="Clock-time">{hourMinute}<span>{second} {period}</span></div>
				<div className={`Clock-date ${options.type === "date" && "date-only"}`}>{date.date}</div>
				<div className="ellipse"></div>
			</div>
			
			<div className="Clock-settings">
				<h3>Beállítások</h3>
				<div className="Clock-option">
					<ButtonGroup color="default" size="large" aria-label="outlined default button group">
						<Button onClick={onOptionChange} name="type" value="full">mind</Button>
						<Button onClick={onOptionChange} name="type" value="date">dátum</Button>
						<Button onClick={onOptionChange} name="type" value="time">idő</Button>
					</ButtonGroup>
				</div>

				<div className="Clock-option">
					<ButtonGroup color="default" size="large" aria-label="outlined default button group">
						<Button onClick={onOptionChange} name="locale" value="hu-HU">magyar</Button>
						<Button onClick={onOptionChange} name="locale" value="en-US">angol</Button>
					</ButtonGroup>
				</div>

				<div className="Clock-option">
					<ButtonGroup color="default" size="large" aria-label="outlined default button group">
						<Button onClick={onOptionChange} name="is12" value="true">12 óra</Button>
						<Button onClick={onOptionChange} name="is12" value="false">24 óra</Button>
					</ButtonGroup>
				</div>

				<div className="Clock-option">
					<ButtonGroup color="default" size="large" aria-label="outlined default button group">
						<Button onClick={onOptionChange} name="showSeconds" value="true">ó:p:mp</Button>
						<Button onClick={onOptionChange} name="showSeconds" value="false">ó:p</Button>
					</ButtonGroup>
				</div>
			</div>
		</div>
	);
};

export default Clock;