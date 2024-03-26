import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import axios from "../../axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { editUserNameValidationSchema } from "../../FormValidation/editUserNameSechema";
import { addUserValidationSchema } from "../../FormValidation/addUserValidation";

function AdmDash() {
  const [search, setSearch] = useState("");
  const [userData, setUserData] = useState([]);

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editName, setEditName] = useState({
    username: "",
    id: "",
    value: "",
    user_id: "",
  });





  const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);

  const addUserInitialValues = {
    username : "",
    email : "",
    password : "",
    cpassword : "" 
  }




  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/admin/fetch-user-admin${search ? `?search=${search}` : ""}`
        );

        const usersWithId = response.data.data.map((user, index) => ({
          ...user,
          id: index + 1,
        }));
        setUserData(usersWithId);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [search]);

  //Edit user data
  const openEditModal = (id) => {
    const userEdit = userData.find((item) => item.id === id);
    setEditName({
      username: userEdit.name,
      id: userEdit.id,
      value: "",
      user_id: userEdit._id,
    });
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  const handleEditUserName = async (value) => {
    try {
      const { username } = value;

      const newName = await axios.post("/admin/edit-user", {
        user_id: editName.user_id,
        username,
      });

      setEditModalOpen(false);

      const editUserData = await axios.get("/admin/fetch-user-admin");
      const usersWithId = editUserData.data.data.map((user, index) => ({
        ...user,
        id: index + 1,
      }));

      setUserData(usersWithId);
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  //delete a user

  const handleDeleteUser = async (id) => {
    try {
      const deleteUser = userData.find((item) => item.id === id);
      console.log(deleteUser, "deleteeee");

      const confirmDelete = window.confirm(
        `Are you sure you want to delete the user ${deleteUser.name}?`
      );
      if (!confirmDelete) return; 

      await axios.delete("/admin/delete-user", {
        data: { id: deleteUser._id },
      });
      const editUserData = await axios.get("/admin/fetch-user-admin");
      const usersWithId = editUserData.data.data.map((user, index) => ({
        ...user,
        id: index + 1,
      }));

      setUserData(usersWithId);
    } catch (error) {
      console.log("Delete user error", error);
    }
  };


  //add user

  const handleAddUser = async (values) => {
    const { username, email, password } = values
    const newData = await axios.post('/admin/add-new-user',values)
    
    const editUserData = await axios.get("/admin/fetch-user-admin");
    const usersWithId = editUserData.data.data.map((user, index) => ({
      ...user,
      id: index + 1,
    }));

    setUserData(usersWithId);
    setAddUserModalOpen(false)
  }

  return (
    <>
      <AdminNavbar />

      <div className="flex justify-center items-center -mt-16 min-h-screen ">
        <div className="max-w-6xl w-full bg-gray-900  rounded-lg p-6 relative shadow-lg shadow-blue-800/40">
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
            className="absolute top-0 right-0 mt-6 mr-4 px-4 py-2 border border-blue-500 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white"
          />
          <button className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:shadow-outline-blue active:bg-gray-600 transition duration-150 ease-in-out "
          onClick={()=>setAddUserModalOpen(true)}
          >
            Add User
          </button>
          <table className="min-w-full divide-y divide-gray-200 mt-6 ">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
                  Si.No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-900 divide-y divide-gray-600">
              {userData.map((data, index) => (
                <tr key={data.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-100">
                    {" "}
                    {index + 1}{" "}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-100">
                    {" "}
                    {data.name.toUpperCase()}{" "}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-100">
                    {data.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-100">
                    {" "}
                    {data.role.toUpperCase()}{" "}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="px-4 py-2 font-medium text-sm text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
                      onClick={() => openEditModal(data.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="ml-2 px-4 py-2 font-medium text-sm text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
                      onClick={() => handleDeleteUser(data.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
          <div className="bg-gray-900 p-8 rounded-lg z-10 ">
            <h2 className="text-xl font-bold mb-4 text-white">
              Edit User Name
            </h2>
            <Formik
              initialValues={{ username: editName.username }}
              validationSchema={editUserNameValidationSchema}
              onSubmit={handleEditUserName}
            >
              <Form>
                <label className="block mb-2 text-gray-400">New Name:</label>
                <Field
                  name="username"
                  id="username"
                  type="text"
                  className="border px-4 py-2 mb-4 mr-3 rounded-md bg-gray-800 text-white"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Save
                </button>
                <button
                  className="ml-2 px-4 py-2 bg-gray-400 text-white rounded-lg"
                  onClick={closeEditModal}
                >
                  Cancel
                </button>
                <br />
                <ErrorMessage
                  name="username"
                  component="small"
                  style={{ color: "red" }}
                />
              </Form>
            </Formik>
          </div>
        </div>
      )}

      {isAddUserModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-950 bg-opacity-50">
          <div className="bg-gray-900 w-1/3 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-white">Add User</h2>
            <Formik
            initialValues={addUserInitialValues}
            validationSchema={addUserValidationSchema}
            onSubmit={handleAddUser}
            >
            <Form >
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-400 mb-1">
                  Username
                </label>
                <Field
                  type="text"
                  id="username"
                  name="username"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-gray-800 text-gray-300"
                  required
                />
                <ErrorMessage name="username" component="small" style={{ color: 'red' }} />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-400 mb-1">
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-gray-800 text-gray-300"
                  required
                />
                <ErrorMessage name="email" component="small" style={{ color: 'red' }} />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-400 mb-1">
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-gray-800 text-gray-300"
                  required
                />
                <ErrorMessage name="password" component="small" style={{ color: 'red' }} />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="block text-gray-400 mb-1"
                >
                  Confirm Password
                </label>
                <Field
                  type="password"
                  id="cpassword"
                  name="cpassword"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-gray-800 text-gray-300"
                  required
                />
                <ErrorMessage name="cpassword" component="small" style={{ color: 'red' }} />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 mr-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 focus:outline-none focus:bg-gray-300"
                  onClick={()=>setAddUserModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-blue-950 focus:outline-none focus:shadow-outline-blue active:bg-gray-600 transition duration-150 ease-in-out"
                >
                  Submit
                </button>
              </div>
            </Form>
            </Formik>
          </div>
        </div>
      )}
    </>
  );
}

export default AdmDash;
