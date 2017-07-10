import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class GeolocationService {
    @Output() positionChanged: EventEmitter<Position> = new EventEmitter<Position>();
    isAvailable: boolean;
    currentPosition: Position;
    lastPosition: Position;
    promise: Promise<Position>;
    watchId: number;
    options: PositionOptions = {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000
    };

    constructor() {
        navigator.geolocation ? this.isAvailable = true : this.isAvailable = false;
    }

    getPosition(): Promise<any> {
        this.promise = new Promise((resolve, reject) => {
            if (this.isAvailable) {
                navigator.geolocation.getCurrentPosition(success, error, this.options);
            } else {
                reject("Geolocation is not available");
            }
            function success(position: Position): any {
                return resolve(position);
            }
            function error() {
                alert("Unable to retrieve your location");
            }
        });

        return this.promise;
    }
    watchPosition(): void {
        if (this.isAvailable) {
            this.watchId = navigator.geolocation.watchPosition(success, error, this.options);
        } else {
            alert("Geolocation is not available");
        }
        function success(position: Position): any {
            this.positionChanged.emit(position);
        }
        function error() {
            alert("Unable to retrieve your location");
        }
    }
    ngOnDestroy() {
        navigator.geolocation.clearWatch(this.watchId);
    }
}