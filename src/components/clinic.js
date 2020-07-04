import React, { useState, useEffect } from "react";
//import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import Details from "./details";



function Clinic() {
    const globalstate = useSelector(state => state);
    const dispatch = useDispatch();
    const [addnewdoc, setAddnewdoc] = useState(false);
    const [tabledata, setTabledata] = useState(globalstate.doctors);
    const [editdoc, setEditdoc] = useState(false);
    const [id, setId] = useState(0);

    useEffect(() => {
        let docsList = JSON.parse(localStorage.getItem("docsList"));
        if (Array.isArray(docsList) && docsList.length) {
            dispatch({ type: "existingDocs", data: docsList });
            setTabledata(docsList);
        }
    }, []);
    useEffect(() => {
        setTabledata(globalstate.doctors);
    }, [globalstate.doctors]);
    function search(word) {
        let searchedword = word.toUpperCase();
        let resultarray = [];
        if (searchedword.indexOf("@") === -1) {
            resultarray = globalstate.doctors.filter((doctor) => doctor.name.toUpperCase().indexOf(searchedword) !== -1);
        }
        else {
            resultarray = globalstate.doctors.filter((doctor) => doctor.email.indexOf(searchedword) !== -1);
        }
        setTabledata(resultarray);

    }
    function edit(id) {
        setEditdoc(true);
        setId(id);
    }

    function closedetails() {
        setId(0);
        setEditdoc(false);
        setAddnewdoc(false);
    }
    return (
        <div className="clinic_page">
            {
                addnewdoc ?
                    <Details name="Add New Staff" action="add" close={closedetails}></Details>
                    : null
            }
            {
                editdoc ?
                    <Details name="Edit Staff" action="edit" id={id} close={closedetails} ></Details>
                    : null
            }

            <div className="clinic_menu">
                <div className="clinic_tag">Clinic Settings
          <div className="clinic_tag_border"></div>
                </div>
                <div className="clinic_menu_butn" ><img className="follow_img" href="" src="" />Clinic Details</div>
                <div className="clinic_menu_butn isActive" ><img className="follow_img" href="" src="" />Clinic Staff</div>
                <div className="clinic_menu_butn" ><img className="follow_img" href="" src="" />Calender</div>
                <div className="clinic_menu_butn" ><img className="follow_img" href="" src="" />Product Catalog</div>
                <div className="clinic_menu_butn" ><img className="follow_img" href="" src="" />Biling Services</div>
            </div>
            <div className="clinic_page_area">
                <div className="clinic_tag">Clinics Staff
          <div className="clinic_staff_border"></div>
                </div>
                <div className="search_and_add_wrapper">
                    <input className="searchbox" type="text" placeholder="Seach Staff" onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            search(e.target.value);
                            e.target.value = "";
                            e.target.blur();

                        }
                    }}></input>
                    <input className="add_doc" type="submit" onClick={() => setAddnewdoc({ addnewdoc: true })} value="Add New Staff"></input>
                </div>
                <div className="table">
                    {globalstate.doctors.length ?
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Role</th>
                                    <th>Email</th>
                                    <th>Last Login</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tabledata.map((doctors) => {
                                    return <tr onClick={() => edit(doctors.id)} key={`docsTable_${doctors.id}`}>
                                        <td>{doctors.name}</td>
                                        <td>{doctors.roles.map((roles) => roles)}</td>
                                        <td>{doctors.email}</td>
                                        <td>N/A</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                        : null
                    }
                </div>
            </div>
        </div>
    );
}

export default Clinic;