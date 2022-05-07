import { Avatar, Image } from 'antd';
import './MovieList.css';

const MovieList = () => {
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
                                        <button className="btn btn-default" title="Reload"><i
                                            className="fa-solid fa-magnifying-glass"></i></button>
                                        <button className="btn btn-default" title="Pdf"><i
                                            className="fa fa-file-pdf"></i></button>
                                        <button className="btn btn-default" title="Excel"><i
                                            className="fas fa-file-excel"></i></button>
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
                                                <li><a href="#" data-tip="edit"><i className="fa fa-edit"></i></a></li>
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
        </div>
    )
}

export default MovieList;