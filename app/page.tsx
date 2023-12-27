import { ArrowRight, Github} from "lucide-react";
import Link from "next/link";


export default function Home() {
  return (
    <main className="">
      <div className="flex flex-col lg:flex-row items-center bg-[#1E1919] dark:bg-slate-800">

      <div className="p-10 flex flex-col bg-[#2B2929] dark:bg-slate-800 text-white space-y-5">
        <h1 className="text-5xl font-bold">
          Welcome to Dropbox. <br /> 
          <br />
          Storing everything for you and your business needs. All in one place. <br />
          {/* "This is a clone of the popular cloud storage service Dropbox." */}
        </h1>

        <p className="pb-20">
          Enhance your personal storage with Dropbox, offering a simple and efficient way to upload,
           organize, and access files from anywhere.
          Securely store important documents and media, and experience the convenience of easy file
           management and sharing in one centralized solution.
        </p>

        <Link className="flex cursor-pointer bg-blue-500 p-5 w-fit rounded-sm" href="/dashboard">
          Try it for free!
          <ArrowRight className="ml-10"/>
        </Link>

      </div>

      <div className="bg-[#1E1919] dark:bg-slate-800 h-full p-10">
          <video autoPlay loop muted className="rounded-lg">
          <source 
          src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080.mp4"
          type="video/mp4"
          />
    
          </video>
      </div>
      
      </div>
      <p className="text-center text-lg font-semibold p-2">
         This DropBox clone was built using Next.js, TailwindCSS, Firebase, and Clerk.<br />
          <a href="https://github.com/toshi-Devs" target="_blank" 
          className="inline-flex items-center underline text-blue-400 hover:text-blue-700">
          <Github size={25} className="ml-2" />Toshi-Devs
          </a>
      </p>


    </main>
  )
}
