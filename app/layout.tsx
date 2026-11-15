import type { Metadata, Viewport } from 'next';
import site from '@/data/site.json';
import './globals.css';

const origin = 'https://potolok-remont-miass-zlatoust.beigesnapdragon4.chatgpt.site';
export const metadata: Metadata = {
 metadataBase: new URL(origin), title: site.title, description: site.description,
 robots:{index:false,follow:false},
 openGraph:{type:'website',locale:'ru_RU',title:site.title,description:site.description,images:[{url:site.heroImage,width:1536,height:1024,alt:'Иллюстрация залива натяжного потолка и возможного результата ремонта'}]},
 twitter:{card:'summary_large_image',title:site.title,description:site.description,images:[site.heroImage]},
 icons:{icon:'/icon.svg'}
};
export const viewport: Viewport = {width:'device-width',initialScale:1,themeColor:'#f6f4ee'};
export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang="ru"><body>{children}</body></html>;
}
