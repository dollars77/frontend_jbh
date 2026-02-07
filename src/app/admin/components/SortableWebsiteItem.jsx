"use client";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { SafeImageComponent } from "@/src/app/admin/components/ImageWithLoading";
import CreateIcon from "@mui/icons-material/Create";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { IconButton } from "@mui/material";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Tooltip } from "antd";
import imageEmpty from "@/public/emptyimg.jpg";
import { Box, Avatar } from "@mui/material";

const SortableWebsiteItem = React.memo(function SortableWebsiteItem({
  website,
  index,
  showCategory,
  URL_HOST,
  showModalWebsiteEdit,
  showDeleteConfirm,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: website.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 40 : 1,
  };

  // สร้าง drag handle แยกจากปุ่ม action
  const dragHandleProps = {
    ...attributes,
    ...listeners,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={` bg-white p-1 m-0.5 px-1 rounded-lg shadow relative h-full flex flex-col transition-all duration-200 hover:shadow-lg ${
        isDragging ? "scale-105 rotate-1 shadow-2xl" : ""
      }`}
    >
      <div className="absolute top-2 right-2 z-20">
        {website.cover === 0 ? (
          <span></span>
        ) : website.cover === 1 ? (
          <span className="bg-red-700/60 text-white text-xs font-medium lg:font-bold px-2 lg:px-3 py-0.5 lg:py-1 rounded-full shadow-lg ">
            HOT
          </span>
        ) : (
          <span className="bg-sky-600/60 text-white text-xs font-medium lg:font-bold px-2 lg:px-3 py-0.5 lg:py-1 rounded-full shadow-lg ">
            NEW
          </span>
        )}
      </div>
      {/* Drag Handle Area */}
      <div {...dragHandleProps} className="cursor-move flex-1">
        <div className="mt-2">
          <div className="">
            <SafeImageComponent
              website={website}
              URL_HOST={URL_HOST}
              imageEmpty={imageEmpty}
            />
          </div>

          <Tooltip title={website.websitename} className="w-full text-center">
            <span className="text-ellipsis overflow-hidden line-clamp-1 text-black text-center text-sm lg:text-base">
              {website.websitename}
            </span>
          </Tooltip>

          <div className="grid grid-cols-2 justify-between align-middle mt-1">
            <p className="text-xs text-gray-800 font-semibold w-full truncate">
              {website.websiteurl}
            </p>
            <p className="text-xs text-right">
              สถานะ :
              {website.status ? (
                <CheckCircleIcon className="text-green-600 ml-0.5 scale-75" />
              ) : (
                <CancelIcon className="text-red-600 ml-0.5 scale-75" />
              )}
            </p>
          </div>
        </div>
        {showCategory ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              justifyContent: "start",
            }}
          >
            <Avatar
              src={`${URL_HOST}${website.category.iconcategory}`}
              sx={{ width: 15, height: 15 }}
            />
            <p className="text-xs text-gray-500 font-semibold">
              {website.category.namecategory}
            </p>
          </Box>
        ) : (
          <></>
        )}
      </div>

      {/* Action buttons - แยกออกจาก drag handle */}
      <div className="flex justify-end mt-1 gap-1">
        <IconButton
          size="small"
          onClick={() => showModalWebsiteEdit(parseInt(website.id))}
          className="z-10"
        >
          <CreateIcon fontSize="small" color="warning" />
        </IconButton>

        <IconButton
          size="small"
          onClick={() => showDeleteConfirm(parseInt(website.id), website)}
          className="z-10"
        >
          <DeleteForeverIcon fontSize="small" color="error" />
        </IconButton>
      </div>
    </div>
  );
});
export default SortableWebsiteItem;
