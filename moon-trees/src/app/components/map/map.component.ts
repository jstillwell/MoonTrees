import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { TreeService } from '../../services/trees/tree.service';
import { Observable } from "rxjs/Observable";
import { GeolocationService } from '../../services/geolocation/locator.service';
import { GoogleMapsAPIWrapper } from '@agm/core';

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
    filteredTrees: Observable<Tree[]>;
    //gMapsApi: GoogleMapsAPIWrapper = new GoogleMapsAPIWrapper();
    locationService = new GeolocationService();

    constructor(private http: Http) {
        this.treeService = new TreeService(http);
    }
    ngOnInit() {
        this.trees = this.treeService.getTrees();
        this.filteredTrees = this.trees.map(trees => trees.filter(tree => tree.Latitude !== 0));
        
        this.locationService.getPosition().then((data) => {
            this.lat = data.coords.latitude;
            this.lng = data.coords.longitude;
            //console.info('your coords', data.coords);
        }).catch(function (err) {
            console.error(err);
        });
    }

    private handlePositionChanged(e) {
        console.info("position changed", e);
    }
}
