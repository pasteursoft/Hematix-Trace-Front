import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
	MuiPickersUtilsProvider,
	KeyboardTimePicker
} from "@material-ui/pickers";
import WatchLaterOutlined from "@material-ui/icons/WatchLaterOutlined";

function HourPicker(props) {
	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<Grid container justify="space-around">
				<KeyboardTimePicker
					margin="normal"
					variant="inline"
					label={props.label}
					value={props.hour}
					onChange={props.changed}
					keyboardIcon={<WatchLaterOutlined />}
				/>
			</Grid>
		</MuiPickersUtilsProvider>
	);
}

export default HourPicker;
