import Logoweb from "@/src/components/Logoweb";
import CategoryTabs from "./CategoryTabs";
import api from "@/config/api";

async function getCategories() {
  const allcategory = await api.get(`api/category/allCategoryUser`);
  const categoryData = allcategory.data;
  //   const res = await fetch('http://localhost:8081/api/category/allCategoryUser', {
  //   cache: 'no-store', // ไม่ cache เพื่อให้ SSR สด
  // });
  // console.log(res);
  const allwebsite = await api.get(`api/website/getAllWebsiteUser`);
  categoryData.unshift({id:0,namecategory:"ทั้งหมด",iconcategory:"/jbh_logo.png",websites:allwebsite.data})

  

  return categoryData;
}

export default async function Page() {
  const categories = await getCategories();

  return <CategoryTabs categories={categories} />;
  // return <></>;
}
