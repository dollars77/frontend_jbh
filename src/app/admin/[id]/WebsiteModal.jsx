"use client";
import apiForm from "@/config/apiform";
import config from "@/config/configapi";
import Modal from "@/src/components/Modal";
import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { OpenNotification } from "@/src/components/OpenNotification";
import Image from "next/image";
import ErrorMessage from "@/src/components/ErrorMessage";
import apiauth from "@/config/apiauth";
import {
  FormControl,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  Box,
  Typography,
  Avatar,
  Select,
  MenuItem,
  CircularProgress,
  Chip,
} from "@mui/material";

const WebsiteModal = forwardRef(
  (
    {
      isAddModalOpen,
      showModal,
      get_AllWebsite,
      getId,
      allWebsite,
      categoryId,
    },
    ref,
  ) => {
    const URL_HOST = `${config.API_SERVER}`;
    const [websitename, setWebsitename] = useState("");
    const [websiteurl, setWebsiteurl] = useState("");
    const [description, setDescription] = useState("");

    const [status, setStatus] = useState(true);
    const [msgErr1, setMsgErr1] = useState("");

    const [imagepc, setImagepc] = useState(null);
    const [imagepcPreview, setImagepcPreview] = useState(null);
    const [imagepcBackup, setImagepcBackup] = useState({});
    const [checkimagepc, setCheckimagepc] = useState(false);

    const [imagemobile, setImagemobile] = useState(null);
    const [imagemobilePreview, setImagemobilePreview] = useState(null);
    const [imagemobileBackup, setImagemobileBackup] = useState({});
    const [checkimagemobile, setCheckimagemobile] = useState(false);

    const [category, setCategory] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    // let selectedCategoriesOrder = [];
    const [selectedCategoriesOld, setSelectedCategoriesOld] = useState([]);
    const [loadingSelected, setLoadingSelected] = useState(true);

    const [selectedCover, setSelectedCover] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      clearForm();
      get_Category();

      if (getId != null) {
        const findone = allWebsite.find((obj) => obj.id === getId);
        if (findone) {
          setForm(findone);
        }
      }
    }, [getId, allWebsite]);

    const get_Category = async () => {
      setLoadingSelected(true);
      await apiauth
        .get(`api/category/allCategory`)
        .then((res) => {
          const getallCategory = res.data;
          if (getallCategory.length !== 0) {
            setCategory(getallCategory);
          }
        })
        .catch((err) => {
          OpenNotification({ message: `เกิดข้อผิดผลาด`, type: 4 });
        });
      setLoadingSelected(false);
    };
    const handleChangeCategory = (event) => {
      const value = event.target.value;
      setSelectedCategories(value);
    };
    const handleChangeCover = (event) => {
      setSelectedCover(event.target.value);
    };

    // หาข้อมูลผู้ใช้ที่ถูกเลือก
    const selectedCategoryDataList = category.filter((c) =>
      // selectedCategoriesOrder.includes(c.oder),
      selectedCategories.includes(c.id),
    );
    const selectedCoverData = category.find(
      (categorys) => categorys.cover === selectedCover,
    );

    const setForm = (findone) => {
      setWebsitename(findone.websitename);
      setWebsiteurl(findone.websiteurl);
      setDescription(findone.description);
      setStatus(findone.status === 1 ? true : false);
      setSelectedCover(parseInt(findone.cover));
      setImagepcPreview(
        findone.imagepc ? `${URL_HOST}${findone.imagepc}` : null,
      );
      setImagepc(findone.imagepc ? `${URL_HOST}${findone.imagepc}` : null);
      setImagepcBackup(findone.imagepc);
      setImagemobilePreview(
        findone.imagemobile ? `${URL_HOST}${findone.imagemobile}` : null,
      );
      setImagemobile(
        findone.imagemobile ? `${URL_HOST}${findone.imagemobile}` : null,
      );
      setImagemobileBackup(findone.imagemobile);
      if (
        Array.isArray(findone.category_websites) &&
        findone.category_websites.length
      ) {
        const ids = findone.category_websites.map((cw) => cw.categoryId);
        setSelectedCategories(ids);
        setSelectedCategoriesOld(ids);
      } else {
        setSelectedCategories([]);
        setSelectedCategoriesOld([]);
      }
    };
    const clearForm = () => {
      setWebsitename("");
      setWebsiteurl("");
      setDescription("");
      setStatus(true);
      setImagepc(null);
      setImagepcPreview(null);
      setImagepcBackup({});
      setCheckimagepc(false);
      setImagemobile(null);
      setImagemobilePreview(null);
      setImagemobileBackup({});
      setCheckimagemobile(false);
      setMsgErr1("");
      setSelectedCategories(categoryId ? [categoryId] : []);
      setSelectedCategoriesOld(categoryId ? [categoryId] : []);
      setSelectedCover(0);
    };
    useImperativeHandle(ref, () => ({
      clearForm,
      // คุณสามารถเพิ่ม function อื่นๆ ที่ต้องการให้ parent เรียกใช้ได้
      resetToDefaults: () => {
        clearForm();
      },
    }));

    const CreateWebsite = async () => {
      if (websitename === "") {
        setMsgErr1(`กรอกให้ครบถ้วน`);
        return;
      }
      setMsgErr1("");
      setIsLoading(true);

      const formData = new FormData();
      formData.append("imagepc", imagepc);
      formData.append("imagemobile", imagemobile);
      formData.append("websitename", websitename);
      formData.append("websiteurl", websiteurl);
      formData.append("description", description);
      formData.append("status", status ? 1 : 0);
      formData.append("categoryId", JSON.stringify(selectedCategories));
      console.log([...formData.entries()]);
      // selectedCategories.forEach((id) => formData.append("categoryIds[]", id));
      formData.append("cover", selectedCover);

      await apiForm
        .post(`api/website/addWebsite`, formData)
        .then(async (res) => {
          OpenNotification({ message: `เสร็จสิ้น`, type: 1 });
          showModal();

          return res.data;
        })
        .catch((err) => {
          err.response.data.status === 400
            ? OpenNotification({
                message: `มีชื่อนี้แล้ว`,
                type: 3,
              })
            : OpenNotification({ message: `เกิดข้อผิดพลาด`, type: 4 });
        });
      await get_AllWebsite();
      setIsLoading(false);
    };
    const UpdateWebsite = async () => {
      if (websitename === "") {
        setMsgErr1(`กรอกให้ครบถ้วน`);
        return;
      }
      setMsgErr1("");

      try {
        if (checkimagepc && imagepcBackup !== null) {
          let string = "";
          const array = imagepcBackup.split("\\");
          string = "./" + array.join("/");

          await apiauth.post(`api/website/deleteimagepc`, {
            imagepcBackup: string,
            id: getId,
          });
        }
      } catch (e) {}
      try {
        if (checkimagemobile && imagemobileBackup !== null) {
          let string = "";
          const array = imagemobileBackup.split("\\");
          string = "./" + array.join("/");

          await apiauth.post(`api/website/deleteimagemobile`, {
            imagemobileBackup: string,
            id: getId,
          });
        }
      } catch (e) {}

      const formData = new FormData();

      formData.append("imagepc", imagepc);
      formData.append("imagemobile", imagemobile);
      formData.append("id", getId);
      formData.append("websitename", websitename);
      formData.append("websiteurl", websiteurl);
      formData.append("description", description);
      formData.append("checkimagemobile", checkimagemobile);
      formData.append("checkimagepc", checkimagepc);
      formData.append("status", status ? 1 : 0);
      formData.append("categoryId", JSON.stringify(selectedCategories));
      formData.append("categoryIdOld", JSON.stringify(selectedCategoriesOld));
      formData.append("cover", selectedCover);
      formData.append(
        "checkCategory",
        selectedCategories === selectedCategoriesOld,
      );
      setIsLoading(true);
      // console.log([...formData.entries()]);

      await apiForm
        .put(`api/website/updateWebsite`, formData)
        .then(async (res) => {
          OpenNotification({ message: `เสร็จสิ้น`, type: 1 });
          showModal();

          return res.data;
        })
        .catch((err) => {
          err.response.data.status === 400
            ? OpenNotification({
                message: `มีชื่อนี้แล้ว`,
                type: 3,
              })
            : OpenNotification({ message: `เกิดข้อผิดพลาด`, type: 4 });
        });
      await get_AllWebsite();
      setIsLoading(false);
    };
    const handleDelImagepc = (e) => {
      setImagepc({});
      setImagepcPreview(null);
      setCheckimagepc(true);
    };
    const handleDelImagemobile = (e) => {
      setImagemobile({});
      setImagemobilePreview(null);
      setCheckimagemobile(true);
    };
    const handleUploadImagepc = (e) => {
      if (e.target.files[0].size > 2097152) {
        OpenNotification({
          message: `ขนาดรูปภาพต้องไม่เกิน 2 MB`,
          type: 3,
        });
        return;
      }
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagepc(file);
        setImagepcPreview(reader.result);
        setCheckimagepc(true);
      };
      reader.readAsDataURL(file);
    };
    const handleUploadImagemobile = (e) => {
      if (e.target.files[0].size > 2097152) {
        OpenNotification({
          message: `ขนาดรูปภาพต้องไม่เกิน 2 MB`,
          type: 3,
        });
        return;
      }
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagemobile(file);
        setImagemobilePreview(reader.result);
        setCheckimagemobile(true);
      };
      reader.readAsDataURL(file);
    };
    const modalFooter = (
      <div className="text-center flex justify-center gap-4">
        {getId === null ? (
          <button
            onClick={CreateWebsite}
            className="text-center text-white font-semibold px-10 py-2 rounded-md bg-purple-500 hover:bg-purple-800 shadow-md transition-colors"
          >
            เพิ่ม
          </button>
        ) : (
          <button
            onClick={UpdateWebsite}
            className="text-center text-white font-semibold px-10 py-2 rounded-md bg-orange-500 hover:bg-orange-800 shadow-md transition-colors"
          >
            แก้ไข
          </button>
        )}

        <button
          onClick={showModal}
          className="bg-transparent hover:bg-gray-100 text-black font-semibold py-2 px-10 border border-purple-500 hover:border-transparent rounded transition-colors"
        >
          ยกเลิก
        </button>
      </div>
    );
    return (
      <div>
        {" "}
        <Modal
          isOpen={isAddModalOpen}
          onClose={showModal}
          title={getId === null ? "เพิ่มเว็บไซต์" : "แก้ไขเว็บไซต์"}
          footer={modalFooter}
          size="xxxl"
        >
          {isLoading && (
            <div className="absolute top-0 left-0 w-full h-full bg-black/10 flex items-center justify-center z-50">
              <span className="loading loading-spinner loading-xl rounded-full  border-t-4 text-red-600 border-solid"></span>
            </div>
          )}
          <div className="w-full grid grid-cols-3 gap-5">
            <div className="grid grid-cols-1 col-span-2">
              <div className="rounded-lg shadow-md col-span-1 bg-gray-50 h-auto">
                <div className="m-4">
                  <div className="flex items-center">
                    <label className="inline-block mb-2 text-gray-500">
                      อัพโหลด PC
                    </label>
                    <button
                      onClick={handleDelImagepc}
                      className="ml-2 p-1 text-red-500 hover:bg-red-50 rounded"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-center justify-center w-full ">
                    {imagepcPreview ? (
                      <div className="relative w-96 aspect-video ">
                        <Image
                          src={imagepcPreview}
                          alt="imagepc"
                          fill
                          priority
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <label className="flex flex-col  w-96 aspect-video border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300 cursor-pointer">
                        <div className="flex flex-col items-center justify-center my-auto">
                          <svg
                            className="w-8 h-8 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                          <p className="pt-1 text-sm tracking-wider text-gray-400">
                            Click
                          </p>
                        </div>
                        <input
                          type="file"
                          accept="image/png, image/jpeg, image/webp"
                          className="hidden"
                          onChange={handleUploadImagepc}
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 col-span-1">
              <div className="rounded-lg shadow-md col-span-1 bg-gray-50">
                <div className="m-4">
                  <div className="flex items-center">
                    <label className="inline-block mb-2 text-gray-500">
                      อัพโหลด Mobile
                    </label>
                    <button
                      onClick={handleDelImagemobile}
                      className="ml-2 p-1 text-red-500 hover:bg-red-50 rounded"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-center justify-center w-full ">
                    {imagemobilePreview ? (
                      <div className="relative w-40 aspect-[9/16] ">
                        <Image
                          src={imagemobilePreview}
                          alt="imagemobile"
                          fill
                          priority
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <label className="flex flex-col  w-40 aspect-[9/16] border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300 cursor-pointer">
                        <div className="flex flex-col items-center justify-center my-auto">
                          <svg
                            className="w-8 h-8 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                          <p className="pt-1 text-sm tracking-wider text-gray-400">
                            Click
                          </p>
                        </div>
                        <input
                          type="file"
                          accept="image/png, image/jpeg, image/webp"
                          className="hidden"
                          onChange={handleUploadImagemobile}
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full grid justify-start mt-5 grid-cols-5 gap-3">
            <div className="w-full col-span-1">
              <p className="text-md mr-1 my-auto text-black">สถานะ</p>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={status}
                  onChange={(e) => setStatus(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    status ? "bg-green-600" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      status ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </div>
              </label>
            </div>

            <div className="w-full col-span-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ชื่อเว็บ
              </label>
              <input
                type="text"
                value={websitename}
                onChange={(e) => setWebsitename(e.target.value)}
                className="block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                autoComplete="off"
              />
            </div>
          </div>
          <div className="w-full my-5 grid grid-cols-5 gap-3">
            <FormControl fullWidth className="col-span-1">
              <InputLabel id="user-select-label">เลือกปก</InputLabel>
              <Select
                labelId="user-select-label"
                id="user-select"
                value={selectedCover}
                label="เลือกปก"
                onChange={handleChangeCover}
                size="small"
                color="success"
                // renderValue={(selected) => {
                //   if (!selected || !selectedCoverData) {
                //     return "";
                //   }

                //   return (
                //     <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                //       <Avatar
                //         src={`${URL_HOST}${selectedCategoryData.iconcategory}`}
                //         sx={{ width: 24, height: 24 }}
                //       />
                //       <Typography variant="body1">
                //         {selectedCategoryData.namecategory}
                //       </Typography>
                //     </Box>
                //   );
                // }}
              >
                <MenuItem value={0}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Image
                      src={`/none-icon.png`}
                      alt={"cover"}
                      width={18}
                      height={18}
                    />
                    <p>ไม่ใส่</p>
                  </Box>
                </MenuItem>
                <MenuItem value={1}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Image
                      src={`/hot-icon.png`}
                      alt={"cover"}
                      width={18}
                      height={18}
                    />
                    <p>มาแรง</p>
                  </Box>
                </MenuItem>
                <MenuItem value={2}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Image
                      src={`/new-icon2.png`}
                      alt={"cover"}
                      width={18}
                      height={18}
                    />
                    <p>ใหม่</p>
                  </Box>
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth className="col-span-4">
              <InputLabel htmlFor="outlined-adornment-amount">
                ลิ้ง URL
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">https://</InputAdornment>
                }
                label="ลิ้ง URL"
                value={websiteurl}
                size="small"
                color="success"
                onChange={(e) => setWebsiteurl(e.target.value)}
              />
            </FormControl>
          </div>
          <div>
            <FormControl fullWidth>
              <InputLabel id="category-select-label">เลือกหมวดหมู่</InputLabel>
              <Select
                labelId="category-select-label"
                id="category-select"
                multiple
                value={selectedCategories}
                label="เลือกหมวดหมู่"
                onChange={handleChangeCategory}
                // disabled={categoryId !== null ? true : loadingSelected} // เหมือนของเดิม (ถ้าส่ง categoryId มาจะล็อค)
                size="small"
                color="success"
                renderValue={() => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selectedCategoryDataList.map((c) => (
                      <Chip
                        key={c.id}
                        size="small"
                        label={c.namecategory}
                        avatar={
                          <Avatar
                            src={`${URL_HOST}${c.iconcategory}`}
                            sx={{ width: 20, height: 20 }}
                          />
                        }
                      />
                    ))}
                  </Box>
                )}
              >
                {loadingSelected ? (
                  <MenuItem disabled>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CircularProgress size={20} />
                      <Typography>กำลังโหลด...</Typography>
                    </Box>
                  </MenuItem>
                ) : (
                  category.map((categorys) => (
                    <MenuItem key={categorys.id} value={categorys.id}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Avatar
                          src={`${URL_HOST}${categorys.iconcategory}`}
                          alt={categorys.namecategory}
                          sx={{ width: 32, height: 32 }}
                        />
                        <Typography variant="body1">
                          {categorys.namecategory}
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              คำอธิบาย
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              autoComplete="off"
            />
          </div>
          {msgErr1 && (
            <ErrorMessage
              className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded"
              message={msgErr1}
            ></ErrorMessage>
          )}
        </Modal>
      </div>
    );
  },
);

export default WebsiteModal;
