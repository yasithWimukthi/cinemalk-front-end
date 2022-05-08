import { Avatar, Modal,Form, Input, Button, Select,TimePicker,InputNumber,Upload, message} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
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
    const [loading, setLoading] = useState(false);
    const {imageLoading,setImageLoading} = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [movie, setMovie] = useState({
        name: '',
        cart: '',
        price: null,
        time: '',
        theater: ''
    });

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
        setMovie({
            name: values.name,
            cast: values.cast,
            price: values.price,
            theater: values.theater
        })
        console.log(movie)
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    function handleChange(value) {
        console.log(`selected ${value}`);
    }

    function onTimeChange(time, timeString) {
        setMovie({
            ...movie,
            time: `${timeString[0]}-${timeString[1]}`
        })
    }

    const onInputChange = (e) => {
        console.log(e)
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

    const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

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

            <Modal title="Add Movie" visible={isAddMovieModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 16 }}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    initialValues={{
                        ["name"]: movie.name,
                        ["cast"]: movie.cast,
                        ["theater"]: movie.theater,
                        ["time"]: movie.time,
                        ["price"]: movie.price,
                    }}
                >
                    <Form.Item
                        label="Movie Name"
                        name="name"
                        tooltip="This is a required field"
                        rules={[{ required: true, message: 'Please input movie name!' }]}
                    >
                        <Input/>
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

                    <Form.Item
                        label="Movie Banner"
                        name="banner"
                        tooltip="This is a required field"
                        rules={[{ required: true, message: 'Please upload an image!' }]}
                    >
                        <Upload {...props}>
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" loading={loading} shape="round" size="large">
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