import { PreviewRibbon } from "@pantheon-systems/nextjs-kit";
import Link from "next/link";
import Footer from "./footer";
import {
  Container,
  Navbar,
  NavMenu,
} from "@pantheon-systems/pds-toolkit-react";

import { pdsConfig } from "../pds.config";

export default function Layout({ children, footerMenu, preview }) {
  const mainMenuItems = [
    { linkContent: <Link href="/">Home</Link> },
    { linkContent: <Link href="/departments">Departments</Link> },
    { linkContent: <Link href="/articles">News</Link> },
    { linkContent: <Link href="/about">About</Link> },
  ];

  return (
    <div className="min-h-screen max-h-screen flex flex-col">
      {preview && <PreviewRibbon />}

      <Navbar
        mobileMenuMaxWidth={pdsConfig.mobileMenuBreakpoint}
        containerWidth="wide"
        logoDisplay="sub-brand"
        logoSubBrand={{
          text: pdsConfig.siteName,
          link: <Link href="/">Home</Link>,
        }}
      >
        <NavMenu
          slot="items-right"
          ariaLabel="Main Navigation"
          menuItems={mainMenuItems}
          mobileMenuMaxWidth={pdsConfig.mobileMenuBreakpoint}
        />
      </Navbar>

      <main className="mb-auto">
        <Container width="wide">{children}</Container>
      </main>
      <Footer>
        <span className="mx-auto">
 
        </span>
      </Footer>
    </div>
  );
}
