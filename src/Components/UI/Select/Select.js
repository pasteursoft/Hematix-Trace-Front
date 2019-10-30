import React from "./node_modules/react";
import { makeStyles } from "./node_modules/@material-ui/core/styles";
import MenuItem from "./node_modules/@material-ui/core/MenuItem";
import FormControl from "./node_modules/@material-ui/core/FormControl";
import Select from "./node_modules/@material-ui/core/Select";

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		flexWrap: "wrap"
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
		textAlign: "center"
	},
	focused: {}
}));

function SelectComponent(props) {
	const classes = useStyles();

	let options = null;

	options = props.options.map(element => {
		return (
			<MenuItem key={element.mac} value={element.mac}>
				{element.mac}
			</MenuItem>
		);
	});

	return (
		<form className={classes.root}>
			<FormControl
				variant="outlined"
				className={classes.formControl}
				fullWidth={true}
			>
				<Select value={props.selected} onChange={props.changed}>
					{options}
				</Select>
			</FormControl>
		</form>
	);
}

export default SelectComponent;
