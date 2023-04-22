import Head from "next/head";
import TopNavigation from "../components/TopNavigation";
import SideNavigation from "../components/SideNavigation";
import Main from "../components/Main";

export default function Home() {
  return (
    <div className="fixed w-full overflow-y-scroll scrollbar-none">
      <Head>
        <title>OpenContent studio</title>
        <link href="/favicon.png" rel="icon" />
      </Head>
      <main className="relative w-full text-white bg-black">
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