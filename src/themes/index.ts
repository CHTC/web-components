export {default as pelicanTheme} from './pelican';
export {default as osgTheme} from './osg';
export {default as chtcTheme} from './chtc';

// Each theme's `next/font` faces, so sites can put the font classes on <html>:
//   <html className={chtcFonts.map((f) => f.className).join(' ')}>
export {fonts as pelicanFonts, poppins as pelicanFont} from './pelican/fonts';
export {fonts as osgFonts} from './osg/fonts';
export {fonts as chtcFonts, rhd as chtcDisplayFont, rht as chtcTextFont} from './chtc/fonts';
