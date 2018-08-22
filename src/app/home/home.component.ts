import {Component, OnInit, OnDestroy, NgZone} from '@angular/core';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
  peer: any;
  conn: any;

  remotePeerId: string;
  myPeerId: string;

  messageLog: string = "Log:\n\n";

  msg: string = "";

  constructor(private _ngZone: NgZone) {}

  ngOnInit() {

    this.peer = new Peer({
      config: {'iceServers': [
        { url: 'stun:stun2.l.google.com:19302' }
      ]}
    });

    this.peer.on('open', (id) => {
      console.log('My peer ID is: ' + id);
      this.myPeerId = id;
      this.log(`peer id: ${this.myPeerId}`);
    });

    this.peer.on('connection', (conn) => {
      this.setUpConnection(conn);
    });  
  }

  ngOnDestroy() {
    if(!isNullOrUndefined(this.peer)) {
      this.peer.destroy();
    }
  }

  setUpConnection(conn: any) {
    this.conn = conn;

    this.conn.on('open', () => {
      this.log(`connected to: ${this.conn.peer}`);
    });

    this.conn.on('close', () => {
      this.log("connection closed");
    });

    this.conn.on('error', (err) => {
      this.log(`received error: ${err}`);
    });

    this.conn.on('data', (data) => {
      this.log(`received msg: "${data}"`);
    });
  }

  connect(){
    let conn = this.peer.connect(this.remotePeerId);
    this.setUpConnection(conn);
  }

  sendMsg() {
    if(!isNullOrUndefined(this.conn)) {
      this.log(`sending msg: "${this.msg}"`);
      this.conn.send(this.msg);
      this.msg = "";
    }
    else {
      this.log("error sending: no connection");
    }
  }

  log(msg: string) {
    this._ngZone.run(() => {
      this.messageLog += msg + "\n";
    })
  }
}
