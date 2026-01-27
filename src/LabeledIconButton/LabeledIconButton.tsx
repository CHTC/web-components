import {Box, IconButtonProps, Link, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";

interface LabeledIconButtonProps extends IconButtonProps {
	label: string;
	href: string;
}

/**
 * IconButton with a small label below it in a vertical layout.
 */
const LabeledIconButton = ({label, href, ...props}: LabeledIconButtonProps) => {

	return (
		<Link href={href} sx={{ textDecoration: 'none' }}>
			<Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
				<IconButton {...props} sx={{...props.sx, mb: -1}} aria-label={label}>
					{props.children}
				</IconButton>
				<Typography
          variant="caption"
          display="block"
          textAlign="center"
          sx={{...props.sx}}
        >
					{label}
				</Typography>
			</Box>
		</Link>
	)
}

export default LabeledIconButton;
