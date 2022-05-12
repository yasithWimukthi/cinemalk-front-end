import './MovieList.css';
import {Modal, Form, Input, Button, Select, TimePicker, InputNumber} from 'antd';
import {useState} from "react";
import {Option} from "antd/es/mentions";
import moment from "moment";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Theaters = () => {
    const { TextArea } = Input;
    const MySwal = withReactContent(Swal)
    const [isAddTheaterModalVisible, setIsAddTheaterModalVisible] = useState(false);
    const [isEditTheaterModalVisible, setIsEditTheaterModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [theater, setTheater] = useState({
        theaterName: '',
        location:'',
        seatCount: null,
        openTime: '',
    });

    const showAddTheaterModal = () => {
        setIsAddTheaterModalVisible(true);
    };

    const showEditTheaterModal = () => {
        setIsEditTheaterModalVisible(true);
    };

    const handleOk = async () => {
        await MySwal.fire({
            title: <strong>Good job!</strong>,
            html: <i>You clicked the button!</i>,
            icon: 'success'
        })
        setIsAddTheaterModalVisible(false);
    };

    const handleCancel = () => {
        setIsAddTheaterModalVisible(false);
    };

    const handleEditTheaterModalCancel = () => {
        setIsEditTheaterModalVisible(false);
    };

    const onFinish = (values) => {
        setTheater({
            theaterName: values.theaterName,
            location: values.location,
            openTime: values.openTime,
            seatCount: values.seatCount
        })
        console.log(theater)
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    function handleChange(value) {
        console.log(`selected ${value}`);
    }

    function onTimeChange(time, timeString) {
        setTheater({
            ...theater,
            openTime: `${timeString[0]}-${timeString[1]}`
        })
    }


    const handleDelete = () => {
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
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
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
                                    <th>#</th>
                                    <th>Theater</th>
                                    <th>Location</th>
                                    <th>Seat Count</th>
                                    <th>Open Time</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Theater name</td>
                                    <td>Location</td>
                                    <td>Seat Count</td>
                                    <td>Open Time</td>
                                    <td>
                                        <ul className="action-list">
                                            <li><a href="#" data-tip="edit" onClick={showEditTheaterModal}><i className="fa fa-edit"></i></a></li>
                                            <li><a href="#" data-tip="delete" onClick={handleDelete}><i className="fa fa-trash"></i></a></li>
                                        </ul>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {/*theaters table end*/}

            {/*add movie modal*/}
            <Modal title="Add Theater" visible={isAddTheaterModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 16 }}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    initialValues={{
                        ["theaterName"]: theater.theaterName,
                        ["seatCount"]: theater.seatCount,
                        ["openTime"]: theater.openTime,
                        ["location"]: theater.location,
                    }}
                >
                    <Form.Item
                        label="Theater Name"
                        name="theaterName"
                        tooltip="This is a required field"
                        rules={[{ required: true, message: 'Please input theater name!' }]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Location"
                        name="location"
                        tooltip="This is a required field"
                        rules={[{ required: true, message: 'Please select location!' }]}
                    >
                        <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} />
                    </Form.Item>

                    <Form.Item
                        label="Seat Count"
                        name="seatCount"
                        tooltip="This is a required field"
                        rules={[{ required: true, message: 'Please input movie cast!' }]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        label="Open Time"
                        name="openTime"
                        tooltip="This is a required field"
                        rules={[{ required: true, message: 'Please input time!' }]}
                    >
                        <TimePicker.RangePicker onChange={onTimeChange} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" loading={loading} shape="round" size="large">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            {/*add movie modal end*/}

            {/*add edit modal*/}
            <Modal title="Edit Theater" visible={isEditTheaterModalVisible} onOk={handleOk} onCancel={handleEditTheaterModalCancel} footer={null}>
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Theater Name"
                        name="theaterName"
                        tooltip="This is a required field"
                        rules={[{ required: true, message: 'Please input theater name!' }]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Location"
                        name="location"
                        tooltip="This is a required field"
                        rules={[{ required: true, message: 'Please select location!' }]}
                    >
                        <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} />
                    </Form.Item>

                    <Form.Item
                        label="Seat Count"
                        name="seatCount"
                        tooltip="This is a required field"
                        rules={[{ required: true, message: 'Please input movie cast!' }]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        label="Open Time"
                        name="openTime"
                        tooltip="This is a required field"
                        rules={[{ required: true, message: 'Please input time!' }]}
                    >
                        <TimePicker.RangePicker onChange={onTimeChange} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" loading shape="round" size="large">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            {/*edit movie modal end*/}
        </div>
    )
}

export default Theaters;