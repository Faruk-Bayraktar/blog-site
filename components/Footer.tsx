import Link from "next/link";
import { Github, Facebook, Instagram, Twitter, Linkedin } from "@/components/icons";
import * as React from "react";
import { Button } from "./ui/button";

export function Footer() {
  return (
    <footer className="mt-10 bg-gray-900 text-white py-8 border-t border-gray-700">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0">
          <h2 className="text-lg font-bold">TFT News</h2>
          <p className="text-sm text-gray-400">Stay informed with the latest updates</p>
        </div>

        <div className="flex space-x-4 mb-4 md:mb-0">
          <Link href="#" aria-label="Github">
            <Button className="p-2 rounded-full hover:bg-gray-800">
              <Github />
            </Button>
          </Link>
          <Link href="#" aria-label="Facebook">
            <Button className="p-2 rounded-full hover:bg-gray-800">
              <Facebook />
            </Button>
          </Link>
          <Link href="#" aria-label="Instagram">
            <Button className="p-2 rounded-full hover:bg-gray-800">
              <Instagram />
            </Button>
          </Link>
          <Link href="#" aria-label="Twitter">
            <Button className="p-2 rounded-full hover:bg-gray-800">
              <Twitter />
            </Button>
          </Link>
          <Link href="#" aria-label="Linkedin">
            <Button className="p-2 rounded-full hover:bg-gray-800">
              <Linkedin />
            </Button>
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-sm text-gray-400">
          <p>Copyright &copy; {new Date().getFullYear()} TFT News. All rights reserved.</p>
          <p>
            Designed by <Link href="#" className="text-blue-500 hover:underline">TFT News</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}