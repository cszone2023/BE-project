import React, { useState } from 'react';
import { useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react";

const Getter = () => {
    const [id, setId] = useState(0);
    const [rId, setRId] = useState(0);
    const [aRemark, setARemark] = useState("");
    const [rRemark, setRRemark] = useState("");
    const { contract } = useContract("0x60baC4b64e41CfE297234B3Ceee3263A96c64693");
    const { data: nextId } = useContractRead(contract, "nextId")
    const { data: pendingApprovals } = useContractRead(contract, "pendingApprovals", 0)
    const { data: pendingResolutions } = useContractRead(contract, "pendingResolutions", 0)
    const { mutateAsync: calcPendingApprovalIds } = useContractWrite(contract, "calcPendingApprovalIds")
    const { mutateAsync: calcPendingResolutionIds } = useContractWrite(contract, "calcPendingResolutionIds")

    const { mutateAsync: approveComplaint } = useContractWrite(contract, "approveComplaint")
    const { mutateAsync: resolveComplaint } = useContractWrite(contract, "resolveComplaint")
    const { mutateAsync: discardComplaint } = useContractWrite(contract, "discardComplaint")

    const { data: Complaints } = useContractRead(contract, "Complaints", id)

    const getPendingApprovals = async () => {
        try {
            const data = await calcPendingApprovalIds([]);
            console.info("contract call successs", data);
        } catch (err) {
            console.error("contract call failure", err);
        }
    }

    const getPendingResolutions = async () => {
        try {
            const data = await calcPendingResolutionIds([]);
            console.info("contract call successs", data);
        } catch (err) {
            console.error("contract call failure", err);
        }
    }

    const handleApproveComplaint = async () => {
        try {
            const data = await approveComplaint([id, aRemark]);
            console.info("contract call successs", data);
        } catch (err) {
            console.error("contract call failure", err);
        }
    }

    const handleDeclineComplaint = async () => {
        try {
            const data = await discardComplaint([id, aRemark]);
            console.info("contract call successs", data);
        } catch (err) {
            console.error("contract call failure", err);
        }
    }

    const handleResolveComplaint = async () => {
        try {
            const data = await resolveComplaint([rId, rRemark]);
            console.info("contract call successs", data);
        } catch (err) {
            console.error("contract call failure", err);
        }
    }

    return (
        <div className='getter-container md:p-[30px]  md:m-5 xl:flex xl:flex-row'>
            <div className='getter-card md:m-5'>
                <p className='getter-card-title'>Pending Approvals</p>
                <div className='flex items-center mt-3'>
                    <button className="button-common hover:bg-blue-900" onClick={getPendingApprovals}>Next Pending Approval ID</button>
                    {
                        pendingApprovals && (
                            <p className='getter-card-number'>: {pendingApprovals.toString()}</p>
                        )
                    }
                </div>

                <div className='md:flex items-center p-2'>
                    <p className='text-2xl font-semibold'>Complaint Id: </p>
                    <input type="number" className='getter-input md:w-[425px]' placeholder='Enter Id Here'
                        onChange={(e) => { setId(e.target.value) }} />
                </div>
                <div className='status-container'>
                {Complaints && Complaints.title && (
                <div className="status-render-container md:w-[600px]">
                    <p className='status-render-title'>Complaint Details:</p>
                    <p className='status-render-text'>Complaint Id: {(Complaints.id).toString()}</p>
                    <p className='status-render-text'>Complaint by: {(Complaints.complaintRegisteredBy).toString()}</p>
                    <p className='status-render-text'>Complaint Title: {Complaints.title}</p>
                    <p className='status-render-text'>Complaint Description: {Complaints.description}</p>
                    <p className='status-render-text'>adharID: {Complaints.adharID}</p>
                    <p className='status-render-text'>City: {Complaints.city}</p>
                    <p className='status-render-text'>pincode: {Complaints.pincode}</p>
                    <p className='status-render-text'>phone: {Complaints.phone}</p>
                    <p className='status-render-text'>email: {Complaints.email}</p>


                    <p className='status-render-text'>Approval Status: {Complaints.isApproved ? "Approved" : !Complaints.exists ? "Declined" : "Approval Pending"}</p>
                    <p className='status-render-text'>Approval Remark: {Complaints.approvalRemark}</p>
                    <p className='status-render-text'>Resolution Status: {Complaints.isResolved ? "Resolved" : "Resolution pending"}</p>
                    <p className='status-render-text mb-2'>Resolution Remark: {Complaints.resolutionRemark}</p>
                </div>
            )}
                </div>
                <div className='md:flex items-center p-2'>
                    <p className='text-2xl font-semibold'>Your Remark: </p>
                    <input type="text" className='getter-input md:w-[425px] pr-8' placeholder='Enter Remark Here'
                        onChange={(e) => { setARemark(e.target.value) }} />
                </div>
                <div className='flex'>
                    <button className="button-common hover:bg-blue-900" onClick={handleApproveComplaint}>Approve Complaint</button>
                    <button className="button-common hover:bg-blue-900" onClick={handleDeclineComplaint}>Decline Complaint</button>
                </div>

            </div>
            <div className='getter-card md:m-5'>
                <p className='getter-card-title'>Pending Resolutions</p>
                <div className='flex items-center mt-3'>
                    <button className="button-common hover:bg-blue-900" onClick={getPendingResolutions}>Next Pending Resolution ID</button>
                    {
                        pendingResolutions && (
                            <p className='getter-card-number'>: {pendingResolutions.toString()}</p>
                        )
                    }

                </div>

                <div className='md:flex items-center p-2'>
                    <p className='text-2xl font-semibold '>Complaint Id: </p>
                    <input type="number" className='getter-input md:w-[425px]' placeholder='Enter Id Here'
                        onChange={(e) => { setRId(e.target.value) }} />
                </div>
                <div className='md:flex items-center p-2'>
                    <p className='text-2xl font-semibold'>Your Remark: </p>
                    <input type="text" className='getter-input md:w-[425px]' placeholder='Enter Remark Here'
                        onChange={(e) => { setRRemark(e.target.value) }} />
                </div>
                <button className="button-common hover:bg-blue-900" onClick={handleResolveComplaint}>Resolve Complaint</button>
            </div>

        </div>
    )
}

export default Getter