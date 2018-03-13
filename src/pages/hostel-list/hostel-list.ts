import {Component} from '@angular/core';
import {Config, NavController} from 'ionic-angular';
import {hostelService} from '../../providers/hostel-service-mock';
import {hostelDetailPage} from '../hostel-detail/hostel-detail';
import leaflet from 'leaflet';

@Component({
    selector: 'page-hostel-list',
    templateUrl: 'hostel-list.html'
})
export class hostelListPage {

    properties: Array<any>;
    searchKey: string = "";
    viewMode: string = "list";
    map;
    markersGroup;

    constructor(public navCtrl: NavController, public service: hostelService, public config: Config) {
        this.findAll();
    }

    openhostelDetail(hostel: any) {
        this.navCtrl.push(hostelDetailPage, hostel);
    }

    onInput(event) {
        this.service.findByName(this.searchKey)
            .then(data => {
                this.properties = data;
                if (this.viewMode === "map") {
                    this.showMarkers();
                }
            })
            .catch(error => alert(JSON.stringify(error)));
    }

    onCancel(event) {
        this.findAll();
    }

    findAll() {
        this.service.findAll()
            .then(data => this.properties = data)
            .catch(error => alert(error));
    }

    showMap() {
        setTimeout(() => {
            this.map = leaflet.map("map").setView([42.361132, -71.070876], 14);
            leaflet.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
                attribution: 'Tiles &copy; Esri'
            }).addTo(this.map);
            this.showMarkers();
        })
    }

    showMarkers() {
        if (this.markersGroup) {
            this.map.removeLayer(this.markersGroup);
        }
        this.markersGroup = leaflet.layerGroup([]);
        this.properties.forEach(hostel => {
            if (hostel.lat, hostel.long) {
                let marker: any = leaflet.marker([hostel.lat, hostel.long]).on('click', event => this.openhostelDetail(event.target.data));
                marker.data = hostel;
                this.markersGroup.addLayer(marker);
            }
        });
        this.map.addLayer(this.markersGroup);
    }

}
