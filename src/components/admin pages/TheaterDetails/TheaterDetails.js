import './MovieList.css';

import { Modal, Form, Button, Select, TimePicker, InputNumber} from 'antd';
import './MovieList.css';
import React, {useEffect, useState} from "react";
import {Option} from "antd/es/mentions";
import moment from "moment";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from "axios";
import {useNavigate} from "react-router";


const TheaterDetails = () => {
    const navigate = useNavigate();
    const [isLoggedIn] = React.useState(localStorage.getItem("type"));

    const MySwal = withReactContent(Swal)
    const [isAddMovieModalVisible, setIsAddMovieModalVisible] = useState(false);
    const [isEditMovieModalVisible, setIsEditMovieModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [movieList, setMovieList] = useState([]);
    const [movie, setMovie] = useState({
        movieName: '',
        theaterName:'',
        price: null,
        time: '',
        seatCount: null,
        imageURL: '',
    });
    const [theaterDetailList, setTheaterDetailList] = useState([])
    //fetch theater details from backend
    const [loadedTheaters, setLoadedTheaters] = useState([]);


    const getAllTheaters = () => {
        fetch('http://localhost:8090/api/theaters')
            .then(res => res.json())
            .then(data => {
                setLoadedTheaters(data.data);
                console.log(data.data);
            })
            .catch(err => console.log(err));
    }

    const getAllMovies = () => {
        fetch('http://localhost:8090/api/movies')
            .then(res => res.json())
            .then(data => {
                setMovieList(data);
                console.log(data);
            })
            .catch(err => console.log(err));
    }

    const getAllTheaterDetails = () => {
        fetch('http://localhost:8090/api/theaterDetails')
            .then(res => res.json())
            .then(data => {
                setTheaterDetailList(data.theaterDetails);
                console.log(data);
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        if(isLoggedIn!=="admin")
        {
            navigate("/")
        }
      else
        {
        getAllTheaterDetails();
        getAllTheaters(); // fetch theater details from backend theater service
        getAllMovies(); }// fetch movie details from backend movie service
    }, []);


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
            ...movie,
            theater: {
                name: movie.theaterName,
                price: values.price,
                time: values.time,
                seatCount: values.seatCount
            }

        })
        console.log(movie)
        axios.post('http://localhost:8090/api/theaterDetails/addTheater', movie)
            .then(res => {
                console.log(res);
                setIsAddMovieModalVisible(false);
                getAllTheaterDetails();
            })
            .catch(err => console.log(err));
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    function handleMovieChange(value) {
        let imageUrl;
        let overview;

        movieList.forEach(movie => {
            if(movie.name === value){
                imageUrl = movie.poster;
                overview = movie.overview;
            }
        });
        setMovie({
            ...movie,
            imageURL: imageUrl,
            overview,
            movieName: value,
        })
        console.log(`selected ${value}`);
    }

    function handleTheaterChange(value) {
        setMovie({
            ...movie,
            theaterName: value,
        })
        console.log(`selected ${value}`);
    }

    function onTimeChange(time, timeString) {
        setMovie({
            ...movie,
            time: `${timeString[0]}-${timeString[1]}`
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
                                    <th>Seat Count</th>
                                    <th>Price</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    theaterDetailList && theaterDetailList.length>0 && theaterDetailList.map((theaterDetail, index) => {
                                        return (
                                            theaterDetail.theater.map(theater => {
                                                return (
                                                    <tr key={theater._id}>
                                                        <td>{index+1}</td>
                                                        <td>{theaterDetail.movieName}</td>
                                                        <td>{theater.name}</td>
                                                        <td>{theater.time}</td>
                                                        <td>{theater.seatCount}</td>
                                                        <td>{theater.price}</td>
                                                        <td>
                                                            <ul className="action-list">
                                                                <li><a href="#" data-tip="edit" onClick={showEditMovieModal}><i className="fa fa-edit"></i></a></li>
                                                                <li><a href="#" data-tip="delete" onClick={handleDelete}><i className="fa fa-trash"></i></a></li>
                                                            </ul>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {/*theaters table end*/}

            {/*add movie modal*/}
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
                        ["movieName"]: movie.name,
                        ["theaterName"]: movie.theaterName,
                        ["seatCount"]: movie.seatCount,
                        ["time"]: movie.time,
                        ["price"]: movie.price,
                    }}
                >
                    <Form.Item
                        label="Movie Name"
                        name="movieName"
                        tooltip="This is a required field"
                        rules={[{ required: true, message: 'Please input movie name!' }]}
                    >
                        <Select   onChange={handleMovieChange}>
                            {movieList.map((movie) => (
                                <Option key={movie._id} value={movie.title}>{movie.title}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Theater"
                        name="theaterName"
                        tooltip="This is a required field"
                        rules={[{ required: true, message: 'Please select a theater!' }]}
                    >
                        <Select  onChange={handleTheaterChange}>
                            {loadedTheaters.map((theater) => (
                                <Option key={theater._id} value={theater.name}>{theater.name}</Option>
                            ))}
                        </Select>
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
                        <Button type="primary" htmlType="submit" loading={loading} shape="round" size="large">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            {/*add movie modal end*/}

            {/*add edit modal*/}
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
                        name="movieName"
                        tooltip="This is a required field"
                        rules={[{ required: true, message: 'Please input movie name!' }]}
                    >
                        <Select defaultValue="lucy"  onChange={handleTheaterChange}>
                            {loadedTheaters.map((theater) => (
                                <Option key={theater._id} value={theater.name}>{theater.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Theater"
                        name="theaterName"
                        tooltip="This is a required field"
                        rules={[{ required: true, message: 'Please select a theater!' }]}
                    >
                        <Select defaultValue="Theater"  onChange={handleTheaterChange}>
                            {loadedTheaters.map((theater) => (
                                <Option key={theater._id} value={theater.name}>{theater.name}</Option>
                            ))}
                        </Select>
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
            {/*edit movie modal end*/}
        </div>
    )
}

export default TheaterDetails