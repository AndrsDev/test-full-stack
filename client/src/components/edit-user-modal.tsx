import React, { useState } from 'react';
import styles from './edit-user-modal.module.css';
import User from '../models/user.model';
import Modal from './modal';
import GoogleMapReact from 'google-map-react';
import MapsService from 'services/maps.service';
import PrimaryButton from './primary-button';
import SecondaryButton from './secondary-button';
import Marker from './marker';

const mapsService = new MapsService(process.env.REACT_APP_MAPS_API_KEY!)


interface Props {
  user: User,
  isOpen: boolean,
  onSave?: () => void,
  onClose?: () => void,
}

function EditUserModal({ isOpen, user, onSave, onClose } : Props ) {

  let typingTimer: any;

  const [location, setLocation] = useState(user.address);

  const [coordinates, setCoordinates] = useState({
    lat: 14.63,
    lng: -90.50
  })

  async function doneTyping (location: string) {
    try {
      setLocation(location);
      let result = await mapsService.geoCodeLocation(location);
      if(result) {
        setCoordinates(result)
      }   
    } catch (e){
      console.error(e);
    }
  }

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => { 
    clearTimeout(typingTimer);
    if (event.target.value) {
      typingTimer = setTimeout(() => doneTyping(event.target.value), 1000);
    }
  }

  return (    
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.modalContent}>
        <h1>Edit user</h1>
        <div className={styles.modalContentLayout}>
          <div>
            <GoogleMapReact
              yesIWantToUseGoogleMapApiInternals
              bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_API_KEY! }}
              options={{
                fullscreenControl: false,
                zoomControl: false,
              }}
              center={coordinates}
              defaultCenter ={{
                lat: 14.63,
                lng: -90.50
              }}
              defaultZoom={14}
            >
              <Marker lat={coordinates.lat} lng={coordinates.lng} />
            </GoogleMapReact>
          </div>
          <div>
            <form>
              <p><strong>Name</strong></p>
              <input name="name" placeholder="Name" defaultValue={user.name}/ >
              <p><strong>Location</strong></p>
              <input name="location" placeholder="Location" defaultValue={user.address} onChange={handleLocationChange}/>
              <p><strong>Description</strong></p>
              <input name="description" placeholder="Description" defaultValue={user.description} />
            </form>
            <div className={styles.modalButtonsContainer}>
              <PrimaryButton label="Save" />
              <SecondaryButton label="Cancel" onClick={onClose}/>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default EditUserModal;
