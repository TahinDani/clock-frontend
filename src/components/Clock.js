import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import '../styles/Clock.css'

const Clock = ({responseDate, onChange}) => {

	const date = responseDate.date
	const time = responseDate.time

	return (
		<div className="Clock">
			<div className="Clock-display">
				<div>{time}</div>
				<div>{date}</div>
			</div>
			<div className="Clock-settings">
				<div className="option">
					<ButtonGroup color="secondary" aria-label="outlined secondary button group">
						<Button onClick={onChange} name="type" value="full">mind</Button>
						<Button onClick={onChange} name="type" value="date">dátum</Button>
						<Button onClick={onChange} name="type" value="time">idő</Button>
					</ButtonGroup>
				</div>

				<div className="option">
					<ButtonGroup color="secondary" aria-label="outlined secondary button group">
						<Button onClick={onChange} name="locale" value="hu-HU">magyar</Button>
						<Button onClick={onChange} name="locale" value="en-US">angol</Button>
					</ButtonGroup>
				</div>

				<div className="option">
					<ButtonGroup color="secondary" aria-label="outlined secondary button group">
						<Button onClick={onChange} name="is12" value="true">12 óra</Button>
						<Button onClick={onChange} name="is12" value="false">24 óra</Button>
					</ButtonGroup>
				</div>

				<div className="option">
					<ButtonGroup color="secondary" aria-label="outlined secondary button group">
						<Button onClick={onChange} name="showSeconds" value="true">mp</Button>
						<Button onClick={onChange} name="showSeconds" value="false">no mp</Button>
					</ButtonGroup>
				</div>
			</div>
		</div>
	);
};

export default Clock;