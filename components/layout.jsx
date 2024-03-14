import { Footer, PreviewRibbon } from '@pantheon-systems/nextjs-kit';
import Link from 'next/link';
import { Searchbar } from './searchbar';
import { Container, Navbar, NavMenu } from '@pantheon-systems/pds-toolkit-react';

import { pdsConfig } from '../pds.config';

export default function Layout({ children, footerMenu, preview }) {
  const mainMenuItems = [
    { linkContent: <Link href='/articles'>Articles</Link> },
    { linkContent: <Link href='/examples'>Examples</Link> },
  ];

  const footerMenuItems = footerMenu?.map(({ path, label }) => ({
    linkText: label,
    href: path,
    parent: null,
  }));

  return (
    <div className='min-h-screen max-h-screen min-w-screen max-w-screen flex flex-col overflow-x-hidden'>
      {preview && <PreviewRibbon />}

      <Navbar
        mobileMenuMaxWidth={pdsConfig.mobileMenuBreakpoint}
        containerWidth='standard'
        logoDisplay='sub-brand'
        logoSubBrand={{
          text: pdsConfig.siteName,
          link: <Link href='/'>Home</Link>,
        }}
      >
        <NavMenu
          slot='items-right'
          ariaLabel='Main Navigation'
          menuItems={mainMenuItems}
          mobileMenuMaxWidth={pdsConfig.mobileMenuBreakpoint}
        ></NavMenu>
        <Searchbar slot='items-right' />
      </Navbar>

      <main className='mb-auto'>{children}</main>
      <Footer footerMenuItems={footerMenuItems}>
        <span className='mx-auto'>
          © {new Date().getFullYear()} Built with{' '}
          <a className='text-white hover:text-blue-100 underline' href='https://nextjs.org/'>
            Next.js
          </a>{' '}
          and{' '}
          <a className='text-blue-500 underline hover:text-blue-100' href='https://pantheon.io/'>
            Pantheon Content Cloud
          </a>
        </span>
      </Footer>
    </div>
  );
}
