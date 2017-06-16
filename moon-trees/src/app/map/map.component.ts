import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { TreeService } from '../trees/locator.service';
import { Observable } from "rxjs/Observable";
import { GeolocationService } from '../geolocation/locator.service';

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
    locationService: GeolocationService;

    constructor(private http: Http) {
        this.treeService = new TreeService(http);
        this.trees = this.treeService.getTrees();
        //console.info('All trees', this.trees);
        this.locationService = new GeolocationService();
        this.locationService.getPosition();
    }

    private handlePositionChanged(e) {
        console.info("position changed", e);
    }
}
