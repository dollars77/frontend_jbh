"use client";
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
import Swal from "sweetalert2";
import apiauth from "@/config/apiauth";
import {OpenNotification} from "@/components/OpenNotification";
import LoadingScreen from "@/src/components/LoadingScreen";
import WebsiteModal from "../[id]/WebsiteModal";
import SortableWebsiteItem from "../components/SortableWebsiteItem";
import config from "@/config/configapi";

function Website() {
  const URL_HOST = `${config.API_SERVER}`;
  const [website, setWebsite] = useState([]);
  const [loadingWebsite, setLoadingWebsite] = useState(true);
  const [boxesPerRow, setBoxesPerRow] = useState(5);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [getId, setGetId] = useState(null);
  const WebsiteModalRef = useRef();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10, // เพิ่มระยะทางให้มากขึ้น
        delay: 0, // เพิ่ม delay เล็กน้อย
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const sortableItems = useMemo(
    () => website.map((item) => item.id),
    [website]
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
    get_AllWebsite();
  }, []);

  const handleClearForm = () => {
    WebsiteModalRef.current?.clearForm();
  };

  const get_AllWebsite = async () => {
    setWebsite([]);
    setLoadingWebsite(true);
    try {
      const res = await apiauth.get(`api/website/allWebsiteOrderall`);
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
        order_all: items.length - (index + 1),
      }));

      handleOrderChange(updatedItems);
      return updatedItems;
    });
  }, []);

  const handleOrderChange = async (updatedItems) => {
    await apiauth
      .put(`api/website/updateOrderWebsiteAll`, updatedItems)
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

  return (
    <div>
      {isAddModalOpen ? (
        <WebsiteModal
          ref={WebsiteModalRef}
          isAddModalOpen={isAddModalOpen}
          showModal={showModal}
          get_AllWebsite={get_AllWebsite}
          allWebsite={website}
          getId={getId}
          categoryId={null}
        />
      ) : (
        <></>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-6 gap-2">
        <div>
          <button
            onClick={showModal}
            className="text-center py-2 md:py-2 px-10 rounded-md shadow-lg bg-red-500 hover:bg-red-700 text-white text-sm md:text-md h-10 my-auto"
          >
            เพิ่มเว็บไซต์
          </button>
        </div>

        <div className="flex gap-2 flex-col my-auto col-span-2">
          <p className="text-lg">เว็บไซต์ทั้งหมด : {website.length}</p>
        </div>

        <div className="flex justify-start col-span-3"></div>
      </div>
      {loadingWebsite ? (
        <LoadingScreen />
      ) : (
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
                {website.map((webs, index) => (
                  <SortableWebsiteItem
                    showCategory={true}
                    key={webs.id}
                    website={webs}
                    index={index}
                    URL_HOST={URL_HOST}
                    showModalWebsiteEdit={showModalWebsiteEdit}
                    showDeleteConfirm={showDeleteConfirm}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      )}
    </div>
  );
}

export default Website;
