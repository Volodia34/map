import {Marker} from "./Marker.ts";

export interface SideMenuProps {
    markers: Marker[]
    onMarkerClick: (lat: number, lng: number) => void;
    onDeleteMarker: (id: number) => void;
    onClearMarkers: () => void;
}
