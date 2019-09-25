import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker
} from "@material-ui/pickers";

function DatePicker(props) {
	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<Grid container justify="space-around">
				<KeyboardDatePicker
					disableToolbar
					variant="inline"
					format="yyyy/MM/dd"
					margin="normal"
					label={props.label}
					value={props.date}
					onChange={props.changed}
				/>
			</Grid>
		</MuiPickersUtilsProvider>
	);
}

export default DatePicker;
