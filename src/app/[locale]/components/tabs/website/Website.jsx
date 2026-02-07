import EmblaCarousel from "./EmblaCarousel/EmblaCarousel";

const items = [
  {
    id: "1",
    price: "฿ 20,000",
    planName: "Basic Plan",
    color: "from-green-300 to-green-500",
    features: [
      "หน้าเว็บ 1 ภาษา",
      "เลือกภาษาได้ตามต้องการ",
      "มี 3 เมนูหลัก หน้าแรก,โปรโมชั่น,สมัครสมาชิก",
      "อีก 2 เมนูสามารถเลือกตามที่ต้องการ",
      "ภาพโปรโมชั่นฟรี 5 ภาพ",
      "ภาพอื่นๆ 2 ภาพ",
      "สลับภาพตามต้องการ",
    ],
    image: "/plan1.png",
  },
  {
    id: "2",
    price: "฿ 25,000",
    planName: "Standard Plan",
    color: "from-sky-300 to-sky-600",
    features: [
      "หน้าเว็บ 2 ภาษา",
      "เลือกภาษาได้ตามต้องการ",
      "มี 3 เมนูหลัก หน้าแรก,โปรโมชั่น,สมัครสมาชิก",
      "อีก 2 เมนูสามารถเลือกตามที่ต้องการ",
      "ภาพโปรโมชั่นฟรี 10 ภาพ",
      "ภาพอื่นๆ 2 ภาพ",
      "สลับภาพตามต้องการ",
    ],
    image: "/plan2.png",
  },
  {
    id: "3",
    price: "฿ 30,000",
    planName: "Premium Plan",
    color: "from-yellow-300 to-orange-400",
    features: [
      "หน้าเว็บ 3 ภาษา",
      "เลือกภาษาได้ตามต้องการ",
      "มี 3 เมนูหลัก หน้าแรก,โปรโมชั่น,สมัครสมาชิก",
      "อีก 2 เมนูสามารถเลือกตามที่ต้องการ",
      "ภาพโปรโมชั่นฟรี 15 ภาพ",
      "ภาพอื่นๆ 4 ภาพ",
      "สลับภาพตามต้องการ",
    ],
    image: "/plan3.png",
  },
  {
    id: "4",
    price: "ติดต่อเรา",
    planName: "Enterprise Plan",
    color: "from-gray-500 to-gray-700",
    features: [
      "หน้าเว็บหลายภาษา",
      "เลือกภาษาได้ตามต้องการ",
      "มี 3 เมนูหลัก หน้าแรก,โปรโมชั่น,สมัครสมาชิก",
      "Custom เมนูเพิ่มได้",
      "ภาพโปรโมชั่นฟรีตามต้องการ",
      "ภาพอื่นๆ Custom ได้",
      "สลับภาพตามต้องการ",
    ],
    image: "/plan4.png",
  },
];

function Website() {
  return <EmblaCarousel items={items} />;
}

export default Website;
