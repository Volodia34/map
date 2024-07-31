import React from 'react';
import '../SideMenu.css';
import { SideMenuProps } from '../interfaces/SideMenu';

const SideMenu: React.FC<SideMenuProps> = ({ markers, onMarkerClick, onDeleteMarker, onClearMarkers }) => {
    return (
        <div className="side-menu">
            <h2 className="side-menu-title">Markers</h2>
            <ul className="side-menu-list">
                {markers.map(marker => (
                    <li key={marker.id} className="side-menu-list-item">
                        Marker {marker.id}
                        <button className="side-menu-go-button" onClick={() => onMarkerClick(marker.lat, marker.lng)}>Go to</button>
                        <button className="side-menu-delete-button" onClick={() => onDeleteMarker(marker.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <button className="side-menu-clear-button" onClick={onClearMarkers}>Clear All Markers</button>
        </div>
    );
};

export default SideMenu;
