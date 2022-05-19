import './MovieList.css';
import {Modal, Form, Input, Button, InputNumber} from 'antd';
import {useEffect, useState} from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { getTheaters, getTheaterById, deleteTheater, updateTheater } from '../../../API/Admin pages/TheatersAPI';
import AddNewTheaterForm from './AddNewTheaterForm';


const Theaters = () => {
    const [form] = Form.useForm();

    let itemCount = 0;
    const { TextArea } = Input;
    const MySwal = withReactContent(Swal)
    const [isEditTheaterModalVisible, setIsEditTheaterModalVisible] = useState(false);
    const [isAddTheaterModalVisible, setIsAddTheaterModalVisible] = useState(false);

    const [loadedTheaters, setLoadedTheaters] = useState([]);
    const [selectedTheater, setDetailsForSelectedTheater] = useState({
        _id: '',
        name: '',
        noOfSeats: 0,
        address: '',
        phone: ''
    });

    const [formData, setFormData] = useState({
        _id: '',
        name: '',
        noOfSeats: 0,
        address: '',
        phone: ''
    })

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    // fetch theater details from backend theater service
    const getAllTheaters = () => {
        getTheaters("/api/theaters")
        .then((res) => {
            setLoadedTheaters(res.data.data);
            setFormData(res.data.data)
        })
        .catch((err) => {
          console.log(err);
        });
    }

    useEffect(() => {
        getAllTheaters(); //details of all theaters will be fetched when component renders for the first time
    }, []);

    //re-render the component everytime when user select a new theator from the table to edit
    useEffect(() => {
        // if selected theater(current one), form-values will be re-initialized with new theater details.
        form.setFieldsValue({
            name: selectedTheater.name,
            noOfSeats: selectedTheater.noOfSeats,
            address: selectedTheater.address,
            phone: selectedTheater.phone
        })
       }, [form, selectedTheater])

    const showEditTheaterModal = (id) => {
        //retrieve details of the selected theater
        getTheaterById("/api/theaters/", id)
            .then((res) => {
                setDetailsForSelectedTheater(res.data.data);
                setIsEditTheaterModalVisible(true);
            })
            .catch((err) => {
                console.log('err', err);
            })        
    };

    const handleEditTheaterModalCancel = () => {
        setIsEditTheaterModalVisible(false);
    };

    const handleAddTheaterModalCancel = () => {
        setIsAddTheaterModalVisible(false);
    }

    //update theater details when form is submitted
    const handleSubmit = (formValues) => {
        //call updated theater API
        updateTheater("/api/theaters/", selectedTheater._id, formValues)
        .then((res) => {
            setIsEditTheaterModalVisible(false) //close the modal
            getAllTheaters();//refresh table with new theater details
            showSuccessMsg();
        })
        .catch((err) => {
          console.log(err);
        });
    };
    
    const showSuccessMsg = async () => {
        await MySwal.fire({
            title: <strong>Updated!</strong>,
            html: <i>Theater details updated successfully</i>,
            icon: 'success'
        })
    }
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const showAddTheaterModal = () => {
        setIsAddTheaterModalVisible(true);
    };

    const handleDelete = (id) => {
        //display confirmation popup
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                //delete the selected theater
                deleteTheater("/api/theaters/", id)
                .then((res) => {
                    console.log('ress', res.data)
                    //show the success message
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                    getAllTheaters();
                })
                .catch((err) => {
                    console.log('err', err);
                }) 
            }
        })
    }

    return (
        <div>

            {/*theaters table*/}
            <div className="row">
                <div className="col-12">
                    <div className="panel">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col col-sm-3 col-xs-12">
                                    <h4 className="title">Theaters</h4>
                                </div>
                                <div className="col-sm-9 col-xs-12 text-right">
                                    <div className="btn_group" style={{display:'flex'}}>
                                        <input type="text" className="form-control" placeholder="Search" style={{width:'90%',height:'50px'}}/>
                                        <button className="btn btn-default mx-3" title="Reload" style={{marginTop:0,width:'20%'}}><i
                                            className="fa-solid fa-magnifying-glass"></i></button>
                                        <button className="btn btn-default" title="Add new" style={{marginTop:0}} onClick={showAddTheaterModal}><i
                                            className="fa-solid fa-plus"></i> Add Theater</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="panel-body table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                    <th></th>
                                    <th>No</th>
                                    <th>Theater</th>
                                    <th>Location</th>
                                    <th>Seat Count</th>
                                    <th>Contact Number</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {loadedTheaters.map((theater) => (
                                        <tr key={theater._id}>
                                            <td></td>
                                            <td>{itemCount++}</td>
                                            <td>{theater.name}</td>
                                            <td>{theater.address}</td>
                                            <td>{theater.noOfSeats}</td>
                                            <td>{theater.phone}</td>
                                            <td>
                                                <ul className="action-list">
                                                    <li><a href="#" data-tip="edit" onClick={() => showEditTheaterModal(theater._id)}><i className="fa fa-edit"></i></a></li>
                                                    <li><a href="#" data-tip="delete" onClick={() => handleDelete(theater._id)}><i className="fa fa-trash"></i></a></li>
                                                </ul>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {/*theaters table end*/}

            {/*Edit theater modal*/}
            <Modal title="Edit Theater" visible={isEditTheaterModalVisible} onCancel={handleEditTheaterModalCancel} footer={null}>
            {console.log('editt', selectedTheater)}
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    autoComplete="off"
                    initialValues={{name: selectedTheater.name,
                        noOfSeats: selectedTheater.noOfSeats,
                        address: selectedTheater.address,
                        phone: selectedTheater.phone}}
                    onFinish={handleSubmit}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Theater Name"
                        name="name"
                        tooltip="This is a required field"
                        rules={[{ required: true, message: 'Please input theater name!' }]}
                    >
                        <Input value={formData.name} onChange={handleChange}/>
                    </Form.Item>

                    <Form.Item
                        label="Location"
                        name="address"
                        tooltip="This is a required field"
                        rules={[{ required: true, message: 'Please select location!' }]}
                    >
                        <TextArea rows={3} placeholder="Cinema hall address" value={formData.address} onChange={handleChange}/>
                    </Form.Item>

                    <Form.Item
                        label="Seat Count"
                        name="noOfSeats"
                        tooltip="This is a required field"
                        rules={[{ required: true, message: 'Please enter the seat count!' }]}
                    >
                        <InputNumber style={{ width: '100%' }} value={formData.noOfSeats} onChange={handleChange}/>
                    </Form.Item>

                    <Form.Item
                        label="Contact No"
                        name="phone"
                        tooltip="This is a required field"
                        rules={[{ required: true, message: 'Please input phone number!' }]}
                    >
                        <Input value={formData.phone} onChange={handleChange}/>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" shape="round" size="large" >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            {/**Add theater modal */}
            {isAddTheaterModalVisible ? <AddNewTheaterForm closeModal={handleAddTheaterModalCancel} refreshTheaterTable={getAllTheaters}/> : null}
        </div>
    )
}

export default Theaters;