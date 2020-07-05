import React, { useState, useEffect } from "react";
//import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";



function Details(props) {
    const globalstate = useSelector(state => state);
    const dispatch = useDispatch();
    const [isDataUpdated, setIsDataUpdated] = useState(false);

    const [isadddoc, setIsadddoc] = useState(false);

    const [newdocInfos, setNewdocInfos] = useState({
        name: "",
        email: "",
        mobileno: null,
        password: "",
        "roles": {
            "Patient Management": false,
            "Patient Payment": false,
            "Dashboard": false,
            "Delete Patients": false,
            "Inventory Management": false,
            "Private chat Management": false
        },
        "clinics": {
            "Dr. Natalia J.Anderson Clinic": false,
            "Dr. Henry E.Cooper Clinic": false
        }
    });
    const [errormsg, setErrormsg] = useState({
        errorname: "",
        erroremail: "",
        errormobileno: "",
        errorpassword: "",
        errorrole: "",
        errorclinic: ""
    })
    useEffect(() => {
        if (props.id!==undefined) {
            let obj= globalstate.doctors[props.id]
            setNewdocInfos({
                name: obj.name,
                email: obj.email,
                mobileno: obj.mobileno,
                password: obj.password,
                "roles": {
                    "Patient Management": obj.roles.includes("Patient Management"),
                    "Patient Payment": obj.roles.includes("Patient Payment"),
                    "Dashboard": obj.roles.includes("Dashboard"),
                    "Delete Patients": obj.roles.includes("Delete Patients"),
                    "Inventory Management": obj.roles.includes("Inventory Management"),
                    "Private chat Management": obj.roles.includes("Private chat Management")
                },
                "clinics": {
                    "Dr. Natalia J.Anderson Clinic": obj.clinics.includes("Dr. Natalia J.Anderson Clinic"),
                    "Dr. Henry E.Cooper Clinic": obj.clinics.includes("Dr. Henry E.Cooper Clinic")
                }
            
        })
    }
    }, [])
    const onChangeCheckHandler = (choose, curInput) => {
        // console.log(newdocInfos[choose][curInput])
        setNewdocInfos({
            ...newdocInfos,
            [choose]: {
                ...newdocInfos[choose],
                [curInput]: !newdocInfos[choose][curInput]
            }
        })
    }

    const modify = (id, action) => {
        // redux abc: []
        let isError = false;
        let errorObj = {
            errorname: "",
            erroremail: "",
            errormobileno: "",
            errorpassword: "",
            errorrole: "",
            errorclinic: ""
        }
        setIsDataUpdated(false);
        if (newdocInfos.name === "") {
            errorObj.errorname = "Name is required";
            isError = true;
        }
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(newdocInfos.email)))
        {
            errorObj.erroremail = "valid email is required";
            isError = true;
        }
        if (String(newdocInfos.mobileno).length < 10 || String(newdocInfos.mobileno).length > 15) {
            errorObj.errormobileno = "valid mobile no. is required";
            isError = true;

        }
        let checkpass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        if (!newdocInfos.password.match(checkpass)) {
             errorObj.errorpassword =  "Password is required";
             isError = true;
        }
        if (!newdocInfos.roles["Patient Management"] && !newdocInfos.roles["Patient Payment"] && !newdocInfos.roles["Private chat Management"] && !newdocInfos.roles["Dashboard"] && !newdocInfos.roles["Delete Patients"] && !newdocInfos.roles["Inventory Management"]) {
            errorObj.errorrole = "Select atleast one role";
            isError = true;
        }
        if (!newdocInfos.clinics["Dr. Natalia J.Anderson Clinic"] && !newdocInfos.clinics["Dr. Henry E.Cooper Clinic"]) {
            errorObj.errorclinic = "Select atleast one clinic";
            isError = true;
        }

        if (isError) {
            setErrormsg({
                ...errorObj
            });
            return;
        }

        if (id === undefined) {
            id = globalstate.doctors.length;
        }
        const objTobeSaved = {
            id: id,
            name: newdocInfos.name,
            email: newdocInfos.email,
            mobileno: newdocInfos.mobileno,
            password: newdocInfos.password,
            roles: [],
            clinics: []
        }
        for (let key in newdocInfos.roles) {
            if (newdocInfos.roles[key] === true) {
                objTobeSaved.roles.push(key);
            }
        }
        for (let key in newdocInfos.clinics) {
            if (newdocInfos.clinics[key] === true) {
                objTobeSaved.clinics.push(key);
            }
        }
        setNewdocInfos({
            name: "",
            email: "",
            mobileno: null,
            password: "",
            "roles": {
                "Patient Management": false,
                "Patient Payment": false,
                "Dashboard": false,
                "Delete Patients": false,
                "Inventory Management": false,
                "Private chat Management": false
            },
            "clinics": {
                "Dr. Natalia J.Anderson Clinic": false,
                "Dr. Henry E.Cooper Clinic": false
            }
        })
        if (action === "add") {
            dispatch({ type: "addnewdoc", data: objTobeSaved });
        }
        if (action === "edit") {
            dispatch({ type: "editdoc", data: objTobeSaved, id: id });
        }
        props.close();
    }


    return (
        <div className="adddoc_wrapper">
            <div className="doc_details">
                <div className="doc_tag">{props.name}
                    <div className="doc_tag_border"></div></div>

                <div className="doc_info_wrapper">
                    <div className="doc_info">Name<span className="star">*</span>
                        <input type="text" className="doc_text" value={newdocInfos.name}
                            onChange={(e) => {
                                let target = e.target;
                                let targetVal = target && target.value;
                                setNewdocInfos({
                                    ...newdocInfos,
                                    name: targetVal
                                });
                                setIsDataUpdated(true);
                            }} />
                        <span className="errorSpan">{errormsg.errorname}</span>
                    </div>
                    <div className="doc_info">Email<span className="star">*</span>
                        <input type="text" className="doc_text" value={newdocInfos.email}
                            onChange={(e) => {
                                let target = e.target;
                                let targetVal = target && target.value;
                                setNewdocInfos({
                                    ...newdocInfos,
                                    email: targetVal
                                });
                                setIsDataUpdated(true);
                                console.log(newdocInfos);
                            }} />
                        <span className="errorSpan">{errormsg.erroremail}</span>
                    </div>
                    <div className="doc_row">
                        <div className="doc_info doc_row_elemt">Mobile no.<span className="star">*</span>
                            <div className="mobile">
                                <input type="text" className="doc_text country_code" value="+91(IND)" />
                                <input type="number" className="doc_text mobileno" value={newdocInfos.mobileno}
                                    onChange={(e) => {
                                        let target = e.target;
                                        let targetVal = target && target.value;
                                        setNewdocInfos({
                                            ...newdocInfos,
                                            mobileno: targetVal
                                        });
                                        setIsDataUpdated(true);
                                    }} />
                            </div>
                            <span className="errorSpan">{errormsg.errormobileno}</span>
                        </div>
                        <div className="doc_info doc_row_elemt">Password
                <input type="password" className="doc_text" value={newdocInfos.password}
                                onChange={(e) => {
                                    let target = e.target;
                                    let targetVal = target && target.value;
                                    setNewdocInfos({
                                        ...newdocInfos,
                                        password: targetVal
                                    });
                                    setIsDataUpdated(true);
                                }} />
                            <span className="errorSpan">{errormsg.errorpassword}</span>
                        </div>
                    </div>
                </div>
                <div className="doc_info choices">
                    <b>Role<span className="star">*</span></b>
                    <span className="errorSpan">{errormsg.errorrole}</span>
                    <div className="roles">
                        <div>
                            <label style={{color: newdocInfos["roles"]["Patient Management"] ? "rgb(51, 124, 223)" : ""}}>
                                <input type="checkbox" checked={newdocInfos["roles"]["Patient Management"]} onChange={() => onChangeCheckHandler("roles", "Patient Management")}></input>
                                Patient Management
                            </label>
                            < label style={{color: newdocInfos["roles"]["Patient Payment"] ? "rgb(51, 124, 223)" : ""}}>
                                <input type="checkbox" checked={newdocInfos["roles"]["Patient Payment"]} onChange={() => onChangeCheckHandler("roles", "Patient Payment")}></input>
                          Patient Payment
                          </label>
                            <label  style={{color: newdocInfos["roles"]["Dashboard"] ? "rgb(51, 124, 223)" : ""}}>
                                <input type="checkbox" checked={newdocInfos["roles"]["Dashboard"]} onChange={() => onChangeCheckHandler("roles", "Dashboard")}></input>
                          Dashboard
                          </label>
                        </div>
                        <div>
                            <label  style={{color: newdocInfos["roles"]["Delete Patients"] ? "rgb(51, 124, 223)" : ""}}>
                                <input type="checkbox" checked={newdocInfos["roles"]["Delete Patients"]} onChange={() => onChangeCheckHandler("roles", "Delete Patients")}></input>
                          Delete Patients
                          </label>
                            <label  style={{color: newdocInfos["roles"]["Inventory Management"] ? "rgb(51, 124, 223)" : ""}}>
                                <input type="checkbox" checked={newdocInfos["roles"]["Inventory Management"]} onChange={() => onChangeCheckHandler("roles", "Inventory Management")}></input>
                          Inventory Management
                          </label>
                            <label  style={{color: newdocInfos["roles"]["Private chat Management"] ? "rgb(51, 124, 223)" : ""}}>
                                <input type="checkbox" checked={newdocInfos["roles"]["Private chat Management"]} onChange={() => onChangeCheckHandler("roles", "Private chat Management")}></input>
                          Private chat Management
                          </label>
                        </div>
                    </div>
                </div>
                <div className="doc_info">
                    <b>Clinics<span className="star">*</span></b>
                    <span className="errorSpan">{errormsg.errorclinic}</span>
                    <div className="clinics">
                        <label style={{color: newdocInfos["clinics"]["Dr. Natalia J.Anderson Clinic"] ? "rgb(51, 124, 223)" : ""}}>
                            <input type="checkbox" checked={newdocInfos["clinics"]["Dr. Natalia J.Anderson Clinic"]} onChange={() => onChangeCheckHandler("clinics", "Dr. Natalia J.Anderson Clinic")}></input>
                          Dr. Natalia J.Anderson Clinic
                          </label>
                        <label style={{color: newdocInfos["clinics"]["Dr. Henry E.Cooper Clinic"] ? "rgb(51, 124, 223)" : ""}}>
                            <input type="checkbox" checked={newdocInfos["clinics"]["Dr. Henry E.Cooper Clinic"]} onChange={() => onChangeCheckHandler("clinics", "Dr. Henry E.Cooper Clinic")}></input>
                          Dr. Henry E.Cooper Clinic
                          </label>
                    </div>
                </div>

                <div className="edit_button_wrapper">
                    <input className="edit_button save" value="Save" onClick={() => modify(props.id,props.action)} type="submit" disabled={!isDataUpdated}></input>
                    <input className="edit_button cancel" value="Cancel" onClick={() => {
                        props.close();
                        setIsDataUpdated(false);
                    }} type="submit"></input>
                </div>

            </div>
        </div>

    );
}

export default Details;
