'use client'

import {useState} from "react";
import {Box, Grid} from "@mui/material"

import {HeaderIconLink, HeaderItem} from "./HeaderItem";

import type {HeaderLinkItem, HeaderMenuProps} from "./index";

export const DesktopMenu = ({menuItems} : {menuItems: (Omit<HeaderMenuProps, "setAnchor" | "anchorEl"> | HeaderLinkItem)[]}) => {

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	return (
			<>
				<Box display={"flex"} mb={.5}>
					{menuItems.filter(x => "type" in x ? x?.type != "icon" : true).map((item) => (
							<HeaderItem
									key={item.value}
									{...item}
									anchorEl={anchorEl}
									setAnchor={(element) => {
										setAnchorEl((anchorEl) => {
											if(element == null) {
												return element
											}
											if(anchorEl?.id == element.id) {
												return null
											}
											return element
										})
									}}
							/>
					))}
				</Box>
				<Box marginLeft={"auto"}>
					<Grid container spacing={1}>
						{menuItems.filter(x => "type" in x ? x?.type == "icon" : false).map((item) => (
								<Grid key={item.value}>
									<HeaderIconLink
											{...item as HeaderLinkItem}
									/>
								</Grid>
						))}
					</Grid>
				</Box>
			</>
	)
}
