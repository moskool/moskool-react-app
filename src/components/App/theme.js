import { createMuiTheme } from "@material-ui/core/styles";

const bigShadow =
	"0 24px 24px -18px rgba(69,104,129,.33), 0 9px 45px 0 rgba(114,119,160,.12)";

const colors = {
	grey: {
		light: "#a6a6a6",
		dark: "#383c40",
		darkest: "#2b2b2b"
	},
	green: {
		light: "#41D3BD",
		dark: "",
		darkest: ""	
	},
	yellow: {
		light: "#F5D547",
		dark: "",
		darkest: ""
	},
};
const theme = createMuiTheme({
	bigShadow: bigShadow,
	card: {
		boxShadow: bigShadow,
		"&:hover": {
			transform: "translateY(-5px)",
			backgroundColor: "#FFF"
		},
		"&:hover .desc": {
			color: "white"
		},
		transition:
		"transform .35s cubic-bezier(.4,0,.2,1),box-shadow .35s cubic-bezier(.4,0,.2,1)",
		transform: "translateY(0)"
	},
	container: {
		width: "calc(100vw - 28.799999999999997rem)"
	},
	flexAlignCenter: {
		display: "flex",
		alignItems: "center",
	},
	grey: colors.grey,
	green: colors.green,
	yellow: colors.yellow,
});

export default theme;
