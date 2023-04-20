import Head from "next/head";
import TopNavigation from "../components/TopNavigation";
import SideNavigation from "../components/SideNavigation";
import Main from "../components/Main";

export default function Home() {
  return (
    <div className="fixed overflow-y-scroll w-full scrollbar-none">
      <Head>
        <title>OpenContent studio</title>
        <link href="/favicon.png" rel="icon" />
      </Head>
      <main className="bg-black w-full text-white relative">
        <div>
          <TopNavigation />
        </div>
        <div className="w-full flex">
          <div className="max-w-xs w-full max-h-[calc(100vh-20px)] px-5 custom-scrollbar
            scrollbar-thin scrollbar-track-black scrollbar-thumb-gray-500 overflow-y-scroll 
            scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
            <SideNavigation />
          </div>
          <div className="w-full px-10 py-5 flex flex-col items-center max-h-screen overflow-y-scroll custom-scrollbar
          scrollbar-thin scrollbar-track-black scrollbar-thumb-gray-500">
            <Main />
          </div>
        </div>
      </main>
    </div>
  )
}