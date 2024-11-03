"use client";
import Link from "next/link";
const Breadcrumb = ({ path }) => {
  const pathArray = path.split("/").filter((p) => p);

  return (
    <nav className="text-sm font-medium mb-4" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link href="/">
            <p className="text-gray-700 hover:text-blue-500">Home</p>
          </Link>
        </li>
        {pathArray.map((path, idx) => {
          const fullPath = `/${pathArray.slice(0, idx + 1).join("/")}`;

          return (
            <li key={idx} className="inline-flex items-center">
              <span className="mx-2 text-gray-500">/</span>
              <Link href={fullPath}>
                <h3
                  className={`text-gray-700 text-md hover:text-blue-500 ${
                    idx === pathArray.length - 1 ? "" : "text-zinc-500"
                  }`}
                >
                  {path}
                </h3>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
