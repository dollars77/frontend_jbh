"use client";
import React, { useContext, useMemo, useState, useEffect, useRef } from "react";
import { HolderOutlined } from "@ant-design/icons";
import { DndContext } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CreateIcon from "@mui/icons-material/Create";
import SearchIcon from "@mui/icons-material/Search";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { IconButton } from "@mui/material";

import { CSS } from "@dnd-kit/utilities";
import { Button, Table, Spin } from "antd";
import Link from "next/link";
import Swal from "sweetalert2";
import {OpenNotification} from "@/src/components/OpenNotification";
import config from "@/config/configapi";
import imageEmpty from "@/public/emptyimg.jpg";
import Image from "next/image";
import AddCategoryModal from "./components/AddCategoryModal";
import apiauth from "@/config/apiauth";

const RowContext = React.createContext({});

const DragHandle = () => {
  const { setActivatorNodeRef, listeners } = useContext(RowContext);
  return (
    <Button
      type="text"
      size="small"
      icon={<HolderOutlined />}
      style={{
        cursor: "move",
      }}
      ref={setActivatorNodeRef}
      {...listeners}
    />
  );
};

const Dashboard = () => {
  const URL_HOST = `${config.API_SERVER}`;
  const [allCategory, setAllcategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState(allCategory);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [getId, setGetId] = useState(null);
  const addCategoryModalRef = useRef();

  const handleClearForm = () => {
    if (addCategoryModalRef.current) {
      addCategoryModalRef.current.clearForm();
    }
  };

  useEffect(() => {
    get_AllCategory();
  }, []);
  const get_AllCategory = async () => {
    setLoading(true);
    await apiauth
      .get(`api/category/allCategory`)
      .then((res) => {
        const getallCategory = res.data;
        if (getallCategory.length !== 0) {
          setAllcategory(getallCategory);
          setDataSource(getallCategory);
        }
      })
      .catch((err) => {
        OpenNotification({ message: `เกิดข้อผิดผลาด`, type: 4 });
      });
    setLoading(false);
  };
  const columns = [
    {
      key: "sort",
      align: "center",
      width: 80,
      render: () => <DragHandle />,
    },
    {
      title: `ลำดับ`,
      dataIndex: "order",
      width: "5%",
      render: (order, allCategory, index) => (
        <p className="text-xs  my-auto truncate"> {index + 1}</p>
      ),
    },
    {
      title: `Icon`,
      dataIndex: "iconcategory",
      render: (iconcategory) => (
        <div className="w-12  m-0 rounded-md relative">
          {iconcategory !== null ? (
            <Image
              src={`${URL_HOST}${iconcategory}`}
              width={512}
              height={512}
              alt="JBH"
              className="object-contain"
              onError={imageEmpty}
            />
          ) : (
            <Image
              src={imageEmpty}
              alt="JBH"
              width={512}
              height={512}
              className="object-contain"
            />
          )}
          {/* <Image
            fill
            priority
            src={
              `${iconcategory}` !== null
                ? `${URL_HOST}${iconcategory}`
                : null && iconcategory !== null
                ? `${URL_HOST}${iconcategory}`
                : imageEmpty
            }
            onError={({ currentTarget }) => {
              currentTarget.onerror =
                `${iconcategory}` !== null
                  ? `${URL_HOST}${iconcategory}`
                  : null; 
              currentTarget.src = imageEmpty;
            }}
          /> */}
        </div>
      ),
    },

    {
      title: `ชื่อ`,
      dataIndex: "namecategory",
      render: (namecategory) => (
        <p className="text-sm font-semibold  my-auto truncate">
          {" "}
          {namecategory}
        </p>
      ),
    },
    {
      title: `สถานะ`,
      dataIndex: "status",
      render: (status) => (
        <>
          {status === 1 ? (
            <CheckCircleIcon className="text-green-600 ml-0.5 scale-75" />
          ) : (
            <CancelIcon className="text-red-600 ml-0.5 scale-75" />
          )}
        </>
      ),
    },
    {
      title: `จำนวนเว็บไซต์`,
      dataIndex: "id",
      width: "15%",
      render: (id, allCategory) => (
        <div className="flex justify-between gap-3">
          <p className="text-xs  my-auto truncate ">
            {" "}
            {allCategory.websites.length}
          </p>
          <Link
            className="my-auto flex align-middle bg-green-100 hover:bg-green-200 rounded-md px-2 py-1"
            href={`/admin/${id}`}
          >
            <SearchIcon fontSize="medium" color="success" />
            <p className="font-medium text-black ml-2 whitespace-nowrap">
              ดูทั้งหมด
            </p>
          </Link>
        </div>
      ),
    },
    {
      title: `การจัดการ`,
      dataIndex: "id",
      width: "15%",
      render: (id, allCategory) => (
        <div className="flex">
          <button
            onClick={() => showModalCategoryEdit(id)}
            className="my-auto flex align-middle bg-slate-100 hover:bg-slate-200 rounded-md px-2 py-0.5"
          >
            <CreateIcon fontSize="medium" color="warning" />
            <p>แก้ไข</p>
          </button>
          <IconButton onClick={() => showDeleteConfirm(id, allCategory)}>
            <DeleteForeverIcon fontSize="small" color="error" />
          </IconButton>
        </div>
      ),
    },
  ];

  const showDeleteConfirm = (id, allCategory) => {
    Swal.fire({
      title: `ลบหมวดหมู่`,
      text: allCategory.namecategory,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `ยืนยัน`,
      cancelButtonText: `ยกเลิก`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await apiauth
          .delete(`api/category/deleteCategory/${id}`)
          .then(async () => {
            try {
              get_AllCategory();
            } catch (error) {
              console.log("Failed:", error);
            }
            try {
              if (allCategory.iconcategory !== null) {
                let string = "";
                const array = allCategory.iconcategory.split("\\");
                string = "./" + array.join("/");

                await apiauth.post(`api/category/deleteiconcategory`, {
                  id: null,
                  iconcategoryBackup: string,
                });
              }
            } catch (e) {}
            OpenNotification({ message: `ลบเสร็จสิ้น`, type: 1 });
          })
          .catch((err) => {
            OpenNotification({ message: `เกิดข้อผิดพลาด`, type: 4 });
          });
      }
    });
  };

  const Row = (props) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      setActivatorNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({
      id: props["data-row-key"],
    });
    const style = {
      ...props.style,
      transform: CSS.Translate.toString(transform),
      transition,
      ...(isDragging
        ? {
            position: "relative",
            // zIndex: 9999,
          }
        : {}),
    };
    const contextValue = useMemo(
      () => ({
        setActivatorNodeRef,
        listeners,
      }),
      [setActivatorNodeRef, listeners]
    );
    return (
      <RowContext.Provider value={contextValue}>
        <tr {...props} ref={setNodeRef} style={style} {...attributes} />
      </RowContext.Provider>
    );
  };

