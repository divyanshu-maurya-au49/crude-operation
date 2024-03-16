import React, { useEffect, useState } from "react";
import axios from "axios";

function Crud() {
  const data1 = {
    name: "",
    lastname: "",
    email: "",
    password: "",
    project: "",
  };
  const [input, setinputs] = useState(data1);
  const [tabledata, settableData] = useState([]);
  const [editClick, setEditClick] = useState(false);
  const [editIndex, setEditIndex] = useState("");

  const handelChange = (e) => {
    setinputs({ ...input, [e.target.name]: e.target.value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    // for edit data
    //  if(editClick){
    //   const editTableData = tabledata;
    //   Object.assign(editTableData[editIndex], input)
    //   settableData([...editTableData])
    //   setEditClick(false)
    //   setinputs(data1)
    //  }else{
    //   //for submit and save the data in table
    //   settableData([...tabledata, input])
    //   setinputs(data1)
    //  }
    if (!editClick) {
      try {
        const { data } = await axios.post("/api/v1/user/send", {
          name: input.name,
          lastname: input.lastname,
          email: input.email,
          password: input.password,
          project: input.project,
        });
        if (data.success) {
          alert("Data added succesfully");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      axios
        .put(`/api/v1/user/update/${editIndex}`, {
          id: editIndex,
          name: input.name,
          lastname: input.lastname,
          email: input.email,
          password: input.password,
          project: input.project,
        })
        .then(() => {
          // alert("Data Updated Succesfull")
          localStorage.clear();
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getAllData();
  };

  const getAllData = async () => {
    try {
      const { data } = await axios.get("/api/v1/user/get");
      if (data?.success) {
        settableData(data.alldata);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(apidata);
  function handelDelete(id) {
    axios
      .delete(`/api/v1/user/delete/${id}`)
      .then(() => {
        getAllData();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getAllData();
  }, []);
  // const handelDelete = (index)=>{
  //     const deleteData = tabledata.filter((item,i)=>i!==index)
  //     settableData(deleteData)
  //   }

  const handelEdit = (index) => {
    const editData = tabledata[index];
    setinputs({
      name: editData.name,
      lastname: editData.lastname,
      email: editData.email,
      password: editData.password,
      project: editData.project,
    });
    setEditClick(true);
    // setEditIndex(index)
    setEditIndex(editData?._id);
  };

  return (
    <div className="container"> 
      <h1>Crudd operation</h1>
      <div className="row">
        <div className="col">
          <form onSubmit={handelSubmit}>
            <div>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  name="name"
                  value={input.name}
                  onChange={handelChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Lastname</label>
                <input
                  name="lastname"
                  value={input.lastname}
                  onChange={handelChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  name="email"
                  value={input.email}
                  onChange={handelChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  name="password"
                  value={input.password}
                  onChange={handelChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Project</label>
                <input
                  name="project"
                  value={input.project}
                  onChange={handelChange}
                  className="form-control"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                {editClick ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
        <div className="col">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Lastname</th>
                <th scope="col">Email</th>
                <th scope="col">Password</th>
                <th scope="col">Project</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {tabledata.map((item, i) => (
                <tr>
                  <td>{item.name}</td>
                  <td>{item.lastname}</td>
                  <td>{item.email}</td>
                  <td>{item.password}</td>
                  <td>{item.project}</td>
                  <td>
                    <button
                      onClick={() => handelEdit(i)}
                      className="btn btn-primary"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handelDelete(item?._id)}
                      className="btn btn-danger"
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
  );
}

export default Crud;
