import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class GeolocationService {
    //@Output() positionChanged: EventEmitter<Position> = new EventEmitter<Position>();
    isAvailable: boolean;
    currentPosition: Position;
    lastPosition: Position;
    promise: Promise<Position>;

    constructor() {
        navigator.geolocation ? this.isAvailable = true : this.isAvailable = false;
    }
    getPosition(): Promise<any> {
        this.promise = new Promise((resolve, reject) => {
            if (this.isAvailable) {
                navigator.geolocation.getCurrentPosition(success, error);
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
}