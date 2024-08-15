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

      <div className="flex justify-center items-center min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl w-full bg-gray-900 rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 bg-gray-800 flex justify-between items-center">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
              onClick={() => setAddUserModalOpen(true)}
            >
              Add User
            </button>
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 ml-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
            />
          </div>
          <div className="overflow-x-auto px-6 py-4 border border-gray-800 ">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-900">
                <tr>
                  {["Si.No", "Name", "Email", "Role", "Status", "Action"].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-gray-900 divide-y divide-gray-700">
                {userData.map((data, index) => (
                  <tr key={data.id} className={index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                      {data.name.toUpperCase()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {data.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {data.role.toUpperCase()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                        onClick={() => openEditModal(data.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
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
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
          <div className="bg-gray-900 p-8 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6 text-center">Edit User Name</h2>
            <Formik
              initialValues={{ username: editName.username }}
              validationSchema={editUserNameValidationSchema}
              onSubmit={handleEditUserName}
            >
              <Form className="space-y-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    New Name
                  </label>
                  <Field
                    name="username"
                    id="username"
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage name="username" component="p" className="mt-2 text-sm text-red-600" />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-900 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={closeEditModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      )}

      {isAddUserModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
          <div className="bg-gray-900 p-8 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6 text-center">Add User</h2>
            <Formik
              initialValues={addUserInitialValues}
              validationSchema={addUserValidationSchema}
              onSubmit={handleAddUser}
            >
              <Form className="space-y-6">
                {["username", "email", "password", "cpassword"].map((field) => (
                  <div key={field}>
                    <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <Field
                      type={field.includes("password") ? "password" : "text"}
                      id={field}
                      name={field}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <ErrorMessage name={field} component="p" className="mt-2 text-sm text-red-600" />
                  </div>
                ))}
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-900 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => setAddUserModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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