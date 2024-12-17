import Link from "next/link";
import { Github, Facebook, Instagram, Twitter, Linkedin } from "@/components/icons"
import * as React from "react"
import { Button } from "@/components/ui/button"


export function Footer() {

  return (

    <footer className="px-2 sm:px-4 py-2.5 w-full border-t border-border">
      <div className="container flex gap-4 flex-wrap items-center justify-around md:justify-between mx-auto">
        <div className="flex flex-row flex-wrap">
          <Link href={"#"}>
            <Button > <Github /> </Button>
          </Link>
          <Link href={"#"}>
            <Button > <Facebook /> </Button>
          </Link>
          <Link href={"#"}>
            <Button > <Instagram /> </Button>
          </Link>
          <Link href={"#"}>
            <Button > <Twitter /> </Button>
          </Link>
          <Link href={"#"}>
            <Button > <Linkedin /> </Button>
          </Link>
        </div>
        <Link href="https://github.com/frontendweb3" className="text-sm font-semibold whitespace-nowrap"> Copyright By Frontend Web </Link>
      </div>
    </footer>

  )
}
