import { Avatar, Modal,Form, Input, Button, Select,TimePicker,InputNumber} from 'antd';
import './MovieList.css';
import {useState} from "react";
import {Option} from "antd/es/mentions";
import moment from "moment";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MovieList = () => {
    const MySwal = withReactContent(Swal)
    const [isAddMovieModalVisible, setIsAddMovieModalVisible] = useState(false);
    const [isEditMovieModalVisible, setIsEditMovieModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);

    const showAddMovieModal = () => {
        setIsAddMovieModalVisible(true);
    };

    const showEditMovieModal = () => {
        setIsEditMovieModalVisible(true);
    };

    const handleOk = async () => {
        await MySwal.fire({
            title: <strong>Good job!</strong>,
            html: <i>You clicked the button!</i>,
            icon: 'success'
        })
        setIsAddMovieModalVisible(false);
    };

    const handleCancel = () => {
        setIsAddMovieModalVisible(false);
    };

    const handleEditMovieModalCancel = () => {
        setIsEditMovieModalVisible(false);
    };

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    function handleChange(value) {
        console.log(`selected ${value}`);
    }

    function onTimeChange(time, timeString) {
        console.log(time, timeString);
    }


    return (
        <div>
            <div className="row">
                <div className="col-12">
                    <div className="panel">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col col-sm-3 col-xs-12">
                                    <h4 className="title">Movies</h4>
                                </div>
                                <div className="col-sm-9 col-xs-12 text-right">
                                    <div className="btn_group">
                                        <input type="text" className="form-control" placeholder="Search"/>
                                        <button className="btn btn-default mx-3" title="Reload"><i
                                            className="fa-solid fa-magnifying-glass"></i></button>
                                        <button className="btn btn-default" title="Add new" onClick={showAddMovieModal}><i
                                            className="fa-solid fa-plus"></i> Add Movie</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="panel-body table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Movie Name</th>
                                        <th>Theater</th>
                                        <th>Show Time</th>
                                        <th>Description</th>
                                        <th>Cast</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td> <Avatar src="https://joeschmoe.io/api/v1/random" />Vincent Williamson</td>
                                        <td>31</td>
                                        <td>iOS Developer</td>
                                        <td>Sinaai-Waas</td>
                                        <td>cast</td>
                                        <td>
                                            <ul className="action-list">
                                                <li><a href="#" data-tip="edit" onClick={showEditMovieModal}><i className="fa fa-edit"></i></a></li>
                                                <li><a href="#" data-tip="delete"><i className="fa fa-trash"></i></a></li>
                                            </ul>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <Modal title="Add Movie" visible={isAddMovieModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
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
                        label="Movie Name"
                        name="name"
                        tooltip="This is a required field"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Cast"
                        name="cast"
                        tooltip="This is a required field"
                        rules={[{ required: true, message: 'Please input movie cast!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Theater"
                        name="theater"
                        tooltip="This is a required field"
                        rules={[{ required: true, message: 'Please select a theater!' }]}
                    >
                        <Select defaultValue="lucy"  onChange={handleChange}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="disabled" disabled>
                                Disabled
                            </Option>
                            <Option value="Yiminghe">yiminghe</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Time"
                        name="time"
                        tooltip="This is a required field"
                        rules={[{ required: true, message: 'Please input time!' }]}
                    >
                        <TimePicker.RangePicker onChange={onTimeChange} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
                    </Form.Item>

                    <Form.Item
                        label="Ticket Price"
                        name="price"
                        tooltip="This is a required field"
                        rules={[{ required: true, message: 'Please input ticket price!' }]}
                    >
                        <InputNumber prefix="$" style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" loading shape="round" size="large">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal title="Edit Movie" visible={isEditMovieModalVisible} onOk={handleOk} onCancel={handleEditMovieModalCancel} footer={null}>
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
                        label="Movie Name"
                        name="name"
                        tooltip="This is a required field"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Cast"
                        name="cast"
                        tooltip="This is a required field"
                        rules={[{ required: true, message: 'Please input movie cast!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Theater"
                        name="theater"
                        tooltip="This is a required field"
                        rules={[{ required: true, message: 'Please select a theater!' }]}
                    >
                        <Select defaultValue="lucy"  onChange={handleChange}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="disabled" disabled>
                                Disabled
                            </Option>
                            <Option value="Yiminghe">yiminghe</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Time"
                        name="time"
                        tooltip="This is a required field"
                        rules={[{ required: true, message: 'Please input time!' }]}
                    >
                        <TimePicker.RangePicker onChange={onTimeChange} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
                    </Form.Item>

                    <Form.Item
                        label="Ticket Price"
                        name="price"
                        tooltip="This is a required field"
                        rules={[{ required: true, message: 'Please input ticket price!' }]}
                    >
                        <InputNumber prefix="$" style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" loading shape="round" size="large">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>

    )
}

export default MovieList;