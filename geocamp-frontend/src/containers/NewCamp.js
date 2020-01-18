import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import { connect } from "react-redux";
import {apiCall} from '../services/api';
import {googleStyles} from '../googleMapStyles';
import { postCampground, editCampground} from "../store/actions/campgrounds.js";

const AnyReactComponent = () => <div><i className="fas fa-campground"></i></div>;

class NewCamp extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: '',
            location: {
                lat: 59.95,
                lng: 30.33
            },
            zoom: 0,
            center: {
                lat: null,
                lng: null
            },
            name: '',
            description: '',
            image: '',
            user_id: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        if(this.props.match.params.campground_id){          
            apiCall('get', `http://localhost:8000/api/users/${this.props.match.params.user_id}/campgrounds/${this.props.match.params.campground_id}`)
            .then(res => {
                this.setState({
                    id: res._id,
                    center: res.location,
                    name: res.name,
                    description: res.description,
                    image: res.image,
                    user_id: res.user._id
                })
            });
        }
    }
    handleEdit = e =>{
        e.preventDefault();
        this.props.editCampground(this.state);
        this.props.history.push('/');
    }

    handleClick = e => {
        this.setState({center: {lat: e.lat, lng: e.lng}})
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    handleSubmit(e){
        e.preventDefault();
        let data = {
            location: this.state.center, 
            name: this.state.name,
            description: this.state.description,
            image: this.state.image,
            user: this.props.currentUser.user._id
        }
        this.props.postCampground(data);
        this.setState({
            center: null,
            name: '',
            description: '',
            image: '', 
        })
        this.props.history.push('/');
    }

    render(){
        const mapOptions = {
            styles: googleStyles
        }
        return(
            <div className='create-form'>
                <div className='create-form-inside'></div>
                <h1>Share a campground.</h1>
                <label htmlFor='name'></label>
                <input
                    placeholder='Campground Name'
                    className='create-input'
                    name='name'
                    type='text'
                    onChange={this.handleChange}
                    value={this.state.name}
                />
                <label htmlFor='photo'></label>
                <input
                    placeholder='Photo URL of this campground or a nearby place'
                    className='create-input'
                    name='image'
                    type='text'
                    onChange={this.handleChange}
                    value={this.state.image}
                />
                <label htmlFor='story'></label>
                <textarea
                    rows='10'
                    cols='25'
                    placeholder='Your story here'
                    className='create-input textarea'
                    name='description'
                    type='text'
                    onChange={this.handleChange}
                    value={this.state.description}
                />
                <h3>In order to post this, you must provide a location by clicking on this map where the campground is</h3>
                <div className='create-google' >
                    <GoogleMapReact
                    bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API }}
                    defaultCenter={this.state.location}
                    defaultZoom={this.state.zoom}
                    options={mapOptions}
                    onClick={this.handleClick}
                    >
                    <AnyReactComponent
                        lat={this.state.center.lat}
                        lng={this.state.center.lng}
                    />
                    </GoogleMapReact>
                </div>
                {!this.props.Edit ?
                <button onClick={this.handleSubmit} className='create-button'>Submit! <i class="fas fa-hiking"></i></button>
                :
                <button onClick={this.handleEdit} className='create-button'>Edit! <i class="fas fa-hiking"></i></button>
                }
            </div>
        )
    }
}
function mapStateToProps(state){
    return {
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps, {postCampground, editCampground})(NewCamp);