"use client";
// this needs to be client side to use usePathname hook. only page.tsx can receive the path.params as an argument

import {
  HomeIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";
import { MagnifyingGlassPlusIcon } from "@heroicons/react/24/outline";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: "Home", href: "/dashboard", icon: HomeIcon },
  { name: "Add", href: "/dashboard/add", icon: MagnifyingGlassPlusIcon },
  {
    name: "Removed",
    href: "/dashboard/removed",
    icon: ArchiveBoxIcon,
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[28px] md:h-[48px] grow items-center justify-start gap-2 rounded-md  text-sm font-medium md:flex-none md:justify-startmd:p-2 md:px-3 bg-blue-50/20 shadow-sm hover:shadow-md text-white"
            )}
          >
            <LinkIcon className="w-6 md:ml-2" />
            <p className="hidden md:block md:pl-3 ">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
