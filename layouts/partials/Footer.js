import config from "@config/config.json";
import menu from "@config/menu.json";
import ImageFallback from "@layouts/components/ImageFallback";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import React from "react";

const Footer = () => {
  const { copyright, footer_content } = config.params;
  return (
    <footer className="section relative mt-12 pt-[70px] pb-[50px]">
      <ImageFallback
        className="-z-[1] object-cover object-left  md:object-top"
        src="/images/footer-bg-shape.svg"
        alt="footer background"
        fill={true}
      />
      <div className="container text-center">
        <div className="mb-6 inline-flex">
        </div>
        {markdownify(footer_content, "p", "max-w-[638px] mx-auto")}

        {/* footer menu */}
        <ul className="mb-12 mt-6 flex-wrap space-x-2 lg:space-x-4">
          {menu.footer.map((menu) => (
            <li className="inline-block" key={menu.name}>
              <Link
                href={menu.url}
                className="p-2 font-bold text-dark hover:text-primary dark:text-darkmode-light lg:p-4"
              >
                {menu.name}
              </Link>
            </li>
          ))}
        </ul>
        {/* social icons */}
        <div className="inline-flex">
          <ul>
            <li>
              <a href="#">
                <ImageFallback
                  src="/images/socials/facebook.svg"
                  alt="facebook"
                  width={24}
                  height={24}
                />
              </a>

            </li>
            <li>
              <a href="#">
                <ImageFallback
                  src="/images/socials/twitter.svg"
                  alt="twitter"
                  width={24}
                  height={24}
                />
              </a>
            </li>
          </ul>
        </div>
        {/* copyright */}
        {markdownify(copyright, "p")}
      </div>
    </footer>
  );
};

export default Footer;
