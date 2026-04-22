import React, {useState, useRef, useEffect, ReactNode} from "react";
import {Box, Button, IconButton, IconButtonProps, ButtonProps, Collapse, useTheme} from "@mui/material";
import { Theme } from "@mui/material/styles"

export type ConfirmButtonProps  = IconButtonProps & {
	color: keyof Theme['palette'];
	confirmNode?: ReactNode;
  growDirection?: 'right' | 'left';
	onConfirm?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const ConfirmButton = ({onConfirm, confirmNode = 'Confirm', growDirection : defaultGrowDirection = 'right', ...props}: ConfirmButtonProps) => {

	const theme = useTheme();
	const [askingForConfirmation, setAskingForConfirmation] = useState(false);
	const [growDirection, setGrowDirection] = useState<'right' | 'left'>(defaultGrowDirection);
	const iconButtonRef = useRef<HTMLButtonElement>(null);
	const confirmButtonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
    if (askingForConfirmation && iconButtonRef.current && confirmButtonRef.current) {
      const iconRect = iconButtonRef.current.getBoundingClientRect();
      const confirmRect = confirmButtonRef.current.getBoundingClientRect();
      const spaceRight = window.innerWidth - iconRect.right;
      const spaceLeft = iconRect.left;
      const confirmWidth = confirmRect.width;
      if (spaceRight < confirmWidth) {
        setGrowDirection('left');
      } else if (spaceLeft < confirmWidth) {
        setGrowDirection('right');
      } else {
        setGrowDirection(defaultGrowDirection);
      }
    }
	}, [askingForConfirmation]);

	return (
		<Box
			sx={{
				height: '48px',
				width: '48px',
		}}
		>
			<Box
				sx={{
					display: 'flex',
					position: 'relative',
					zIndex: 10,
					justifyContent: growDirection == "right" ? 'flex-start' : 'flex-end',
				}}
			>
				<Box
					sx={{
						display: 'flex',
						borderRadius: 1,
						p: .5,
						alignContent: 'center',
						bgcolor: askingForConfirmation ? theme.lighten(theme.palette[props.color || 'primary'].light, 0.9) : undefined
					}}
				>
					<Box sx={{order: growDirection === 'right' ? 1 : 2, border: "1px black"}}>
						<IconButton {...props} ref={iconButtonRef} onClick={(e) => {
							setAskingForConfirmation(!askingForConfirmation);
							if (props.onClick) props.onClick(e);
						}} />
					</Box>
					<Box
						sx={{
							alignContent: 'center',
							...(growDirection === 'right'
									? { order: 2 }
									: { order: 1 }
							),
						}}
					>
						<Collapse in={askingForConfirmation} orientation={'horizontal'}>
							<Button
								variant={'contained'}
								color={props?.color}
								size={props?.size}
								onClick={onConfirm}
								ref={confirmButtonRef}
							>
								{confirmNode}
							</Button>
						</Collapse>
					</Box>
				</Box>
			</Box>

		</Box>
	)
}

export default ConfirmButton;
