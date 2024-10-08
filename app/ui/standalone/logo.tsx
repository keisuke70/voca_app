import Image from "next/image";

export default function Logo() {
  return (
    <div className="overflow-hidden rounded-lg">
      <Image src="/logoww.png" alt="logo" width={320} height={200} />
    </div>
  );
}
