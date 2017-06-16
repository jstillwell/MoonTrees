import { Injectable, Output, EventEmitter } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class GeolocationService {
    @Output() positionChanged = new EventEmitter();

    constructor() {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
        }
    }
    public getPosition() {
        navigator.geolocation.getCurrentPosition(this.success, this.error);
    }

    private success(position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        
        this.positionChanged.emit({ latitude, longitude });
    }

    private error() {
        alert("Unable to retrieve your location");
    }
}