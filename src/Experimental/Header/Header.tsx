'use client'

import {useState, useEffect, ReactNode} from "react";
import {Box, Typography} from "@mui/material"
import Link from "next/link";

import {HeaderLinkItem, HeaderMenuProps, MenuProps} from "./index";
import {BurgerMenu, DesktopMenu, ImageIcon} from "./index";

export interface HeaderProps {
	icon: ReactNode,
	title: string,
	menuItems: (Omit<HeaderMenuProps, "setAnchor" | "anchorEl"> | HeaderLinkItem)[]
}

const Header = ({icon, title, menuItems}: HeaderProps) => {

	// Scroll watcher for opacity
	let [scrolledTop, setScrolledTop] = useState(true);
	useEffect(() => {
		const onScroll = () => setScrolledTop(window.scrollY < 50);
		onScroll();
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, [])

	return (
			<Box style={{
				display: "flex",
				justifyContent: "space-between",
				padding: "1rem",
				position: "fixed",
				zIndex: "1",
				width: "100%",
				overflow: "hidden"
			}}>
				<Box display={"flex"} flexGrow={1}>
					<Link href={"/"}>
						<Box style={{display: "flex"}}>
							{icon}
							<Typography component={"h5"} pl={1} my={"auto"}>{title}</Typography>
						</Box>
					</Link>
					<Box sx={{display: {xs: "flex", "md": "none"}}} flexGrow={1}>
						<BurgerMenu icon={icon} menuItems={menuItems}/>
					</Box>
					<Box sx={{display: {xs: "none", "md": "flex"}}} flexGrow={1}>
						<DesktopMenu menuItems={menuItems}/>
					</Box>
				</Box>
			</Box>
	)
}


export default Header;
