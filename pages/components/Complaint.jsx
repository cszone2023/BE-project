import React, { useState } from 'react';
import { useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react";
import toast from "react-hot-toast";

const Complaint = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [adharID, setAdhar] = useState("");
    const [city, setCity] = useState("");
    const [pincode, setPincode] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const { contract } = useContract("0x60baC4b64e41CfE297234B3Ceee3263A96c64693");
    const { data: nextId } = useContractRead(contract, "nextId")
    const { mutateAsync: fileComplaint } = useContractWrite(contract, "fileComplaint");
    console.log("contract instance:", contract);

    const handleComplaint = async () => {
        if (email.trim() === "" || phone.trim() === "" || adharID.trim() === "" || pincode.trim() === "" || city.trim() === "") {
            toast.error("All fields are required.", {
                id: "complaint-validation-error",
            });
            return;
        }

        // Email validation regex pattern
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Invalid email address.", {
                id: "complaint-validation-error",
            });
            return;
        }

        // Phone validation regex pattern
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone)) {
            toast.error("Invalid phone number. Please enter a 10-digit number.", {
                id: "complaint-validation-error",
            });
            return;
        }

        // Aadhaar ID validation regex pattern
        const aadhaarRegex = /^\d{12}$/;
        if (!aadhaarRegex.test(adharID)) {
            toast.error("Invalid Aadhaar ID. Please enter a 12-digit number.", {
                id: "complaint-validation-error",
            });
            return;
        }

        // Pincode validation regex pattern
        const pincodeRegex = /^[0-9]{6}$/;
        if (!pincodeRegex.test(pincode)) {
            toast.error("Invalid pincode. Please enter a 6-digit number.", {
                id: "complaint-validation-error",
            });
            return;
        }

        const notification = toast.loading("Filing Complaint");
        try {
            const data = await fileComplaint([title, description, adharID, city, pincode, phone, email]);
            toast.success(`Complaint Filed! Note Your ComplaintId:${nextId}`, {
                id: notification,
            });
            console.info("contract call successs", data);
            setTitle("");
            setDescription("");
            setAdhar("");
            setCity("");
            setPincode("");
            setPhone("");
            setEmail("");
        } catch (err) {
            toast.error("Whoops, something went wrong!", {
                id: notification,
            });
            console.error("contract call failure", err);
        }
    }

    return (
        <div className='complaint-container md: mr-[50px] md:ml-[50px]'>
            <p className="complaint-title-red">File Your Complaint Here:</p>
            <div className='md:flex items-center'>
                <p className='complaint-text-margin'>Title: </p>
                <input type="textarea" className='container-input md:w-[500px] w-[300px]' placeholder='Enter Title Here'
                    onChange={(e) => { setTitle(e.target.value) }} />
            </div>
            <div className='md:flex items-center'>
                <p className='complaint-text-margin'>Description: </p>
                <input type="text" className='container-input md:w-[500px] w-[300px]' placeholder='Enter Description Here'
                    onChange={(e) => { setDescription(e.target.value) }} />
            </div>
            <div className='md:flex items-center'>
                <span className='complaint-text-margin'>Aadhaar ID: </span>
                <input type="textarea" className='container-input md:w-[500px] w-[300px]' placeholder='Enter Aadhaar ID Here'
                    onChange={(e) => { setAdhar(e.target.value) }} />
            </div>
            <div className='md:flex items-center'>
                <p className='complaint-text-margin'>City: </p>
                <input type="textarea" className='container-input md:w-[500px] w-[300px]' placeholder='Enter City Here'
                    onChange={(e) => { setCity(e.target.value) }} />
            </div>
            <div className='md:flex items-center'>
                <p className='complaint-text-margin'>Pincode : </p>
                <input type="textarea" className='container-input md:w-[500px] w-[300px]' placeholder='Enter Pincode Here'
                    onChange={(e) => { setPincode(e.target.value) }} />
            </div>
            <div className='md:flex items-center'>
                <p className='complaint-text-margin'>Phone: </p>
                <input type="textarea" className='container-input md:w-[500px] w-[300px]' placeholder='Enter Phone Here'
                    onChange={(e) => { setPhone(e.target.value) }} />
            </div>
            <div className='md:flex items-center'>
                <p className='complaint-text-margin'>Email: </p>
                <input type="email" className='container-input md:w-[500px] w-[300px]' placeholder='Enter Email Here'
                    onChange={(e) => { setEmail(e.target.value) }} required />
            </div>
            <button className="button-common hover:bg-blue-900" onClick={handleComplaint}>File Complaint</button>
        </div>
    )
}

export default Complaint;
