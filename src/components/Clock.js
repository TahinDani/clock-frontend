import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import '../styles/Clock.css'

const Clock = ({fullDate, onChange}) => {

	const date = fullDate.date
	const time = fullDate.time

	return (
		<div className="Clock">
			<div className="Clock-display">
				<div>{time}</div>
				<div>{date}</div>
			</div>
			<div className="Clock-settings">
			<ButtonGroup color="secondary" aria-label="outlined secondary button group">
				<Button onClick={onChange} name="type" value="full">mind</Button>
				<Button onClick={onChange} name="type" value="date">dátum</Button>
				<Button onClick={onChange} name="type" value="time">idő</Button>
			</ButtonGroup>
			</div>
		</div>
	);
};

export default Clock;