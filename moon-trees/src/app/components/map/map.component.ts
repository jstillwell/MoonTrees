import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { TreeService } from '../../services/trees/tree.service';
import { Observable } from "rxjs/Observable";
import { GeolocationService } from '../../services/geolocation/locator.service';

@Component({
    selector: 'tree-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class TreeMapComponent {
    lat: number;
    lng: number;
    treeService: TreeService;
    trees: Observable<Tree[]>;
    locationService = new GeolocationService();

    constructor(private http: Http) {
        this.treeService = new TreeService(http);
        this.trees = this.treeService.getTrees();
        //console.info('All trees', this.trees);
        this.locationService.getPosition().then((data) => {
            this.lat = data.coords.latitude;
            this.lng = data.coords.longitude;
            console.info('your coords', data.coords);
        }).catch(function (err) {
            console.error(err);
        });
    }

    private handlePositionChanged(e) {
        console.info("position changed", e);
    }
}
