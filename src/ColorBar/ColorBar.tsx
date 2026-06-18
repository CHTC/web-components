import React, {useEffect, useMemo, useRef, useState, useCallback} from 'react';
import {grey as gry, red as r, green as grn} from '@mui/material/colors';
import {Tooltip} from "@mui/material";

interface BarProps extends React.SVGProps<SVGRectElement> {
	title?: string;
	width: number;
	x: number;
	fill: string;
}

interface ColorBarProps extends React.SVGProps<SVGSVGElement> {
	data: (boolean | undefined)[] | BarProps[];
	grey?: string;
	red?: string;
	green?: string;
}

/**
 * DowntimeBar consumes a boolean array of uptimes
 * @param data True if Up, False if Down, Undefined if Unknown
 * @param grey
 * @param red
 * @param green
 * @param svgProps
 * @constructor
 */
const ColorBar = ({ data, red=r[500], green=grn[500], grey=gry[300], ...svgProps }: ColorBarProps) => {

	const containerRef = useRef<SVGSVGElement>(null);
	const [containerWidth, setContainerWidth] = useState(0);
	const [containerHeight, setContainerHeight] = useState(0);

	const updateContainerSize = useCallback(() => {
		if (containerRef.current) {
			setContainerWidth(containerRef.current.clientWidth);
			setContainerHeight(containerRef.current.clientHeight);
		}
	}, [])

	useEffect(() => {
		updateContainerSize();
		window.addEventListener('resize', updateContainerSize);
		return () => window.removeEventListener('resize', updateContainerSize);
	},[])

	let innerComponent = null;
	if (data[0] instanceof Object) {
		innerComponent = (
			<AdvancedColorBar
				data={data as BarProps[]}
				containerHeight={containerHeight}
				containerWidth={containerWidth}
			/>
		)
	} else {
		data = data as (boolean | undefined)[];
		innerComponent = (
				<SimpleColorBar containerWidth={containerWidth} containerHeight={containerHeight} data={data} />
		)
	}

	return (
			<svg ref={containerRef} {...svgProps}>
				{innerComponent}
			</svg>
	);
};

interface AdvancedColorBarProps extends ColorBarProps {
	containerWidth: number;
	containerHeight: number;
	data: BarProps[];
}

/**
 * Complex color bar that needs to have the input scaled to the container
 *
 * Assumption is that the inputted data starts at 0
 */
const AdvancedColorBar = ({ data, containerHeight, containerWidth }: AdvancedColorBarProps) => {

	const dataWidth = useMemo(() => {
		return Math.max(...data.map(d => d.x + d.width))
	}, [data])
	const widthRatio = containerWidth / dataWidth;

	return (
			<>
				{data.map((v, i) => {

					const {title, width, x, height, ...props} = v;

					return (
							<Tooltip title={title} key={i}>
								<rect
										key={i}
										x={Math.floor(x * widthRatio)}
										width={Math.ceil(width * widthRatio)}
										y={0}
										height={containerHeight}
										{...props}
								/>
							</Tooltip>
					);
				})}
			</>
	);
};

interface SimpleColorBarProps extends ColorBarProps {
	containerWidth: number;
	containerHeight: number;
	data: (boolean | undefined)[];
}

const SimpleColorBar = ({ containerWidth, containerHeight, data, red=r[500], green=grn[500], grey=gry[300]}: SimpleColorBarProps) => {
	return (
			<>
				{data.map((v, i) => {
					return <rect
							key={i}
							x={Math.floor(i * containerWidth / data.length)}
							width={Math.ceil(containerWidth / data.length)}
							y={0}
							height={containerHeight}
							fill={v == undefined ? grey : v ? green : red}
					/>
				})}
			</>
	);
}

export default ColorBar;
