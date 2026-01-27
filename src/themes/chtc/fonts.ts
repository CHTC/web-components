import {Red_Hat_Display, Red_Hat_Text} from "next/font/google";

const rhd = Red_Hat_Display({
  subsets: ['latin'], style: ['normal'], weight: ['300', '400', '700'], display: 'swap'
})

const rht = Red_Hat_Text({
  subsets: ['latin'], style: ['normal', 'italic'], weight: ['300', '400', '600'], display: 'swap'
})

const fonts = [rhd, rht];

export { rhd, rht, fonts };
