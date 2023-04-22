import Head from "next/head";
import TopNavigation from "../components/TopNavigation";
import SideNavigation from "../components/SideNavigation";
import Main from "../components/Main";
import useScreenSize from 'use-screen-size';

export default function Home() {
  const size = useScreenSize()
  if (size.width >= 640) {
  return (
    <div className="fixed min-h-screen bg-black w-full overflow-y-scroll scrollbar-none">
      <Head>
        <title>OpenContent studio</title>
        <link href="/favicon.png" rel="icon" />
      </Head>
      <main className="relative w-full text-white">
        <div>
          <TopNavigation />
        </div>
        <div className="flex w-full">
          <div className="w-full max-w-xs max-h-screen overflow-y-scroll custom-scrollbar scrollbar-thin scrollbar-track-black scrollbar-thumb-gray-500 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
            <SideNavigation />
          </div>
          <div className="flex flex-col items-center w-full max-h-screen px-10 py-5 overflow-y-scroll custom-scrollbar scrollbar-thin scrollbar-track-black scrollbar-thumb-gray-500">
            <Main />
          </div>
        </div>
      </main>
    </div> 
    )
  }
  else {
    return (
      <div className="fixed w-full h-full overflow-y-scroll scrollbar-none bg-black">
        <Head>
          <title>OpenContent studio</title>
          <link href="/favicon.png" rel="icon" />
        </Head>
        <main className="relative h-full w-full text-white">
          <div>
            <TopNavigation />
          </div>
          <div className="w-full h-full flex flex-col items-center justify-center px-2.5 text-center">
            <p className="pb-32">This platform is not optimized for this screen size</p>
          </div>
        </main>
      </div> 
    )
  }
}