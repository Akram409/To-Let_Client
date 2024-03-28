import Lottie from "lottie-react";
import { Button, Form, Input, Upload, message } from "antd";
import users from "../../../assets/user.json";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import axios from "axios";
import { UploadOutlined } from "@ant-design/icons";

const MyAccount = () => {
  const [openModal, setOpenModal] = useState(false);
  const { user } = useContext(AuthContext);
  console.log(user)
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/user/${user?.email}`
        );
        console.log("sdfhdsj",res);
        setProfile(res.data);
        // console.log("flatdata", res.data);
      } catch (error) {
        console.error("Error fetching flat details:", error);
      }
    };
    getProfile();
  }, [user?.email]);

  console.log("profilettttttt", profile?.user);

  const [updateProfiles, setUpdateProfiles] = useState("");

  const editData = (_id, editData) => {
    console.log("ttttttttttttt", _id);
    console.log("ttttttttttttt", editData);
    setUpdateProfiles(editData);
    setOpenModal(true);
  };

  console.log("updateProfiles", updateProfiles);

  const onFinish = async (values) => {
    const nonEmptyValues = Object.fromEntries(
      Object.entries(values).filter(([key, value]) => value !== "")
    );

    const userData = { ...updateProfiles };

    Object.keys(nonEmptyValues).forEach((key) => {
      if (key === "address" || key === "city" || key === "postalCode") {
        userData.location = {
          ...userData.location,
          [key]: nonEmptyValues[key],
        };
      } else {
        userData[key] = nonEmptyValues[key];
      }
    });

    console.log("Form Data:", userData);

    try {
      const id = updateProfiles?._id;
      console.log(id);
      const response = await axios.patch(
        `http://localhost:5000/user/${id}`,
        userData
      );
      console.log("Response:", response);

      message.success("Update successful");
    } catch (error) {
      console.error("Update failed:", error?.response?.data?.error);
      message.error("Failed to update. Please try again later.");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <div className="flex justify-center gap-16 justify-items-center items-center">
      <div className="flex justify-center items-center mt-5">
        <div className="shadow-lg border-2 border-black rounded-2xl 4">
          <div className=" flex flex-col items-center justify-center p-4 ">
            <div className="">
              <img
                alt="profile"
                src={profile?.user?.user_image}
                className="mx-auto object-cover rounded-full h-32 w-32  border-2 border-white "
              />
            </div>
            <div className="w-[400px] p-2 mt-6 rounded-lg">
              <div className="flex flex-wrap justify-between text-sm text-gray-600 ">
                <div className="flex-1">
                  <p className="flex mr-3 text-lg">
                    First Name : {profile?.user?.firstName}
                  </p>
                  <p className="flex flex-col mt-3 text-lg">
                    Last Name : {profile?.user?.lastName}
                  </p>
                  <p className="flex flex-col mt-3 text-lg">
                    Age:{profile?.user?.age}
                  </p>

                  <p className="flex flex-col mt-3 text-lg">
                    Address: {profile?.user?.location.address}
                  </p>
                  <p className="flex flex-col mt-3 text-lg">
                    City: {profile?.user?.location.city}
                  </p>
                  <p className="flex flex-col mt-3 text-lg mb-5">
                    Postal code: {profile?.user?.location.postalCode}
                  </p>
                  <div className="w-72 mx-auto flex items-center justify-center">
                    <button
                      onClick={() =>
                        editData(profile?.user?._id, profile?.user)
                      }
                      className="bg-green-500 px-12 py-3 text-white p-2 rounded-lg"
                    >
                      Update Profile
                    </button>
                    <div
                      className={`fixed flex justify-center items-center z-[100] ${
                        openModal ? "visible opacity-1" : "invisible opacity-0"
                      } inset-0 backdrop-blur-sm bg-black/20 duration-100`}
                    >
                      <div
                        className={`absolute max-w-md  p-4 text-center bg-white drop-shadow-2xl rounded-lg ${
                          openModal
                            ? "scale-1 opacity-1 duration-300"
                            : "scale-0 opacity-0 duration-150"
                        }`}
                      >
                        <svg
                          onClick={() => setOpenModal(false)}
                          className="w-8 mx-auto mr-0 cursor-pointer"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            <path
                              d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"
                              fill="#c51636"
                            ></path>
                          </g>
                        </svg>
                        <Form
                          name="basic"
                          labelCol={{
                            span: 8,
                          }}
                          wrapperCol={{
                            span: 16,
                          }}
                          initialValues={{
                            firstName: updateProfiles
                              ? updateProfiles?.firstName
                              : "",
                            lastName: updateProfiles
                              ? updateProfiles?.lastName
                              : "",
                            age: updateProfiles ? updateProfiles?.age : "",
                            address: updateProfiles
                              ? updateProfiles?.location?.address
                              : "",
                            city: updateProfiles
                              ? updateProfiles?.location?.city
                              : "",
                            postalCode: updateProfiles
                              ? updateProfiles?.location?.postalCode
                              : "",
                          }}
                          onFinish={onFinish}
                          onFinishFailed={onFinishFailed}
                          autoComplete="on"
                        >
                          <Form.Item
                            label="First Name"
                            name="firstName"
                            className="mb-4"
                            initialValue={
                              updateProfiles ? updateProfiles?.firstName : ""
                            }
                          >
                            <Input
                              placeholder={
                                updateProfiles ? updateProfiles?.firstName : ""
                              }
                            />
                          </Form.Item>
                          <Form.Item
                            label="Last Name"
                            name="lastName"
                            className="mb-4"
                            initialValue={
                              updateProfiles ? updateProfiles?.lastName : ""
                            }
                          >
                            <Input
                              placeholder={
                                updateProfiles ? updateProfiles?.lastName : ""
                              }
                            />
                          </Form.Item>

                          <Form.Item
                            name="age"
                            label="Age"
                            initialValue={
                              updateProfiles ? updateProfiles?.age : ""
                            }
                          >
                            <Input
                              placeholder={
                                updateProfiles ? updateProfiles?.age : ""
                              }
                            />
                          </Form.Item>
                          <Form.Item
                            name="user_image"
                            label="Image"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                          >
                            <Upload
                              name="logo"
                              action="/upload.do"
                              listType="picture"
                            >
                              <Button icon={<UploadOutlined />}>
                                Click to upload Image
                              </Button>
                            </Upload>
                          </Form.Item>

                          <Form.Item
                            label="Address"
                            name="address"
                            className="mb-5 "
                            initialValues={
                              updateProfiles
                                ? updateProfiles?.location?.address
                                : ""
                            }
                          >
                            <Input
                              placeholder={
                                updateProfiles
                                  ? updateProfiles?.location?.address
                                  : ""
                              }
                            />
                          </Form.Item>
                          <Form.Item
                            label="City"
                            name="city"
                            className="mb-5 "
                            initialValues={
                              updateProfiles
                                ? updateProfiles?.location?.city
                                : ""
                            }
                          >
                            <Input
                              placeholder={
                                updateProfiles
                                  ? updateProfiles?.location?.city
                                  : ""
                              }
                            />
                          </Form.Item>
                          <Form.Item
                            label="Postal Code"
                            name="postalCode"
                            className="mb-5 "
                            initialValues={
                              updateProfiles
                                ? updateProfiles?.location?.postalCode
                                : ""
                            }
                          >
                            <Input
                              placeholder={
                                updateProfiles
                                  ? updateProfiles?.location?.postalCode
                                  : ""
                              }
                            />
                          </Form.Item>
                          <Form.Item
                            wrapperCol={{
                              offset: 0,
                              span: 10,
                            }}
                          >
                            <button
                              className="btn btn-wide border-2 border-black btn-accent"
                              type="submit"
                            >
                              SignUp with Email
                            </button>
                          </Form.Item>
                        </Form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Lottie
          animationData={users}
          loop={true}
          style={{ width: "700px", height: "550px" }}
        />
      </div>
    </div>
  );
};

export default MyAccount;
