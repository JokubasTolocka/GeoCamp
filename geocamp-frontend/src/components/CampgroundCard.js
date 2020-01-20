import React from 'react';
import {Link } from 'react-router-dom';
import getPreciseDistance from 'geolib/es/getDistance';
import StarRatingComponent from 'react-star-rating-component';

const CampgroundCard = ({rating, id, name, user,user_id, date, image, lat ,lng, currentUserLat, currentUserLng}) => {
    return(
        <Link className='card' to={`/users/${user_id}/campgrounds/${id}`}>
            <div className='camp-card'>
                <div className='card-top'>
                    <i className="fas fa-campground card-icon"></i>
                    <StarRatingComponent
                        starCount={5}
                        value={rating}
                        starColor={'#ffffff'}
                        emptyStarColor={'#313131'}
                    />
                </div>
                <div className='card-middle'>
                    <img className='card-image' src={image} alt="camp"/>
                    <h3 className='card-title'>{name}</h3>
                </div>
                <div className='card-bottom'>
                    <h5 className='card-user'>{user}</h5>
                    {currentUserLat && (
                        <h5 className='card-distance'><i className="fas fa-map-marker-alt"></i> {getPreciseDistance({latitude: currentUserLat, longitude: currentUserLng}, {latitude: lat, longitude: lng}) / 1000}km Away</h5>
                    )}
                </div>
            </div>
        </Link>
    )
}

export default CampgroundCard;