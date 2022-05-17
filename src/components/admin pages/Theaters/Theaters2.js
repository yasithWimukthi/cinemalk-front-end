import './MovieList.css';
import {Modal, Form, Input, Button, Select, TimePicker, InputNumber} from 'antd';
import {useEffect, useState} from "react";
import {Option} from "antd/es/mentions";
import moment from "moment";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { getTheaters, getTheaterById, deleteTheater, updateTheater } from '../../../API/Admin pages/TheatersAPI';
import { formatCountdown } from 'antd/lib/statistic/utils';
import AddNewTheaterForm from './AddNewTheaterForm';


const Theaters = () => {
    const [form] = Form.useForm();

    let itemCount = 0;
    const { TextArea } = Input;
    const MySwal = withReactContent(Swal)
    const [isEditTheaterModalVisible, setIsEditTheaterModalVisible] = useState(false);
    const [isAddTheaterModalVisible, setIsAddTheaterModalVisible] = useState(false);

    const [loadedTheaters, setLoadedTheaters] = useState([]);
    const [selectedTheaterDetails, setDetailsForSelectedTheater] = useState({
        _id: '',
        name: '',
        noOfSeats: 0,
        address: '',
        phone: ''
    });

    const handleChange = (event) => {
        console.log('changingg', event.target.name, event.target.value);
        setDetailsForSelectedTheater({ ...selectedTheaterDetails, [event.target.name]: event.target.value })
    }

    const getAllTheaters = () => {
        getTheaters("/api/theaters")
        .then((res) => {
            setLoadedTheaters(res.data.data);
            console.log(loadedTheaters);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    useEffect(() => {
        getAllTheaters(); // fetch theater details from backend theater service
    }, []);

    let defaultValues = {
        name: selectedTheaterDetails.name,
        noOfSeats: selectedTheaterDetails.noOfSeats,
        address: selectedTheaterDetails.address,
        phone: selectedTheaterDetails.phone,
    }

    useEffect(() => {
        form.setFieldsValue(defaultValues)
       }, [form, defaultValues])

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
        form.resetFields();
        setIsEditTheaterModalVisible(false);
    };

    const handleAddTheaterModalCancel = () => {
        setIsAddTheaterModalVisible(false);
    }


    const handleSubmit = (formValues) => {
        console.log('Success:', formValues, 'id: ', selectedTheaterDetails._id);
        //call updated theater API
        updateTheater("/api/theaters/", selectedTheaterDetails._id, formValues)
        .then((res) => {
            setIsEditTheaterModalVisible(false) //close the modal
            getAllTheaters();//refresh table with new theater details
            showSuccessMsg();
            //clear the input fields in the modal
            setDetailsForSelectedTheater({
                _id: '',
                name: '',
                noOfSeats: 0,
                address: '',
                phone: ''
            });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    
    const showSuccessMsg = async () => {
        await MySwal.fire({
            title: <strong>Good job!</strong>,
            html: <i>You clicked the button!</i>,
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
                                    <div className="btn_group">
                                        <input type="text" className="form-control" placeholder="Search"/>
                                        <button className="btn btn-default mx-3" title="Reload"><i
                                            className="fa-solid fa-magnifying-glass"></i></button>
                                        <button className="btn btn-default" title="Add new" onClick={showAddTheaterModal}><i
                                            className="fa-solid fa-plus"></i> Add Theater</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="panel-body table-responsive">
                            <table className="table">
                                <thead>
                                <tr>
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
            {console.log('editt', selectedTheaterDetails)}
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    autoComplete="off"
                    initialValues={defaultValues}
                    onFinish={handleSubmit}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Theater Name"
                        name="name"
                        tooltip="This is a required field"
                        rules={[{ required: true, message: 'Please input theater name!' }]}
                    >
                        <Input value={selectedTheaterDetails.name} onChange={handleChange}/>
                    </Form.Item>

                    <Form.Item
                        label="Location"
                        name="address"
                        tooltip="This is a required field"
                        rules={[{ required: true, message: 'Please select location!' }]}
                    >
                        <TextArea rows={3} placeholder="Cinema hall address" value={selectedTheaterDetails.address} onChange={handleChange}/>
                    </Form.Item>

                    <Form.Item
                        label="Seat Count"
                        name="noOfSeats"
                        tooltip="This is a required field"
                        rules={[{ required: true, message: 'Please enter the seat count!' }]}
                    >
                        <InputNumber style={{ width: '100%' }} value={selectedTheaterDetails.noOfSeats} onChange={handleChange}/>
                    </Form.Item>

                    <Form.Item
                        label="Contact No"
                        name="phone"
                        tooltip="This is a required field"
                        rules={[{ required: true, message: 'Please input phone number!' }]}
                    >
                        <Input value={selectedTheaterDetails.phone} onChange={handleChange}/>
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