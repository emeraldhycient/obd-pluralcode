import Layout from '@/components/common/Layout'
import React, { useState, useEffect,useRef } from 'react'
import { Table, Button, Modal, TextInput, Label, Spinner } from 'flowbite-react'
import Header from '@/components/common/Header'
import { createObdMessage, getAllObdMessages } from '@/services/api/obdMessages'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Dashboard() {

    const rootRef = useRef<HTMLDivElement>(null);


    const [isModalShowing, setisModalShowing] = useState(false)
    const [isloading, setisLoading] = useState(false)

    const [messages, setmessages] = useState([])
    const getAllMessage = async () => {
        setisLoading(true)
        try {
            const response = await getAllObdMessages()
            console.log(response.data)
            setmessages(response.data)
            setisLoading(false)
        } catch (error: any) {
            console.log(error?.response)
            setisLoading(false)
        }
    }

    useEffect(() => {
        getAllMessage()
    }, [])


    const [dtc_code, setdtc_code] = useState('')
    const [dtc_meaning, setdtc_meaning] = useState('')
    const [description, setddescription] = useState('')
    const [possible_cause, setpossible_cause] = useState('')

    const handleSubmit = async (e:any) => {
        e.preventDefault()
        setisLoading(true)
        try {
            const response = await createObdMessage({ dtc_code, dtc_meaning, description, possible_cause })
            console.log(response.data)
            toast.success('Successfully added new OBD error code!',{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setisLoading(false)
            getAllMessage()
        } catch (error: any) {
            console.log(error?.response)
            toast.error(error?.response?.data?.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setisLoading(false)
        }
    }

    return (
        <Layout>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div ref={rootRef}>
                <Header title='OBD Devices' description='Here are the list of OBD Devices available on the platform' Right={<button onClick={() => setisModalShowing(true)} className="bg-[#1410B4] text-white px-4 py-1 rounded">Add New</button>} />
                    <Modal
                        show={isModalShowing}
                        size="3xl"
                        popup={true}
                    onClose={() => setisModalShowing(false)}
                    root={rootRef.current ?? undefined}
                    >
                        <Modal.Header />
                        <Modal.Body>
                            <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                                    Add Error Codes
                                </h3>
                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="dtc_code"
                                            value="Dtc Code"
                                        />
                                    </div>
                                    <TextInput
                                        id="dtc_code"
                                        placeholder="dtc code"
                                        value={dtc_code}
                                        onChange={(e) => setdtc_code(e.target.value)}
                                        required={true}
                                    />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="dtc_meaning"
                                            value="Dtc Meaning"
                                        />
                                    </div>
                                    <TextInput
                                        id="dtc_meaning"
                                        type="text"
                                        placeholder='dtc meaning'
                                        value={dtc_meaning}
                                        onChange={(e) => setdtc_meaning(e.target.value)}
                                        required={true}
                                    />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="description"
                                            value="Description"
                                        />
                                    </div>
                                    <TextInput
                                        id="email"
                                        placeholder="description"
                                        value={description}
                                        onChange={(e) => setddescription(e.target.value)}
                                        required={true}
                                    />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="possible_cause"
                                            value="Possible Cause"
                                        />
                                    </div>
                                    <TextInput
                                        id="possible_cause"
                                        type="text"
                                        placeholder='possible cause'
                                        value={possible_cause}
                                        onChange={(e) => setpossible_cause(e.target.value)}
                                        required={true}
                                    />
                                </div>

                                <div className="w-full">
                                    <Button onClick={handleSubmit} color={isloading ? "gray" : "blue"} disabled={isloading} >
                                        Add Error Code
                                    </Button>
                                </div>

                            </div>
                        </Modal.Body>
                    </Modal>
                {
                    isloading ?
                        <div className='flex '>
                            <Spinner
                                aria-label="Extra large spinner example"
                                size="xl"
                            />
                            <p>loading ..</p>
                        </div>
                        :
                        <Table hoverable={true}>
                            <Table.Head className="divide-y">
                                <Table.HeadCell>
                                    dtc_code
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    dtc_meaning
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    possible_cause
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    description
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    <span className="sr-only">
                                        Edit
                                    </span>
                                </Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {
                                    messages?.data?.length > 0 ? messages?.data?.map((message: any) => (
                                        <Table.Row className="divide-y" key={message.id}>
                                            <Table.Cell>
                                                {message.dtc_code}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {message.dtc_meaning}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {message.possible_cause}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {message.description}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <span className="sr-only">
                                                    Edit
                                                </span>
                                            </Table.Cell>
                                        </Table.Row>
                                    )
                                    )
                                        :
                                        <div className='flex justify-center items-center'>
                                            No Data Found
                                        </div>
                                }

                            </Table.Body>
                        </Table>
                }
            </div>
        </Layout>
    )
}
