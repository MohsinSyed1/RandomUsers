import axios from "axios";
import React, { useEffect, useState } from "react";
import "./randomUser.css";

const Name = () => {
  const [userInfo, setuserInfo] = useState([]); //useState for setting the intial value to an empty array

  const fetchData = async () => {
    const res = await axios.get("https://randomuser.me/api");
    const mydata = res.data.results;
    setuserInfo([...userInfo, mydata]);
    console.log(userInfo, "userInfo");
  };

  const saveToLocal = () => {
    localStorage.setItem("localCopy", JSON.stringify(userInfo));
  };
  //useEffect to render once at the start of the page
  useEffect(() => {
    fetchData();
  }, []);

  //function to make API requests and set the value to the data

  return (
    <>
      {/* fetch everytime the button is clicked */}
      {/* <h1> Fetch Random User Info</h1> */}
      <button className="button1" onClick={() => fetchData()}>
        Fetch More Users Data
      </button>
      <button className="button2" onClick={() => saveToLocal()}>
        Save To Local
      </button>
      <div>
        {/* map each element and change div content each time it's rendered */}
        {userInfo.map((emp, index) => (
          <div key={index}>
            {/* {emp} */}
            {emp.map((user, i) => {
              const fullName =
                `${user.name.title}` +
                " " +
                `${user.name.first}` +
                " " +
                `${user.name.last}`;
              return (
                <div className="flex" key={i}>
                  <ul className="my-list">
                    <li>
                      <div>Name:. {fullName}</div>
                    </li>
                    <br />
                    <li>Email: {user.email}</li>
                  </ul>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
};

export default Name;
