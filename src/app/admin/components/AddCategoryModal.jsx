import apiForm from "@/config/apiform";
import config from "@/config/configapi";
import Modal from "@/src/components/Modal";
import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import {OpenNotification} from "@/src/components/OpenNotification";
import Image from "next/image";
import ErrorMessage from "@/src/components/ErrorMessage";
import apiauth from "@/config/apiauth";

const AddCategoryModal = forwardRef(
  ({ isAddModalOpen, showModal, get_AllCategory, getId, allCategory }, ref) => {
    const URL_HOST = `${config.API_SERVER}`;
    const [namecategory, setNamecategory] = useState("");
    const [namecategoryMM, setNamecategoryMM] = useState("");
    const [status, setStatus] = useState(true);
    const [msgErr1, setMsgErr1] = useState("");

    const [iconcategory, setIconcategory] = useState(null);
    const [iconPreviewcategory, setIconPreviewcategory] = useState(null);
    const [iconcategoryBackup, setIconcategoryBackup] = useState({});
    const [checkiconcategory, setCheckiconcategory] = useState(false);
    useEffect(() => {
      clearForm();
      if (getId != null) {
        const findone = allCategory.find((obj) => obj.id === getId);
        if (findone) {
          setForm(findone);
        }
      }
    }, [getId, allCategory]);

    const setForm = (findone) => {
      setNamecategory(findone.namecategory);
      setNamecategoryMM(findone.namecategoryMM);
      setStatus(findone.status === 1 ? true : false);
      setIconPreviewcategory(
        findone.iconcategory ? `${URL_HOST}${findone.iconcategory}` : null
      );
      setIconcategory(
        findone.iconcategory ? `${URL_HOST}${findone.iconcategory}` : null
      );
      setIconcategoryBackup(findone.iconcategory);

    };
    const clearForm = () => {
      setNamecategory("");
      setNamecategoryMM("");
      setStatus(true);
      setIconcategory(null);
      setIconPreviewcategory(null);
      setIconcategoryBackup({});
      setCheckiconcategory(false);
      setMsgErr1("");
    };
    useImperativeHandle(ref, () => ({
      clearForm,
      // คุณสามารถเพิ่ม function อื่นๆ ที่ต้องการให้ parent เรียกใช้ได้
      resetToDefaults: () => {
        clearForm();
      },
    }));

    const CreateCategory = async () => {
      if (namecategory === "") {
        setMsgErr1(`กรอกให้ครบถ้วน`);
        return;
      }
      setMsgErr1("");

      const formData = new FormData();
      formData.append("iconcategory", iconcategory);
      formData.append("namecategory", namecategory);
      formData.append("namecategoryMM", namecategoryMM);
      formData.append("status", status ? 1 : 0);

      await apiForm
        .post(`api/category/addCategory`, formData)
        .then((res) => {
          OpenNotification({ message: `เสร็จสิ้น`, type: 1 });
          showModal();
          get_AllCategory();
          return res.data;
        })
        .catch((err) => {
          console.log(err);

          err.response.data.status === 400
            ? OpenNotification({
                message: `มีชื่อนี้แล้ว`,
                type: 3,
              })
            : OpenNotification({ message: `เกิดข้อผิดพลาด`, type: 4 });
        });
    };
    const UpdateCategory = async () => {
      if (namecategory === "") {
        setMsgErr1(`กรอกให้ครบถ้วน`);
        return;
      }
      setMsgErr1("");

      try {
        if (checkiconcategory && iconcategoryBackup !== null) {
          let string = "";
          const array = iconcategoryBackup.split("\\");
          string = "./" + array.join("/");

          await apiauth.post(`api/category/deleteiconcategory`, {
            iconcategoryBackup: string,
            id: getId,
          });
        }
      } catch (e) {}

      const formData = new FormData();
      formData.append("iconcategory", iconcategory);
      formData.append("id", getId);
      formData.append("namecategory", namecategory);
      formData.append("namecategoryMM", namecategoryMM);
      formData.append("checkiconcategory", checkiconcategory);
      formData.append("status", status ? 1 : 0);

      await apiForm
        .put(`api/category/updateCategory`, formData)
        .then((res) => {
          OpenNotification({ message: `เสร็จสิ้น`, type: 1 });
          showModal();
          get_AllCategory();
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
    };
    const handleDelIconCategory = (e) => {
      setIconcategory({});
      setIconPreviewcategory(null);
      setCheckiconcategory(true);
    };
    const handleUploadIconCategory = (e) => {
      if (e.target.files[0].size > 20315594) {
        OpenNotification({
          message: `ขนาดรูปภาพต้องไม่เกิน 20 MB`,
          type: 3,
        });
        return;
      }
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setIconcategory(file);
        setIconPreviewcategory(reader.result);
        setCheckiconcategory(true);
      };
      reader.readAsDataURL(file);
    };
    const modalFooter = (
      <div className="text-center flex justify-center gap-4">
        {getId === null ? (
          <button
            onClick={CreateCategory}
            className="text-center text-white font-semibold px-10 py-2 rounded-md bg-purple-500 hover:bg-purple-800 shadow-md transition-colors"
          >
            เพิ่มหมวดหมู่
          </button>
        ) : (
          <button
            onClick={UpdateCategory}
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
      <Modal
        isOpen={isAddModalOpen}
        onClose={showModal}
        title={getId === null ? "เพิ่มหมวดหมู่" : "แก้ไขหมวดหมู่"}
        footer={modalFooter}
        size="xxl"
      >
        <div className="w-full grid grid-cols-2 gap-5">
          <div className="w-full">
            <div className="grid grid-cols-1 ">
              {/* Icon Upload Section */}
              <div className="rounded-lg shadow-md col-span-1 bg-gray-50">
                <div className="m-4">
                  <div className="flex items-center">
                    <label className="inline-block mb-2 text-gray-500">
                      อัพโหลดไอคอน
                    </label>
                    <button
                      onClick={handleDelIconCategory}
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
                    {iconPreviewcategory ? (
                      <div className="relative h-28 w-28 object-cover">
                        <Image
                          src={iconPreviewcategory}
                          alt="iconCategory"
                          fill
                          priority
                        />
                      </div>
                    ) : (
                      <label className="flex flex-col h-28 w-28 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300 cursor-pointer">
                        <div className="flex flex-col items-center justify-center mt-6">
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
                          onChange={handleUploadIconCategory}
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Status and Name Section */}
          <div className="w-full grid justify-start mt-5 grid-cols-1">
            <div className="w-full">
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
                    status ? "bg-purple-600" : "bg-gray-300"
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
            <div className="w-2"></div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mt-2">
                ชื่อไทย
              </label>
              <input
                type="text"
                value={namecategory}
                onChange={(e) => setNamecategory(e.target.value)}
                className="block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                autoComplete="off"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mt-2">
                ชื่อพม่า
              </label>
              <input
                type="text"
                value={namecategoryMM}
                onChange={(e) => setNamecategoryMM(e.target.value)}
                className="block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                autoComplete="off"
              />
            </div>
          </div>
        </div>
        {msgErr1 && (
          <ErrorMessage
            className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded"
            message={msgErr1}
          ></ErrorMessage>
        )}
      </Modal>
    );
  }
);

export default AddCategoryModal;
