import Image from "next/image";
function Logoweb() {
  return (
    <Image
      src="/jbh_logo.png"
      // fill
      width={800}
      height={713}
      alt={"jbh-studio"}
      // priority
      className="object-contain"
      // sizes="(max-width: 768px) 100vw, 700px"
    />
  );
}

export default Logoweb;
