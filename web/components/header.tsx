import { FaUser } from "react-icons/fa";
import Link from "next/link";
export default function Header() {
  return (
    <>
      <div className="fixed top-0 z-50 w-full bg-black">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex-1 text-left">
            <h1 className="text-white text-lg font-semibold">
              <Link href='/'>Spring</Link>
            </h1>
          </div>
          <div className="flex-1 flex justify-center">
            <input
              type="search"
              name="gsearch"
              id="gsearch"
              placeholder="Search..."
              className="px-5 py-1 bg-neutral-800 rounded-2xl w-96 text-white focus:outline-none"
            />
          </div>
          <div className="flex-1 text-right px-2">
            <button>
              <FaUser size={22} />
            </button>
          </div>
        </div>
        <div className="w-full h-px bg-neutral-800" />
      </div>
    </>
  );
}
