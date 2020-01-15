import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import { connect } from "react-redux";
import { postCampground} from "../store/actions/campgrounds.js";

const AnyReactComponent = () => <div><i className="fas fa-campground"></i></div>;

class NewCamp extends Component{
    constructor(props){
        super(props);
        this.state = {
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
            image: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
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
                <div className='create-google'>
                    <GoogleMapReact
                    bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API }}
                    defaultCenter={this.state.location}
                    defaultZoom={this.state.zoom}
                    onClick={this.handleClick}
                    >
                    <AnyReactComponent
                        lat={this.state.center.lat}
                        lng={this.state.center.lng}
                    />
                    </GoogleMapReact>
                </div>
                <button onClick={this.handleSubmit} className='create-button'>Submit!</button>
            </div>
        )
    }
}
function mapStateToProps(state){
    return {
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps, {postCampground})(NewCamp);