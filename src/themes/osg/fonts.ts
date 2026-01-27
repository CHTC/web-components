import {Poppins} from "next/font/google";

const poppins = Poppins({
  subsets: ['latin'], style: ['normal'], weight: ['300', '400', '600'], display: 'swap'
})

const fonts = [poppins]

export { poppins, fonts }