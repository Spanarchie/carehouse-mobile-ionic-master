import {Component} from '@angular/core';
import {ActionSheetController, ActionSheet, NavController, NavParams, ToastController} from 'ionic-angular';
import {BrokerDetailPage} from '../broker-detail/broker-detail';
import {hostelService} from '../../providers/hostel-service-mock';

@Component({
    selector: 'page-hostel-detail',
    templateUrl: 'hostel-detail.html'
})
export class hostelDetailPage {

    hostel: any;

    constructor(public actionSheetCtrl: ActionSheetController, public navCtrl: NavController, public navParams: NavParams, public hostelService: hostelService, public toastCtrl: ToastController) {
        this.hostel = this.navParams.data;
        hostelService.findById(this.hostel.id).then(
            hostel => this.hostel = hostel
        );
    }

    openBrokerDetail(broker) {
        this.navCtrl.push(BrokerDetailPage, broker);
    }

    favorite(hostel) {
        this.hostelService.favorite(hostel)
            .then(hostel => {
                let toast = this.toastCtrl.create({
                    message: 'hostel added to your favorites',
                    cssClass: 'mytoast',
                    duration: 1000
                });
                toast.present(toast);
            });
    }

    share(hostel) {
        let actionSheet: ActionSheet = this.actionSheetCtrl.create({
            title: 'Share via',
            buttons: [
                {
                    text: 'Twitter',
                    handler: () => console.log('share via twitter')
                },
                {
                    text: 'Facebook',
                    handler: () => console.log('share via facebook')
                },
                {
                    text: 'Email',
                    handler: () => console.log('share via email')
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => console.log('cancel share')
                }
            ]
        });

        actionSheet.present();
    }

}
