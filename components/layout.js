import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

const name = 'Clerk of Serendale'
export const siteTitle = 'DeFi Kingdoms Clerk'

export default function Layout({ children, home }) {
  return (
    <div className="p-5">
      <Head>
        <link rel="icon" href="/favicon.png" />
        <meta
          name="description"
          content="Transaction history report for DeFi Kingdoms"
        />
      </Head>
      <header className="flex flex-wrap pt-5">
        <div className="min-w-[250px] mb-6 pl-5 pt-5">
          <h1 className="font-header text-2xl text-white">{name}</h1>
          <p className="text-lg text-white mb-6">Level 0</p>
          <div className="
            before:absolute
            before:bg-profile-frame
            before:content-['']
            before:top-profile-frame-top
            before:left-profile-frame-left
            before:h-profile-frame-height
            before:w-profile-frame-width
            before:bg-cover
            before:bg-no-repeat
            before:z-10
            ml-3
          ">
            <Image
              priority
              src="/images/Clerk of Serendale.png"
              height={144}
              width={144}
              alt={name}
          />
          </div>
        </div>
        <div className="border-2 border-hazelnut mt-2 ml-5 p-5 max-w-prose">
          <p className="text-white">
            Commander, your questing heroes sing such splendid songs of wonders and riches. I couldn't help but to collect them all. What has been written is history &#8212; as long as my quill can keep up, that is! Care to see how your heroes fare?
          </p>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}