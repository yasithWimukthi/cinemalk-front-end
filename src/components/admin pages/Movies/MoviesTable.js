import './MovieList.css';
import { Modal, Form, Input, Button, InputNumber, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { DatePicker, Space } from 'antd';
import React, {useEffect, useState} from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { getMovies, getMovieById, deleteMovie, updateMovie } from '../../../API/Admin pages/MoviesAPI';
import AddNewMovieForm from './AddNewMovieForm';
import {useNavigate} from "react-router";
import EditMovieForm from "./EditMovies";


const Movies = () => {
    const [form] = Form.useForm();


function handleDateInput(date, dateString) {
  console.log(date, dateString);
}

    const navigate = useNavigate();
    const [isLoggedIn] = React.useState(localStorage.getItem("type"));


    let itemCount = 0;
    const { TextArea } = Input;
    const MySwal = withReactContent(Swal)
    const [isEditMovieModalVisible, setIsEditMovieModalVisible] = useState(false);
    const [isAddMovieModalVisible, setIsAddMovieModalVisible] = useState(false);
    const [updateId,setUpdate]= useState("");
    const [loadedMovies, setLoadedMovies] = useState([]);
    const [selectedMovie, setDetailsForSelectedMovie] = useState({
        _id: '',
        title: '',
        release_date: 0,
        overview: '',
        genres: [],
        
    });

    const [formData, setFormData] = useState({
        _id: '',
        title: '',
        release_date: 0,
        overview: '',
        genres: ''
    })

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    // fetch Movie details from backend Movie service
    const getAllMovies = () => {
        getMovies("/api/movies/")
            .then((res) => {
            console.log('result', res.data);
            setLoadedMovies(res.data);
            setFormData(res.data)
        })
        .catch((err) => {
          console.log(err);
        });
    }

    useEffect(() => {

        if(isLoggedIn!=="admin")
        {
            navigate("/")
        }else
        {
            getAllMovies();
        }


         //details of all Movies will be fetched when component renders for the first time
    }, []);

    //re-render the component everytime when user select a new theator from the table to edit
    useEffect(() => {
        // if selected Movie(current one), form-values will be re-initialized with new Movie details.
        form.setFieldsValue({
            title: selectedMovie.title,
            release_date: selectedMovie.release_date,
            overview: selectedMovie.overview,
            genres: selectedMovie.genres
        })
       }, [form, selectedMovie])

    const showEditMovieModal = (id) => {

        setUpdate(id)
        setIsEditMovieModalVisible(true);

    };

    const handleEditMovieModalCancel = () => {
        setIsEditMovieModalVisible(false);
    };

    const handleAddMovieModalCancel = () => {
        setIsAddMovieModalVisible(false);
    }

    //update Movie details when form is submitted
    const handleSubmit = (formValues) => {
        //call updated Movie API
        updateMovie("/api/Movies/", selectedMovie._id, formValues)
        .then((res) => {
            setIsEditMovieModalVisible(false) //close the modal
            getAllMovies();//refresh table with new Movie details
            showSuccessMsg();
        })
        .catch((err) => {
          console.log(err);
        });
    };
    
    const showSuccessMsg = async () => {
        await MySwal.fire({
            title: <strong>Updated!</strong>,
            html: <i>Movie details updated successfully</i>,
            icon: 'success'
        })
    }
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const showAddMovieModal = () => {
        setIsAddMovieModalVisible(true);
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
                //delete the selected Movie
                deleteMovie("/api/Movies/", id)
                .then((res) => {
                    console.log('ress', res.data)
                    //show the success message
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                    getAllMovies();
                })
                .catch((err) => {
                    console.log('err', err);
                }) 
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

            {/*Movies table*/}
            <div className="row">
                <div className="col-12">
                    <div className="panel">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col col-sm-3 col-xs-12">
                                    <h4 className="title">Movies</h4>
                                </div>
                                <div className="col-sm-9 col-xs-12 text-right">
                                    <div className="btn_group" style={{display:'flex'}}>
                                        <input type="text" className="form-control" style={{width:'90%',height:'50px'}}  placeholder="Search"/>
                                        <button className="btn btn-default mx-3" title="Reload" style={{marginTop:0,width:'20%'}}><i
                                            className="fa-solid fa-magnifying-glass"></i></button>
                                        <button className="btn btn-default" title="Add new" style={{marginTop:0}} onClick={showAddMovieModal}><i
                                            className="fa-solid fa-plus"></i> Add Movie</button>
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
                                    <th>Movie Name</th>
                                    <th>Released Date</th>
                                    <th>Overview</th>
                                    <th>Genres</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {loadedMovies.map((Movie) => (
                                        <tr key={Movie._id}>
                                            <td></td>
                                            <td>{itemCount++}</td>
                                            <td>{Movie.title}</td>
                                            <td>{Movie.release_date}</td>
                                            <td>{Movie.overview}</td>
                                            <td>{Movie.genres}</td>
                                            <td>
                                                <ul className="action-list">
                                                    <li><a href="#" data-tip="edit" onClick={() => showEditMovieModal(Movie._id)}><i className="fa fa-edit"></i></a></li>
                                                    <li><a href="#" data-tip="delete" onClick={() => handleDelete(Movie._id)}><i className="fa fa-trash"></i></a></li>
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
            {/*Movies table end*/}




            {isEditMovieModalVisible ? <EditMovieForm id ={updateId} closeModal={handleEditMovieModalCancel} refreshMovieTable={getAllMovies}/> : null}
            {/**Add Movie modal */}
            {isAddMovieModalVisible ? <AddNewMovieForm closeModal={handleAddMovieModalCancel} refreshMovieTable={getAllMovies}/> : null}
        </div>
    )
}

export default Movies;