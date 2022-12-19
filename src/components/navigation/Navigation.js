import Link from "next/link";
import React from "react";

const index = () => {
    return (
        <div className="w-full bg-slate-400 flex md:flex-row flex-col bg-opacity-25 justify-between px-4">
            <div
                className="font-bold text-3xl items-center justify-center flex text-gray-700"
                style={{ fontFamily: "Tahoma" }}
            >
                Bangladesh Ongoing Projects
            </div>
            <div className="flex items-center">
                <ul className="flex flex-row space-x-0">
                    <li className=" text-md font-semibold hover:bg-slate-500 px-4 min-h-full py-2 hover:bg-opacity-50 transition-all delay-200 hover:text-slate-100">
                        <Link href="/projects">Project Map</Link>
                    </li>
                    <li className=" text-md font-semibold hover:bg-slate-500 px-4 min-h-full py-2 hover:bg-opacity-50 transition-all delay-200 hover:text-slate-100">
                        <Link href="/about">About</Link>
                    </li>
                    <li className=" text-md font-semibold hover:bg-slate-500 px-4 min-h-full py-2 hover:bg-opacity-50 transition-all delay-200 hover:text-slate-100">
                        <Link href="/help">Help</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default index;
