import { Link } from "@inertiajs/react";

export function Logo({ className,link='/home' }) {
  return (
  <Link href={link}>
    <img src='/Logo.svg' alt='logo' className={className} />
  </Link>
  );
}