const onDragEnd = async ({ active, over }) => {
  if (active.id !== over?.id) {
    // อัพเดท dataSource สำหรับ UI
    setDataSource((prevState) => {
      const activeIndex = prevState.findIndex(
        (record) => record.order === active?.id
      );
      const overIndex = prevState.findIndex(
        (record) => record.order === over?.id
      );
      return arrayMove(prevState, activeIndex, overIndex);
    });

    // อัพเดท allCategory และส่งข้อมูลไป server
    setAllcategory((prevState) => {
      const activeIndex = prevState.findIndex(
        (record) => record.order === active.id
      );
      const overIndex = prevState.findIndex(
        (record) => record.order === over.id
      );
      const newOrder = arrayMove(prevState, activeIndex, overIndex);
      
      // สร้างข้อมูลสำหรับส่งไป API
      const data_neworder = newOrder.map((item, index) => ({
        id: item.id,
        order: index + 1,
      }));

      // ส่งข้อมูลไป server (แยกออกมาเป็น async function ต่างหาก)
      updateOrderToServer(data_neworder);
      
      return newOrder;
    });
  }
};

// แยก API call ออกมาเป็นฟังก์ชันแยก
const updateOrderToServer = async (data_neworder) => {
  try {
    await apiauth.put(`api/category/updateOrder`, data_neworder);
    OpenNotification({ message: `เสร็จสิ้น`, type: 1 });
  } catch (err) {
    OpenNotification({ message: `เกิดข้อผิดพลาด`, type: 4 });
  }
};

  const showModal = () => {
    handleClearForm();
    setIsAddModalOpen(!isAddModalOpen);
    if (isAddModalOpen === true) {
      setGetId(null);
    }
  };
  const showModalCategoryEdit = (id) => {
    setGetId(id);
    setIsAddModalOpen(!isAddModalOpen);
  };

  return (
    <div>
      <div className="grid grid-cols-2">
        <div className="flex justify-start">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className=" justify-center text-center py-2 md:py-2 px-10 rounded-md shadow-lg bg-red-500 hover:bg-red-700 text-white text-sm md:text-md"
          >
            เพิ่มหมวดหมู่
          </button>
        </div>
        <div></div>
      </div>
      <AddCategoryModal
        ref={addCategoryModalRef}
        isAddModalOpen={isAddModalOpen}
        showModal={showModal}
        get_AllCategory={get_AllCategory}
        allCategory={allCategory}
        getId={getId}
      />

      <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
        <SortableContext
          items={dataSource.map((i) => i.order)}
          strategy={verticalListSortingStrategy}
        >
          <Table
            rowKey="order"
            scroll={{
              x: 800,
            }}
            components={{
              body: {
                row: Row,
              },
            }}
            columns={columns}
            dataSource={dataSource}
            loading={{
              indicator: (
                <div>
                  <Spin size="large" />
                </div>
              ),
              spinning: loading,
            }}
          />
        </SortableContext>
      </DndContext>
    </div>
  );
};
export default Dashboard;
