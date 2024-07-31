export interface SideMenuProps {
    markers: Array<{ lat: number, lng: number, id: number }>;
    onMarkerClick: (lat: number, lng: number) => void;
    onDeleteMarker: (id: number) => void;
    onClearMarkers: () => void;
}
