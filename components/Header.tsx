// "use client"

// import * as React from "react"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { ThemeToggle } from "@/components/theme/theme-toggle"
// import { Github, Facebook, Instagram, Twitter, Linkedin } from "@/components/icons"


// export function Header() {
//   return (
//     <header className="px-2 py-3 sm:px-4 w-full z-20 border-b border-gray-200">
//       <div className="container flex gap-4 flex-wrap items-center justify-around md:justify-between mx-auto">
//         <Link href="/" className="flex items-center">
//           <Button> <span className="self-center text-2xl font-semibold whitespace-nowrap">TFT NEWS</span> </Button>
//         </Link>
//         <div>
//           <ul className="flex flex-row flex-wrap gap-4">
//             <li>
//               <Link href="/about">
//                 <Button>Burada 2 3 link olsun. Linklerin en saginda menu. Acilan menude de tum linkler gozukecek. Link olayini da dizide tut ve map ile tek tek yazdir  </Button>
//               </Link>
//             </li>
//             <li>
//               <Link href="/posts/son-dakika">
//                 <Button>Son Dakika</Button>
//               </Link>
//             </li>
//             <li>
//               <Link href="/posts/egitim">
//                 <Button>Egitim</Button>
//               </Link>
//             </li>
//             <li>
//               <Link href="/posts/ekonomi">
//                 <Button>Ekonomi</Button>
//               </Link>
//             </li>
//             <li>
//               <Link href="/posts/dunya">
//                 <Button>Dunya</Button>
//               </Link>
//             </li>
//             <li>
//               <Link href="/posts/spor">
//                 <Button>Spor</Button>
//               </Link>
//             </li>
//             <li>
//               <Link href="/posts/teknoloji">
//                 <Button>Teknoloji</Button>
//               </Link>
//             </li>
//             <li>
//               <Link href="/posts/saglik">
//                 <Button>Saglik</Button>
//               </Link>
//             </li>
//             <li>
//               <Link href="/posts/otomobil">
//                 <Button>Otomobil</Button>
//               </Link>
//             </li>
//             <li>
//               <Link href="/posts/anketler">
//                 <Button>Anketler</Button>
//               </Link>
//             </li>
//           </ul>
//         </div>
//         <div className="flex flex-row flex-wrap">
//           <Link className="m-2" href={"/search"}>
//             <Button> <Search /> </Button>
//           </Link>
//           <Link className="m-2" href={"#"}>
//             <Button> <Facebook /> </Button>
//           </Link>
//           <Link className="m-2" href={"#"}>
//             <Button> <Instagram /> </Button>
//           </Link>
//           <Link className="m-2" href={"https://x.com/FrontendWeb3"}>
//             <Button> <Twitter /> </Button>
//           </Link>
//           <Link className="m-2" href={"https://www.linkedin.com/company/frontendweb"}>
//             <Button> <Linkedin /> </Button>
//           </Link>
//           <Link className="m-2" target="_blank" href={"https://github.com/frontendweb3/open-blog"}>
//             <Button> <Github /> </Button>
//           </Link>
//           <Button className="m-2"> <Lock /> Login </Button>
//           {/* <ThemeToggle /> */}
//         </div>
//       </div>
//     </header>
//   )
// }
"use client"
import { useState } from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Lock, Search } from "lucide-react"
import { Facebook, Instagram, Twitter, Linkedin, Github } from './icons';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: '/posts/sondakika', label: 'Son Dakika' },
    { href: '/posts/egitim', label: 'Eğitim' },
    { href: '/posts/ekonomi', label: 'Ekonomi' },
    { href: '/posts/dunya', label: 'Dünya' },
    { href: '/posts/spor', label: 'Spor' },
    { href: '/posts/teknoloji', label: 'Teknoloji' },
    { href: '/posts/saglik', label: 'Sağlık' },
    { href: '/posts/otomobil', label: 'Otomobil' },
    { href: '#', label: 'Anketler' },
  ];

  const socialLinks = [
    { href: '#', icon: <Search /> },
    { href: '#', icon: <Facebook /> },
    { href: '#', icon: <Instagram /> },
    { href: '#', icon: <Twitter /> },
    { href: '#', icon: <Linkedin /> },
    { href: '#', icon: <Github /> },
  ];

  return (
    <header className="px-2 py-3 sm:px-4 w-full z-20 border-b border-gray-200">
      <div className='className="container flex gap-4 flex-wrap items-center justify-around md:justify-between mx-auto'>

        <Link href="/" className="flex items-center">
          <Button> <span className="self-center text-2xl font-semibold whitespace-nowrap">TFT NEWS</span> </Button>
        </Link>

        <div >
          <ul className="flex flex-row flex-wrap gap-4">
            {links.slice(0, 4).map((link, index) => (
              <li key={index}>
                <Link href={link.href}>
                  <Button>{link.label}</Button>
                </Link>
              </li>
            ))}
            <li>
              <Button onClick={() => setMenuOpen(!menuOpen)}>Menu</Button>
              {menuOpen && (
                <ul className="absolute bg-white shadow-md z-50">
                  {links.slice(4).map((link, index) => (
                    <li key={index}>
                      <Link href={link.href}>
                        <Button>{link.label}</Button>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>


          </ul>
        </div>

        <div >
          <ul className="flex flex-row flex-wrap">
            {socialLinks.map((social, index) => (
              <li key={index} className="m-2">
                <Link href={social.href}>
                  <Button>{social.icon}</Button>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};
