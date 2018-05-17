import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FaqPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-faq',
  templateUrl: 'faq.html',
})
export class FaqPage {

  diseases = [
    { title: "Can I have online lessons using my tablet?", description: "If you have Chrome installed, you may be able to launch a lesson using your tablet. However, we would recommend running the site on a laptop or desktop for best performance." },
    { title: "What browser do I need?", description: "Google Chrome and Mozilla Firefox are the only two browsers that are supported at this time. This is due to the audio/video platform only running on these two browsers. You won’t be able to successfully have online tutoring lessons through our platform if you use a different browser like Internet Explorer." },
    { title: "Why isn’t my video working?", description: "For Chrome users, you must select the Allow button at the top of your screen. Firefox users will be asked to share their camera and microphone. (See more about settings.) If you’re still experiencing issues, we recommend you double check that your camera is turned on and that nothing is covering the camera. Also make sure you have sufficient lighting and your contrast setting for your camera are set up so you can see yourself." },
    { title: "Why isn’t my audio working?", description: "First check that your sound is on and that your microphone is enabled. Both your speakers and microphone must be turned on for lessons. For Chrome users, you must select the Allow button at the top of your screen to share your audio and video. Firefox users will be asked to share their camera and microphone and must allow sharing to hear the audio. (See more about settings.) Some older computers may not have an internal microphone installed." },
    { title: "Can I screen share during a lesson?", description: "Yes, tutors and students can share their screens during online lessons." },
    { title: "Can I record my lesson?", description: "Currently, you cannot record lessons, but you can export and save any work you’ve done on your whiteboard." },
    { title: "Can more than one student or tutor have an online lesson at the same time?", description: "Currently only one tutor and one student are allowed to join an online lesson at the same time." },
    { title: "Can both users write on the whiteboard at the same time?", description: "Yes, they certainly can! However, it’s always polite to take turns." },
    { title: "Do students have payment on file before they start an online lesson?", description: "Yes, all students on Wyzant must have payment on file before they can schedule a lesson with a tutor." },
    { title: "Is there an audio bridge?", description: "No, right now you will need to connect using your webcam and microphone. We do recommend having a headset to reduce outside noise and echo." }
  ];

  shownGroup = null;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FaqPage');
  }

  toggleGroup(group) {
    if (this.isGroupShown(group)) {
        this.shownGroup = null;
    } else {
        this.shownGroup = group;
    }
  }
  isGroupShown(group) {
      return this.shownGroup === group;
  }

}
