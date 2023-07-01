import React, { useState } from 'react'
import { useContract, useContractRead } from "@thirdweb-dev/react";

const Status = () => {
    const [id, setId] = useState(0);
    const { contract } = useContract("0x60baC4b64e41CfE297234B3Ceee3263A96c64693");
    const { data: Complaints } = useContractRead(contract, "Complaints", id)
    return (
        <div className='status-container'>
            <div className='status'>
                <p className='status-title'>Check Status of Your Complaint:</p>
                <div className='flex items-center justify-center'>
                    <p className='status-text'>Complaint ID:</p>
                    <input type="number" className='status-input md:w-[300px]' placeholder='Enter Complaint ID'
                        onChange={(e) => { setId(e.target.value) }} />
                </div>
            </div>
            {Complaints && Complaints.title && (
                <div className="status-render-container md:w-[600px]">
                    <p className='status-render-title'>Complaint Details:</p>
                    <p className='status-render-text'>Complaint Id: {(Complaints.id).toString()}</p>
                    <p className='status-render-text'>Complaint by: {(Complaints.complaintRegisteredBy).toString()}</p>
                    <p className='status-render-text'>Complaint Title: {Complaints.title}</p>
                    <p className='status-render-text'>Complaint Description: {Complaints.description}</p>
                    {/* <p className='status-render-text'>adharID: {Complaints.adharID}</p>
                    <p className='status-render-text'>City: {Complaints.city}</p>
                    <p className='status-render-text'>pincode: {Complaints.pincode}</p>
                    <p className='status-render-text'>phone: {Complaints.phone}</p>
                    <p className='status-render-text'>email: {Complaints.email}</p>
 */}

                    <p className='status-render-text'>Approval Status: {Complaints.isApproved ? "Approved" : !Complaints.exists ? "Declined" : "Approval Pending"}</p>
                    <p className='status-render-text'>Approval Remark: {Complaints.approvalRemark}</p>
                    <p className='status-render-text'>Resolution Status: {Complaints.isResolved ? "Resolved" : "Resolution pending"}</p>
                    <p className='status-render-text mb-2'>Resolution Remark: {Complaints.resolutionRemark}</p>
                </div>
            )}

        </div>
    )
}

export default Status