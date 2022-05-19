import './MovieList.css';
import { Modal, Form, Input, Button, InputNumber, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { DatePicker, Space } from 'antd';
import { useState} from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { addMovie } from '../../../API/Admin pages/MoviesAPI';


const AddNewMovieForm = (props) => { 

    function handleDateInput(date, dateString) {
        console.log('date', parseInt(dateString));
        setMovieDetails({ ...MovieDetails, release_date: parseInt(dateString) });
      }

    const { TextArea } = Input;
    const MySwal = withReactContent(Swal)

    const [MovieDetails, setMovieDetails] = useState({
        _id: '',
        title: '',
        release_date: 0,
        overview: '',
        genres: [],
        image: ''
    });

    const handleImgUpload = (e) => {
        console.log('img', e.file);
        setMovieDetails({ ...MovieDetails, image: e.file })
    }

    const handleChange = (event) => {
        setMovieDetails({ ...MovieDetails, [event.target.name]: event.target.value })
    }

    const handleSubmit = (formValues) => {
        const newFormData = {
            title: formValues.title,
            release_date: MovieDetails.release_date,
            overview: formValues.overview,
            genres: formValues.genres,
            image: MovieDetails.image
        }
        console.log('formvals', newFormData);
        //call addNewMovie API
        addMovie("/api/movies", newFormData)
        .then((res) => {
            props.closeModal(); //close the modal
            props.refreshMovieTable();//refresh table with new Movie details
            showSuccessMsg();
            //clear the input fields in the modal
            setMovieDetails({
                _id: '',
                title: '',
                release_date: 0,
                overview: '',
                genres: '',
                image: '',
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
            html: <i>You added new Movie successfully!</i>,
            icon: 'success'
        })
    }
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    

    return (
        <Modal title="Add Movie" visible={true} onCancel={props.closeModal} footer={null}>
                <Form
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    autoComplete="off"
                    onFinish={handleSubmit}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Movie Name"
                        name="title"
                        tooltip="This is a required field"
                        rules={[{ required: true, message: 'Please input Movie name!' }]}
                    >
                        <Input value={MovieDetails.title} onChange={handleChange}/>
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
                        label="Released Year"
                        name="release_date"
                        tooltip="This is a required field"
                        rules={[{ required: true, message: 'Please enter the released year!' }]}
                    >
                        {/* <InputNumber style={{ width: '100%' }} value={formData.release_date} onChange={handleChange}/> */}
                        <DatePicker onChange={handleDateInput} picker="year" />
                    </Form.Item>

                    <Form.Item
                        label="Genres"
                        name="genres"
                        tooltip="This is a required field"
                        rules={[{ required: true, message: 'Please input genres (Use comma to separate each genre)!' }]}
                    >
                        <Input value={MovieDetails.genres} onChange={handleChange}/>
                </Form.Item>
                
                <Form.Item
                        label="Movie Banner"
                        name="image"
                        tooltip="This is a required field"
                        rules={[{ required: true, message: 'Please upload an image!' }]}
                    >
                        <Upload  onChange={handleImgUpload}>
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
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

export default AddNewMovieForm;