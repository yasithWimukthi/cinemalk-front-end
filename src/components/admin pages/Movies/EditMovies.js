import './MovieList.css';
import { Modal, Form, Input, Button, InputNumber, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { DatePicker, Space } from 'antd';
import {useEffect, useState} from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {getMovieById, updateMovie} from '../../../API/Admin pages/MoviesAPI';


const EditMovieForm = (props) => {
    const id =  props.id
    const [form] = Form.useForm()
    const [MovieDetails, setMovieDetails] = useState({});


    useEffect(()=>{
        getMovieById("/api/movies/", id)
            .then((res) => {
                const data ={
                    title:   res.data.data.title,
                    release_date:   res.data.data.release_date,
                    overview:   res.data.data.overview,
                    genres:   res.data.data.genres
                }


                form.setFieldsValue({
                    title: res.data.data.title,
                    overview:   res.data.data.overview,
                    genres:   res.data.data.genres
                })

                setMovieDetails(data);

            })
            .catch((err) => {
                console.log('err', err);
            })
    },[])




    const { TextArea } = Input;
    const MySwal = withReactContent(Swal)

    const handleChange = (event) => {
        setMovieDetails({ ...MovieDetails, [event.target.name]: event.target.value })
    }

    const handleSubmit = (formValues) => {

        const newFormData = {
            title: formValues.title,
            release_date: MovieDetails.release_date,
            overview: formValues.overview,
            genres: formValues.genres,

        }
        console.log('formvals', newFormData);
        //call addNewMovie API
        updateMovie("/api/movies/",id, newFormData)
            .then((res) => {
                props.closeModal(); //close the modal
                props.refreshMovieTable();//refresh table with new Movie details
                showSuccessMsg();
                //clear the input fields in the modal
                setMovieDetails({
                    title: '',
                    overview: '',
                    genres: '',
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    //show success message alert
    const showSuccessMsg = async () => {
        await MySwal.fire({
            title: <strong>New Movie Added!</strong>,
            html: <i>You updated  Movie successfully!</i>,
            icon: 'success'
        })
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <Modal title="Edit Movie" visible={true} onCancel={props.closeModal} footer={null}>
            <Form
                name="basic"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
                autoComplete="off"
                onFinish={handleSubmit}
                form = {form}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Movie Name"
                    name="title"
                    tooltip="This is a required field"
                    rules={[{ required: true, message: 'Please input Movie name!' }]}
                >
                    <Input initialvalues={MovieDetails.title} onChange={handleChange}/>
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="overview"
                    tooltip="This is a required field"
                    rules={[{ required: true, message: 'Please enter movie description!' }]}
                >
                    <TextArea rows={3} placeholder="Cinema hall overview" value={MovieDetails.overview} onChange={handleChange}/>
                </Form.Item>

                <Form.Item
                    label="Genres"
                    name="genres"
                    tooltip="This is a required field"
                    rules={[{ required: true, message: 'Please input genres (Use comma to separate each genre)!' }]}
                >
                    <Input value={MovieDetails.genres} onChange={handleChange}/>
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

export default EditMovieForm;