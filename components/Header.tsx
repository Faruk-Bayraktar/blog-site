"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Lock, Search } from "lucide-react"
import { ThemeToggle } from "@/components/theme/theme-toggle"
import { Github, Facebook, Instagram, Twitter, Linkedin } from "@/components/icons"


export function Header() {
  return (
    <header className="px-2 py-3 sm:px-4 w-full z-20 border-b border-gray-200">
      <div className="container flex gap-4 flex-wrap items-center justify-around md:justify-between mx-auto">
        <Link href="/" className="flex items-center">
          <Button> <span className="self-center text-2xl font-semibold whitespace-nowrap">TFT NEWS</span> </Button>
        </Link>
        <div>
          <ul className="flex flex-row flex-wrap gap-4">
            <li>
              <Link href="/about">
                <Button>Burada 2 3 link olsun. Linklerin en saginda menu. Acilan menude de tum linkler gozukecek. Link olayini da dizide tut ve map ile tek tek yazdir  </Button>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <Button>Son Dakika</Button>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <Button>Egitim</Button>
              </Link>
            </li>
            <li>
              <Link href="/posts">
                <Button>Ekonomi</Button>
              </Link>
            </li>
            <li>
              <Link href="/posts">
                <Button>Dunya</Button>
              </Link>
            </li>
            <li>
              <Link href="/posts">
                <Button>Spor</Button>
              </Link>
            </li>
            <li>
              <Link href="/posts">
                <Button>Teknoloji</Button>
              </Link>
            </li>
            <li>
              <Link href="/posts">
                <Button>Saglik</Button>
              </Link>
            </li>
            <li>
              <Link href="/posts">
                <Button>Otomobil</Button>
              </Link>
            </li>
            <li>
              <Link href="/posts">
                <Button>Anketler</Button>
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-row flex-wrap">
          <Link className="m-2" href={"/search"}>
            <Button> <Search /> </Button>
          </Link>
          <Link className="m-2" href={"#"}>
            <Button> <Facebook /> </Button>
          </Link>
          <Link className="m-2" href={"#"}>
            <Button> <Instagram /> </Button>
          </Link>
          <Link className="m-2" href={"https://x.com/FrontendWeb3"}>
            <Button> <Twitter /> </Button>
          </Link>
          <Link className="m-2" href={"https://www.linkedin.com/company/frontendweb"}>
            <Button> <Linkedin /> </Button>
          </Link>
          <Link className="m-2" target="_blank" href={"https://github.com/frontendweb3/open-blog"}>
            <Button> <Github /> </Button>
          </Link>
          <Button className="m-2"> <Lock /> Login </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
