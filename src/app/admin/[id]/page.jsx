"use client";
import { useParams, useRouter } from "next/navigation";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import imageEmpty from "@/public/emptyimg.jpg";
import Swal from "sweetalert2";
import apiauth from "@/config/apiauth";
import { OpenNotification } from "@/components/OpenNotification";
import Image from "next/image";
import LoadingScreen from "@/src/components/LoadingScreen";
import WebsiteModal from "./WebsiteModal";
import SortableWebsiteItem from "../components/SortableWebsiteItem";
import config from "@/config/configapi";

// Sortable Website Item Component

function AllWebsiteWithCategory() {
  const params = useParams();
  const router = useRouter();
  const URL_HOST = `${config.API_SERVER}`;
  const [website, setWebsite] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingWebsite, setLoadingWebsite] = useState(true);
  const [oneCategory, setOneCategory] = useState("");
  const [boxesPerRow, setBoxesPerRow] = useState(5);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [getId, setGetId] = useState(null);
  const WebsiteModalRef = useRef();

  // ปรับ sensor ให้ sensitive น้อยลง
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10, // เพิ่มระยะทางให้มากขึ้น
        delay: 0, // เพิ่ม delay เล็กน้อย
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const sortableItems = useMemo(
    () => website.map((item) => item.id),
    [website],
  );

  // Responsive grid
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setBoxesPerRow(width < 768 ? 3 : width < 1024 ? 4 : 6);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    get_Onecategory();
    get_AllWebsite();
  }, []);

  const handleClearForm = () => {
    WebsiteModalRef.current?.clearForm();
  };

  const get_Onecategory = async () => {
    setLoading(true);
    try {
      const res = await apiauth.get(`api/category/oneCategory/${params.id}`);
      const getonecategory = res.data;
      if (getonecategory.length !== 0) {
        setOneCategory(getonecategory);
      }
    } catch (err) {
      OpenNotification({ message: `เกิดข้อผิดพลาด`, type: 4 });
    }
    setLoading(false);
  };

  const get_AllWebsite = async () => {
    setWebsite([]);
    setLoadingWebsite(true);
    try {
      const res = await apiauth.get(
        `api/website/allWebsiteInCategoryAdmin/${params.id}`,
      );
      const get_AllWebsite = res.data;
      if (get_AllWebsite.length !== 0) {
        setWebsite(get_AllWebsite);
      }
    } catch (err) {
      OpenNotification({ message: `เกิดข้อผิดพลาด`, type: 4 });
    }
    setLoadingWebsite(false);
  };

  const handleDragEnd = useCallback((event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setWebsite((items) => {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      if (oldIndex === -1 || newIndex === -1) return items;

      const newOrder = arrayMove(items, oldIndex, newIndex);
      const updatedItems = newOrder.map((item, index) => ({
        ...item,
        order: items.length - (index ),
      }));
      
      handleOrderChange(updatedItems);
      return updatedItems;
    });
  }, []);
  const handleOrderChange = async (updatedItems) => {
 
    await apiauth
      .put(`api/website/updateOrderWebsite`, updatedItems)
      .catch((err) => {
        OpenNotification({ message: `เกิดข้อผิดพลาด`, type: 4 });
      });
  };

  const showDeleteConfirm = async (id, website) => {
    await Swal.fire({
      title: `ยืนยันการลบ`,
      text: website.websitename,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `ยืนยันการลบ`,
      cancelButtonText: `ยกเลิก`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await apiauth
          .delete(`api/website/deleteWebsite/${id}`)
          .then(async () => {
            try {
              if (website.imagepc !== null) {
                let string = "";
                const array = website.imagepc.split("\\");
                string = "./" + array.join("/");

                await apiauth.post(`api/website/deleteimagepc`, {
                  id: null,
                  imagepcBackup: string,
                });
              }
            } catch (e) {}
            try {
              if (website.imagemobile !== null) {
                let string = "";
                const array = website.imagemobile.split("\\");
                string = "./" + array.join("/");

                await apiauth.post(`api/website/deleteimagemobile`, {
                  id: null,
                  imagemobileBackup: string,
                });
              }
            } catch (e) {}
            get_AllWebsite();
            OpenNotification({
              message: `ลบเสร็จสิ้น`,
              type: 1,
            });
          })
          .catch((err) => {
            OpenNotification({ message: `เกิดข้อผิดพลาด`, type: 4 });
          });
      }
    });
  };

  const showModal = () => {
    handleClearForm();
    setIsAddModalOpen(!isAddModalOpen);
    if (isAddModalOpen) {
      setGetId(null);
    }
  };

  const showModalWebsiteEdit = (id) => {
    setGetId(id);
    setIsAddModalOpen(true);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <WebsiteModal
        ref={WebsiteModalRef}
        isAddModalOpen={isAddModalOpen}
        showModal={showModal}
        get_AllWebsite={get_AllWebsite}
        allWebsite={website}
        getId={getId}
        categoryId={parseInt(params.id)}
      />

      <nav className="flex items-center justify-between h-14 rounded-md px-1 py-3 md:py-5 lg:py-2 w-full z-30 drop-shadow-xl max-h-20">
        <div className="w-2/4">
          <button
            onClick={() => router.back()}
            className="bg-orange-500 hover:bg-orange-700 text-shadow-1 text-white font-bold py-2 px-4 rounded-md inline-flex items-center shadow-md"
          >
            <svg
              className="drop-shadow-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              width="24"
              height="24"
              strokeWidth="1.5"
            >
              <path d="M13.883 5.007l.058 -.005h.118l.058 .005l.06 .009l.052 .01l.108 .032l.067 .027l.132 .07l.09 .065l.081 .073l.083 .094l.054 .077l.054 .096l.017 .036l.027 .067l.032 .108l.01 .053l.01 .06l.004 .057l.002 .059v12c0 .852 -.986 1.297 -1.623 .783l-.084 -.076l-6 -6a1 1 0 0 1 -.083 -1.32l.083 -.094l6 -6l.094 -.083l.077 -.054l.096 -.054l.036 -.017l.067 -.027l.108 -.032l.053 -.01l.06 -.01z"></path>
            </svg>
            <span className="ml-2">ย้อนกลับ</span>
          </button>
        </div>
      </nav>

      {loadingWebsite ? (
        <LoadingScreen />
      ) : (
        <div>
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-2">
            <div className="p-3 relative w-28">
              {oneCategory.iconcategory ? (
                <Image
                  src={`${URL_HOST}${oneCategory.iconcategory}`}
                  width={512}
                  height={512}
                  alt="Category Icon"
                  className="object-contain"
                  onError={()=>imageEmpty}
                />
              ) : (
                <Image
                  src={imageEmpty}
                  alt="Empty"
                  width={512}
                  height={512}
                  className="object-contain"
                  onError={()=>imageEmpty}
                />
              )}
            </div>

            <div className="flex gap-2 flex-col my-auto col-span-2">
              <p className="text-lg">ชื่อ : {oneCategory.namecategory}</p>
              <p className="text-lg">เว็บไซต์ทั้งหมด : {website.length}</p>
            </div>

            <div className="flex justify-start col-span-3">
              <button
                onClick={showModal}
                className="text-center py-2 md:py-2 px-10 rounded-md shadow-lg bg-red-500 hover:bg-red-700 text-white text-sm md:text-md h-10 my-auto"
              >
                เพิ่มเว็บไซต์
              </button>
            </div>
          </div>

          <div className="mt-4">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={sortableItems}
                strategy={rectSortingStrategy}
              >
                <div
                  className="grid gap-2"
                  style={{
                    gridTemplateColumns: `repeat(${boxesPerRow}, minmax(0, 1fr))`,
                  }}
                >
                  {website.length !== 0 ? (
                    <>
                      {website.map((webs, index) => (
                        <SortableWebsiteItem
                          showCategory={false}
                          key={webs.id}
                          website={webs}
                          index={index}
                          URL_HOST={URL_HOST}
                          showModalWebsiteEdit={showModalWebsiteEdit}
                          showDeleteConfirm={showDeleteConfirm}
                        />
                      ))}
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </SortableContext>
            </DndContext>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllWebsiteWithCategory;
