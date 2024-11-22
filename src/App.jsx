import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [list, setList] = useState([]);

  const [name,setName] = useState("")
  const [lastname,setLastname] = useState("")
  const [salary,setSalary] = useState("")

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/person");
      setList(res.data);
      console.log(res.data); 
    } catch (error) {
      console.error("Erro ao buscar os dados", error);
    }
  };

  const registerUser = async () => {
    try { 
      await axios.post("http://localhost:8080/api/person",{
        name, lastname, salary
      });
    } catch (error) {
      console.error("Erro ao inserir", error);
    }
  };

  const deleteUser = async (id) => {
    try { 
      await axios.delete(`http://localhost:8080/api/person/${id}`);
      getUsers()
    } catch (error) {
      console.error("Erro ao inserir", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    registerUser()
    getUsers()
  }

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    console.log(name,lastname,salary)
  }, [name,lastname,salary]);


  const ArrayDataItems = ({ items }) => {
    return items.map((user, index) => (
      <tr className="bg-white border-b text-center" key={index}>
        <td className="px-6 py-4">{user.name}</td>
        <td className="px-6 py-4">{user.lastname}</td>
        <td className="px-6 py-4">R${user.salary}</td>
        <td class="px-6 py-4">
          <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => {deleteUser(user.id)}}>Delete</a>
        </td>
      </tr>
    ));
  };

  return (
    <div className="w-full grid grid-cols-2">
      <div className="flex justify-center items-center p-6">
        <div className=" overflow-x-auto shadow-md sm:rounded-lg w-full max-w-4xl bg-slate-500">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 h-auto">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="text-center">
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Surname
                </th>
                <th scope="col" className="px-6 py-3">
                  Salary
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <ArrayDataItems items={list} />
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center w-full">
        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input onChange={(e) => {setName(e.target.value)}} type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Name " required />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input onChange={(e) => {setLastname(e.target.value)}} type="text" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Lastname " required />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input onChange={(e) => {setSalary(e.target.value)}} type="text" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Salary " required />
          </div>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>

      </div>
    </div>
  );
}

export default App;
