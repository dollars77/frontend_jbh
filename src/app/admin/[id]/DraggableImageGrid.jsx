import React, { useState, useEffect, useCallback } from "react";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
} from "react-grid-dnd";
import { Tooltip } from "antd";
import imageEmpty from "/emptyimg.png";

import CreateIcon from "@mui/icons-material/Create";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { IconButton } from "@mui/material";
import Swal from "sweetalert2";


import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import config from "@/config/configapi";
import apiauth from "@/config/apiauth";
import {OpenNotification} from "@/src/components/OpenNotification";

const DraggableImageGrid = ({
  allGame,
  onOrderChange,
  isModalGame,
  showModal,
  get_AllGame,
  gameId,
  campId,
  setGameId,
  setIsModalGame,
}) => {

  const URL_HOST = `${config.API_SERVER}`;
  const [items, setItems] = useState(allGame);
  const [boxesPerRow, setBoxesPerRow] = useState(5);
  const [heightPerRow, setHeightPerRow] = useState(250);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setBoxesPerRow(windowWidth < 768 ? 3 : 6);
    setHeightPerRow(windowWidth < 768 ? 200 : 250);
  }, [windowWidth]);

  useEffect(() => {
    setItems(allGame);
  }, [allGame]);

  const onChange = useCallback(
    (sourceId, sourceIndex, targetIndex) => {
      const nextState = swap(items, sourceIndex, targetIndex);
      const updatedItems = nextState.map((item, index) => ({
        ...item,
        order: index + 1,
      }));
      setItems(updatedItems);
      onOrderChange(updatedItems);
    },
    [items, onOrderChange]
  );



  const showModalGameEdit = (id) => {
    setGameId(id);
    setIsModalGame(!isModalGame);
  };
  const showDeleteConfirm = async (id, game) => {
    await Swal.fire({
      title: `ยืนยันการลบ`,
      text: game.gamename,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `ยืนยันการลบ`,
      cancelButtonText: `ยกเลิก`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await apiauth.delete(`api/game/deleteGame/${id}`)
          .then(async () => {
            try {
              get_AllGame();
            } catch (error) {
              console.log("Failed:", error);
            }
            try {
              if (game.imagegame !== null) {
                let string = "";
                const array = game.imagegame.split("\\");
                string = "./" + array.join("/");

                await apiauth.post(`api/game/deleteimageGame`, {
                  id: null,
                  imagegameBackup: string,
                });
              }
            } catch (e) {}
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
  const getCoverColor = (cover) => {
    if (cover === 0) return "";
    if (cover === 1) return "#0e6cfb";
    return "#fb0e0e";
  };
  return (
    <div>


      <GridContextProvider onChange={onChange}>
        <GridDropZone
          id="items"
          boxesPerRow={boxesPerRow}
          rowHeight={heightPerRow}
          style={{
            height: `${Math.ceil(items.length / boxesPerRow) * heightPerRow}px`,
          }}
        >
          {items.map((game) => (
            <GridItem key={game.id} className="py-1">
              <div className="bg-white p-1 m-0.5 lg:p-2 lg:m-2 rounded-lg shadow cursor-move relative h-full flex flex-col">
                <div
                  className="flex-grow flex items-center justify-center overflow-hidden"
                  style={{ height: "150px" }}
                >
                  <LazyLoadImage
                    className="w-full h-full object-contain rounded-md pointer-events-none"
                    src={
                      `${URL_HOST}${game.imagegame}` !== null
                        ? `${URL_HOST}${game.imagegame}`
                        : game.imagegame !== null
                        ? `${URL_HOST}${game.imagegame}`
                        : imageEmpty
                    }
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = imageEmpty;
                    }}
                    draggable="false"
                    alt={game.gamename}
                  />
                </div>
                <div className="mt-2">
                  <Tooltip title={game.gamename} className="w-full text-center">
                    <span className="text-ellipsis overflow-hidden line-clamp-1 text-black text-center text-sm lg:text-base">
                      {game.gamename}
                    </span>
                  </Tooltip>

                  <div className="flex flex-wrap justify-between align-middle mt-1">
                    <p className="text-xs text-gray-800 font-semibold">
                      RTP {game.percent_rtp} %
                    </p>
                    <p className="text-xs">
                      สถานะ :
                      {game.status ? (
                        <CheckCircleIcon className="text-green-600 ml-0.5 scale-75" />
                      ) : (
                        <CancelIcon className="text-red-600 ml-0.5 scale-75" />
                      )}
                    </p>
                  </div>
                  <div className="flex justify-between align-middle mt-1">
                    <div className="px-1 rounded-sm">
                      <LazyLoadImage
                        className="w-full h-14 object-contain rounded-md pointer-events-none"
                        src={
                          `${URL_HOST}${game.icongame}` !== null
                            ? `${URL_HOST}${game.icongame}`
                            : game.icongame !== null
                            ? `${URL_HOST}${game.icongame}`
                            : imageEmpty
                        }
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null;
                          currentTarget.src = imageEmpty;
                        }}
                        draggable="false"
                        alt={game.gamename}
                      />
                    </div>
                    <div className=" flex justify-end h-full items-end align-bottom">
                      <IconButton onClick={() => showModalGameEdit(game.id)}>
                        <CreateIcon
                          fontSize="small"
                          color="warning"
                          className="scale-75"
                        />
                      </IconButton>

                      <IconButton
                        onClick={() => showDeleteConfirm(game.id, game)}
                      >
                        <DeleteForeverIcon
                          fontSize="small"
                          color="error"
                          className="scale-75"
                        />
                      </IconButton>
                    </div>
                  </div>
                </div>
              </div>
            </GridItem>
          ))}
        </GridDropZone>
      </GridContextProvider>
    </div>
  );
};

export default DraggableImageGrid;
