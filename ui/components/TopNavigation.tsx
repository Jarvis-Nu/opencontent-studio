import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";

export default function TopNavigation() {
    return(
        <div className="w-full p-5 flex justify-between items-center border-b-gray-500 border-b">
            <div className="flex items-center space-x-1.5">
                <div className="w-[45px] h-[45px] relative">
                    <Image src={"/logo.png"} layout="fill" alt="logo" />
                </div>
                <div>
                    <h1 className="text-xl font-semibold">OpenContent Studio</h1>
                </div>
            </div>
            <div>
                <ConnectButton />
            </div>
        </div>
    )
}