import './MovieList.css';
import {Modal, Form, Input, Button, InputNumber} from 'antd';
import { useState} from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { addTheater } from '../../../API/Admin pages/TheatersAPI';


const AddNewTheaterForm = (props) => { 

    const { TextArea } = Input;
    const MySwal = withReactContent(Swal)

    const [theaterDetails, setTheaterDetails] = useState({
        _id: '',
        name: '',
        noOfSeats: 0,
        address: '',
        phone: ''
    });

    const handleChange = (event) => {
        setTheaterDetails({ ...theaterDetails, [event.target.name]: event.target.value })
    }

    const handleSubmit = (formValues) => {
        //call addNewTheater API
        addTheater("/api/theaters", formValues)
        .then((res) => {
            props.closeModal(); //close the modal
            props.refreshTheaterTable();//refresh table with new theater details
            showSuccessMsg();
            //clear the input fields in the modal
            setTheaterDetails({
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
            title: <strong>Success!</strong>,
            html: <i>You added new theater!</i>,
            icon: 'success'
        })
    }
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    return (
        <Modal title="Add Theater" visible={true} onCancel={props.closeModal} footer={null}>
                <Form
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    autoComplete="off"
                    onFinish={handleSubmit}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Theater Name"
                        name="name"
                        tooltip="This is a required field"
                        rules={[{ required: true, message: 'Please input theater name!' }]}
                    >
                        <Input value={theaterDetails.name} onChange={handleChange}/>
                    </Form.Item>

                    <Form.Item
                        label="Location"
                        name="address"
                        tooltip="This is a required field"
                        rules={[{ required: true, message: 'Please select location!' }]}
                    >
                        <TextArea rows={3} placeholder="Cinema hall address" value={theaterDetails.address} onChange={handleChange}/>
                    </Form.Item>

                    <Form.Item
                        label="Seat Count"
                        name="noOfSeats"
                        tooltip="This is a required field"
                        rules={[{ required: true, message: 'Please enter the seat count!' }]}
                    >
                        <InputNumber style={{ width: '100%' }} value={theaterDetails.noOfSeats} onChange={handleChange}/>
                    </Form.Item>

                    <Form.Item
                        label="Contact No"
                        name="phone"
                        tooltip="This is a required field"
                        rules={[{ required: true, message: 'Please input phone number!' }]}
                    >
                        <Input value={theaterDetails.phone} onChange={handleChange}/>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" shape="round" size="large" >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
    )
}

export default AddNewTheaterForm;